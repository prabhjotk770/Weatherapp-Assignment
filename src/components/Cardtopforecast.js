import React from 'react';
import Moment from 'react-moment';
import TopForecast from './TopForecast';

const Cardtopforecast = ({ responseObj }) => {
	//Kelvin to celsius conversion

	const getCelsius = (a) => {
		let b = parseFloat(a);
		b = b - 273.15;
		return b.toFixed(2);
	};
	return (
		<div className="chart">
			<TopForecast
				highlight="topforecast_highlight"
				day={<Moment format="ddd">{responseObj.list[0].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[0].main.temp_min)}
				temp_max={getCelsius(responseObj.list[0].main.temp_max)}
				desc={responseObj.list[0].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[0].weather[0].icon}.png`}
			/>
			<TopForecast
				day={<Moment format="ddd">{responseObj.list[8].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[8].main.temp_min)}
				temp_max={getCelsius(responseObj.list[8].main.temp_max)}
				desc={responseObj.list[8].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[8].weather[0].icon}.png`}
			/>
			<TopForecast
				day={<Moment format="ddd">{responseObj.list[16].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[16].main.temp_min)}
				temp_max={getCelsius(responseObj.list[16].main.temp_max)}
				desc={responseObj.list[16].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[16].weather[0].icon}.png`}
			/>
			<TopForecast
				day={<Moment format="ddd">{responseObj.list[24].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[24].main.temp_min)}
				temp_max={getCelsius(responseObj.list[24].main.temp_max)}
				desc={responseObj.list[24].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[24].weather[0].icon}.png`}
			/>
			<TopForecast
				day={<Moment format="ddd">{responseObj.list[32].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[32].main.temp_min)}
				temp_max={getCelsius(responseObj.list[32].main.temp_max)}
				desc={responseObj.list[32].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[32].weather[0].icon}.png`}
			/>
			<TopForecast
				day={<Moment format="ddd">{responseObj.list[39].dt_txt}</Moment>}
				temp_min={getCelsius(responseObj.list[39].main.temp_min)}
				temp_max={getCelsius(responseObj.list[39].main.temp_max)}
				desc={responseObj.list[39].weather[0].description}
				icon={`http://openweathermap.org/img/w/${responseObj.list[39].weather[0].icon}.png`}
			/>
		</div>
	);
};
export default Cardtopforecast;
