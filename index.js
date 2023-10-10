

import { WeatherStatus,humidityIcon,weatherIcon,ConvertToDirection } from "./getWeatherIcons.js";

import { SpeedInKm,visibilityInKm,getTempUnit } from "./convertUnits.js";


   //** declaring the  Constants */

const API_URL="https://api.openweathermap.org/data/2.5/forecast";
const APP_Id="90f506c81d34eed0049f36d93fd34efa";
const Latitude=28.6139;
const Longitude=77.2090;
const days=['sun','mon','tues','wed','thurs','fri','sat']
const month=['January','February','March','April','May','June','July','August','September','October','November','December']
let weatherLocation={lat:Latitude,lon:Longitude};
let tempUnit='metric';
let error=false;






//**Fetch the Data from api  */


async function fetchWeatherData(Location,tempUnits){
  error=false;
 
  let ApiUrl
  if(Location.lat&&Location.lon){
      ApiUrl=`${API_URL}?lat=${Location.lat}&lon=${Location.lon}&appid=${APP_Id}&units=${tempUnits}`
  }
  else{
      ApiUrl=`${API_URL}?q=${Location}&appid=${APP_Id}&units=${tempUnits}`
  }
  console.log(ApiUrl)
  try{

          const response=await fetch(ApiUrl)

          const data= await response.json()
          console.log(data)
           newWeatherData(data)
           

      }
  catch(err){
      console.log("error occured")
      error=true;
      alertError()
  }
  console.log(error)
}

function alertError(){


if(error){
  alert("Error occured .Please try again")
}}

  //*****get weather location  */

const inputValue=document.getElementById('place-search')
const latValue=document.getElementById('lat-search')
const lonValue=document.getElementById('lon-search')
const searchBtn=document.querySelector('.search-btn')
const form=document.getElementById('form-submit')


//** find the new location */


form.addEventListener('submit',async(e)=>{
  e.preventDefault()

  if(inputPlace.value){
  console.log(inputPlace.value)
  weatherLocation=inputPlace.value
  inputPlace.value=""
}
  else if(latValue.value&&lonValue.value){
    weatherLocation={lat:latValue.value,lon:lonValue.value}
    latValue.value="";
    lonValue.value=""
  }
  await fetchWeatherData(weatherLocation,tempUnit)

})
searchBtn.addEventListener('submit',(e)=>{
  e.preventDefault()

})





//*******temperature unit*********

const tempBtn=document.getElementById('temp-Btn')

tempBtn.addEventListener('change',async(event)=>{
    if(event.target.checked){
       tempUnit='Imperial'
    }
    else{
      tempUnit='metric'
    }
   await fetchWeatherData(weatherLocation,tempUnit)
})


///**** */ toggle btn between place and coords/**** */


const newLocation=document.querySelector('.location')
const placeIcon=document.querySelector('.bi-pin-map')
const coordsIcon=document.querySelector('.bi-crosshair')
const inputPlace=document.querySelector('#place-search')
const inputCoords=document.querySelector('.lat-lon-input-container')
const detaildescriptionWeather=document.querySelector('.detail-page-weather-container')


newLocation.addEventListener('click',()=>{

   if(placeIcon.classList.contains('active')){
       inputCoords.classList.add('active')
       inputPlace.classList.remove('active')
   }
   if(coordsIcon.classList.contains('active')){
    inputCoords.classList.remove('active')
       inputPlace.classList.add('active')
   }

   placeIcon.classList.toggle('active')

   coordsIcon.classList.toggle('active')
})



const  menuPlaceBtn=document.querySelector('.by-place')
const  menucoordsBtn=document.querySelector('.by-coords')
const menuLocationContainer=document.querySelector('.location-setup')

