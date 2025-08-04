function initMap() {

    const frankfurt = { lat: 50.1109, lng: 8.6821, info: "Start: Frankfurt am Main" };
    const wuerzburg = { lat: 49.7913, lng: 9.9534, info: "Station 1: Würzburg" };
    const nuernberg = { lat: 49.4521, lng: 11.0767, info: "Station 2: Nürnberg" };
    const muenchen = { lat: 48.1351, lng: 11.5820, info: "Ziel: München" };

    const locations = [frankfurt, wuerzburg, nuernberg, muenchen];
    const route = [frankfurt, wuerzburg, nuernberg, muenchen]; 

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 49.5, lng: 10.0 },
        mapTypeId: 'roadmap'
    });

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

    const travelPath = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    travelPath.setMap(map);

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

    const trainSymbol = {
        url: 'train-icon.png', // Der Dateiname Ihres neuen Bildes
        scaledSize: new google.maps.Size(50, 50), // Die Größe des Symbols (Breite, Höhe)
        anchor: new google.maps.Point(25, 25) // Der Mittelpunkt des Symbols
    };

    const trainMarker = new google.maps.Marker({
        position: route[0],
        map: map,
        icon: trainSymbol,
        zIndex: 99
    });

    let animationInterval;
    function animateTrain() {
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        let step = 0;
        let segment = 0; 
        const totalSteps = 100; 
        const timePerStep = 20; 

        animationInterval = setInterval(() => {
            step++;
            if (step > totalSteps) {
                step = 0;
                segment++;
                if (segment >= route.length - 1) {
                    clearInterval(animationInterval); 
                    return;
                }
            }
            
            const startPoint = route[segment];
            const endPoint = route[segment + 1];
            const lat = startPoint.lat + (endPoint.lat - startPoint.lat) * (step / totalSteps);
            const lng = startPoint.lng + (endPoint.lng - startPoint.lng) * (step / totalSteps);

            trainMarker.setPosition({ lat, lng });

        }, timePerStep);
    }
    
    document.getElementById('start-animation').addEventListener('click', () => {
        trainMarker.setPosition(route[0]);
        animateTrain();
    });
}