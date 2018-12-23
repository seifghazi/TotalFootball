let chartData = JSON.parse(document.getElementById('scorers').innerText);
let ctx = document.getElementById("scorersChart").getContext('2d');
let myChart = new Chart(ctx, chartData);
