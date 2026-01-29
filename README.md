# Islamic Apps Monorepo

Production-ready monorepo consolidating Islamic **APIs (services)** and **client applications (apps)** with clear licensing boundaries, clean separation of concerns, and a foundation for deterministic builds and secure deployments.

This repository brings together multiple previously independent projects into a single, organized structure without changing their internal architectures.

---

## Build Information

- **Built by:** Mohammed Abda  
- **Initial Monorepo Build Date:** January 2026  
- **Repository Type:** Production-ready monorepo

---






## Repository Structure

islamic-apps-monorepo/
├── Services/ # Backend APIs and data services
│ ├── hadith-api
│ └── quran-api
│
├── apps/ # Client applications (mobile / web)
│ ├── al-azan
│ ├── my-quran
│ ├── quran-hifz
│ ├── quran_app
│ └── quran_salah_dua
│
└── README.md
















---

## Services

The `Services/` directory contains backend APIs intended to be deployed independently.

### Included Services
- **hadith-api**  
  Hadith data API service.

- **quran-api**  
  Qur’an data API service.

Each service:
- Is self-contained
- Has its own `package.json`, configuration, and deployment setup
- Can be run, deployed, and scaled independently

---

## Applications

The `apps/` directory contains end-user applications.

### Included Apps
- **al-azan** – Prayer time and adhan application  
- **my-quran** – Qur’an reading application  
- **quran-hifz** – Qur’an memorization helper  
- **quran_app** – Qur’an application (Flutter-based)  
- **quran_salah_dua** – Salah and dua application  

Each app:
- Retains its original structure
- Is isolated from backend services
- Can be built and released independently

---

## Licensing

⚠️ **Important: Mixed Licenses**

This monorepo intentionally contains projects under **different licenses**.

- **Backend services** are licensed under **MIT**
- **Client applications** are licensed under **AGPL-3.0**

Licensing is enforced **per-project**, not at the monorepo level.

➡️ **Always check the `LICENSE` file inside each service or app directory before reuse or redistribution.**

---

## Design Principles

- Clear separation between **services** and **apps**
- No shared mutable state across projects
- Independent build and deployment paths
- Minimal assumptions between components
- Monorepo used for organization, not coupling

---

## Status

✔ Folder structure finalized  
✔ Services and apps correctly separated  
✔ Licensing preserved per project  

Next phases may include:
- Unified CI pipelines
- Standardized build tooling
- Deployment automation
- Documentation expansion

---

## Contributing

At this stage, contributions should be made **within individual projects** following their existing contribution guidelines.

Global contribution standards may be added later as the monorepo evolves.
