@component
export class OCRTypeScript extends BaseScriptComponent {

    @input
    detectorMLAsset: MLAsset

    @input
    detectorInputTexture: Texture

    @input
    @widget(new SliderWidget(1, 100, 1))
    maxDetections: number = 50

    @input
    @widget(new SliderWidget(0.0, 1.0, 0.01))
    thresholdMask: number = 0.7

    @input
    @widget(new SliderWidget(1.0, 2.0, 0.01))
    unclipRatioLongSide: number = 1

    @input
    @widget(new SliderWidget(1.0, 2.0, 0.01))
    unclipRatioShortSide: number = 1;

    @input
    @widget(new SliderWidget(0, 25, 1))
    minSideThreshold: number = 5;

    @input
    classifierMlAsset: MLAsset;

    @input
    cropTexture: Texture;

    @input
    @widget(new SliderWidget(0.0, 1.0, 0.01))
    recognitionScoreThreshold: number = 0.8;

    @input
    debugPrint: boolean = true;

    private detector: MLComponent;
    private detectorInput: InputPlaceholder;
    private detectorInputTransformer: Transformer;
    private detectorOutput: OutputPlaceholder;
    private detectorOutputData: Float32Array;
    private segmentationFloatTensor: Float32Array;
    private segmentationIntTensor: Uint8Array;
    private detectorOutputShape: vec3;
    private aspect: number;

    private classifier: MLComponent;
    private classifierR: MLComponent;
    private classifierInput: InputPlaceholder;
    private classifierInputR: InputPlaceholder;
    private classifierOutput: OutputPlaceholder;
    private classifierOutputR: OutputPlaceholder;
    private classifierOutputShape: vec3;
    private permutedOutput: Float32Array;
    private contoursTensor: Int32Array;

    private readonly characterMap: string[] = require("./Modules/CharacterMap").map;
    private readonly VEC2_ZERO: vec2 = vec2.zero();
    public initialized: boolean = false;
    private mlCompReady: number = 0;

    onAwake() {
        print("OCR is initializing!");
        this.initialize();
        print("Done initializing...");
    }

    private initialize() {
        if (this.checkInputs()) {
            print("Configure ML Models.");
            this.configureMLModels();
            print("Configure ML Models End.");
        }
    }

    private checkInputs(): boolean {
        if (!this.detectorMLAsset) {
            print("Error, Detection ML Model is not set");
            return false;
        }
        if (!this.classifierMlAsset) {
            print("Error, Recognition ML Model is not set");
            return false;
        }
        return true;
    }

    private configureMLModels() {
        print("Detector Ml");
        this.detector = this.createDetectorMlComponent();
        print("Classifier Ml");
        this.classifier = this.createClassifierMlComponent(false);
        print("ClassifierRMl");
        this.classifierR = this.createClassifierMlComponent(true);
    }

    private createDetectorMlComponent(): MLComponent {
        var sceneObject = this.getSceneObject();
        print("Scene Object name is: ");
        print(sceneObject.name);

        const mlComponent = this.getSceneObject().createComponent("MLComponent");
        mlComponent.model = this.detectorMLAsset;

        const transformer = MachineLearning.createTransformerBuilder()
            .setStretch(false)
            .setFillColor(vec4.zero())
            .build();

        const defaultInput = mlComponent.getInputs()[0];
        const inputPlaceholder = MachineLearning.createInputBuilder()
            .setName(defaultInput.name)
            .setShape(defaultInput.shape)
            .setTransformer(transformer)
            .build();

        const outputPlaceholder = mlComponent.getOutputs()[0];
        outputPlaceholder.mode = MachineLearning.OutputMode.Texture;

        // mlComponent.onLoadingFinished = () => { this.wrapFunction(mlComponent.onLoadingFinished, this.onLoadingFinished.bind(this))};
        mlComponent.onLoadingFinished = () => { this.onLoadingFinished() };
        mlComponent.build([inputPlaceholder, outputPlaceholder]);

        // Trying this.
        // print("Trying to run immediately.");
        // mlComponent.runImmediate(true);

        return mlComponent;
    }

