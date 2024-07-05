const moment = require('moment');

let intervalId;
let seconds;

const start = (el) => {
    let time = moment.duration(el.textContent);
    seconds = time.asSeconds();

    intervalId = setInterval(() => {
        seconds++;
        el.textContent = secondsToTime(seconds);
    }, 1000);
}
const secondsToTime = (seconds) => {
    return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
}
const stop = () => {
    clearInterval(intervalId);
}

module.exports = {
    start,
    secondsToTime,
    stop
};
