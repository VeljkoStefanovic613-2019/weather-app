import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useState, useEffect, useCallback } from "react";

export const WeatherApp = () => {
    const api_key = process.env.REACT_APP_API_KEY;;

    const [wicon, setWicon] = useState(cloud_icon);
    const [defaultCity] = useState("Kragujevac");
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () =>{
        if(searchValue.trim()===""){
            toast.error("Please enter a city for search!",{
                closeButton: true,
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true
                });
        }else{
            search(searchValue);
            setSearchValue("");
        }
    }

    
    const search =useCallback( async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        const humidity = document.getElementsByClassName("humidity");
        const wind = document.getElementsByClassName("wind");
        const temperature = document.getElementsByName("temperature");
        const location = document.getElementsByName("location")

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = data.wind.speed + " km/h";
        temperature[0].innerHTML = data.main.temp + " °C";
        location[0].innerHTML = data.name;

        setWeatherIcon(data.weather[0].icon);
    },[api_key]);


    useEffect(() => {
        search(defaultCity);
    }, [defaultCity, search]);

    const setWeatherIcon = (iconCode) => {
        // Construct the URL for fetching the weather icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    
        // Set the wicon state to the constructed icon URL
        setWicon(iconUrl);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (searchValue.trim() === "") {
                toast.error("Please enter a city for search!",{
                closeButton: true,
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true
            });
            }else {
                search(searchValue);
                setSearchValue("");
            }
        }
    }

    return (
        <div className="m-auto mt-0 rounded-xl bg-gradient-to-b from-purple-900 to-purple-600 w-607 h-829">
            <ToastContainer />
            <div className="flex justify-center gap-3.5 pt-10">
                <input
                    type="text"
                    className="flex w-362 h-20 bg-customBackground border-none outline-none rounded-40 pl-10 text-xl font-normal"
                    name="search"
                    placeholder="Search"
                    onKeyPress={handleKeyPress} 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}/>
                    <div className="flex justify-center items-center w-20 h-20 bg-customBackground rounded-40 cursor-pointer" onClick={handleSearch}>
                        <img src={search_icon} alt="" />
                    </div>
            </div>
            <div className="flex justify-center mt-7 h-15">
                <img src={wicon} alt="" className="h-44" />
            </div>
            <div className="flex justify-center text-white text-6xl font-normal" name="temperature">0°C</div>
            <div className="flex justify-center text-white text-7xl font-bold" name="location">Kragujevac</div>
            <div className="flex justify-center mt-12 text-white">
                <div className="m-auto flex items-start gap-3  ">
                    <img src={humidity_icon} alt="" className="mt-2" />
                    <div className="text-2xl font-normal">
                        <div className="humidity">0%</div>
                        <div className="text-sm font-normal">Humidity</div>
                    </div>
                </div>
                <div className="m-auto flex items-start gap-3 ">
                    <img src={wind_icon} alt="" className="mt-2" />
                    <div className="text-2xl font-normal">
                        <div className="wind">0 km/h</div>
                        <div className="text-sm font-normal">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
