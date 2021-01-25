import React from 'react';

import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import '../App.css';
import sun from '../assets/sunrise.png';
import Chart from 'react-apexcharts';

function MyChart({ data, temp, icon, humidity, pressure, sunrise, sunset, options, series }) {
	return (
		<div>
			<Paper elevation={3}>
				<div className="chart__top">
					<h2 className="chart__head">{temp} ºC</h2>
					<img className="chart__head" src={icon} alt="icon" />
				</div>
				<div>
					<div className="chart__wrapper">
						<Chart className="char__line" options={options} series={series} type="line" />
					</div>
				</div>

				<div className="chart__humidity">
					<div className="chart__humid__head">
						Pressure<div>{pressure} hpa</div>
					</div>
					<div className="chart__humid__head">
						Humidity<div>{humidity}%</div>
					</div>
				</div>
				<div className="chart__sunrise">
					<div style={{ fontWeight: '700' }}>
						Sunrise
						<div style={{ fontWeight: '600', color: 'grey' }}>
							<Moment format="hh:mm">{sunrise}</Moment>
							am
						</div>
					</div>
					<div style={{ fontWeight: '700' }}>
						Sunset
						<div style={{ fontWeight: '600', color: 'grey' }}>
							<Moment format="hh:mm">{sunset}</Moment>
							pm
						</div>
					</div>
				</div>
				<div>
					<img src={sun} alt="sunrise" height="100%" width="100%" />
				</div>
			</Paper>
		</div>
	);
}
export default MyChart;
