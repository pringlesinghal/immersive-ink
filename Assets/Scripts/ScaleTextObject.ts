@component
export class ScaleTextObject extends BaseScriptComponent {

    @input
    objectWithTweens: SceneObject

    onAwake() {

    }

    tryScaleDown() {
        print("Hello world")

        //@ts-ignore
        global.tweenManager.startTween(this.objectWithTweens, 'box_move');
    }
}
