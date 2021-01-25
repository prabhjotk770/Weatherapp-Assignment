import React, { useState, useEffect } from 'react';
import '../App.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SendIcon from '@material-ui/icons/Send';
import MyChart from './Chart';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Cardtopforecast from './Cardtopforecast';
import ContentLoader from 'react-content-loader';

const Forecast = () => {
	const [responseObj, setResponseObj] = useState({});
	const [city, setCity] = useState('Delhi');
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [temp, setTemp] = useState([]);
	const [hour, setHour] = useState([]);
	const [citySearch] = useState([
		{ title: 'Delhi' },
		{ title: 'Mumbai' },
		{ title: 'Hyderabad' },
		{ title: 'Bangalore' },
		{ title: 'Andaman and Nicobar Islands' },
		{ title: 'Andhra Pradesh' },
		{ title: 'Arunachal Pradesh' },
		{ title: 'Assam' },
		{ title: 'Bihar' },
		{ title: 'Chandigarh' },
		{ title: 'Chhattisgarh' },
		{ title: 'Dadra and Nagar Haveli' },
		{ title: 'Daman and Diu' },

		{ title: 'Goa' },
		{ title: 'Gujarat' },
		{ title: 'Haryana' },
		{ title: 'Himachal Pradesh' },
		{ title: 'Jammu and Kashmir' },
		{ title: 'Jharkhand' },
		{ title: 'Karnataka' },
		{ title: 'Kerala' },
		{ title: 'Ladakh' },
		{ title: 'Lakshadweep' },
		{ title: 'Madhya Pradesh' },
		{ title: 'Maharashtra' },
		{ title: 'Manipur' },
		{ title: 'Meghalaya' },
		{ title: 'Mizoram' },
		{ title: 'Nagaland' },
		{ title: 'Odisha' },
		{ title: 'Puducherry' },
		{ title: 'Punjab' },
		{ title: 'Rajasthan' },
		{ title: 'Sikkim' },
		{ title: 'Tamil Nadu' },

		{ title: 'Tripura' },
		{ title: 'Uttar Pradesh' },
		{ title: 'Uttarakhand' },
		{ title: 'West Bengal' },
	]);
	//FETCHING API

	useEffect(() => {
		setChartData({
			options: {
				chart: {
					zoom: {
						enabled: true,
						type: 'x',
						resetIcon: {
							offsetX: -10,
							offsetY: 0,
							fillColor: '#fff',
							strokeColor: '#37474F',
						},
						selection: {
							background: '#90CAF9',
							border: '#0D47A1',
						},
					},
				},
				xaxis: {
					categories: hour,
				},
			},
			series: [
				{
					name: 'series-1',
					data: temp,
				},
			],
		});
	}, [city]);

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
				setTemp(temperature);
				setHour(hour);
				setLoading(true);
				setChartData({
					options: {
						chart: {
							id: 'basic-bar',
							toolbar: {
								show: true,
								tools: {
									download: false,

									selection: false,

									zoomin: true,
									zoomout: true,
									pan: false,
									reset: false,
								},
							},
						},
						markers: {
							size: 4,
						},
						xaxis: {
							categories: hour,
						},
					},

					series: [
						{
							name: 'series-1',
							data: temperature,
						},
					],
				});
			})
			.catch((err) => {
				alert('City not found!, Please enter correct name');
			});
		setLoading(true);
	};
	console.log(temp);
	console.log(hour);
	let cityname = '';

	//To get Forecast

	const getForecast = (e) => {
		//e.preventDefault();
		cityname.length > 2 && setCity(cityname);
		fetchApi();
	};
	console.log('$$', responseObj);

	//Kelvin to celsius conversion

	const getCelsius = (a) => {
		let b = parseFloat(a);
		b = b - 273.15;
		return b.toFixed(2);
	};

	//Auto search

	const handleOnSearch = (string, results) => {
		cityname = string;
		console.log(string, results);
	};

	useEffect(() => {
		getForecast();
	}, [city]);
	const handleOnSelect = (item) => {
		// the item selected
		let name = item;
		setCity(name.title);

		console.log('??', name);
	};
	console.log('kk', city);

	const handleOnFocus = () => {
		console.log('Focused');
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<div style={{ margin: '20px' }}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div style={{ padding: '10px' }}>
						<LocationOnIcon />
					</div>
					<div style={{ width: 300 }} className="forecast">
						<ReactSearchAutocomplete
							items={citySearch}
							onSearch={handleOnSearch}
							onSelect={handleOnSelect}
							onFocus={handleOnFocus}
							fuseOptions={{ keys: ['title'] }}
							autoFocus
							resultStringKeyName="title"
							styling={{ zIndex: 2, color: 'black' }}
							placeholder={city}
						/>
					</div>
					<div style={{ padding: '10px' }} className="sendicon">
						<SendIcon onClick={getForecast} />
					</div>
				</div>
			</div>

			{loading ? (
				Object.keys(responseObj, chartData).length !== 0 && (
					<div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className="topCard">
								<Cardtopforecast responseObj={responseObj} />
							</div>
						</div>

						<div className="chart">
							<MyChart
								data={chartData}
								response={responseObj}
								temp={getCelsius(responseObj.list[0].main.temp)}
								icon={`http://openweathermap.org/img/w/${responseObj.list[0].weather[0].icon}.png`}
								humidity={responseObj.list[0].main.humidity}
								pressure={responseObj.list[0].main.pressure}
								sunrise={responseObj.city.sunrise}
								sunset={responseObj.city.sunset}
								options={chartData.options}
								series={chartData.series}
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
