async function start() {
  //setup
  let txtEl = document.querySelector("#blankArr");
  let winEl = document.querySelector("#win");
  let imgEl = document.querySelector("#img");
  let guess = document.querySelector("#guesses");
  let btn = document.querySelector("#btn")
  let mistake = 0;
    let secret = "Freezer";
    let secretArr = secret.toLowerCase().split("");
    guesses = [];
    blankArr = [];
    for (let i = 0; i < secret.length; i++){
      blankArr[i] = "_";
    }
    txtEl.innerHTML = blankArr.join(" ");
    btn.addEventListener('click', ()=>{
      location.reload();
    })
    // Playing the game
    let letterElem = document.querySelector("#letter")
    window.addEventListener('keydown', (event) => {
      if(event.key == "Enter") {
        if(secretArr.includes(letterElem.value)){
          for (let i = 0; i < secretArr.length; i++){
            if(secretArr[i] == letterElem.value){
              blankArr[i] = secretArr[i];
            }                                    
          }
          txtEl.innerHTML = blankArr.join(" ");

        }else if(mistake < 6){
          mistake +=1
          guesses.push(letterElem.value);
          guess.innerHTML = guesses.join(" , ");
        }else if(mistake > 5) {
          winEl.innerHTML = "You Lose"
          letterElem.disabled = true;
          imgEl.src = "hangman_images/DaveHustSad.jpg"

        }
      }
    })

  }
  

  async function  getRandomWord(){
    const wordsGit = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt");
    let wordsTxt = await wordsGit.text();
    const wordsList = wordsTxt.split('\n')
    console.log(wordsList)
    let filteredWord = [];
    for(let i = 0; i < wordsList.length; i++){
      let word = wordsList[i];
      if(word.length >= 5 && word.length <= 8){
        filteredWord.push(word);
      }
    }
    console.log(filteredWord);
    let randomNum = Math.floor(Math.random() * filteredWord.length);
    console.log(randomNum);
    const randomWord = filteredWord[randomNum];
    return randomWord;
  }

  function checkProgress(){
    for(i = 0; i < 1;){
      if(blankArr.join("") == secret){
        winEl.innerHTML = "You Won!"
        break;
      }
    } 
  }
  
  start()
