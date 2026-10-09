# PENSCEDULER - PENS Smart Academic Scheduler

PENSCEDULER is a lightweight frontend prototype designed for Politeknik Elektronika Negeri Surabaya (PENS) to streamline university academic schedule management, conflict resolution, and schedule shift requests across three institutional personas.

---

## Architecture & Design Overview

- **Architecture**: Single Page Application (SPA) using vanilla HTML5, CSS3, and modern ES6+ JavaScript.
- **Design System**: Geneva 1967 minimalist design language incorporating 60-30-10 palette tokens, dual theme support (Light and Dark mode), and full WCAG 2.2 AA accessibility compliance (including high-contrast mode and OpenDyslexic typography).
- **Iconography**: Pure SVG line vector icons (1.5px to 2.0px stroke, zero emojis).
- **Zero Build Overhead**: Runs directly in any modern browser without transpilations, node modules, or bundlers.

---

## Core Capabilities by Role

### 1. Mahasiswa (Student)
- **Personal Timetable & Day Filtering**: Weekly 7-day schedule view with quick daily filters (Today, Monday through Friday).
- **Schedule Change Visual Indicators**: Distinct amber badges and strike-through diffs for classes shifted to substitute time slots.
- **Centered Reschedule Request Form**: Form with duration selector (1 to 4 weeks or permanent) and modal overlay recommendations for conflict-free room slots.
- **Interactive AI Assistant**: Natural language prompt templates ("Apa jadwal saya hari ini?", "List mata kuliah saya", and slot search with automatic form handoff).

### 2. Dosen (Lecturer)
- **Teaching Schedule & Day Filtering**: Personal taught course schedules with daily filters and shift status indicators.
- **Shift Request Workflow**: Real-time Approve and Reject actions on student rescheduling requests directly from class cards.
- **Anonymized Student Roster**: Course detail page with anonymized student rosters and highlighted active semester week.
- **Auto-Approved Reschedule**: Self-initiated course shifts automatically update schedule records with conflict-free slot overlays.
- **AI Scheduling Assistant**: Natural language queries and course-targeted schedule adjustment recommendations.

### 3. BAAK (Academic Administration Bureau)
- **Platform Health Summary**: High-level counts for active students, lecturers, courses, and campus rooms.
- **Interactive CSV Ingestion**: Bulk schedule upload parser with in-modal error highlights and inline corrections for unmapped classes or lecturers.
- **Master Data CRUD Management**: Complete Create, Read, Update, and Delete modal workflows for Rooms (with building selection: Gedung D4, Gedung D3, Gedung Pasca, Gedung SAW), Subjects, Lecturers, and Students.
- **Campus Schedule Monitoring**: Comprehensive schedule oversight with lecturer filter and daily views.
- **Dedicated Reschedule Requests Ledger**: Centralized tracking table for all change requests across the institution.
- **System Health & Audit Logs**: Operational infrastructure telemetry cards (Uptime, Database Latency, Scheduler Integrity, Memory/CPU Load) and structured filterable audit logs (Info, Shift, Sync, Warning, Error).

---

## Directory Structure

```text
scheduler-mockup/
├── .gitignore         # Standard repository exclusion rules
├── LICENSE            # MIT License
├── README.md          # Project documentation and execution instructions
├── index.html         # Master SPA shell, markup templates, and modal dialogs
├── styles.css         # Design tokens, theme variables, and layout rules
└── app.js             # Reactive state management, role router, and view controllers
```

---

## Quick Start Guide

No build pipeline or package installation is required.

### Option A: Direct Browser Launch
Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option B: Local Static Server
Serve the directory via Python or Node.js:

```bash
# Using Python 3
python -m http.server 8000

# Using npx serve
npx serve .
```

Navigate to `http://localhost:8000` in your web browser.

---

## Security & Data Privacy

- **Sanitized Dummy Data**: All sample personal identifiers (NRP, NIP, student names) are mock values or masked for privacy protection.
- **Zero External Telemetry**: The application operates completely client-side without third-party analytics trackers, external cookies, or untrusted CDN scripts.
- **Zero Hardcoded Secrets**: Does not require or store API tokens, secret keys, or database credentials.

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).
