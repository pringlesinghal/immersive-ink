@component
export class MoveRandomDirections extends BaseScriptComponent {

    @input
    duration: number = 2000; // 2 seconds

    @input
    startPos: vec3
    @input
    endPos: vec3

    startTime: number

    startLerping: boolean = false

    localOrigin: vec3

    startRotation: quat;
    endRotation: quat;
    
    onAwake() {
        this.startTime = Date.now();

        this.startPos = this.getTransform().getLocalPosition();
        this.localOrigin = this.getTransform().getLocalPosition();
        this.startRotation = this.getTransform().getLocalRotation();

        this.createEvent('UpdateEvent').bind(() => {
            this.onUpdate();
        });
    }

    turnOnLerping() {
        // print("Turning on Lerping.");
        this.startLerping = true;

        this.startTime = Date.now(); // Reset the start time each time lerping begins

        // Set the target rotation to look at the new endPos
        const direction = this.endPos.sub(this.startPos).normalize(); // Calculate direction vector
        this.endRotation = quat.lookAt(direction, vec3.up());
    }
    
    onUpdate() {
        if (this.startLerping) {
            // print("Running on Update function.")
            let currentTime = Date.now();
            let elapsed = currentTime - this.startTime;
            let t = Math.min(elapsed / this.duration, 1); // Normalized time (0 to 1)

            var testTransform: Transform = this.getTransform();

            let xTest = this.lerp(this.startPos.x, this.endPos.x, t);
            let yTest = this.lerp(this.startPos.y, this.endPos.y, t);
            let zTest = this.lerp(this.startPos.z, this.endPos.z, t);

            let newPosition = new vec3(xTest, yTest, zTest)

            // Calculate new position
            testTransform.setLocalPosition(newPosition);

            // Interpolate rotation (slerp for smooth rotation)
            let newRotation = quat.slerp(this.startRotation, this.endRotation, t);
            testTransform.setLocalRotation(newRotation);

            // Check if interpolation is complete
            if (t >= 1) {
                this.startLerping = false;

                this.getRandomPositionWithinRangeOrigin();
            }
        }
    }

    lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t;
    }

    // Function to get a random float between min and max
    getRandomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // Function to generate a random position within -1 to 1 from the origin
    getRandomPositionWithinRange(origin: vec3, range: number = 1): vec3 {
        return new vec3(
            origin.x + this.getRandomInRange(-range, range),
            origin.y + this.getRandomInRange(-range, range),
            origin.z + this.getRandomInRange(-range, range),
        );
    }

    getRandomPositionWithinRangeOrigin(range: number = 1) {
        // print("Get Random position");
        let newX = this.localOrigin.x + this.getRandomInRange(-range, range);
        let newY = this.localOrigin.y + this.getRandomInRange(-range, range);
        let newZ = this.localOrigin.z + this.getRandomInRange(-range, range);

        var testTransform: Transform = this.getTransform();
        this.startPos = testTransform.getLocalPosition();
        this.endPos = new vec3(newX, newY, newZ);

        // Set start rotation
        this.startRotation = testTransform.getLocalRotation();

        // Calculate and set the target rotation towards new end position
        const direction = this.endPos.sub(this.startPos).normalize();
        this.endRotation = quat.lookAt(direction, vec3.up());
        
        this.turnOnLerping();
        // print("Get Random Position end.");
    }
}
