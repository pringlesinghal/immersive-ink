function scriptBody(script){ 
// Behavior.js
// Version: 0.8.0
// Event: Lens Initialized
// Description: Configure a trigger and response in the inspector UI. No scripting required.
//
// ---- LOCAL API USAGE ----
// Manually trigger this Behavior
//  behaviorScript.trigger();
//
// Add a callback function to call when this Behavior is triggered
//  behaviorScript.addTriggerResponse(callback)
//
// Remove a callback function from this Behavior
//  behaviorScript.removeTriggerResponse(callback)
//
// ---- GLOBAL API USAGE ----
// Manually send a global custom trigger
//  global.behaviorSystem.sendCustomTrigger(triggerName)
//
// Add a callback function to call when the global custom trigger named "triggerName" is sent
//  global.behaviorSystem.addCustomTriggerResponse(triggerName, callback)
//
// Remove a callback function for the global custom trigger named "triggerName"
//  global.behaviorSystem.removeCustomTriggerResponse(triggerName, callback)
// -----------------







































































































if (!global.scBehaviorSystem) {
    global.scBehaviorSystem = {};
    var globalTriggerSystem = (function () {
        var listeners = {};

        function getListeners(key) {
            return setDefault(listeners, key, []);
        }
        return {
            addListener: function (key, callback) {
                getListeners(key).push(callback);
            },
            removeListener: function (key, callback) {
                if (!removeFromArray(getListeners(key), callback)) {
                    debugPrint("Failed to remove listener");
                }
            },
            sendMessage: function (key) {
                getListeners(key).forEach(safeCall);
            },
        };
    })();
    global.scBehaviorSystem.addCustomTriggerResponse = globalTriggerSystem.addListener;
    global.scBehaviorSystem.removeCustomTriggerResponse = globalTriggerSystem.removeListener;
    global.scBehaviorSystem.sendCustomTrigger = globalTriggerSystem.sendMessage;
}
if (!global.behaviorSystem) {
    global.behaviorSystem = global.scBehaviorSystem;
}
var lastTriggerTime;
var localTriggerResponses = [];
var resetUpdateChecks = [];
var comparisonFuncs = {
    "-2": function (sign) {
        return sign !== 1;
    },
    "-1": function (sign) {
        return sign === -1;
    },
    "0": function (sign) {
        return sign === 0;
    },
    "3": function (sign) {
        return sign !== 0;
    },
    "1": function (sign) {
        return sign === 1;
    },
    "2": function (sign) {
        return sign !== -1;
    },
};

function getSign(x) {
    return (Math.abs(x) < .000001) ? 0 : (x > 0 ? 1 : -1);
}

function setDefault(obj, key, def) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = def;
        return def;
    }
    return obj[key];
}

function removeFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

function debugPrint(message) {
    print("[" + script.getSceneObject().name + "] " + message);
}

function safeCall(func) {
    if (func) {
        func();
    }
}

function delayedCallback(delay, callback) {
    var event = script.createEvent("DelayedCallbackEvent");
    event.bind(callback);
    event.reset(delay);
    return event;
}

function getOrAddComponent(obj, componentType) {
    return obj.getComponent(componentType) || obj.createComponent(componentType);
}

function createAndBindEvent(eventType, callback) {
    script.createEvent(eventType).bind(callback);
}

function whenValueBecomes(valueFunc, desiredValue, callback, allowRepeat, optInitialValue) {
    var lastValue;
    var initLastValue = function () {
        lastValue = (!allowRepeat && optInitialValue === undefined) ? valueFunc() : optInitialValue;
    };
    resetUpdateChecks.push(initLastValue);
    initLastValue();

    createAndBindEvent("UpdateEvent", function () {
        var newValue = valueFunc();
        if (newValue === desiredValue && (allowRepeat || lastValue !== desiredValue)) {
            callback();
        }
        lastValue = newValue;
    });
}

function checkCompareType(a, b, compareType) {
    return comparisonFuncs[compareType](getSign(a - b));
}

function whenCompareTypeMatches(a, b, compareType, callback, allowRepeat, optInitialValue) {
    var aFunc = typeof a === "function" ? a : function () {
        return a;
    };
    var bFunc = typeof b === "function" ? b : function () {
        return b;
    };
    whenValueBecomes(function () {
        return checkCompareType(aFunc(), bFunc(), compareType);
    }, true, callback, allowRepeat, optInitialValue);
}

function wrapFunction(origFunc, newFunc) {
    if (!origFunc) {
        return newFunc;
    }
    return function () {
        origFunc();
        newFunc();
    };
}

function getFallbackComponent(component, componentType) {
    return component || script.getSceneObject().getComponent(componentType);
}

function makeObjectFilter(filterType, allowedObjects, nameMatchType, allowedNames, valueType) {
    var objFilter;
    switch (filterType) {
        case "None":
        default:
            objFilter = function (otherObj) {
                return true;
            };
            break;
        case "This object":
            var localObjects;
            if (valueType) {
                localObjects = script.getSceneObject().getComponents(valueType);
            } else {
                localObjects = [script.getSceneObject()];
            }
            objFilter = function (otherObj) {
                for (var i = 0; i < localObjects.length; i++) {
                    if (otherObj.isSame(localObjects[i])) {
                        return true;
                    }
                }
                return false;
            };
            break;
        case "Other object":
            objFilter = function (otherObj) {
                for (var i = 0; i < allowedObjects.length; i++) {
                    if (otherObj.isSame(allowedObjects[i])) {
                        return true;
                    }
                }
                return false;
            };
            break;
        case "Other name":
            var nameMatchFunc;
            switch (nameMatchType) {
                case "Equals":
                default:
                    nameMatchFunc = function (objName, targName) {
                        return objName == targName;
                    };
                    break;
                case "Starts With":
                    nameMatchFunc = function (objName, targName) {
                        return objName.startsWith(targName);
                    };
                    break;
                case "Regex":
                    nameMatchFunc = function (objName, targName) {
                        return !!objName.match(new RegExp(targName));
                    };
                    break;
            }
            objFilter = function (otherObj) {
                var otherName = otherObj.getSceneObject().name;
                for (var i = 0; i < allowedNames.length; i++) {
                    if (nameMatchFunc(otherName, allowedNames[i])) {
                        return true;
                    }
                }
                return false;
            };
            break;
    }
    return objFilter;
}

function setBaseTexForVis(vis, tex) {
    if (vis && vis.mainPass) {
        vis.mainPass.baseTex = tex;
        return true;
    }
}

function getBaseTexForVis(vis) {
    return vis && vis.mainPass && vis.mainPass.baseTex;
}

function setTranPos(transform, position, useLocal) {
    return useLocal ? transform.setLocalPosition(position) : transform.setWorldPosition(position);
}

function setTranRot(transform, rotation, useLocal) {
    return useLocal ? transform.setLocalRotation(rotation) : transform.setWorldRotation(rotation);
}

