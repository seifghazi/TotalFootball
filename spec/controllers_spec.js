let chartsController = require('../controllers/charts_controller');

describe('chart object being populated given certain input', () => {
  it('should return object with no data points or labels', () => {
     const chartObject = chartsController.scorersChartSetup([]);
     expect(chartObject.data.labels).toEqual([]);
     expect(chartObject.data.datasets[0].data).toEqual([]);
  })
  it('should return object with equal number of data points and labels', () => {
    let scorers = [
      {
        player: {
          name: 'Player A'
        },
        numberOfGoals: '3'
      }
    ];
    const chartObject = chartsController.scorersChartSetup(scorers);

    expect(chartObject.data.labels[0]).toEqual(scorers[0].player.name);
    expect(chartObject.data.datasets[0].data[0]).toEqual(parseInt(scorers[0].numberOfGoals));
    expect(chartObject.data.labels.length).toBe(1);
    expect(chartObject.data.datasets[0].data.length).toBe(1);

    scorers.push(
      {
        player: {
          name: 'Player B'
        },
        numberOfGoals: '1'
      }
    );
    
    const updatedChartObject = chartsController.scorersChartSetup(scorers);

    expect(updatedChartObject.data.labels[1]).toEqual(scorers[1].player.name);
    expect(updatedChartObject.data.datasets[0].data[1]).toEqual(parseInt(scorers[1].numberOfGoals));
    expect(updatedChartObject.data.labels.length).toBe(2);
    expect(updatedChartObject.data.datasets[0].data.length).toBe(2);
 })
})
