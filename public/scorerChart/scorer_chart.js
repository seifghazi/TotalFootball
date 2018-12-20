let chartData = JSON.parse(document.getElementById('scorers').innerText);
var ctx = document.getElementById("scorersChart").getContext('2d');

var myChart = new Chart(ctx, chartData);
