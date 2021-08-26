import React from 'react';
import Slider from "react-slick";
// import Logo from '../../../../assets/img/bancochile/logo.jpg';
import Banner from '../../../assets/img/stand/sura/header.jpg';
import foto2 from '../../../assets/img/stand/sura/1.jpg';
import foto3 from '../../../assets/img/stand/sura/2.jpg';
import foto4 from '../../../assets/img/stand/sura/3.jpg';
// import foto5 from '../../../assets/img/stand/sura/4.jpg';
// import foto6 from '../../../assets/img/stand/sura/logo.jpg';
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
        var stand = document.getElementById('sura');
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
            <div className="standMercurio" id="sura">
           
                    <span className="closes cursor-button" style={{cursor: 'pointer'}} onClick={handClick}><CancelIcon style={{fontSize:'22px',color:'black'}} /></span>
                    <img src={Banner} width="100%" height="auto"  alt=""/>
                    
         
                <div className="rowStand">
                    <h3 style={{float:'left',marginTop:'20px',color:'white', width:'100%'}}>Seguros SURA</h3>
                    <p>
                    Seguros SURA es una compañía latinoamericana especializada en seguros y tendencias de riesgos, con más de 72 años de experiencia en la industria aseguradora. Cuenta con el respaldo de la compañía matriz Grupo SURA y la aseguradora Munich Re.
Lo que nos define es nuestro propósito de Nuestro propósito es entregar bienestar a través de soluciones integrales, para facilitar la vida de personas y empresas, aportando al desarrollo de la comunidad. Creemos que el valor de nuestra gestión está en contribuir a la reducción de la incertidumbre frente al presente y al futuro.
                    </p>
                    <div className="video2">
                        <iframe src={url} width="100%" height="315" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    </div>
                    <div className="galeri">
                        <Slider {...settings}>
                            <img src={foto2} width="100%" alt="bancochile1" />
                            <img src={foto3} width="100%" alt="bancochile1" />
                            <img src={foto4} width="100%" alt="bancochile1" />
                            {/* <img src={foto5} width="100%" height="350px" alt="bancochile2" /> */}
                            {/* <img src={foto2} width="100%" height="350px" alt="bancochile3" /> */}
                            {/* <img src={Banner2} width="100%" height="350px" alt="bancochile4" /> */}
                        </Slider>
                    </div>
                    {/* <a className="btn2" style={{cursor: 'pointer',float:"left" ,width:'calc(50% - 5px)' ,textDecoration:'none',marginBottom:'20px'}}>Más información <span className="material-icons-outlined spanBotom">error</span></a> */}
                        
                </div>
                <div className="foot">
                   
                </div>
            </div>
        </> 
    );
}
 
export default Sura;