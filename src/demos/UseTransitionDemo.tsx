import { ChangeEvent, Fragment, memo, useDeferredValue, useEffect, useState, useTransition } from "react";

/**
 * useTransition
 * 
 * ohne Optimierung
 */
 export function ContentUpdateDemo() {
    console.count('###### DEMO ######## - ContentUpdateDemo');

    const [ page, setPage ] = useState('page1');

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
// const SlowPageMemo = memo(function SlowPage() {
//     // delay(3000); // Wichtige und komplexe Berechnungslogik !
//     return (
//         <>
//         <SlowComponent />
        
//         </>
//     );
// });
const SlowPageMemo = memo(SlowComponent);

// TODO DID memo bringt doch nichts wenn es keine übergabeparam gibt... 

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
};


/** Aktives warten. */
function delay(ms: number) {
    let startTime = performance.now();
    while (performance.now() - startTime < ms) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
};
