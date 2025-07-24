
// map-v2.js - Trek4Free
// Handles Firebase data fetching, custom markers, and filtering logic

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
const map = L.map('map').setView([37.8, -96], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const iconUrls = {
  Hiking: 'images/markers/hiking.png',
  Camping: 'images/markers/camping.png',
  Swimming: 'images/markers/swimming.png',
  Biking: 'images/markers/biking.png',
  Climbing: 'images/markers/climbing.png',
  Default: 'images/markers/default.png'
};

function createMarkerIcon(category) {
  return L.icon({
    iconUrl: iconUrls[category] || iconUrls.Default,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
  });
}

function loadMapData() {
  db.collection("locations").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const icon = createMarkerIcon(data.category);
      const marker = L.marker([data.lat, data.lng], { icon }).addTo(map);
      marker.bindPopup(\`<b>\${data.name}</b><br>\${data.description || ''}\`);
    });
  });
}

loadMapData();
