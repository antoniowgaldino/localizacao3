function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }

    var div1 = document.getElementById("google-maps-link");
    div1.style.display = "block";

    var div2 = document.getElementById("whatsapp-link");
    div2.style.display = "block";
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Exibindo mapa usando API do Google Maps
    var mapDiv = document.getElementById('map');
    var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=19&size=400x300&markers=color:green%7C' + latitude + ',' + longitude + '&key=AIzaSyDlH165ZQT9IS3c5WHptaFeD88oto6GEYs';
    mapDiv.innerHTML = '<img src="' + mapUrl + '" alt="Mapa">';

    // Mostra as coordenadas na tela
    var coordinatesDiv = document.getElementById("coordinates");
    coordinatesDiv.textContent = `Coordenadas: Latitude ${latitude.toFixed(6)}, Longitude ${longitude.toFixed(6)}`;

    // Obtém o endereço usando Geocodificação reversa do Google Maps
    var geocoder = new google.maps.Geocoder();
    var latlng = { lat: latitude, lng: longitude };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var address = results[0].formatted_address;
                var addressDiv = document.getElementById("address");
                addressDiv.textContent = `Endereço: ${address}`;

                // Atualiza o link do Google Maps
                var googleMapsLink = document.getElementById("google-maps-link");
                googleMapsLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;

                // Atualiza o link do WhatsApp
                var whatsappLink = document.getElementById("whatsapp-link");
                whatsappLink.href = `https://wa.me/?text=Minha%20localiza%C3%A7%C3%A3o%3A%0A${latitude.toFixed(6)}%2C%20${longitude.toFixed(6)}%0A${encodeURIComponent(address)}%0Ahttps://maps.google.com/?q=${latitude},${longitude}`;

                // Mostra os links após obter a localização
                var linkContainer = document.querySelector(".link-container");
                linkContainer.style.display = 'flex';
            } else {
                console.error('Nenhum resultado encontrado para esta localização.');
            }
        } else {
            console.error('Geocoder falhou devido a: ' + status);
        }
    });

    // Mostra a data e hora atuais
    var now = new Date();
    var datetimeDiv = document.getElementById("datetime");
    datetimeDiv.textContent = `Data e Hora: ${now.toLocaleString()}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permissão de geolocalização negada pelo usuário.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Localização indisponível.");
            break;
        case error.TIMEOUT:
            alert("Tempo expirado para obter a localização.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Erro desconhecido ao obter a localização.");
            break;
    }
}