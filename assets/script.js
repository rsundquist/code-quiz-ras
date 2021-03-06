var questions = [
    new question("The 'function' and the 'var' are known as:",
        ["A - Keywords", "B - Data Types", "C - Declaration Statements", "D - None of the above."], "C - Declaration Statements"),
    new question("Which of the following variables takes precedence over the others if the names are the same?", ["A - Global Variable", "B - The local element",
        "C - The two above", "D - None of the above."], "B - The local element"),
    new question("Which of the following number object function returns the value of the number?",
        ["A - toSource()", "B - valueOf()", "C - toString()", "D - toPrecision"], "B - valueOf()"),
    new question(" Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
        ["A - push()", "B - join()", "C - pop()", "D - map()"], "D - map()"),
    new question("Which of the following function of String object is used to match a regular expression against a string?",
        ["A - concat()", "B - match()", "C - search()", "D - replace()"], "D - replace()"),
    new question("Which of the following function of Array object sorts the elements of an array?",
        ["A - toSource()", "B - sort()", "C - toString()", "D - unshift()"], "D - unshift()"),
    new question("What does CSS stand for?", ["A - Creative Style Sheets", "B - Compact Style Sheets",
        "C - Cascading Style Sheets", "D - Creative Simple Sheets"], "C - Cascading Style Sheets"),
    new question("What is the one of the most popular Javascript librarys?", ["A - JQuery", "B - JavaComm", "C - Java", "D - JSDB"], "A - JQuery"),
    new question("What does HTML stand for?", ["A - Home Tool Markup Language", "B -Hyper Text Markup Language",
        "C - Hyperlinks Text Markup Language", "D - Hyperlinks and Text Markup Language"], "C - Hyperlinks Text Markup Language"),
    new question("Which is the correct CSS syntax?", ["A -body {color: black;}", "B -{body:color=black;}", "C -body:color=black;", "D -{body;color:black;}"],
        "A -body {color: black;}")
];

var quizz = new quiz(questions);
var clicbutton = document.querySelector("#imag");
var decision = document.querySelector("#deci");
var element = document.querySelector("#quiz");
var progress2 = document.querySelector("#progress");
var currentime = 59;
var counter = 0;
var submit = document.querySelector("#sign-up");

var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;
var userArray = JSON.parse(localStorage.getItem('Initials')) || [];
var scoreArray = JSON.parse(localStorage.getItem('score')) || [];


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
            clicbutton.style.visibility = "hidden"
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
    return this.questions.length === this.questionIndex
}

quiz.prototype.guess = function (answer) {
    if (this.getquestionIndex().correctansw(answer)) {
        this.score++;
        decision.innerHTML = "Correct";
        counter++;
        //localStorage.setItem("score", counter);
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
function displayLeaderBoard() {
    var boardEl = document.getElementById ("leaderBoard");
    boardEl.innerHTML = ""
    for (i in userArray) {
        var userEl = document.createElement ("div");
        var scoreEl = document.createElement ("div");
        userEl.innerText = userArray[i];
        scoreEl.innerText = scoreArray[i];
        boardEl.appendChild(userEl);
        boardEl.appendChild(scoreEl);
    }
    
    //userLeaderBoard.innerText = JSON.parse(localStorage.getItem('Initials'));
    //scoreLeaderBoard.innerText = JSON.parse(localStorage.getItem('score'));
    
    //localStorage.setItem("score", JSON.stringify(Initials, 'score'));

}
// function question progress
function progress() {
    var current = quizz.questionIndex + 1;
    progress2.innerHTML = "Question " + current + " of " + quizz.questions.length;

    if (current >= quizz.questions.length) {
        element.innerHTML = "<h1> Game over</h1>" + "<h1 id='score'>Your Final Score is : " + counter + " </h1>" +

            "<input type= text name= EnterYourInitials id=UserInitials  placeholder=Enter_Your_Initials_here />  <button class= bt id=sign-up >Sumbit</button>  "
        clicbutton.innerHTML =
        progress2.innerHTML = "";
        submit=document.getElementById("sign-up");
        // event listener for button submit
        submit.addEventListener("click", function () {
        localStorage.setItem("score", counter);
        var UserInitials = document.querySelector("#UserInitials");
        var Initials = UserInitials.value;
    

    if (Initials === "") {
        alert("error Initials cannot be blank");
        }
    else {
        userArray.push(Initials);
        console.log(userArray)
        scoreArray.push(counter);
        console.log(scoreArray);
        localStorage.setItem("Initials", JSON.stringify(userArray));
        localStorage.setItem("score", JSON.stringify(scoreArray));
        //displayMessage("success", "Registered successfully");
        displayLeaderBoard ()
       

        }
        });

    }
}

 
