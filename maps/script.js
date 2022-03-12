function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 18.536283692404467, lng: 73.84235341921585 },
        zoom: 13,
        mapId: '95dba0f809d8f186',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });
    const markers = [
        ["Empty Bin!!", 18.53828, 73.98862, "images/green.png", 60, 40],
        ["Half filled Bin!!", 18.51809, 73.87361, "images/yellow.png", 35, 40],
        ["Full Bin!!", 18.51549, 73.84546, "images/red.png", 75, 60],
        ["Half filled Bin!!", 18.47739, 73.82211, "images/yellow.png", 35, 40],
        ["Empty Bin!!", 18.51614, 73.91000, "images/green.png", 60, 40],
        ["Full Bin!!", 18.55748, 73.85438, "images/red.png", 75, 60],
        ["Empty Bin!!", 18.43669, 73.91858, "images/green.png", 60, 40],
        ["Full Bin!!", 18.48098, 73.72941, "images/red.png", 75, 60],
        ["Half filled Bin!!", 18.60955, 73.84614, "images/yellow.png", 35, 40],
        ["Empty Bin!!", 18.45883, 73.92717, "images/green.png", 60, 40],
    ]

    for (let i = 0; i < markers.length; i++) {
        const currMarker = markers[i];
        const marker = new google.maps.Marker({
            position: { lat: currMarker[1], lng: currMarker[2] },
            map,
            title: currMarker[0],
            icon: {
                url: currMarker[3],
                scaledSize: new google.maps.Size(currMarker[4], currMarker[5])
            },
            animation: google.maps.Animation.DROP
        });

        const infowindow = new google.maps.InfoWindow({
            content: `Dustbin is at Latitude ${currMarker[1]} and Longitude ${currMarker[2]}`,
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });

        });
    }


}

