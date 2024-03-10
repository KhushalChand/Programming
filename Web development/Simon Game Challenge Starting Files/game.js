
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;




function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)

}



var start = true;

$(document).on("keydown",function(){
    if(start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start = false;
    }
})

function startOver(){
    start = true;
    gamePattern = [];
    level = 0;

}

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level "+level);


}




$(".btn").on("click",function(){
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("right");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }

}



// alert(randomChosenColour);





