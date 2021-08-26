import React, {useEffect} from 'react'
import { getTimeGlobal2 } from '../../api/time';
import $ from 'jquery';


const Cronometro = () => {

    	const getTime2 = async (interval) => {
		try{
			const resp = await getTimeGlobal2();
			const timeApi = new Date(resp.time).valueOf();
			$('.cronometro').each(function(){
				const $this = $(this);
                let now = timeApi;
                const countDownDate = new Date().valueOf()+5000;
				interval = setInterval(function() {
					const distance = countDownDate - now;
					const days_t = Math.floor(distance / (1000 * 60 * 60 * 24));
					const hours_t = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes_t = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					const seconds_t = Math.floor((distance % (1000 * 60)) / 1000);
					let days, m1, m2, hours, minutes, seconds;
					if (days_t < 10) {
						days = '0'+days_t;
					} else {
						m1 = String(days_t).substring(0, 1);
						m2 = String(days_t).substring(1, 2);
						days = m1+m2;
					}
					if (hours_t < 10) {
						hours = '0'+hours_t;
					} else {
						m1 = String(hours_t).substring(0, 1);
						m2 = String(hours_t).substring(1, 2);
						hours = m1+m2;
					}
					if (minutes_t < 10) {
						minutes = '0'+minutes_t;
					} else {
						m1 = String(minutes_t).substring(0, 1);
						m2 = String(minutes_t).substring(1, 2);
						minutes = m1+m2;
					}
					if (seconds_t < 10) {
						seconds = '0'+seconds_t;
					} else {
						m1 = String(seconds_t).substring(0, 1);
						m2 = String(seconds_t).substring(1, 2);
						seconds = m1+m2;
					}
					$this.empty();
					if (countDownDate > now) {
						$this.append("<div><h1>"+days+"</h1><span>Días</span></div>");
						$this.append("<div><h1>"+hours+"</h1><span>Horas</span></div>");
						$this.append("<div><h1>"+minutes+"</h1><span>Minutos</span></div>");
						$this.append("<div><h1>"+seconds+"</h1><span>Segundos</span></div>");
						
					} else {
						clearInterval(interval);
					}
					now = now + 1000;
				}, 1000);
			});
		}catch(exception){
			console.log(exception);
		}
	}

	useEffect(() => {
		let interval;
		getTime2(interval);
	}, [])
    return (
        
        <div className="cronometro">
            <div>
                <h1>01</h1>
                <span>Día</span>
            </div>
            <div>
                <h1>01</h1>
                <span>Hora</span>
            </div>
            <div>
                <h1>01</h1>
                <span>Minutos</span>
            </div>
            <div>
                <h1>01</h1>
                <span>Segundos</span>
            </div>
        </div>
    )
}

export default Cronometro
