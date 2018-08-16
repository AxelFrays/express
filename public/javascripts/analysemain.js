// JS cote client
window.addEventListener('load', launch);

function launch(){
	fetch('http://' + location.host + '/analyse').then(function(res) {
		return res.json();
	}).then(function(data){
		document.querySelector("#rupture").innerText = "Rupture: " + Math.floor(data.rupturedate) + "s";
		plotall(data);

	}).catch(function(error) {
		console.log(error);
		alert('l initialisation n a pas fonctionné');
	});
}

function getDataset(name, data, yid, color, opts = {}){
	return {
		label: name,
		data, 
		fill: opts.fill || false,
		backgroundColor: color,
		borderColor: color, 
		yAxisID: yid
	};
}

function format(data){
	let current =  data['raw'].map(el => {
		return {x: el.t, y: el.curr};
	});

	//let payload =  data.map(el => {
	//	return {x: el.t, y: el['payload_regression']};
	//});

	let payload= data['payloadapproximation'];


	return { current, payload };
}

function plotall(data){
	let {current, payload} = format(data)
//	let {current, payload} = format(data.raw);

	let chart_data = {
		datasets: [
			getDataset('Courant', current, 'courant', 'rgb(0,0,255)'),
			getDataset('Payload', payload, 'payload', 'rgb(255,0,0)')
		]
	};


	console.info('DATAAAAAA', chart_data);
	// get canvas context
	let ctx = document.querySelector('canvas').getContext('2d');

	let chart = Chart.Line(ctx, {
		data: chart_data,
		options: {
			responsive: true,
			hoverMode: 'index',
			stacked: false,
			title: {
				display: true,
				text: 'Chart.js Line Chart - Multi Axis'
			},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'courant',
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'payload'
				}],
				xAxes:[{
					type: 'linear',
					position: 'bottom'
				}]
			}
		}
	})
}
