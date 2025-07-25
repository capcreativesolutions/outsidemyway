## 📘 README.md – Project Structure Overview for Trek4Free

### 🏕️ Project Purpose
Trek4Free is a streamlined trip planning tool for outdoor enthusiasts who want to discover hiking, biking, climbing, paddling, and other activities — with **nearby free camping** options.

Our goal is to solve the fragmentation of outdoor recreation data across multiple websites (AllTrails, FreeCampsites.net, Google Maps, etc.) by consolidating it into one seamless UI and data-rich experience.

---

### 🧩 Project Structure & File Naming
| File | Purpose |
|------|---------|
| `index.html` | Landing page for Trek4Free with brand intro, SEO content, and call-to-action |
| `explore.html` | Interactive map, filters, and user interface for exploring outdoor activities + camping |
| `project-log.md` | Ongoing changelog for all development decisions and version history. updated logs saved in project_logs folder |
| `README.md` | This file – overview of the project structure and working methods |

---

### 🧠 Development Strategy
**Split GPT Workspaces:**
- 🎨 **ChatGPT Agent Features Overview (this GPT):**
  - Branding, landing page design, SEO, pitch decks
  - Agent-powered data sourcing and enrichment
  - Domain strategy and user personas

- 🗺️ **CSV Data Clean (other GPT canvas):**
  - Core data UI (explore.html)
  - Firebase integration
  - RIDB and location filters
  - Real-time user-facing interface

---

### ⚙️ Tech Stack
| Tool | Role |
|------|------|
| GitHub | Version control + file hosting |
| Netlify | Static site deployment |
| Firebase | Cloud database and data queries |
| ChatGPT (Plus/Agent) | Strategic planning, data processing, automation |
| Namecheap | Domain name management |

---

### 🔗 Internal Navigation
- Landing Page (`index.html`) ➜ [Explore the Map](explore.html)
- Users click into the main UI from the homepage via a CTA button

---



## 🤖 GPT Coordination Prompt (v2 – with GitHub Source Files)

### 🧠 PROJECT NAME: Trek4Free

This GPT canvas is part of a dual-GPT project with distinct responsibilities:

---

🗺️ GPT: "CSV Data Clean"
➤ Focus: Data UI, Filtering, Firebase Integration, RIDB ingestion, and map display  
➤ Primary file: `explore.html` (formerly `index.html`)  
➤ Use: All technical work with map logic, filters, and data connections

---

🎨 GPT: "ChatGPT Agent Features Overview"
➤ Focus: Branding, Landing Page, SEO, Strategic Planning, Pitch Decks, and Agent Tasks  
➤ Primary file: `index.html` = Trek4Free Landing Page  
➤ Secondary file: `explore.html` = User-facing map UI

---

📂 SHARED DOCUMENTS (Source of Truth – Stored in GitHub)
- `README.md`: Project structure, strategy, tooling, GPT division of labor
- `project-log.md`: Running changelog for project milestones and file history

These files are saved and version-controlled in GitHub and should be referenced across all GPTs for consistency. Update them when major work is done in either GPT.

---

🚦WORKFLOW STRATEGY:
- Landing Page (`index.html`) is built in Agent GPT and links to Map UI
- Map UI (`explore.html`) is actively developed in CSV Data GPT
- All updates and decisions are logged in `project-log.md`
- Coordination across GPTs is tracked via GitHub commits and this prompt

---

📝 GPT INSTRUCTIONS:
When completing tasks, document updates in `project-log.md`, then notify user to upload latest version to GitHub (or offer download). Always use filenames consistently and explain your changes clearly.

---

🌐 DOMAIN: Trek4Free.com (active)  
📍 HOSTING: Netlify (via GitHub repo)  
🔗 DATABASE: Firebase  
🔧 VERSION CONTROL: GitHub  
📄 DOMAIN REGISTRATION: Namecheap

# Trek4Free: Outdoor Activity Explorer

**Trek4Free** is a web app to discover free and low-cost outdoor destinations across the U.S., including campsites, hiking trails, and swimming holes. Our goal is to provide a fast, intuitive, and community-enhanced tool for planning outdoor adventures.

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Leaflet.js
- **Backend/DB:** Firebase Firestore (currently active; may be hybridized or replaced later with spatial caching via geohash)
- **Serverless Functions & Caching:** Netlify Functions (future optimization via bounding boxes, regional cache, etc.)
- **Data Sources:** RIDB API, curated CSV dataset, user submissions, and future AI enrichment (Google, Yelp, AllTrails)

---

## 📁 File & Folder Structure

/  🔹 Root repo (minimal files)
- /index.html — 🔸 Homepage (branding)
- /explore.html — 🔸 Map page with filters and Firebase integration
- /trail-notes.html — 🔸 User note-taking and experience page
- /top-hikes-texas.html — 🔸 SEO page highlighting curated regional trails

**Folders:**

/css/
- styles.css ✅ Main site stylesheet
- trail-notes.css 🔸 Page-specific styles (future option)

/scripts/
- firebase-init.js ✅ Firebase config (if broken out)
- map-v2.js ✅ Explore page logic (Firebase map load, filters)
- filters.js 🔸 Renders checkboxes (future separation)
- clustering.js 🔸 Marker cluster logic (for performance, if re-integrated)
- ridb-to-firebase.js ✅ Ingest RIDB data into Firestore (admin-only)
- agent-verification.js 🔸 AI agent for verifying, flagging, enriching location data (future)

/data/
- fallback-trails.csv ✅ Static backup trail dataset
- enriched-locations.csv 🔸 Final enriched data file (optional export)
- regions.json 🔸 Bounding box or geohash index info (for spatial filtering)

/functions/ (Netlify serverless functions)
- fetchRIDB.js ✅ Pull data from RIDB API
- cacheGeoData.js 🔸 Future: serverless layer for bounding box caching
- enrichLocation.js 🔸 Future: Google/Yelp/AllTrails enrichment & match

/images/
- *.png, *.jpg, *.svg ✅ All project images
- hero + card visuals — trek4free-hero.png, fallback card art, logos, etc.

/maps/
- *.gpx / *.geojson 🔸 For future offline map trail overlays (GPX support possible via Avenza-style export)

/project_logs/
- project-log.md ✅ Timeline, status, and key changes

/netlify/
- netlify.toml ✅ Netlify deployment config

---

## ✅ Current Priorities

1. Maintain fast map loading with Firebase while testing serverless caching options (geohash tile indexing).
2. Clean folder structure as we go. No large refactors until stability proven.
3. Finish core trail/campsite functionality and filters before expanding SEO content or user accounts.
4. Avoid duplicate files in root — consolidate anything like hero.png into /images.
5. Ensure all code references are updated when moving files.

---

## 🤖 Future Paths

- Use OpenAI agents or scheduled Cloud Functions to:
  - Cross-check existing data with Google Maps, Yelp, AllTrails, Reddit
  - Flag outdated entries
  - Auto-enrich descriptions, tags, photos
  - Add "last_verified" field in metadata
- Trail maps that load offline (explore GPX download integration or Avenza export format)
- Lightweight mobile-friendly version of explore.html
- Admin dashboard for verifying user reports and submissions

---

_Last updated: 2025-07-25_

This README acts as the source of truth across GPT agents and collaborators. Any changes to structure or features should be reflected here first.

