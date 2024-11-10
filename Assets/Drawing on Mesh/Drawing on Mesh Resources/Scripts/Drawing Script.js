// -----JS CODE-----

//@input Component.Camera camera;

//@input Asset.Texture cameraTex;

//@input Asset.Texture renderTarget;


// Replace With Mesh of your choice
//@input Component.RenderMeshVisual meshVis;

//@input SceneObject DrawingObjects;

//@input float drawingSize = 0.03 {"widget": "slider", "min": 0.001, "max": 1, "step": 0.001};

//@input Asset.Texture customizeTexture;

var rayStart;
var rayEnd;

// Create a probe to raycast through all worlds.
var probe = Physics.createGlobalProbe();

var vertexPosition = [];

var drawingObjects;

var prevPointCoord = new vec2(0, 0);

var startedTouch = false;

var pointCoordThe = new vec2(0, 0);

var pointCoordX, pointCoordY;

var aspectRatio;

var brushSize = script.drawingSize;

var visible = false;


// Set some properties on it.
/*probe.debugDrawEnabled = true;*/
probe.filter.includeStatic = true;
probe.filter.includeDynamic = false;
probe.filter.includeIntangible = true;

// Getting info to know how to draw;
function getMeshDataAndOtherInitialStuff(eventData) {
    aspectRatio = script.cameraTex.getHeight() / script.cameraTex.getWidth();

    global.touchSystem.touchBlocking = true;
    drawingObjects = script.DrawingObjects.children;

    drawingObjects.forEach(current => {
        current.getComponent("Component.Image").getMaterial(0).mainPass.baseTex = script.customizeTexture;
    });

    // Creating collider dynamically for Object With 
    // RenderMeshVisual for raycast to have something 
    // to interact with

    script.meshVis.getSceneObject().createComponent("Physics.ColliderComponent");
    var meshShape = Shape.createMeshShape();
    meshShape.mesh = script.meshVis.mesh;

    script.meshVis.getSceneObject().getComponent("Physics.ColliderComponent").shape = meshShape;
    var vertexPosition2D = script.meshVis.mesh.extractVerticesForAttribute("texture0");
    var numberOf2DCoordinates = vertexPosition2D.length;

    // Creating array of UV map vertices
    for (var i = 0; i < numberOf2DCoordinates / 2; i++) {
        vertexPosition.push(new vec2(vertexPosition2D[i * 2], vertexPosition2D[i * 2 + 1]));
    }

}

function drawFunction(eventData) {

    /* Since Update Event Occurs Once every frame and
       TouchMove Event each time Movement is detected possibly
       happening much more often than update function, but to
       actually have something visible on screen we need to see
       what's happening with this approach each frame, this function
       is connected to update one
        
       How does the drawing work? Detecting current point and using
       previous one used for drawing and then filling the space with
       our drawing objects in-between (using planes, which you can
       change as well located in Drawing Objects Camera),
       by using Lerp Function to evenly distribute them,
        
       By using Update function for this instead of something
       that would keep drawing distances too small and so often,
       that once update or rendering of Frame is reached, all the
       interpolations done thus far wouldn't be seen, since same
       planes are constantly being reused (meaning if
       between frames 7 drawings are done, first 6 would once
       frame is reached seem like they were skipped) to have 
       things under control performance wise
        */
    if (startedTouch) {
        if (prevPointCoord.distance(pointCoordThe) < 0.4) {
            for (var t = 0; t < 30; t++) {
                var lerpValue = vec2.lerp(prevPointCoord, pointCoordThe, t / 29);
                drawingObjects[t].getComponent("Component.ScreenTransform").anchors = Rect.create(lerpValue.x, lerpValue.x + brushSize * aspectRatio, lerpValue.y, lerpValue.y + brushSize);
            };

            prevPointCoord = new vec2(pointCoordX * (2 - brushSize) - 1, pointCoordY * (2 - brushSize) - 1);
        }
        else {
            prevPointCoord = new vec2(pointCoordX * (2 - brushSize) - 1, pointCoordY * (2 - brushSize) - 1);
        };
        if (!visible) {
            script.DrawingObjects.enabled = true;
        }
    }

}

function onTouchAndMoving(eventData) {
    var rayStart1 = eventData.getTouchPosition();

    //-500 and 200 might have to be adjusted based on your
    // obects position
    rayStart = script.camera.screenSpaceToWorldSpace(rayStart1, -500);
    rayEnd = script.camera.screenSpaceToWorldSpace(rayStart1, 200);

    // Find the first hit.
    probe.rayCast(rayStart, rayEnd, function (hit) {

        if (hit === null) {
            return;
        }

        // Triangle hit information, available when a ray cast intersects a collision mesh.
        var tri = hit.triangle;
        if (tri) {
            /* Finding exact point where mesh contains raycast 
            point by finding it in triangle given in 
            tri variable*/

            pointCoordX = tri.barycentricCoordinate.x * vertexPosition[tri.vertexIndices[0]].x +
                tri.barycentricCoordinate.y * vertexPosition[tri.vertexIndices[1]].x +
                tri.barycentricCoordinate.z * vertexPosition[tri.vertexIndices[2]].x;

            pointCoordY = tri.barycentricCoordinate.x * vertexPosition[tri.vertexIndices[0]].y +
                tri.barycentricCoordinate.y * vertexPosition[tri.vertexIndices[1]].y +
                tri.barycentricCoordinate.z * vertexPosition[tri.vertexIndices[2]].y;

            // Updating new position on UV map with applying
            // textures scale as well, meaning Render Targets here
            pointCoordThe = new vec2(pointCoordX * (2 - brushSize) - 1, pointCoordY * (2 - brushSize) - 1);

            if (!startedTouch) {
                prevPointCoord = new vec2(pointCoordX * (2 - brushSize) - 1, pointCoordY * (2 - brushSize) - 1);
                startedTouch = true;

            }
        };

        // Skip remaining hits past a certain distance.
        if (hit.distance > 150.0) {
            hit.skipRemaining = true;
        }
    });
}

function booleanSet(eventData) {
    startedTouch = false;
}



function lerpVec3(a, b, t) {
    // Perform linear interpolation between vectors a and b
    return new vec3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
}


script.createEvent("OnStartEvent").bind(getMeshDataAndOtherInitialStuff);
script.createEvent("TouchStartEvent").bind(booleanSet)
script.createEvent("TouchMoveEvent").bind(onTouchAndMoving);
script.createEvent("UpdateEvent").bind(drawFunction);