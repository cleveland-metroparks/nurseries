L.mapbox.accessToken = 'pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA';

var southWest = L.latLng(33.064, -99.053),
    northEast = L.latLng(50.679, -69.697),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map').setView([41.447, -81.714], 17);
 
L.tileLayer('../tiles/{z}/{y}/{x}.png', {
	maxZoom: 21,
	minZoom: 16
}).addTo(map)
;	



// Makes the menus work
$('.menu-ui a').on('click', function() {
    // For each filter link, get the 'data-filter' attribute value.
    var filter = $(this).data('filter');
    $(this).addClass('active').siblings().removeClass('active');
    featureLayer.setFilter(function(f) {
        // If the data-filter attribute is set to "all", return
        // all (true). Otherwise, filter on markers that have
        // a value set to true based on the filter name.
        return (filter === 'all') ? true : f.properties[filter] === true;
    });
    return false;
});

	var markers = L.markerClusterGroup();

// Note that calling `.eachLayer` here depends on setting GeoJSON _directly_
// above. If you're loading GeoJSON asynchronously, like from CSV or from a file,
// you will need to do this within a `featureLayer.on('ready'` event.
featureLayer.eachLayer(function(layer) {

    // here you call `bindPopup` with a string of HTML you create - the feature
    // properties declared above are available under `layer.feature.properties`
    var content = '<div>' + '<h2>' + layer.feature.properties.locationa + '</h2>' +
		'<h3>' + layer.feature.properties.locationb + '</h3>' +
        '<p class="popup-p">' + '<span>Barrier: </span>' + layer.feature.properties.barrier + '</p>' +
        '<p class="popup-p">' + '<span>ADAAG: </span>' + layer.feature.properties.adaag + '</p>' +
        '<p class="popup-p">' + '<span>Solution: </span>' + layer.feature.properties.solution + '</p>' 
 //		'<p class="popup-p">' + ( layer.feature.properties.Facebook !== 'mull' ? '<span>Website: </span>' + '<a href="' + layer.feature.properties.fulcrum_id + '" target="_blank">' + layer.feature.properties.fulcrum_id : "") + '</a>' + '</p>'	
	+ '</p>' + '</div>';

	markers.addLayer(layer);
    layer.bindPopup(content);
				
});

map.addLayer(markers);

var searchControl = new L.Control.Search({layer: markers, propertyName: 'Barrier', circleLocation:true});

	searchControl.on('search_locationfound', function(e) {
		
		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search_collapsed', function(e) {

		featuresLayer.eachLayer(function(layer) {	//restore feature color
			featuresLayer.resetStyle(layer);
		});	
	});
	
map.addControl( searchControl );  //inizialize search control
