import { memo, useDeferredValue, useState } from "react";

/**
 * useDeferredValue - Demo ohne Optimierung
 * 
 * Die Eingabe wird an eine langsame Komponente (Chart) übergeben. 
 * Damit wird die Komplette Komponente langsam und verzögert die Ausgabe spürbar.
 */
 export function HeavyRenderDemo() {
    const [ input, setInput ] = useState('');
    
    return (
        <>
            <div className="grid grid-cols-3 max-w-md">
                <div className="col-span-3 bg-teal-100 m-5 p-3 rounded">
                    Bei aufwändigem Rendern kann schnell eine spürbare Eingabeverzögerung entstehen.
                </div>
                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">Aktuelle Eingabe: {input}</div>
                <input className="col-span-3" id="desc" type="search" name="description" placeholder=""
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />

                <Chart content={input} />
            </div>
        </>
    );
};

/**
 * useDeferredValue - Demo mit useDeferredValue-Hook
 * 
 * Zur verbesserung der Reaktionsfähigkeit wird der useDeferreValue-Hook
 * verwendet, dessen Wert wird an die langsame Komponente (Chart) übergeben.
 * Um ein re-render der Chart Komponente für den alten Wert zu unterbinden, 
 * wird die Chart Komponente in ein memo gepackt.
 */
export function HeavyRenderOptimizedDemo() {
    const [ input, setInput ] = useState('');
    const deferedInput = useDeferredValue(input);

    return (
        <>
            <div className="grid grid-cols-3 max-w-md">
                <div className="col-span-3 bg-teal-100 m-5 p-3 rounded">
                    Bei aufwändigem Rendern kann schnell eine spürbare Eingabeverzögerung entstehen.
                </div>
                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">Aktuelle Eingabe: {input}</div>
                <input className="col-span-3" id="desc" type="search" name="description" placeholder=""
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />

                {/* Memo nutzen und deferred-Value übergeben. */}
                <ChartMemo content={deferedInput} />
            </div>
        </>
    );
};

/**
 * Memo muss genutzt werden.
 * Anderenfalls wird beim erneuten Rendern die Komponente erneut aufgerufen (mit dem alten Wert) und dann wird trotzdem 
 * ein aufwändiges Rendern ausgeführt.
 * 
 * Deswegen auch die Aufteilung in zwei Komponenten.
 */

type CharParams = {
    content: string
};

/** 
 * Verzögert durch aufwändiges Rendern die Ausgabe des übergebenen Wertes.
 * Simuliert dabei eine aufwändig gerenderte Komponente.
 */
function Chart({content}: CharParams) {
    delay(125); // Wichtige und komplexe Berechnungslogik !
    return (<>
        <div className="col-span-3 m-5 p-3">
            <p>Inhalt: {content}</p>
        </div>
        </>
    );
};

/**
 * Memoized Komponente Chart.
 */
const ChartMemo = memo(Chart);

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
