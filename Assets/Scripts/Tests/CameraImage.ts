@component
export class CameraImage extends BaseScriptComponent {
    private cameraModule = require("LensStudio:CameraModule") as any
    
    @input
    publicImage: Image

    captureFrame() {
        print("capturing frame")
        //@ts-ignore
        const request = CameraModule.createCameraRequest()
        //@ts-ignore
        request.cameraId = CameraModule.CameraId.Default_Color
        request.imageSmallerDimension = 756

        const cameraTexture = this.cameraModule.requestCamera(request)
        const provider = cameraTexture.control as CameraTextureProvider
        //@ts-ignore
        const eventRegistration = provider.onNewFrame.add(() => {
            //@ts-ignore
            provider.onNewFrame.remove(eventRegistration)

            const width = cameraTexture.getWidth() // 1008
            const height = cameraTexture.getHeight() // 756
            const readableTexture = ProceduralTextureProvider.createFromTexture(cameraTexture)
            const readableProvider = readableTexture.control as ProceduralTextureProvider
            const data = new Uint8Array(width * height * 4)
            readableProvider.getPixels(0, 0, width, height, data)
            this.encodeImage(data, width, height)

            // const imageComponent = this.sceneObject.getComponent("Image")
            const imageComponent = this.publicImage
            imageComponent.enabled = true
            imageComponent.mainPass.baseTex = readableTexture
        })
    }

    encodeImage(data: Uint8Array, width: number, height: number) {
        print(`encodeImage: ${data.length} bytes`)
        //const str = arrayToBase64(data)
        //print("encoded string length: " + str.length)
        //print(str.substring(0, 1000))
    }
}