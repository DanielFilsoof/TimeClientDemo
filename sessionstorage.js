var systemUdregnetTid = document.getElementById('tid-input');
var buttonStart = document.getElementById('button-start');
var buttonStop = document.getElementById('button-stop');
var buttonReset = document.getElementById('button-reset');

window.onload = function () {


buttonStart.onclick = function() {
    window.sessionStorage.setItem('start-tid', new Date());
}

buttonStop.onclick = function() {
    const startTidTimestamp = window.sessionStorage.getItem('start-tid');
    const startTidMil = new Date(startTidTimestamp).getTime();
    const slutTidMil = new Date().getTime()
    const totalTid = slutTidMil - startTidMil;
    systemUdregnetTid.innerHTML = totalTid / 1000;
}
}
