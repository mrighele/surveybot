# surveybot

A bot to handle surveys using BotKit and a bit of NLP

# Installation

* Clone the repo

    git clone https://github.com/mrighele/surveybot.git

* Configure the bot: 
  * Go to the "Apps & integrations" page from the menu settings of your slack
  * Select "Custom Integrations" and then "Bots"
  * "Add Configuration", choose a name and then "Add Bot Integration". On the following page copy the API token
* export the API token in a shell variable:

    export SLACK_TOKEN=[your api token]

* start the bot

  node index.js

# Thanks

Since I suck at both NLP and the Slack api, I couldn't have done anything without some examples.

This project is based on the code of _bottie_ by Andrew Templeton: https://github.com/andrew-templeton/bottie

I also found his blog post about the project very useful to start: http://blog.templeton.host/self-training-nlp-enabled-slack-bot-tutorial/
