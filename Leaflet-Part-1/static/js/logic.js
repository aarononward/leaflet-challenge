let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };

    Earthquakes = new L.LayerGroup()

    
    let map = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [Earthquakes]
    });

    streetmap.addTo(map);

    let overlays = {
        "Earthquakes": Earthquakes
    };

    L.control.layers(null, overlays).addTo(map);

    let info=L.control({
        position: "bottomright"
    });

    info.onAdd =function() {
        let div = L.DomUtil.create("div", "legend");
        return div;
    }
    info.addTo(map)

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson").then(function(earthquakeData) {
    let earthquakes = earthquakeData.features
   
    let depthRange
    for (let i=0; i<  earthquakes.length; i++){    
        let earthquake= earthquakes[i]
        let coordinates = earthquake.geometry.coordinates
        let latitude = coordinates[1]
        let longitude = coordinates[0]
        let depth = coordinates[2]
        let magnitude = earthquake.properties.mag
        if (depth < 10) {
            depthRange = "<10",
            L.circle([latitude,longitude], {
                color: "#00CC00",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
        else if (depth < 30) {
            depthRange = "10-30",
            L.circle([latitude,longitude], {
                color: "#FFFF33",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
        else if (depth < 50) {
            depthRange = "30-50",
            L.circle([latitude,longitude], {
                color: "#FFC300",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
        else if (depth < 70) {
            depthRange = "50-70",
            L.circle([latitude,longitude], {
                color: "#FF5733",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
        else if (depth < 90) {
            depthRange = "70-90",
            L.circle([latitude,longitude], {
                color: "#FF3300",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
        else if (depth > 90) {
            depthRange = "90+",
            L.circle([latitude,longitude], {
            color: "#990000",
            fillOpacity : 0.5,
            radius: (magnitude*50000)
            }).bindPopup(`<h3>Location : [${latitude} ,  ${longitude}]</h3><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p>`).addTo(map);
        }
    };
        
});

// function createFeatures(earthquakeData) {
//     function onEachFeature(feature, layer) {
//         let myIcon = L.icon({
//             iconSize: [feature.properties.mag],
//             //markerColor: feature.geometry.coordinates[2]
//         })
//         layer.bindPopup(`<h3>Location : [${feature.geometry.coordinates[1]} ,  ${feature.geometry.coordinates[0]}]</h3><hr>
//         <p>Date: ${new Date(feature.properties.time)}</p><hr>
//         <p>Magnitude : ${feature.properties.mag}</p><hr>
//         <p>Depth: ${feature.geometry.coordinates[2]}</p>`);
//     }

    // let earthquakes = L.geoJSON(earthquakeData), {
//         onEachFeature: onEachFeature
//     });

//     //send earthquakes layer to createMap functions
//     createMap(earthquakes);
// }
//Creating variable to store URL for API call
// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

// //GET request to query URL
// let earthquakeData = d3.json(queryUrl)//.then(function (data) {
//     //createFeatures(data.features);
// //});

// let earthquakes = L.geoJSON(earthquakeData)
// //Base Layers.
// let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
    
//Create baseMaps object
// let baseMaps = {
//     "Street Map": street
// };

//Create earthquakes overlay
// let overlayMaps = {
//     Earthquakes : earthquakes
// };

// Create map with layers


//Create layer control
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: true
// }).addTo(myMap);



// let info = L.control({
//     position: "bottomright"
// })
// info.onAdd = function() {
//     let div = L.DomUtil.create("div","legend");
//     return div;
// };

// info.addTo(myMap)

