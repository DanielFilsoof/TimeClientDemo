window.onload = function () {
    var appendSeconds = document.getElementById("seconds")
    var testafviklerGif = document.getElementById('testafvikling-gif');
    var intervalId;
    var startTime;
    var elapsedTime;
    var systemUdregnetTid = document.getElementById('tid-input');
    var systemUdregnetStartTid = document.getElementById('start-tid-input');
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');

    buttonStart.onclick = function() {
        testafviklerGif.classList.remove('hide');
        buttonStop.classList.remove('disabled');
        buttonStart.classList.add('disabled');
        buttonReset.classList.add('disabled');
        systemUdregnetTid.innerHTML = "Test under afvikling";

        startTime = Date.now(); // get the current time
        elapsedTime = 0;
        intervalId = setInterval(updateTime, 1000); // update the time every second
        appendSeconds.innerHTML = 0 + " sekunder";
        const startTid = new Date();
        window.sessionStorage.setItem('start-tid', startTid);
        systemUdregnetStartTid.innerHTML = startTid;
    }

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        let seconds = Math.floor(elapsedTime / 1000); // convert to seconds

        // display the elapsed time
        appendSeconds.innerHTML = seconds + " sekunder";
    }

    buttonStop.onclick = function() {
        clearInterval(intervalId);
        testafviklerGif.classList.add('hide');
        buttonStop.classList.add('disabled');
        buttonStart.classList.add('disabled');
        buttonReset.classList.remove('disabled');

        const startTidTimestamp = window.sessionStorage.getItem('start-tid');
        const startTidMil = new Date(startTidTimestamp).getTime();
        const slutTidMil = new Date().getTime()
        const totalTid = slutTidMil - startTidMil;
        systemUdregnetTid.innerHTML = totalTid / 1000;
        systemUdregnetStartTid.innerHTML = '';
    }


    buttonReset.onclick = function() {
        buttonStart.classList.remove('disabled');
        elapsedTime = '';
        appendSeconds.innerHTML = elapsedTime;
        buttonStop.classList.add('disabled');
        appendSeconds.innerHTML = 0 + " sekunder";
        systemUdregnetTid.innerHTML = "Afventer testafvikling";
    }
}
