// Diese Funktion wird automatisch aufgerufen, sobald die Google Maps API geladen ist.
function initMap() {

    // 1. Definiere die Städte unserer Reise.
    const frankfurt = { lat: 50.1109, lng: 8.6821, info: "Start: Frankfurt am Main" };
    const wuerzburg = { lat: 49.7913, lng: 9.9534, info: "Station 1: Würzburg" };
    const nuernberg = { lat: 49.4521, lng: 11.0767, info: "Station 2: Nürnberg" };
    const muenchen = { lat: 48.1351, lng: 11.5820, info: "Ziel: München" };

    const locations = [frankfurt, wuerzburg, nuernberg, muenchen];
    const route = [frankfurt, wuerzburg, nuernberg, muenchen]; // Eigene Variable für die Route

    // 2. Erstelle die Karte.
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 49.5, lng: 10.0 },
        mapTypeId: 'roadmap'
    });

    // 3. Erstelle die Marker und Info-Fenster.
    const infoWindow = new google.maps.InfoWindow();
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: location.info
        });
        marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        });
    });

    // 4. Zeichne die Reiseroute.
    const travelPath = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    travelPath.setMap(map);

    // 5. Füge Klick-Events zu den Text-Links hinzu.
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

    // ======================================================
    // NEU: Animations-Logik
    // ======================================================

    // 6. Erstelle das Zug-Symbol.
    const trainSymbol = {
        path: 'M21,16.5C21,17.9 19.9,19 18.5,19C17.1,19 16,17.9 16,16.5C16,15.1 17.1,14 18.5,14C19.9,14 21,15.1 21,16.5M9,16.5C9,17.9 7.9,19 6.5,19C5.1,19 4,17.9 4,16.5C4,15.1 5.1,14 6.5,14C7.9,14 9,15.1 9,16.5M20,8H17.8C17.4,6.2 15.9,5 14,5H10C8.1,5 6.6,6.2 6.2,8H4C2.9,8 2,8.9 2,10V16.5C2,17.3 2.4,18 3,18.5V20C3,20.6 3.4,21 4,21H5C5.6,21 6,20.6 6,20V19H18V20C18,20.6 18.4,21 19,21H20C20.6,21 21,20.6 21,20V18.5C21.6,18 22,17.3 22,16.5V10C22,8.9 21.1,8 20,8Z',
        scale: 1.5,
        strokeColor: 'white',
        strokeWeight: 2,
        fillColor: '#4488FF',
        fillOpacity: 1,
        anchor: new google.maps.Point(12, 12)
    };

    const trainMarker = new google.maps.Marker({
        position: route[0],
        map: map,
        icon: trainSymbol,
        zIndex: 99
    });

    // 7. Die Animationsfunktion.
    let animationInterval;
    function animateTrain() {
        // Stoppe eine laufende Animation, bevor eine neue startet.
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        let step = 0;
        let segment = 0; // Welcher Teil der Route (0 = F nach W, 1 = W nach N, etc.)
        const totalSteps = 100; // Anzahl der Schritte pro Segment
        const timePerStep = 20; // Zeit pro Schritt in Millisekunden

        animationInterval = setInterval(() => {
            step++;
            if (step > totalSteps) {
                step = 0;
                segment++;
                if (segment >= route.length - 1) {
                    clearInterval(animationInterval); // Animation am Ende stoppen
                    return;
                }
            }
            
            // Berechne die aktuelle Position zwischen zwei Punkten
            const startPoint = route[segment];
            const endPoint = route[segment + 1];
            const lat = startPoint.lat + (endPoint.lat - startPoint.lat) * (step / totalSteps);
            const lng = startPoint.lng + (endPoint.lng - startPoint.lng) * (step / totalSteps);

            trainMarker.setPosition({ lat, lng });

        }, timePerStep);
    }
    
    // 8. Füge einen Klick-Event zur neuen Schaltfläche hinzu.
    document.getElementById('start-animation').addEventListener('click', () => {
        // Setze den Zug an den Anfang zurück und starte die Animation.
        trainMarker.setPosition(route[0]);
        animateTrain();
    });
}