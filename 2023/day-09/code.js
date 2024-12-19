import { getInput, sum } from '../../utils.js';

const HISTORY = getInput().map(line => line.match(/(-?\d+)/g).map(v => Number(v)));

function getPredictions(history) {
    let prediction = history.slice(1).map((x,i)=> x-history[i])
    const predictions = [history];
    while (!prediction.every(val => val === 0)) {
        predictions.push(prediction)
        prediction = prediction.slice(1).map((x,i)=> x-prediction[i])
    }
    prediction.push(0)
    predictions.push(prediction);
    return predictions;
}

function extrapolate(history) {
    const predictions = getPredictions(history);
    for (let i = predictions.length - 2; i >= 0; i--) {
        predictions[i].push(predictions[i].slice(-1)[0] + predictions[i+1].slice(-1)[0])
    }
    return predictions[0].pop();
}

function extrapolateLeft(history) {
    const predictions = getPredictions(history);
    for (let i = predictions.length - 2; i >= 0; i--) {
        predictions[i].unshift(predictions[i][0] - predictions[i+1][0])
    }
    return predictions[0][0];
}

console.log('Uno:',sum(HISTORY.map(extrapolate)));
console.log('Due:',sum(HISTORY.map(extrapolateLeft)));