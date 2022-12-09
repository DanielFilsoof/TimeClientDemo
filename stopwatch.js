window.onload = function () {
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var testafviklerGif = document.getElementById('testafvikling-gif');
    var systemUdregnetTid = document.getElementById('tid-input');
    var intervalId;

    var startTime;
    var elapsedTime;

    buttonStart.onclick = function() {
        // intervalId = setInterval(incrementSecond, 500);
        testafviklerGif.classList.remove('hide');
        buttonStop.classList.remove('disabled');
        buttonStart.classList.add('disabled');
        buttonReset.classList.add('disabled');

        startTime = Date.now(); // get the current time
        elapsedTime = 0;
        intervalId = setInterval(updateTime, 1000); // update the time every second

        window.sessionStorage.setItem('start-tid', new Date());
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
    }


    buttonReset.onclick = function() {
        buttonStart.classList.remove('disabled');
        elapsedTime = '';
        appendSeconds.innerHTML = elapsedTime;
        buttonStop.classList.add('disabled');
    }
}
