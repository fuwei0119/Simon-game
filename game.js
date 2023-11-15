

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];   // every random chosen color/ game color

var userClickedPattern = [];    // user input color

var started = false;

var level = 0;

// press key to start game
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// get the user input and check
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

// generate new game
function nextSequence(){

    // reset user input to empty
    userClickedPattern = [];

    // change title
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    var color = $("#" + currentColour);

    color.addClass("pressed");

    setTimeout(function(){
        color.removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
    }else{
        console.log("wrong");
        
        playSound("wrong");

        $("body").addClass("game-over");

        // change title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];   
    started = false;


}