//****toggle search place in menu */
menuLocationContainer.addEventListener('click',(e)=>{
  if(e.target.classList.contains('by-coords')){
     inputCoords.classList.add('active')
     inputPlace.classList.remove('active')
  }
  else if(e.target.classList.contains('by-place')){
    inputCoords.classList.remove('active')
    inputPlace.classList.add('active')
  }
  menuPlaceBtn.classList.toggle('toggled-btn')
  menucoordsBtn.classList.toggle('toggled-btn')

})


/// ***** get the formatted time 

function getTime(arr){
    const time=arr.split(" ")
    const timeArray=time[1].split(":")
    const num=parseInt(timeArray[1])
    return `${timeArray[0]}:${standardTime(num)}`
}
function getweatherHour(arr){
    const time=arr.split(" ")
    const timeArray=time[1].split(":")
    return parseInt(timeArray[0])
}
function standardTime(val){
    if (val<10){
        return `0${val}`
    }
    return val

}


  //*** darkmodeToggle */

function darkModeToggle(){
  weatherContainer.classList.toggle('bg-image')
  weatherContainer.classList.toggle('dark-mode-font')
  weatherbriefContainer.classList.toggle('bg-color')
  mainWeatherDisplay.classList.toggle('bg-color')
  chartWeatherReport.classList.toggle('bg-color')
  MenuContainer.classList.toggle('bg-color')
  MenuContainer.classList.toggle('dark-mode-font')
  darkBtn.classList.toggle('show-btn')
  LightBtn.classList.toggle('show-btn')
  locationsvg.forEach(svg=>{svg.classList.toggle('white-svg')})
 }




 const weatherContainer=document.querySelector('.weather-container')
  const weatherbriefContainer=document.querySelector('.brief-weather-report-container ')
  const mainWeatherDisplay=document.querySelector('.main-weather-display')
  const chartWeatherReport=document.querySelector('.chart-weather-container')
  const MenuContainer=document.querySelector('.menu-container')
  const darkBtn=document.querySelector('.dark-btn')
  const LightBtn=document.querySelector('.light-btn')
  const darkModeBtn=document.querySelector('.dark-mode-btn')
  const notificationToggle=document.querySelector('#notification-toggle')
  const locationsvg=document.querySelectorAll('.location svg')
  


  var darkMode=document.getElementById('togBtn');
  darkMode.addEventListener('change',()=>{
  
       darkModeToggle()
  
  
  
  })
 
  darkModeBtn.addEventListener('click',()=>{
    if(LightBtn.classList.contains('show-btn')){
      darkMode.checked=true;
    }
    else{
      darkMode.checked=false;
    }
   darkModeToggle()
 })



function getBriefWeather (currentTime,dataTimeArr){
    const dataTime=getweatherHour(dataTimeArr.dt_txt)
    if (currentTime>=dataTime&&currentTime<(dataTime+3)){
        return dataTimeArr
    }
    return null

}




//*** notification toggle btn */


notificationToggle.addEventListener('change',NotifyWeather)

           const alertContainer=document.querySelector('.alert-container')
         function NotifyWeather(event){
          event.preventDefault()
          if(event.target.checked){
            alertContainer.innerHTML=`<h3 class="notification">Notification turned on </h3>`
            setTimeout(()=>{alertContainer.innerHTML=""},1000)
            setTimeout(()=>{alertContainer.innerHTML=""},4000)

              if(WeatherStatus(data.list[i].weather[0].id)){
                  setTimeout(()=>{alertContainer.innerHTML=`<h3>${WeatherStatus(data.list[i].weather[0].id)}</h3>`},3000)


              }
            }
            else{
            alertContainer.innerHTML=`<h3> Notification turned Off </h3>`
            setTimeout(()=>{alertContainer.innerHTML=""},1000)

            }

         }



