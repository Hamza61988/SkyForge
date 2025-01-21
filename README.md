# ✈️ SkyForge 


RunwayLink is part of SkyForge.
RunwayLink is an **ATC & Gate Assignment Tool** designed to **enhance the virtual aviation experience** by integrating directly with **IVAO** and using **OpenStreetMap (OSM)** to assign accurate **airport gates** dynamically. It also provides **real-time flight tracking and automated gate assignments**.

---

## 🚀 **Features**
✅ **IVAO API Integration** - Fetches real-time flight plans from IVAO.  
✅ **Automated Gate Assignment** - Uses **OSM & OpenCage** to dynamically fetch **gates** for arriving flights.  
✅ **Flight Route Visualization** - Displays flight routes on an interactive map.  
✅ **Smooth Animations** - Uses **Framer Motion** for an elegant UI experience.  
✅ **Dark & Futuristic UI** - Inspired by aviation control panels.  
✅ **Built with TypeScript + Vite + React** for optimal performance.  

---

## 🛠 **Tech Stack**
- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Animations**: Framer Motion
- **Backend API Integration**: IVAO Whazzup API
- **Map & Geospatial Data**:
  - OpenStreetMap (OSM) for **airport gates**
  - OpenCage API for **geocoding airport ICAO**
  - Leaflet for **map rendering**
- **State Management**: React Hooks
- **Deployment**: Vercel (or any other static site host)
  
---

## 📦 **Installation**
To set up the project locally, follow these steps:

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/skyforge.git
cd skyforge
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Set up environment variables**
Create a `.env` file in the root directory and add:
```env
VITE_OPENCAGE_API_KEY=your_opencage_api_key_here
```

### **4️⃣ Start the development server**
```sh
npm run dev
```
- The app will be available at **http://localhost:5173**

---


## ✈️ **How It Works**
1. **User selects an airport** via `AirportSelection.tsx`.
2. **User enters a callsign** in `CallsignInput.tsx` to fetch the flight plan.
3. **IVAO API retrieves the flight route**, departure, arrival, and aircraft type.
4. **OpenCage fetches airport coordinates** based on ICAO.
5. **OpenStreetMap (OSM) fetches gates** at the arrival airport.
6. **A gate is dynamically assigned** based on the aircraft type.
7. **Flight path is displayed on the map** with a smooth animated UI.

---

## 🗺 **API Usage**
### ✈️ **IVAO API**
- Fetches real-time flights:
```sh
GET https://api.ivao.aero/v2/tracker/whazzup
```

### 🌍 **OpenCage API**
- Fetches airport coordinates:
```sh
GET https://api.opencagedata.com/geocode/v1/json?q=ICAO_CODE&key=YOUR_API_KEY
```

### 🛫 **OpenStreetMap (Overpass API)**
- Fetches airport gates:
```sh
GET https://overpass-api.de/api/interpreter?data=[out:json];node["aeroway"="gate"]["ref"](around:5000,LAT,LON);out;
```

---

## 🏗 **Planned Features**
🔹 **Real-Time flight Tracking**  
🔹 **Save Assigned Gates to Database**  


---

## 🤝 **Contributing**
Contributions are welcome! To contribute:
1. **Fork** the repo & create a branch:  
   ```sh
   git checkout -b feature-name
   ```
2. **Make changes & commit**:  
   ```sh
   git commit -m "Added feature X"
   ```
3. **Push the branch & create a PR**:
   ```sh
   git push origin feature-name
   ```

---

## 📝 **License**
📜 SkyForge is **open-source** and licensed under the **MIT License**.  
Feel free to use, modify, and contribute! ✈️

---

## 📞 **Contact & Support**
For questions or support, reach out via:
- ✉️ **Email**: mikhaelmiro300@gmail.com


