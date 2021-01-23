import React from 'react';
import Paper from '@material-ui/core/Paper';
import '../App.css';

const TopForecast = ({ day, temp_min, temp_max, desc, icon, highlight }) => {
	return (
		<div className="topforecast__div">
			<Paper elevation={1} className={highlight ? highlight : 'topforecast'} style={{ padding: '20px' }}>
				<h4 className="topforecast_day">{day}</h4>
				<div>
					{temp_max}º<span> </span>
					{temp_min}º
				</div>

				<img src={icon} />
				<div>{desc}</div>
			</Paper>
		</div>
	);
};

export default TopForecast;
