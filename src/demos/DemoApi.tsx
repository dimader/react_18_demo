import { useEffect, useState } from "react";
import './../App.css';

/**
 * Beim Öffnen der Komponente wird ein API Aufruf simuliert, 
 * dieser wird in einem useEffect gemacht.
 * Über den Hochzählen Button kann jederzeit der State der Komponente 
 * geändert werden. 
 * Es gibt keine blockierende Aktion.
 */
export function LongApiCallDemo() {
    const [ count, setCount ] = useState(0);
    const [ ergebnis, setErgebnis ] = useState('...loading...');

    const handleClick = () => {
        console.log("-- LongApiCallDemo - handleClick");
        setCount(count + 1);
    };

    useEffect(() => {
        const getErgebnis = async (): Promise<string> => {
            function sleep(ms: number) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // warten...
            await sleep(10000);
            return 'Ergebnis liegt jetzt vor!';
        };

        getErgebnis()
            .then(r => setErgebnis(r as string));

    }, []);

    return (
        <>
            <p>Ergebnis: {ergebnis}</p>
            <p>Zähler: {count}</p>
            <input type="button" onClick={handleClick} value="Hochzählen" />            
        </>
    );
};
