/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState }  from 'react';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import SendIcon from '@material-ui/icons/Send';
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CometChat } from "@cometchat-pro/chat";
import $ from 'jquery';

import { getAccessTokenApi } from '../../api/auth';
import { visitApi, publicIpApi } from '../../api/stats';
import { updateStreamTimeApi } from '../../api/user';
import { makeQuestionApi } from '../../api/question';
import Df from '../Components/Stands/df';
import Chiletec from '../Components/Stands/chiletec';
import Bizarro from '../Components/Stands/bizarro';
import Wibai from '../Components/Stands/wibai';
import Sura from '../Components/Stands/sura';
import Deyel from '../Components/Stands/deyel';
import Up from '../Components/Stands/up';
import { CometChatUnified } from '../../CometChat';
import { COMETCHAT_CONSTANTS } from '../../consts';
import logo from '../../assets/img/upwebinar.png';
import imagenes from '../../assets/img/imagenes.png';
import logo4 from '../../assets/img/up2.png';
import logo5 from '../../assets/img/bizarro.png';
import logo6 from '../../assets/img/chiletec.png';
import logo7 from '../../assets/img/upcompany.png';
import logo8 from '../../assets/img/sura.png';
import logo9 from '../../assets/img/mercadowibai.png';
import logo12 from '../../assets/img/stand/deyel/logo.jpg';
import logo10 from '../../assets/img/uber.png';
import logo11 from '../../assets/img/df.png';
import imagenmovil from '../../assets/img/imagenmovil.png';
import imagenmovil2 from '../../assets/img/imagenmovil2.png';
import Expositor1 from '../../assets/img/speakers/s1.jpg';
import Expositor2 from '../../assets/img/speakers/s2.jpg';
import Expositor3 from '../../assets/img/speakers/s3.jpg';
import Expositor4 from '../../assets/img/speakers/s4.jpg';
import Expositor5 from '../../assets/img/speakers/s5.jpg';
import Expositor6 from '../../assets/img/speakers/s6.jpg';
import Expositor7 from '../../assets/img/speakers/s7.jpg';
import Expositor8 from '../../assets/img/speakers/s8.jpg';
import opciones from '../../assets/img/opciones.png';
import agrandar from '../../assets/img/agrandar.png';
import cerrar from '../../assets/img/cerrar.png';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import audio from '../../assets/audio/audio.mp3';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {WOW} from 'wowjs';
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";

        
    
