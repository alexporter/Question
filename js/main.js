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
        // Send Email?
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

function getReveal(pageIndex)   {
    var revealInfo = [
        {
            html: '<div class="paper">Text me if you need any help :).  I love you!</div>',
            value: 8
        },
        {
            html: '<img src="images/casbah.jpg">',
            stackedImage: true,
            value: 18
        },
        {
            html: '<iframe width="200" height="120" src="http://www.youtube.com/embed/2muto1kBPFg" frameborder="0" style="padding: 0; margin: 0; z-index: 0;" allowfullscreen></iframe>',
            value: 7
        },
        {
            html: '<img src="images/chicago.jpg">',
            stackedImage: true,
            value: 23
        },
        {
            html: '<img src="images/elliott_harlow.jpg">',
            stackedImage: true,
            value: 6
        }
    ];
    
    return (revealInfo[pageIndex] ? revealInfo[pageIndex] : {html: ""});
}

function setQuestion(pageIndex)  {
    /*
    var questionInfo = [
        {
            question: "Small mail! What does it say?"
        },
        {
            question: "What is the scavenger hunt spice's second ingredient?"
        },
        {
            question: "Is this question 3?"
        },
        {
            question: "Is this question 4?"
        }
    ];
    */
    ///*
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
    //*/
    
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
            colorInfo = getColorInfo($("#cur-page").val());
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

function isCorrect(pageIndex)   {
return true;
    var answers = [
            {
                answer: "See you soon (don't forget to take notes).  I love you!"
            },
            {
                answer: "black pepper"
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
        isCorrect = ($("#answer").val().toLowerCase() == answerSet.answer.toLowerCase());
    }
    
    return isCorrect;
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