// JS cote client
window.addEventListener('load', launch);

function launch(){
	fetch('http://' + location.host + '/analyse').then(function(res) {
		return res.send();
	}).then(function(data){
		console.log("dans la fonction");
		plotall(data);

	}).catch(function(error) {
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
	let current =  data.map(el => {
		return {x: el.t, y: el.curr};
	});

	let payload =  data.map(el => {
		return {x: el.t, y: el.padyload_regression};
	});

	return { current, payload };
}

function plotall(data){
	let {current, payload} = format(data);

	let chart_data = {
		datasets: [
			getDataset('Courant', current, 'courant', chartColors.blue),
			getDataset('Payload', payload, 'payload', chartColors.red)
		]
	};

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
					id: 'y-axis-1',
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'y-axis-2',
					gridLines: {
						drawOnChartArea: false,
					},
				}],
			}
		}
	})
}
