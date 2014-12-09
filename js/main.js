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
    
    $("#answer").click(function()    {
        // ...
    });
});

function triangle(first) {
    var fullWidth = $("#stack-top").width(),
        triHeight = (fullWidth / 5),
        colorInfo = getColorInfo($("#cur-page").val());
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
            "top": (-1 * (triHeight / 2 + 25)) + "px"
        });
        
        var stackTopStyles = {
                "top": "100%",
                "background-color": colorInfo.topColor,
                "border": "1px solid " + colorInfo.topColor,
                "height": ($("#stack-outer").height() - triHeight) + "px"
            };
        if(!window.waitingOnNext)   {
            stackTopStyles["top"] = triHeight + "px";
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

function getColorInfo(pageIndex) {
    var colorInfo = [
        {
            topColor: "#1abc9c", // light
            bottomColor: "#16a085" // dark
        },
        {
            topColor: "#e74c3c",
            bottomColor: "#c0392b"
        },
        {
            topColor: "#f1c40f",
            bottomColor: "#f39c12"
        },
        {
            topColor: "#3498db",
            bottomColor: "#2980b9"
        }
    ];
    
    return (colorInfo[pageIndex] ? colorInfo[pageIndex] : false);
}

function setQuestion(pageIndex)  {
    var questionInfo = [
        {
            question: "Is this question 1?"
        },
        {
            question: "Is this question 2?"
        },
        {
            question: "Is this question 3?"
        },
        {
            question: "Is this question 4?"
        }
    ];
    /*
    var questionInfo = [
        {
            question: "Is this question 1?"
        },
        {
            question: "Is this question 2?"
        },
        {
            question: "Is this question 3?"
        },
        {
            question: "Is this question 4?"
        }
    ];
    */
    
    $("#question-header").html("Clue " + ((pageIndex * 1 + 1) * 1));
    var questionDetails = (questionInfo[pageIndex] ? questionInfo[pageIndex] : false);
    if(questionDetails)    {
        $("#question").html(questionDetails.question);
    }
    else    {
        $("#question").html("hmmm...text me...it messed up");
    }
}

function submitAnswer() {
    if(isCorrect($("#cur-page").val())) {
        window.waitingOnNext = true;
        document.body.style.zoom = 1.0;
        moveNextButton("In");
        $("#next-button").fadeTo(0,1);
        $("#stack-top").css({
            "top": "100%"
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

function isCorrect(pageIndex)   {
    var answers = [
            {
                answer: "yes"
            },
            {
                answer: "no"
            },
            {
                answer: "yes"
            },
            {
                answer: "no"
            }
        ],
        answerSet = (answers[pageIndex] ? answers[pageIndex] : false),
        isCorrect = false;
    
    if(answerSet)   {
        isCorrect = ($("#answer").val() == answerSet.answer);
    }
    
    return isCorrect;
}

function moveNextButton(type)   {
    var oppType = (type == "In" ? "Out" : "In");
    $("#next-button").removeClass("fade" + oppType + "RightBig").addClass("fade" + type + "RightBig animated");
}

function goToNext() {
    window.waitingOnNext = false;
    var curPage = $("#cur-page").val();
    $("#cur-page").val((curPage * 1 + 1));
    setTimeout(function()   {
        triangle();
    }, 600);
}