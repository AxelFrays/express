// JS cote clietn <3
window.addEventListener('load', launch);

function launch(){
	fetch('http://' + location.host + '/carte').then(function(res) {
		return res.json();
	}).then(function(data) {
		initiateCesium(data);

	}).catch(function(error) {
		alert('AHH!');
	});
}

function initiateCesium(data) {
	var viewer = new Cesium.Viewer('cesiumContainer');
	
	viewer.entities.add({
		name: 'My Super path',
		polyline: {
			positions: data.map(function(coords){
				return Cesium.Cartesian3.fromDegrees(coords.long, coords.lat, coords.alt);
			}),
			id: {
				poulet:5
			}
		}
	});
}