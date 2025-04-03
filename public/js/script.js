const socket = io();

if (navigator.geolocation)
{
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('send-location',{latitude, longitude});
    }, (error) => {
        console.error('Error getting location:', error);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
}

const map = L.map('map').setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.github.com/Harsh0369">Harsh</a>',
}).addTo(map);

const markers = {}

socket.on('recieve-location', (data) => {
    const { id, latitude, longitude } = data;
    console.log(data)
    map.setView([latitude, longitude], 15);
    if (markers[id])
    {
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
})
 
socket.on('user-disconnected', (id) => {
    if (markers[id])
    {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
    console.log('User disconnected:', id);
})