const button = document.getElementById("button");
const audioEL = document.getElementById("audio");

//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: "76efad4dd32b4406aacea3e4d18105dc",
        src: jokeString,
        hl: "en-us",
        r: 0,
        c: "mp3",
        ssml: false
    });
}

// Get Jokes from Joke API, When we have it set in a variable, then we pass it to the dictionary in VoiceRSS
async function getJokes() {
    let joke = "";
    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        //Disable buttom
        toggleButton();
    }
    catch (err) {
        console.log("Failed", err);
    }
}

button.addEventListener("click", getJokes);
audioEL.addEventListener("ended", toggleButton);