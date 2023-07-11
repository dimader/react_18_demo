import { memo, useState, useTransition } from "react";

/**
 * React 18 - useTransition - Content Update Demo ohne useTransition
 * 
 * Aufbau mit Tabs, Inhalte können über Buttons ausgetauscht werden.
 */
 export function ContentUpdateDemo() {
    const [ page, setPage ] = useState('page1');
    const [ count, setCount ] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    };

    return (<>
        <div className="grid grid-cols-3 max-w-md">
            <div className="col-span-3 bg-teal-100 m-2 p-2 rounded">
                Seite 3 ist eine langsame Komponente, diese zu öffnen verzögert die Anwendung.
                Der Zähler in Seite 2 kann nicht verwendet werden wenn Seite 3 angeklickt wurde aber noch nicht offen ist.
                Die Anwendung blockiert!
            </div>
            <div className="col-span-2 bg-teal-300 m-2 p-2 rounded">
                Aktuelle Seite: {page} - Zähler: {count}
            </div>
            <div className="col-span-1 bg-teal-300 m-2 p-2 rounded">
                <input className="rounded" type="button" onClick={() => {
                    handleClick()
                }} value="Zähler++" />
            </div>

            <div className="p-2"><input className="rounded" type="button" onClick={() => {
                setPage('page1')
            }} value="Seite 1" /></div>
            <div className="p-2"><input className="rounded" type="button" onClick={() => {
                setPage('page2')
            }} value="Seite 2" /></div>
            <div className="p-2"><input className="rounded" style={{backgroundColor: '#fa7979'}} type="button" onClick={() => {
                setPage('page3')
            }} value="Seite 3" /></div>

            <div className="col-span-3 bg-teal-300 m-2 p-2 rounded">
                {page === 'page1' && <QuickPage title={page} />}
                {page === 'page2' && <QuickCalcPage title={page} />}
                {page === 'page3' && <SlowPageMemo />}
            </div>
        </div>
    </>
    );
};

/**
 * React 18 - useTransition - Content Update Demo mit useTransition
 * 
 * Mit useTransition wird das Öffnen der Page 3 async gemacht und ist damit 
 * unterpriorisiert. Die Anwendung blockiert nicht.
 */
export function ContentUpdateDemoUseTransition() {
    const [ page, setPage ] = useState('page1');
    const [ count, setCount ] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    };

    const [ isPending, startTransition ] = useTransition();

    const handlePageChange = (page: string) => {
        startTransition(() => {
            setPage(page);
        });
    };

    return (<>
        <div className="grid grid-cols-3 max-w-md">
            <div className="col-span-3 bg-teal-100 m-2 p-2 rounded">
                Seite 3 ist eine langsame Komponente, diese zu öffnen verzögert die Anwendung.
                Durch den Einsatz von useTransition bleibt die Anwendung reaktiv, blockiert also nicht.
            </div>
            <div className="col-span-2 bg-teal-300 m-2 p-2 rounded">
                Aktuelle Seite: {page} - Zähler: {count}
            </div>
            <div className="col-span-1 bg-teal-300 m-2 p-2 rounded">
                <input className="rounded" type="button" onClick={() => {
                    handleClick()
                }} value="Zähler++" />
            </div>

            <div className="p-2"><input className="rounded" type="button" onClick={() => {
                handlePageChange('page1')
            }} value="Seite 1" /></div>
            <div className="p-2"><input className="rounded" type="button" onClick={() => {
                handlePageChange('page2')
            }} value="Seite 2" /></div>
            <div className="p-2"><input className="rounded" style={{backgroundColor: '#fa7979'}} type="button" onClick={() => {
                handlePageChange('page3')
            }} value="Seite 3" /></div>

            <div className="col-span-3 bg-teal-300 m-2 p-2 rounded">
                {page === 'page1' && <QuickPage title={page} />}
                {page === 'page2' && <QuickCalcPage title={page} />}
                {page === 'page3' && <SlowPageMemo />}
            </div>
        </div>
    </>
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

const SlowPageMemo = memo(SlowComponent);

/** 
 * Es werden viele kleine Komponenten gerendert, 
 * jede der Komponenten verzögert leicht.
 */
function SlowComponent() {
    let items = [];
    for (let i = 0; i < 1000; i++) {
        items.push(<SlowComponentPart key={i} num={i} />);
    }
    return (
        <ul className="items">
            {items}
        </ul>
    );
};
type PartParam = {num: number};
function SlowComponentPart({num}: PartParam) {
    delay(1); // Wichtige und komplexe Berechnungslogik !
    return (<p>{num}</p>);
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
