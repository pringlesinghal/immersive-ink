import { TextToObject } from 'Scripts/TextToObject';
import { Interactable } from '../../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable';
import { OCRTypeScript } from 'Scripts/OCRTypeScript';
import { setTimeout } from "SpectaclesInteractionKit/Utils/debounce";
import { PlaceInFrontCamera } from 'Scripts/PlaceInFrontCamera';
import { MoveRandomDirections } from 'Scripts/MoveRandomDirections';
import { ScaleOnce } from '../ScaleOnce';
import { AudioPlayScript } from 'Scripts/AudioPlayScript';

@component
export class ClickOnButtonTest extends BaseScriptComponent {
    
    // private cameraModule = require('LensStudio:CameraModule') as CameraModule;    
    private cameraModule = require("LensStudio:CameraModule") as any;

    @input
    ocrController: OCRTypeScript;
    
    @input
    interactable: Interactable;
    
    toggleCameraAccess: Boolean = false;

    @input
    publicImage: Image

    @input
    textToObject: TextToObject

    // private renderTarget = require("LensStudio:RenderTarget") as any;

    startTracking: Boolean = true;

    @input
    textHolder: SceneObject
    @input
    textThreeD: Text3D

    @input
    placeInFrontCamera: PlaceInFrontCamera

    @input
    moveRandomDirections: MoveRandomDirections

    @input
    scaleOnce: ScaleOnce

    @input
    seaTurtleAudio: AudioPlayScript
    @input
    dolphinAudio: AudioPlayScript
    @input
    blackRhinoAudio: AudioPlayScript
    @input
    asianElephantAudio: AudioPlayScript
    @input
    monarchButterflyAudio: AudioPlayScript
    @input
    octopusAudio: AudioPlayScript

    // EFFECTS ARE HERE
    @input
    seaTurtlesInteractiveBubbles: SceneObject
    @input
    butterflyGlobe: SceneObject
    @input
    butterflyParticles: SceneObject
    @input
    dolphinTrailSpiral: SceneObject
    @input
    octopusBubble: SceneObject
    @input
    rhinoBoidsElephant: SceneObject

    @input
    camera: Camera

    @input
    buttonMesh: RenderMeshVisual;
    @input
    buttonInteractable: Interactable;
    @input
    readText: Text3D

    /*
    @input
    testMaterial: Material
    */

    placeSpecificInFrontCamera(sceneObject: SceneObject) {
        print("Place")
        
        var cameraTransform = this.camera.getTransform();
        var myTransform = sceneObject.getTransform();        
        
        // var forward = cameraTransform.forward;

        // Get forward direction and apply uniform scaling for a base distance from the camera
        var forward = cameraTransform.forward.uniformScale(50);

        // Generate random offsets
        const leftRightOffset = (Math.random() * 2 - 1) * 50; // Random offset between -10 and 10 on the left-right axis
        const forwardVariance = (Math.random() * 5);          // Random variance between 0 and 5 in the forward direction

        // Get the camera's right direction (perpendicular to forward and up vectors)
        var right = cameraTransform.right;

        // Calculate the new position with offsets
        var randomPosition = cameraTransform.getWorldPosition()
            .sub(forward)                          // Position 50 units in front of the camera
            .sub(forward.uniformScale(forwardVariance)) // Apply forward variance beyond 50
            .add(right.uniformScale(leftRightOffset));   // Apply left-right offset

        // Set the new position and align the rotation with the camera
        myTransform.setWorldPosition(randomPosition);
        myTransform.setWorldRotation(cameraTransform.getWorldRotation());
    }
    
    onAwake() {
        print("Hello world.");
        print("Checking for OCR Controller.");
        print("Huy test");

        this.testCameraFrame();

        /*
        if (!this.ocrController.initialized) {
            print('OCR controller is not initialized yet');
            print('hello')
            return;
        }
        */

        // this.testCameraEachFrame();
        // this.delayTestCamera();
        this.testCameraEachFrame();
    }

    delay = async (ms: number) => {
        return new Promise(resolve => setTimeout(() => {resolve(true)}, ms));
    };

    async testCameraEachFrame() {
        while(this.startTracking) {
            await this.delay(100);

            //@ts-ignore
            let cameraRequest = CameraModule.createCameraRequest();
            // print("Success1");
            //@ts-ignore
            cameraRequest.id = CameraModule.CameraId.Left_Color;

            let cameraTexture = this.cameraModule.requestCamera(cameraRequest);
            const provider = cameraTexture.control as CameraTextureProvider

            //@ts-ignore
            let eventRegistration = provider.onNewFrame.add(() => {
                //@ts-ignore
                // provider.onNewFrame.remove(eventRegistration)

                // const width = cameraTexture.getWidth() // 1008
                // const height = cameraTexture.getHeight() // 756
                const readableTexture = ProceduralTextureProvider.createFromTexture(cameraTexture)
                // const readableProvider = readableTexture.control as ProceduralTextureProvider
                // const data = new Uint8Array(width * height * 4)
                // readableProvider.getPixels(0, 0, width, height, data)

                // this.encodeImage(data, width, height)

                const imageComponent = this.publicImage
                imageComponent.enabled = true
                if (imageComponent.mainPass != null)
                {
                    imageComponent.mainPass.baseTex = readableTexture
                }
            })

            //@ts-ignore
            const stop = provider.onNewFrame.add(() => {
                //@ts-ignore
                provider.onNewFrame.remove(eventRegistration);
            })
        }
    }

