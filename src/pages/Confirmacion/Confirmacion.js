/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import AppleIcon from '@material-ui/icons/Apple';

import { visitApi, publicIpApi } from '../../api/stats';

import logo from '../../assets/img/up.png';
import logo2 from '../../assets/img/up2.png';
import calendario from '../../assets/img/calendario.png';
import reloj from '../../assets/img/reloj.png';
import calendar from '../../assets/img/googlecalendar.png';
import outlook from '../../assets/img/outlook.png';

const Confirmacion = () => {

    useEffect(() => {
        getPublicData('pageView');
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getPublicData = async (action) => {
        try {
            const resp = await publicIpApi();
            const IP = resp.ip;
            const CorsAnyWhereUrl = 'https://cors-anywhere.herokuapp.com/';
            const GeoPluginUrl =  "http://www.geoplugin.net/json.gp?ip=";
            const xhttp = new XMLHttpRequest();
            let response;
            xhttp.onreadystatechange = function() {
                const respuesta = this.responseText;
                response = JSON.parse(respuesta);
                
                if (this.readyState === 4 && this.status === 200) {
                    const device = navigator.userAgent;
                    let conexionType = '';
                    if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
                        conexionType = 'MOBILE';
                    } else {
                        conexionType = 'DESKTOP';
                    }
                    const data = {
                        conexionType,
                        page: '/confirmacion',
                        action: action,
                        country: response.geoplugin_countryName,
                        userId: localStorage.getItem('userId')
                    };
                    visitApi(data);
                }
            };
            xhttp.open("GET", CorsAnyWhereUrl + GeoPluginUrl + IP , true);
            xhttp.send();
        } catch (error) {
            const device = navigator.userAgent;
            let conexionType = '';
            if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
                conexionType = 'MOBILE';
            } else {
                conexionType = 'DESKTOP';
            }
            const data = {
                conexionType,
                page: '/confirmacion',
                action: action,
                country: 'Unknown',
                userId: localStorage.getItem('userId')
            }
            visitApi(data);
        }
        
    }
    const SalaEspera = () => {
        window.location.href = "/";
    }
    const abrirCerrar = () => {
        let doc = document.getElementById("opciones");
        if(doc.style.height=='0px'){
            doc.style.height='auto'
            doc.style.transitionDuration ='1s'
        }else{
            doc.style.height='0px'
            doc.style.transitionDuration ='1s'
        }
    }
    const abrirOutlook = () => {
        const url = "https://upwebinar.cl/mailing/upcompany/upwebinar.ics";
        window.open(url,'_blank')
    }
    const abrirGoogleCalendar = () => {
        const url = "https://www.google.com/calendar/render?action=TEMPLATE&text=Presente%20y%20futuro%20de%20los%20eventos%20digitales&dates=20201217T120000Z%2F20201217T140000Z&details=https%3A%2F%2Ftalks.upwebinar.cl&location=https%3A%2F%2Ftalks.upwebinar.cl";
        window.open(url,'_blank')
    }
    return ( 
        <>
            <div className="fondo">
                <div className="contenedorConfirmacion">
                    <div className="row">
                        <img src={logo} alt="logo" />
                        <h2>¡Genial! ya estás registrado para el evento</h2>
                        <div className="card">
                            <div className="letras">
                                <div>
                                    <img src={calendario} alt="calendario" />
                                    <span>Jueves 17 de Diciembre de 2020</span>
                                </div>
                                <div>
                                    <img src={reloj} alt="reloj" />
                                    <span>09:00 a 11:00 hrs</span>
                                </div>
                            </div>
                            <div className="boton">
                                <button onClick={abrirCerrar}>Agregar a mi calendario</button>

                                <div className="opciones" id="opciones">
                                  <button onClick={abrirOutlook}> <AppleIcon className="icon"/>   Apple Calendar </button>      
                                  <button onClick={abrirGoogleCalendar}> <img src={calendar} alt="calendar" className="icon"/>   Google Calendar </button>      
                                  <button onClick={abrirOutlook}> <img src={outlook} alt="outlook" className="icon"/>   Outlook </button>      
                                </div>
                            </div>
                        </div>
                        <div className="card2">
                            <div>
                                <span>Link de ingreso:</span>
                                <input type="text" placeholder="Link de ingreso" defaultValue="https://talks.upwebinar.cl/" />
                            </div>
                            <div className="boton" >
                                <button onClick={() => SalaEspera()}>Ingresar a sala</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="enlaces">
                        <a>¿Cómo comprar?</a>
                        <a>Políticas de privacidad</a>
                        <a>Términos y condiciones</a>
                    </div>
                    <div>
                        <img src={logo2} alt="logo2" />
                    </div>
                </div>
            </div>
        </> 
    );
}
 
export default Confirmacion;