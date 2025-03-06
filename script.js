let ButtonColours = ["green", "red", "yellow", "blue"];

let pcCreatedPattern = [];
let userClickedPattern = [];

var started = false;
let level = 0;
$('body').keypress(start);

$("button").click(function() {
    let id = this.id;
    userClickedPattern.push(id);
    animar(id);
    sonar(id);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (pcCreatedPattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === pcCreatedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $('h1').css('color','black');
        console.log("wrong");
        let wrongAudio = new Audio(`./sounds/wrong.mp3`);
        wrongAudio.play();
        userClickedPattern = [];
        pcCreatedPattern = [];
        level = 0;
        started = false;
        $('h1').text(`Perdiste, press A and try again`);
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
            $('h1').css('color','#FEF2BF');
        }, 400);
        $('body').keypress(start);
    }
}

function nextSequence (){
    userClickedPattern = [];
    level += 1;
    updateLevel();
    let randomnum = Math.floor(Math.random() * 4);
    let chosenColor = ButtonColours[randomnum];
    pcCreatedPattern.push(chosenColor);
    console.log(pcCreatedPattern);
    animar(chosenColor);
    sonar(chosenColor);
}
function sonar(colorelegido) {
    let sonido = new Audio(`./sounds/${colorelegido}.mp3`);
    sonido.play();
}
function updateLevel() {
    $('h1').text(`level ${level}`);
}
function start(event){
    if(event.key == 'a' && !started){
        updateLevel();
        nextSequence();
        started = true;
    }}
function animar(ColorElegido){
    $(`#${ColorElegido}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}