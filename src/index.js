/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Johnson first ran for president as a republican in two thousand twelve.",
    "Johnsons Personal Wealth Is Estimated Between three million and ten point five million.",
    "Gary Johnson Believes That Most Americans Are Libertarian but don't know it.",
    "Gary Johnson is the First Unmarried Candidate to Run For U.S. President since eighteen eighty four.",
    "Johnson Was Nicknamed Governor No for His Propensity to Veto Spending Bills as Governor of New Mexico.",
    "Johnson Supports the Legalization of Marijuana & Was CEO of a Medical Marijuana Company.",
    "He’s a Regular Critic of American Military Intervention.",
    "Johnson served two terms as governor of New Mexico. He was a Republican at the time.",
    "He finished seventy five triathlons and once climbed Mount Everest with a healing broken leg.",
    "He is sixty three years old.",
    "In nineteen seventy six, Johnson started his own mechanical contracting business with rapid success eventually selling the multimillion dollar company in nineteen ninety nine.",
    "Johnson began his first term as Governor of New Mexico in 1994, and successfully was re-elected in nineteen ninety eight.",
    "In January two thousand sixteen, Johnson resigned from his post as CEO of Cannabis Sativa, Inc., to pursue political opportunities, hinting to a 2016 presidential run.",
    "Johnson has climbed all seven of the Seven Summits:Mount Everest, Mount Elbrus, Denali, Mount Kilimanjaro, Aconcagua, Mount Vinson, and Carstensz Pyramid",
    "In two thousand nine Gary proposed to his girlfriend, Kate Prusack, but because of her busy life and hectic travel schedule, they have yet to actually tie the knot.",
    "Kate Prusack definitely has Johnson’s heart. When he won the Libertarian nomination he told CBS News I have the cutest 63-year-old girlfriend that has ever walked the planet.",
    "Johnson needs 15 percent support in national polls to make the first primetime debate between Democratic Hillary Clinton and Trump in September. He thinks he will get it.",
    "Johnson identifies as a fiscally conservative, socially liberal candidate in favor of a reduction in government spending and oversight, with a simultaneous increase personal freedoms and liberties.",
    "Johnson’s first wife, Dee Johnson, died in two thousand six from hypertensive heart disease shortly after an announcement of their divorce.",
    "The Johnson/Weld team supports the legalization of marijuana and believes each state should have the right to legalize and regulate it, as is the case with alcohol.",
    "Gary Johnson has often said, “There is nothing wrong with the Internet that I want the government to fix.”
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a fact about Gary Johnson, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

