var numberOfDrums = document.querySelectorAll(".drum").length;
var recording = [[], [], [], []];
var currentChannel = 0;
var isRecording = false;

for (var i = 0; i < numberOfDrums; i++ ){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
        playSound(this.innerHTML);   
        buttonAnimation(this.innerHTML);     
        if (isRecording) recordSound(this.innerHTML);
    });    
}

document.addEventListener("keydown", function(event) {
    playSound(event.key);
    buttonAnimation(event.key)
    if (isRecording) recordSound(event.key);
});

function playSound(key){
    switch (key){
        case "w": 
            var audio = new Audio('sounds/crash.mp3');
            audio.play();
        break;
        case "a":
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
        break;
        case "s":
            var audio = new Audio('sounds/snare.mp3');
            audio.play();
        break;
        case "d":
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
        break;
        case "j":
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
        break;
        case "k":
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
        break;
        case "l":
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
        break;
        default: console.log(key);
    }
}

function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}

function recordSound(key) {
    var time = Date.now();
    recording[currentChannel].push({ key: key, time: time });
}

function startRecording(channel) {
    currentChannel = channel;
    recording[channel] = []; // Clear the previous recording
    isRecording = true;
}

function stopRecording() {
    isRecording = false;
}

function playChannel(channel) {
    var startTime = recording[channel][0].time;
    recording[channel].forEach(function(sound) {
        setTimeout(function() {
            playSound(sound.key);
            buttonAnimation(sound.key);
        }, sound.time - startTime);
    });
}

function playAllChannels() {
    var startTimes = recording.map(channel => channel[0].time);
    recording.forEach(function(channel, channelIndex) {
        channel.forEach(function(sound) {
            setTimeout(function() {
                playSound(sound.key);
                buttonAnimation(sound.key);
            }, sound.time - startTimes[channelIndex]);
        });
    });
}

document.querySelector("#startRecordingChannel1").addEventListener("click", function() { startRecording(0); });
document.querySelector("#startRecordingChannel2").addEventListener("click", function() { startRecording(1); });
document.querySelector("#startRecordingChannel3").addEventListener("click", function() { startRecording(2); });
document.querySelector("#startRecordingChannel4").addEventListener("click", function() { startRecording(3); });
document.querySelector("#stopRecording").addEventListener("click", stopRecording);
document.querySelector("#playChannel1").addEventListener("click", function() { playChannel(0); });
document.querySelector("#playChannel2").addEventListener("click", function() { playChannel(1); });
document.querySelector("#playChannel3").addEventListener("click", function() { playChannel(2); });
document.querySelector("#playChannel4").addEventListener("click", function() { playChannel(3); });
document.querySelector("#playAllChannels").addEventListener("click", playAllChannels);
