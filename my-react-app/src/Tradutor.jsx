import api from "./services/api"
import { useState , useEffect } from "react";

export default function Tradutor() {
    const [texto, setTexto] = useState("");
    const [textoTraduzido, setTextoTraduzido] = useState("");
    
    const pegarTexto = (evento) => {
        setTexto(evento.target.value);
    };

    useEffect(() => {
        const traduzir = async () => {
            if (texto && texto.trim()) {
                try {
                    const resultado = await traduzirTexto(texto);
                    const textoFinal = resultado.contents?.translated || resultado.translated || JSON.stringify(resultado);
                    setTextoTraduzido(textoFinal);
                } catch (error) {
                    console.log("ERRO:", error);
                    setTextoTraduzido("Erro na tradução");
                }
            } else {
                setTextoTraduzido("");
            }
        };
        const timeoutId = setTimeout(traduzir, 500);
        return () => clearTimeout(timeoutId);
    }, [texto]);
    
    return (
        <div style={{fontFamily: ' "Arial", "Helvetica", "sans-serif" ', textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <input style={{padding: '20px', fontSize: '20px' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    type="text" placeholder="Escreva Aqui para Traduzir"
                    value={texto}
                    onChange={pegarTexto}
                />
            </div>
            <br />
            <h1>{textoTraduzido}</h1>
        </div>
    );
}

async function traduzirTexto(texto) {
    try {
        const textoM = texto.replace(/ /g, "%20");
        const API = await api.get(`/translate/morse.json?text=${textoM}`);
        const data = await API.data;
        return data;
    } catch (error) {
        console.log(`ERRO: `, error);
        throw error;
    }
}