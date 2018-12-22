function scorersChartSetup(scorersList) {
  let scorerNames = [];
  var dataPoints = [];
  // populate chart params with scorer data
  scorersList.forEach((scorer) => {
    scorerNames.push(scorer.player.name);
    dataPoints.push(parseInt(scorer.numberOfGoals));
  })
  let chartDataObject = {
    type: 'horizontalBar',
    data: {
      labels: scorerNames,
      datasets: [{
        label: '# of Goals',
        data: dataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRation: false,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
  return chartDataObject;
}


module.exports = {
  scorersChartSetup: scorersChartSetup
}
