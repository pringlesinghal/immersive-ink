@component
export class PlaceInFrontCamera extends BaseScriptComponent {
    
    @input
    camera: Camera;
    
    onAwake() {

    }
    
    testPlaceInFrontCamera() {
        print("Place")
        
        var cameraTransform = this.camera.getTransform();
        var myTransform = this.getTransform();        
        
        var forward = cameraTransform.forward;
        myTransform.setWorldPosition(cameraTransform.getWorldPosition().sub(forward.uniformScale(50)));

        myTransform.setWorldRotation(cameraTransform.getWorldRotation());
        
    }
}
