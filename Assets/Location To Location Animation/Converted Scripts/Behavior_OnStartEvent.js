//@ui {"widget": "group_start", "label": "Behavior For Animation Start"}
//@input string triggeringEventType = "TouchEvent" {"label": "Trigger", "widget": "combobox", "values": [{"label": "Touch Event", "value": "TouchEvent"}, {"label": "Face Event", "value": "FaceEvent"}, {"label": "On Awake", "value": "OnAwake"}, {"label": "On Start", "value": "TurnOnEvent"}, {"label": "On Enabled", "value": "OnEnabled"}, {"label": "On Disabled", "value": "OnDisabled"}, {"label": "Update", "value": "UpdateEvent"}, {"label": "Late Update", "value": "LateUpdateEvent"}, {"label": "Front Camera", "value": "CameraFrontEvent"}, {"label": "Back Camera", "value": "CameraBackEvent"}, {"label": "Interaction Event", "value": "InteractionEvent"}, {"label": "Animation End", "value": "animationEnd"}, {"label": "Tween End", "value": "tweenEnd"}, {"label": "Looking At", "value": "lookingAt"}, {"label": "Bounds Check", "value": "boundsCheck"}, {"label": "Distance Check", "value": "distanceCheck"}, {"label": "Marker Tracking Event", "value": "markerTrackingEvent"}, {"label": "Object Tracking Event", "value": "objectTrackingEvent"}, {"label": "Object Tracking 3D Event", "value": "objectTracking3DEvent"}, {"label": "Location Event", "value": "landmarkerEvent"}, {"label": "Machine Learning Event", "value": "machineLearningEvent"}, {"label": "Recording Event", "value": "recordingStart"}, {"label": "On Custom Trigger", "value": "onCustomTrigger"}, {"label": "Physics Collider Event", "value": "physicsColliderEvent"}, {"label": "Physics Raycast", "value": "physicsRaycast"}, {"label": "None", "value": "None"}]}
//@input string touchEventEventType = "TapEvent" {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "widget": "combobox", "values": [{"label": "Tap", "value": "TapEvent"}, {"label": "Touch Start", "value": "TouchStartEvent"}, {"label": "Touch Move", "value": "TouchMoveEvent"}, {"label": "Touch End", "value": "TouchEndEvent"}], "label": "Event Type"}
//@input Component.BaseMeshVisual touchEventTouchTarget {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "label": "Touch Target"}
//@input string faceEventEventType = "MouthOpenedEvent" {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "widget": "combobox", "values": [{"label": "Mouth Opened", "value": "MouthOpenedEvent"}, {"label": "Mouth Closed", "value": "MouthClosedEvent"}, {"label": "Brows Raised", "value": "BrowsRaisedEvent"}, {"label": "Brows Lowered", "value": "BrowsLoweredEvent"}, {"label": "Brows Returned to Normal", "value": "BrowsReturnedToNormalEvent"}, {"label": "Face Found", "value": "FaceFoundEvent"}, {"label": "Face Lost", "value": "FaceLostEvent"}, {"label": "Kiss Started", "value": "KissStartedEvent"}, {"label": "Kiss Finished", "value": "KissFinishedEvent"}, {"label": "Smile Started", "value": "SmileStartedEvent"}, {"label": "Smile Finished", "value": "SmileFinishedEvent"}], "label": "Event Type"}
//@input int faceEventFaceIndex {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "label": "Face Index"}
//@input SceneObject onEnabledObject {"showIf": "triggeringEventType", "showIfValue": "OnEnabled", "label": "Object"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "OnEnabled", "label": "<i><small>(Defaults to this SceneObject if blank)</small></i>", "widget": "label"}
//@input SceneObject onDisabledObject {"showIf": "triggeringEventType", "showIfValue": "OnDisabled", "label": "Object"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "OnDisabled", "label": "<i><small>(Defaults to this SceneObject if blank)</small></i>", "widget": "label"}
//@input string interactionEventEventType = "onTap" {"showIf": "triggeringEventType", "showIfValue": "InteractionEvent", "widget": "combobox", "values": [{"label": "Tap", "value": "onTap"}, {"label": "Touch Start", "value": "onTouchStart"}, {"label": "Touch Move", "value": "onTouchMove"}, {"label": "Touch End", "value": "onTouchEnd"}, {"label": "Focus Start", "value": "onFocusStart"}, {"label": "Focus End", "value": "onFocusEnd"}, {"label": "Select Start", "value": "onSelectStart"}, {"label": "Select End", "value": "onSelectEnd"}, {"label": "Trigger Primary", "value": "onTriggerPrimary"}], "label": "Event Type"}
//@input Component.BaseMeshVisual interactionEventTarget {"showIf": "triggeringEventType", "showIfValue": "InteractionEvent", "label": "Target"}
//@input string animType = "Animated Texture" {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "combobox", "values": [{"label": "Animated Texture", "value": "Animated Texture"}, {"label": "Image Visual", "value": "Image Visual"}, {"label": "Animation Mixer", "value": "Animation Mixer"}]}
//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "label": "Target", "widget": "group_start"}
//@input Asset.Texture animationEndAnimatedTexture {"showIf": "animType", "showIfValue": "Animated Texture", "label": "Animated Texture"}
//@input Component.MaterialMeshVisual animationEndImageVisual {"showIf": "animType", "showIfValue": "Image Visual", "label": "Image Visual"}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "label": "Sprite Visual is Deprecated.", "widget": "label"}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "label": "Please use Image Visual instead.", "widget": "label"}
//@input Component.AnimationMixer animationEndAnimMixer {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Mixer"}
//@input string animationEndAnimLayerName {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Layer Name"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "group_end"}
//@input SceneObject tweenEndTargetObject {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Target Object"}
//@input string tweenEndTweenName {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Tween Name"}
//@input SceneObject lookingAtLookingObject {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Looking Object"}
//@input SceneObject lookingAtLookTarget {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Look Target"}
//@input bool lookingAtFlipForwardVec = true {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Flip Forward Vec"}
//@input int lookingAtCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Compare Type", "widget": "combobox", "values": [{"label": "Is Less Than", "value": -1}, {"label": "Is Equal To", "value": 0}, {"label": "Is Greater Than", "value": 1}]}
//@input float lookingAtAngle = 10.0 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Angle"}
//@input bool lookingAtAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Allow Repeat"}
//@input SceneObject boundsCheckObject {"showIf": "triggeringEventType", "showIfValue": "boundsCheck", "label": "Object"}
//@input Component.RenderMeshVisual boundsCheckBoundaryMeshVisual {"showIf": "triggeringEventType", "showIfValue": "boundsCheck", "label": "Boundary Mesh Visual"}
//@input string boundsCheckTriggerOptions = "On Enter" {"showIf": "triggeringEventType", "showIfValue": "boundsCheck", "widget": "combobox", "values": [{"label": "On Enter", "value": "On Enter"}, {"label": "On Stay", "value": "On Stay"}, {"label": "On Exit", "value": "On Exit"}], "label": "Trigger Options"}
//@input SceneObject distanceCheckObjectA {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object A"}
//@input SceneObject distanceCheckObjectB {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object B"}
//@input int distanceCheckCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Compare Type", "widget": "combobox", "values": [{"label": "Is Less Than", "value": -1}, {"label": "Is Equal To", "value": 0}, {"label": "Is Greater Than", "value": 1}]}
//@input float distanceCheckDistance = 1.0 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Distance"}
//@input bool distanceCheckAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Allow Repeat"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "ScreenTransform Settings", "widget": "group_start"}
//@input bool distanceCheckFlattenZForScreenTransforms = true {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Flatten Z Distance"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "widget": "group_end"}
//@input string markerTrackingEventEventType = "Marker Found" {"showIf": "triggeringEventType", "showIfValue": "markerTrackingEvent", "widget": "combobox", "values": [{"label": "Marker Found", "value": "Marker Found"}, {"label": "Marker Lost", "value": "Marker Lost"}], "label": "Event Type"}
//@input Component.MarkerTrackingComponent markerTrackingEventMarkerTracking {"showIf": "triggeringEventType", "showIfValue": "markerTrackingEvent", "label": "Marker Tracking"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "label": "Tracking Settings", "widget": "group_start"}
//@input string objectTrackingEventEventType = "Object Found" {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "widget": "combobox", "values": [{"label": "Object Found", "value": "Object Found"}, {"label": "Object Lost", "value": "Object Lost"}, {"label": "Descriptor Start", "value": "Descriptor Start"}, {"label": "Descriptor End", "value": "Descriptor End"}], "label": "Event Type"}
//@input Component.ObjectTracking objectTrackingEventObjectTracking {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "label": "Object Tracking"}
//@input string objectTrackingEventDescStartKey {"showIf": "objectTrackingEventEventType", "showIfValue": "Descriptor Start", "label": "Descriptor"}
//@input string objectTrackingEventDescEndKey {"showIf": "objectTrackingEventEventType", "showIfValue": "Descriptor End", "label": "Descriptor"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "widget": "group_end"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTracking3DEvent", "label": "Tracking Settings", "widget": "group_start"}
//@input Component.ObjectTracking3D objectTracking3DEventObjectTracking3D {"showIf": "triggeringEventType", "showIfValue": "objectTracking3DEvent", "label": "Object Tracking 3D"}
//@input string objectTracking3DEventEventType = "Tracking Started" {"showIf": "triggeringEventType", "showIfValue": "objectTracking3DEvent", "widget": "combobox", "values": [{"label": "Tracking Started", "value": "Tracking Started"}, {"label": "Tracking Lost", "value": "Tracking Lost"}], "label": "Event Type"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTracking3DEvent", "widget": "group_end"}
//@input string landmarkerEventEventType = "Location Found" {"showIf": "triggeringEventType", "showIfValue": "landmarkerEvent", "widget": "combobox", "values": [{"label": "Location Found", "value": "Location Found"}, {"label": "Location Lost", "value": "Location Lost"}], "label": "Event Type"}
//@input Component.DeviceLocationTrackingComponent landmarkerEventLocationTracking {"showIf": "triggeringEventType", "showIfValue": "landmarkerEvent", "label": "Location Tracking"}
//@input string machineLearningEventEventType = "Loading Finished" {"showIf": "triggeringEventType", "showIfValue": "machineLearningEvent", "widget": "combobox", "values": [{"label": "Loading Finished", "value": "Loading Finished"}, {"label": "Running Finished", "value": "Running Finished"}], "label": "Event Type"}
//@input Component.MLComponent machineLearningEventMlComponent {"showIf": "triggeringEventType", "showIfValue": "machineLearningEvent", "label": "ML Component"}
//@input string recordingEventEventType = "SnapRecordStartEvent" {"showIf": "triggeringEventType", "showIfValue": "recordingStart", "widget": "combobox", "values": [{"label": "Recording Start", "value": "SnapRecordStartEvent"}, {"label": "Recording Stop", "value": "SnapRecordStopEvent"}, {"label": "Image Capture", "value": "SnapImageCaptureEvent"}], "label": "Event Type"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "label": "Custom Trigger", "widget": "group_start"}
//@input string onCustomTriggerTriggerName {"showIf": "onCustomTriggerUseList", "showIfValue": false, "label": "Trigger Name"}
//@input string[] onCustomTriggerTriggerNames {"showIf": "onCustomTriggerUseList", "showIfValue": true, "label": "Trigger Names"}
//@input bool onCustomTriggerUseList {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "label": "Use List"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "widget": "group_end"}
//@input Physics.ColliderComponent physicsColliderEventCollider {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "label": "Collider"}
//@input string physicsColliderEventCollisionType = "Collision" {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "widget": "combobox", "values": [{"label": "Collision", "value": "Collision"}, {"label": "Overlap", "value": "Overlap"}], "label": "Collision Type"}
//@input string physicsColliderEventEventType = "On Enter" {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "widget": "combobox", "values": [{"label": "On Enter", "value": "On Enter"}, {"label": "On Stay", "value": "On Stay"}, {"label": "On Exit", "value": "On Exit"}], "label": "Event Type"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "label": "Collider Filtering", "widget": "group_start"}
//@ui {"showIf": "physicsColliderEventCollisionType", "showIfValue": "Overlap", "label": "Overlap With...", "widget": "group_start"}
//@input bool physicsColliderEventOverlapStatic = true {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "label": "Static"}
//@input bool physicsColliderEventOverlapDynamic = true {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "label": "Dynamic"}
//@input bool physicsColliderEventOverlapIntangible = true {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "label": "Intangible"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "widget": "group_end"}
//@input string physicsColliderEventFilterObjectsBy = "None" {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "widget": "combobox", "values": [{"label": "None (allow all)", "value": "None"}, {"label": "Other object", "value": "Other object"}, {"label": "Other name", "value": "Other name"}], "label": "Filter Objects By..."}
//@input Physics.ColliderComponent[] physicsColliderEventAllowedObjects {"showIf": "physicsColliderEventFilterObjectsBy", "showIfValue": "Other object", "label": "Allowed Objects"}
//@input string physicsColliderEventNameMatchType = "Equals" {"showIf": "physicsColliderEventFilterObjectsBy", "showIfValue": "Other name", "widget": "combobox", "values": [{"label": "Equals", "value": "Equals"}, {"label": "Starts With", "value": "Starts With"}, {"label": "Regex", "value": "Regex"}], "label": "Name Match Type"}
//@input string[] physicsColliderEventAllowedNames {"showIf": "physicsColliderEventFilterObjectsBy", "showIfValue": "Other name", "label": "Allowed Names"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsColliderEvent", "widget": "group_end"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Source Settings", "widget": "group_start"}
//@input string physicsRaycastRaycastSource = "touch" {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "combobox", "values": [{"label": "From Touch", "value": "touch"}, {"label": "From Object", "value": "object"}], "label": "Raycast Source"}
//@ui {"showIf": "physicsRaycastRaycastSource", "showIfValue": "touch", "label": "Raycast in response to touch events. The raycast<br>will be sent from the camera towards the<br>position of the touch.", "widget": "label"}
//@ui {"showIf": "physicsRaycastRaycastSource", "showIfValue": "object", "label": "Raycast every frame from the object's forward<br>vector (Z-positive). If using a camera object,<br>enable 'Flip Forward Vec'.", "widget": "label"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "separator"}
//@input SceneObject physicsRaycastSourceObject {"showIf": "physicsRaycastRaycastSource", "showIfValue": "object", "label": "Source Object"}
//@input bool physicsRaycastFlipForwardVec {"showIf": "physicsRaycastRaycastSource", "showIfValue": "object", "label": "Flip Forward Vec"}
//@input Component.Camera physicsRaycastCamera {"showIf": "physicsRaycastRaycastSource", "showIfValue": "touch", "label": "Camera"}
//@ui {"showIf": "physicsRaycastRaycastSource", "showIfValue": "touch", "label": "Touch Events", "widget": "group_start"}
//@input bool physicsRaycastTapEvent = true {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Tap Event"}
//@input bool physicsRaycastTouchStartEvent {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Touch Start Event"}
//@input bool physicsRaycastTouchMoveEvent {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Touch Move Event"}
//@input bool physicsRaycastTouchEndEvent {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Touch End Event"}
//@ui {"showIf": "physicsRaycastRaycastSource", "showIfValue": "touch", "widget": "group_end"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "group_end"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Raycast Options", "widget": "group_start"}
//@input string physicsRaycastProbeType = "global" {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "combobox", "values": [{"label": "Global (all worlds included)", "value": "global"}, {"label": "Root (only default world included)", "value": "root"}, {"label": "World (only set world included)", "value": "world"}], "label": "Probe Type"}
//@input Physics.WorldComponent physicsRaycastPhysicsWorld {"showIf": "physicsRaycastProbeType", "showIfValue": "world", "label": "Physics World"}
//@input float physicsRaycastMaxDistance = 10000.0 {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Max Distance"}
//@input bool physicsRaycastDebugDrawEnabled {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Debug Draw Enabled"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "group_end"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Collider Filtering", "widget": "group_start"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Collide With...", "widget": "group_start"}
//@input bool physicsRaycastOverlapStatic = true {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Static"}
//@input bool physicsRaycastOverlapDynamic = true {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Dynamic"}
//@input bool physicsRaycastOverlapIntangible = true {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "label": "Intangible"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "group_end"}
//@input string physicsRaycastFilterObjectsBy = "None" {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "combobox", "values": [{"label": "None (allow all)", "value": "None"}, {"label": "This object", "value": "This object"}, {"label": "Other object", "value": "Other object"}, {"label": "Other name", "value": "Other name"}], "label": "Filter Objects By..."}
//@ui {"showIf": "physicsRaycastFilterObjectsBy", "showIfValue": "This object", "label": "<i><small>Make sure at least one ColliderComponent is attached<br>to this SceneObject.</small></i>", "widget": "label"}
//@input Physics.ColliderComponent[] physicsRaycastAllowedObjects {"showIf": "physicsRaycastFilterObjectsBy", "showIfValue": "Other object", "label": "Allowed Objects"}
//@input string physicsRaycastNameMatchType = "Equals" {"showIf": "physicsRaycastFilterObjectsBy", "showIfValue": "Other name", "widget": "combobox", "values": [{"label": "Equals", "value": "Equals"}, {"label": "Starts With", "value": "Starts With"}, {"label": "Regex", "value": "Regex"}], "label": "Name Match Type"}
//@input string[] physicsRaycastAllowedNames {"showIf": "physicsRaycastFilterObjectsBy", "showIfValue": "Other name", "label": "Allowed Names"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "physicsRaycast", "widget": "group_end"}
//@ui {"label": "Options", "widget": "group_start"}
//@input string triggerLimitType = "Always" {"label": "Allow", "widget": "combobox", "values": [{"label": "Always", "value": "Always"}, {"label": "Once", "value": "Once"}, {"label": "After Interval", "value": "Interval"}]}
//@input float triggerInterval = 1.0 {"label": "Interval Time", "showIf": "triggerLimitType", "showIfValue": "Interval"}
//@input float triggerDelay {"label": "Delay Time"}
//@ui {"widget": "group_end"}
//@ui {"widget": "separator"}
//@input string responseType = "None" {"widget": "combobox", "values": [{"label": "None", "value": "None"}, {"label": "Animate Image", "value": "textureAnimation"}, {"label": "Animate Mesh", "value": "animateMesh"}, {"label": "Play Sound", "value": "playSound"}, {"label": "Play Video", "value": "playVideo"}, {"label": "Set Enabled", "value": "setEnabled"}, {"label": "Set Parent", "value": "setParent"}, {"label": "Set Color", "value": "setColor"}, {"label": "Set Texture", "value": "setTexture"}, {"label": "Set Text", "value": "setText"}, {"label": "Run Tween", "value": "runTween"}, {"label": "Set Position", "value": "setPosition"}, {"label": "Set Rotation", "value": "setRotation"}, {"label": "Set Scale", "value": "setScale"}, {"label": "Set Screen Position", "value": "setScreenPosition"}, {"label": "Set Screen Rotation", "value": "setScreenRotation"}, {"label": "Set Screen Size", "value": "setScreenSize"}, {"label": "Set Blendshapes", "value": "setBlendshapesV2"}, {"label": "Set Material/VFX Parameter", "value": "setMaterialParameter"}, {"label": "Set Touch Blocking", "value": "setTouchBlocking"}, {"label": "Show Hint", "value": "showHint"}, {"label": "Machine Learning", "value": "machineLearning"}, {"label": "Instantiate Prefab", "value": "instantiatePrefab"}, {"label": "Destroy Object", "value": "destroyObject"}, {"label": "Print Message", "value": "printMessage"}, {"label": "Call Object API", "value": "callScriptAPI"}, {"label": "Send Custom Trigger", "value": "sendCustomTrigger"}, {"label": "Physics Apply Force", "value": "physicsApplyForce"}]}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Target", "widget": "group_start"}
//@input Asset.Texture animateImageAnimatedTexture {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Animated Texture"}
//@input Component.MaterialMeshVisual animateImageVisualObject {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Visual Object"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}
//@input string animateImageAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "combobox", "values": [{"label": "Play", "value": "Play"}, {"label": "Play or Resume", "value": "Play or Resume"}, {"label": "Pause", "value": "Pause"}, {"label": "Pause at Frame", "value": "Pause at Frame"}, {"label": "Toggle Play/Pause", "value": "Toggle"}, {"label": "Stop", "value": "Stop"}], "label": "Action"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Options", "widget": "group_start"}
//@input bool animateImageLoop {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Loop"}
//@input int animateImagePauseFrame {"showIf": "animateImageAction", "showIfValue": "Pause at Frame", "label": "Pause Frame"}
//@input bool animateImageAdvanced {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Advanced"}
//@ui {"showIf": "animateImageAdvanced", "showIfValue": true, "label": "Warning: This will modify Texture settings!", "widget": "group_start"}
//@input bool animateImagePingPong {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Ping Pong"}
//@input bool animateImageReverse {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Reverse"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}
//@input Component.AnimationMixer animateMeshAnimationMixer {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Animation Mixer"}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Options", "widget": "group_start"}
//@input string animateMeshLayerName {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Layer Name"}
//@input string animateMeshAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "combobox", "values": [{"label": "Play", "value": "Play"}, {"label": "Play or Resume", "value": "Play or Resume"}, {"label": "Pause", "value": "Pause"}, {"label": "Stop", "value": "Stop"}], "label": "Action"}
//@input float animateMeshWeight = 1.0 {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Weight"}
//@input bool animateMeshLoop {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Loop"}
//@input bool animateMeshStopOtherLayers = true {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Stop Other Layers", "hint": "Stops all other Layers, and sets their weights to 0."}
//@ui {"showIf": "animateMeshStopOtherLayers", "showIfValue": true, "label": "Note: Other layer weights will be set to 0.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "group_end"}
//@input string playSoundAction = "Play" {"showIf": "responseType", "showIfValue": "playSound", "widget": "combobox", "values": [{"label": "Play", "value": "Play"}, {"label": "Stop", "value": "Stop"}], "label": "Action"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "label": "Target", "widget": "group_start"}
//@input Asset.AudioTrackAsset playSoundAudioTrack {"showIf": "playSoundAction", "showIfValue": "Play", "label": "Audio Track"}
//@input Component.AudioComponent playSoundAudioComponent {"showIf": "responseType", "showIfValue": "playSound", "label": "Audio Component"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "label": "Options", "widget": "group_start"}
//@input bool playSoundLoop {"showIf": "playSoundAction", "showIfValue": "Play", "label": "Loop"}
//@input float playSoundVolume = 1.0 {"showIf": "playSoundAction", "showIfValue": "Play", "min": 0.0, "max": 1.0, "step": 0.05, "widget": "slider", "label": "Volume"}
//@input bool playSoundFadeOut {"showIf": "playSoundAction", "showIfValue": "Stop", "label": "Fade Out"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "playVideo", "label": "Target", "widget": "group_start"}
//@input Asset.Texture playVideoVideoTexture {"showIf": "responseType", "showIfValue": "playVideo", "label": "Video Texture"}
//@input Component.MaterialMeshVisual playVideoVisualObject {"showIf": "responseType", "showIfValue": "playVideo", "label": "Visual Object"}
//@ui {"showIf": "responseType", "showIfValue": "playVideo", "widget": "group_end"}
//@input string playVideoAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "playVideo", "widget": "combobox", "values": [{"label": "Play", "value": "Play"}, {"label": "Play or Resume", "value": "Play or Resume"}, {"label": "Pause", "value": "Pause"}, {"label": "Toggle Play/Pause", "value": "Toggle"}, {"label": "Stop", "value": "Stop"}], "label": "Action"}
//@input bool playVideoLoop {"showIf": "responseType", "showIfValue": "playVideo", "label": "Loop"}
//@ui {"showIf": "responseType", "showIfValue": "setEnabled", "label": "Options", "widget": "group_start"}
//@input string setEnabledEntityType = "SceneObject" {"showIf": "responseType", "showIfValue": "setEnabled", "widget": "combobox", "values": [{"label": "SceneObject", "value": "SceneObject"}, {"label": "Component", "value": "Component"}], "label": "Entity Type"}
//@input SceneObject setEnabledTarget {"showIf": "setEnabledEntityType", "showIfValue": "SceneObject", "label": "Target"}
//@input Component setEnabledTargetComponent {"showIf": "setEnabledEntityType", "showIfValue": "Component", "label": "Target Component"}
//@input string setEnabledAction = "Enable" {"showIf": "responseType", "showIfValue": "setEnabled", "widget": "combobox", "values": [{"label": "Enable", "value": "Enable"}, {"label": "Disable", "value": "Disable"}, {"label": "Toggle", "value": "Toggle"}], "label": "Action"}
//@ui {"showIf": "responseType", "showIfValue": "setEnabled", "widget": "group_end"}
//@input SceneObject setParentTarget {"showIf": "responseType", "showIfValue": "setParent", "label": "Target"}
//@input SceneObject setParentNewParent {"showIf": "responseType", "showIfValue": "setParent", "label": "New Parent"}
//@input bool setParentPreserveWorldTransform = false {"showIf": "responseType", "showIfValue": "setParent", "label": "Preserve World Transform"}
//@ui {"showIf": "responseType", "showIfValue": "setColor", "label": "Target", "widget": "group_start"}
//@input Component.MaterialMeshVisual setColorVisual {"showIf": "responseType", "showIfValue": "setColor", "label": "Visual"}
//@input Asset.Material setColorMaterial {"showIf": "responseType", "showIfValue": "setColor", "label": "Material"}
//@ui {"showIf": "responseType", "showIfValue": "setColor", "widget": "group_end"}
//@input vec4 setColorColor = "{1,1,1,1}" {"showIf": "responseType", "showIfValue": "setColor", "widget": "color", "label": "Color"}
//@input Component.MaterialMeshVisual setTextureTarget {"showIf": "responseType", "showIfValue": "setTexture", "label": "Target"}
//@input Asset.Texture setTextureNewTexture {"showIf": "responseType", "showIfValue": "setTexture", "label": "New Texture"}
//@ui {"showIf": "responseType", "showIfValue": "setText", "label": "Component", "widget": "group_start"}
//@input string setTextComponentType = "Text" {"showIf": "responseType", "showIfValue": "setText", "widget": "combobox", "values": [{"label": "Text", "value": "Text"}, {"label": "Text3D", "value": "Text3D"}], "label": "Component Type"}
//@input Component.Text setTextTextComponent {"showIf": "setTextComponentType", "showIfValue": "Text", "label": "Text Component"}
//@input Component.Text3D setTextText3DComponent {"showIf": "setTextComponentType", "showIfValue": "Text3D", "label": "Text3D Component"}
//@ui {"showIf": "responseType", "showIfValue": "setText", "widget": "group_end"}
//@input string setTextText {"showIf": "responseType", "showIfValue": "setText", "label": "Text"}
//@input SceneObject runTweenTargetObject {"showIf": "responseType", "showIfValue": "runTween", "label": "Target Object"}
//@input string runTweenTweenName {"showIf": "responseType", "showIfValue": "runTween", "label": "Tween Name"}
//@input string runTweenAction = "Start" {"showIf": "responseType", "showIfValue": "runTween", "widget": "combobox", "values": [{"label": "Start", "value": "Start"}, {"label": "Stop", "value": "Stop"}, {"label": "Pause", "value": "Pause"}, {"label": "Resume", "value": "Resume"}], "label": "Action"}
//@input SceneObject setPositionObjectToMove {"showIf": "responseType", "showIfValue": "setPosition", "label": "Object to Move"}
//@input vec3 setPositionPosition {"showIf": "responseType", "showIfValue": "setPosition", "label": "Position"}
//@input bool setPositionLocalSpace = true {"showIf": "responseType", "showIfValue": "setPosition", "label": "Local Space"}
//@input SceneObject setRotationObjectToRotate {"showIf": "responseType", "showIfValue": "setRotation", "label": "Object to Rotate"}
//@input vec3 setRotationRotationAngle {"showIf": "responseType", "showIfValue": "setRotation", "label": "Euler Rotation"}
//@input bool setRotationLocalSpace = true {"showIf": "responseType", "showIfValue": "setRotation", "label": "Local Space"}
//@input SceneObject setScaleObjectToScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Object to Scale"}
//@input vec3 setScaleScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Scale"}
//@input bool setScaleLocalSpace = true {"showIf": "responseType", "showIfValue": "setScale", "label": "Local Space"}
//@input Component.ScreenTransform setScreenPositionScreenTransform {"showIf": "responseType", "showIfValue": "setScreenPosition", "label": "Screen Transform"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenPosition", "label": "Options", "widget": "group_start"}
//@input string setScreenPositionPositionType = "Basic Position" {"showIf": "responseType", "showIfValue": "setScreenPosition", "widget": "combobox", "values": [{"label": "Basic Position", "value": "Basic Position"}, {"label": "Anchors Rect", "value": "Anchors Rect"}, {"label": "Offsets Rect", "value": "Offsets Rect"}], "label": "Position Type"}
//@input vec3 setScreenPositionBasicPosition {"showIf": "setScreenPositionPositionType", "showIfValue": "Basic Position", "label": "Basic Position"}
//@input vec2 setScreenPositionAnchorsCenter {"showIf": "setScreenPositionPositionType", "showIfValue": "Anchors Rect", "label": "Anchors Center"}
//@input vec2 setScreenPositionOffsetsCenter {"showIf": "setScreenPositionPositionType", "showIfValue": "Offsets Rect", "label": "Offsets Center"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenPosition", "widget": "group_end"}
//@input Component.ScreenTransform setScreenRotationScreenTransform {"showIf": "responseType", "showIfValue": "setScreenRotation", "label": "Screen Transform"}
//@input float setScreenRotationAngle {"showIf": "responseType", "showIfValue": "setScreenRotation", "label": "Angle"}
//@input Component.ScreenTransform setScreenSizeScreenTransform {"showIf": "responseType", "showIfValue": "setScreenSize", "label": "Screen Transform"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenSize", "label": "Options", "widget": "group_start"}
//@input string setScreenSizeSizeType = "Basic Scale" {"showIf": "responseType", "showIfValue": "setScreenSize", "widget": "combobox", "values": [{"label": "Basic Scale", "value": "Basic Scale"}, {"label": "Anchors Rect", "value": "Anchors Rect"}, {"label": "Offsets Rect", "value": "Offsets Rect"}], "label": "Size Type"}
//@input vec3 setScreenSizeBasicScale {"showIf": "setScreenSizeSizeType", "showIfValue": "Basic Scale", "label": "Basic Scale"}
//@input vec2 setScreenSizeAnchorsSize {"showIf": "setScreenSizeSizeType", "showIfValue": "Anchors Rect", "label": "Anchors Size"}
//@input vec2 setScreenSizeOffsetsSize {"showIf": "setScreenSizeSizeType", "showIfValue": "Offsets Rect", "label": "Offsets Size"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenSize", "widget": "group_end"}
//@input Component.RenderMeshVisual setBlendshapesV2MeshVisual {"showIf": "responseType", "showIfValue": "setBlendshapesV2", "label": "Mesh Visual"}
//@input string setBlendshapesV2Name {"showIf": "responseType", "showIfValue": "setBlendshapesV2", "label": "Name"}
//@input float setBlendshapesV2Weight = 0 {"showIf": "responseType", "showIfValue": "setBlendshapesV2", "label": "Weight"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "label": "Target", "widget": "group_start"}
//@input string setMaterialParameterTargetType = "Material" {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "combobox", "values": [{"label": "Material", "value": "Material"}, {"label": "MeshVisual", "value": "MeshVisual"}, {"label": "VFX Asset", "value": "VFX Asset"}, {"label": "VFX Component", "value": "VFX Component"}], "label": "Target Type"}
//@input Asset.Material setMaterialParameterMaterial {"showIf": "setMaterialParameterTargetType", "showIfValue": "Material", "label": "Material"}
//@input Component.MaterialMeshVisual setMaterialParameterMeshVisual {"showIf": "setMaterialParameterTargetType", "showIfValue": "MeshVisual", "label": "Mesh Visual"}
//@input Asset.VFXAsset setMaterialParameterVFXAsset {"showIf": "setMaterialParameterTargetType", "showIfValue": "VFX Asset", "label": "VFX Asset"}
//@input Component.VFXComponent setMaterialParameterVFXComponent {"showIf": "setMaterialParameterTargetType", "showIfValue": "VFX Component", "label": "VFX Component"}
//@input string setMaterialParameterParameterName {"showIf": "responseType", "showIfValue": "setMaterialParameter", "label": "Parameter Name"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "label": "Value", "widget": "group_start"}
//@input string setMaterialParameterValueType = "float" {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "combobox", "values": [{"label": "bool", "value": "bool"}, {"label": "int", "value": "int"}, {"label": "float", "value": "float"}, {"label": "Color (RGB)", "value": "Color (RGB)"}, {"label": "Color (RGBA)", "value": "Color (RGBA)"}, {"label": "Texture", "value": "Texture"}, {"label": "vec2", "value": "vec2"}, {"label": "vec3", "value": "vec3"}, {"label": "vec4", "value": "vec4"}], "label": "Value Type"}
//@input bool setMaterialParameterBoolValue {"showIf": "setMaterialParameterValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int setMaterialParameterIntValue {"showIf": "setMaterialParameterValueType", "showIfValue": "int", "label": "Int Value"}
//@input float setMaterialParameterFloatValue {"showIf": "setMaterialParameterValueType", "showIfValue": "float", "label": "Float Value"}
//@input vec3 setMaterialParameterColorRGBValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 setMaterialParameterColorRGBAValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input Asset.Texture setMaterialParameterTextureValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input vec2 setMaterialParameterVec2Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 setMaterialParameterVec3Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 setMaterialParameterVec4Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Target", "widget": "group_start"}
//@input string setTouchBlockingTargetType = "Global Touches" {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "combobox", "values": [{"label": "Global Touches", "value": "Global Touches"}, {"label": "Touch Component", "value": "Touch Component"}], "label": "Target Type"}
//@input bool setTouchBlockingGlobalTouchBlocking = true {"showIf": "setTouchBlockingTargetType", "showIfValue": "Global Touches", "label": "Global Touch Blocking"}
//@input Component.TouchComponent setTouchBlockingTouchComponent {"showIf": "setTouchBlockingTargetType", "showIfValue": "Touch Component", "label": "Touch Component"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Touch Blocking Exceptions", "widget": "group_start"}
//@input bool setTouchBlockingTouchTypeTouch {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Touch"}
//@input bool setTouchBlockingTouchTypeTap {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Tap"}
//@input bool setTouchBlockingTouchTypeDoubleTap {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "DoubleTap"}
//@input bool setTouchBlockingTouchTypeScale {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Scale"}
//@input bool setTouchBlockingTouchTypePan {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Pan"}
//@input bool setTouchBlockingTouchTypeSwipe {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Swipe"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_end"}
//@input int showHintHint = 0 {"showIf": "responseType", "showIfValue": "showHint", "widget": "combobox", "values": [{"label": "Aim camera at the sky", "value": 0}, {"label": "Blow a kiss", "value": 1}, {"label": "Blow a kiss voice changer", "value": 2}, {"label": "Come closer", "value": 3}, {"label": "Do not smile", "value": 4}, {"label": "Do not try with a friend", "value": 5}, {"label": "Draw with your finger", "value": 6}, {"label": "Find face", "value": 7}, {"label": "Find image", "value": 8}, {"label": "Find marker", "value": 9}, {"label": "Find snapcode", "value": 10}, {"label": "Kiss", "value": 11}, {"label": "Kiss again", "value": 12}, {"label": "Look around", "value": 13}, {"label": "Look down", "value": 14}, {"label": "Look left", "value": 15}, {"label": "Look right", "value": 16}, {"label": "Look up", "value": 17}, {"label": "Make some noise!", "value": 18}, {"label": "Move your head", "value": 19}, {"label": "Nod your head", "value": 20}, {"label": "Now kiss", "value": 21}, {"label": "Now open your mouth", "value": 22}, {"label": "Now raise your eyebrows", "value": 23}, {"label": "Now smile", "value": 24}, {"label": "Open your mouth", "value": 25}, {"label": "Open your mouth again", "value": 26}, {"label": "Open your mouth voice changer", "value": 27}, {"label": "Pick a face", "value": 28}, {"label": "Pick a photo", "value": 29}, {"label": "Pick an image", "value": 30}, {"label": "Raise your eyebrows", "value": 31}, {"label": "Raise your eyebrows again", "value": 32}, {"label": "Raise your eyebrows or open your mouth", "value": 33}, {"label": "Raise your eyebrows voice changer", "value": 34}, {"label": "Rotate your phone", "value": 35}, {"label": "Say something", "value": 36}, {"label": "Smile", "value": 37}, {"label": "Smile again", "value": 38}, {"label": "Smile voice changer", "value": 39}, {"label": "Swap camera", "value": 40}, {"label": "Tap a surface", "value": 41}, {"label": "Tap ground to place", "value": 42}, {"label": "Tap surface to place", "value": 43}, {"label": "Tap the ground", "value": 44}, {"label": "Tap!", "value": 45}, {"label": "Tilt your head", "value": 46}, {"label": "Try it with a friend", "value": 47}, {"label": "Try it with your rear camera", "value": 48}, {"label": "Turn around", "value": 49}, {"label": "Voice changer", "value": 50}, {"label": "Walk through the door", "value": 51}], "label": "Hint"}
//@input float showHintDuration = 2.0 {"showIf": "responseType", "showIfValue": "showHint", "label": "Duration"}
//@input Component.MLComponent runMLMlComponent {"showIf": "responseType", "showIfValue": "machineLearning", "label": "ML Component"}
//@input string runMLAction = "Run Immediate" {"showIf": "responseType", "showIfValue": "machineLearning", "widget": "combobox", "values": [{"label": "Build", "value": "Build"}, {"label": "Run Immediate", "value": "Run Immediate"}, {"label": "Run Scheduled", "value": "Run Scheduled"}, {"label": "Cancel", "value": "Cancel"}, {"label": "Stop", "value": "Stop"}], "label": "Action"}
//@ui {"showIf": "responseType", "showIfValue": "machineLearning", "label": "Options", "widget": "group_start"}
//@input bool runMLSync {"showIf": "runMLAction", "showIfValue": "Run Immediate", "label": "Sync"}
//@input bool runMLRecurring {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "label": "Recurring"}
//@input int runMLStartTiming = 2 {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "widget": "combobox", "values": [{"label": "None", "value": 1}, {"label": "Update", "value": 2}, {"label": "Late Update", "value": 3}, {"label": "On Render", "value": 4}], "label": "Start Timing"}
//@input int runMLEndTiming = 4 {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "widget": "combobox", "values": [{"label": "None", "value": 1}, {"label": "Update", "value": 2}, {"label": "Late Update", "value": 3}, {"label": "On Render", "value": 4}], "label": "End Timing"}
//@ui {"showIf": "responseType", "showIfValue": "machineLearning", "widget": "group_end"}
//@input Asset.ObjectPrefab instantiatePrefabPrefab {"showIf": "responseType", "showIfValue": "instantiatePrefab", "label": "Prefab"}
//@input SceneObject instantiatePrefabParent {"showIf": "responseType", "showIfValue": "instantiatePrefab", "label": "Parent"}
//@input SceneObject destroyObjectObject {"showIf": "responseType", "showIfValue": "destroyObject", "label": "Object"}
//@input string printMessageText {"showIf": "responseType", "showIfValue": "printMessage", "label": "Message"}
//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "label": "Target", "widget": "group_start"}
//@input string callScriptAPITargetType = "Component" {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "combobox", "values": [{"label": "SceneObject", "value": "SceneObject"}, {"label": "Script or Component", "value": "Component"}, {"label": "Script.api (Deprecated)", "value": "Script API"}, {"label": "Global API", "value": "Global API"}], "label": "Target Type"}
//@input SceneObject callScriptAPISceneObject {"showIf": "callScriptAPITargetType", "showIfValue": "SceneObject", "label": "Scene Object"}
//@input Component callScriptAPIComponent {"showIf": "callScriptAPITargetType", "showIfValue": "Component", "label": "Component"}
//@input Component.ScriptComponent callScriptAPIScriptComponent {"showIf": "callScriptAPITargetType", "showIfValue": "Script API", "label": "Script Component"}
//@input int callScriptAPICallType = 0 {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "combobox", "values": [{"label": "Call Function", "value": 0}, {"label": "Set Property", "value": 1}], "label": "Call Type"}
//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "label": "Settings", "widget": "group_start"}
//@input string callScriptAPIFunctionName {"showIf": "callScriptAPICallType", "showIfValue": 0, "label": "Function Name"}
//@input string callScriptAPIPropertyName {"showIf": "callScriptAPICallType", "showIfValue": 1, "label": "Property Name"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "label": "Argument 1", "widget": "group_start"}
//@input string callScriptAPI_arg1ValueType = "None" {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "combobox", "values": [{"label": "None", "value": "None"}, {"label": "bool", "value": "bool"}, {"label": "int", "value": "int"}, {"label": "float", "value": "float"}, {"label": "string", "value": "string"}, {"label": "Color (RGB)", "value": "Color (RGB)"}, {"label": "Color (RGBA)", "value": "Color (RGBA)"}, {"label": "vec2", "value": "vec2"}, {"label": "vec3", "value": "vec3"}, {"label": "vec4", "value": "vec4"}, {"label": "quat", "value": "quat"}, {"label": "SceneObject", "value": "SceneObject"}, {"label": "Asset", "value": "Asset"}, {"label": "Texture", "value": "Texture"}, {"label": "Component", "value": "Component"}, {"label": "bool Array", "value": "bool Array"}, {"label": "int Array", "value": "int Array"}, {"label": "float Array", "value": "float Array"}, {"label": "string Array", "value": "string Array"}, {"label": "vec2 Array", "value": "vec2 Array"}, {"label": "vec3 Array", "value": "vec3 Array"}, {"label": "vec4 Array", "value": "vec4 Array"}, {"label": "quat Array", "value": "quat Array"}, {"label": "SceneObject Array", "value": "SceneObject Array"}, {"label": "Asset Array", "value": "Asset Array"}, {"label": "Texture Array", "value": "Texture Array"}, {"label": "Component Array", "value": "Component Array"}], "label": "Value Type"}
//@input bool callScriptAPI_arg1BoolValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_arg1IntValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_arg1FloatValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_arg1StringValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_arg1ColorRGBValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_arg1ColorRGBAValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_arg1Vec2Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_arg1Vec3Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_arg1Vec4Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input quat callScriptAPI_arg1QuatValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "quat", "label": "Quat Value"}
//@input SceneObject callScriptAPI_arg1SceneObjectValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_arg1AssetValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_arg1TextureValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_arg1ComponentValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_arg1BoolArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_arg1IntArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_arg1FloatArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_arg1StringArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_arg1Vec2ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_arg1Vec3ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_arg1Vec4ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input quat[] callScriptAPI_arg1QuatArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "quat Array", "label": "Quat Array Value"}
//@input SceneObject[] callScriptAPI_arg1SceneObjectArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_arg1AssetArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_arg1TextureArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_arg1ComponentArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_end"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "label": "Argument 2", "widget": "group_start"}
//@input string callScriptAPI_arg2ValueType = "None" {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "combobox", "values": [{"label": "None", "value": "None"}, {"label": "bool", "value": "bool"}, {"label": "int", "value": "int"}, {"label": "float", "value": "float"}, {"label": "string", "value": "string"}, {"label": "Color (RGB)", "value": "Color (RGB)"}, {"label": "Color (RGBA)", "value": "Color (RGBA)"}, {"label": "vec2", "value": "vec2"}, {"label": "vec3", "value": "vec3"}, {"label": "vec4", "value": "vec4"}, {"label": "quat", "value": "quat"}, {"label": "SceneObject", "value": "SceneObject"}, {"label": "Asset", "value": "Asset"}, {"label": "Texture", "value": "Texture"}, {"label": "Component", "value": "Component"}, {"label": "bool Array", "value": "bool Array"}, {"label": "int Array", "value": "int Array"}, {"label": "float Array", "value": "float Array"}, {"label": "string Array", "value": "string Array"}, {"label": "vec2 Array", "value": "vec2 Array"}, {"label": "vec3 Array", "value": "vec3 Array"}, {"label": "vec4 Array", "value": "vec4 Array"}, {"label": "quat Array", "value": "quat Array"}, {"label": "SceneObject Array", "value": "SceneObject Array"}, {"label": "Asset Array", "value": "Asset Array"}, {"label": "Texture Array", "value": "Texture Array"}, {"label": "Component Array", "value": "Component Array"}], "label": "Value Type"}
//@input bool callScriptAPI_arg2BoolValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_arg2IntValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_arg2FloatValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_arg2StringValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_arg2ColorRGBValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_arg2ColorRGBAValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_arg2Vec2Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_arg2Vec3Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_arg2Vec4Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input quat callScriptAPI_arg2QuatValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "quat", "label": "Quat Value"}
//@input SceneObject callScriptAPI_arg2SceneObjectValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_arg2AssetValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_arg2TextureValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_arg2ComponentValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_arg2BoolArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_arg2IntArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_arg2FloatArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_arg2StringArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_arg2Vec2ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_arg2Vec3ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_arg2Vec4ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input quat[] callScriptAPI_arg2QuatArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "quat Array", "label": "Quat Array Value"}
//@input SceneObject[] callScriptAPI_arg2SceneObjectArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_arg2AssetArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_arg2TextureArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_arg2ComponentArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_end"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 1, "label": "Value", "widget": "group_start"}
//@input string callScriptAPI_valueValueType = "float" {"showIf": "callScriptAPICallType", "showIfValue": 1, "widget": "combobox", "values": [{"label": "None", "value": "None"}, {"label": "bool", "value": "bool"}, {"label": "int", "value": "int"}, {"label": "float", "value": "float"}, {"label": "string", "value": "string"}, {"label": "Color (RGB)", "value": "Color (RGB)"}, {"label": "Color (RGBA)", "value": "Color (RGBA)"}, {"label": "vec2", "value": "vec2"}, {"label": "vec3", "value": "vec3"}, {"label": "vec4", "value": "vec4"}, {"label": "quat", "value": "quat"}, {"label": "SceneObject", "value": "SceneObject"}, {"label": "Asset", "value": "Asset"}, {"label": "Texture", "value": "Texture"}, {"label": "Component", "value": "Component"}, {"label": "bool Array", "value": "bool Array"}, {"label": "int Array", "value": "int Array"}, {"label": "float Array", "value": "float Array"}, {"label": "string Array", "value": "string Array"}, {"label": "vec2 Array", "value": "vec2 Array"}, {"label": "vec3 Array", "value": "vec3 Array"}, {"label": "vec4 Array", "value": "vec4 Array"}, {"label": "quat Array", "value": "quat Array"}, {"label": "SceneObject Array", "value": "SceneObject Array"}, {"label": "Asset Array", "value": "Asset Array"}, {"label": "Texture Array", "value": "Texture Array"}, {"label": "Component Array", "value": "Component Array"}], "label": "Value Type"}
//@input bool callScriptAPI_valueBoolValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_valueIntValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_valueFloatValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_valueStringValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_valueColorRGBValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_valueColorRGBAValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_valueVec2Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_valueVec3Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_valueVec4Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input quat callScriptAPI_valueQuatValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "quat", "label": "Quat Value"}
//@input SceneObject callScriptAPI_valueSceneObjectValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_valueAssetValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_valueTextureValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_valueComponentValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_valueBoolArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_valueIntArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_valueFloatArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_valueStringArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_valueVec2ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_valueVec3ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_valueVec4ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input quat[] callScriptAPI_valueQuatArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "quat Array", "label": "Quat Array Value"}
//@input SceneObject[] callScriptAPI_valueSceneObjectArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_valueAssetArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_valueTextureArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_valueComponentArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 1, "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "label": "Options", "widget": "group_start"}
//@input string sendCustomTriggerTriggerName {"showIf": "sendCustomTriggerUseList", "showIfValue": false, "label": "Trigger Name"}
//@input string[] sendCustomTriggerTriggerNames {"showIf": "sendCustomTriggerUseList", "showIfValue": true, "label": "Trigger Names"}
//@input bool sendCustomTriggerUseList {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "label": "Next In List"}
//@input bool sendCustomTriggerLoopAfterEnd = true {"showIf": "sendCustomTriggerUseList", "showIfValue": true, "label": "Loop After End"}
//@ui {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "widget": "group_end"}
//@input Physics.BodyComponent physicsApplyForceBody {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Body"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Settings", "widget": "group_start"}
//@input string physicsApplyForceForceType = "Position" {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "combobox", "values": [{"label": "Position", "value": "Position"}, {"label": "Rotation", "value": "Rotation"}], "label": "Force Type"}
//@input string physicsApplyForceMode = "Impulse" {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "combobox", "values": [{"label": "Force - Continuous force (kg*cm/s^2)", "value": "Force"}, {"label": "Acceleration - Continuous acceleration (cm/s^2), applied without respect to mass", "value": "Acceleration"}, {"label": "Impulse - Instantaneous force impulse (kg*cm/s)", "value": "Impulse"}, {"label": "Velocity Change - Instantaneous change in velocity (cm/s), applied without respect to mass", "value": "VelocityChange"}, {"label": "Set Velocity - Instantaneous overwrite of velocity (cm/s), applied without respect to mass", "value": "Set Velocity"}], "label": "Mode"}
//@ui {"showIf": "physicsApplyForceMode", "showIfValue": "Force", "label": "Tip", "widget": "group_start"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Use \"Force\" for a continuous force that you will<br>continue applying over time. Examples: a rocket<br>booster triggered every Update, or a wind force<br>triggered by OnCollisionStay.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@ui {"showIf": "physicsApplyForceMode", "showIfValue": "Acceleration", "label": "Tip", "widget": "group_start"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Use \"Acceleration\" for a continuous acceleration<br>that you will continue applying over time,<br>ignoring mass. Examples: a rocket booster<br>triggered every Update, or a custom gravity<br>force triggered by OnCollisionStay.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@ui {"showIf": "physicsApplyForceMode", "showIfValue": "Impulse", "label": "Tip", "widget": "group_start"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Use \"Impulse\" for an instant force that will be<br>applied immediately. Examples: pushing an object<br>away on TapEvent, or making an object \"jump\"<br>upwards triggered by OnCollisionEnter.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@ui {"showIf": "physicsApplyForceMode", "showIfValue": "VelocityChange", "label": "Tip", "widget": "group_start"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Use \"Velocity Change\" for an instant addition of<br>velocity that will be applied immediately,<br>ignoring mass. Examples: pushing an object away<br>on TapEvent, or making an object \"jump\" upwards<br>triggered by OnCollisionEnter.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@ui {"showIf": "physicsApplyForceMode", "showIfValue": "Set Velocity", "label": "Tip", "widget": "group_start"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Use \"Set Velocity\" for an instant overwrite of<br>velocity that will be applied immediately.<br>Examples: stopping an object by setting velocity<br>to (0,0,0), or making an object \"jump\" upward<br>while cancelling any existing velocity.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@input vec3 physicsApplyForceForceValue {"showIf": "responseType", "showIfValue": "physicsApplyForce", "label": "Force Value"}
//@input string physicsApplyForceSpace = "World" {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "combobox", "values": [{"label": "World", "value": "World"}, {"label": "Local to Object (defaults to Body)", "value": "Local to Object"}], "label": "Space"}
//@input SceneObject physicsApplyForceObjectSpace {"showIf": "physicsApplyForceSpace", "showIfValue": "Local to Object", "label": "Object Space"}
//@ui {"showIf": "responseType", "showIfValue": "physicsApplyForce", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Set Blendshapes (Legacy) is Deprecated.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Please use Set Blendshapes instead.", "widget": "label"}
//@input Component.BlendShapes setBlendshapesBlendshapes {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Blendshapes"}
//@input string setBlendshapesName {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Name"}
//@input float setBlendshapesWeight = 0 {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Weight"}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "label": "Animate Sprite is Deprecated.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "label": "Please use Animate Image instead.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "label": "Set Billboard Position is Deprecated.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "label": "Please use Set Screen Position instead.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "label": "Set Billboard Rotation is Deprecated.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "label": "Please use Set Screen Rotation instead.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "label": "<font color='orange'>WARNING:</font>", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "label": "Set Billboard Size is Deprecated.", "widget": "label"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "label": "Please use Set Screen Size instead.", "widget": "label"}
//@ui {"widget": "group_end"}
script.createEvent("OnStartEvent").bind(function() { require("Behavior_wrapped")(script)})