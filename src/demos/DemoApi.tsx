import { ChangeEvent, Fragment, memo, useDeferredValue, useEffect, useState, useTransition } from "react";
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
        <Fragment>
            <p>Ergebnis: {ergebnis}</p>
            <p>Zähler: {count}</p>
            <input type="button" onClick={handleClick} value="Hochzählen" />            
        </Fragment>
    );
};

/**
 * Berechnung in der Komponente beim Rendern.
 * 
 * Um so eine Berechnung in einen useEffect zu verschieben, müsste man auf
 * Tricks zugreifen und über die Dependencies des useEffect immer steuern, wann
 * dieser ausgeführt werden soll und wann nicht. 
 * 
 * @@@
 * --> Das ist doch ein Anwendungsfall für useDefferedValue und nicht für useTransition... ???
 * Wie genau unterscheiden wir da?
 * useTransition wenn das rendern lange dauert, zb auch das initiale rendern
 * useDefferedValue passt besser wenn man berechnungen machen will..???
 * 
 */

/**
 * Controlled Component mit aufwändigem Render Prozess.
 * Die Eingabeverzögerung ist deutlich zu erkennen. 
 */

// TODO DID die demo kann entf werden, doppelt zu usedeferred value

export function HeavyInputLagDemo() {
    const [ input, setInput ] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    delay(125); // Wichtige und komplexe Berechnungslogik oder aufwändiges Rendern

    return (
        <Fragment>
            <div className="grid grid-cols-3 max-w-md">
                <div className="col-span-3 bg-teal-100 m-5 p-3 rounded">
                    Bei aufwändigem Rendern kann schnell eine spürbare Eingabeverzögerung entstehen.
                </div>
                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">Aktuelle Eingabe: {input}</div>
                <input className="col-span-3" id="desc" type="search" name="description" placeholder=""
                    value={input}
                    onChange={handleInputChange}
                />
            </div>
        </Fragment>
    );
};

/**
 * Führt ein aktives Warten aus.
 * @param ms Wartezeit in ms
 */
function delay(ms: number) {
    let startTime = performance.now();
    while (performance.now() - startTime < ms) {
        // Nichts machen bis die Zeit abgelaufen ist...
        // Simuliert langsamen Code
    }
};
