$(document).ready(function() {
    setTimeout(function()   {
        triangle();
    }, 100);
    
    $(window).on("resize",triangle);
    
    $("body").on({
        "mousewheel": function(e) {
            if(e.target.id == "el") return;
            e.preventDefault();
            e.stopPropagation();
        }
    })
});

function triangle() {
    var triHeight = ($("#stack-top").width() / 5),
        colorInfo = getColorInfo($("#cur-page").val());
    
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
            "top": (-1 * triHeight / 2) + "px"
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
            "border-left": $("#stack-top").width() + "px solid transparent",
            "border-bottom": triHeight + "px solid " + colorInfo.topColor
        });
        $("#stack-bottom").css({
            "background-color": colorInfo.bottomColor
        });
        $("#stack-top").css(stackTopStyles);
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

function submitAnswer() {
    if(isCorrect()) {
        window.waitingOnNext = true;
        $("#next-button").fadeTo(600,1);
        $("#stack-top").css({
            "top": "100%"
        });
    }
}

function isCorrect()   {
    return true;
}

function goToNext() {
    window.waitingOnNext = false;
    var curPage = $("#cur-page").val();
    $("#cur-page").val((curPage * 1 + 1));
    triangle();
}