function setTranScale(transform, scale, useLocal) {
    return useLocal ? transform.setLocalScale(scale) : transform.setWorldScale(scale);
}
var customTriggerIndex = 0;

function reInitialize() {
    lastTriggerTime = null;
    resetUpdateChecks.forEach(safeCall);
}
global.scBehaviorSystem.addCustomTriggerResponse("_reinitialize_all_behaviors", reInitialize);

function setupTrigger() {
    switch (script.triggeringEventType) {
        case "TouchEvent":
            setupTouchEvent();
            break;
        case "FaceEvent":
            setupFaceEvent();
            break;
        case "OnAwake":
            setupOnAwake();
            break;
        case "TurnOnEvent":
            setupTurnOnEvent();
            break;
        case "OnEnabled":
            setupOnEnabled();
            break;
        case "OnDisabled":
            setupOnDisabled();
            break;
        case "UpdateEvent":
        case "LateUpdateEvent":
        case "CameraFrontEvent":
        case "CameraBackEvent":
            createAndBindEvent(script.triggeringEventType, onTrigger);
            break;
        case "InteractionEvent":
            setupInteractionEvent();
            break;
        case "animationEnd":
            setupAnimationEnd();
            break;
        case "tweenEnd":
            setupTweenEnd();
            break;
        case "lookingAt":
            setupLookingAt();
            break;
        case "boundsCheck":
            setupBoundsCheck();
            break;
        case "distanceCheck":
            setupDistanceCheck();
            break;
        case "markerTrackingEvent":
            setupMarkerTrackingEvent();
            break;
        case "objectTrackingEvent":
            setupObjectTrackingEvent();
            break;
        case "objectTracking3DEvent":
            setupObjectTracking3DEvent();
            break;
        case "landmarkerEvent":
            setupLandmarkerEvent();
            break;
        case "machineLearningEvent":
            setupMachineLearningEvent();
            break;
        case "recordingStart":
            setupRecordingStart();
            break;
        case "onCustomTrigger":
            setupOnCustomTrigger();
            break;
        case "physicsColliderEvent":
            setupPhysicsColliderEvent();
            break;
        case "physicsRaycast":
            setupPhysicsRaycast();
            break;
    }
}

function doResponse() {
    switch (script.responseType) {
        case "textureAnimation":
            triggerTextureAnimation();
            break;
        case "animateMesh":
            triggerAnimateMesh();
            break;
        case "playSound":
            triggerPlaySound();
            break;
        case "playVideo":
            triggerPlayVideo();
            break;
        case "setEnabled":
            triggerSetEnabled();
            break;
        case "setParent":
            triggerSetParent();
            break;
        case "setColor":
            triggerSetColor();
            break;
        case "setTexture":
            triggerSetTexture();
            break;
        case "setText":
            triggerSetText();
            break;
        case "runTween":
            triggerRunTween();
            break;
        case "setPosition":
            triggerSetPosition();
            break;
        case "setRotation":
            triggerSetRotation();
            break;
        case "setScale":
            triggerSetScale();
            break;
        case "setScreenPosition":
            triggerSetScreenPosition();
            break;
        case "setScreenRotation":
            triggerSetScreenRotation();
            break;
        case "setScreenSize":
            triggerSetScreenSize();
            break;
        case "setBlendshapesV2":
            triggerSetBlendshapesV2();
            break;
        case "setMaterialParameter":
            triggerSetMaterialParameter();
            break;
        case "setTouchBlocking":
            triggerSetTouchBlocking();
            break;
        case "showHint":
            triggerShowHint();
            break;
        case "machineLearning":
            triggerMachineLearning();
            break;
        case "instantiatePrefab":
            triggerInstantiatePrefab();
            break;
        case "destroyObject":
            triggerDestroyObject();
            break;
        case "printMessage":
            triggerPrintMessage();
            break;
        case "callScriptAPI":
            triggerCallScriptAPI();
            break;
        case "sendCustomTrigger":
            triggerSendCustomTrigger();
            break;
        case "physicsApplyForce":
            triggerPhysicsApplyForce();
            break;
        case "setBlendshapes":
            triggerSetBlendshapes();
            break;
        case "animateSprite":
            debugPrint("Response type Animate Sprite is DEPRECATED.\nPlease use Animate Image instead.");
            break;
        case "setBillboardPosition":
            debugPrint("Response type Set Billboard Position is DEPRECATED.\nPlease use Set Screen Position instead.");
            break;
        case "setBillboardRotation":
            debugPrint("Response type Set Billboard Rotation is DEPRECATED.\nPlease use Set Screen Rotation instead.");
            break;
        case "setBillboardSize":
            debugPrint("Response type Set Billboard Size is DEPRECATED.\nPlease use Set Screen Size instead.");
            break;
    }
    localTriggerResponses.forEach(safeCall);
}

function onTrigger() {
    var curTime = getTime();
    if (script.triggerLimitType == "Once") {
        if (lastTriggerTime) {
            return;
        }
    } else {
        if (script.triggerLimitType == "Interval") {
            if (curTime < (lastTriggerTime + script.triggerInterval)) {
                return;
            }
        }
    }
    lastTriggerTime = curTime;
    if (script.triggerDelay > 0) {
        delayedCallback(script.triggerDelay, doResponse);
    } else {
        doResponse();
    }
}

function setupTouchEvent() {
    var targetScript = script;
    if (script.touchEventTouchTarget) {
        var targetObj = script.touchEventTouchTarget.getSceneObject();
        var touchComponent = getOrAddComponent(targetObj, "Component.TouchComponent");
        touchComponent.addMeshVisual(script.touchEventTouchTarget);
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }
    targetScript.createEvent(script.touchEventEventType).bind(onTrigger);
}

function setupFaceEvent() {
    var faceEvent = script.createEvent(script.faceEventEventType);
    faceEvent.faceIndex = script.faceEventFaceIndex;
    faceEvent.bind(onTrigger);
}

function setupOnAwake() {
    global.scBehaviorSystem.addCustomTriggerResponse("_trigger_all_awake_behaviors", onTrigger);
    onTrigger();
}

function setupTurnOnEvent() {
    createAndBindEvent("OnStartEvent", onTrigger);
    global.scBehaviorSystem.addCustomTriggerResponse("_trigger_all_turn_on_behaviors", onTrigger);
}

function setupOnEnabled() {
    (script.onEnabledObject || script.getSceneObject()).onEnabled.add(onTrigger);
}

function setupOnDisabled() {
    (script.onDisabledObject || script.getSceneObject()).onDisabled.add(onTrigger);
}

function setupInteractionEvent() {
    if (!script.interactionEventTarget) {
        debugPrint("Target must be set!");
        return;
    }
    var targetObj = script.interactionEventTarget.getSceneObject();
    var interactionComponent = getOrAddComponent(targetObj, "Component.InteractionComponent");
    interactionComponent.addMeshVisual(script.interactionEventTarget);
    interactionComponent[script.interactionEventEventType].add(onTrigger);
}

