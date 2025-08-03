// This function will run when the Google Maps API is ready.
function initMap() {

    // 1. Define the locations for our trip.
    const frankfurt = { lat: 50.1109, lng: 8.6821, info: "Start: Frankfurt am Main" };
    const wuerzburg = { lat: 49.7913, lng: 9.9534, info: "Station 1: Würzburg" };
    const nuernberg = { lat: 49.4521, lng: 11.0767, info: "Station 2: Nürnberg" };
    const muenchen = { lat: 48.1351, lng: 11.5820, info: "Ziel: München" };

    const locations = [frankfurt, wuerzburg, nuernberg, muenchen];

    // 2. Create the map, centered on Southern Germany.
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 49.5, lng: 10.0 },
        mapTypeId: 'roadmap'
    });

    // 3. Create markers AND info windows.
    const infoWindow = new google.maps.InfoWindow();

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: location.info
        });

        // NEW: Add a click listener to each marker.
        marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        });
    });

    // 4. Draw the travel route on the map.
    const travelPath = new google.maps.Polyline({
        path: locations,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    travelPath.setMap(map);

    // 5. NEW: Add click listeners to the text links.
    document.getElementById('wuerzburg-link').addEventListener('click', () => {
        map.panTo(wuerzburg);
        map.setZoom(12);
    });

    document.getElementById('nuernberg-link').addEventListener('click', () => {
        map.panTo(nuernberg);
        map.setZoom(12);
    });

    document.getElementById('muenchen-link').addEventListener('click', () => {
        map.panTo(muenchen);
        map.setZoom(12);
    });
}