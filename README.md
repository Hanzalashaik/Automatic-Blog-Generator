<h1>Automatic-Blog-Generator</h1>

Automatically generate and post articles on Medium using trending search queries and OpenAI's GPT-3.5 model.

### About the Project

This project is a script written in JavaScript that utilizes Google Trends, OpenAI, and the Medium API to generate and publish articles on Medium based on trending search queries. The script is scheduled to run automatically every 24 hours using the Node.js cron library.

## Dependencies

1. `medium-api-npm`: A Node.js wrapper for the Medium API. <br>
2. `node-cron`: A cron-like job scheduler for Node.js.<br>
3. `google-trends-api`: A Node.js wrapper for the Google Trends API.<br>
4. `openai`: A Node.js wrapper for the OpenAI API.<br>

## Installation

To install and run the project locally, follow these steps:

```bash
git clone git@github.com:Hanzalashaik/Automatic-Blog-Generator.git
cd Automatic-Blog-Generator
npm install
```

To start app

Set up API keys:

Obtain API keys for Google Trends, OpenAI, and Medium. Replace the placeholder values in the code with your actual API keys.

Run the script:

```bash
node app.js
```

## Usage

The script is scheduled to run automatically every 24 hours using the cron.schedule function provided by node-cron. It fetches trending search queries using the Google Trends API, generates article content using OpenAI's GPT-3.5 model, and posts the articles on Medium using the Medium API.

## Configuration

Before running the script, make sure to configure the following:

API keys: Obtain API keys for Google Trends, OpenAI, and Medium, and replace the placeholder values in the code with your actual API keys.
Medium authentication token: Set up an authentication token for the Medium API and replace the placeholder value in the code with your actual token.

### HAPPY CODING😊