const WaitingRoom = () => {
    
    const [user, setUser] = useState();
    const [questionInput, setQuestionInput] = useState('');
    const [token, setToken] = useState();
    const [notifications, setNotifications] = useState(true);
    const [url, setUrl] = useState(true);
    const [updateData, setUpdateData] = useState(0);
    const [standName, setStandName] = useState('');

    useEffect(() => {
        const wow = new WOW();
        wow.init();
		const auxToken = getAccessTokenApi();
		if (auxToken === null) {
			window.location.href = "/iniciarsesion";
		} else {
            const decodedToken = jwtDecode(auxToken);
			if (!decodedToken) {
				window.location.href = "/iniciarsesion";
			} else {
                setUser(decodedToken);
                setToken(auxToken);
                const data = {
                    email: decodedToken.email,
                }
                updateStreamTimeApi(auxToken, data);
				const UID = decodedToken.id;
                const apiKey = COMETCHAT_CONSTANTS.AUTH_KEY;
                const GUID = "chat_general";
                const password = "";
                const groupType = CometChat.GROUP_TYPE.PUBLIC;

				CometChat.login(UID, apiKey).then(
					User => {
                        CometChat.joinGroup(GUID, groupType, password).then(
                            group => {},
                            error => {}
                          );
                    },
					error => {}
				);
			}
		}
    }, []);

    useEffect(() => {
        if (updateData === 0) {
            getPublicData('pageView');
        } else if (updateData === 1) {
            getPublicData('Silenciar notificaciones');
        } else if (updateData === 2) {
            getPublicData('Activar notificaciones');
        } else if (updateData === 3) {
            getPublicData('Enviar pregunta');
        } else if (updateData === 4) {
            getPublicData('Abrir Chat');
        } else if (updateData === 5) {
            getPublicData('Cerrar Chat');
        } else if (updateData === 6) {
            getPublicData('Redirección https://upwebinar.cl/');
        } else if (updateData === 7) {
            getPublicData(`Stand - Sura`);
        } else if (updateData === 8) {
            getPublicData(`Stand - Wibai`);
        } else if (updateData === 9) {
            getPublicData(`Stand - Deyel`);
        } else if (updateData === 10) {
            getPublicData(`Stand - Df`);
        } else if (updateData === 11) {
            getPublicData(`Stand - Bizarro`);
        } else if (updateData === 12) {
            getPublicData(`Stand - Chiletec`);
        } else if (updateData === 13) {
            getPublicData(`Stand - Up`);
        } else {
            getPublicData('pageView');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateData]);

    const getPublicData = async (action) => {
        try {
            const decodedToken = jwtDecode(getAccessTokenApi());
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
                        page: '/streaming',
                        action: action,
                        country: response.geoplugin_countryName,
                        userId: decodedToken.id
                    }
                    visitApi(data);
                }
            };
            xhttp.open("GET", CorsAnyWhereUrl + GeoPluginUrl + IP , true);
            xhttp.send();
        } catch (error) {
            const decodedToken = jwtDecode(getAccessTokenApi());
            const device = navigator.userAgent;
            let conexionType = '';
            if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
                conexionType = 'MOBILE';
            } else {
                conexionType = 'DESKTOP';
            }
            const data = {
                conexionType,
                page: '/streaming',
                action: action,
                country: 'Unknown',
                userId: decodedToken.id
            }
            visitApi(data);
        }
    }

    useEffect(() => {
        $(window).scroll(function(){
            const distanceY = window.pageYOffset || document.documentElement.scrollTop;
            const shrinkOn = 550;
            if(distanceY > shrinkOn){
                $(".transmission").addClass("scroll");
            }else{
                $(".transmission").removeClass("scroll");
            }
        });
    }, []);

    useEffect(() => {
        if (notifications) {
            CometChat.addMessageListener(
                CUSTOMER_MESSAGE_LISTENER_KEY,
                new CometChat.MessageListener({
                    onTextMessageReceived: textMessage => {
                        const newAudio = new Audio(audio);
                        newAudio.play();
                        let message = textMessage.data.text;
                        if (message.length > 25){
                            message = message.substring(0, 25) + '...';
                        }
                        notification["info"]({
                            message: 'Nuevo mensaje',
                            description: message
                        });
                    }
                })
            );
        } else {
            CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
        }
	}, [notifications]);

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

    const OnOffNotifications = () => {
        if (notifications) {
            setUpdateData(1);
        } else {
            setUpdateData(2);
        }
		setNotifications(!notifications);
    }

    const onChange = e => {
        setQuestionInput(e.target.value);
    }

    const sendQuestion = async () => {
        const name = user.fullName;
        const userQuestion = questionInput;
        if (userQuestion.trim() !== '') {
            const data = {
                name,
                question: userQuestion
            };
            const result = await makeQuestionApi( token, data );
            if (!result.ok) {
                notification["error"]({
                    message: result.message
                });
            } else {
                setUpdateData(3);
                notification["success"]({
                    message: result.message
                });
                setQuestionInput("");
            }
        }
    }

    const handleClickAbrir = (id,url) => {
        // var token = getAccessTokenApi();
        // var decodedToken = jwtDecode(token);
        // if (!decodedToken) {
        //     window.location.href = "/iniciarsesion";
        // } 

        // var device = navigator.userAgent;
        // var conexionType = '';
        // if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
        //     conexionType = 'Mobile';
        // } else {
        //     conexionType = 'PC';
        // }
        // var data = {
        //     conexionType,
        //     page: id,
        //     action:'stand',
        //     userId: decodedToken.id
        // }
        
        // visitApi(data);
        
        const doc = document.getElementById(id);
        const doc2 = document.getElementById("fondoStand");
        doc2.style.left = '0px';
        doc.style.right='0px';
        doc.style.transitionDuration='1s';
        doc2.style.transitionDuration='1s';
        const bodi = document.getElementsByTagName("body");
        bodi[0].classList.add('stop');
        console.log(id)
        setUrl(url);
        if (id === 'sura') {
            setUpdateData(7);
        } else if (id === 'wibai') {
            setUpdateData(8);
        } else if (id === 'deyel') {
            setUpdateData(9);
        } else if (id === 'df') {
            setUpdateData(10);
        } else if (id === 'bizarro') {
            setUpdateData(11);
        } else if (id === 'chiletec') {
            setUpdateData(12);
        } else {
            setUpdateData(13);
        }
    }

    const cerrarChat = () => {
        let doc = document.getElementById("col1");
        let doc3 = document.getElementById("open");
        let doc2 = document.getElementById("col2");
        if (doc.style.width === "100%") {
            doc.style.width = "calc(100% - 400px)";
            doc2.style.visibility = "visible";
            doc2.style.opacity = "1";
            doc3.style.transform = 'rotate(360deg)';
            // doc3.style.transitionDuration = '1s';
            doc2.style.width = "400px";
            doc2.style.display = "block";
            setUpdateData(4);
            // doc2.style.transform = "translateX(400%)";
            
        } else {
            doc3.style.transform = 'rotate(180deg)';
            // doc3.style.transitionDuration = '1s';
            doc.style.width = "100%";
            doc2.style.width = "0px";
            doc2.style.visibility = "hidden";
            doc2.style.opacity = "0";
            doc2.style.display = "none";
            setUpdateData(5);
            // doc2.style.transform = "translateX(-400%)";
        }
    }

    const cerrarChat2 = () => {
        // let doc = document.getElementById("col1");
        let doc3 = document.getElementById("open2");
        let doc2 = document.getElementById("col2");

        if (doc2.style.display === "none") {
            doc2.style.display = "block";
            doc3.style.transitionDuration = '1s';
            doc3.classList.remove("img");
            doc3.classList.add("img2");
            doc3.style.translate = "rotate(270deg) !important";
            setUpdateData(4);
        } else { 
            doc2.style.display = "none";
            doc3.style.translate = "rotate(90deg) !important";
            doc3.style.transitionDuration = '1s';
            doc3.classList.remove("img2");
            doc3.classList.add("img");
            setUpdateData(5);
        }
    }

    const abrirLink = () => {
        setUpdateData(6);
        const url = "https://upwebinar.cl/";
        window.open(url,'_blank');
    }

    return ( 
        <>
            <div className="fondo">
                <div className="contenedorStreaming">
                    <div className="col1" id="col1">
                        <div className="header">
                            <div className="logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="opciones">
                                {/* <div>
                                    <img src={opciones} alt="opciones" />
                                </div>
                                <div>
                                    <img src={agrandar} alt="agrandar"/>
                                </div> */}
                                 <div onClick={() => OnOffNotifications()}>
                                    {notifications?
                                   <VolumeUpIcon className="icon"/>
                                :
                                    <VolumeOffIcon className="icon" />
                                }
                                    
                                </div>
                                <div onClick={cerrarChat} className="desktop">
                                    <img id="open" src={cerrar} alt="cerrar" />
                                </div>
                                
                                <div onClick={cerrarChat2} className="movil">
                                    <img id="open2" src={cerrar} alt="cerrar" className="img"/>
                                </div>
                            </div>
                        </div>  
                        <div className="espacio">
                        </div>
                        <div className="streaming ">
                            <iframe title="streaming" width="560" height="315" className="transmission" src="https://player.vimeo.com/video/492022762" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="preguntas">
                            <div className="pregunta">
                                <input 
                                    type="text"
                                    placeholder="Hacer una pregunta"
                                    onChange={onChange}
                                    value={questionInput}
                                />
                                <SendIcon className="icon" onClick={sendQuestion} />
                            </div>
                        </div>
                    </div>
                    <div className="col2" id="col2">
                        <CometChatUnified />
                    </div>
                    <div className="row desktop" >
                        <img width="100%" className="wow fadeIn" data-wow-delay="1s" data-wow-offset="-50" src={imagenes}  alt="imagenes" />
                    </div>
                    <div className="row2 wow fadeIn movil">
                        <img width="100%" src={imagenmovil} data-wow-delay="0.3s" data-wow-offset="100" alt="imagenes" />
                    </div>
                    <div className="row2 wow fadeIn movil" data-wow-delay="0.3s" data-wow-offset="100">
                        <img width="100%" src={imagenmovil2} alt="imagenes" />
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
                    <div className="contenedor">
                        <div className="titulo">
                            <h1>Stands</h1>
                        </div>
                        <div className="patrocinadores">
                            <div className="peque">
                                <div className="col wow fadeInUp" data-wow-delay="0.3s" data-wow-offset="100" onClick={() => handleClickAbrir("sura","https://player.vimeo.com/video/491611217")}>
                                    <a>
                                        <LazyLoadImage
                                            alt="stand1"
                                            src={logo8}
                                            width="100%"
                                            effect="blur"
                                        />
                                        {" "}
                                    </a>
                                </div>
                                <div className="col wow fadeInUp" data-wow-delay="0.3s" data-wow-offset="100" onClick={() => handleClickAbrir("wibai", "https://player.vimeo.com/video/462399891" )}>
                                    <a>
                                        <LazyLoadImage
                                            alt="stand1"
                                            src={logo9}
                                            width="100%"
                                            effect="blur"
                                        />
                                    </a>
                                </div>
                                
                            <div className="col wow fadeInUp" data-wow-delay="0.3s" data-wow-offset="100" onClick={() => handleClickAbrir("deyel","https://player.vimeo.com/video/491806658")}>
                                <a>
                                    <LazyLoadImage
                                        alt="stand3"
                                        src={logo12}
                                        width="100%"
                                        effect="blur"
                                    />
                                </a>
                            </div>
                            </div>
                            <div className="col4 wow fadeInUp" data-wow-delay="0.3s" data-wow-offset="100" onClick={() => handleClickAbrir("up","https://player.vimeo.com/video/491906187")} >
                                <a>
                                    <LazyLoadImage
                                        alt="stand2"
                                        src={logo7}
                                        width="100%"
                                        effect="blur"
                                    />
                                </a>
                            </div>
                            <div className="col3 wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="100" onClick={() => handleClickAbrir("df","https://player.vimeo.com/video/483578942")}>
                                <a>
                                    <LazyLoadImage
                                        alt="stand3"
                                        src={logo11}
                                        width="100%"
                                        effect="blur"
                                    />
                                </a>
                            </div>
                            <div className="col3 wow fadeInUp" data-wow-delay="0.3s" data-wow-offset="100" onClick={() => handleClickAbrir("bizarro","https://player.vimeo.com/video/491607076")}>
                                <a>
                                    <LazyLoadImage
                                        alt="stand3"
                                        src={logo5}
                                        width="100%"
                                        effect="blur"
                                    />
                                </a>
                            </div>
                            <div className="col3 wow fadeInUp" data-wow-delay="0.4s" data-wow-offset="100" onClick={() => handleClickAbrir("chiletec")}>
                                <a>
                                    <LazyLoadImage
                                        alt="stand3"
                                        src={logo6}
                                        width="100%"
                                        effect="blur"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <footer>
                    <div>
                        {/* <a>¿Cómo comprar?</a>
                        <a>Políticas de privacidad</a>
                        <a>Términos y condiciones</a> */}
                    </div>
                    <img src={logo4} alt="logo4" style={{cursor:'pointer'}} onClick={abrirLink} />
                </footer>
            </div>
            <div className="fondoStand" id="fondoStand">
                <Df 
                url={url}
                setUrl={setUrl}
                />
                <Chiletec />
                <Bizarro
                 url={url}
                 setUrl={setUrl}
                />
                <Wibai
                 url={url}
                 setUrl={setUrl}
                />
                <Sura 
                 url={url}
                 setUrl={setUrl}
                />
                <Deyel 
                 url={url}
                 setUrl={setUrl}
                />
                <Up 
                 url={url}
                 setUrl={setUrl}
                />
            </div>
        </> 
    );
}
 
export default WaitingRoom;