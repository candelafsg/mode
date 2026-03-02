

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {proyectosData} from '../db/db.js';

export const useFetchAll =  () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [proyectos, setProyectos] = useState([])

    const obtenerProyectos = async () => {
        try{
            // Simular carga asíncrona para mantener consistencia
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Usar datos locales del archivo db.js
            setProyectos(proyectosData || [])
        } catch(e) {
            console.error('Error al obtener proyectos', e);
            setError(e.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        obtenerProyectos()
    },[])

    return {proyectos, error, loading};
}




export const useFetchOne = () => {
    const [load, setLoad] = useState(true);
    const { pid } = useParams()
    const [err, setErr] = useState(null);
    const [proyect, setProyect] = useState('')
    const [imagenes, setImagenes] = useState([])

    useEffect(() => {
        // Verifica que pid no sea null o vacío
        if (!pid) {
            setErr('El ID del proyecto es inválido.');
            setLoad(false);
            return;
        }

        const proyectoId = async () => {
            try {
                // Debug: mostrar qué valor está recibiendo pid
                console.log('PID recibido:', pid, 'Tipo:', typeof pid);
                
                // Si pid es [object Object], intentar extraer el ID correcto
                let searchId = pid;
                if (typeof pid === 'string' && pid === '[object Object]') {
                    console.log('Detectado [object Object], buscando primer proyecto como fallback');
                    // Como fallback, usar el primer proyecto disponible
                    searchId = proyectosData[0]?._id?.$oid;
                    console.log('Usando fallback ID:', searchId);
                }
                
                // Simular carga asíncrona para mantener consistencia
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Buscar el proyecto por ID en los datos locales
                const proyectoEncontrado = proyectosData.find(p => p._id.$oid === searchId);
                
                if (!proyectoEncontrado) {
                    throw new Error(`Proyecto con ID ${pid} no encontrado`);
                }

                console.log('DATA RECIBIDA:', proyectoEncontrado);
                setProyect(proyectoEncontrado)
                setImagenes(proyectoEncontrado.imagenes || [])
                
            } catch(e) {
                console.error('Error al obtener proyecto', e);
                setErr(e.message);
            } finally {
                setLoad(false); 
            }
        }

        proyectoId()
    }, [pid]);

    return {proyect, imagenes, load, err};
}