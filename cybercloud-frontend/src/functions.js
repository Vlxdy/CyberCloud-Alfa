
function getTime(times ) {
    let seconds = ("0" + (Math.floor(times / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(times / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(times / 3600000)).slice(-2);
    return hours+":"+minutes+":"+seconds;
}
module.exports = { getTime };