import React from 'react';
import close from '../../../assets/img/close.png'
import foto1 from '../../../assets/img/stand/wibai/1.jpg'
import foto2 from '../../../assets/img/stand/wibai/2.jpg'
import foto3 from '../../../assets/img/stand/wibai/3.jpg'
import foto4 from '../../../assets/img/stand/wibai/4.jpg'
import foto5 from '../../../assets/img/stand/wibai/5.jpg'
import foto6 from '../../../assets/img/stand/wibai/6.jpg'
import header from '../../../assets/img/stand/wibai/header.jpg'
import logo from '../../../assets/img/stand/wibai/logo.jpg'
import Slider from "react-slick";
import footer from '../../../assets/img/paginaweb.png'
import footer2 from '../../../assets/img/telefono.png'
import footer3 from '../../../assets/img/email.png'
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import footer1 from '../../assets/img/footerdeli2.png'
const Bizarro = ({url, setUrl}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
      };
    const close2 = () =>{
        var doc = document.getElementById("wibai");
        doc.style.right='-660px';
        doc.style.transitionDuration='1s';
        var doc2 = document.getElementById("fondoStand");
        doc2.style.left = '100vw';
        doc2.style.transitionDuration='1s';
        var bodi = document.getElementsByTagName("body");
        bodi[0].classList.remove('stop');
        setUrl('');
    }
    return ( <>
        <div className="standMediano" id="wibai">
            <div className="capa">
             <div className="header">
                <img style={{color:'black'}}  className="close" src={close} onClick={close2} />
                <LazyLoadImage effect="blur" src={header} width="100%" />
                <img src={logo} className="logotipo" width="100px" />
            </div>
            <div className="content2">
                <h2 style={{color:'white'}}>MERCADO WIBAI</h2>
                <p style={{color:'White'}}>Creamos regalos y kits a medida, personalizados con tu logo, mensaje y los mejores productos de pymes nacionales. Comparte un momento único, transmite tu cariño y sorprende de la mejor manera. ¡Vive la magia de regalar con Mercado Wibai! </p>

                <iframe src={url} width="100%" height="315" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <div className="imagenes">
                <Slider {...settings}>
                    <div className="imagen">
                        <LazyLoadImage effect="blur" src={foto1} width="100%" height="auto"/>
                    </div>
                    <div className="imagen">
                        <LazyLoadImage effect="blur" src={foto2} width="100%" height="auto"/>
                    </div>
                    <div className="imagen">
                        <LazyLoadImage effect="blur" src={foto3} width="100%" height="auto"/>
                    </div>
                    <div className="imagen">
                        <LazyLoadImage effect="blur"  src={foto4} width="100%" height="auto"/>
                    </div>
                    <div className="imagen">
                        <LazyLoadImage  effect="blur"  src={foto5} width="100%" height="auto"/>
                    </div>
                    <div className="imagen">
                        <LazyLoadImage  effect="blur"  src={foto6} width="100%" height="auto"/>
                    </div>
                </Slider>
                </div>

            </div>
            <div className="boton">
                    {/* <a href="" target="_blank" rel="noopener noreferrer">MÁS INFORMACIÓN</a> */}
            </div>
            {/* <div className="foot2">
                <div className="itemFooter">
                    <LazyLoadImage effect="blur" src={footer} />
                    <a></a>
                </div>
                <div className="itemFooter">
                    <LazyLoadImage effect="blur" src={footer3} />
                    <a></a>
                </div>
                <div className="itemFooter">
                    <LazyLoadImage effect="blur" src={footer2} />
                    <a></a>
                </div>
            </div> */}
            </div>
        </div>
    
    </> );
}
 
export default Bizarro;