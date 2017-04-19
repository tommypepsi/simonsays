var isFirefox = typeof InstallTrigger !== 'undefined';

let sequence = []
let clickSequence = []
let count = 0
let sequenceIsPlaying = false
let isStrict = false
let soundIsPlaying = false
let won = false
let timeout

const soundBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
const soundRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
const soundYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
const soundGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")

const buttons = {
  0: "blue",
  1: "red",
  2: "yellow",
  3: "green"
}
const sounds = {
  0: soundBlue,
  1: soundRed,
  2: soundYellow,
  3: soundGreen
}



function getRandomButton(){
  return Math.floor(Math.random() * 4)
}

function newGame(){
  sequence = []
  clickSequence = []
  count = 0
  document.getElementById("count").innerHTML = count
  sequence.push(getRandomButton())
  simonInteract()
  if(isStrict){
    document.getElementById("strictLed").style.background = "red"
    document.getElementById("strictLed").style.boxShadow = "0 0 5px red"
  }
  showSequence(0)
}

function showSequence(index){
  sequenceIsPlaying = true
  let time = (1500 / (count + 1)) * 1.5 + 500
  if(count === 0){
    time = 1000
  }
  //play sound
  timeout = setTimeout(function(){
    sounds[sequence[index]].currentTime = 0
    sounds[sequence[index]].play()

    //buttons style while playing
    const oldStyle = document.getElementById(buttons[sequence[index]]).style.boxShadow
    document.getElementsByClassName("glow")[sequence[index]].style.width = "150%"
    document.getElementsByClassName("glow")[sequence[index]].style.height = "150%"
    document.getElementsByClassName("glow")[sequence[index]].style.top = "-20%"
    document.getElementsByClassName("glow")[sequence[index]].style.left = "-20%"

    if(sequence[index] === 0){
      document.getElementById(buttons[sequence[index]]).style.boxShadow = "0 0 30px rgba(0, 56, 252, 1)"
    }
    else if (sequence[index] === 1) {
      document.getElementById(buttons[sequence[index]]).style.boxShadow = "0 0 30px rgba(247, 6, 0, 1)"
    }
    else if (sequence[index] === 2) {
      document.getElementById(buttons[sequence[index]]).style.boxShadow = "0 0 30px rgba(251, 241, 0, 1)"
    }
    else if (sequence[index] === 3) {
      document.getElementById(buttons[sequence[index]]).style.boxShadow = "0 0 30px rgba(5, 255, 0, 1)"
    }

    //style back to normal
    setTimeout(function(){
      document.getElementById(buttons[sequence[index]]).style.boxShadow = ""
      document.getElementsByClassName("glow")[sequence[index]].style.width = ""
      document.getElementsByClassName("glow")[sequence[index]].style.height = ""
      document.getElementsByClassName("glow")[sequence[index]].style.top = ""
      document.getElementsByClassName("glow")[sequence[index]].style.left = ""
      if(sequence.length - 1 === index){
        sequenceIsPlaying = false
      }
    }, time - 200)

    if(sequence.length - 1 > index){
      showSequence(index + 1)
    }
  }, time)
}

function win(){
  won = true
  document.getElementById("continue").style.display = "block"
  document.getElementById("count").innerHTML = "You Won"
  document.getElementById("continue").onclick = function(){
    document.getElementById("continue").style.display = "none"
    won = false
    document.getElementById("count").innerHTML = count
    showSequence(0)
  }
}

function simonInteract(){
  function clickConditions(button){
    //if the sequence is not playing
    if(!sequenceIsPlaying && !won){

      //we add the button to the click sequence and play the sound
      clickSequence.push(button)
      sounds[button].currentTime = 0
      sounds[button].play()
      console.log(sequence)
      console.log(clickSequence)

      //if the last added click is not the same as the equivalent element in sequence
      if(clickSequence[clickSequence.length - 1 ] !== sequence[clickSequence.length - 1]){
        if(isStrict){
          count = 0
        }

        document.getElementById("count").innerHTML = count
        return wrong(button, 0)
      }

      //if the click sequence is the same length as the sequence
      if(clickSequence.length === sequence.length){
        //we add a button to the sequence and show the sequence and reset the click sequence
        count++
        if(count === 20){
          console.log("test")
          win()
        }

        sequence.push(getRandomButton())
        clickSequence = []

        if(!won){
          document.getElementById("count").innerHTML = count
          showSequence(0)
        }
      }

      function wrong(button, i){
        if(i < 2){
          sequenceIsPlaying = true
          setTimeout(function(){
            document.getElementsByClassName("glow")[button].style.width = "150%"
            document.getElementsByClassName("glow")[button].style.height = "150%"
            document.getElementsByClassName("glow")[button].style.top = "-20%"
            document.getElementsByClassName("glow")[button].style.left = "-20%"
            setTimeout(function(){
              document.getElementsByClassName("glow")[button].style.width = ""
              document.getElementsByClassName("glow")[button].style.height = ""
              document.getElementsByClassName("glow")[button].style.top = ""
              document.getElementsByClassName("glow")[button].style.left = ""
            }, 200)
            sounds[button].currentTime = 0
            sounds[button].play()
            wrong(button, i + 1)
          },500)
        }
        else{
          sequenceIsPlaying = false
          //if the game is strict we start a new game
          if(isStrict){
            return newGame()
          }
          //if not we just show the same sequence
          else {
            clickSequence = []
            return showSequence(0)
          }
        }
      }
    }
  }
  //when we click on a button
  document.getElementById("blue").onclick = function(){
    console.log("test")
    clickConditions(0)
  }
  document.getElementById("red").onclick = function(){
    clickConditions(1)
  }
  document.getElementById("yellow").onclick = function(){
    clickConditions(2)
  }
  document.getElementById("green").onclick = function(){
    clickConditions(3)
  }
}

