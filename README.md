# SkyForge

## Overview
**SkyForge** is an advanced toolset designed for **IVAO and flight simulation in general**, offering automation, real-time data visualization, and intelligent air traffic management solutions.

## Features
### **RunwayLink – Intelligent Gate Assignment System**
- **Real-time aircraft tracking** via IVAO Whazzup v2 API.
- **Automated gate assignment** based on aircraft type and airline preference.
- **Dynamic airport gate retrieval** using OpenStreetMap (OSM) and Overpass API.
- **Optimized gate allocation** considering aircraft size and availability.
- **Live airport congestion monitoring**.

### **Upcoming Enhancements**
- Enhanced **ATC automation tools**.
- Expanded **real-time data visualization**.
- Integration with **multiple flight simulation platforms**.
- Brand New Flight Dispatch: An improved dispatch system that integrates real-time flight data, automated gate          assignments, and a modern UI.
- Pilot's Dashboard: The Ultimate Tracking Hub
A personalized hub for pilots to track flight history, review statistics, and compete globally.
- Advanced Airbus Performance Suite
Realistic takeoff, landing, and in-flight performance calculations for high-fidelity Airbus aircraft.
- SkyForge: AeroLab Forum
A community hub for aviation, engineering, and science discussions among pilots and enthusiasts.
- ATC Trainning Hub
A progressive learning system for aspiring virtual and real-world ATC controllers, covering from basics to advanced radar control.

## Installation & Setup
### **Prerequisites**
- **Node.js (v18+)**
- **npm or yarn**

### **Clone the Repository**
```sh
git clone https://github.com/your-organization/skyforge.git
cd skyforge
```

### **Install Dependencies**
```sh
npm install
```

### **Environment Variables**
Create a `.env` file in the root directory:
```sh
VITE_BACKEND_URL=https://xxxx/api
VITE_GEONAMES_USERNAME=your_username
```

### **Run the Development Server**
```sh
npm run dev
```
Access at `http://localhost:5173/`.

### **Build for Production**
```sh
npm run build
```

## Deployment on Plesk VPS (if needed)
1. Upload the built files (`dist/`) to the VPS.
2. Configure Plesk to serve the frontend with **Nginx**.
3. Ensure the backend API runs on a dedicated subdomain.
4. Automate deployment with GitHub Actions or manual updates.

## API Integration
SkyForge integrates with **IVAO's Whazzup v2 API** for real-time aircraft tracking and flight plan retrieval.

### **Fetching Active Aircraft Data**
```sh
GET https://api.ivao.aero/v2/tracker/whazzup
Authorization: Bearer <API_KEY>
```

### **Gate Assignment Logic works for runwayLink**
- Retrieves gates dynamically from **OSM Overpass API**.
- Assigns gates based on:
  - **Aircraft type compatibility** (Heavy, Standard, Regional).
  - **Airline preferences** (e.g., Terminal 2E for Air France at LFPG).
  - **Availability and real-time status**.

## Development Guidelines
### **Tech Stack**
- **Frontend:** React (TypeScript) + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (future expansion)
- **Mapping:** Leaflet.js + OpenStreetMap API
- **Animations:** Framer Motion

## Contributing
We welcome contributions to **SkyForge**. To contribute:
1. **Fork the repository.**
2. **Create a new feature branch (`feature-xyz`).**
3. **Submit a pull request with detailed documentation.**

## License
SkyForge is an independent project and is **not affiliated with IVAO**. It is released under the **MIT License**.

## Contact & Community
- **Website:** [SkyForgeHQ](https://skyforgehq.com)
- **GitHub:** [SkyForge Repository](https://github.com/spacemikha)

