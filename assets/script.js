var questions = [
    new question("Which movie kicked off the Marvel Cinematic Universe as we know it today",
        ["A - Captain America", "B - Iron Man", "C - The Incredible Hulk", "D - Captain Marvel."], "B - Iron Man"),
    new question("Who is the actor that portrays Loki ?", ["A - Tom Hiddleston", "B - Robert Downey Jr",
        "C - Chris Hemsworth", "D - None of the above."], "A - Tom Hiddleston"),
    new question("What is Deadpools real name?",
        ["A - Wayne Wilson ", "B - Bruce Wayne", "C - Wade Wilson", "D - None of the above."], "C - Wade Wilson"),
    new question(" What is the real name of the Scarlet Witch?",
        ["A - Natasha Romanoff", "B - Lois Lane", "C - Diana Prince", "D - Wanda Maximoff"], "D - Wanda Maximoff"),
    new question("Who killed Tony Stark's parents?",
        ["A - Mark 42", "B - Ultron", "C - Jarvis", "D - The Winter Soldier"], "D - The Winter Soldier"),
    new question("What species is Loki revealed to be?",
        ["A - Kryptonian", "B - Asgardian", "C - Human", "D - Frost Giant"], "D - Frost Giant"),
    new question("Which of the infinity stones is hidden on Vormir?", ["A - Time Stone", "B - Reality Stone",
        "C - Soul Stone", "D - Mind Stone"], "C - Soul Stone"),
    new question("What type of doctor is Stephen Strange?", ["A - Neurosurgeon", "B - Trauma Surgeon", "C - Plastic Surgeon", "D - Cardiothoracic Surgeon"], "A - Neurosurgeon"),
    new question("Who is Black Panther's Sister?", ["A - Nakia", "B - Ramonda",
        "C - Shuri", "D - Okoye"], "C - Shuri"),
    new question("What is the name of Thor's hammer?", ["A -Mjolnir", "B -Vanir", "C - Stormbreaker", "D - hammer"],
        "A -body {color: black;}")
];

var quizz = new quiz(questions);
var clicbutton = document.querySelector("#imag");
var decision = document.querySelector("#deci");
var element = document.querySelector("#quiz");
var progress2 = document.querySelector("#progress");
var currentime = 59;
var counter = 0;
var UserInitials = document.querySelector("#userinitials");
var submit = document.querySelector("#sign-up");

var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;



//Function Timer
function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 60 ? "" + seconds : seconds;
        display.textContent = + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        else if (timer === 0) {
            element.innerHTML = "<h1> Game over</h1>" + "<h1 id='score'>Your Final Score is : " + counter + " </h1>" +

                "<input type= text name= EnterYourInitials id=username  placeholder=Enter_Your_Initials_here />  <button class= bt id=sign-up >Sumbit</button </form> "
            clicbutton.innerHTML =
                progress2.innerHTML = "";
            startTimer(currentime, display);


        }
    }, 1000);
}

window.onload = function () {
    display = document.querySelector('#time');

};

function question(text, choices, answer) {  // funtion for question controller 
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
question.prototype.correctansw = function (choices) { // function correct answer
    return choices === this.answer;
}

question.prototype.wrongansw = function (choices) { // function correct answer
    return choices != this.answer;
}


function quiz(questions) { // quiz controller 
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

quiz.prototype.getquestionIndex = function () {
    return this.questions[this.questionIndex];
}

quiz.prototype.end = function () {
    return this.questions.lenght === this.questionIndex
}

quiz.prototype.guess = function (answer) {
    if (this.getquestionIndex().correctansw(answer)) {
        this.score++;
        decision.innerHTML = "Correct";
        counter++;
        localStorage.setItem("score", counter);
    }
    else {
        decision.innerHTML = "inCorrect";
        currentime = currentime - 3;
    }

    this.questionIndex++;


}


startgame();

function startgame() {
    clicbutton.addEventListener("click", function () {
        clicbutton.innerHTML = " <img id=image src=assets/images/goodLuck.gif width=50% height=120>"
        startTimer(currentime, display);
        play()
    })
}

function play() {
    if (quizz.end()) {

    } else {
        // display the question
        var element = document.getElementById("quest");
        element.innerHTML = quizz.getquestionIndex().text;

        //display choice
        var answerschoices = quizz.getquestionIndex().choices;
        for (var i = 0; i < answerschoices.length; i++) {
            var element = document.getElementById("answer" + i);
            element.innerHTML = answerschoices[i];
            guesses("bt" + i, answerschoices[i]);

        }
    }
    progress();
}

function guesses(id, guess) {
    var bts = document.getElementById(id)
    bts.onclick = function () {
        quizz.guess(guess);
        play();

    }
}

function score() {
    var finalscore = "<h1>Result</h1>";
    finalscorend += "<h2 id='score'>Score: " + quiz().score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = finalscore;

}
// function question progress
function progress() {
    var current = quizz.questionIndex + 1;
    progress2.innerHTML = "Question " + current + " of " + quizz.questions.length;

    if (current >= quizz.questions.length) {
        element.innerHTML = "<h1> Game over</h1>" + "<h1 id='score'>Your Final Score is : " + counter + " </h1>" +

            "<input type= text name= EnterYourInitials id=username  placeholder=Enter_Your_Initials_here />  <button class= bt id=sign-up >Sumbit</button>  "
        clicbutton.innerHTML =
        progress2.innerHTML = "";



    }
}

 
// event listener for button submit
submit.addEventListener("click", function () {
    localStorage.setItem("score", counter);

    var Initials = UserInitials.value;
    

    if (Initials === "") {
        alert("error Initials cannot be blank");
    }
    else {
        localStorage.setItem("Initials", Name);
        localStorage.setItem("score", counter);
        displayMessage("success", "Registered successfully");
       

    }
});