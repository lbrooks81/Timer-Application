let timeDisplay = document.getElementById('time');

let stopwatchTime = document.getElementById('stopwatch-time');
let time;
let today = new Date();

let alarmTime = document.getElementById('alarm-input');
let alarmFinished = false;

let timeChange;
let timeRemaining = 0;
let timerHours = document.getElementById('hour-input');
let timerMinutes = document.getElementById('minute-input');
let timerSeconds = document.getElementById('second-input');
let timerOutput = document.getElementById('timer-output');
let timerId = 0;
document.addEventListener('DOMContentLoaded', () =>
{

    // Time
    updateTime();
    setInterval(updateTime, 1000);

    // Stopwatch
    let swStart = document.getElementById('sw-start');
    let swStop = document.getElementById('sw-stop');
    let swReset = document.getElementById('sw-reset');
    let stopwatchId;
    let started = false;
    let paused = false;

    swStart.addEventListener('click', async () =>
    {
        if(paused === true)
        {
            started = true;
            stopwatchId = setInterval(startStopwatch, 1);
        }
        else if(started === false)
        {
            started = true;
            time = Date.now();
            stopwatchId = setInterval(startStopwatch, 1);
        }
    });

    swStop.addEventListener('click', () =>
    {
        paused = true;
        started = false;
        clearInterval(stopwatchId);
    });

    swReset.addEventListener('click', () =>
    {
        clearInterval(stopwatchId);
        stopwatchTime.textContent = "00:00:00:000";
        paused = false;
    });

    // Alarm
    alarmTime.addEventListener('change', () =>
    {
        if(alarmFinished === false)
        {
            setInterval(checkAlarm, 1000);
        }
    });


    // Timer
    timerHours.addEventListener('change', () =>
    {
        timeRemaining += timerHours.valueAsNumber * 3600000;
    });

    timerMinutes.addEventListener('change', () =>
    {
        timeRemaining += timerMinutes.valueAsNumber * 60000;
    });

    timerSeconds.addEventListener('change', () =>
    {
        timeRemaining += timerSeconds.valueAsNumber * 1000
    });

    document.getElementById('start-timer')
        .addEventListener('click', () =>
    {
        timeRemaining += 1000;
        timeChange = Date.now();
        timerId = setInterval(startTimer, 1);
    });

    document.getElementById('stop-timer')
        .addEventListener('click', () =>
    {
        stopTimer();
    });
});

function startTimer()
{
    timeRemaining -= Date.now() - timeChange;
    timeChange = Date.now();


    timerOutput.textContent = `${addZero(Math.floor(timeRemaining / 3600000 % 24), false)}:` +   // Hours
        `${addZero(Math.floor(timeRemaining / 60000 % 60), false)}:` +     // Minutes
        `${addZero(Math.floor(timeRemaining / 1000 % 60), false)}`;        // Seconds

    if(timeRemaining <= 0)
    {
        stopTimer();
    }
}

function stopTimer()
{
    clearInterval(timerId);
    timerOutput.textContent = "00:00:00";
    alert('Timer Finished');
}
/*
String.prototype.replaceAt = function(index, replacement)
{
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}*/


function checkAlarm()
{
    console.log(today.getSeconds());
    let alarmMessage = document.getElementById('alarm-message');

    if(String(alarmTime.value) === updateTime(false, false))
    {
        alert(alarmMessage.value);
        alarmFinished = true;
    }
}
function updateTime(seconds = false, amPm = true)
{
    let time = "";

    time += addZero(today.getHours())
    if(seconds === false)
    {
        time += addZero(today.getMinutes(), false);
    }
    else
    {
        time += addZero(today.getMinutes());
        time += addZero(today.getSeconds(), false);
    }

    let ampm = today.getHours() >= 12 ? "PM" : "AM";
    timeDisplay.innerText = time + " " + ampm;

    return time;
}

async function startStopwatch()
{
    let swTime = Date.now() - time
    let ms = (Date.now() - time) % 1000;
    let seconds = addZero(Math.floor(swTime / 1000 % 60), false);
    let minutes = addZero(Math.floor(seconds / 60), false);
    let hours = addZero(Math.floor(minutes / 24), false);

    stopwatchTime.textContent = `${hours}:${minutes}:${seconds}:${ms}`;
}

function addZero(num, moreDigits = true)
{
    let digit = parseInt(num) >= 10 ? num : "0" + num;

    if(moreDigits)
    {
        digit += ":";
    }
    return digit;
}

