
import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import './contacto.css'
import { NavLink } from "react-router";


const Contacto = () => {

    const [showImage, setShowImage] = useState(false);
    const [showInfo, setShowInfo] = useState(false)




    useEffect(() => {

        setTimeout(() => setShowImage(true), 200);
        setTimeout(() => setShowInfo(true), 800)
    }, [])




    const imagenes = [

        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg'

    ]

    return (


        <>

            <Header />

            <main className="Contacto">


                {/* <div className="Contacto-bloque1">
                    <p className={`Contacto-h1 ${showInfo ? "fade-in" : ""}`}>Contacto</p>
                </div> */}




            
                    <div className="Contacto-links">
                      
                        <a
                            className={`Contacto-instagram ${showInfo ? "slide-in" : ""}`}
                            href="https://www.instagram.com/mode_estudio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ transitionDelay: "0.25s" }}
                        >
                            Instagram
                        </a>

                          <a href="mailto:info@mode-studio.es" className={`Contacto-email ${showInfo ? "slide-in" : ""}`}
                            style={{ transitionDelay: "0.1s" , marginTop:'0.5rem'}}>
                            info@mode-studio.es
                        </a>
                    </div>

                    <div className="Imagen-direccion">
                        <div className={`Contenedor-imag ${showImage ? "fade-in" : ""}`}>

                            <div className="Contacto-img">
                                {imagenes.map((src, index) => (
                                    <div className="Background-imagenes" key={index} style={{
                                        backgroundImage: `url(${src})`, animationDelay: `${index * 10}s`
                                    }}></div>
                                ))}
                            </div>

                        </div>

                        <p className={`Contacto-direccion ${showInfo ? "slide-in" : ""}`}
                            style={{ transitionDelay: "0.4s" }}>
                            c/Duque de Calabria, 13
                        </p>
                        <p className={`Contacto-direccion ${showInfo ? "slide-in" : ""}`}
                            style={{ transitionDelay: "0.55s" }}>
                            46005,
                        </p>
                        <p className={`Contacto-direccion ${showInfo ? "slide-in" : ""}`}
                            style={{ transitionDelay: "0.7s" }}>
                            Valencia
                        </p>
                    </div>


               




            </main>


        </>


    );
}

export default Contacto;