// Function to calculate the marker size based on earthquake magnitude
function markerSize(magnitude) {
  return magnitude * 10000; // Adjust the multiplier as needed to achieve the desired size
}

// Function to determine the marker color based on earthquake depth
function markerColor(depth) {
  if (depth > 15) {
    return "darkred";
  } else if (depth > 10) {
    return "red";
  } else if (depth > 7) {
    return "orange";
  } else if (depth > 5) {
    return "yellow";
  } else if (depth > 3) {
    return "green";
  } else {
    return "lightgreen";
  }
}

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Create magnitude markers
  let magnitudeMarkers = [];
  // Create depth markers
  let depthMarkers = [];

  for (let i = 0; i < earthquakeData.length; i++) {
    let feature = earthquakeData[i];

    // Setting the marker radius based on magnitude and color based on depth
    let magnitudeMarker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      stroke: false,
      fillOpacity: 0.75,
      color: markerColor(feature.geometry.coordinates[2]),
      fillColor: markerColor(feature.geometry.coordinates[2]),
      radius: markerSize(feature.properties.mag)
    });

    // Adding popups to the magnitude markers
    magnitudeMarker.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>Magnitude: ${feature.properties.mag}<hr>Depth: ${feature.geometry.coordinates[2]}km</p>`);

    magnitudeMarkers.push(magnitudeMarker);

    // Setting the marker for depth
    let depthMarker = L.rectangle([
      [feature.geometry.coordinates[1] - 0.25, feature.geometry.coordinates[0] - 0.25],
      [feature.geometry.coordinates[1] + 0.25, feature.geometry.coordinates[0] + 0.25]
    ], {
      stroke: false,
      fillOpacity: 0.50,
      color: markerColor(feature.geometry.coordinates[2]),
      fillColor: markerColor(feature.geometry.coordinates[2])
    });

    // Adding popups to the depth markers
    depthMarker.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>Magnitude: ${feature.properties.mag}<hr>Depth: ${feature.geometry.coordinates[2]}km</p>`);
    depthMarkers.push(depthMarker);
  }

  // Create layer groups for magnitude and depth markers and pass them to the map
  createMap(L.layerGroup(magnitudeMarkers), L.layerGroup(depthMarkers));
}

function createMap(magnitudeMarkers, depthMarkers) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlays.
  let overlayMaps = {
    "Magnitude": magnitudeMarkers,
    "Depth": depthMarkers
  };

  // Create our map, giving it the streetmap and magnitude layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [topo, magnitudeMarkers, depthMarkers]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  (myMap); // Add a legend to the map 
  let legend = L.control({ position: 'bottomright' }); 
  
  legend.onAdd = function (map) {
     let div = L.DomUtil.create('div', 'info legend'), 
     grades = [0, 3, 5, 7, 10, 15], 
     labels = []; 

     // loop through our depth intervals and generate a label with a colored square for each interval 
     for (let i = 0; i < grades.length; i++) { 
      div.innerHTML += 
      '<i style="background:' + markerColor(grades[i] + 1) + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    } 
    
    return div;
   }; 

   legend.addTo(myMap);
}

  