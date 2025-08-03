// Diese Funktion wird automatisch aufgerufen, sobald die Google Maps API geladen ist.
function initMap() {
    // 1. Definiere die Städte unserer Reise mit Koordinaten und Titeln
    const frankfurt = { lat: 50.1109, lng: 8.6821 };
    const wuerzburg = { lat: 49.7913, lng: 9.9534 };
    const nuernberg = { lat: 49.4521, lng: 11.0767 };
    const muenchen = { lat: 48.1351, lng: 11.5820 };

    const locations = [
        { pos: frankfurt, title: 'Start: Frankfurt' },
        { pos: wuerzburg, title: 'Station 1: Würzburg' },
        { pos: nuernberg, title: 'Station 2: Nürnberg' },
        { pos: muenchen, title: 'Ziel: München' }
    ];

    // 2. Erstelle die Karte und zentriere sie auf Deutschland
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 49.5, lng: 10.0 }, // Zentriert auf Süddeutschland
        mapTypeId: 'roadmap'
    });

    // 3. Erstelle für jede Stadt einen Marker auf der Karte
    locations.forEach(location => {
        new google.maps.Marker({
            position: location.pos,
            map: map,
            title: location.title
        });
    });

    // 4. Definiere die Reiseroute als eine Linie, die die Städte verbindet
    const flightPlanCoordinates = [
        frankfurt,
        wuerzburg,
        nuernberg,
        muenchen
    ];

    const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000', // Rote Farbe für die Linie
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    // Zeichne die Linie auf der Karte
    flightPath.setMap(map);
}