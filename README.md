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
| `project-log.md` | Ongoing changelog for all development decisions and version history |
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
