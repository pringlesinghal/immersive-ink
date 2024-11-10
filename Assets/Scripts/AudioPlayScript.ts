@component
export class AudioPlayScript extends BaseScriptComponent {

    @input
    audioComponent: AudioComponent

    onAwake() {

    }

    playAudio() {
        if (this.audioComponent) {
            this.audioComponent.play(1);
        }
    }

    stopAudio() {
        if (this.audioComponent) {
            this.audioComponent.stop(true);
        }
    }
}
