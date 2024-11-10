//@input Component.AudioComponent audioComponent

function playAudio() {
    if (script.audioComponent) {
        script.audioComponent.play(1); // 1 for looping, 0 for no loop
    }
}