import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
const Chiletec = () => {
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   };
 
    const handClick = (e) => {
        var stand = document.getElementById('chiletec');
        stand.style.right= '-660px';
        stand.style.transitionDuration= '1s';
        var fondo = document.getElementById("fondoStand");
        fondo.style.left = '100vw';
        var bodi = document.getElementsByTagName("body");
        bodi[0].classList.remove('stop');
    }
    // const download = () => {
    //     var url='https://upwebinar.cl/proyectos/icare/stands/bancochile/Reporte.pdf';    
    //     window.open(url, 'Download');  
    // }
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
                        title="Chiletec"
					></iframe>
            </div>
        </> 
    );
}
 
export default Chiletec;