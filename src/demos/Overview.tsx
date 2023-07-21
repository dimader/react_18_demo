import {
    HashRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { HeavyRenderDemo, HeavyRenderOptimizedDemo } from "./UseDeferredValueDemo";
import UseIdDemo from "./UseIdDemo";
import { ContentUpdateDemo, ContentUpdateDemoUseTransition } from "./UseTransitionDemo";
import { Uebung1 } from "./Uebung1";
import { Loesung1 } from "./Loesung1";

export default Overview;

/**
 * Array aller Demos.
 * Wichtig hier ist das das "Component"-Attribut Großgeschrieben ist. Damit kann es als JSX-Element
 * verwendet werden.
 */
const components = [
    {desc: "React 18 - useId - Demo", path:"/useId/", Component: UseIdDemo},
    
    {desc: "React 18 - useDeferredValue - Demo ohne Optimierung", path:"/useDeferredValue1/", Component: HeavyRenderDemo},
    {desc: "React 18 - useDeferredValue - Demo mit useDeferredValue-Hook", path:"/useDeferredValue2/", Component: HeavyRenderOptimizedDemo},

    {desc: "React 18 - useTransition - Content Update Demo ohne useTransition", path:"/useTransition1/", Component: ContentUpdateDemo},
    {desc: "React 18 - useTransition - Content Update Demo mit useTransition", path:"/useTransition2/", Component: ContentUpdateDemoUseTransition},

    {desc: "Übung zu React 18 #1 (Uebung1.tsx)", path:"/uebung1/", Component: Uebung1},
    {desc: "Lösung zu #1", path:"/loesung1/", Component: Loesung1},
];

/**
 * Erstellt die Routes für das Routing.
 */
function Overview() {
    return (<>
        <Router>
            <p/><Link className="underline decoration-solid" to="/">Zurück zur Übersicht</Link>
            <Routes>
                {
                    components.map(eachComponent => {
                        // Component-Attribut wird direkt als JSX-Element gesetzt.
                        // Das '*' wird für die Nested-Navigation benötigt.
                        return <Route path={eachComponent.path + '*'} element={<eachComponent.Component />} />
                    })
                }
                <Route path="/" element={<Links />} />
            </Routes>
        </Router>
    </>);
};

/**
 * Auflistung der Links zu allen Demos.
 */
function Links() {
    return (<>
        <div className="m-2 p-2">
        <h1 className="font-bold text-xl">Übersicht</h1>
        <div className="container">
            <nav>
                {
                    components.map(eachComponent => {
                        return <><p /><Link className="underline decoration-solid" to={eachComponent.path}>{eachComponent.desc}</Link> </>
                    })
                }
            </nav>
        </div>
        </div>
    </>);
};
