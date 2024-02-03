# Star Wars API

[![Live Example](https://raw.githubusercontent.com/elarsaks/SWAPI/main/docs/Screenshot.png)](https://elarsaks.github.io/SWAPI/)

<h3 align="center">
  <a href="https://elarsaks.github.io/SWAPI/">Live Example</a>
</h3>

# About

This is a coding assignment created for a job application. Its goal is to demonstrate UI design implementation, API integration, error handling, code quality, testing, and application development using ReactJS and TypeScript.

It is solely a front-end application that performs basic API calls, pagination, and mock authentication.

<b><a href="https://github.com/elarsaks/SWAPI/blob/main/docs/specs.pdf"> Full specs can be found here.</a></b>

# Installation and running Instructions

This project can be run using Docker for immediate setup, or by manually downloading the repository and setting it up locally.

## Running with Docker

For a quick start, use the following Docker command to run the application:

```bash
docker run -p 3000:3000 elarsaks/star-wars-api:latest
```

## Manual Installation

First, clone the repository and navigate to the ./client directory:

```bash
git clone https://github.com/elarsaks/SWAPI.git
cd SWAPI/client
```

Then, install the necessary dependencies:

```bash
npm install
```

## Running the Application

After installing the dependencies, you can start the application by running:

```bash
npm run start
```

## Accessing the Application

Once the application is running, you can access it using the following URL:
| App | URL |
|------------------|-------------------------------------|
| React | [http://localhost:3000/SWAPI](http://localhost:3000/SWAPI) |
-----------------------------
<br><br>

<img src="https://raw.githubusercontent.com/elarsaks/SWAPI/main/client/public/logo.png" alt="Placeholder" title="Placeholder Image" width="200" height="200"/>
<br><br><br>

# Additional Notes

## Images
Since there was no images provided and I couldn't find any good APIs for the images:

- Downloaded a 1.4GB dataset from Kaggle containing character images.
- Used a script from ChatGPT to retrieve and rename one image per character.
- Uploaded images into S3 bucket
- Discovered that this dataset didnt have all the characters and left the image loading failure in as a feature

## Extra dependencies:
- jest - For testing.
- styled-components - Because they are awesome.
- react-icons - For the icons.
- three.js - For the loading cube (questionable idea, but seemed cool).

<br>

### TODO: Finish ReadMe
