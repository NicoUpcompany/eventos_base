import React, { useState, useEffect } from 'react';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Slider from "react-slick";

import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';
import { visitApi, publicIpApi } from '../../../api/stats';

import trama from '../../../assets/img/trama.mp4';
import logo from '../../../assets/img/up.png';
import upcompany from '../../../assets/img/logos/1.png';
import colaboradores from '../../../assets/img/logos/2.png';
import colaboradoresM from '../../../assets/img/logos/2m.png';
import Expositor1 from '../../../assets/img/speakers/s1.jpg';
import Expositor2 from '../../../assets/img/speakers/s2.jpg';
import Expositor3 from '../../../assets/img/speakers/s3.jpg';
import Expositor4 from '../../../assets/img/speakers/s4.jpg';
import Expositor5 from '../../../assets/img/speakers/s5.jpg';
import Expositor6 from '../../../assets/img/speakers/s6.jpg';
import Expositor7 from '../../../assets/img/speakers/s7.jpg';
import Expositor8 from '../../../assets/img/speakers/s8.jpg';

const Register = () => {
	const expositor1Style = {
        backgroundImage: `url(${Expositor1}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor2Style = {
        backgroundImage: `url(${Expositor2}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor3Style = {
        backgroundImage: `url(${Expositor3}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor4Style = {
        backgroundImage: `url(${Expositor4}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor5Style = {
        backgroundImage: `url(${Expositor5}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor6Style = {
        backgroundImage: `url(${Expositor6}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor7Style = {
        backgroundImage: `url(${Expositor7}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };
    const expositor8Style = {
        backgroundImage: `url(${Expositor8}) center center no-repeat`,
        backgroundSize: 'cover',
        paddingRight: '0px',
        paddingLeft: '0px'
    };

	const [inputs, setInputs] = useState({
        fullName:'',
        email:'',
        enterprise: '',
        position: ''
    });
    const [formValid, setFormValid] = useState({
        fullName:false,
        email:false,
        enterprise: false,
        position: false
    });
	const[loading, setLoading] = useState(false);
	const [userID, setUserID] = useState('');
	const [registerForm, setRegisterForm] = useState(false);

	useEffect(() => {
        if (registerForm) {
            getPublicData('Registro');
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
                    if (action === 'Registro') {
                        data = {
                            conexionType,
                            page: '/registro',
                            action: action,
                            country: response.geoplugin_countryName,
                            userId: userID
                        }
                    } else {
                        data = {
                            conexionType,
                            page: '/registro',
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
                window.location.href = "/confirmacion";
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
            if (action === 'Registro') {
                data = {
                    conexionType,
                    page: '/registro',
                    action: action,
                    country: 'Unknown',
                    userId: userID
                }
            } else {
                data = {
                    conexionType,
                    page: '/registro',
                    action: action,
                    country: 'Unknown',
                    userId: null
                }
            }
            visitApi(data);
            if (registerForm) {
                window.location.href = "/confirmacion";
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

        if(type === "text") {
            setFormValid({
				...formValid,
				[name]: minLengthValidation(e.target, 2)
			});
        }
	};
	
	const register = async () => {
		setLoading(true);
		const fullNameVal = inputs.fullName;
        const emailVal = inputs.email;
        const positionVal = inputs.position;
        const enterpriseVal = inputs.enterprise;
        const fullNameFormVal = formValid.fullName;
        const emailFormVal = formValid.email;
        const positionFormVal = formValid.position;
		const enterpriseFormVal = formValid.enterprise;
		
		if ( !fullNameVal || !emailVal || !positionVal || !enterpriseVal ) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
            setLoading(false);
        } else if (!fullNameFormVal ) {
            notification['error']({
                message: "Nombre no válido"
            });
			setLoading(false);
		} else if (!emailFormVal ) {
            notification['error']({
                message: "Correo incorrecto"
            });
            setLoading(false);
        } else if (!enterpriseFormVal ) {
            notification['error']({
                message: "Empresa no válida"
            });
            setLoading(false);
        } else if (!positionFormVal ) {
            notification['error']({
                message: "Cargo no válido"
            });
            setLoading(false);
        }  else {
			const result = await signUpApi(inputs);
			if (!result.ok) {
				notification["error"]({
					message: result.message
				});
				setLoading(false);
			} else {
				setUserID(result.userId);
				setRegisterForm(true);
				localStorage.setItem('userId', result.userId);
			}
		}
	};
	
    const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#F511FF' }} spin />;

    const settings = {
    	autoplaySpeed: 5000,
    	autoplay: true,
		dots: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
    };
	
    return ( 
		<Spin spinning={loading} size="large" tip="Cargando..." style={{color: '#F511FF'}} indicator={antIcon}>
			<div className="fondo">
				<div className="contenedorRegistro">
					<video src={trama} width="100%" autoPlay loop muted />
					<div className="row">
						<div className="form">
							<img src={logo} alt="logo" />
							<h1>Registro</h1>
							<span style={{fontWeight: 'bold'}}>Jueves 17 Diciembre de 2020 - 9:30 a 12:00 hrs.</span>
							<div className="card">
								<form onChange={changeForm} onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); register(); }}>
									<div className="campo">
										<input 
											type="text"
											placeholder="Nombre y Apellido"
											name="fullName"
											onChange={inputValidation}
                                			value={inputs.fullName}
										/>
									</div>
									<div className="campo">
										<input
											type="email"
											placeholder="Email"
											name="email"
											onChange={inputValidation}
                                			value={inputs.email}
										/>
									</div>
									<div className="campo">
										<input 
											type="text"
											placeholder="Empresa"
											name="enterprise"
											onChange={inputValidation}
                                			value={inputs.enterprise}
										/>
									</div>
									<div className="campo">
										<input
											type="text"
											placeholder="Cargo"
											name="position"
											onChange={inputValidation}
                                			value={inputs.position}
										/>
									</div>
									<div className="campobutton">
										<button style={{cursor: 'pointer'}}>¡Regístrate!</button>
									</div>
									<a href="/" style={{marginTop:'10px', float:'left',width:'100%'}}>Ya estoy registrado</a>

								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="colaboradores">
				<div className="contenedor">
					<div className="line">
						<span>Una <strong>Iniciativa</strong> de:</span> 
						<div className="logo"><img src={upcompany} alt="upcompany" width="100px"/></div>
					</div>
					<div className="line">
						<span>En <strong>Colaboración</strong> Con:</span>
						<div className="img desktop tablet"><img src={colaboradores} alt="colaboradores" width="100%"/></div>
						<div className="img movil"><img src={colaboradoresM} alt="colaboradoresM" width="100%"/></div>
					</div>
				</div>
			</div>
			
			
			<div className="speakers">
				<div className="contenedor-slick">
	                <div className="titulo">
	                    <h1>Speakers</h1>
	                </div>
	                <div className="cols">

	                	<Slider {...settings}>

		                    <div className="col" style={expositor1Style}>
		                        <div className="img"><img src={Expositor1} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Felipe Vidal</div>
		                                <div className="cargo cursor-text">Periodista</div>
		                                <span className="cursor-text"><strong>Moderador</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor2Style}>
		                        <div className="img"><img src={Expositor2} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Cristián Aguayo</div>
		                                <div className="cargo cursor-text">Co - Founder & CEO</div>
		                                <span className="cursor-text"><strong>UpCompany</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor3Style}>
		                        <div className="img"><img src={Expositor3} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Marco Zúñiga</div>
		                                <div className="cargo cursor-text">Socio y Director de <strong>UpWebinar</strong>, Director Ejecutivo de <strong>Chiletec</strong> y Director de <strong>Kodea</strong></div>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor4Style}>
		                        <div className="img"><img src={Expositor4} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Excequiel Matamala</div>
		                                <div className="cargo cursor-text">Director</div>
		                                <span className="cursor-text"><strong>Centro Ciberseguridad ACTI</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor5Style}>
		                        <div className="img"><img src={Expositor5} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Nora Santillán</div>
		                                <div className="cargo cursor-text">Directora Eventos</div>
		                                <span className="cursor-text"><strong>UpCompany</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor6Style}>
		                        <div className="img"><img src={Expositor6} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Sofía Frascaroli Cottet</div>
		                                <div className="cargo cursor-text">Gerente Marketing y Transformación Digital </div>
		                                <span className="cursor-text"><strong>Seguros Sura</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor7Style}>
		                        <div className="img"><img src={Expositor7} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Lorena Olave</div>
		                                <div className="cargo cursor-text">Brand Manager</div>
		                                <span className="cursor-text"><strong>Mercado Webai</strong></span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col" style={expositor8Style}>
		                        <div className="img"><img src={Expositor8} alt="expositor" width="100%" /></div>
		                        <div className="caption">
		                            <div className="content">
		                                <div className="line"></div><br />
		                                <div className="name cursor-text">Francisca Muñoz</div>
		                                <div className="cargo cursor-text">Subgerente de Marketing, Formación Ejecutiva</div>
		                                <span className="cursor-text"><strong>DF</strong></span>
		                            </div>
		                        </div>
		                    </div>

	                    </Slider>

	                </div>
	            </div>
            </div>
            
		</Spin>
	);
}
 
export default Register;