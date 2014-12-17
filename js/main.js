$(document).ready(function() {
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
    
    setTimeout(function()   {
        triangle(true);
    }, 100);
    
    $(window).on("resize",triangle);
    
    $("body").on({
        "mousewheel": function(e) {
            if(e.target.id == "el") return;
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

function triangle(first) {
    var fullWidth = $("#stack-top").width(),
        triHeight = (fullWidth / 5),
        colorInfo = getQuestionInfo($("#cur-page").val());
    setQuestion($("#cur-page").val());
    
    if(!colorInfo)  {
        // final one
    }
    else    {
        if(!window.waitingOnNext)   {
            var nextButtonBaseStyles = {
                    "border-color": colorInfo.bottomColor,
                    "background-color": colorInfo.topColor
                },
                nextButtonIconBaseStyles = {
                    "color": colorInfo.bottomColor
                };
            $("#next-button").fadeTo(0,0);
            if(!first)  {
                moveNextButton("Out");
            }
            $("#next-button").css(nextButtonBaseStyles);
            $("#next-button i").css(nextButtonIconBaseStyles);
            
            $("#next-button").mouseenter(function()  {
                $(this).css({
                    "border-color": "transparent",
                    "background-color": colorInfo.bottomColor
                });
                $("#next-button i").css("color",colorInfo.topColor);
            });
            $("#next-button").mouseleave(function()  {
                $(this).css(nextButtonBaseStyles);
                $("#next-button i").css(nextButtonIconBaseStyles);
            });
        }
        $("#next-button").css({
            "top": (-1 * (triHeight / 2 + 15)) + "px"
        });
        
        var stackTopStyles = {
                "top": "100%",
                "background-color": colorInfo.topColor,
                "border": "1px solid " + colorInfo.topColor,
                "height": ($("#stack-outer").height() - triHeight) + "px"
            };
        if(!window.waitingOnNext)   {
            stackTopStyles["top"] = triHeight + "px";
            $("#reveal-container").css({
                "top": "100%"
            });
            setTimeout(function() { $("#reveal-container").html(""); }, 600);
        }
        
        $("#triangle").css({
            "margin-top": -1 * triHeight + "px",
            "border-left": fullWidth + "px solid transparent",
            "border-bottom": triHeight + "px solid " + colorInfo.topColor
        });
        $("#stack-bottom").css({
            "background-color": colorInfo.bottomColor
        });
        $("#stack-top").css(stackTopStyles);
        $("#question-box").css({
            "top": (($("#stack-top").height() - triHeight - $("#question-box").height()) / 2) + "px"
        });
        $("#question-box-top").css("background-color",colorInfo.bottomColor);
    }
}

function getQuestionInfo(pageIndex) {
     var questionInfo = [
        { // 1
            question: "Small mail! What does it say?",
            topColor: "#1abc9c", // light
            bottomColor: "#16a085", // dark
            answer: "See you soon (don't forget to take notes of things revealed to you), I love you!",
            reveal: {
                html: '<div class="paper">Text me if you need any help, have fun, and I love you!</div>',
                value: "R"
            }
        },
        { // 2
            question: "What is the scavenger hunt spice's second ingredient?",
            topColor: "#e74c3c",
            bottomColor: "#c0392b",
            answer: "black pepper",
            reveal: {
                html: '<div class="paper">Reminds me of our favorite meal...salmon!<br/><br/>NOTE:  Like all things, this application is not perfect...if you come across a revealed video the little checkmark at the bottom is there, you just can barely see it.  If you click in the area, it will still work :).</div>',
                smallClueValue: true,
                value: "P"
            }
        },
        { // 3
            question: "MAAAAAATH!!!!  Each puppy dog photo has a list of numbers behind it.  Take each second number, multiply it by the first, take the cube root of each product, then take Elliott's number raised to the power of Harlow's number...kidding, just add up the numbers.",
            superLongClue: true,
            topColor: "#73889c",
            bottomColor: "#34495e",
            answer: "101",
            reveal: {
                html: '<img src="images/elliott_harlow.jpg" />',
                stackedImage: true,
                value: "S"
            }
        },
        { // 4
            question: "Big game hunter on the dance floor, prayer guidance on the bar patio, dubstep...couldn't ask for anything more on our first 'date.'  At this location, what color is the Wednesday special?",
            longClue: true,
            topColor: "#f1c40f",
            bottomColor: "#f39c12",
            answer: "Pink",
            reveal: {
                html: '<iframe width="200" height="120" src="https://www.youtube.com/embed/PQddlJtYmjw?wmode=transparent" frameborder="0" allowfullscreen></iframe>',
                value: "T"
            }
        },
        { // 5
            question: "What beer sign (brewery name not needed) is hanging above/in front of where we made it 'Facebook Official?'",
            longClue: true,
            topColor: "#ea935a",
            bottomColor: "#d35400",
            answer: "Wheat State Golden",
            reveal: {
                html: '<img src="images/casbah.jpg" />',
                stackedImage: true,
                value: "U"
            }
        },
        { // 6
            question: "Maybe you would consider this one our first date...post bubble tea, at the site of an awkward pre Easter hug, there is a metal pole with an alphanumeric value (high up/vertically arranged)...",
            longClue: true,
            topColor: "#61addf",
            bottomColor: "#2980b9",
            answer: "A04236",
            reveal: {
                html: '<div class="paper">Walking around together talking and drinking bubble tea was a great first date...I was so nervous!</div>',
                value: "O"
            }
        },
        { // 7
            question: "We had salmon with a view in this building on our first trip together",
            mediumClue: true,
            topColor: "#c687e1",
            bottomColor: "#8e44ad",
            answer: "John Hancock Center",
            reveal: {
                html: '<img src="images/chicago.jpg" />',
                stackedImage: true,
                value: "K"
            }
        },
        { // 8
            question: "Icelandic traditions are the best!  Rolling around in the grass naked during this event was a bad idea though...",
            mediumClue: true,
            topColor: "#95a5a6",
            bottomColor: "#7f8c8d",
            answer: "Summer Solstice",
            reveal: {
                html: '<div class="paper">We are always searching for new things to do or new things to try.  It\'s never boring, and I can\'t wait for a lifetime of that with you!<br/><img src="images/iceland.jpg" width=150 /></div>',
                smallClueValue: true,
                value: "A"
            }
        },
        { // 9
            question: "We went to see this musician perform at the Granada last November",
            mediumClue: true,
			topColor: "#56d78c",
            bottomColor: "#27ae60",
            answer: "Joshua Radin",
            reveal: {
                html: '<iframe width="200" height="120" src="https://www.youtube.com/embed/2muto1kBPFg?wmode=transparent" frameborder="0" allowfullscreen></iframe>',
                value: "H"
            }
        },
		{ // 10
			question: "_&nbsp;&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;_<br/>3 6 5 4 9 &nbsp;&nbsp;&nbsp; 2 8 1 7",
			topColor: "#f1a9a0",
            bottomColor: "#c46c60",
            answer: "South Park",
            reveal: {
                html: '<div class="paper">Meet you at the site of an early date in the park</div>'
            }
		}
    ];
    
    return (questionInfo[pageIndex] ? questionInfo[pageIndex] : false);
}

function setQuestion(pageIndex)  {
    var questionInfo = getQuestionInfo(pageIndex);
    
    $("#question-header").html("Clue " + ((pageIndex * 1 + 1) * 1));
    if(questionInfo)    {
        if(questionInfo.longClue)    {
            $("#question").css("font-size","11x");
        }
        else if(questionInfo.superLongClue)    {
            $("#question").css("font-size","10px");
        }
        else if(questionInfo.mediumClue)    {
            $("#question").css("font-size","15px");
        }
        else    {
            $("#question").css("font-size","18px");
        }
        $("#question").html(questionInfo.question);
    }
    else    {
        $("#question").html("hmmm...text me...it messed up");
    }
}

function isCorrect(pageIndex)   {
    var questionInfo = getQuestionInfo(pageIndex),
        isCorrect = false;
    
    if(questionInfo)   {
        isCorrect = ($("#answer").val().toLowerCase() == questionInfo.answer.toLowerCase());
    }
    
    return isCorrect;
}

function getReveal(pageIndex)   {
    var questionInfo = getQuestionInfo(pageIndex);
    
    return questionInfo.reveal;
}

function submitAnswer() {
    if(isCorrect($("#cur-page").val())) {
        window.waitingOnNext = true;
        //document.body.style.zoom = 1.0;
        moveNextButton("In");
        $("#next-button").fadeTo(0,1);
        $("#stack-top").css({
            "top": "100%"
        });
        $("#reveal-container").css({
            "top": "50%"
        });
        var reveal = getReveal($("#cur-page").val()),
            revealHtml = reveal.html,
            colorInfo = getQuestionInfo($("#cur-page").val());
        if(reveal.stackedImage) {
            revealHtml = '<div class="stack-photo">' + reveal.html + '</div>';
        }
        if(reveal.value)    {
            revealHtml = '<div id="clue-value" class="clue-value' + (reveal.stackedImage ? " clue-value-photo" : "") + '">' + reveal.value + '</div>' + revealHtml;
        }
        $("#reveal-container").html(revealHtml);
        
        $("#clue-value").css({
            color: colorInfo.bottomColor
        });
        if(reveal.smallClueValue)   {
            $("#clue-value").css({
                "height": "40px",
                "width": "40px",
                "font-size": "25px",
                "top": "3px"
            });
        }
        else    {
            $("#clue-value").css({
                "height": "80px",
                "width": "80px",
                "font-size": "50px",
                "bottom": "105%",
                "top": "initial"
            });
        }
        $("#answer").val("");
        sendEmail((($("#cur-page").val() * 1) + 1), colorInfo.question);
    }
    else    {
        $("#answer").addClass("shake animated");
        setTimeout(function()   {
            $("#answer").removeClass("shake animated");
        }, 1000);
    }
}

function moveNextButton(type)   {
    /*var oppType = (type == "In" ? "Out" : "In");
    $("#next-button").removeClass("fade" + oppType + "RightBig").addClass("animated fade" + type + "RightBig");*/
    var right = (type == "In" ? "10%" : "-100%"),
        time = (type == "In" ? 1000 : 0);
    setTimeout(function() { $("#next-button").css("right",right); }, 0);
}

function goToNext() {
    window.waitingOnNext = false;
    var curPage = $("#cur-page").val();
    $("#cur-page").val((curPage * 1 + 1));
    setTimeout(function()   {
        triangle();
    }, 600);
}

function sendEmail(questionNumber, question)    {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            "key": "iNhxku0ctDpZwa3Lo0VJDg",
            "message": {
                "from_email": "ajporter2011@gmail.com",
                "to": [
                    {
                        "email": "ajporter2011@gmail.com",
                        "name": "Alex Porter",
                        "type": "to"
                    }
                ],
                "autotext": "true",
                "subject": "Question Complete",
                "html": "#" + questionNumber + " is complete!<br/>" + question
            }
        }
    });
}