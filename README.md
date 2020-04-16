[![Build Status](https://travis-ci.com/breadoliveoilsalt/TINNDARPiOS.svg?branch=master)](https://travis-ci.com/breadoliveoilsalt/TINNDARPiOS)

# TINNDÅRP for iOS 

## Introduction

TINNDÅRP is a [React Native](https://reactnative.dev/docs/getting-started) app built with an [Expo](https://docs.expo.io/versions/latest/) workflow.  

Expo is a tool for developing, building, and deploying React Native applications, with the goal of making the overall process easier.  Expo offers different flavors of workflow -- "bare" and "managed" -- each offering different functionality and tools. See [here](https://docs.expo.io/versions/latest/introduction/managed-vs-bare/) for a comparison between the two.  

TINNDÅRP was built using Expo's "managed workflow."  One of the downsides of using this workflow is that the app cannot contain native languages such as Swift and cannot be opened in Xcode, nor can it be opened in an iOS Simulator directly.  The tradeoff is this workflow provides:

  - a developer tool to manage the process of opening the app in a Simulator, or opening the app as a browser-based application, in a quick and easy fashion, with real time updates as the code changes;
  - access to an iOS Expo Client App to experience the app in development on an actual device, so long as the device is on the same network as the computer running the Expo Developer Tool, and
  - a website that allows a user or tester to play with the app via a web browser without having to download it from the Apple Store and without the installation steps below.  

These methods of accessing the app are described below.   

## Requirements

- Node 13.13.0
- Yarn >= 1.15.2
- Expo CLI
  - To install globally, run: `npm install -g expo-cli`
- The [Expo Client App](https://apps.apple.com/app/apple-store/id982107779), if you want to run the app on your own iPhone or iPad while running Expo's web-based Developer Tool (the "Expo DevTool"), described below. You will need to sign up for an Expo account.

# Installing and running the app locally:

1. Clone the repository.  `cd` into the root directory (e.g. `cd TINNDARPiOS`)
2. Install dependencies by running `yarn install`.
3. Run `yarn start`
  - This starts up the web-based Expo DevTool, which leans on Metro Bundler, and it gives you several options to launch the app:
    - If you want to launch an iOS Simulator, go in a browser to `http://localhost:19002/`.
      - On the left you will see several options for launching the app.  Click "Run on iOS simulator," and a Simulator should appear.
      - Running `yarn ios` also provides a way of launching the app directly in a Simulator.
      - Note that similar to running the app on your iPhone or iPad as described below, a Simulator runs TINNDÅRP through another app installed on the Simulator - the Expo Client App.  So if you hit the home screen on the Simulator and cannot find TINNDÅRP, simply click on the Expo Client App on the Simulator.
      - If any changes to the code do not appear to be reflected in the app, hit `command+d` to launch a refresh menu.
    - If you want to launch the app on your iPhone or iPad, download the [Expo Client App](https://apps.apple.com/app/apple-store/id982107779) and sign up for an Expo account.  Make sure your iOS device is on the same network as your computer running the Expo DevTool.  Open your camera and scan the QR code in the lower left corner of the Expo DevTool.  This should trigger prompts that allow you to open up TINNDÅRP as an app on your iOS device through the Expo Client App 
      - If any changes to the code do not appear to be reflected in the app, shake your device to launch a refresh menu.

# Running tests

* To run tests in Jest's interactive mode, from the app's root directory, run `yarn test`

* To run tests without interactive mode, from the app's root directory, run `yarn test:plain`.

# Testing the app without local installations

Expo's managed workflow provides a way to experience the app via a web browser without having to take the installation steps above and without having to use the Expo DevTool.  There are a few tradeoffs, however:
  - The app is opened in a virtual *Android* device, and 
  - For unpaid accounts, the user may have to wait in a queue for the app to be built virtually.

As of this writing, TINNDÅRP's CI/CD builds are reflected in this web-based usage.

To test the app via the web, go [here](https://expo.io/@adistinti/TINNDARPiOS) to reach the Expo page hosting the app. 
On the right, under the QR code, click "Open project in the browser" (and click "Open Project" if there is an "Appetize code" pop up).

A virtual Android device will load. Click "Tap to play" and wait if the screen indicates that there are other devices in the queue before you. 

When the app finishes building, the virtual Android device will be running the Expo Client App, similar to an actual iOS device.  Scroll down in the virtual Android device and click "Open project in Expo."  TINNDÅRP should appear. 
