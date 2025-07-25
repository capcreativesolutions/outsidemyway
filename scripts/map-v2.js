// map-v2.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-init.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let map;
let markersLayer = L.layerGroup();
let debounceTimer;

function initMap() {
  map = L.map("map").setView([37.8, -96.9], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  markersLayer.addTo(map);
  map.on("moveend", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      loadMarkersWithinBounds();
    }, 500);
  });

  setupFilters();
  loadMarkersWithinBounds();
}

function getMapBounds() {
  const bounds = map.getBounds();
  return {
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    west: bounds.getWest()
  };
}

async function loadMarkersWithinBounds() {
  const bounds = getMapBounds();
  const snapshot = await getDocs(collection(db, "locations"));

  const filters = getCurrentFilters();

  markersLayer.clearLayers();

  snapshot.forEach(doc => {
    const data = doc.data();
    const lat = data.latitude;
    const lng = data.longitude;

    if (
      lat >= bounds.south && lat <= bounds.north &&
      lng >= bounds.west && lng <= bounds.east &&
      passesFilter(data, filters)
    ) {
      const marker = L.circleMarker([lat, lng], getMarkerStyle(data)).bindPopup(`<b>${data.name}</b><br>${data.description || ''}`);
      markersLayer.addLayer(marker);
    }
  });
}

function getCurrentFilters() {
  const form = document.getElementById("filter-form");
  const checkboxes = form.querySelectorAll("input[type='checkbox']:checked");
  return Array.from(checkboxes).map(cb => cb.value);
}

function passesFilter(data, filters) {
  if (!filters.length) return true;
  const tags = data.tags || [];
  return filters.some(f => tags.includes(f) || data.type === f);
}

function setupFilters() {
  const form = document.getElementById("filter-form");
  form.addEventListener("change", () => {
    loadMarkersWithinBounds();
  });
}

function getMarkerStyle(data) {
  const type = data.type || "other";
  const colorMap = {
    "Hiking": "green",
    "Free Camping": "blue",
    "Swimming Hole": "cyan",
    "Other": "gray"
  };
  return {
    radius: 6,
    fillColor: colorMap[type] || "orange",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
}

document.addEventListener("DOMContentLoaded", initMap);


