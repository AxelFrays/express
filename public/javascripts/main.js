// JS cote clietn <3
window.addEventListener('load', launch);

function launch(){
	fetch('http://' + location.host + '/carte').then(function(res) {
		return res.json();
	}).then(function(data) {
		document.body.innerText = JSON.stringify(data);

	}).catch(function(error) {
		alert('AHH!');
	});
}