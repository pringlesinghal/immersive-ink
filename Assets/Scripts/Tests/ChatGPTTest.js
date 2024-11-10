
function requestGPT(request) {
        
    global.chatGpt.completions(request, (errorStatus, response) => {
        if (!errorStatus && typeof response === 'object') {
            const mainAnswer = response.choices[0].message.content;
            print(mainAnswer);
        } else {
            print(JSON.stringify(response));
        }
    })
}

function onStart() {
    global.requestGPT = requestGPT;
}

script.createEvent("OnStartEvent").bind(onStart);
