// html elements
var citycode = document.getElementById('citycode');
var tempToday = document.getElementById('tempToday');
var statuToday = document.getElementById('statuToday');
var iconToday = document.getElementById('iconToday');
var dayToday = document.getElementById('dayToday');
var todayNumber = document.getElementById('todayNumber');
var todayMonth = document.getElementById('todayMonth');
var iconTomorrow = document.getElementById('iconTomorrow');
var tempTomorrow = document.getElementById("tempTomorrow");
var minTempTomorrow = document.getElementById('minTempTomorrow');
var statusTomorrow = document.getElementById('statusTomorrow');
var dayTomorrow = document.getElementById('dayTomorrow');
var afterTomorrowDay = document.getElementById('afterTomorrowDay');
var iconAfterTomorrow = document.getElementById('iconAfterTomorrow');
var afterTomorrowMaxTemp = document.getElementById('afterTomorrowMaxTemp');
var afterTomorrowMinTemp = document.getElementById('afterTomorrowMinTemp');
var afterTomorrowStatus = document.getElementById('afterTomorrowStatus');
var input = document.querySelector('.box input');
var firstImage = document.getElementById('firstImage');
var secondImage = document.getElementById('secondImage');
var thirdImage = document.getElementById('thirdImage');
// app var


//functions
async function startApp(city="cairo") {
    var data = await getWeather(city);
    if(!data.error)
        {
            console.log(data);
            getTodayData(data);
            getTomorrowData(data.forecast.forecastday);
            getAfterTomorrowData(data.forecast.forecastday);
            var imageData = await getImage(city);
            console.log(imageData);
            SetImage(imageData.results);
        }
} 
 async function getImage (country)
{
    var response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${country}&client_id=maVgNo3IKVd7Pw7-_q4fywxtQCACntlNXKBBsFdrBzI&per_page=5&orientation=landscape`);
    var data = await response.json();
    return data;

}
async function getWeather(country) {

    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ecd0f74e7e484209a85195137210210&q=${country}&days=3`);
    var data = await response.json();
    return data;

}
function getTodayData(object) {
    var todayDate = new Date();
    citycode.innerHTML = object.location.name;
    tempToday.innerHTML = object.current.temp_c;
    statuToday.innerHTML = object.current.condition.text;
    iconToday.setAttribute("src", `${object.current.condition.icon}`);
    dayToday.innerHTML = todayDate.toLocaleDateString("us", {
        weekday: "long"
    })
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("us", {
        month: "long"
    });

}

function getTomorrowData(object) {
    var tomorrowDate = new Date(object[1].date)
    iconTomorrow.setAttribute("src",`${object[1].day.condition.icon}`);
    tempTomorrow.innerHTML = object[1].day.maxtemp_c;
    minTempTomorrow.innerHTML = object[1].day.mintemp_c;
    statusTomorrow.innerHTML = object[1].day.condition.text;
    dayTomorrow.innerHTML = tomorrowDate.toLocaleDateString("us",{weekday:"long"})
}

function getAfterTomorrowData (object)
{
    var after = new Date(object[2].date)
    afterTomorrowDay.innerHTML = after.toLocaleDateString("us",{weekday:"long"});
    iconAfterTomorrow.setAttribute("src",`${object[2].day.condition.icon}`);
    afterTomorrowMaxTemp.innerHTML = object[2].day.maxtemp_c;
    afterTomorrowMinTemp.innerHTML = object[2].day.mintemp_c;
    afterTomorrowStatus.innerHTML = object[2].day.condition.text;
}
function SearchLocation ()
{
    var term = input.value;
    startApp(term);
}
function SetImage(object){
    firstImage.setAttribute("src",`${object[0].urls.raw}`);
    secondImage.setAttribute("src",`${object[1].urls.raw}`);
    thirdImage.setAttribute("src",`${object[2].urls.raw}`);
}
SearchLocation()
startApp();


// events
