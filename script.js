const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//BUTTON TOGGLE OPERATIONS
function toggleButton(){
    // Switching button status in on itself.
    button.disabled = !button.disabled; 
    button.hidden = !button.hidden; //hides button while joke is running and reappear when finished

}

// PASS JOKE TO TTSAPI - uses VOICE.JS page to pass this info
function tellMe(joke){
    // got this code from tts api documentation 
    VoiceRSS.speech({
        key: '233e1729322c4d28829ef0d633b14196',
        src: joke,
        hl: 'en-us',
        v: 'Harry',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
})
}

// GET JOKES - from JokeAPI 
async function getJokes(){
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if(data.setup) {
            // FORMATTED STRING in JS
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //passing joke to TTS
        tellMe(joke);
        //disable button while audio is playing 
        toggleButton();

    } catch (error) {
        console.log("Error: ", error);
    }
}

// EVENT LISTENER ON BUTTON ELEMENT - 1st parm is event 2nd parm is what happens/what method is called.
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton); //reenables button when joke has ended




