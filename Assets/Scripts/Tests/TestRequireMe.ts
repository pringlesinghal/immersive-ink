import { RequireMe } from './RequireMe';

@component
export class TestRequireMe extends BaseScriptComponent {
    @input
    objectWithRequireMe: SceneObject;
    
    onAwake() {
        let requireMe = this.objectWithRequireMe.getComponent(
            RequireMe.getTypeName()
        );
        let createdRequireMe = this.objectWithRequireMe.createComponent(
            RequireMe.getTypeName()
        );
            
        print(requireMe.getValue());
        print(requireMe.someDefaultInput2);
        print(requireMe.someNumericInput);
    }
}