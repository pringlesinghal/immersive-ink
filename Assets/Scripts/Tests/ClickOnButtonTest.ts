import { TextToObject } from 'Scripts/TextToObject';
import { Interactable } from '../../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable';
import { OCRTypeScript } from 'Scripts/OCRTypeScript';
import { setTimeout } from "SpectaclesInteractionKit/Utils/debounce";

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

    /*
    @input
    testMaterial: Material
    */
    
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
                imageComponent.mainPass.baseTex = readableTexture
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
                        var question = "Give me one noun that summarizes this text in singular form: " + summaryOCR;

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
                                const mainAnswer = response.choices[0].message.content;

                                print("ChatGPT Answer: ");
                                print(mainAnswer);

                                // Create the model
                                this.textToObject.triggerOnTap(mainAnswer);

                                this.restoreUpdateTracking();
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
 
    encodeImage(data: Uint8Array, width: number, height: number) {
        print(`encodeImage: ${data.length} bytes`)
        print("Success")
        //const str = arrayToBase64(data)
        //print("encoded string length: " + str.length)
        //print(str.substring(0, 1000))
    }
}
