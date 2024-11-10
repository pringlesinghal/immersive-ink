// InstanceSound.js
// by Max van Leeuwen
// Can be used with Behavior script: set response type to "Call Script Api", function name to "play", and Argument 1 to your audio asset.
// Allows to play audio files without interruption

// @ui {"widget":"label", "label" : "Allows to play audio files without interruption"}
// @ui {"widget":"label", "label" : "use 'script.api.play(audioFile)'"}

function play(audioAsset) {
	if (!audioAsset) throw new Error("No audio track asset found!");
	var audioComp = script.getSceneObject().createComponent("Component.AudioComponent");
	audioComp.audioTrack = audioAsset;
	audioComp.play(1);
	delayFunction(function () { audioComp.destroy() }, audioComp.duration + .1, [audioComp]);
}

function delayFunction(func, wait, args) {
	const keepAlive = {
		toDo: function () {
			var _args = args;
			func.apply(null, _args);
		}
	}
	var waitEvent = script.createEvent("DelayedCallbackEvent");
	waitEvent.bind(keepAlive.toDo.bind(keepAlive));
	waitEvent.reset(wait);
}

script.api.play = play;