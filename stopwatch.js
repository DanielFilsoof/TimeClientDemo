window.onload = function () {
    var appendSeconds = document.getElementById("seconds")
    var testafviklerGif = document.getElementById('testafvikling-gif');
    var intervalId;
    var startTime;
    var elapsedTime;

    // sessionstorage eksempel
    var systemUdregnetTid = document.getElementById('tid-input');
    var systemUdregnetStartTid = document.getElementById('start-tid-input');
    var systemUdregnetSlutTid = document.getElementById('slut-tid-input');

    // js variabel eksempel
    var variabelTidStart;
    var variabelTidDom = document.getElementById('tid-input-variabel');
    var variabelTidStartDom = document.getElementById('start-tid-input-variabel');
    var variabelTidSlutDom = document.getElementById('slut-tid-input-variabel');

    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');

    buttonStart.onclick = function() {
        testafviklerGif.classList.remove('hide');
        buttonStop.classList.remove('disabled');
        buttonStart.classList.add('disabled');
        buttonReset.classList.add('disabled');
        if (systemUdregnetTid != null) systemUdregnetTid.innerHTML = "Test under afvikling";

        startTime = Date.now(); // get the current time
        elapsedTime = 0;
        intervalId = setInterval(updateTime, 1000); // update the time every second
        appendSeconds.innerHTML = 0 + " sekunder";
        const startTid = new Date();

        // sessionstorage
        window.sessionStorage.setItem('start-tid', startTid);
        if (systemUdregnetTid != null) systemUdregnetStartTid.innerHTML = startTid;

        // variabeleksempel
        variabelTidStart = startTid;
        variabelTidStartDom.innerHTML = startTid;
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

        // sessionstorageeksempel
        if (systemUdregnetTid != null) {
            const startTidTimestamp = window.sessionStorage.getItem('start-tid');
            const startTidMil = new Date(startTidTimestamp).getTime();
            const slutTidMil = new Date().getTime()
            const totalTid = slutTidMil - startTidMil;
            systemUdregnetTid.innerHTML = totalTid / 1000;
            systemUdregnetSlutTid.innerHTML = new Date();
        }

        // variabeleksempel
        if (variabelTidStartDom != null) {
            const startTidTimestamp = variabelTidStart
            const startTidMil = new Date(startTidTimestamp).getTime();
            const slutTidMil = new Date().getTime();
            const totalTid = slutTidMil - startTidMil;

            variabelTidDom.innerHTML = totalTid / 1000;
            variabelTidSlutDom.innerHTML = new Date();
        }
    }


    buttonReset.onclick = function() {
        buttonStart.classList.remove('disabled');
        elapsedTime = '';
        appendSeconds.innerHTML = elapsedTime;
        buttonStop.classList.add('disabled');
        appendSeconds.innerHTML = 0 + " sekunder";

        if (systemUdregnetTid != null) {
            systemUdregnetTid.innerHTML = "Afventer testafvikling";
            systemUdregnetSlutTid.innerHTML = '';
        }
    }
}
