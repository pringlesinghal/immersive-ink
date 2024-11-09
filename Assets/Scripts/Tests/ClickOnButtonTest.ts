import { Interactable } from '../../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable';

@component
export class ClickOnButtonTest extends BaseScriptComponent {
    
    // private cameraModule = require('LensStudio:CameraModule') as CameraModule;    
    private cameraModule = require("LensStudio:CameraModule") as any;
    
    @input
    interactable: Interactable;
    
    toggleCameraAccess: Boolean = false;

    @input
    publicImage: Image
    
    onAwake() {
        this.testCameraFrame();
    }
    
    testCameraFrame() {
        this.interactable.onTriggerEnd.add(() => {
            try {
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