function setupAnimationEnd() {
    switch (script.animType) {
        case "Animated Texture":
        default:
            if (!script.animationEndAnimatedTexture) {
                debugPrint("Animated Texture must be set!");
                return;
            }
            script.animationEndAnimatedTexture.control.setOnFinish(onTrigger);
            break;
        case "Image Visual":
            if (!script.animationEndImageVisual) {
                debugPrint("Image Visual must be set!");
                return;
            }
            if (script.animationEndImageVisual.mainPass) {
                script.animationEndImageVisual.mainPass.baseTex.control.setOnFinish(onTrigger);
            }
            break;
        case "Sprite Visual":
            debugPrint("Sprite Visual is DEPRECATED in Anim Type.\nPlease use Image Visual instead.");
            break;
        case "Animation Mixer":
            if (!script.animationEndAnimMixer) {
                debugPrint("Anim Mixer must be set!");
                return;
            }
            if (!script.animationEndAnimLayerName) {
                debugPrint("Anim Layer Name must be set!");
                return;
            }
            var mixerLayer = script.animationEndAnimMixer.getLayer(script.animationEndAnimLayerName);
            if (!mixerLayer) {
                debugPrint("Animation Mixer layer couldn't be found: " + script.animationEndAnimLayerName);
                return;
            }
            whenValueBecomes(function () {
                return mixerLayer.isPlaying();
            }, false, onTrigger, false);
            break;
    }
}

function setupTweenEnd() {
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    if (!global.tweenManager.isPlaying) {
        debugPrint("global.tweenManager does not contain isPlaying() - is your version up to date?");
        return;
    }
    var isPlaying = function () {
        return global.tweenManager.isPlaying(script.tweenEndTargetObject, script.tweenEndTweenName);
    };
    whenValueBecomes(isPlaying, false, onTrigger, false, false);
}

function setupLookingAt() {
    if (!script.lookingAtLookingObject) {
        debugPrint("Looking Object must be set!");
        return;
    }
    if (!script.lookingAtLookTarget) {
        debugPrint("Look Target must be set!");
        return;
    }
    var cutoffRadians = script.lookingAtAngle * Math.PI / 180;
    var transformA = script.lookingAtLookingObject.getTransform();
    var transformB = script.lookingAtLookTarget.getTransform();
    whenCompareTypeMatches(function () {
        var dir = transformB.getWorldPosition().sub(transformA.getWorldPosition()).normalize();
        var forward = script.lookingAtFlipForwardVec ? transformA.back : transformA.forward;
        return forward.angleTo(dir);
    }, cutoffRadians, script.lookingAtCompareType, onTrigger, script.lookingAtAllowRepeat, false);
}

function setupBoundsCheck() {
    var objectOrFallback = (script.boundsCheckObject || script.getSceneObject());
    if (!script.boundsCheckBoundaryMeshVisual) {
        debugPrint("Boundary Mesh Visual must be set!");
        return;
    }
    var allowRepeat = false;
    var valueToCheck = true;
    var mesh = script.boundsCheckBoundaryMeshVisual.mesh;
    var aabbMin = mesh.aabbMin;
    var aabbMax = mesh.aabbMax;
    switch (script.boundsCheckTriggerOptions) {
        case "On Enter":
        default:
            allowRepeat = false;
            valueToCheck = true;
            break;
        case "On Stay":
            allowRepeat = true;
            valueToCheck = true;
            break;
        case "On Exit":
            allowRepeat = false;
            valueToCheck = false;
            break;
    }
    whenValueBecomes(function () {
        var worldPos = objectOrFallback.getTransform().getWorldPosition();
        var worldToLocal = script.boundsCheckBoundaryMeshVisual.getTransform().getInvertedWorldTransform();
        var localPos = worldToLocal.multiplyPoint(worldPos);
        return localPos.x >= aabbMin.x && localPos.x <= aabbMax.x && localPos.y >= aabbMin.y && localPos.y <= aabbMax.y && localPos.z >= aabbMin.z && localPos.z <= aabbMax.z;
    }, valueToCheck, onTrigger, allowRepeat, false);
}

function setupDistanceCheck() {
    if (!script.distanceCheckObjectA) {
        debugPrint("Object A must be set!");
        return;
    }
    if (!script.distanceCheckObjectB) {
        debugPrint("Object B must be set!");
        return;
    }
    var transformA = script.distanceCheckObjectA.getTransform();
    var transformB = script.distanceCheckObjectB.getTransform();
    var flattenZ = script.distanceCheckFlattenZForScreenTransforms && script.distanceCheckObjectA.getComponent("Component.ScreenTransform") && script.distanceCheckObjectB.getComponent("Component.ScreenTransform");
    var distFunc = flattenZ ? function () {
        var offset = transformB.getWorldPosition().sub(transformA.getWorldPosition());
        offset.z = 0;
        return offset.length;
    } :
        function () {
            return transformA.getWorldPosition().distance(transformB.getWorldPosition());
        };
    whenCompareTypeMatches(distFunc, script.distanceCheckDistance, script.distanceCheckCompareType, onTrigger, script.distanceCheckAllowRepeat, false);
}

function setupMarkerTrackingEvent() {
    if (!script.markerTrackingEventMarkerTracking) {
        debugPrint("Marker Tracking must be set!");
        return;
    }
    var tracker = script.markerTrackingEventMarkerTracking;
    switch (script.markerTrackingEventEventType) {
        case "Marker Found":
        default:
            tracker.onMarkerFound = wrapFunction(tracker.onMarkerFound, onTrigger);
            break;
        case "Marker Lost":
            tracker.onMarkerLost = wrapFunction(tracker.onMarkerLost, onTrigger);
            break;
    }
}

function setupObjectTrackingEvent() {
    if (!script.objectTrackingEventObjectTracking) {
        debugPrint("Object Tracking must be set!");
        return;
    }
    var tracker = script.objectTrackingEventObjectTracking;
    switch (script.objectTrackingEventEventType) {
        case "Object Found":
        default:
            tracker.onObjectFound = wrapFunction(tracker.onObjectFound, onTrigger);
            break;
        case "Object Lost":
            tracker.onObjectLost = wrapFunction(tracker.onObjectLost, onTrigger);
            break;
        case "Descriptor Start":
            if (!script.objectTrackingEventDescStartKey) {
                debugPrint("Descriptor must be set!");
                return;
            }
            tracker.registerDescriptorStart(script.objectTrackingEventDescStartKey, onTrigger);
            break;
        case "Descriptor End":
            if (!script.objectTrackingEventDescEndKey) {
                debugPrint("Descriptor must be set!");
                return;
            }
            tracker.registerDescriptorEnd(script.objectTrackingEventDescEndKey, onTrigger);
            break;
    }
}

