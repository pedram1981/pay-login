import L from 'leaflet';

function sendData(){
	var wmsLayer = L.tileLayer.wms('https://sdi.tabriz.ir/geoserver/wms/', {
        layers: 'GeoTajak:bus',
        format: 'image/png',
        transparent: true,
        version: '1.3.0'
    });

    }
    
export {
    sendData
}
