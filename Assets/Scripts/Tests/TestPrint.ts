// import { Interactable } from 'SpectaclesInteractionKit/Interaction/Interactable/Interactable';

@component
export class TestPrint extends BaseScriptComponent {
    
    // @input
    // interactable: Interactable;
    
    onAwake() {
        print("Hello world test.");
    }
    
    testFunction() {
        print("Test function call.");
    }
}
