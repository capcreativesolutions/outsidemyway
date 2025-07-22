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