    async restoreUpdateTracking() {
        print("Restoring update tracking...");
        await this.delay(5000);
        this.startTracking = true;
        this.testCameraEachFrame();
        print("Restored start tracking -> true.")
    }
    
    testCameraFrame() {

        this.interactable.onTriggerEnd.add(() => {
            try {
                this.startTracking = false;

                print("Test hello world on click button1.");
                print("Trying to request Camera Access");
        
                print("Test request camera access.");
                print("Success0");
                
                print("Camera Module contains: ");
                
                //@ts-ignore
                let cameraRequest = CameraModule.createCameraRequest();
                print("Success1");
                //@ts-ignore
                cameraRequest.id = CameraModule.CameraId.Left_Color;
                
                print("Success2");
                let cameraTexture = this.cameraModule.requestCamera(cameraRequest);
                const provider = cameraTexture.control as CameraTextureProvider

                //@ts-ignore
                let eventRegistration = provider.onNewFrame.add(() => {
                    //@ts-ignore
                    provider.onNewFrame.remove(eventRegistration)

                    const width = cameraTexture.getWidth() // 1008
                    const height = cameraTexture.getHeight() // 756
                    const readableTexture = ProceduralTextureProvider.createFromTexture(cameraTexture)
                    const readableProvider = readableTexture.control as ProceduralTextureProvider
                    const data = new Uint8Array(width * height * 4)
                    readableProvider.getPixels(0, 0, width, height, data)

                    this.encodeImage(data, width, height)

                    const imageComponent = this.publicImage
                    imageComponent.enabled = true
                    imageComponent.mainPass.baseTex = readableTexture

                    if (!this.ocrController.initialized) {
                        print('OCR controller is not initialized yet');
                        print('hello')
                        return;
                    }

                    var zoomFactor = 1.5
                    var offsetX = 0.2
                    var offsetY = 0.1

                    // Create a Render Target
                    /*
                    let renderTarget = new RenderTarget({
                        width: readableTexture.getWidth(),
                        height: readableTexture.getHeight()
                    });
                    */
                   /*
                    var renderTarget = this.renderTarget.create();

                    // Create Material for Texture manipulation
                    this.testMaterial.mainTexture = readableTexture;

                    // Zoom by scaling UVs
                    material.mainTextureScale = new vec2(zoomFactor, zoomFactor); // Set desired zoom factor

                    // Shift by offsetting UVs
                    material.mainTextureOffset = new vec2(offsetX, offsetY); // Set desired offset

                    // Apply material to render target
                    renderTarget.material = material;

                    // Capture to new texture
                    let newTexture = renderTarget.render();
                    */

                    // set input texture to process
                    // for example device texture or an image picker texture
                    this.ocrController.setInputTexture(readableTexture);

                    //get rectangles of detected lines of text
                    let rects = this.ocrController.getDetectionBoxes();
                    //get text
                    let lines = this.ocrController.getDetectedText(rects);

                    let summaryOCR = "";
                    // print results
                    for (var i = 0; i < rects.length; i++) {
                        summaryOCR += lines[i];

                        print(i + '. Text: "' + lines[i] + '"' + ', Detected Rectangle ' + rects[i]);
                    }

                    print("Summary is: ");
                    print(summaryOCR);

                    if (rects.length != 0 && summaryOCR.length > 2) {
                        var question = "Give me one noun that summarizes this text in singular form out of Dolphin, Black Rhino, Asian Elephant, Monarch Butterfly, Octopus, Sea Turtle: " + summaryOCR;

                        // GPT Test:
                        var request = { 
                            "temperature": 0,
                            "messages": [
                                {"role": "user", "content": question}
                            ]
                        };

                        //@ts-ignore
                        global.chatGpt.completions(request, (errorStatus, response) => {
                            if (!errorStatus && typeof response === 'object') {

                                // Place in front of the camera.
                                this.placeInFrontCamera.testPlaceInFrontCamera();

                                const mainAnswer = response.choices[0].message.content;

                                print("ChatGPT Answer: ");
                                print(mainAnswer);                                
                                
                                // Change the text.
                                this.textThreeD.text = mainAnswer;

                                // Create the model
                                this.textToObject.triggerOnTap(mainAnswer);

                                this.moveRandomDirections.getRandomPositionWithinRangeOrigin(2);

                                // Scale
                                this.scaleChange();

                                // Stop audio
                                this.stopAllAudio();
                                this.turnOffAllParticles();

                                let mainAnswerLowerCased = mainAnswer.toLowerCase();

                                if (mainAnswerLowerCased == "Sea Turtle".toLowerCase()) {
                                    // this.seaTurtleAudio.playAudio();
                                    this.delayPlayAudio(this.seaTurtleAudio);

                                    this.seaTurtlesInteractiveBubbles.enabled = true;

                                    // this.placeSpecificInFrontCamera(this.seaTurtlesInteractiveBubbles);
                                }
                                else if (mainAnswerLowerCased == "Dolphin".toLowerCase()) {
                                    // this.dolphinAudio.playAudio();
                                    this.delayPlayAudio(this.dolphinAudio);

                                    this.dolphinTrailSpiral.enabled = true;
                                    this.octopusBubble.enabled = true;

                                    this.placeSpecificInFrontCamera(this.dolphinTrailSpiral);
                                }
                                else if (mainAnswerLowerCased == "Black Rhino".toLowerCase()) {
                                    this.delayPlayAudio(this.blackRhinoAudio);
                                    // this.blackRhinoAudio.playAudio();

                                    this.rhinoBoidsElephant.enabled = true;
                                }
                                else if (mainAnswerLowerCased == "Asian Elephant".toLowerCase()) {
                                    this.delayPlayAudio(this.asianElephantAudio);
                                    // this.asianElephantAudio.playAudio();

                                    this.rhinoBoidsElephant.enabled = true;
                                }
                                else if (mainAnswerLowerCased == "Monarch Butterfly".toLowerCase()) {
                                    this.delayPlayAudio(this.monarchButterflyAudio);
                                    // this.monarchButterflyAudio.playAudio();

                                    this.butterflyParticles.enabled = true;
                                    this.butterflyGlobe.enabled = true;

                                    this.placeSpecificInFrontCamera(this.butterflyParticles);
                                    this.placeSpecificInFrontCamera(this.butterflyGlobe);
                                }
                                else if (mainAnswerLowerCased == "Octopus".toLowerCase()) {
                                    this.delayPlayAudio(this.octopusAudio);
                                    // this.octopusAudio.playAudio();

                                    this.dolphinTrailSpiral.enabled = true;
                                    this.octopusBubble.enabled = true;
                                }

                                this.publicImage.enabled = false;
                                // Moved.
                                // this.restoreUpdateTracking();

                                this.buttonMesh.enabled = false;
                                this.buttonInteractable.enabled = false;
                                this.readText.enabled = false;
                            } else {
                                print(JSON.stringify(response));
                            }
                        });
                    }
                })

                //@ts-ignore
                const stop = provider.onNewFrame.add(() => {
                    //@ts-ignore
                    provider.onNewFrame.remove(eventRegistration);
                })
                
                print("Success3");
                /*
                let onNewFrame = cameraTexture.control.onNewFrame;
                let registration = onNewFrame.add((frame) => {
                    // Process the frame
                    print("Processing camera frame...");
                });
                */
                
                print("Success4");
                
                /*
                if (!toggleCameraAccess) {
                }
                */
            } catch (e) {
                print('Error playing clicking the button: ' + e);
            }
        });
    }

