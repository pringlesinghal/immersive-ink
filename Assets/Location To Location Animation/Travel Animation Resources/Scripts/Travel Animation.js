// -----JS CODE-----


// Parts of script are from

// TweenRotFromToQuat.js
// Version: 1.0.0
// Use as a Visual Scripting node
// Description: Runs tween

// and

// TweenPosFromTo.js
// Version: 1.0.0
// Use as a Visual Scripting node
// Description: Runs tween

/*
    Vertical and Horizontal values should represent
    Latitude and Longitude respectively, so you can insert
    coordinates of your location and desired location,
    
    Which will determine from where to where animation should
    be,

    - If you are replacing vehicle ('Car' currently from
      'Vehicle Pack' in Asset library), make sure it is
      oriented same way in 3D view, so that rotations get
      applied correctly

    How it goes:
    - When Animation starts depending on Event, 
      first Zoom Out(/In) for 'Time For Zoom OutIn' length of 
      time will happen, which is performed on Camera object,
      then after 'Pause After Zoom OutIn', which will just be delay
      Travel Animation will play for 'Travel Animation Time'
      Rotating 'Travel Animation Object' and in that way moving
      Cam and Object below it,

    To change when animation starts from Tap - In Same Component as
    this script edit 'Behavior For Animation Start' of same one
*/


//@ui {"widget":"group_start", "label":"Edit To Custom Preference"}

// @input string zoomType = "ZoomOut" {"widget":"combobox", "values":[{"label":"Zoom Out", "value":"ZoomOut"}, {"label":"Zoom In", "value":"ZoomIn"}]};

//@input float horizontalStart = 0 {"widget":"slider", "min": -180, "max":180, "step": 0.1}

//@input float verticalStart = 0 {"widget":"slider", "min": -90, "max":90, "step": 0.1}

//@input string placeStartName;

//@input float horizontalDesired = 0 {"widget":"slider", "min": -180, "max":180, "step": 0.1}

//@input float verticalDesired = 0 {"widget":"slider", "min": -90, "max":90, "step": 0.1}

//@input string placeDesiredName;

//@input float pinAnimationTimeStart = 2 {"widget":"slider", "min": 1.5, "max":4, "step": 0.1}; 

//@input float pinAnimationTimeDesired = 2 {"widget":"slider", "min": 1.5, "max":4, "step": 0.1}; 

//@input string easingFunctionPA = "Quadratic" {"widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Quadratic", "value":"Quadratic"}, {"label":"Cubic", "value":"Cubic"}, {"label":"Quartic", "value":"Quartic"}, {"label":"Quintic", "value":"Quintic"}, {"label":"Sinusoidal", "value":"Sinusoidal"}, {"label":"Exponential", "value":"Exponential"}, {"label":"Circular", "value":"Circular"}, {"label":"Elastic", "value":"Elastic"}, {"label":"Back", "value":"Back"}, {"label":"Bounce", "value":"Bounce"}]}

//@input string easingTypePA = "Out" {"widget":"combobox", "values":[{"label":"In", "value":"In"}, {"label":"Out", "value":"Out"}, {"label":"In / Out", "value":"InOut"}]}

//@input float cameraDistanceAnimationScale = 1 {"widget":"slider", "min": 0, "max":2, "step": 0.1}

//@input float timeForZoomOutIn;


//@input float pauseAfterZoomOutIn;

//@input float travelAnimationTime;

//@input string easingFunctionZOA = "Quadratic" {"widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Quadratic", "value":"Quadratic"}, {"label":"Cubic", "value":"Cubic"}, {"label":"Quartic", "value":"Quartic"}, {"label":"Quintic", "value":"Quintic"}, {"label":"Sinusoidal", "value":"Sinusoidal"}, {"label":"Exponential", "value":"Exponential"}, {"label":"Circular", "value":"Circular"}, {"label":"Elastic", "value":"Elastic"}, {"label":"Back", "value":"Back"}, {"label":"Bounce", "value":"Bounce"}]}

//@input string easingTypeZOA = "Out" {"widget":"combobox", "values":[{"label":"In", "value":"In"}, {"label":"Out", "value":"Out"}, {"label":"In / Out", "value":"InOut"}]}



//@ui {"widget": "group_end"}


//@ui {"widget":"group_start", "label":"Base Animation Elements"}

//@input SceneObject travelAnimationStructure;

//@input Component.Text3D textStartPosition;

//@input SceneObject startPosition;

//@input SceneObject locationStart;


//@input Component.Text3D textDesiredPosition;

//@input SceneObject desiredPosition;

//@input SceneObject locationDesired;


//@input SceneObject cameraAnimation;


// @input SceneObject travelAnimation

//@input SceneObject travelVehicle;

//@input SceneObject directionSphere;

//@input SceneObject directionObject;

// @input bool waitToPlay = false;

//@input boolean localSpaceRotation;

//@ui {"widget": "group_end"}

// @output tweenObj tween


var convertRadiansToDegrees = new vec3(360 / (2 * Math.PI), 360 / (2 * Math.PI), 360 / (2 * Math.PI));
var convertDegreesToRadians = new vec3((2 * Math.PI) / 360, (2 * Math.PI) / 360, (2 * Math.PI) / 360);