    private createClassifierMlComponent(isRotated: boolean): MLComponent {
        const mlComponent = this.getSceneObject().createComponent("MLComponent");
        mlComponent.model = this.classifierMlAsset;

        const defaultInputPl = mlComponent.getInputs()[0];
        const transformer = MachineLearning.createTransformerBuilder()
            .setStretch(false)
            .setFillColor(new vec4(0, 0, 0, 1))
            .setRotation(isRotated ? TransformerRotation.Rotate270 : TransformerRotation.None)
            .build();

        const inputPlaceholder = MachineLearning.createInputBuilder()
            .setName(defaultInputPl.name)
            .setShape(defaultInputPl.shape)
            .setTransformer(transformer)
            .build();

        const outputPlaceholder = mlComponent.getOutputs()[0];
        // mlComponent.onLoadingFinished = () => { this.wrapFunction(mlComponent.onLoadingFinished, this.onLoadingFinished.bind(this))};
        mlComponent.onLoadingFinished = () => { this.onLoadingFinished() };
        mlComponent.build([inputPlaceholder, outputPlaceholder]);

        // Trying this.
        // print("Trying to run immediately.");
        // mlComponent.runImmediate(true);

        return mlComponent;
    }

    private onLoadingFinished() {
        if (this.mlCompReady < 2) {
            this.mlCompReady += 1;
            return;
        }
        print("Info, Detector ML Component has loaded");

        this.detectorInput = this.detector.getInputs()[0];
        this.detectorOutput = this.detector.getOutputs()[0];
        this.detectorInput.texture = this.detectorInputTexture;
        this.detectorOutputShape = this.detectorOutput.shape;
        this.detectorInputTransformer = this.detectorInput.transformer;
        this.aspect = this.detectorInputTexture.control.getAspect();
        this.detectorOutputData = this.detectorOutput.data;

        this.contoursTensor = new Int32Array(this.detectorOutputShape.x * this.detectorOutputShape.y * 2);
        this.segmentationFloatTensor = new Float32Array(this.detectorOutputData.length);
        this.segmentationIntTensor = new Uint8Array(this.segmentationFloatTensor);

        // this.cropTexture.control.inputTexture = this.detectorInputTexture;
        //@ts-ignore
        this.cropTexture.control.inputTexture = this.detectorInputTexture
        this.classifierInput = this.classifier.getInputs()[0];
        this.classifierOutput = this.classifier.getOutputs()[0];
        this.classifierInput.texture = this.cropTexture;

        this.classifierInputR = this.classifierR.getInputs()[0];
        this.classifierOutputR = this.classifierR.getOutputs()[0];
        this.classifierInputR.texture = this.cropTexture;

        this.classifierOutputShape = this.classifierOutput.shape;
        this.permutedOutput = new Float32Array(this.classifierOutputShape.x * this.classifierOutputShape.y);

        this.initialized = true;
    }

    setInputTexture(texture: Texture) {
        this.detectorInputTexture = texture;
        this.aspect = texture.control.getAspect();
        this.detectorInput.texture = texture;
        //@ts-ignore
        this.cropTexture.control.inputTexture = texture;
        // this.cropTexture = texture
    }

    getInputTexture(): Texture {
        return this.detectorInputTexture;
    }

    getDetectionBoxes(): RotatedRect[] {
        if (!this.initialized || this.detector.state != MachineLearning.ModelState.Idle) {
            return [];
        }
        this.detector.runImmediate(true);
        const detections = this.postprocessSegmentation(this.detectorOutputData);
        detections.sort(this.compareRectangles);
        print("Info, detected " + detections.length + " boxes");
        return detections;
    }

    /**
     * Returns detected text from the list of bounding boxes.
     * @param {RotatedRect[]} boxes 
     * @returns {string[]}
     */
    getDetectedText(boxes: RotatedRect[]): string[] {
        return boxes.map(b => this.classifyDetection(b));
    }