function setupObjectTracking3DEvent() {
    if (!script.objectTracking3DEventObjectTracking3D) {
        debugPrint("Object Tracking 3D must be set!");
        return;
    }
    var tracker = script.objectTracking3DEventObjectTracking3D;
    switch (script.objectTracking3DEventEventType) {
        case "Tracking Started":
        default:
            tracker.onTrackingStarted = wrapFunction(tracker.onTrackingStarted, onTrigger);
            break;
        case "Tracking Lost":
            tracker.onTrackingLost = wrapFunction(tracker.onTrackingLost, onTrigger);
            break;
    }
}

function setupLandmarkerEvent() {
    if (!script.landmarkerEventLocationTracking) {
        debugPrint("Location Tracking must be set!");
        return;
    }
    var tracker = script.landmarkerEventLocationTracking;
    switch (script.landmarkerEventEventType) {
        case "Location Found":
        default:
            tracker.onLocationFound = wrapFunction(tracker.onLocationFound, onTrigger);
            break;
        case "Location Lost":
            tracker.onLocationLost = wrapFunction(tracker.onLocationLost, onTrigger);
            break;
    }
}

function setupMachineLearningEvent() {
    if (!script.machineLearningEventMlComponent) {
        debugPrint("ML Component must be set!");
        return;
    }
    var mlComponent = script.machineLearningEventMlComponent;
    switch (script.machineLearningEventEventType) {
        case "Loading Finished":
        default:
            mlComponent.onLoadingFinished = wrapFunction(mlComponent.onLoadingFinished, onTrigger);
            break;
        case "Running Finished":
            mlComponent.onRunningFinished = wrapFunction(mlComponent.onRunningFinished, onTrigger);
            break;
    }
}

function setupRecordingStart() {
    script.createEvent(script.recordingEventEventType || "SnapRecordStartEvent").bind(onTrigger);
}

function setupOnCustomTrigger() {
    if (script.onCustomTriggerUseList) {
        for (var i = 0; i < script.onCustomTriggerTriggerNames.length; i++) {
            global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerNames[i], onTrigger);
        }
    } else {
        if (!script.onCustomTriggerTriggerName) {
            debugPrint("Trigger Name must be set!");
            return;
        }
        global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerName, onTrigger);
    }
}

function setupPhysicsColliderEvent() {
    var collider = getFallbackComponent(script.physicsColliderEventCollider, "Physics.ColliderComponent");
    if (!collider) {
        debugPrint("Collider must be set or present on SceneObject!");
        return;
    }

    var collisionFilter = makeObjectFilter(script.physicsColliderEventFilterObjectsBy, script.physicsColliderEventAllowedObjects, script.physicsColliderEventNameMatchType, script.physicsColliderEventAllowedNames, "Physics.ColliderComponent");
    var evt;
    switch (script.physicsColliderEventCollisionType) {
        case "Collision":
        default:
            switch (script.physicsColliderEventEventType) {
                case "On Enter":
                default:
                    evt = collider.onCollisionEnter;
                    break;
                case "On Stay":
                    evt = collider.onCollisionStay;
                    break;
                case "On Exit":
                    evt = collider.onCollisionExit;
                    break;
            }
            evt.add(function (eventArgs) {
                var collision = eventArgs.collision;
                if (collisionFilter(collision.collider)) {
                    onTrigger();
                }
            });
            break;
        case "Overlap":
            collider.overlapFilter.includeStatic = script.physicsColliderEventOverlapStatic;
            collider.overlapFilter.includeDynamic = script.physicsColliderEventOverlapDynamic;
            collider.overlapFilter.includeIntangible = script.physicsColliderEventOverlapIntangible;
            switch (script.physicsColliderEventEventType) {
                case "On Enter":
                default:
                    evt = collider.onOverlapEnter;
                    break;
                case "On Stay":
                    evt = collider.onOverlapStay;
                    break;
                case "On Exit":
                    evt = collider.onOverlapExit;
                    break;
            }
            evt.add(function (eventArgs) {
                var overlap = eventArgs.overlap;
                if (collisionFilter(overlap.collider)) {
                    onTrigger();
                }
            });
            break;
    }
}

function setupPhysicsRaycast() {
    var probe;
    switch (script.physicsRaycastProbeType) {
        case "global":
        default:
            probe = Physics.createGlobalProbe();
            break;
        case "root":
            probe = Physics.createRootProbe();
            break;
        case "world":
            if (!script.physicsRaycastPhysicsWorld) {
                debugPrint("Physics World must be set!");
                return;
            }
            probe = script.physicsRaycastPhysicsWorld.createProbe();
            break;
    }
    probe.debugDrawEnabled = script.physicsRaycastDebugDrawEnabled;
    probe.filter.includeStatic = script.physicsRaycastOverlapStatic;
    probe.filter.includeDynamic = script.physicsRaycastOverlapDynamic;
    probe.filter.includeIntangible = script.physicsRaycastOverlapIntangible;

    var collisionFilter = makeObjectFilter(script.physicsRaycastFilterObjectsBy, script.physicsRaycastAllowedObjects, script.physicsRaycastNameMatchType, script.physicsRaycastAllowedNames, "Physics.ColliderComponent");

    function checkValidHit(hit) {
        return hit != null && collisionFilter(hit.collider);
    }

    function onHit(hit) {
        if (checkValidHit(hit)) {
            onTrigger();
        }
    }
    switch (script.physicsRaycastRaycastSource) {
        case "touch":
        default:
            if (!script.physicsRaycastCamera) {
                debugPrint("Camera must be set!");
                return;
            }
            var camTr = script.physicsRaycastCamera.getTransform();
            var isSpecs = global.deviceInfoSystem.isSpectacles();
            var onTouch = function (eventData) {
                var origin = camTr.getWorldPosition();
                var end;
                if (isSpecs) {
                    end = origin.add(camTr.back.uniformScale(script.physicsRaycastMaxDistance));
                } else {
                    var touchPos = eventData.getTouchPosition ? eventData.getTouchPosition() : eventData.getTapPosition();
                    end = script.physicsRaycastCamera.screenSpaceToWorldSpace(touchPos, script.physicsRaycastMaxDistance);
                }
                probe.rayCast(origin, end, onHit);
            };
            if (script.physicsRaycastTapEvent) {
                createAndBindEvent("TapEvent", onTouch);
            }
            if (script.physicsRaycastTouchStartEvent) {
                createAndBindEvent("TouchStartEvent", onTouch);
            }
            if (script.physicsRaycastTouchMoveEvent) {
                createAndBindEvent("TouchMoveEvent", onTouch);
            }
            if (script.physicsRaycastTouchEndEvent) {
                createAndBindEvent("TouchEndEvent", onTouch);
            }
            break;
        case "object":
            var sourceTr = (script.physicsRaycastSourceObject || script).getTransform();
            var dist = script.physicsRaycastMaxDistance;
            if (script.physicsRaycastFlipForwardVec) {
                dist = dist * -1;
            }
            var onUpdate = function () {
                var origin = sourceTr.getWorldPosition();
                var end = origin.add(sourceTr.forward.uniformScale(dist));
                probe.rayCast(origin, end, onHit);
            };
            createAndBindEvent("UpdateEvent", onUpdate);
            break;
    }
}