var animationCurrentOrder = 0;

var argumentsOfFunc = new Array();

var startPositionAtStart;
var startPositionAtDesired;

var fromQuatLocation, toQuatLocation;

var cameraStartRot, cameraDesiredRot;
var travelAnimationRotationStart;

function settingUpStartOfScript() {
    script.startPosition.enabled = true;
    script.desiredPosition.enabled = true;
    script.travelAnimation.enabled = true;

    script.textStartPosition.text = script.placeStartName;
    script.textDesiredPosition.text = script.placeDesiredName;

    var xStart = remap(script.verticalStart, 51.5, 33.5, -52.40, -34.4);
    var yStart = remap(script.horizontalStart, 0, 90, 88.4, 178.4);
    fromQuatLocation = quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(xStart, yStart, 0)));
    script.startPosition.getTransform().setLocalRotation(fromQuatLocation);
    startPositionAtStart = script.startPosition.getTransform().getWorldPosition();

    var xDesired = remap(script.verticalDesired, 51.5, 33.5, -52.40, -34.4);
    var yDesired = remap(script.horizontalDesired, 0, 90, 88.4, 178.4);
    toQuatLocation = quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(xDesired, yDesired, 0)));
    script.desiredPosition.getTransform().setLocalRotation(toQuatLocation);
    startPositionAtDesired = script.desiredPosition.getTransform().getWorldPosition();

    cameraStartRot = quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 0, 0)));
    cameraDesiredRot = quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(50, 0, 0)));

    travelAnimationRotationStart = quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 88.4, 0)));

    if (script.zoomType == "ZoomOut") {
        script.cameraAnimation.getTransform().setLocalPosition(new vec3(0, -0.0259, 5.9113));
        script.travelAnimation.getTransform().setLocalRotation(fromQuatLocation);
    } else if (script.zoomType == "ZoomIn") {
        script.cameraAnimation.getTransform().setLocalPosition(new vec3(-0.1215, 0.0257, 16.5754));
    }
}


if (!global.tweenManager) {
    print("INFO: Tween Manager not initialized. Please add Tween Manager to scene and move it to the top of the Objects Panel");
    return;
}


function delayedCallback(delay, callback) {
    var event = script.createEvent("DelayedCallbackEvent");
    event.bind(callback);
    event.reset(delay);
    return event;
}


function remap(current, minV, maxV, minR, maxR) {
    return ((current - minV) * (maxR - minR) / (maxV - minV)) + minR;
}


function tweenRotation() {
    var object = argumentsOfFunc[animationCurrentOrder]['1'];
    var anglesStart = argumentsOfFunc[animationCurrentOrder]['2'];
    var anglesDesired = argumentsOfFunc[animationCurrentOrder]['3'];
    var ifLoop = argumentsOfFunc[animationCurrentOrder]['4'];
    var time = argumentsOfFunc[animationCurrentOrder]['5'] * 1000;
    var lerpType = argumentsOfFunc[animationCurrentOrder]['6'];
    var easFunc = argumentsOfFunc[animationCurrentOrder]['7'];
    var easType = argumentsOfFunc[animationCurrentOrder]['8'];

    var transform = (object || script).getTransform();

    var from = anglesStart || quat.quatIdentity();
    var to = anglesDesired || quat.quatIdentity();

    var onUpdate;

    if (lerpType == "slerp") {
        if (script.localSpaceRotation) {
            onUpdate = function (obj) {
                transform.setLocalRotation(quat.slerp(from, to, obj.t));
            };
        } else {
            onUpdate = function (obj) {
                transform.setWorldRotation(quat.slerp(from, to, obj.t));
            };
        }
    }
    else if (lerpType == "lerp") {
        if (script.localSpaceRotation) {
            onUpdate = function (obj) {
                transform.setLocalRotation(quat.lerp(from, to, obj.t));
            };
        } else {
            onUpdate = function (obj) {
                transform.setWorldRotation(quat.lerp(from, to, obj.t));
            };
        }
    }

    var tween = new global.TWEEN.Tween({ t: 0 })
        .to({ t: 1 }, time)
        .onUpdate(onUpdate);

    var st = global.TWEEN.Tween.prototype.start.bind(tween);
    tween.start = function (time) {
        this._object.t = from;
        st(time);
    };

    if (ifLoop) {
        tween.repeat("Infinity");
    }

    tween.easing(global.tweenManager.getTweenEasingType(easFunc, easType));

    tween.start();
    animationCurrentOrder++;
    return tween;
}

function tweenPosition(tweenObject, positionStart, positionDesired, timing, looping, backForth, easFunc, easType) {
    var time = timing * 1000;

    var transform = (tweenObject || script).getTransform();

    var from = positionStart;
    var to = positionDesired;

    var onUpdate;
    onUpdate = function (obj) {
        transform.setLocalPosition(vec3.lerp(from, to, obj.t));
    };

    var tween = new global.TWEEN.Tween({ t: 0 })
        .to({ t: 1 }, time)
        .onUpdate(onUpdate);

    script.tween = tween;
    var st = global.TWEEN.Tween.prototype.start.bind(tween);
    tween.start = function (time) {
        this._object.t = 0;
        st(time);
    };

    if (looping) {
        tween.repeat("Infinity");
    } else if (backForth) { tween.repeat(1); }

    if (backForth) {
        tween.yoyo(true);
    }

    tween.easing(global.tweenManager.getTweenEasingType(easFunc, easType));

    tween.start();
}