    /**
     * Apply transformation matrix to a 2D point.
     * @param {number} x 
     * @param {number} y 
     * @param {mat3} mat 
     * @returns {vec2} - Transformed point.
     */
    transformPoint(x: number, y: number, mat: mat3): vec2 {
        let v = new vec3(x, y, 1);
        let x1 = mat.column0.dot(v);
        let y1 = mat.column1.dot(v);
        return new vec2(x1, y1);
    }

    /**
     * Calculates bounding boxes from the contour array.
     * @param {Float32Array} contour 
     * @returns {RotatedRect | null} - Result rotated rectangle.
     */
     getBoxFromContour(contour: Float32Array): RotatedRect | null {
        let boundingBox = TensorMath.minAreaRect(contour, new vec3(contour.length / 2, 1, 2));
        let center = boundingBox.center;
        let size = boundingBox.size;

        if (Math.min(size.x, size.y) < this.minSideThreshold) {
            return null;
        }

        let shiftDistance = (size.x * size.y) / (2 * size.x + 2 * size.y);

        if (size.x > size.y) {
            size.x += 2 * this.unclipRatioLongSide * shiftDistance;
            size.y += 2 * this.unclipRatioShortSide * shiftDistance;
        } else {
            size.x += 2 * this.unclipRatioShortSide * shiftDistance;
            size.y += 2 * this.unclipRatioLongSide * shiftDistance;
        }

        let left = (center.x - 0.5 * size.x) / this.detectorOutputShape.x;
        let right = (center.x + 0.5 * size.x) / this.detectorOutputShape.x;
        let bottom = (center.y + 0.5 * size.y) / this.detectorOutputShape.y;
        let top = (center.y - 0.5 * size.y) / this.detectorOutputShape.y;

        let x = (2 * left) - 1;
        let y = 1 - (2 * top);
        let w = 2 * (right - left);
        let h = 2 * (bottom - top);

        let angle = boundingBox.angle;

        let topLeft = this.transformPoint(x, y, this.detectorInputTransformer.inverseMatrix);
        let bottomRight = this.transformPoint(x + w, y - h, this.detectorInputTransformer.inverseMatrix);

        left = Math.max(Math.min(1, topLeft.x), -1);
        right = Math.max(Math.min(1, bottomRight.x), -1);
        top = Math.max(Math.min(1, topLeft.y), -1);
        bottom = Math.max(Math.min(1, bottomRight.y), -1);

        let temp = Rect.create(left, right, bottom, top);
        let tempSize = temp.getSize();

        if (Math.abs(angle) > 45) {
            let sign = angle > 0 ? 1 : -1;
            let extraRotate = (sign * angle - 45) / 90;
            let transposeTimes = Math.floor(extraRotate);
            if (Math.abs(transposeTimes - extraRotate) > 1e-6) {
                transposeTimes++;
            }
            if (transposeTimes % 2 === 1) {
                tempSize = new vec2(tempSize.y / this.aspect, tempSize.x * this.aspect);
                temp.setSize(tempSize);
            }
            angle -= sign * 90 * transposeTimes;
        }
        return RotatedRect.create(temp.getCenter(), temp.getSize(), angle);
    }

    /**
     * Detects bounding boxes from the bitmap.
     * @param {Int8Array} bitmap 
     * @returns {RotatedRect[]} - A list of detected boxes.
     */
    boxesFromBitmap(bitmap: Uint8Array): RotatedRect[] {
        let contoursSizes = TensorMath.findContours(bitmap, this.detectorOutputShape, 1, 2, this.VEC2_ZERO, this.contoursTensor);
        let contoursNum = Math.min(contoursSizes.length, this.maxDetections);
        let previousBytesOffset = 0;
        let result: RotatedRect[] = [];

        for (let i = 0; i < contoursNum; i++) {
            let currentBytesOffset = contoursSizes[i] * 2 * 4;
            let currentContourTensor = new Float32Array(new Int32Array(this.contoursTensor.buffer, previousBytesOffset, contoursSizes[i] * 2));
            previousBytesOffset += currentBytesOffset;
            let box = this.getBoxFromContour(currentContourTensor);
            if (box != null) {
                result.push(box);
            }
        }
        return result;
    }

