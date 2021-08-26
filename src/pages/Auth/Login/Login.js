import React, { useEffect, useState } from 'react';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import $ from 'jquery';
import { CometChat } from "@cometchat-pro/chat";
import jwtDecode from 'jwt-decode';

import { emailValidation } from '../../../utils/formValidation';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import { COMETCHAT_CONSTANTS } from '../../../consts';
import { signInApi } from '../../../api/user';
import { getTimeGlobal2 } from '../../../api/time';
import { visitApi, publicIpApi } from '../../../api/stats';

import trama from '../../../assets/img/trama.mp4';
import logo from '../../../assets/img/up.png';

const Login = () => {

	const [inputs, setInputs] = useState({
        // fullName:'',
        email:''
    });
    const [formValid, setFormValid] = useState({
        // fullName:false,
        email:false
    });
	const[loading, setLoading] = useState(false);
	const [userID, setUserID] = useState('');
	const [registerForm, setRegisterForm] = useState(false);

    useEffect(() => {
        if (registerForm) {
            getPublicData('Inicio sesión');
        } else {
            getPublicData('pageView');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [registerForm]);
	
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
                    let data;
                    if (action === 'Inicio sesión') {
                        data = {
                            conexionType,
                            page: '/iniciarsesion',
                            action: action,
                            country: response.geoplugin_countryName,
                            userId: userID
                        }
                    } else {
                        data = {
                            conexionType,
                            page: '/iniciarsesion',
                            action: action,
                            country: response.geoplugin_countryName,
                            userId: null
                        }

                    }
                    visitApi(data);
                }
            };
            xhttp.open("GET", CorsAnyWhereUrl + GeoPluginUrl + IP , true);
            xhttp.send();
            if (registerForm) {
                window.location.href = "/streaming";
            }
        } catch (error) {
            const device = navigator.userAgent;
            let conexionType = '';
            if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
                conexionType = 'MOBILE';
            } else {
                conexionType = 'DESKTOP';
            }
            let data;
            if (action === 'Inicio sesión') {
                data = {
                    conexionType,
                    page: '/iniciarsesion',
                    action: action,
                    country: 'Unknown',
                    userId: userID
                }
            } else {
                data = {
                    conexionType,
                    page: '/iniciarsesion',
                    action: action,
                    country: 'Unknown',
                    userId: null
                }
            }
            visitApi(data);
            if (registerForm) {
                window.location.href = "/streaming";
            }
        }
        
    }

	const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
	};
	
	const inputValidation = async e => {
        const { type, name } = e.target;

        if(type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }
	};
	const getTime2 = async (interval) => {
		try{
			const resp = await getTimeGlobal2();
			const timeApi = new Date(resp.time).getTime();
			$('.cronometro').each(function(){
				const $this = $(this);
				let now = timeApi;
				
				interval = setInterval(function() {
					const countDownDate = new Date(resp.eventTime).getTime();
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

	const register = async () => {
		setLoading(true);
        const emailVal = inputs.email;
        const emailFormVal = formValid.email;
		
		if ( !emailVal ) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
            setLoading(false);
		} else if (!emailFormVal ) {
            notification['error']({
                message: "Correo no válido"
            });
            setLoading(false);
        }  else {
			const result = await signInApi(inputs);
			if (!result.ok) {
				notification["error"]({
					message: result.message
				});
				setLoading(false);
			} else {
				const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
                const decodedToken = jwtDecode(accessToken);
				const user = new CometChat.User(decodedToken.id);
                setRegisterForm(true);
				setUserID(decodedToken.id);
                if (decodedToken.email.length > 0) {
                    user.setName(decodedToken.fullName);
                }
                // CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
                //     user => {
                //         setRegisterForm(true);
                //     },error => {
                //         if (error.details.uid[0] === 'The uid has already been taken.') {
                //             CometChat.updateUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
                //                 user => {
                //                     setRegisterForm(true);
                //                 }, error => {
                //                     setRegisterForm(true);
                //                 }
                //             )
                //         } else {
                //             setLoading(false);
                //             notification["error"]({
                //                 message: 'Ocurrió un error'
                //             });
                //         }
                //     }
                // )
			}
		}
	};
	
    const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#F511FF' }} spin />;
	
    return ( 
		<Spin spinning={loading} size="large" tip="Cargando..." style={{color: '#F511FF'}} indicator={antIcon}>
			<div className="fondo">
				<div className="contenedorRegistro">
					<video src={trama} width="100%" autoPlay loop muted />
					<div className="row">
						<div className="form">
							<img src={logo} alt="logo" />
							<h1>Ingresar</h1>
							<span className="login">Jueves 17 Diciembre de 2020 - 9:30 a 12:00 hrs.</span>
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
							<div className="card">
								<form onChange={changeForm} onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); register(); }}>
									{/* <div className="campo">
										<input 
											type="text"
											placeholder="Nombre y Apellido"
											name="fullName"
											onChange={inputValidation}
                                			value={inputs.fullName}
										/>
									</div> */}
									<div className="campo">
										<input
											type="email"
											placeholder="Email"
											name="email"
											onChange={inputValidation}
                                			value={inputs.email}
										/>
									</div>
									<div className="campobutton">
										<button style={{cursor: 'pointer'}}>¡Entra al evento!</button>
									</div>
                                    <a href="/registro" style={{marginTop:'10px', float:'left',width:'100%'}}>Aún no me registro</a>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Spin>
	);
}
 
export default Login;