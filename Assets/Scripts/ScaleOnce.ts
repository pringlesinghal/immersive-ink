@component
export class ScaleOnce extends BaseScriptComponent {

    @input
    duration: number = 2000; // 2 seconds

    @input
    startScale: vec3 = new vec3(0, 0, 0); // Default start scale of 1
    @input
    endScale: vec3 = new vec3(1, 1, 1); // Target scale

    startTime: number;
    isScaling: boolean = false;

    onAwake() {
        this.startTime = Date.now();

        // Set the initial scale
        this.getTransform().setLocalScale(this.startScale);

        this.createEvent('UpdateEvent').bind(() => {
            this.onUpdate();
        });
    }

    startScaling() {
        print("Starting scaling.");
        this.isScaling = true;
        this.startTime = Date.now(); // Reset the start time each time scaling begins
    }
    
    onUpdate() {
        if (this.isScaling) {
            let currentTime = Date.now();
            let elapsed = currentTime - this.startTime;
            let t = Math.min(elapsed / this.duration, 1); // Normalized time (0 to 1)

            const testTransform: Transform = this.getTransform();

            // Interpolate scale
            let xScale = this.lerp(this.startScale.x, this.endScale.x, t);
            let yScale = this.lerp(this.startScale.y, this.endScale.y, t);
            let zScale = this.lerp(this.startScale.z, this.endScale.z, t);
            let newScale = new vec3(xScale, yScale, zScale);

            testTransform.setLocalScale(newScale);

            // Check if interpolation is complete
            if (t >= 1) {
                this.isScaling = false;
                print("Scaling complete.");
            }
        }
    }

    lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t;
    }
}
