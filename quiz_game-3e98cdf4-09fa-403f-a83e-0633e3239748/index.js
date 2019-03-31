/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'game of throne quiz';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'just say Valar Dohareis, and let Many-Faced God guide you.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Valar Dohareis!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
   const got = [
    {
        question: "Grey Wind, Lady, Ghost, Shaggydog, Summer and the sixth direwolve's name is?",
        answer: 'nymeria',
    },
    {
        question: "What was the name of the sinister castle where Arya and Gendry were held prisoner in season two?",
        answer: 'harrenhal',
    },
    {
        question: "What is a person called that can enter the minds of animals?",
        answer: 'warg',
    },
    {
        question: "What was the name of the Stark ancestral sword that was melted down by Tywin Lannister?",
        answer: 'ice',
    },
    {
        question: "In which city does Arya Stark train to become a Faceless Man?",
        answer: 'Braavos',
    },
    {
        question: "The wildling Gilly has a son, who is the father?",
        answer: 'Craster',
    },
    {
        question: "Which city does Samwell Tarly travel to in order to train as a maester?",
        answer: 'Oldtown',
    },
    
    
    {
        question: "Who was the fool who helped Sansa Stark escape King's Landing after King Joffrey's death?",
        answer: 'Dontos Hollard',
    },
    {
        question: "Which rival king attempted to take King's Landing during the Battle of the Blackwater?",
        answer: 'Stannis Baratheon',
    },
    
    {
        question: "What is the surname given to bastards born in Dorne?",
        answer: 'sand',
    },
    {
        question: "'The Mountain' is the nickname for which character?",
        answer: 'Gregor Clegane',
    },
    {
        question: "Who was Margaery Tyrell's first husband?",
        answer: 'Renly Baratheon',
    },
    {
        question: "Who is known as 'The-King-Beyond-the-Wall'?",
        answer: 'Mance Rayder',
    },
    {
        question: "How many times has Sansa Stark been married?",
        answer: 'Twice',
    },
    {
        question: "Who is the ruler of the Iron Islands at the beginning of Game of Thrones?",
        answer: 'Balon Greyjoy',
    },
    {
        question: "Who was the Mad King's firstborn son?",
        answer: 'Rhaegar Targaryen',
    },
    {
        question: "Who delivered the fatal blow to the King-in-the North, Robb Stark?",
        answer: 'Roose Bolton',
    },
    {
        question: "Grey Worm and Missandei became allies of Daenerys Targaryen after she liberated the slaves of which city?",
        answer: 'Astapor',
    },
    
];
var i=0;
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
 var handlers = {
    
   "customIntent": function () {
           this.response.speak("welcome to kingslanding,Would you like to take part in a trial by combat?").listen();
      this.emit(":responseReady");
   },
   "quizIntent": function () {
       var mydecision = this.event.request.intent.slots.decision.value;
       if(mydecision=='no'||mydecision=='nope'||mydecision=='naah'){
        this.response.speak("Battles have been won against harder odds! Even little Lyanna Mormont has more courage than you.");
        this.emit(":responseReady");
       }

       if(i<=got.length){
           var item = got[i].question;
           if(i == 0){
                this.response.speak("Be attentive; just like life, I won't repeat or give you a second chance. Here you go; " + item).listen();
                this.emit(":responseReady");
           }
           else {
           this.response.speak(item).listen("Wrong Answer");
           this.emit(":responseReady");
           }
        }
   },
   "answerIntent": function () {  
            var myanswer = this.event.request.intent.slots.game.value;

            if(myanswer!=got[i].answer){
                this.response.speak("Wrong Answer. The correct answer is " + got[i].answer + ". You are dead.");
                i=0;
                this.emit(':responseReady');

            }
           
            if(i==got.length){
                i=0;
                this.response.speak("You emerged the ultimate victor. The best in all of Planetos.");
                this.emit(':responseReady');
            }
            this.response.speak("You survived. Say ready, when you are, for the next combat!").listen();
             i++;
            this.emit(':responseReady');
    },
   "LaunchRequest": function () {
    this.response.speak('Valar Morghulis'+'(hint:just say Valar Dohareis, and let Many-Faced God guide you.)').listen("You are supposed to say Valar Dohareis"); 
    this.emit(":responseReady");
   },
   
   'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        i=0
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        i=0;
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

};


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
