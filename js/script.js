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

    /*    $(".put").keydown(function (e) {
     if (e.keyCode == 13) {
     if ($(this).is(":focus")) {
     $(this).parent().submit().select();
     }
     return false;
     }
     });*/
});
function inputToChecking(form, nums, numq, answer) {

    var answerinp = $(form).find(".put").val();
    var ele = $(form).find(".put");

    checking(answerinp, nums, numq, ele);
    return false;
}

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
        //console.log(i, x, testList, questionList);
    }
    var TestHTML = "";
    TestHTML += highlight ? "<div class='highlight'>" : "<div class='test'>";
    var picture = "";
    var questionsWidth = "";
    if (this.picture != false) {
        picture = "<div class='picture'><img src='" + this.picture + "'width='270'></img></div>";
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
    QuestionsHTML += "<div class='onequestion'><strong>" + this.question + "</strong><br /><div class='answerslist'>" + answerList + "</div></div><br>";
    return QuestionsHTML;
}
answersToHTML = function (answer, kind, a, b) {
    var AnswersHTML = "";
    if (kind == "check") {
        AnswersHTML += "<div class='cheks'><input type='radio' name='inpf' class='put' onclick='checking(" + answer + "," + a + "," + b + ", this)'>" + answer + "</input></div>";
    }
    else {
        AnswersHTML += "<div><form onsubmit='return inputToChecking(this," + a + "," + b + ",this);return false;'><input class='put' type='text' size='40'></form><span class='pressenter'>Нажмите Enter, чтобы проверить</span></div>"
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
var physics = 0;
var life = 0;
function checking(answer, nums, numq, what) {

    $(what).parent().parent().find(".pressenter").fadeOut();
    $(what).parent().parent().find("br").remove();

    var usr = answer;
    if (isNaN(answer)) {
        usr = answer;
        if (answer.length == "") {
            usr = "Вы ничего не ввели!"
            return false;
        }
        else {
            answer = answer.toLowerCase();
        }
    }
    if (answer == correct[nums][numq]) {
        $(what).parent().parent().append("<br><span class='right'>Ответ: " + usr + "<br>Правильно!</span>").slideDown();
        $(what).parent().parent().find(".put").fadeOut();
        $("#board").animate({ backgroundColor: '#2ecc71'});
        $("#board").animate({ backgroundColor: '#f1c40f'}, 1000);
        if (isPhysics[nums][numq]) {
            physics++;
            $("#presult").text(physics);
        }
        else {
            life++;
            $("#lresult").text(life);
        }
    }
    else {
        $("#board").animate({ backgroundColor: '#e74c3c'});
        $("#board").animate({ backgroundColor: '#f1c40f'}, 1000);
        var desciptionToWrong = "<br>" + description[nums][numq];
        if (description[nums][numq] == false) {
            desciptionToWrong = ""
        }
        $(what).parent().parent().append("<br><span class='wrong'>Ответ: " + usr + "<br>Неправильно!" + desciptionToWrong + "</span>")
        $(what).parent().parent().find(".put").fadeOut();
        $(what).fadeOut(".pressenter");
    }
    return false;
}



