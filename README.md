# immersive-ink

## Inspiration
Our team is driven by the goal of building for social good. We are excited about the possibilities of XR for making education fun, interactive, and immersive and with our project we wanted to transform any dull text into 3D objects narrating their stories. With exciting opportunities for integrating AI with XR, our project makes extensive use of different AI pipelines to build seamless interactive experiences. The Snapchat Spectacles offered a powerful and easy-to-use platform for bringing our ideas to life and we are excited to share this project with the world.

## What it does

As soon as you put on Spectacles and launch our app, it starts searching for text in the camera feed. With a pinch gesture, you can capture the text in front of you using AI-powered Optical Character Recognition (OCR). The captured text is passed into a GPT Large Language Model (LLM) that extracts the noun corresponding to the main character / object in the text. This is used to prompt a Meshy API for AI-powered Text-to-3D generation. This API returns a detailed and beautiful 3D model of the LLM prompted object and places it in front of you as you're reading the text. Simultaneously, AI-generated speech starts to read the text to you, creating the sensation of a 3D character springing from the book to tell you its story.

## How we built it

We used the built-in OCR module in Lens Studio to detect text in the camera feed continuously streaming through the left camera on the Spectacles. The user can see this real-time camera feed in front of them through a window which mirrors it. The user can capture the right frame with a pinch gesture with an associated button UI element. The script then runs the OCR functions on the captured frame and checks if there is valid text. If yes, the captured OCR text is converted into a single string which we feed to the in-built GPT module with a prompt asking it to extract a singular noun for the main object in the text. 

We pass this noun as a prompt to the Text-To-3D model hosted by Meshy through a series of API calls. The end result is a GLTF model returned by Meshy which we render in front of the user, based on their current orientation. Given the speed limitations of current models for real-time 3D generation, we introduce some interesting and interactive animations to engage the user during the mesh generation process. Once, the mesh is ready (without refining), we project a raw mesh hologram which is later updated to the colored object when ready (the whole process taking 1-2 minutes from OCR capture to 3D generation). Moreover, the text prompt for the model is also presented as a 3D word for the user to see the main theme of the passage and prepare them for the object being generated. The user can continue to interact with different texts using the same OCR and button UI to spawn more 3D objects related to the texts they capture.

## Challenges we ran into

1. OCR capture is messy. The camera feed is not aligned with what the user sees. Adding the widget to see the real-time camera feed makes it much easier to capture a high quality frame in the first attempt. Moreover, by setting the camera feed and button to track the user, the user can easily capture any text in their field of view.
2. OCR text capture is inaccurate. There are several grammatical mistakes, broken words, and missed spaces. However, we observe that the GPT LLM is robust to these errors in its input prompt. We explored different prompt structures to reliably return only a singular noun for the main character from the story without unnecessary prefix text.
3. Text-to-3D generation is time consuming. We can speed it up by setting the generation parameters to low-poly and low-quality texture but we can not speed it up beyond 1-2 minutes. We subscribed to the free-trial of [Meshy](https://www.meshy.ai/) Pro Plan to get sufficient API credits to build a proof-of-concept for our product. We also developed different animations to keep the user engaged during the waiting period. The waiting period for generation also required us to use async/await with polling to make sure we did not block the remaining code. 

## Accomplishments that we're proud of

Integrating the different small parts of the solution to build one coherent whole that works together was extremely gratifying. With the diverse skills on our team we were able to contribute in complementary ways with an emphasis on both design and function. We learned a lot in a short period of time by building with Lens Studio which none of us had ever used before. The Snapchat team was extremely supportive throughout the development process making the journey even more fruitful. 

## What we learned

The challenges and design considerations of building for an XR experience, considering the limitations of ML model latencies in the UX, trading off quality and efficiency to create an optimal experience, and familiarity with the Lens Studio / Spectacles development ecosystem.

## What's next for Immersive Ink

There are so many exciting features possible. A natural next step would be to build AI powered animations for the generated 3D objects to enact the story. Moreover, making 3D mesh generation real-time would drastically improve UX. Incorporating different character-specific AI-generated voices could further enhance the vision of characters telling their own stories.

## Resources Used

We used the Meshy API for Text-To-3D generation with a free-trial of the Pro subscription which gave us 1000 API credits. We also made use of the inbuilt GPT model in Lens Studio for LLM tasks without any additional cost. All our assets and designs are free and open-source.
