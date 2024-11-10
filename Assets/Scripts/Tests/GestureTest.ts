import { SIK } from '../../SpectaclesInteractionKit/SIK';
import { InteractorInputType } from '../../SpectaclesInteractionKit/Core/Interactor/Interactor';

@component
export class GestureTest extends BaseScriptComponent {

    private pinchStarted: boolean = false;
    private numFramesSincePinched: number = 0;

    onAwake() {
        this.createEvent('OnStartEvent').bind(() => {
            this.onStart();
        });
    }

    onStart() {
        // Retrieve HandInputData from SIK's definitions.
        let handInputData = SIK.HandInputData;
    
        // Fetch the TrackedHand for left and right hands.
        let leftHand = handInputData.getHand('left');
        let rightHand = handInputData.getHand('right');
    
        // Add print callbacks for whenever these hands pinch.
        leftHand.onPinchDown.add(() => {
            /*
            print(
                `The left hand has pinched. The tip of the left index finger is: ${leftHand.indexTip.position}.`
            );
            */

            this.pinchStarted = true;
        });
        rightHand.onPinchDown.add(() => {
            /*
            print(
                `The right hand has pinched. The tip of the right index finger is: ${rightHand.indexTip.position}.`
            );
            */

            this.pinchStarted = true;
        });
    }

    onUpdate() {
        // Retrieve InteractionManager from SIK's definitions.
        let interactionManager = SIK.InteractionManager;

        // Assuming 60 frames per second.
        if (this.pinchStarted) {
            this.numFramesSincePinched += 1;
        }

        // Fetch the HandInteractor for left and right hands.
        let leftHandInteractor = interactionManager.getInteractorsByType(
            InteractorInputType.LeftHand
        )[0];
        let rightHandInteractor = interactionManager.getInteractorsByType(
            InteractorInputType.RightHand
        )[0];

        // Print the position and direction of the HandInteractors each frame.
        // print(`The left hand interactor is at position: ${leftHandInteractor.startPoint} and is pointing in direction: ${leftHandInteractor.direction}.`);
        // print(`The right hand interactor is at position: ${rightHandInteractor.startPoint} and is pointing in direction: ${rightHandInteractor.direction}.`);
    }
}
