console.log("Client side javascript file is loaded!");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value

    message1.textContent = "Loading...";
    message2.textContent = "";
    message3.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
                return;
            }

            message1.textContent = `The temperature is ${data.temperature}°C`;
            message2.textContent = `It feels like ${data.feelsLike}°C`;
            message3.textContent = `in ${data.location}`;
        });
    });

});