/*  О Б Р А Б О Т К А  */

//события при загрузке странице (загрузка таблицы Менделеева и рендеринг тестов)
$(document).ready(function () {
    //$("#tablepic").backstretch("table.jpg");
    showTest();
    $(".put").keypress(function (e) {
        if (e.keyCode == 13) {
            if ($(this).is(":focus")) {
                $(this).submit().select();
            }
            return false;
        }

    });
});

//конструктор секций теста
function Test(picture, information) {
    this.picture = picture;
    this.information = information;
}
//конструктор вопросов
function Questions(question) {
    this.question = question;
}
function Answers(answer, kind) {
    this.answer = answer;
    this.kind = kind;
}


// Превращение данных из объектов в HTML
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

    if (this.picture != false) {
        TestHTML += "<div class='information'>" + this.information + "</div><div class='picture'><img src='" + this.picture + "'width='270'></img></div><div class='questionList'>" + questionList + "</div><br></div>";
    }
    else {
        TestHTML += "<div class='information'>" + this.information + "</div><div class='questionList' style='width: 610px'>" + questionList + "</div><br></div>";
    }
    return TestHTML;

}


// Превращение данных из объектов в HTML
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

        AnswersHTML += "<div class='cheks'><input type='radio' class='put' onclick='checking(" + answer + "," + a + "," + b + ", this)'>" + answer + "</input></div>";
    }
    else {
        AnswersHTML += "<div><input class='put' type='text' size='40' onsubmit='checking(this" + "," + a + "," + b + ", this)'>" + "</input></div><span class='tip'>Нажмите Enter, чтобы проверить</span>"
    }
    return AnswersHTML;
}


//Построение секций с картинками и вопросами
function showTest() {
    testList = "";
    i = 0;
    while (i < test.length) {
        testList += test[i].toHTML(i % 2 == 0, i);
        i++


    }
    $("#test").append(testList);

}

physics = 0;
life = 0;

function checking(answer, nums, numq, what) {
    console.log(answer, nums, numq, what);
    $(what).parent().parent().find(".tip").remove();
    $(what).parent().parent().find("br").remove();
    if (isNaN(answer)) {
        if (answer.value.length == "") {
            //$(what).parent().parent().append("<br><span class='wrong'>Вы ничего не ввели!</span>")
            answer = "Вы ничего не ввели!"

        }
        else {
            answer = answer.value.toLowerCase();
        }
    }
    if (answer == correct[nums][numq]) {

        $(what).parent().parent().append("<br><span class='right'>Ответ: " + answer + "<br>Правильно!</span>").slideDown();
        $(what).parent().parent().find(".put").fadeOut().remove();
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
        if(description[nums][numq] == false) {
            desciptionToWrong = ""
        }
        $(what).parent().parent().append("<br><span class='wrong'>Ответ: " + answer + "<br>Неправильно!" + desciptionToWrong + "</span>")
        $(what).parent().parent().find(".put").fadeOut().remove();
        $(what).fadeOut().remove(".tip");
    }

}