function triggerTextureAnimation() {
    if (!(script.animateImageAnimatedTexture || script.animateImageVisualObject)) {
        debugPrint("Image Target must be set!");
        return;
    }
    if (script.animateImageAnimatedTexture && script.animateImageVisualObject) {
        setBaseTexForVis(script.animateImageVisualObject, script.animateImageAnimatedTexture);
    }
    var tex = script.animateImageAnimatedTexture || getBaseTexForVis(script.animateImageVisualObject);
    if (!tex) {
        debugPrint("Animated Texture not found!");
        return;
    }
    var control = tex.control;
    if (!control.isOfType("Provider.AnimatedTextureFileProvider")) {
        debugPrint("Animated Texture provider must be of type: Provider.AnimatedTextureFileProvider");
        return;
    }
    if (script.animateImageAdvanced) {
        control.isPingPong = script.animateImagePingPong;
        control.isReversed = script.animateImageReverse;
    }
    switch (script.animateImageAction) {
        case "Play":
            control.play(script.animateImageLoop ? -1 : 1, 0);
            break;
        case "Play or Resume":
        default:
            if (control.isPlaying()) {
                control.resume();
            } else {
                control.play(script.animateImageLoop ? -1 : 1, 0);
            }
            break;
        case "Pause":
            control.pause();
            break;
        case "Pause at Frame":
            control.pauseAtFrame(script.animateImagePauseFrame);
            break;
        case "Toggle":
            if (control.isPlaying()) {
                if (control.isPaused()) {
                    control.resume();
                } else {
                    control.pause();
                }
            } else {
                control.play(script.animateImageLoop ? -1 : 1, 0);
            }
            break;
        case "Stop":
            control.stop();
            break;
    }
}

function triggerAnimateMesh() {
    if (!script.animateMeshAnimationMixer) {
        debugPrint("Animation Mixer must be set!");
        return;
    }
    if (!script.animateMeshLayerName) {
        debugPrint("Layer Name must be set!");
        return;
    }
    var mixerLayer = script.animateMeshAnimationMixer.getLayer(script.animateMeshLayerName);
    mixerLayer.weight = script.animateMeshWeight;
    if (script.animateMeshStopOtherLayers) {
        var layers = script.animateMeshAnimationMixer.getLayers();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name !== script.animateMeshLayerName) {
                layers[i].stop();
                layers[i].weight = 0;
            }
        }
    }
    switch (script.animateMeshAction) {
        case "Play":
            mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            break;
        case "Play or Resume":
        default:
            if (mixerLayer.isPlaying()) {
                mixerLayer.resume();
            } else {
                mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            }
            break;
        case "Pause":
            mixerLayer.pause();
            break;
        case "Stop":
            mixerLayer.stop();
            break;
    }
}

function triggerPlaySound() {
    var provider;
    switch (script.playSoundAction) {
        case "Play":
        default:
            script.playSoundAudioComponent = script.playSoundAudioComponent ||
                script.getSceneObject().createComponent("Component.AudioComponent");
            if (script.playSoundAudioTrack) {
                script.playSoundAudioComponent.audioTrack = script.playSoundAudioTrack;
            }
            provider = script.playSoundAudioComponent.audioTrack && script.playSoundAudioComponent.audioTrack.control;
            if (!(provider && (provider.isOfType("Provider.FileLicensedSoundProvider") || provider.isOfType("Provider.StudioLicensedSoundProvider")))) {
                script.playSoundAudioComponent.volume = script.playSoundVolume;
            }
            try {
                script.playSoundAudioComponent.play(script.playSoundLoop ? -1 : 1);
            } catch (err) {
                debugPrint("Problem playing sound: " + err);
            }
            break;
        case "Stop":
            if (!script.playSoundAudioComponent) {
                debugPrint("Audio Component must be set!");
                return;
            }
            provider = script.playSoundAudioComponent.audioTrack && script.playSoundAudioComponent.audioTrack.control;
            if (provider && (provider.isOfType("Provider.FileLicensedSoundProvider") || provider.isOfType("Provider.StudioLicensedSoundProvider"))) {
                debugPrint("Licensed Sound doesn't support: Stop");
                return;
            }
            script.playSoundAudioComponent.stop(script.playSoundFadeOut);
            break;
    }
}

function triggerPlayVideo() {
    if (!(script.playVideoVideoTexture || script.playVideoVisualObject)) {
        debugPrint("Video Target must be set!");
        return;
    }
    if (script.playVideoVideoTexture && script.playVideoVisualObject) {
        setBaseTexForVis(script.playVideoVisualObject, script.playVideoVideoTexture);
    }
    var tex = script.playVideoVideoTexture || getBaseTexForVis(script.playVideoVisualObject);
    if (!tex) {
        debugPrint("Video Texture not found!");
        return;
    }
    var control = tex.control;
    if (!control.isOfType("Provider.VideoTextureProvider")) {
        debugPrint("Video Texture provider must be of type: Provider.VideoTextureProvider");
        return;
    }
    var status = control.getStatus();
    var playCount = script.playVideoLoop ? -1 : 1;
    var safePlay = function () {
        switch (status) {
            case VideoStatus.Stopped:
                control.play(playCount);
                break;
            case VideoStatus.Playing:
            case VideoStatus.Paused:
                control.stop();
                control.play(playCount);
                break;
        }
    };
    switch (script.playVideoAction) {
        case "Play":
            safePlay();
            break;
        case "Play or Resume":
        default:
            if (status == VideoStatus.Paused) {
                control.resume();
            } else {
                safePlay();
            }
            break;
        case "Pause":
            if (status == VideoStatus.Playing) {
                control.pause();
            }
            break;
        case "Toggle":
            switch (status) {
                case VideoStatus.Paused:
                    control.resume();
                    break;
                case VideoStatus.Playing:
                    control.pause();
                    break;
                case VideoStatus.Preparing:
                    control.stop();
                    break;
                case VideoStatus.Stopped:
                    control.play(playCount);
                    break;
            }
            break;
        case "Stop":
            if (status != VideoStatus.Stopped) {
                control.stop();
            }
            break;
    }
}

function triggerSetEnabled() {
    var target;
    switch (script.setEnabledEntityType) {
        case "SceneObject":
        default:
            target = (script.setEnabledTarget || script.getSceneObject());
            break;
        case "Component":
            target = getFallbackComponent(script.setEnabledTargetComponent, "Component");
            break;
    }
    if (target !== undefined) {
        switch (script.setEnabledAction) {
            case "Enable":
            default:
                target.enabled = true;
                break;
            case "Disable":
                target.enabled = false;
                break;
            case "Toggle":
                target.enabled = !target.enabled;
                break;
        }
    } else {
        debugPrint("target is undefined");
    }
}

