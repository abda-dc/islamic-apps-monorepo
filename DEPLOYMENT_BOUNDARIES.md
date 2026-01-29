# Deployment Boundaries (LOCKED)

This repository is a monorepo with **strict deployment boundaries**.

## Deployable Units

### Services (Deployable)
Services are independently deployable backend APIs:

- Services/hadith-api (MIT)
- Services/quran-api  (MIT)

Rules:
- Services may be built and deployed independently.
- Services MUST NOT depend on or bundle any code from /apps.
- Deploy pipelines must operate only within their service directory.

### Apps (Not deployed as backend services)
Apps are client applications and remain separate artifacts:

- apps/al-azan (AGPL-3.0)
- apps/my-quran (AGPL-3.0) *inactive/non-Node currently*
- apps/quran-hifz (AGPL-3.0) *inactive/non-Node currently*
- apps/quran_app (AGPL-3.0) *inactive/non-Node currently*
- apps/quran_salah_dua (AGPL-3.0) *non-Node/static currently*

Rules:
- Apps may be built as client artifacts (web/mobile), but are not deployed as backend services.
- App pipelines MUST NOT build or publish service artifacts.

## License Boundary Guardrail (Hard Rule)

- /Services/** is MIT
- /apps/** is AGPL-3.0
- No pipeline may combine outputs across these boundaries.

## Enforcement

- CI workflows are split by path:
  - Services workflows: only run for /Services/**
  - Apps workflows: only run for /apps/**
- Root baseline CI may run for visibility, but deploy validation is enforced per boundary.