function newWeatherData(weatherData){
  
  const currentDay=new Date()
 
  const currentDate=`${standardTime(currentDay.getDate())}/${month[((currentDay.getMonth()))]}/${standardTime(currentDay.getFullYear())}`

   const weatherheading=document.querySelector('.city-heading')
   weatherheading.textContent=weatherData.city.name
   const currentDateContainer=document.querySelector('.current-date')
   currentDateContainer.textContent=currentDate
  
  let briefWeatherArray=[];
  for(let i=0;i<=13;i++){
      let briefdata=getBriefWeather(currentDay.getHours(),weatherData.list[i])
      if(briefdata){
          briefWeatherArray.push(briefdata)

      }
  }
  //  /*******main weather display container***** */

  document.querySelector('.main-weather-display').innerHTML=""
  for(let i=0;i<=13;i++){

          const detailWeatherContainer=document.createElement('div')

          detailWeatherContainer.classList.add('detail-weather-container')
          detailWeatherContainer.innerHTML=
          `<div class='detail-weather-container-list'>
          <p>${getTime(weatherData.list[i].dt_txt)}</p>
          <p>${weatherIcon(weatherData.list[i].weather[0].id)}</p>
          <div class='humidity-container'>
          <p class='humidity-icon' >${humidityIcon(weatherData.list[i].main.humidity)}</p>
          <p>${weatherData.list[i].main.humidity}%</p>
          </div>
          <p>${weatherData.list[i].main.temp.toFixed(1)}${getTempUnit()} </p>
          </div>`

          document.querySelector('.main-weather-display').appendChild(detailWeatherContainer)
 }
    // *****brief weather data */

    const briefWeatherContainer=document.querySelector('.brief-weather-report-container')
   briefWeatherContainer.innerHTML=""
    const briefWeatherData=document.createElement("div")
    briefWeatherData.classList.add("brief-inner-container")
    briefWeatherData.innerHTML=`
    <div class="brief-day-date-time-container">
    <p class="brief-day-date">${days[currentDay.getDay()]},${currentDate}</p>
    <h3 class="brief-time">${(currentDay.getHours())}:${standardTime(currentDay.getMinutes())}</h3>
</div>

    <h1 class="brief-temp" >${briefWeatherArray[0].main.temp.toFixed(0)}${getTempUnit()}</h1>
    <div class="brief-cloud-info-container">
    <p class="brief-cloud-icon">${weatherIcon(briefWeatherArray[0].weather[0].id)}</p>
    <p class="brief-cloud-title">${briefWeatherArray[0].weather[0].description}</p>
    <p class="max-min-temp">${briefWeatherArray[0].main.temp_max.toFixed(0)}${getTempUnit()} ↑ /${briefWeatherArray[0].main.temp_min.toFixed(0)}${getTempUnit()} ↓. Feels like ${briefWeatherArray[0].main.feels_like.toFixed(0)}${getTempUnit()}</p>
</div>
<div class="brief-wind-rain-container">
    <p class="brief-wind-speed">Wind:${SpeedInKm(briefWeatherArray[0].wind.speed)}km/hr, ${ConvertToDirection(briefWeatherArray[0].wind.deg)}</p>
</div>
    `

briefWeatherContainer.appendChild(briefWeatherData)

// **** chart-container***
let xValues = [];
let yValues = [];

for (let i = 0; i <= 13; i++) {
  xValues.push(getTime(weatherData.list[i].dt_txt));
  yValues.push(weatherData.list[i].main.temp);

var options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontSize: 12, 
          fontColor: 'transparent', 
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          beginAtZero: true,
          fontSize: 12,
          fontColor: 'transparent', 
          maxTicksLimit: 5,
          padding: 10, 
        },
      },
    ],
  },
  tooltips: {
    backgroundColor: 'red',
  },
};

new Chart('chart-weather-report', {
  type: 'line',
  options: options,
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: 'blue',
        borderColor: 'gray',
        data: yValues,
        fill: false,
      },
    ],
  }
})};


