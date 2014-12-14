$(document).ready(function() {
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
        {
            question: "Small mail! What does it say?",
            topColor: "#1abc9c", // light
            bottomColor: "#16a085", // dark
            answer: "See you soon (don't forget to take notes).  I love you!",
            reveal: {
                html: '<div class="paper">Text me if you need any help, have fun, and I love you!</div>',
                value: 8
            }
        },
        {
            question: "What is the scavenger hunt spice's second ingredient?",
            topColor: "#e74c3c",
            bottomColor: "#c0392b",
            answer: "black pepper",
            reveal: {
                html: '<div class="paper">Reminds me of our favorite meal...salmon!<br/><br/>NOTE:  Like all things, this application is not perfect...if you come across a revealed video the little checkmark at the bottom is there, you just can barely see it.  If you click in the area, it will still work :).</div>',
                value: 42
            }
        },
        {
            question: "Big game hunter on the dance floor, prayer guidance on the bar patio, dubstep...what more could you ask for on your first 'date'?",
            longClue: true,
            topColor: "#f1c40f",
            bottomColor: "#f39c12",
            answer: "Fatso's Answer",
            reveal: {
                html: '<iframe width="200" height="120" src="https://www.youtube.com/embed/PQddlJtYmjw?wmode=transparent" frameborder="0" allowfullscreen></iframe>',
                value: 23
            }
        },
        {
            question: "Casbah...where we made it 'Facebook Official'",
            topColor: "#ea935a",
            bottomColor: "#d35400",
            answer: "Casbah Answer",
            reveal: {
                html: '<img src="images/casbah.jpg" />',
                stackedImage: true,
                value: 18
            }
        },
        {
            question: "We had salmon with a view in this building on our first trip together",
            mediumClue: true,
            topColor: "#c687e1",
            bottomColor: "#8e44ad",
            answer: "John Hancock Center",
            reveal: {
                html: '<img src="images/chicago.jpg" />',
                stackedImage: true,
                value: 23
            }
        },
        {
            question: "Icelandic traditions are the best!  Rolling around in the grass naked here was a bad idea.",
            mediumClue: true,
            topColor: "#73889c",
            bottomColor: "#34495e",
            answer: "Solstice Rolling Answer",
            reveal: {
                html: '<div class="paper">We are always searching for new things to do or new things to try.  It\'s never boring, and I can\'t wait for a lifetime of that with you.<br/><img src="images/iceland.jpg" width=150 /></div>',
                value: 23
            }
        },
        {
            question: ""
        },
        {
            question: ""
        }
    ];
    
    return (questionInfo[pageIndex] ? questionInfo[pageIndex] : false);
}

function setQuestion(pageIndex)  {
    var questionInfo = getQuestionInfo(pageIndex);
    
    $("#question-header").html("Clue " + ((pageIndex * 1 + 1) * 1));
    if(questionInfo)    {
        if(questionInfo.longClue)    {
            $("#question").css("font-size","12px");
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
return true;
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
        revealHtml = '<div id="clue-value" class="clue-value' + (reveal.stackedImage ? " clue-value-photo" : "") + '">' + reveal.value + '</div>' + revealHtml;
        $("#reveal-container").html(revealHtml);
        $("#clue-value").css({
            color: colorInfo.bottomColor
        });
        $("#answer").val("");
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