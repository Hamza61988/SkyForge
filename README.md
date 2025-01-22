# SkyForge


## Overview
SkyForge is an advanced suite of aviation tools designed to enhance the virtual air traffic control (ATC) and pilot experience. Built with precision, automation, and user-centric features, SkyForge will provide intelligent solutions for air traffic controllers and pilots, offering seamless integration with IVAO's network and real-world aviation data sources.

## Features
SkyForge is an evolving platform that currently focuses on:

### ✈️ **RunwayLink** (Gate Assignment & Ground Handling Assistant)
- **Automated Gate Assignment:** Assigns optimal gates to aircraft based on real-time traffic data.
- **Live Position Tracking:** Retrieves and visualizes aircraft locations using IVAO’s Whazzup v2 JSON API.
- **Flight Route Analysis:** Fetches and displays planned routes for better ground coordination.
- **Interactive Map Interface:** Real-time visualization of airport layouts, aircraft positions, and taxiways.
- **Data Integration:** Uses OpenStreetMap (OSM) and Google Earth to dynamically pull airport gate layouts.

### 🌍 **ATC Utility Suite** *(Upcoming Features)*
- **Real-Time Traffic Monitoring:** Live traffic analysis with aircraft filtering and sorting.
- **Advanced METAR & Weather Tools:** Retrieves real-time weather reports for accurate flight planning.
- **Custom Waypoint & Labeling Tools:** Enables manual and automated waypoint placement for traffic coordination.
- **Real Airport Traffic Simulation:** Simulate real-world traffic flows for ATC training
- **Controller Logbook & Performance Analytics:** Tracks controller performance, session duration, and handled    traffic.


### 🛠 **Future Expansions**
SkyForge aims to expand, incorporating additional tools such as:
- **Pilot Dispatching & Planning Tools**
- **Structured ATC Courses:** Beginner to advanced ATC training with interactive lessons so you can be the best ATCO out there.
- **ATC Scenarios & Case Studies:** Learn from real-life and virtual ATC incidents.
- Integrated Dispatch Center – Central hub for flight planning, metering, and clearances.


### 🧪 SkyForge AeroLab (soon to come)
A section within SkyForge dedicated to science, engineering, and aviation discussions. This forum will go beyond ATC and flight simulation, allowing enthusiasts, students, and professionals to collaborate on aerospace, engineering, physics, and cutting-edge technology.

- **Educational Resources & Learning Hub:** Share books, courses, and expert knowledge on aviation and STEM topics.
- **Software Development & Flight Sim Tech:** Exchange knowledge on programming, sim development, and aviation-related coding projects.
- **Air Traffic Control & Navigation:** Talk about ATC systems, airspace management, and real-world aviation tech.



## Technologies Used
SkyForge is built with a modern technology stack to ensure efficiency, scalability, and performance.

### **Frontend**
- **React (TypeScript) + Vite** – High-performance UI framework for an interactive user experience.
- **Tailwind CSS + Framer Motion** – Custom styling and smooth animations.
- **Leaflet.js** – Advanced mapping solutions for flight visualization.

### **Backend**
- **Node.js + Express** – API handling and backend logic.
- **IVAO Whazzup v2 JSON API** – Real-time aircraft and ATC data.
- **OpenStreetMap (Overpass API)** – Retrieves airport gate and taxiway information.

### **Development Tools**
- **Visual Studio Code** – Preferred development environment.
- **GitHub Actions** – Continuous Integration/Deployment (CI/CD).
- **Plesk (IONOS VPS)** – Production hosting without Docker.

## Installation & Setup
### **Prerequisites**
Ensure you have the following installed on your machine:
- Node.js (v16 or higher)
- npm or yarn
- Git
- A valid IVAO API key for Whazzup v2 authentication

### **Clone the Repository**
```bash
git clone https://github.com/your-username/SkyForge.git
cd SkyForge
```

### **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **Environment Variables**
Create a `.env` file in both `backend/` and `frontend/` directories and configure your credentials:
```
IVAO_API_KEY=your_ivao_api_key
OSM_OVERPASS_URL=https://overpass-api.de/api/interpreter
```

## Contribution Guidelines
SkyForge is an open-source project, and contributions are welcome! To contribute:
1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature-name`
3. **Commit changes:** `git commit -m "Added new feature"`
4. **Push to branch:** `git push origin feature-name`
5. **Create a pull request**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Community
📌 **Join the SkyForge Community:**
- [Discord](https://discord.gg/your-invite-link)
- [GitHub Issues](https://github.com/your-username/SkyForge/issues)

📧 **Contact the Developer:**
- Email: your-email@example.com

---
### 🚀 SkyForge: Elevating Virtual ATC & Flight Simulation
