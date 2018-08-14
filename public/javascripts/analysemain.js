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


function plotall(data){
    //là dedans on utilise plotly
    console.log("On est dedans");

    var layout1 = {
        yaxis: {rangemode: 'tozero',
            showline: true,
            zeroline: true}
    };
    var newPlot = Plotly.newPlot('myDiv', data);
}
