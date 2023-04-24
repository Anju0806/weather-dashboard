

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
                    alert(`Could not find weather data for ${cityinput}.`);
                    return; // Exit the function
                }
                let requestUrl1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=40&limit=5&appid=63fc63eca8b2591691b726308f92bb10&units=metric`;
                fetch(requestUrl1)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let forecast = data.list.filter(item => item.dt_txt.endsWith('12:00:00')).slice(0, 5);
                        displayCurrentWeather(forecast, cityinput);
                        //displayweather(forecast, cityinput);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }
    function displayCurrentWeather(forecast, city) {
        let = '';
        let today = new Date();
        date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        currentWeather = {};
        forecast.forEach(day => {
            apiDate = day.dt_txt;
            apiDate = new Date(apiDate);
            apiDate = apiDate.getDate() + '/' + (apiDate.getMonth() + 1) + '/' + apiDate.getFullYear();
            if (date === apiDate) {
                let weatherIcon = day.weather[0].icon;
                let temperature = day.main.temp;
                let wind = day.wind.speed.toFixed(2);//fix decimal to 2 digits
                let humidity = day.main.humidity;

                //display to document
                const h2 = document.createElement("h2");
                h2.textContent = `${city} (${date})`;
                const tempDiv = document.createElement("div");
                tempDiv.textContent = `Temp: ${temp}`;
                const windDiv = document.createElement("div");
                windDiv.textContent = `Wind Speed: ${windSpeed}`;
                const humDiv = document.createElement("div");
                humDiv.textContent = `Humidity: ${humidity}`;
                const li = document.createElement("li");
                li.appendChild(h2);
                li.appendChild(tempDiv);
                li.appendChild(windDiv);
                li.appendChild(humDiv);
                const ul = document.getElementById("current-weather");
                ul.appendChild(li);

                //currentWeatherText += `${cityHeading}(${date})\n\n\nTemp: ${temperature}F\n\nWind Speed: ${wind}MPH\n\nHumidity: ${humidity}%\n\n`;
            }
        });
        //document.getElementById('current-weather').value = currentWeatherText;
        // $currentWeatherList.value = currentWeather;

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




