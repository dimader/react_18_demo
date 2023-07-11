import { useId, useState } from "react";
import './../App.css';

/**
 * useId-Hook Demo.
 * 
 * Über Buttons kann die Anzahl an AriaTextFields beliebig geändert werden,
 * die IDs innerhalb derAriaTextFiled-Komponente bleiben auch bei mehrfach Wiederverwendung
 * immer eindeutig.
 * @returns Demo
 */
export default function UseIdDemo() {
    const [ count, setCount ] = useState(1);

    let content = [];
    for (let i=0; i < count; i++) {
        content.push(<AriaTextField />);
    }

    return (
        <>
            <p>Anzahl: {count}</p>

            <input type="button" onClick={() => setCount(count - 1)} value="Anzahl --" />
            <input type="button" onClick={() => setCount(count + 1)} value="Anzahl ++" />

            {content}
        </>
    );
};

/**
 * Ein Eingabefeld zusammen mit der passenden Beschreibung.
 * Nutzt ARIA um die Beschreibung mit dem Eingabefeld zu verbinden.
 * Accessible Rich Internet Applications (ARIA)
 */
function AriaTextField() {
    const id = useId();
    return (
        <>
            <label>
                Eingabe:
                <input type="search" aria-describedby={id} />
            </label>
            <p id={id}>
                Beschreibung für Eingabe mit der ID: {id}
            </p>
        </>
    );
};