function triggerSetParent() {
    var targetObj = (script.setParentTarget || script.getSceneObject());
    if (script.setParentPreserveWorldTransform) {
        targetObj.setParentPreserveWorldTransform(script.setParentNewParent || null);
    } else {
        targetObj.setParent(script.setParentNewParent || null);
    }
}

function triggerSetColor() {
    var mat = script.setColorVisual || script.setColorMaterial;
    if (!mat) {
        debugPrint("Color Target must be set!");
        return;
    }
    mat.mainPass.baseColor = script.setColorColor;
}

function triggerSetTexture() {
    if (!script.setTextureTarget) {
        debugPrint("Target must be set!");
        return;
    }
    script.setTextureTarget.mainPass.baseTex = script.setTextureNewTexture || null;
}

function triggerSetText() {
    var component;
    switch (script.setTextComponentType) {
        case "Text":
        default:
            if (!script.setTextTextComponent) {
                debugPrint("Text Component must be set!");
                return;
            }
            component = script.setTextTextComponent;
            break;
        case "Text3D":
            if (!script.setTextText3DComponent) {
                debugPrint("Text3D Component must be set!");
                return;
            }
            component = script.setTextText3DComponent;
            break;
    }
    component.text = script.setTextText;
}

function triggerRunTween() {
    if (!script.runTweenTweenName) {
        debugPrint("Tween Name must be set!");
        return;
    }
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    var obj = (script.runTweenTargetObject || script.getSceneObject());
    switch (script.runTweenAction) {
        case "Start":
        default:
            global.tweenManager.startTween(obj, script.runTweenTweenName);
            break;
        case "Stop":
            global.tweenManager.stopTween(obj, script.runTweenTweenName);
            break;
        case "Pause":
            global.tweenManager.pauseTween(obj, script.runTweenTweenName);
            break;
        case "Resume":
            var pauseCheck = global.tweenManager.isPaused;
            if (pauseCheck && pauseCheck(obj, script.runTweenTweenName)) {
                global.tweenManager.resumeTween(obj, script.runTweenTweenName);
            } else {
                var playingCheck = global.tweenManager.isPlaying;
                if (!playingCheck || !playingCheck(obj, script.runTweenTweenName)) {
                    global.tweenManager.startTween(obj, script.runTweenTweenName);
                }
            }
            break;
    }
}

function triggerSetPosition() {
    var tran = (script.setPositionObjectToMove || script).getTransform();
    setTranPos(tran, script.setPositionPosition, script.setPositionLocalSpace);
}

function triggerSetRotation() {
    var tran = (script.setRotationObjectToRotate || script).getTransform();
    setTranRot(tran, quat.fromEulerVec(script.setRotationRotationAngle.uniformScale(Math.PI / 180)), script.setRotationLocalSpace);
}

function triggerSetScale() {
    var tran = (script.setScaleObjectToScale || script).getTransform();
    setTranScale(tran, script.setScaleScale, script.setScaleLocalSpace);
}

function triggerSetScreenPosition() {
    var screenTran = getFallbackComponent(script.setScreenPositionScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    switch (script.setScreenPositionPositionType) {
        case "Basic Position":
        default:
            screenTran.position = script.setScreenPositionBasicPosition;
            break;
        case "Anchors Rect":
            screenTran.anchors.setCenter(script.setScreenPositionAnchorsCenter);
            break;
        case "Offsets Rect":
            screenTran.offsets.setCenter(script.setScreenPositionOffsetsCenter);
            break;
    }
}

function triggerSetScreenRotation() {
    var screenTran = getFallbackComponent(script.setScreenRotationScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    var rot = quat.fromEulerAngles(0, 0, script.setScreenRotationAngle * Math.PI / 180);
    screenTran.rotation = rot;
}

function triggerSetScreenSize() {
    var screenTran = getFallbackComponent(script.setScreenSizeScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    switch (script.setScreenSizeSizeType) {
        case "Basic Scale":
        default:
            screenTran.scale = script.setScreenSizeBasicScale;
            break;
        case "Anchors Rect":
            screenTran.anchors.setSize(script.setScreenSizeAnchorsSize);
            break;
        case "Offsets Rect":
            screenTran.offsets.setSize(script.setScreenSizeOffsetsSize);
            break;
    }
}

function triggerSetBlendshapesV2() {
    if (!script.setBlendshapesV2MeshVisual) {
        debugPrint("Mesh Visual must be set!");
        return;
    }
    script.setBlendshapesV2MeshVisual.setBlendShapeWeight(script.setBlendshapesV2Name, script.setBlendshapesV2Weight);
}

function triggerSetMaterialParameter() {
    var target;
    if (!script.setMaterialParameterParameterName) {
        debugPrint("Parameter Name must be set!");
        return;
    }
    var val;
    switch (script.setMaterialParameterTargetType) {
        case "Material":
        default:
            if (!script.setMaterialParameterMaterial) {
                debugPrint("Material must be set!");
                return;
            }
            target = script.setMaterialParameterMaterial.mainPass;
            break;
        case "MeshVisual":
            if (!script.setMaterialParameterMeshVisual) {
                debugPrint("Mesh Visual must be set!");
                return;
            }
            target = script.setMaterialParameterMeshVisual.mainPass;
            break;
        case "VFX Asset":
            if (!script.setMaterialParameterVFXAsset) {
                debugPrint("VFX Asset must be set!");
                return;
            }
            target = script.setMaterialParameterVFXAsset.properties;
            break;
        case "VFX Component":
            if (!script.setMaterialParameterVFXComponent) {
                debugPrint("VFX Component must be set!");
                return;
            }
            target = script.setMaterialParameterVFXComponent.asset.properties;
            break;
    }
    switch (script.setMaterialParameterValueType) {
        case "bool":
            val = script.setMaterialParameterBoolValue;
            break;
        case "int":
            val = script.setMaterialParameterIntValue;
            break;
        case "float":
        default:
            val = script.setMaterialParameterFloatValue;
            break;
        case "Color (RGB)":
            val = script.setMaterialParameterColorRGBValue;
            break;
        case "Color (RGBA)":
            val = script.setMaterialParameterColorRGBAValue;
            break;
        case "Texture":
            val = script.setMaterialParameterTextureValue;
            break;
        case "vec2":
            val = script.setMaterialParameterVec2Value;
            break;
        case "vec3":
            val = script.setMaterialParameterVec3Value;
            break;
        case "vec4":
            val = script.setMaterialParameterVec4Value;
            break;
    }
    try {
        target[script.setMaterialParameterParameterName] = val;
    } catch (err) {
        debugPrint("Wrong value type assigned for the " + script.setMaterialParameterParameterName + " parameter!");
    }
}

function triggerSetTouchBlocking() {
    switch (script.setTouchBlockingTargetType) {
        case "Global Touches":
        default:
            global.touchSystem.touchBlocking = script.setTouchBlockingGlobalTouchBlocking;
            global.touchSystem.enableTouchBlockingException("TouchTypeTouch", script.setTouchBlockingTouchTypeTouch);
            global.touchSystem.enableTouchBlockingException("TouchTypeTap", script.setTouchBlockingTouchTypeTap);
            global.touchSystem.enableTouchBlockingException("TouchTypeDoubleTap", script.setTouchBlockingTouchTypeDoubleTap);
            global.touchSystem.enableTouchBlockingException("TouchTypeScale", script.setTouchBlockingTouchTypeScale);
            global.touchSystem.enableTouchBlockingException("TouchTypePan", script.setTouchBlockingTouchTypePan);
            global.touchSystem.enableTouchBlockingException("TouchTypeSwipe", script.setTouchBlockingTouchTypeSwipe);
            break;
        case "Touch Component":
            if (!script.setTouchBlockingTouchComponent) {
                debugPrint("Touch Component must be set!");
                return;
            }
            if (script.setTouchBlockingTouchTypeTouch) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeTouch");
            }
            if (script.setTouchBlockingTouchTypeTap) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeTap");
            }
            if (script.setTouchBlockingTouchTypeDoubleTap) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeDoubleTap");
            }
            if (script.setTouchBlockingTouchTypeScale) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeScale");
            }
            if (script.setTouchBlockingTouchTypePan) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypePan");
            }
            if (script.setTouchBlockingTouchTypeSwipe) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeSwipe");
            }
            break;
    }
}

