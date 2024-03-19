/* eslint-disable @typescript-eslint/no-unused-vars */
type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type Main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_min: number;
  temp_max: number;
};

type Wind = {
  deg: number;
  speed: number;
};

type Sys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
};

type WeatherData = {
  base?: string;
  clouds?: {
    all: number;
  };
  cod?: number;
  coord?: {
    lon: number;
    lat: number;
  };
  dt?: number;
  id?: number;
  main?: Main;
  name?: string;
  sys?: Sys;
  timezone?: number;
  visibility?: number;
  weather?: Weather[];
  wind?: Wind;
};

const Weather = ({ weatherData }: { weatherData: WeatherData }) => {
  console.log(weatherData);
  let date;
  if (weatherData.dt) {
    date = new Date(weatherData.dt * 1000);
  }
  let dayOfWeek, day, month;
  if (date) {
    dayOfWeek = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ][date.getDay()];
    day = date.getDate();
    month = date.getMonth() + 1;
    month = month.toString().padStart(2, "0");
  }

  const formattedDate = `${dayOfWeek}, ${day}/${month}`; // formata a data

  return (
    <div>
      {weatherData.weather ? (
        <div
          className="w-[500px] h-[300px] shadow-lg rounded-xl m-auto relative px-6 top-[10%]"
          style={{
            backgroundColor: "rgba(236, 236, 236, 0.5)",
            backdropFilter: "blur(100px)",
          }}
        >
          <div className="flex justify-between w-full">
            <div
              className="w-1/2 my-4 mx-auto flex 
            justify-between items-center "
            >
              <div
                className="flex flex-col items-start 
              justify-between h-full"
              >
                <div>
                  <p className="text-2xl text-start">
                    {weatherData.name}, {weatherData.sys?.country}
                  </p>
                  <p className="text-xs text-start">{formattedDate}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-8xl font-semibold text-start text-black/80">
                    {weatherData.main?.temp.toFixed()}°
                  </h1>
                  <p className="text-sm text-start">
                    {weatherData.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      weatherData.weather[0].description.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between items-end ">
              <div className="relative">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt=""
                  className="w-[120px]"
                />
              </div>
              {weatherData.name !== undefined ? (
                <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs">
                  <div className="flex justify-between gap-x-8">
                    <p className="">Máxima e mínima</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.main?.temp_max.toFixed()} ° / <span></span>
                      {weatherData.main?.temp_min.toFixed()} °
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="">Sensação térmica de</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.main?.feels_like.toFixed()} °
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="">Umidade</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.main?.humidity} %
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="">Vento</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.wind?.speed.toFixed()} km/h
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="">Nascer do Sol</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.sys?.sunrise
                        ? new Date(
                            weatherData.sys.sunrise * 1000
                          ).toLocaleTimeString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="">Pôr do Sol</p>
                    <p className="text-start font-bold w-20">
                      {weatherData.sys?.sunset
                        ? new Date(
                            weatherData.sys.sunset * 1000
                          ).toLocaleTimeString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
