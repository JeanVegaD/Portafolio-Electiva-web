
var datos={
    "Titulo":"Carrara y caminata",
    "Organiza": "TEC, Centro Academico de Limon",
    "Ruta":
    [
        {
            "Latitud":"9.99883",
            "Longitud":"-83.03291",
            "Referencia":"Salida/Meta TEC Centro Academico de Limon",
            "Tipo":"meta",
            "Pertenece":"Ambos"
        },
        {
            "Latitud":"9.99917",
            "Longitud":"-83.03299",
            "Referencia":"Colegio de Limón Diurno",
            "Tipo":"punto",
            "Pertenece":"Ambos"
        },
        {
            "Latitud":"10.00195",
            "Longitud":"-83.03179",
            "Referencia":"Parque Asís Esna",
            "Tipo":"punto",
            "Pertenece":"Ambos"
        },
        {
            "Latitud":"10.00512",
            "Longitud":"-83.03566",
            "Referencia":"Playa Piuta",
            "Tipo":"punto",
            "Pertenece":"Ambos"
        },
        {
            "Latitud":"10.00900",
            "Longitud":"-83.04877",
            "Referencia":"Hotel Oasis del Caribe",
            "Tipo":"retorno",
            "Pertenece":"Ambos"
        },{
            "Latitud":"10.00923",
            "Longitud":"-83.06430",
            "Referencia":"Playa Bonita",
            "Tipo":"punto",
            "Pertenece":"Carrera"
        },
        {
            "Latitud":"10.00976",
            "Longitud":"-83.06714",
            "Referencia":"Playa Portete",
            "Tipo":"punto",
            "Pertenece":"Carrera"
        },
        {
            "Latitud":"10.00687",
            "Longitud":"-83.06799",
            "Referencia":"Villas Cacao",
            "Tipo":"retorno",
            "Pertenece":"Carrera"
        }
    ]

}

//crea el mapa de la carrera 
function cargarMapaCarrera(){


    var mymap = L.map('map_carrera').setView([9.9988, -83.03295], 17);
    
    /*var layer =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
*/
    
    var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mymap);
    

    MarkersName=getMarkersNameCarrera();

    
    L.Routing.control({
        waypoints: getWaypointsCarrera(),
        routeWhileDragging:false,
        createMarker: function(waypointIndex, waypoint, numberOfWaypoints)
        {
            return L.marker(waypoint.latLng).bindPopup(MarkersName[waypointIndex]);
        }
      }).addTo(mymap);

} 

//obtiene los marcadores del json 
function getWaypointsCarrera(){
    var waypoints=[];
    rutasCarrera=datos["Ruta"];
    rutasCarrera.forEach((e)=>{
        waypoints.push(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"])));
    });
   return waypoints;
}


function getMarkersNameCarrera(){
    var  MarkersName=[];
    rutasCarrera=datos["Ruta"];
    rutasCarrera.forEach((e)=>{
        MarkersName.push(e["Referencia"]);
    });
   return MarkersName;
}



//crea el mapa de la caminata 
function cargarMapaCaminata(){
    var mymap2 = L.map('map_caminata').setView([9.9988, -83.03295], 17);

    /*var layer =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap2);*/

    var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mymap2);

    var todosLosPuntos= L.markerClusterGroup();
    var puntosAmbos= L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            return L.divIcon({ 
                html: '<i class="fas fa-walking"></i>',
                className: "clusterAmbos",
                iconSize: [50,50],
            });
        }
    });

    

    var puntosCarrera= L.markerClusterGroup(
        {
            iconCreateFunction: function(cluster) {
                return L.divIcon({ 
                    html: '<i class="fas fa-running"></i>',
                    className: "clusterCarrera",
                    iconSize: [50,50],
                });
            },
            
        }
    );
    

    rutasCarrera=datos["Ruta"];
    rutasCarrera.forEach((e)=>{
        if(e["Tipo"]=="retorno" || e["Tipo"]=="meta"){
            //puntosRelavantes.addLayer(L.marker(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"]))));
        }
        
        if(e["Pertenece"]=="Ambos" ){
            puntosAmbos.addLayer(L.marker(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"]))).bindPopup('Lugar: '+e["Referencia"] + "<br>" + "Ubicacion: "+ e["Latitud"] + ', '+  e["Longitud"]  ));
            todosLosPuntos.addLayer(L.marker(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"]))).bindPopup('Ubicacion: '+e["Referencia"]));
        }
        else{
            puntosCarrera.addLayer(L.marker(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"]))).bindPopup('Ubicacion: '+e["Referencia"] + "<br>" + "Ubicacion: "+ e["Latitud"] + ', '+  e["Longitud"]));
            todosLosPuntos.addLayer(L.marker(L.latLng(parseFloat(e["Latitud"]),parseFloat(e["Longitud"]))).bindPopup('Ubicacion: '+e["Referencia"] + "<br>" + "Ubicacion: "+ e["Latitud"] + ', '+ e["Longitud"]));
        } 
    });

    childerns= puntosCarrera.get

    //puntosRelavantes.addTo(mymap2);
    //mymap2.addLayer(puntosRelavantes);
    mymap2.addLayer(puntosAmbos);
    mymap2.addLayer(puntosCarrera);
    
    mymap2.fitBounds(todosLosPuntos.getBounds());
} 



cargarMapaCarrera();
cargarMapaCaminata();