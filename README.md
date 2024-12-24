# leaflet-challenge
leaflet.js project

# Earthquake and Tectonic Plates Map

This repository contains an interactive map that visualizes earthquake data and tectonic plate boundaries using Leaflet.js and D3.js. The map provides information on earthquake magnitudes, depths, and tectonic plate names.

## Features

- Interactive map with street and topographic layers
- Circle markers for earthquake magnitudes with color-coded depth information
- Rectangle markers for earthquake depths
- Popups with detailed information on each earthquake
- Legend indicating the color coding for earthquake depths
- Tectonic plate boundaries overlay with popups showing plate names

## Files

- `index.html`: Main HTML file containing the structure of the map
- `app.js`: JavaScript file containing the logic for fetching data, building the map, and adding layers

## Usage

To use this map, clone this repository and open `index.html` in your preferred web browser. The map will automatically load the earthquake and tectonic plate data and display the information.

### Functions in `app.js`

#### `markerSize(magnitude)`

Calculates the marker size based on earthquake magnitude.

#### `markerColor(depth)`

Determines the marker color based on earthquake depth.

#### `createFeatures(earthquakeData)`

Processes the earthquake data and creates circle markers for magnitudes and rectangle markers for depths. Adds popups with detailed information to each marker.

#### `createMap(magnitudeMarkers, depthMarkers)`

Initializes the map, adds base layers, and adds overlay layers for earthquake magnitudes and depths. Adds a legend to indicate the color coding for earthquake depths.

### Data Sources

- [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- current data is set to the 2.5 month history, but can be changed as needed. (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson)



## License

This project is licensed under the MIT License.
