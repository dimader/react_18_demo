import { useState } from "react";

const data = [
    { id: 1, name: "Film Der Pate"},
    { id: 2, name: "Film Der Herr der Ringe: Die Rückkehr des Königs"},
    { id: 3, name: "Film Forrest Gump"},
    { id: 4, name: "Film Fight Club"},
    { id: 5, name: "Film Star Wars: Episode V - Das Imperium schlägt zurück"},
    { id: 6, name: "Film Titanic"},
    { id: 7, name: "Film Der weiße Hai"},
    { id: 8, name: "Film Der dunkle Ritter"},
    { id: 9, name: "Film Schindlers Liste"},
    { id: 10, name: "Film Pulp Fiction"},
    { id: 11, name: "Film Der Hobbit: Eine unerwartete Reise"},
    { id: 12, name: "Film Inception"},
    { id: 13, name: "Film Der König der Löwen"},
    { id: 14, name: "Film Matrix"},
    { id: 15, name: "Film Der Herr der Ringe: Die Gefährten"},
    { id: 16, name: "Film Avengers: Endgame"},
    { id: 17, name: "Film Jurassic Park"},
    { id: 18, name: "Film Harry Potter und der Stein der Weisen"},
    { id: 19, name: "Film Zurück in die Zukunft"},
    { id: 20, name: "Film Der Zauberer von Oz"},
    { id: 21, name: "Film E.T. - Der Außerirdische"},
    { id: 22, name: "Film Der große Gatsby"},
    { id: 23, name: "Film Braveheart"},
    { id: 24, name: "Film Gladiator"},
    { id: 25, name: "Film Das Schweigen der Lämmer"},
    { id: 26, name: "Film Casablanca"},
    { id: 27, name: "Film Das Leben ist schön"},
    { id: 28, name: "Film The Shawshank Redemption"},
    { id: 29, name: "Film Black Panther"},
    { id: 30, name: "Film La La Land"},
];

interface Film {
    name: string,
    ident: number,
};
/**
 * Listenelement mit hoher Laufzeit.
 * In der Lösung soll diese Komponente unverändert übernommen werden!
 */
const ListData = (data: Film) => {
    let now = performance.now();
    while (performance.now() - now < 20) {
        //..
    }
    return <p key={data.ident}>{data.name}</p>;
};

/**
 * Übungsaufgabe.
 * 
 * Über eine Filtereingabe kann in der Liste der Filme nach einem Titel gesucht werden.
 * Die Ergebisse werden aufgelistet.
 * 
 * Aufgabenstellung: Passt die Anwendung so an das der Anwender keine Verzögerung mehr beim Tippen hat.
 * Dabei muss die Komponente ListData unverändert verwendet werden. 
 */
export function Uebung1() {
    
    const [filter, setFilter] = useState("");

    return (
        <>
            <h1>Suche innerhalb der Top 30 Filme!</h1>
            <input
                type="search"
                placeholder="Suche.."
                onChange={(e) => setFilter(e.target.value)}
            />

            <h2>Aktueller Suchbegriff: {filter}</h2>
            <p>Suchergebnis:</p>
            {data
                .filter((eachData) => {
                    return (
                        filter.length !== 0 &&
                        eachData.name.toLowerCase().includes(filter.toLowerCase())
                    );
                })
                .map((user) => (
                    <ListData ident={user.id} name={user.name} />
                ))
            }
        </>
    );
};
