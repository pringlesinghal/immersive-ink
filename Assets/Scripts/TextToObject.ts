import { setTimeout } from "SpectaclesInteractionKit/Utils/debounce";

@component
export class TextToObject extends BaseScriptComponent {
  @input
  remoteServiceModule: RemoteServiceModule;

  @input
  pbrMaterialHolder: Material;

  @input
  meshParent: SceneObject;

  private remoteMediaModule: RemoteMediaModule = require('LensStudio:RemoteMediaModule');
  private api_key: string = 'msy_IbPr6gMJkLGbG115UI7B88bbghVhBdBAH5Xz';
  private testing: boolean = false;

  private pollingRequest2: RemoteServiceHttpRequest;

  private startCreateTask: number
  private endCreateTask: number

  private startPollOne: number
  private endPollOne: number

  private startRefine: number
  private endRefine: number

  private startPollTwo: number
  private endPollTwo: number

  private globalDelay: Array<number> = [30, 5, 5, 5, 30, 30, 5];
  private globalDelayCounter: number = 0;

  private cachedSceneObject: SceneObject

  onAwake = () => {
    print("Code started");
    // this.createEvent("TapEvent").bind(this.triggerOnTap);
    // this.triggerOnTap("Sea turtle");
    setTimeout(() => print("Timeout triggered after 1 second"), 1000);

    this.pollingRequest2 = RemoteServiceHttpRequest.create();
    this.pollingRequest2.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
    this.pollingRequest2.setHeader('Authorization', `Bearer ${this.api_key}`);
  };

  onUpdate() {

  }

  triggerOnTap = async (prompt) => {
    print("Trigger start");

    let glb_url: string = "";
    let glb_url_preview: string = "";

    if (!this.testing) {
      this.startCreateTask = new Date().getTime();
      // Step 1: Create the task and get the task ID
      const preview_task_id = await this.createTextTo3DTask(prompt);
      if (!preview_task_id) {
        print("Failed to create task.");
        return;
      }
      
      this.startPollOne = new Date().getTime();
      const glb_url_preview = await this.pollForAssetUrl(preview_task_id);
      if (!glb_url_preview) {
        print("Polling mechanism failed");
        return;
      }

      await this.downloadAsset(glb_url_preview);

      this.startRefine = new Date().getTime();
      // Step 2: Create the refined object task
      const refine_task_id = await this.refineTextTo3DTask(preview_task_id);
      if (!refine_task_id) {
        print("Failed to refine task");
        return;
      }

      this.startPollTwo = new Date().getTime();
      // Step 3: Poll to get the asset URL until task status is "SUCCEEDED"
      glb_url = await this.pollForAssetUrl(refine_task_id);
      if (!glb_url) {
        print("Failed to get GLB URL.");
        return;
      }
    }
    else {
      glb_url = "https://assets.meshy.ai/23a16ab3-0a9d-4de0-be8a-c1ef0d69bd23/tasks/01931401-f435-7913-9771-6d5ea32248a3/output/model.glb?Expires=4884796800&Signature=aIzCuhKExBxFdZHxt96nwnn7BVuseJcJSZzQknvA1nOYaoIWIdslBK9AwXCTyJ3qOQHXsYzX3OlJV0hhZEUHul97sVTfb1MZc782rY4BF0FZIiyydwmqY03XVMnvolwlY0eDxJcDrBZPj8QoIxw3z4evkkyCI1GoWfReNln9ERWbPHnF0PLXW-lPgCs5M7teTIblGQEf3ifuunhM5onzcS2y9vvwsWm-7xjyXXuQpn6ALHHsGCPTuoJ8J6S-Fx~3CsWngW~iocri7awAfGz0PPhhYg8F~RkmuvQhE2DuZ86vzPZj8UfsfDocA5ZIUmmyL2QzkQ49haiV9byN8uRgOw__&Key-Pair-Id=KL5I0C8H7HX83";
    }


    // Step 4: Download and load the asset using the GLB URL
    await this.downloadAsset(glb_url);
  };

