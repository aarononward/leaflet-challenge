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

    function getColor(depths) {
        return  depths < 10 ? "#11b556" :
                depths < 30 ? "#b3ff00" :
                depths < 50 ? "#f1ff33" :
                depths < 70 ? "#cda102" :                
                depths < 90 ? "#FF3300" :
                "#990000"; 
    }
   L.control.layers(null,overlays, { 
    collapsed:false
   }).addTo(map)

    let info=L.control({
        position: "bottomright"
    });


    info.onAdd =function() {
        let div = L.DomUtil.create("div", "legend"),
        depths = [0,10,30,50,70,90],
        labels = [];

        for (let i = 0; i<depths.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i>' + 
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i+1] +'<br>': '+');
        }
        return div;
    }
    info.addTo(map)


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson").then(function(earthquakeData) {
    let earthquakes = earthquakeData.features
   
    let depthRange
    for (let i=0; i<  earthquakes.length; i++){    
        let earthquake= earthquakes[i]
        let title = earthquake.properties.title
        let date = Date(earthquake.properties.time)
        let coordinates = earthquake.geometry.coordinates
        let latitude = coordinates[1]
        let longitude = coordinates[0]
        let depth = coordinates[2]
        let magnitude = earthquake.properties.mag
        if (depth < 10) {
            depthRange = "<10",
            L.circle([latitude,longitude], {
                color: "#11b556",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
        else if (depth < 30) {
            depthRange = "10-30",
            L.circle([latitude,longitude], {
                color: "#b3ff00",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
        else if (depth < 50) {
            depthRange = "30-50",
            L.circle([latitude,longitude], {
                color: "#f1ff33",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
        else if (depth < 70) {
            depthRange = "50-70",
            L.circle([latitude,longitude], {
                color: "#cda102",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
        else if (depth < 90) {
            depthRange = "70-90",
            L.circle([latitude,longitude], {
                color: "#FF3300",
                fillOpacity : 0.5,
                radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
        else if (depth > 90) {
            depthRange = "90+",
            L.circle([latitude,longitude], {
            color: "#990000",
            fillOpacity : 0.5,
            radius: (magnitude*50000)
            }).bindPopup(`<h3>${title}</h3><hr>
            <p>Date: ${date}</p><hr>
            <p>Location : [${latitude} ,  ${longitude}]</p><hr> 
            <p>Magnitude : ${magnitude}</p><hr>
            <p>Depth: ${depth}</p><hr>`).addTo(map);
        }
    };
        
});
