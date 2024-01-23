const unsplashImage = document.querySelector('.ImageContainer')
const inputEle = document.querySelector('#searchBox');
const searchIcon = document.querySelector('.fa-search');
const cityName = document.querySelector('#cityName');
const tempEle = document.querySelector('#temp');
const tempNumber = document.querySelector('#tempNumber');
const tempUnit = document.querySelector('#tempUnit')
const dayTpye = document.querySelector('#dayType');
const dayIcon = document.querySelector('#dayIcon');
const humidityPer = document.querySelector('#humidity');

const fetchWeather = async function(){
    const API_KEY = 'b9ab5bbf8c88e5479e42e33b28596615';
    const city = inputEle.value;

    try{ 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();

        const{temp, humidity} = data.main;
        const{description, icon}= data.weather[0];
        tempNumber.innerHTML = (temp- 273.15).toFixed(1) ;
        tempUnit.innerHTML = ' °Cel'
        dayTpye.innerHTML = description;
        dayIcon.innerHTML = icon;
        humidityPer.innerHTML = humidity+'% humidity';

        UI.displayCity();
        UI.clearInputBox();
        UI.fetchCityImage(city);
    }
    catch(error){
        UI.errorMessage()
    }
}

class UI{
    static displayCity(){
        cityName.innerHTML = inputEle.value.charAt(0).toUpperCase() + inputEle.value.slice(1) ;
    }
    static clearInputBox(){
        inputEle.value = '';
    }
    static errorMessage(){
        alert('Error');
    }
    static async fetchCityImage(city){
        try{
            const API_KEY = 'y0KIwaFFcX7Wx5d0-sYLLBHVQ_EE7d1v4aikh34C3j8';
            const response = await fetch(`https://api.unsplash.com/search/photos/?query=${city}&client_id=${API_KEY}`)
            const data = await response.json();

            unsplashImage.style.backgroundImage = `url(${data.results[0].urls.regular})`;
        }
        catch{
            unsplashImage.style.backgroundImage =  "url('https://source.unsplash.com/random')";
        }
    }
}
class Convert{
    static celToFah(cel){
        let fah = (cel* 9/5) + 32
        return fah.toFixed(1);
    } 
    static fahToCel(fah){
        let cel = (fah - 32) * 5/9;
        return cel.toFixed(1)
    }
}

function convertTemp(){
    let ans ;
    if(tempEle.innerHTML.includes('Cel')){
        ans =  Convert.celToFah(tempNumber.innerHTML);
        tempNumber.innerHTML = ans;
        tempUnit.innerHTML = ' °Fah'
    }   
    else{
        ans =  Convert.fahToCel(tempNumber.innerHTML);
        tempNumber.innerHTML = ans;
        tempUnit.innerHTML = ' °Cel';
    }
}



searchIcon.addEventListener('click', fetchWeather);
tempEle.addEventListener('click', convertTemp);
inputEle.addEventListener('keyup', (e)=>{
    if(e.key ==='Enter'){
        fetchWeather();
    }
})

