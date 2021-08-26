import React from 'react';
import Slider from "react-slick";
// import Logo from '../../../../assets/img/bancochile/logo.jpg';
import Banner from '../../../assets/img/stand/df/header.jpg';
import foto2 from '../../../assets/img/stand/df/1.jpg';
import foto3 from '../../../assets/img/stand/df/2.jpg';
import foto4 from '../../../assets/img/stand/df/3.jpg';
import foto5 from '../../../assets/img/stand/df/4.jpg';
// import foto6 from '../../../assets/img/stand/df/logo.jpg';
// import logo from '../../assets/img/df.png';

// import Banner2 from '../../../assets/img/test2.png';
import Banner2 from '../../../assets/img/test2.png';

// import bancochile1 from '../../../../assets/img/bancochile/1.jpg';
// import bancochile2 from '../../../../assets/img/bancochile/2.jpg';
// import bancochile3 from '../../../../assets/img/bancochile/3.jpg';
// import bancochile4 from '../../../../assets/img/bancochile/4.jpg';
// import video from '../../../../assets/img/bancochile/video.mp4';
// import Reporte from '../../../../assets/img/bancochile/Reporte.pdf';
import CancelIcon from '@material-ui/icons/Cancel';
const Chiletec = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
 
    const handClick = (e) => {
        var stand = document.getElementById('chiletec');
        stand.style.right= '-660px';
        stand.style.transitionDuration= '1s';
        var fondo = document.getElementById("fondoStand");
        fondo.style.left = '100vw';
        var bodi = document.getElementsByTagName("body");
        bodi[0].classList.remove('stop');
    }
    const download = () => {
        var url='https://upwebinar.cl/proyectos/icare/stands/bancochile/Reporte.pdf';    
        window.open(url, 'Download');  
    }
    return ( 
        <>
            <div className="standMercurio2" id="chiletec">
           
                    <span className="closes cursor-button" style={{cursor: 'pointer'}} onClick={handClick}><CancelIcon style={{fontSize:'22px',color:'#2d2d2d'}} /></span>
                     <iframe
						width="560"
						height="315"
						src="https://chiletec.org/"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
            </div>
        </> 
    );
}
 
export default Chiletec;