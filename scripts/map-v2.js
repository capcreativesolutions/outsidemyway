
// map-v2.js

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize map
const map = L.map('map').setView([39.5, -98.35], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const allMarkers = [];
let currentMarkers = [];

function createMarkerIcon(typeOrTags) {
  const colorMap = {
    "hiking": "green",
    "camping": "orange",
    "free camping": "blue",
    "swimming": "deepskyblue",
    "visitor center": "purple",
    "rock climbing": "darkred",
    "wheelchair accessible": "gold",
    "dog-friendly": "brown",
    "picnic area": "olive",
    "other": "gray"
  };

  let color = "gray";

  // Check if `typeOrTags` is a string or array
  if (typeof typeOrTags === "string") {
    color = colorMap[typeOrTags.toLowerCase()] || "gray";
  } else if (Array.isArray(typeOrTags)) {
    for (let tag of typeOrTags) {
      const tagLower = tag.toLowerCase();
      if (colorMap[tagLower]) {
        color = colorMap[tagLower];
        break;
      }
    }
  }

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;"></div>`
  });
}

function renderMapPins(locations) {
  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];
  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: createMarkerIcon(loc.tags.length > 0 ? loc.tags : loc.type)
    })
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.description || ''}`)
    .addTo(map);
    currentMarkers.push(marker);
  });
}


function filterMapPins() {
  const activePopular = Array.from(document.querySelectorAll('.popular-filter-checkbox:checked')).map(cb => cb.value);
  const activeMore = Array.from(document.querySelectorAll('.more-filter-checkbox:checked')).map(cb => cb.value);
  let filtered = allMarkers;
  if (activePopular.length > 0) {
    filtered = filtered.filter(m => activePopular.includes(m.type));
  }
  if (activeMore.length > 0) {
    filtered = filtered.filter(m => activeMore.some(tag => (m.tags || []).includes(tag)));
  }
  renderMapPins(filtered);
}

function fetchAndDisplayData() {
  db.collection("locations").get().then(snapshot => {
    allMarkers.length = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      allMarkers.push({
        name: data.name,
        lat: data.latitude,
        lng: data.longitude,
        type: data.type || "Other",
        description: data.description || "",
        tags: data.tags || []
      });
    });
    renderMapPins(allMarkers);
  });
}

// Add event listeners to filters
document.querySelectorAll('.popular-filter-checkbox, .more-filter-checkbox')
  .forEach(el => el.addEventListener('change', filterMapPins));

document.getElementById("search").addEventListener("input", function() {
  const term = this.value.toLowerCase();
  const filtered = allMarkers.filter(m => m.name.toLowerCase().includes(term));
  renderMapPins(filtered);
});

// Start
fetchAndDisplayData();
