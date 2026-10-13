//weather api 

const fetchweatherapi = async () => {
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}");
    const data = await res.json();
}