function triggerShowHint() {
    var hintLookup = [
        "lens_hint_aim_camera_at_the_sky",
        "lens_hint_blow_a_kiss",
        "lens_hint_blow_a_kiss_voice_changer",
        "lens_hint_come_closer",
        "lens_hint_do_not_smile",
        "lens_hint_do_not_try_with_a_friend",
        "lens_hint_draw_with_your_finger",
        "lens_hint_find_face",
        "lens_hint_find_image",
        "lens_hint_find_marker",
        "lens_hint_find_snapcode",
        "lens_hint_kiss",
        "lens_hint_kiss_again",
        "lens_hint_look_around",
        "lens_hint_look_down",
        "lens_hint_look_left",
        "lens_hint_look_right",
        "lens_hint_look_up",
        "lens_hint_make_some_noise",
        "lens_hint_move_your_head",
        "lens_hint_nod_your_head",
        "lens_hint_now_kiss",
        "lens_hint_now_open_your_mouth",
        "lens_hint_now_raise_your_eyebrows",
        "lens_hint_now_smile",
        "lens_hint_open_your_mouth",
        "lens_hint_open_your_mouth_again",
        "lens_hint_open_your_mouth_voice_changer",
        "lens_hint_pick_a_face",
        "lens_hint_pick_a_photo",
        "lens_hint_pick_an_image",
        "lens_hint_raise_your_eyebrows",
        "lens_hint_raise_your_eyebrows_again",
        "lens_hint_raise_eyebrows_or_open_mouth",
        "lens_hint_raise_your_eyebrows_voice_changer",
        "lens_hint_rotate_your_phone",
        "lens_hint_say_something",
        "lens_hint_smile",
        "lens_hint_smile_again",
        "lens_hint_smile_voice_changer",
        "lens_hint_swap_camera",
        "lens_hint_tap_a_surface",
        "lens_hint_tap_ground_to_place",
        "lens_hint_tap_surface_to_place",
        "lens_hint_tap_ground",
        "lens_hint_tap",
        "lens_hint_tilt_your_head",
        "lens_hint_try_friend",
        "lens_hint_try_rear_camera",
        "lens_hint_turn_around",
        "lens_hint_voice_changer",
        "lens_hint_walk_through_the_door"
    ];
    var hintId = hintLookup[script.showHintHint];
    var hintComponent = getOrAddComponent(script.getSceneObject(), "Component.HintsComponent");
    debugPrint("Showing hint (visible on device but not in Lens Studio): " + hintId);
    hintComponent.showHint(hintId, script.showHintDuration);
}

function triggerMachineLearning() {
    if (!script.runMLMlComponent) {
        debugPrint("ML Component must be set!");
        return;
    }
    var mlComponent = script.runMLMlComponent;
    switch (script.runMLAction) {
        case "Build":
            mlComponent.build([]);
            break;
        case "Run Immediate":
        default:
            if (mlComponent.state != MachineLearning.ModelState.Idle) {
                debugPrint("MLComponent can't run because it is not in Idle state!");
                return;
            }
            mlComponent.runImmediate(script.runMLSync);
            break;
        case "Run Scheduled":
            if (mlComponent.state != MachineLearning.ModelState.Idle) {
                debugPrint("MLComponent can't run because it is not in Idle state!");
                return;
            }
            mlComponent.runScheduled(script.runMLRecurring, script.runMLStartTiming, script.runMLEndTiming);
            break;
        case "Cancel":
            mlComponent.cancel();
            break;
        case "Stop":
            mlComponent.stop();
            break;
    }
}

function triggerInstantiatePrefab() {
    if (!script.instantiatePrefabPrefab) {
        debugPrint("Prefab must be set!");
        return;
    }
    script.instantiatePrefabPrefab.instantiate(script.instantiatePrefabParent || null);
}

function triggerDestroyObject() {
    if (!(isNull(script.destroyObjectObject))) {
        script.destroyObjectObject.destroy();
    }
}

function triggerPrintMessage() {
    debugPrint(script.printMessageText);
}

