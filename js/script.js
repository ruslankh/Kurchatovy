$(document).ready(function () {
    WebFontConfig = {
        google: { families: [ 'Open+Sans:400,300,600:latin,cyrillic' ] }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
    showTest();
});

function Test(picture, information) {
    this.picture = picture;
    this.information = information;
}
function Questions(question) {
    this.question = question;
}
function Answers(answer, kind) {
    this.answer = answer;
    this.kind = kind;
}
Test.prototype.toHTML = function (highlight, a) {
    questionList = "";
    k = 0;
    while (k < questions[a].length) {
        questionList += questions[a][k].toHTML(a, k);
        k++;
    }
    var TestHTML = "";
    TestHTML += highlight ? "<div class='highlight'>" : "<div class='test'>";
    var picture = "";
    var questionsWidth = "";
    if (this.picture != false) {
        picture = "<div class='picture'><img src='img/" + this.picture + "'width='270'></img></div>";
    }
    else {
        questionsWidth = "style='width: 610px'"
    }
    var information = "";
    if (this.information != false) {
        information = "<div class='information'>" + this.information + "</div>"
    }
    TestHTML += picture + information + "<div class='questionList'" + questionsWidth + ">" + questionList + "</div><br></div>";
    return TestHTML;
}
Questions.prototype.toHTML = function (w, z) {
    answerList = "";
    h = 0;
    while (h < answers[w][z].answer.length) {
        answerList += answersToHTML(answers[w][z].answer[h], answers[w][z].kind, w, z);
        h++
    }
    var QuestionsHTML = "";
    QuestionsHTML += "<div class='onequestion'>" + this.question + "<br /><div class='answerslist'>" + answerList + "</div></div><br>";
    return QuestionsHTML;
}
answersToHTML = function (answer, kind, a, b) {
    var AnswersHTML = "";
    if (kind == "check") {
        AnswersHTML += "<div class='cheks'><input type='radio' name='inpf' class='put' onclick='Check.radioInput(" + answer + "," + a + "," + b + ", this)'>" + answer + "</input></div>";
    }
    else {
        AnswersHTML += "<div><form onsubmit='return Check.textInput(this," + a + "," + b + ",this);return false;'><input class='put' type='text' size='40'></form><span class='pressenter'>Нажмите Enter, чтобы проверить</span></div>"
    }
    return AnswersHTML;
}
function showTest() {
    testList = "";
    i = 0;
    while (i < test.length) {
        testList += test[i].toHTML(i % 2 == 0, i);
        i++
    }
    $("#test").append(testList);
}

var Check = new Object();
Check.physics = 0;
Check.life = 0;
Check.removeStuff = function(what) {
    $(what).parent().parent().find(".pressenter").remove();
    $(what).parent().parent().find("br").remove();
    $(what).parent().parent().find(".put").fadeOut();
};
Check.radioInput = function(answer, nums, numq, ele) {
    Check.removeStuff(ele);
    var isCorrect = false;
    if (answer == correct[nums][numq]) {
        Check.finalSteps(ele, answer, true, nums, numq);
    }
    else {
        Check.finalSteps(ele, answer, false, nums, numq);
    }
}
Check.textInput = function(form, nums, numq, answer) {
        Check.removeStuff(form);
        var answerinp = $(form).find(".put").val();
        var ele = $(form).find(".put");
        if (answerinp === "") {
            answerinp = "Вы ничего не ввели!";
            Check.finalSteps(ele, answerinp, false, nums, numq);
            return false;
        }
        var isCorrect = false;
        for (i=0; i<=correct[nums][numq].length; i++) {
            if(answerinp.toLowerCase() == correct[nums][numq][i]) {
                isCorrect = true;
            }
        }
        if (isCorrect) {
            Check.finalSteps(ele, answerinp, true, nums, numq);
        }
        else {
            Check.finalSteps(ele, answerinp, false, nums, numq);
        }
    return false;
};
Check.finalSteps = function(ele, answer, isRight, nums, numq) {
    rightOrWrong = '';
    rightOrWrongNotification = '';
    boardColor = '';
    if (isRight) {
        rightOrWrong = 'right';
        rightOrWrongNotification = 'Правильно!';
        boardColor = '#2ecc71';
        if (isPhysics[nums][numq]) {
            Check.physics++;
            $("#presult").text(Check.physics);
        }
        else {
            Check.life++;
            $("#lresult").text(Check.life);
        }
    }
    else {
        rightOrWrong = 'wrong';
        rightOrWrongNotification = 'Неправильно!'
        boardColor = '#e74c3c'
    }
    $(ele).parent().parent().append("<br><span class='" + rightOrWrong + "'>Ответ: " + answer + "<br>" + rightOrWrongNotification + "</span>").slideDown();
    $("#board").animate({ backgroundColor: boardColor});
    $("#board").animate({ backgroundColor: '#f1c40f'}, 1000);
}
