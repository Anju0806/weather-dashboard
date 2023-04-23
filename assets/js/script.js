

$(function () {

    const $textbox = $('#textbox');
    const $searchButton = $('#button');
    const $storedCityButtons = $('#searched-city');

    generateStoredCityButtons();
    //add search button click event
    $searchButton.on('click', function (event) {
        event.preventDefault();
        storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        const cityinput = $textbox.val();
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
                console.log(data[0].lon);
                console.log(data[0].lat);
                let requestUrl1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&limit=5&appid=63fc63eca8b2591691b726308f92bb10`;
                fetch(requestUrl1)
                    .then(response => response.json())
                    .then(data => {

                        console.log(data);

                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    function weatherData() {

    }

    function generateStoredCityButtons() {
        let storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        $storedCityButtons.empty(); // Clear any existing buttons from the list
        storedCityNames.forEach(cityNames => {
            const $button = $('<button>').addClass('list-buttons').text(cityNames);
            $storedCityButtons.append($('<li>').append($button));
        });
    }

    $storedCityButtons.on('click', 'button', function () {
        const buttonName = $(this).text(); //button name is the cityname
        $('#textbox').val(buttonName);
       // event.click.preventDefault();
        storedCityNames = JSON.parse(localStorage.getItem('cityStored')) || [];
        const cityinput = $textbox.val();
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




