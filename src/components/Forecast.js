import React, { useState, useEffect } from 'react';
import TopForecast from './TopForecast';
import '../App.css';
import { Card } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Chart from './Chart';
import Moment from 'react-moment';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import ContentLoader from 'react-content-loader';

const Forecast = () => {
	let [responseObj, setResponseObj] = useState({});
	let [city, setCity] = useState('delhi');
	const [chartData, setChartData] = useState({});
	const [temp, setTemp] = useState([]);
	const [hours, setHours] = useState([]);
	const [loading, setLoading] = useState(false);
	const [citySearch, setCitySearch] = useState([
		{ name: 'delhi', temp: '15' },
		{ name: 'mumbai', temp: '25' },
		{ name: 'dehradun', temp: '10' },
		{ name: 'hyderabad', temp: '25' },
		{ name: 'chennai', temp: '35' },
	]);

	//FETCHING API

	useEffect(() => {
		fetchApi();
	}, []);

	const fetchApi = () => {
		let hour = [];
		let temperature = [];
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4590479b57a147c925d75522bad68d1d`, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((response) => {
				setResponseObj(response);
				for (const dataObj of response.list) {
					hour.push(dataObj.dt_txt.substring(11, 16));
					temperature.push(getCelsius(dataObj.main.temp));
				}
				hour.length -= 30;
				temperature.length -= 30;
				setChartData({
					labels: hour,
					temperature,
					datasets: [
						{
							label: 'temp',
							data: temperature,
							backgroundColor: ['white'],

							borderColor: 'blue',
							pointBackgroundColor: 'white',
						},
					],
				});
			});
		setLoading(true);
		setTemp(temperature);
		setHours(hour);
	};

	console.log('##', temp);
	console.log('$$', hours);

	const getForecast = (e) => {
		e.preventDefault();
		fetchApi();
	};
	console.log('33', responseObj);

	//Kelvin to celsius conversion

	const getCelsius = (a) => {
		let b = parseFloat(a);
		b = b - 273.15;
		return b.toFixed(2);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<div style={{ margin: '20px' }}>
				<Card className="forecast">
					<form onSubmit={getForecast} className="forecast__form">
						<LocationOnIcon />
						<input
							type="text"
							placeholder="Enter City"
							maxLength="50"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							className="forecast_input"
						/>
						{/* <Autocomplete
							id="combo-box-demo"
							options={citySearch}
							getOptionLabel={(option) => option.name}
							style={{ width: 300 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Enter City"
									variant="outlined"
									onChange={(e) => setCity(e.target.value)}
								/>
							)}
							onSelect={getForecast}
						/> */}
						<SearchIcon />
					</form>
				</Card>
			</div>

			{loading ? (
				Object.keys(responseObj).length != 0 && (
					<div>
						<div className="chart">
							<TopForecast
								highlight="topforecast_highlight"
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[0].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[0].main.temp_min)}
								temp_max={getCelsius(responseObj.list[0].main.temp_max)}
								desc={responseObj.list[0].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[0].weather[0].icon}.png`}
							/>
							<TopForecast
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[8].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[8].main.temp_min)}
								temp_max={getCelsius(responseObj.list[8].main.temp_max)}
								desc={responseObj.list[8].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[8].weather[0].icon}.png`}
							/>
							<TopForecast
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[16].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[16].main.temp_min)}
								temp_max={getCelsius(responseObj.list[16].main.temp_max)}
								desc={responseObj.list[16].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[16].weather[0].icon}.png`}
							/>
							<TopForecast
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[24].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[24].main.temp_min)}
								temp_max={getCelsius(responseObj.list[24].main.temp_max)}
								desc={responseObj.list[24].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[24].weather[0].icon}.png`}
							/>
							<TopForecast
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[32].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[32].main.temp_min)}
								temp_max={getCelsius(responseObj.list[32].main.temp_max)}
								desc={responseObj.list[32].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[32].weather[0].icon}.png`}
							/>
							<TopForecast
								responseObj={responseObj}
								day={<Moment format="ddd">{responseObj.list[39].dt_txt}</Moment>}
								temp_min={getCelsius(responseObj.list[39].main.temp_min)}
								temp_max={getCelsius(responseObj.list[39].main.temp_max)}
								desc={responseObj.list[39].weather[0].description}
								icon={`http://openweathermap.org/img/w/${responseObj.list[39].weather[0].icon}.png`}
							/>
						</div>

						<div className="chart">
							<Chart
								data={chartData}
								response={responseObj}
								temp={getCelsius(responseObj.list[0].main.temp)}
								icon={`http://openweathermap.org/img/w/${responseObj.list[0].weather[0].icon}.png`}
								humidity={responseObj.list[0].main.humidity}
								pressure={responseObj.list[0].main.pressure}
								sunrise={responseObj.city.sunrise}
								sunset={responseObj.city.sunset}
							/>
						</div>
					</div>
				)
			) : (
				<ContentLoader />
			)}
		</div>
	);
};

export default Forecast;