  createTextTo3DTask = async (prompt): Promise<string | null> => {
    return new Promise<string | null>((resolve, reject) => {

      print("test");
      let httpRequest = RemoteServiceHttpRequest.create();
      httpRequest.url = 'https://api.meshy.ai/v2/text-to-3d';
      httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
      httpRequest.setHeader('Authorization', `Bearer ${this.api_key}`);
      httpRequest.setHeader('Content-Type', 'application/json');

      const payload = {
        mode: 'preview',
        prompt: prompt,
        art_style: 'realistic',
        negative_prompt: 'low quality, low resolution, low poly, ugly',
        target_polycount: 3000,
      };
      httpRequest.body = JSON.stringify(payload);
      print("starting request");
      this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
        print("Getting task ID");
        if (response.statusCode % 100 === 2) {
          let responseBody = JSON.parse(response.body);
          print(responseBody);
          const task_id = responseBody["result"];

          this.endCreateTask = new Date().getTime() - this.startCreateTask;
          print("Create Text To 3D finished time in: " + this.endCreateTask);

          print('Task ID: ' + task_id);
          resolve(task_id);
        } else {
          print('Failed to create task. Status code: ' + response.statusCode);
          resolve(null);
        }
      });
    });
  };

  refineTextTo3DTask = async (preview_task_id: string): Promise<string | null> => {
    let httpRequest = RemoteServiceHttpRequest.create();
    httpRequest.url = 'https://api.meshy.ai/v2/text-to-3d';
    httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
    httpRequest.setHeader('Authorization', `Bearer ${this.api_key}`);
    httpRequest.setHeader('Content-Type', 'application/json');

    const payload = {
      mode: 'refine',
      preview_task_id: preview_task_id,
      texture_richness: 'low',
    };
    httpRequest.body = JSON.stringify(payload);

    return new Promise((resolve) => {
      this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
        print("Getting refine task ID");
        if (response.statusCode % 100 === 2) {
          let responseBody = JSON.parse(response.body);
          print(responseBody);

          this.endRefine = new Date().getTime() - this.startRefine;
          print("RefineTask finished in time: " + this.endRefine);

          const task_id = responseBody["result"];
          print('Refine Task ID: ' + task_id);
          resolve(task_id);
        } else {
          print('Failed to create refining task. Status code: ' + response.statusCode);
          resolve(null);
        }
      });
    });
  };

  pollForAssetUrl = async (task_id: string): Promise<string | null> => {
    while (true) {
      const glb_url = await this.getAssetUrl(task_id);
      if (glb_url) {
        this.endPollOne = new Date().getTime() - this.startPollOne;
        print("Poll For Asset Url time elapsed: " + this.endPollOne);

        return glb_url;
      }
      // Instead of using setTimeout, we simply use await with a delay
      await this.delay(1000 * this.globalDelay[this.globalDelayCounter]); // Polling every 1 second (1000 ms)
      this.globalDelayCounter = Math.min(this.globalDelayCounter+1, this.globalDelay.length-1);
    }
  };

  getAssetUrl = async (task_id: string): Promise<string | null> => {
    this.pollingRequest2.url = `https://api.meshy.ai/v2/text-to-3d/${task_id}`;

    return new Promise((resolve) => {
      this.remoteServiceModule.performHttpRequest(this.pollingRequest2, (response) => {
        // print("Requesting GLB URL");
        if (response.statusCode === 200) {
          const responseBody = JSON.parse(response.body);
          if (responseBody.status === "SUCCEEDED") {
            this.endPollTwo = new Date().getTime() - this.startPollTwo;
            print("Get Asset URL time elapsed: " + this.endPollTwo);

            const glb_url = responseBody["model_urls"]["glb"];
            print('GLB URL: ' + glb_url);
            resolve(glb_url);

        } else {
            print("Task not completed yet. Status: " + responseBody.status);
            resolve(null); // Will retry if status is not "SUCCEEDED"
          }
        } else {
          print('Failed to retrieve asset URL. Status code: ' + response.statusCode);
          resolve(null);
        }
      });
    });
  };

  downloadAsset = async (glb_url: string) => {
    let httpRequest3 = RemoteServiceHttpRequest.create();
    httpRequest3.url = glb_url;
    httpRequest3.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
    httpRequest3.setHeader('Authorization', `Bearer ${this.api_key}`);

    this.remoteServiceModule.performHttpRequest(httpRequest3, (response) => {
      print("Downloading asset");
      if (response.statusCode === 200) {
        let gltfResource = response.asResource();
        this.remoteMediaModule.loadResourceAsGltfAsset(
          gltfResource,
          (glTFAsset) => {
            print('Asset loaded successfully');
            print(glTFAsset.name);

            if (this.cachedSceneObject) {
                this.cachedSceneObject.enabled = false;
            }

            this.cachedSceneObject = glTFAsset.tryInstantiate(this.meshParent, this.pbrMaterialHolder);
          },
          (error) => {
            print('Error loading asset: ' + error);
          }
        );
      } else {
        print('Failed to download asset. Status code: ' + response.statusCode);
      }
    });
  };

  delay = async (ms: number) => {
    /*
    return new Promise((resolve) => {
      const start = new Date().getTime();
      while (new Date().getTime() - start < ms) {
        // Busy-wait loop to simulate delay
      }
      resolve(true);
    });
    */
    return new Promise(resolve => setTimeout(() => {resolve(true)}, ms));
  };
}