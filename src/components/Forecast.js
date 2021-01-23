import React, { useState, useEffect } from 'react';

import '../App.css';
import { Card } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Chart from './Chart';

import Cardtopforecast from './Cardtopforecast';
import ContentLoader from 'react-content-loader';

const Forecast = () => {
	const [responseObj, setResponseObj] = useState({});
	const [city, setCity] = useState('delhi');
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);

	//FETCHING API

	useEffect(() => {
		fetchApi();
	}, []);

	const fetchApi = (async) => {
		let hour = [];
		let temperature = [];
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83e95765618bc73e8530510647bf5373`, {
			method: 'GET',
			key: '',
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
							data: temperature,
							backgroundColor: ['white'],

							borderColor: 'blue',
							pointBackgroundColor: 'white',
						},
					],
				});
			})
			.catch((err) => alert('City not found!, Please enter correct name'));
		setLoading(true);
	};

	//onsubmit form

	const getForecast = (e) => {
		e.preventDefault();
		fetchApi();
	};
	console.log('$$', responseObj);

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

						<SearchIcon />
					</form>
				</Card>
			</div>

			{loading ? (
				Object.keys(responseObj).length !== 0 && (
					<div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className="topCard">
								<Cardtopforecast responseObj={responseObj} />
							</div>
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
