// map-v2.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const map = L.map('map').setView([37.8, -96], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

const markers = L.layerGroup().addTo(map);

function getColorByType(type) {
  switch (type) {
    case 'hiking': return 'green';
    case 'free-camping': return 'blue';
    case 'swimming': return 'cyan';
    case 'camping': return 'orange';
    default: return 'gray';
  }
}

function createMarker(doc) {
  const data = doc.data();
  const marker = L.circleMarker([data.latitude, data.longitude], {
    radius: 8,
    fillColor: getColorByType(data.type),
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });
  marker.bindPopup(`<strong>${data.name}</strong><br>${data.description || ''}`);
  return marker;
}

async function loadData() {
  markers.clearLayers();

  // Get selected filters
  const form = document.getElementById('filter-form');
  const selectedTypes = Array.from(form.elements['type'])
    .filter(el => el.checked)
    .map(el => el.value);

  let q = query(collection(db, 'locations'), limit(500));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();
    if (selectedTypes.length === 0 || selectedTypes.includes(data.type)) {
      const marker = createMarker(doc);
      markers.addLayer(marker);
    }
  });
}

function setupStaticFilters() {
  const popularFilters = ["free-camping", "camping", "hiking", "swimming"];
  const container = document.getElementById('popular-filters');
  popularFilters.forEach(type => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" name="type" value="${type}" checked> ${type.replace('-', ' ').toUpperCase()}`;
    container.appendChild(label);
  });
}

function setupFilterListener() {
  document.getElementById('filter-form').addEventListener('change', loadData);
}

setupStaticFilters();
setupFilterListener();
loadData();