function triggerCallScriptAPI() {
    var targetAPI;
    switch (script.callScriptAPITargetType) {
        case "SceneObject":
            if (!script.callScriptAPISceneObject) {
                debugPrint("Scene Object must be set!");
                return;
            }
            targetAPI = script.callScriptAPISceneObject;
            break;
        case "Component":
        default:
            if (!script.callScriptAPIComponent) {
                debugPrint("Component must be set!");
                return;
            }
            targetAPI = script.callScriptAPIComponent;
            break;
        case "Script API":
            if (!script.callScriptAPIScriptComponent) {
                debugPrint("Script Component must be set!");
                return;
            }
            targetAPI = script.callScriptAPIScriptComponent.api;
            break;
        case "Global API":
            targetAPI = global;
            break;
    }
    var callScriptAPI_arg1Val = undefined;
    switch (script.callScriptAPI_arg1ValueType) {
        case "None":
        default:

            break;
        case "bool":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1BoolValue;
            break;
        case "int":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1IntValue;
            break;
        case "float":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1FloatValue;
            break;
        case "string":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1StringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec2Value;
            break;
        case "vec3":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec3Value;
            break;
        case "vec4":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec4Value;
            break;
        case "quat":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1QuatValue;
            break;
        case "SceneObject":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1SceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1AssetValue;
            break;
        case "Texture":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1TextureValue;
            break;
        case "Component":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ComponentValue;
            break;
        case "bool Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1BoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1IntArrayValue;
            break;
        case "float Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1FloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1StringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec4ArrayValue;
            break;
        case "quat Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1QuatArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1SceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1AssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1TextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ComponentArrayValue;
            break;
    }
    var callScriptAPI_arg2Val = undefined;
    switch (script.callScriptAPI_arg2ValueType) {
        case "None":
        default:

            break;
        case "bool":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2BoolValue;
            break;
        case "int":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2IntValue;
            break;
        case "float":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2FloatValue;
            break;
        case "string":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2StringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec2Value;
            break;
        case "vec3":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec3Value;
            break;
        case "vec4":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec4Value;
            break;
        case "quat":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2QuatValue;
            break;
        case "SceneObject":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2SceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2AssetValue;
            break;
        case "Texture":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2TextureValue;
            break;
        case "Component":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ComponentValue;
            break;
        case "bool Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2BoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2IntArrayValue;
            break;
        case "float Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2FloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2StringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec4ArrayValue;
            break;
        case "quat Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2QuatArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2SceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2AssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2TextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ComponentArrayValue;
            break;
    }
    var callScriptAPI_valueVal = undefined;
    switch (script.callScriptAPI_valueValueType) {
        case "None":

            break;
        case "bool":
            callScriptAPI_valueVal = script.callScriptAPI_valueBoolValue;
            break;
        case "int":
            callScriptAPI_valueVal = script.callScriptAPI_valueIntValue;
            break;
        case "float":
        default:
            callScriptAPI_valueVal = script.callScriptAPI_valueFloatValue;
            break;
        case "string":
            callScriptAPI_valueVal = script.callScriptAPI_valueStringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_valueVal = script.callScriptAPI_valueColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_valueVal = script.callScriptAPI_valueColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec2Value;
            break;
        case "vec3":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec3Value;
            break;
        case "vec4":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec4Value;
            break;
        case "quat":
            callScriptAPI_valueVal = script.callScriptAPI_valueQuatValue;
            break;
        case "SceneObject":
            callScriptAPI_valueVal = script.callScriptAPI_valueSceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_valueVal = script.callScriptAPI_valueAssetValue;
            break;
        case "Texture":
            callScriptAPI_valueVal = script.callScriptAPI_valueTextureValue;
            break;
        case "Component":
            callScriptAPI_valueVal = script.callScriptAPI_valueComponentValue;
            break;
        case "bool Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueBoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueIntArrayValue;
            break;
        case "float Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueFloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueStringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec4ArrayValue;
            break;
        case "quat Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueQuatArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueSceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueAssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueTextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueComponentArrayValue;
            break;
    }
    switch (script.callScriptAPICallType) {
        case 0:
        default:
            if (!script.callScriptAPIFunctionName) {
                debugPrint("Function Name must be set!");
                return;
            }
            if (targetAPI[script.callScriptAPIFunctionName]) {
                if (callScriptAPI_arg1Val !== undefined && callScriptAPI_arg2Val !== undefined) {
                    targetAPI[script.callScriptAPIFunctionName](callScriptAPI_arg1Val, callScriptAPI_arg2Val);
                } else {
                    if (callScriptAPI_arg1Val !== undefined) {
                        targetAPI[script.callScriptAPIFunctionName](callScriptAPI_arg1Val);
                    } else {
                        targetAPI[script.callScriptAPIFunctionName]();
                    }
                }
            } else {
                debugPrint(script.callScriptAPITargetType + " missing function named '" + script.callScriptAPIFunctionName + "'");
            }
            break;
        case 1:
            if (!script.callScriptAPIPropertyName) {
                debugPrint("Property Name must be set!");
                return;
            }
            targetAPI[script.callScriptAPIPropertyName] = callScriptAPI_valueVal;
            break;
    }
}

function triggerSendCustomTrigger() {
    if (script.sendCustomTriggerUseList) {
        if (customTriggerIndex >= script.sendCustomTriggerTriggerNames.length) {
            if (script.sendCustomTriggerLoopAfterEnd) {
                customTriggerIndex = 0;
            } else {
                return;
            }
        }
        if (script.sendCustomTriggerTriggerNames[customTriggerIndex]) {
            global.scBehaviorSystem.sendCustomTrigger(script.sendCustomTriggerTriggerNames[customTriggerIndex]);
        }
        customTriggerIndex = (customTriggerIndex + 1);
    } else {
        if (!script.sendCustomTriggerTriggerName) {
            debugPrint("Trigger Name must be set!");
            return;
        }
        global.scBehaviorSystem.sendCustomTrigger(script.sendCustomTriggerTriggerName);
    }
}

function triggerPhysicsApplyForce() {
    var body = getFallbackComponent(script.physicsApplyForceBody, "Physics.BodyComponent");
    if (!body) {
        debugPrint("Physics Body must be set or present on SceneObject!");
        return;
    }
    var velocityPropName;
    var forceMethodName;
    switch (script.physicsApplyForceForceType) {
        case "Position":
        default:
            velocityPropName = "velocity";
            forceMethodName = "addForce";
            break;
        case "Rotation":
            velocityPropName = "angularVelocity";
            forceMethodName = "addTorque";
            break;
    }
    var forceToApply = script.physicsApplyForceForceValue;
    var magnitude;
    switch (script.physicsApplyForceSpace) {
        case "World":
        default:

            break;
        case "Local to Object":
            magnitude = forceToApply.length;
            forceToApply = (script.physicsApplyForceObjectSpace || body).getTransform().getWorldTransform().multiplyDirection(forceToApply).normalize().uniformScale(magnitude);
            break;
    }
    switch (script.physicsApplyForceMode) {
        case "Force":
            body[forceMethodName](forceToApply, Physics.ForceMode.Force);
            break;
        case "Acceleration":
            body[forceMethodName](forceToApply, Physics.ForceMode.Acceleration);
            break;
        case "Impulse":
        default:
            body[forceMethodName](forceToApply, Physics.ForceMode.Impulse);
            break;
        case "VelocityChange":
            body[forceMethodName](forceToApply, Physics.ForceMode.VelocityChange);
            break;
        case "Set Velocity":
            body[velocityPropName] = forceToApply;
            break;
    }
}

function triggerSetBlendshapes() {
    if (!script.setBlendshapesBlendshapes) {
        debugPrint("Blendshapes must be set!");
        return;
    }
    script.setBlendshapesBlendshapes.setBlendShape(script.setBlendshapesName, script.setBlendshapesWeight);
}
script.trigger = onTrigger;
script.api.trigger = script.trigger;
script.addTriggerResponse = function (callback) {
    localTriggerResponses.push(callback);
};
script.api.addTriggerResponse = script.addTriggerResponse;
script.removeTriggerResponse = function (callback) {
    if (!removeFromArray(localTriggerResponses, callback)) {
        debugPrint("Failed to remove response");
    }
};
script.api.removeTriggerResponse = script.removeTriggerResponse;
setupTrigger();

 }; module.exports = scriptBody;