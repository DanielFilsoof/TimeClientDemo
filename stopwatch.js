window.onload = function () {
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var testafviklerGif = document.getElementById('testafvikling-gif');
    var systemUdregnetTid = document.getElementById('tid-input');
    var currentSeconds = 0;
    var intervalId;

    buttonStart.onclick = function() {
        intervalId = setInterval(incrementSecond, 1000);
        testafviklerGif.classList.remove('hide');
        buttonStop.classList.remove('disabled');
        buttonStart.classList.add('disabled');
        buttonReset.classList.add('disabled');

        window.sessionStorage.setItem('start-tid', new Date());
    }

    function incrementSecond() {
        currentSeconds++;
        appendSeconds.innerHTML = currentSeconds;
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
        currentSeconds = 0;
        appendSeconds.innerHTML = currentSeconds;
        buttonStop.classList.add('disabled');
    }
}
