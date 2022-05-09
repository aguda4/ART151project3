//console.log(navigator)
let audio = new Audio('sounds/testing.mp3');
let device;
if(navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function failure(){
    console.log('Could not connect MIDI');
}

function updateDevices(event)
{
    console.log(event);
}

function success(midiAccess){
    //console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs; 

    //console.log(midiAccess.outputs);

    for(var output of midiAccess.outputs.values()) {
        device = output;
        //console.log('Output device selected', device);
    }

    inputs.forEach((input) => {
        //console.log(input);
        input.addEventListener('midimessage', handleInput);
    })

}
function handleInput(input) {
    //console.log(input);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    console.log(command);
    console.log(note);
    console.log(velocity);

    //console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);

    switch(command) {
        case 144:
            if(velocity > 0){
                noteOn(note);
            } else {
                noteOff(note);
            }
            break;
    }
}
function noteOn(note) {

    console.log(`note:${note} //on`);
    if (note == 64) {
    document.getElementById("testelm").innerHTML = "This is the cat image project.";
    colorKeys(65, 127);

    }
    if(note == 65)
    {
        clearAll();
    }
    if (note == 96) {
        colorAll();
        b = 10;
        document.getElementById('testelm').style.backgroundColor = `rgb(0,0,${b},1)`;
    }
    if (note == 90){
        b = 225;
        let p5_ = new p5();
        document.getElementById('testelm').style.backgroundColor = `rgb(0,0,${b},1)`;

    }
    if (note == 99)
    {
        b = 225;
        //audiopause();
        let p5_ = new p5();
        console.log(p5_.map(0.5,0,1,0,100));
        document.getElementById('testelm').style.backgroundColor = `rgb(0,0,${b},1)`;
    }
    }


function noteOff(note) {
    console.log(`note:${note} //off`);
    if(note == 64){
        document.getElementById("testelm").innerHTML = "Go back to the title.";
    }
    if(note == 84) {
        document.getElementById('testelm').style.backgroundColor = `rgb(255,255,255,1)`;
    }
    if(note == 94) {
        //audiopause();
    }
}
/*function audioplay(){
    audio.play();
}
function audiopause(){
    audio.pause();
}*/

function colorKeys(key, clr)
{
    device && device.send([0x90, key, clr]);
}

function clearAll() {
    for(let i = 0; i < 100; i++)
    {
        colorKeys(i,0)
    }
}
function colorAll(){
    for(let i = 0; i < 100; i++)
    {
        colorKeys(i, i);
    }
}
// Example directly sending a text string:

//const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('1b14ccd1-cede-4104-b06b-c96b484df119');
(async function() {
    var resp = await deepai.callStandardApi("text2img", {
            text: "cat",
    });
    console.log(resp);
    console.log(resp.output_url);
    document.getElementById("wacky_API").src = resp.output_url;
})()

function apicallValue() {
    //lat = '41.878';
    //lon = '-87.629';
    //APIkey = 'abe4d2e4b7080694f170017c8e38a045'
    //units = 'imperial';
    //https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&uints=${units}`, //hardcode everything
    apikey = '8c7dc264ab34e705e3e68e53ff44a3c02bef1b4189756db57ae750d949fabdae';
    search = 'cat';

 $.ajax({
     type: 'GET',
     //GET POST
     datatype: 'json',
     //url: 'http://api.open-notify.org/iss-now.json',
     //url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&uints=${units}`,
     url: `https://serpapi.com/search.json?q=${search}&tbm=isch&ijn=0&api_key=${apikey}`,
     async: false,
     crossDomain: true,
     complete: function (data) {

         if (response.readyState == 4 && response.status == 200) {
             console.log(response);
            // Lat == response.responseJSON.iss_position.latitude;
             //Long == response.responseJSON.iss_position.longitude;
           //  temp = response.responseJSON.main.temp;
            // desc = response.responseJSON.weather[0].description; //weather is in the array
            // console.log(desc);
             //console.log(temp);
             //console.log(Lat);
             //console.log(Long);


         /*if (data.readyState == 4 && data.status == 200) {
             console.log(data);
             Lat == data.responseJSON.iss_position.latitude;
             Long == data.responseJSON.iss_position.longitude;
             //
             //console.log(remap(Lat));
             //console.log(remap(Long));
             }*/
     
         }
     }
 });
}

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://brianiswu-cat-facts-v1.p.rapidapi.com/facts",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "brianiswu-cat-facts-v1.p.rapidapi.com",
		"X-RapidAPI-Key": "8b318e59c3msh0dee2f7d1ae525cp1b6566jsnf161f3cb9352"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});