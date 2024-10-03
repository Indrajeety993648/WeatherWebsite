const searchBtn = document.querySelector("#srch");
const tempValue = document.querySelector(".temp");
const humidityValue = document.getElementById("humidity");
const windValue = document.getElementById("wind");
const cityName = document.getElementById("city");
const images1 = document.getElementById("weather-icon");
const apiKey = "9bb000e40a7a606584d1f028c31791ca";
const card = document.querySelector(".card");
const searchInput = document.getElementById("inpuT");

searchBtn.addEventListener("click", () => { 
    const search = searchInput.value;
    if(search === ""){
        alert("Please Enter a valid city name ");
    } else {
        checkWeather(search);
    }
});

// Add event listener for 'Enter' keypress
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const search = searchInput.value;
        if(search === ""){
            alert("Please Enter a valid city name ");
        } else {
            checkWeather(search);
        }
    }
});

async function checkWeather(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9bb000e40a7a606584d1f028c31791ca&units=metric`);
        const ans = await response.json();
        console.log(ans);
        const temp = Math.round(ans.main.temp);
        console.log("The temp is ",temp);
        tempValue.innerHTML = `${temp}°C`;
        const humidity = ans.main.humidity;
        console.log("The Humidity is ", humidity);
        humidityValue.innerHTML = `${humidity}`;
        const wind = ans.wind.speed;
        console.log("The wind is ", wind);
        windValue.innerHTML = `${wind}Km/h`;
        cityName.innerHTML = `${city}`;
        const sign = ans.weather[0].main;
        console.log(sign);
        images1.setAttribute("src",`images/${sign}.png`);

        if(sign === "Mist"){
            card.style.background = "linear-gradient(135deg, #c9d6ff, #e2e2e2)";
        } else if(sign === "Snow"){
            card.style.background = "linear-gradient(135deg, #e0eafc, #cfdef3)";
        } else if(sign === "Rain"){
            card.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        } else if(sign === "Cloudy"){
            card.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
        } else {
            card.style.background = "linear-gradient(135deg, #f5af19, #f12711)";
        }
    } catch(error){
        alert("Error: " + error.message);
    }
}