    async delayPlayAudio(audioPlayScript: AudioPlayScript) {
        await this.delay(2000);

        audioPlayScript.playAudio();
    }

    turnOffAllParticles() {
        this.seaTurtlesInteractiveBubbles.enabled = false
        this.butterflyGlobe.enabled = false
        this.butterflyParticles.enabled = false;
        this.dolphinTrailSpiral.enabled = false;
        this.octopusBubble.enabled = false;
        this.rhinoBoidsElephant.enabled = false;
    }

    stopAllAudio() {
        this.seaTurtleAudio.stopAudio();
        this.dolphinAudio.stopAudio();
        this.asianElephantAudio.stopAudio();
        this.monarchButterflyAudio.stopAudio();
        this.blackRhinoAudio.stopAudio();
        this.octopusAudio.stopAudio();
    }

    async scaleChange() {
        this.scaleOnce.startScale = new vec3(0, 0, 0);
        this.scaleOnce.endScale = new vec3(1, 1, 1);

        // Start scaling
        this.scaleOnce.startScaling();

        await this.delay(10000);

        this.scaleOnce.startScale = new vec3(1, 1, 1);
        this.scaleOnce.endScale = new vec3(0, 0, 0);

        // Start scaling
        this.scaleOnce.startScaling();
    }
 
    encodeImage(data: Uint8Array, width: number, height: number) {
        print(`encodeImage: ${data.length} bytes`)
        print("Success")
        //const str = arrayToBase64(data)
        //print("encoded string length: " + str.length)
        //print(str.substring(0, 1000))
    }
}
