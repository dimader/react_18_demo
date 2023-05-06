import { ChangeEvent, Fragment, memo, useDeferredValue, useEffect, useState, useTransition } from "react";

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
export function HeavyInputLagDemo() {
    const [ input, setInput ] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    delay(125); // Wichtige und komplexe Berechnungslogik !

    return (
        <Fragment>
            <p>Aktuelle Eingabe: {input}</p>
             <input id="desc" type="text" name="description" placeholder=""
                    value={input}
                    onChange={handleInputChange} 
                    />
        </Fragment>
    );
};

/** Aktives warten. */
function delay(ms: number) {
    let startTime = performance.now();
    while (performance.now() - startTime < ms) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
};

// /**
//  * Aufbau 1
//  */
// export function ChartUpdateDemo() {
//     const [ input, setInput ] = useState('');
//     // const deferedInput = useDeferredValue(input);
//     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setInput(event.target.value);
//     };
//     return (
//         <Fragment>
//             <p>Aktuelle Eingabe: {input}</p>
//             <input id="desc" type="text" name="description" placeholder=""
//                     value={input}
//                     onChange={handleInputChange} 
//                     />
//             {/* TODO - effekt vorher/nacher prüfen - Hier defered übergeben UND die Memo Komponente nutzen. */}
//             <Chart content={input} />
//         </Fragment>
//     );
// };

// type CharParams = {
//     content: string
// };
// /** Verzögert durch aufwändiges Rendern die Ausgabe des übergebenen Wertes.
//  * Simuliert dabei eine aufwändig gerenderte Komponente.
//  */
// function Chart({content}: CharParams) {
//     delay(125); // Wichtige und komplexe Berechnungslogik !
//     return (
//         <Fragment>
//             <p>Inhalt: {content}</p>
//         </Fragment>
//     );
// };

// const ChartMemo = memo(Chart);


/**
 * useTransition
 * 
 * ohne Optimierung
 */
export function ContentUpdateDemo() {
    console.count('###### DEMO ######## - ContentUpdateDemo');

    const [ page, setPage ] = useState('page1');

// TODO DID diese demo auch mit useTransition machen !!! 

    return (
        <Fragment>
            <div className="grid grid-cols-3 max-w-md">
                <div className="col-span-3 bg-teal-100 m-5 p-3 rounded">
                    Hier kann man evtl. auch etwas mehr Text ausgeben und damit die Anwendung ein wenig erklären, funktioniert das gut??
                </div>
                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">
                    Aktuelle Seite: {page}
                </div>

                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-sky-500 p-3" type="button" onClick={() => {
                    setPage('page1')
                }} value="Seite 1" /></div>
                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-sky-500 p-3" type="button" onClick={() => {
                    setPage('page2')
                }} value="Seite 2" /></div>
                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-red-800 p-3" type="button" onClick={() => {
                    setPage('page3')
                }} value="Seite 3" /></div>

                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">
                    {page === 'page1' && <QuickPage title={page} />}
                    {page === 'page2' && <QuickCalcPage title={page} />}
                    {page === 'page3' && <SlowPageMemo />}
                </div>
            </div>
        </Fragment>
    );
};
export function ContentUpdateDemoUseTransition() {
    console.count('###### DEMO ######## - ContentUpdateDemoUseTransition');
    const [ page, setPage ] = useState('page1');
    const [ isPending, startTransition ] = useTransition();

    const handlePageChange = (page: string) => {
        startTransition(() => {
            setPage(page);
        });
    };

    return (
        <Fragment>
            <div className="grid grid-cols-3 max-w-md">
                <div className="col-span-3 bg-teal-100 m-5 p-3 rounded">
                    Hier kann man evtl. auch etwas mehr Text ausgeben und damit die Anwendung ein wenig erklären, funktioniert das gut??
                </div>
                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">
                    Aktuelle Seite: {page}
                </div>

                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-sky-500 p-3" type="button" onClick={() => {
                    handlePageChange('page1')
                }} value="Seite 1" /></div>
                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-sky-500 p-3" type="button" onClick={() => {
                    handlePageChange('page2')
                }} value="Seite 2" /></div>
                <div><input className="bg-teal-500 m-5 rounded border-double border-4 border-red-800 p-3" type="button" onClick={() => {
                    handlePageChange('page3')
                }} value="Seite 3" /></div>

                <div className="col-span-3 bg-teal-300 m-5 p-3 rounded">
                    {page === 'page1' && <QuickPage title={page} />}
                    {page === 'page2' && <QuickCalcPage title={page} />}
                    {page === 'page3' && <SlowPageMemo />}
                </div>
            </div>
        </Fragment>
    );
};
type PageProps = {
    title: string
};
function QuickPage({title}:PageProps) {
    return (
        <p>Page: {title}</p>
    );
};
function QuickCalcPage({title}:PageProps) {
    const [ count, setCount ] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    };

    return (<>
        <p>Page: {title}</p>
        <p>Zähler: {count}</p>
        <input type="button" onClick={handleClick} value="Hochzählen" />            
    </>);
};
// const SlowPageMemo = memo(function SlowPage({title}:PageProps) {
const SlowPageMemo = memo(function SlowPage() {
    // delay(3000); // Wichtige und komplexe Berechnungslogik !
    return (
        <>
        <SlowComponent />
        
        </>
    );
});

/**
 * DAS rendern EINER Komponente kann abgebrochen werden, es wird nicht der PROZESS (async) gekilled 
 * wenn ein neuer Status kommt !! 
 * Also viele etwas langsame Komponenten sind besser als EINE SEHR Langsame komponente !!!!
 */


function SlowComponent() {
    delay(3000); // Wichtige und komplexe Berechnungslogik !
    return (
        <p>Slow Component!</p>
    );
}