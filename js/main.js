(function () {
    "use strict";

    var letters = document.getElementsByTagName("button");
    var i;
    var word = window.Hangman.peek();
    var blankWord = [];
    var guesses = 9;
    var drawParts = 0;
    var underlines = document.getElementById("content").getElementsByClassName("blank")[0];

    function hideHangman() {
        var parts = "";
        var allParts = window.Hangman.validParts;

        for (i = 0; i < allParts.length; i++) {
            parts = allParts[i];
            window.Hangman.hide(parts);
        }
    }

    function onClick() {
        for (i = 0; i < letters.length; i++) {
            letters[i].addEventListener('click', function(e) {
                buttonClick(e);
            });
        }
    }

    function buttonClick(e) {
        var button = e.target;
        var buttonLower = "";
        var wrong = document.getElementById("content").getElementsByClassName("wrong")[0];
        var allParts = window.Hangman.validParts;
        var died = document.getElementById("content").getElementsByClassName("died")[0];
        var won = document.getElementById("content").getElementsByClassName("won")[0];

        button.disabled = true;
        button.style.backgroundColor = "#aac2cb";
        button.style.color = "#032e41";
        button.style.textDecoration = "line-through";
        button.style.textDecorationColor = "#8b0e10";
        buttonLower = button;
        console.log("Pressed: " + buttonLower.id);
        if (word.indexOf(buttonLower.id.toLowerCase()) > -1) {
            for (i = 0; i < word.length; i++) {
                if (word[i] === buttonLower.id.toLowerCase()) {
                    blankWord[i] = buttonLower.id.toLowerCase();
                    underlines.textContent = blankWord.join(" ");
                    if (underlines.innerHTML.includes("_") === false) {
                        won.style.visibility = "visible";
                        for (i = 0; i < letters.length; i++) {
                            letters[i].disabled = true;
                        }
                    }
                }
            }
        } else {
            wrong.innerHTML = wrong.innerHTML + buttonLower.id + " ";
            guesses--;
            console.log("You have " + guesses + " guesses left.");
            window.Hangman.show(allParts[drawParts]);
            drawParts++;
            if (guesses === 0) {
                console.log("Game over, Mr hangman died.");
                died.style.visibility = "visible";
                for (i = 0; i < letters.length; i++) {
                    letters[i].disabled = true;
                }
            }
        }
    }

    function blankLetters(word) {
        for (i in word) {
            blankWord.push("_");
        }
        underlines.textContent = blankWord.join(" ");
    }

    hideHangman();
    onClick();
    blankLetters(word);

    window.console.log("Sandbox is ready!");
}());