//****detail description weather */
detaildescriptionWeather.innerHTML=""
for(let i=0;i<=13;i++){
  
   const detailWeatherData=document.createElement('div')
  detailWeatherData.classList.add('detail-weather-data-container')
detailWeatherData.innerHTML=`
  <div class="detail-weather-data-content">
  <div class="detail-weather-headlines">
  <div class="temp-details">
  <p class="time">Time: ${getTime(weatherData.list[i].dt_txt)}</p>

    <h3>${weatherIcon(weatherData.list[i].weather[0].id)}</h3>
    <h2 class="detail-main-temp" >${(weatherData.list[i].main.temp).toFixed(0)}${getTempUnit(weatherData.list[i].main.temp)}</h2>
    <p>${weatherData.list[i].weather[0].description}</p>
    </div>
  </div>
  <div class="detail-weather-info">
  <div class="detail-content wind-speed-container">
  <i class="bi bi-wind"></i>
  <div class="wind-detail">
  <h4>wind<h4>
  <h3>${SpeedInKm(weatherData.list[i].wind.speed)}km/h</h3> 
  </div>
  </div>
  <div class=" detail-content pressure">
  <i class="bi bi-compass"></i>
  <div class="  pressure-detail">
  <h4>pressure<h4>
  <h3>${weatherData.list[i].main.pressure}hpa</h3>
  
  </div>
  </div>
  
  <div class="detail-content humidity">
  ${humidityIcon(weatherData.list[i].main.humidity)}
  <div class="  humidity-detail">
  
  <h4>humidity</h4>
  <h3>${weatherData.list[i].main.humidity}%</h3>
  </div>
  </div>
  <div class="detail-content visibility">
  <i class="bi bi-list-nested"></i>
  <div class="visibility-detail">
  <h4>visibilty<h4>
  <h3>${visibilityInKm(weatherData.list[i].visibility)}km</h3>
  </div>
  </div>
  </div>
  </div>
  
  `
detaildescriptionWeather.appendChild(detailWeatherData)
const detailWeatherHeadlines=document.querySelectorAll('.detail-weather-headlines')
const detailWeatherInfo=document.querySelectorAll('.detail-content')
const detailWeathertitles=document.querySelectorAll('.detail-content h4')
darkMode.addEventListener('change',(e)=>{
  if(e.target.checked){
     detailWeatherHeadlines.forEach((item)=>item.classList.add('bg-detail-image'))
     detailWeatherInfo.forEach((item)=>item.classList.add('bg-detail-image'))
     detailWeathertitles.forEach((item)=>item.style.color="rgb(209, 205, 205)")
     darkBtn.classList.add('show-btn')
  LightBtn.classList.remove('show-btn')
    }
   else{
    detailWeatherHeadlines.forEach((item)=>item.classList.remove('bg-detail-image'))
     detailWeatherInfo.forEach((item)=>item.classList.remove('bg-detail-image'))
     detailWeathertitles.forEach((item)=>item.style.color="darkgray")
     darkBtn.classList.remove('show-btn')
     LightBtn.classList.add('show-btn')
   }
})

}
}

fetchWeatherData(weatherLocation,tempUnit)






const menuContainer=document.querySelector('.menu-container')
const menuOpenBtn=document.querySelector('.menu-bar-btn')
const menuCloseBtn=document.querySelector('.close-menu')

menuOpenBtn.addEventListener('click',()=>{
    menuContainer.classList.add('show-container')
})

menuCloseBtn.addEventListener('click',()=>{
    menuContainer.classList.remove('show-container')
})

const homeBtn=document.querySelector('.home-btn')
const detailBtn=document.querySelector('.detail-btn')

homeBtn.addEventListener('click',()=>{
  weatherContainer.classList.add('display-container')
  detaildescriptionWeather.classList.remove('display-container')
})


detailBtn.addEventListener('click',()=>{
  detaildescriptionWeather.classList.add('display-container')
  weatherContainer.classList.remove('display-container')
})
export{tempUnit}