function tweenLocationLoop(locationStart, locationDesired) {
    tweenPosition(locationStart, new vec3(0, 0, 6), new vec3(0, 0, 6.1), script.pinAnimationTimeStart, true, true, script.easingFunctionPA, script.easingTypePA);
    tweenPosition(locationDesired, new vec3(0, 0, 6), new vec3(0, 0, 6.1), script.pinAnimationTimeDesired, true, true, script.easingFunctionPA, script.easingTypePA);
    tweenRotation();
    tweenRotation();
}

function enableObjectOfTransportation() {
    script.travelVehicle.enabled = true;

    script.directionSphere.getTransform().setLocalRotation(quat.slerp(fromQuatLocation, toQuatLocation, 0.001));


    var point4 = script.directionObject.getTransform().getWorldPosition();
    var newvar = startPositionAtStart.sub(point4).normalize();

    script.travelVehicle.getTransform().setWorldRotation(quat.lookAt(script.travelVehicle.getTransform().forward, newvar));
}

function findFourthVertex(vertex1, vertex2) {
    var fourthVertex = vertex1.cross(vertex2).normalize();

    return fourthVertex;
}



function cameraTravelAnimation() {
    var scaleByDistance = script.cameraDistanceAnimationScale * Math.pow((script.horizontalDesired - script.horizontalStart) / 360, 2) * Math.abs(script.verticalDesired - script.verticalStart) / 90;

    var camPos = script.cameraAnimation.getTransform().getLocalPosition();

    var scaleVector = camPos.sub(new vec3(-0.1215, -40.0257, 16.5754));

    tweenPosition(script.cameraAnimation, camPos, camPos.sub(scaleVector.mult(new vec3(scaleByDistance, scaleByDistance, scaleByDistance))), script.travelAnimationTime / 2, false, true, script.easingFunctionZOA, script.easingTypeZOA);
}

script.show = function () {
    // Adding arguments for tweenRotation function in order
    // First 2 are rotations of pins at start and desired Locations
    // Then Rotation for Zoom Out of Camera
    // And then for travel animation rotation of
    // Travel Animation Object centered at Earths center
    argumentsOfFunc.push({ '1': script.locationStart, '2': quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 10, -269))), '3': quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 10, 90))), '4': true, '5': script.pinAnimationTimeStart * 2, '6': "lerp", "7": "Linear", "8": "InOut" });
    argumentsOfFunc.push({ '1': script.locationDesired, '2': quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 10, -269))), '3': quat.fromEulerVec(convertDegreesToRadians.mult(new vec3(0, 10, 90))), '4': true, '5': script.pinAnimationTimeDesired * 2, '6': "lerp", "7": "Linear", "8": "InOut" });

    // Camera position animation based on Zoom Type
    if (script.zoomType == "ZoomOut") {
        tweenPosition(script.cameraAnimation, new vec3(0, -0.0259, 5.9113), new vec3(0, -1.5, 7), script.timeForZoomOutIn, false, false, script.easingFunctionZOA, script.easingTypeZOA);
        script.travelAnimation.getTransform().setLocalRotation(fromQuatLocation);
    } else if (script.zoomType == "ZoomIn") {
        tweenPosition(script.cameraAnimation, new vec3(-0.1215, 0.0257, 16.5754), new vec3(0, -1.5, 7), script.timeForZoomOutIn, false, false, script.easingFunctionZOA, script.easingTypeZOA);
        argumentsOfFunc.push({ '1': script.travelAnimation, '2': travelAnimationRotationStart, '3': fromQuatLocation, '4': false, '5': script.timeForZoomOutIn, '6': "slerp", "7": "Linear", "8": "InOut" });
        tweenRotation();
    }

    argumentsOfFunc.push({ '1': script.cameraAnimation, '2': cameraStartRot, '3': cameraDesiredRot, '4': false, '5': script.timeForZoomOutIn, '6': "slerp", "7": "Linear", "8": "InOut" });
    argumentsOfFunc.push({ '1': script.travelAnimation, '2': fromQuatLocation, '3': toQuatLocation, '4': false, '5': script.travelAnimationTime, '6': "slerp", "7": script.easingFunctionZOA, "8": script.easingTypeZOA });

    tweenLocationLoop(script.locationStart, script.locationDesired);


    tweenRotation();

    delayedCallback(script.timeForZoomOutIn + script.pauseAfterZoomOutIn, tweenRotation);
    delayedCallback(script.timeForZoomOutIn + script.pauseAfterZoomOutIn, cameraTravelAnimation);
    delayedCallback(script.timeForZoomOutIn, enableObjectOfTransportation);
}

settingUpStartOfScript();
//script.createEvent("TapEvent").bind(show);