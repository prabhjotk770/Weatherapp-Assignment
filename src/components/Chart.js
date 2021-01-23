import React from 'react';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import '../App.css';
import sun from '../assets/sunrise.png';

function Chart({ data, temp, icon, humidity, pressure, sunrise, sunset }) {
	return (
		<div>
			<Paper elevation={3}>
				<div className="chart__top">
					<h2 className="chart__head">{temp} ºC</h2>
					<img className="chart__head" src={icon} />
				</div>
				<div>
					<Line
						className="char__line"
						data={data}
						options={{
							responsive: true,

							scales: {
								yAxes: [
									{
										ticks: {
											autoSkip: true,
											maxTicksLimit: 10,
											beginAtZero: true,
										},
										gridLines: {
											display: false,
										},
									},
								],
								xAxes: [
									{
										gridLines: {
											display: true,
										},
									},
								],
							},
						}}
					/>
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
export default Chart;