    /**
     * Post-processes segmentation data.
     * @returns {RotatedRect[]}
     */
    postprocessSegmentation(detectorOutputData: Float32Array): RotatedRect[] {
        TensorMath.applyThreshold(detectorOutputData, this.thresholdMask * 255, 1, TensorMath.ThresholdMethod.Binary, this.segmentationFloatTensor);
        this.segmentationIntTensor = new Uint8Array(this.segmentationFloatTensor);
        return this.boxesFromBitmap(this.segmentationIntTensor);
    }

    /**
     * Crops texture from the input texture and runs it through the classifier model.
     * @param {RotatedRect} box
     */
    classifyDetection(box: RotatedRect): string {
        let rect = Rect.create(-1, 1, -1, 1);

        rect.setCenter(box.center);
        rect.setSize(box.size);

        //@ts-ignore
        this.cropTexture.control.cropRect = rect;
        //@ts-ignore
        this.cropTexture.control.rotation = box.angle / 180 * Math.PI;

        if (this.cropTexture.control.getAspect() > 1) {
            this.classifier.runImmediate(true);
            return this.postprocessRecognition(this.classifierOutput.data, true);
        } else {
            this.classifierR.runImmediate(true);
            return this.postprocessRecognition(this.classifierOutputR.data, true);
        }
    }

    /**
     * Post-processes recognition output.
     * @param {Float32Array} recognitionOutput 
     * @param {boolean} removeDuplicates 
     * @returns {string}
     */
    postprocessRecognition(recognitionOutput: Float32Array, removeDuplicates: boolean): string {
        TensorMath.permute(recognitionOutput, this.classifierOutputShape, new vec3(2, 0, 1), this.permutedOutput);
        let argMaxOutput = new Uint32Array(this.classifierOutputShape.y * 2);
        let characterIndices = new Uint32Array(this.classifierOutputShape.y);
        TensorMath.argMax(this.permutedOutput, new vec3(1, this.classifierOutputShape.x, this.classifierOutputShape.y), argMaxOutput);
        let j = 0;
        let resultString = "";
        let score = 0;
        for (let i = 0; i < argMaxOutput.length; i++) {
            if (i % 2 === 0) {
                continue;
            }
            characterIndices[j] = argMaxOutput[i];
            j += 1;
        }
        for (let i = 0; i < characterIndices.length; i++) {
            if (characterIndices[i] === 0) {
                continue;
            }
            if (removeDuplicates && i > 0 && characterIndices[i - 1] === characterIndices[i]) {
                continue;
            }
            resultString += this.characterMap[characterIndices[i]];
            score += recognitionOutput[characterIndices[i] + 97 * i];
        }
        if (resultString.length) {
            score /= resultString.length;
        }
        if (score < this.recognitionScoreThreshold) {
            return "";
        }
        return resultString;
    }

    /**
     * Prints text if script.debugPrint is enabled.
     * @param {any} text 
     */
    /*
    debugPrint(text: any): void {
        if (this.debugPrint) {
            print(text);
        }
    }
    */

    /**
     * Wraps a function with another function.
     * @param {Function} origFunc 
     * @param {Function} newFunc 
     * @returns {Function}
     */
    wrapFunction(origFunc: Function, newFunc: Function): Function {
        if (!origFunc) {
            return newFunc;
        }
        return function () {
            origFunc();
            newFunc();
        };
    }

    /**
     * Sorts text detections horizontally.
     * @param {TextDetection} a 
     * @param {TextDetection} b 
     * @returns {number}
     */
    //@ts-ignore
    compareRectangles(a: TextDetection, b: TextDetection): number {
        if (a.center.y < b.center.y) {
            return 1; // rectangleA comes before rectangleB
        } else if (a.center.y > b.center.y) {
            return -1; // rectangleA comes after rectangleB
        } else {
            return 0;
        }
    }
}
