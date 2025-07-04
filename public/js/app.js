// Fetch allows you get data from a url and do something with it.

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//    response.json().then((data)=>{
//     console.log(data);
//    });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() // Prevents the browser from refreshing after a form submision.

    const location = search.value;

    messageOne.textContent = 'Loading... ';
    messageTwo.textContent = ''

    fetch(`https://node3-weather-app-yc6i.onrender.com/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

});