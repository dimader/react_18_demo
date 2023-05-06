import { ChangeEvent, Fragment, memo, useDeferredValue, useEffect, useState, useTransition } from "react";

/**
 * Aufbau 1
 */
 export function HeavyRenderDemo() {
    const [ input, setInput ] = useState('');
    
    return (
        <Fragment>
            <p>Aktuelle Eingabe: {input}</p>
            <input id="desc" type="text" name="description" placeholder=""
                    value={input}
                    // onChange={handleInputChange}
                    onChange={e => setInput(e.target.value)}
                    />
            {/* TODO - effekt vorher/nacher prüfen - Hier defered übergeben UND die Memo Komponente nutzen. */}
            <Chart content={input} />
        </Fragment>
    );
};

export function HeavyRenderOptimizedDemo() {
    const [ input, setInput ] = useState('');
    const deferedInput = useDeferredValue(input);

    return (
        <Fragment>
            <p>Aktuelle Eingabe: {input}</p>
            <input id="desc" type="text" name="description" placeholder=""
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    />

            {/* Memo nutzen und deferred-Value übergeben. */}
            <ChartMemo content={deferedInput} />
        </Fragment>
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
/** Verzögert durch aufwändiges Rendern die Ausgabe des übergebenen Wertes.
 * Simuliert dabei eine aufwändig gerenderte Komponente.
 */
function Chart({content}: CharParams) {
    delay(125); // Wichtige und komplexe Berechnungslogik !
    return (
        <Fragment>
            <p>Inhalt: {content}</p>
        </Fragment>
    );
};

const ChartMemo = memo(Chart);

/** Aktives warten. */
function delay(ms: number) {
    let startTime = performance.now();
    while (performance.now() - startTime < ms) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
};
