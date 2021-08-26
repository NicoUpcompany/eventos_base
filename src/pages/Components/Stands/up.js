import React from 'react';
import Slider from "react-slick";
// import Logo from '../../../../assets/img/bancochile/logo.jpg';
import Banner from '../../../assets/img/stand/up/header.jpg';
import foto2 from '../../../assets/img/stand/up/1.png';
import foto3 from '../../../assets/img/stand/up/2.png';
import foto4 from '../../../assets/img/stand/up/3.png';
import foto5 from '../../../assets/img/stand/up/4.png';
import foto6 from '../../../assets/img/stand/up/5.png';
import foto7 from '../../../assets/img/stand/up/6.png';
import footer from '../../../assets/img/stand/up/email2.png';
import footer2 from '../../../assets/img/stand/up/telefono.png';
// import foto8 from '../../../assets/img/stand/up/logo.jpg';
import logo from '../../../assets/img/sura.png';


// import Banner2 from '../../../assets/img/test2.png';
import Banner2 from '../../../assets/img/test2.png';

// import bancochile1 from '../../../../assets/img/bancochile/1.jpg';
// import bancochile2 from '../../../../assets/img/bancochile/2.jpg';
// import bancochile3 from '../../../../assets/img/bancochile/3.jpg';
// import bancochile4 from '../../../../assets/img/bancochile/4.jpg';
// import video from '../../../../assets/img/bancochile/video.mp4';
// import Reporte from '../../../../assets/img/bancochile/Reporte.pdf';
import CancelIcon from '@material-ui/icons/Cancel';
const Sura = ({url, setUrl}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const handClick = (e) => {
        var stand = document.getElementById('up');
        stand.style.right= '-660px';
        stand.style.transitionDuration= '1s';
        var fondo = document.getElementById("fondoStand");
        fondo.style.left = '100vw';
        var bodi = document.getElementsByTagName("body");
        bodi[0].classList.remove('stop');
        setUrl("");
    }
    const download = () => {
        var url='https://upwebinar.cl/proyectos/icare/stands/bancochile/Reporte.pdf';    
        window.open(url, 'Download');  
    }
    return ( 
        <>
            <div className="standMercurio" id="up">
           
                    <span className="closes cursor-button" style={{cursor: 'pointer'}} onClick={handClick}><CancelIcon style={{fontSize:'22px',color:'white'}} /></span>
                    <img src={Banner} width="100%" height="auto"  alt=""/>
                    
         
                <div className="rowStand">
                    <h3 style={{float:'left',marginTop:'20px',color:'white', width:'100%'}}>Up Company</h3>
                    <p>
                    Up Company es un Holding dedicado a la comunicación estratégica y desarrollo tecnológico, que hoy cuenta con 5 empresas relacionadas, liderando el desarrollo creativo para marcas y consumidores.
                    </p>
                    <div className="video2">
                        <iframe src={url} width="100%" height="315" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    </div>
                    <h2>Nuestro ecosistema</h2>
                    <div className="galeri2">
                            
                            <div className="col">
                                <img src={foto2} className="img1"  />
                            </div>
                            <div className="col">
                                <img src={foto3} className="img2"  />
                            </div>
                            <div className="col">
                                <img src={foto4} className="img3"  />
                            </div>
                            <div className="col">
                                <img src={foto5} className="img4"  />
                            </div>
                            <div className="col">
                                <img src={foto6} className="img5"  />
                            </div>
                            <div className="col">
                                <img src={foto7} className="img6"  />
                            </div>
                    </div>
                    {/* <a className="btn2" style={{cursor: 'pointer',float:"left" ,width:'calc(50% - 5px)' ,textDecoration:'none',marginBottom:'20px'}}>Más información <span className="material-icons-outlined spanBotom">error</span></a> */}
                        
                </div>
                
                   <div className="columna">
                        <img src={footer} />
                        <span>
                            contacto@upcompany.cl
                        </span>
                   </div>
                
            </div>
        </> 
    );
}
 
export default Sura;