function stopGame(){
  clearTimeout(timeout)
  sequence = []
  count = 0
  document.getElementById("count").innerHTML = count
  for(let i = 0; i < 4; i++){
    document.getElementById(buttons[i]).style.boxShadow = ""
    document.getElementsByClassName("glow")[i].style.width = ""
    document.getElementsByClassName("glow")[i].style.height = ""
    document.getElementsByClassName("glow")[i].style.top = ""
    document.getElementsByClassName("glow")[i].style.left = ""
  }


  document.getElementById("blue").onclick = function(){

  }
  document.getElementById("red").onclick = function(){

  }
  document.getElementById("yellow").onclick = function(){

  }
  document.getElementById("green").onclick = function(){

  }
}

window.onload = function(){
  if(isFirefox){
    document.getElementById("board").style.top = "40vh"
    document.getElementById("board").style.width = "70vh"
    document.getElementById("board").style.height = "70vh"
    document.getElementById("board").style.boxShadow = "0px 30px 0px black, -50px 20px 100px rgba(0,0,0,.9)"

    document.getElementById("blue").style.transform = "translate(-50%, -50%) rotate(-45deg) translate(22vh) rotate(135deg)"
    document.getElementById("red").style.transform = "translate(-50%, -50%) rotate(45deg) translate(22vh) rotate(135deg)"
    document.getElementById("yellow").style.transform = "translate(-50%, -50%) rotate(135deg) translate(22vh) rotate(135deg)"
    document.getElementById("green").style.transform = "translate(-50%, -50%) rotate(-135deg) translate(22vh) rotate(135deg)"
    document.getElementById("on").style.fontSize = "4vh"

    const buttonElem = document.getElementsByClassName("buttons")
    for(let i = 0; i < buttonElem.length; i++){
      buttonElem[i].style.width = "40%"
      buttonElem[i].style.height = "40%"
    }
  }

  document.getElementById("on").onclick = function(){
    document.getElementById("on").style.display = "none"
    document.getElementById("off").style.display = "block"
    document.getElementById("count").style.display = "block"
    document.getElementById("strict").style.display = "block"
    document.getElementById("restart").style.display = "block"
    document.getElementById("blue").style.background = "rgb(13, 29, 167)"
    document.getElementById("red").style.background = "rgb(150, 23, 23)"
    document.getElementById("yellow").style.background = "rgb(193, 191, 25)"
    document.getElementById("green").style.background = "rgb(23, 149, 28)"
    newGame()
  }
  document.getElementById("off").onclick = function(){
    document.getElementById("on").style.display = "block"
    document.getElementById("off").style.display = "none"
    document.getElementById("count").style.display = "none"
    document.getElementById("strict").style.display = "none"
    document.getElementById("restart").style.display = "none"
    document.getElementById("continue").style.display = "none"
    document.getElementById("blue").style.background = ""
    document.getElementById("red").style.background = ""
    document.getElementById("yellow").style.background = ""
    document.getElementById("green").style.background = ""
    stopGame()
  }

  document.getElementById("strictButton").onclick = function(){
    if(isStrict){
      isStrict = false;
      document.getElementById("strictLed").style.background = ""
      document.getElementById("strictLed").style.boxShadow = ""
    }
    else{
      isStrict = true

      document.getElementById("strictLed").style.background = "red"
      document.getElementById("strictLed").style.boxShadow = "0 0 5px red"
    }
  }

  document.getElementById("restart").onclick = function(){
    document.getElementById("continue").style.display = "none"
    stopGame()
    newGame()
    won = false
  }
}
