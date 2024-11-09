@component
export class GetCatFacts extends BaseScriptComponent {
  @input
  remoteServiceModule: RemoteServiceModule;

  // Method called when the script is awake
  onAwake() {
    print("Hello world");        
        
    // Create a new HTTP request
    let httpRequest = RemoteServiceHttpRequest.create();
    httpRequest.url = 'https://catfact.ninja/facts'; // Set the URL for the request
    httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get; // Set the HTTP method to GET

    // Perform the HTTP request
    this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
      if (response.statusCode === 200) {
        // Check if the response status is 200 (OK)
        print('Body: ' + response.body);
      }
    });
  }
}