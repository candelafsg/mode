import './proyecto.css'
import {useFetchOne} from "../../hooks/useFetch";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Header } from "../../components/header/Header";
import { Lightbox } from "../../components/lightbox/Lightbox";



const Proyecto = () => {

    const { proyect, imagenes, load, err } = useFetchOne()
    // const [orientaciones, setOrientaciones] = useState([])

    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const imgRefs = useRef([]);


    //Función para abrir el lightbox
    const openLightbox = (index) => {

        setCurrentId(index); //id de la imagen seleccionada
        setLightboxOpen(true)
    }



    //cerrar lightbox
    const closeLightbox = () => {

        setLightboxOpen(false)

    }


    //sig imagen 
    const nextImage = () => {

        setCurrentId((prevIndex) => (prevIndex + 1) % imagenes.length);

    };


    //ant imagen 
    const prevImage = () => {

        setCurrentId((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);

    };





    // useEffect(() => {
    //     const detectarOrientaciones = async () => {

    //         const resultados = await Promise.all(
    //             imagenes.map((src) => {
    //                 return new Promise((resolve) => {
    //                     const img = new Image();
    //                     img.src = src;
    //                     img.onload = () => {

    //                         resolve(img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical')
    //                     }

    //                     img.onerror = () => resolve('');
    //                 })
    //             })

    //         )

    //         setOrientaciones(resultados)
    //     }

    //     if (imagenes && imagenes.length > 0) {

    //         detectarOrientaciones()
    //     }
    // }, [imagenes])




    //Animar imágenes para hacer scrolll 

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        const index = imgRefs.current.indexOf(entry.target);

                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, index * 80); 
                      
                        observer.unobserve(entry.target);
                    }
                })
            },

            {
                threshold:0.1
            }
        )

        imgRefs.current.forEach((ref) => {
            if(ref) observer.observe(ref)
        })


        return () => {
            imgRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    },[imagenes])


    return (
        <>



            <Header />

            <main className="Main-proyecto">
                <p className="Main-titulo">{proyect.nombre}</p>
                <div className="Galeria-proyecto">

                    {

                        load ? (
                            <p className="cargando" >Cargando imágenes ...</p>


                        ) : err ? (

                            <p>Error al cargar imágenes </p>

                        ) : Array.isArray(imagenes) && imagenes.length > 0 ? (

                            <ul className="Galeria-mansory">


                                {
                                    imagenes.map((imgUrl, id) => {

                                     
                                        return (

                                            <li ref={(el) => (imgRefs.current[id] = el)} onClick={() => openLightbox(id)} className='Galeria-mansory-item' key={id}><img loading="lazy" src={imgUrl} alt={`Imagen ${id}`} className="Galeria-imgProyecto" /></li>
                                        )
                                    })
                                }

                            </ul>

                        ) : (
                            <p>No hay imágenes que mostrar</p>
                        )
                    }

                </div>
            </main>


                    <Lightbox 
                    
                    images = {imagenes}
                    currentId={currentId}
                    isOpen={lightboxOpen}
                    closeLightbox={closeLightbox}
                    nextImage={nextImage}
                    prevImage={prevImage}
                    
                    />
        </>
    );
}

export default Proyecto;