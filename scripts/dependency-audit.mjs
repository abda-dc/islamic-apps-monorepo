import fs from "node:fs";
import path from "node:path";

const projects = [
  "Services/hadith-api",
  "Services/quran-api",
  "apps/al-azan",
  "apps/my-quran",
  "apps/quran-hifz",
  "apps/quran_app",
  // intentionally excluded: apps/quran_salah_dua (non-Node)
];

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function readJson(p) {
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

function lockfileType(dir) {
  const pnpm = path.join(dir, "pnpm-lock.yaml");
  const yarn = path.join(dir, "yarn.lock");
  const npm = path.join(dir, "package-lock.json");
  const shrink = path.join(dir, "npm-shrinkwrap.json");

  if (exists(pnpm)) return "pnpm-lock.yaml";
  if (exists(yarn)) return "yarn.lock";
  if (exists(npm)) return "package-lock.json";
  if (exists(shrink)) return "npm-shrinkwrap.json";
  return null;
}

function fmt(status, msg) {
  const icon = status === "OK" ? "✅" : status === "WARN" ? "⚠️" : "❌";
  return `${icon} ${status}: ${msg}`;
}

const outDir = "audit";
const outFile = path.join(outDir, "dependency-audit-report.txt");

fs.mkdirSync(outDir, { recursive: true });

let report = "";
report += "=== Dependency Isolation Audit (metadata only) ===\n";
report += "Scope: package.json, lockfile, engines.node, packageManager\n";
report += "Note: No installs, no builds, read-only.\n\n";

let hardFailures = 0;

for (const proj of projects) {
  const pkgPath = path.join(proj, "package.json");
  report += `---- ${proj} ----\n`;

  if (!exists(pkgPath)) {
    report += fmt("FAIL", "package.json missing (project treated as Node-managed)") + "\n\n";
    hardFailures++;
    continue;
  }

  let pkg;
  try {
    pkg = readJson(pkgPath);
  } catch (e) {
    report += fmt("FAIL", `invalid package.json: ${e.message}`) + "\n\n";
    hardFailures++;
    continue;
  }

  const lock = lockfileType(proj);
  if (lock) report += fmt("OK", `lockfile present: ${lock}`) + "\n";
  else report += fmt("WARN", "no lockfile found") + "\n";

  if (pkg?.engines?.node) report += fmt("OK", `engines.node = ${pkg.engines.node}`) + "\n";
  else report += fmt("WARN", "engines.node not specified") + "\n";

  if (pkg?.packageManager) report += fmt("OK", `packageManager = ${pkg.packageManager}`) + "\n";
  else report += fmt("INFO", "packageManager not set (optional)") + "\n";

  report += "\n";
}

report += "=== Summary ===\n";
report += `Projects audited: ${projects.length}\n`;
report += `Hard failures: ${hardFailures}\n`;

fs.writeFileSync(outFile, report, "utf8");
console.log(report);

if (hardFailures > 0) {
  process.exit(1);
}
