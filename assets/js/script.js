

$(function () {

    let $textbox = $('#textbox');
    let $searchButton = $('#button');
    let $storedCityButtons = $('#searched-city');
    //let $currentWeatherList = $('#current-weather');

    generateStoredCityButtons();
    //add search button click event
    $searchButton.on('click', function (event) {
        event.preventDefault();
        storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        let cityinput = $textbox.val();
        //if no city name is entered
        if (!cityinput) {
            alert('Please enter a city name.'); // Display an error message
            return;
        }
        //if city already in storedCityNames don't add it to the search history.
        if (!(storedCityNames.includes(cityinput))) {
            addCityToArray(cityinput);
        }
        getLatLon(cityinput);
        generateStoredCityButtons();

    });

    function addCityToArray(cityinput) {
        storedCityNames.push(cityinput);
        localStorage.setItem('cityStored', JSON.stringify(storedCityNames));
    }

    function getLatLon(cityinput) {

        let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityinput}&limit=1&appid=63fc63eca8b2591691b726308f92bb10`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(data => {
                // Display an error message if city is not found
                if (data.length === 0) {
                    var ul = document.getElementById("current-weather");
                    ul.innerHTML = '';
                    document.getElementById("current-weather").hidden=false;
                    const erroDiv = document.createElement("div");
                    erroDiv.textContent = `Could not load weather data for ${cityinput}`;
                    const li = document.createElement("li");
                    li.appendChild(erroDiv);
                    ul.appendChild(li);
                    //alert("please try again");
                    return; 
                }
                let requestUrl1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=40&limit=5&appid=63fc63eca8b2591691b726308f92bb10&units=metric`;
                fetch(requestUrl1)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let forecast = data.list[0]
                        displayCurrentWeather(forecast, cityinput);
                        let forecasts = data.list.filter(item => item.dt_txt.endsWith('12:00:00')).slice(0, 5);
                        //displayweather(forecasts); 
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }
    function displayCurrentWeather(forecast, city) {
        document.getElementById("current-weather").hidden=false;
        var ul = document.getElementById("current-weather");
        ul.innerHTML = ''; // clear the contents of the ul element
        let today = new Date();
        date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        currentWeather = {};
        let weatherIcon = forecast.weather[0].icon;
        console.log(weatherIcon);
        let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
        console.log(forecast);
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var windSpeed = forecast.wind.speed;
        city=city.charAt(0).toUpperCase()+ city.slice(1)
        const h2 = document.createElement("h2");
        h2.textContent = `${city} (${date})`;
        let img = document.createElement("img");
        img.src = iconUrl;
        h2.appendChild(img);
        const tempDiv = document.createElement("div");
        tempDiv.textContent = `Temp: ${temperature}\u00B0 F`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind Speed: ${windSpeed} MPH`;
        const humDiv = document.createElement("div");
        humDiv.textContent = `Humidity: ${humidity} %`;
        const li = document.createElement("li");
        li.appendChild(h2);
        li.appendChild(tempDiv);
        li.appendChild(windDiv);
        li.appendChild(humDiv);
        ul.appendChild(li);
    }

    /*
        
        function displayweather(forecast, city) {
            forecast.forEach(day => {
                let date = day.dt_txt.split(' ')[0];
                let weathericon = day.weather[0].icon;
                let temparature = day.main.temp;
                let wind = day.wind.speed;
                wind = wind.toFixed(2);
                let humidity = day.main.humidity;
               
                const cityListItem = document.createElement('li');
                const cityHeading = document.createElement('h2');
                cityHeading.textContent = city;
    
                $currentTextarea.append(cityListItem);
                document.getElementById('current-weather').appendChild(cityListItem);
    
                // Append the h2 element to the textarea
                $currentTextarea.append(cityHeading);
    
    
    
            });
    
        }
     */

    function generateStoredCityButtons() {
        let storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        $storedCityButtons.empty(); // Clear any existing buttons from the list
        storedCityNames.forEach(cityNames => {
            let $button = $('<button>').addClass('list-buttons').text(cityNames);
            $storedCityButtons.append($('<li>').append($button));
        });
    }
        $storedCityButtons.on('click', 'button', function () {
        let buttonName = $(this).text(); //button name is the cityname
        $('#textbox').val(buttonName);
        storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        let cityinput = $textbox.val();
        //if no city name is entered
        if (!cityinput) {
            alert('Please enter a city name.'); // Display an error message
            return;
        }
        //if city already in storedCityNames don't add it to the search history.
        if (!(storedCityNames.includes(cityinput))) {
            addCityToArray(cityinput);
        }
        getLatLon(cityinput);
        generateStoredCityButtons();
    });

});




