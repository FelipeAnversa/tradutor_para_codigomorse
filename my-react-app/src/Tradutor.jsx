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
        <div>
            <input type="text" placeholder="Escreva Aqui para Traduzir" value={texto} onChange={pegarTexto} />
            <br />
            <h1>{textoTraduzido}</h1>
        </div>
    );
}

async function traduzirTexto(texto) {
    try {
        const API = await api.get(`/translate/morse.json?text=${texto}`);
        const data = await API.data;
        return data;
    } catch (error) {
        console.log(`ERRO: `, error);
        throw error;
    }
}