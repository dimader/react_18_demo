import {
    HashRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
// Import der Komponenten
import { LongApiCallDemo } from "./DemoApi";
import { HeavyInputLagDemo } from "./DemoApi";
import { ContentUpdateDemo } from "./DemoApi";
import { ContentUpdateDemoUseTransition } from "./DemoApi";

import { TabContainer } from "./ReactDemoOfficial";
import { HeavyRenderDemo, HeavyRenderOptimizedDemo } from "./UseDeferredValueDemo";
import UseIdDemo from "./UseIdDemo";

export default Overview;

/**
 * Array aller Demos.
 * Wichtig hier ist das das "Component"-Attribut Großgeschrieben ist. Damit kann es als JSX-Element
 * verwendet werden.
 */
const components = [
    {desc: "useId - Demo", path:"/useId/", Component: UseIdDemo},
    
    {desc: "useEffect - Long API Call Demo", path:"/api/", Component: LongApiCallDemo},

    {desc: "Input Lag Demo - aufwändiges Rendern", path:"/inputlag1/", Component: HeavyInputLagDemo},

    {desc: "useDeferredValue - Demo ohne Optimierung", path:"/useDeferredValue1/", Component: HeavyRenderDemo},
    {desc: "useDeferredValue - Demo mit useDeferredValue-Hook", path:"/useDeferredValue2/", Component: HeavyRenderOptimizedDemo},

    {desc: "Content Update Demo 1", path:"/content1/", Component: ContentUpdateDemo},
    {desc: "Content Update Demo mit useTransition", path:"/content2/", Component: ContentUpdateDemoUseTransition},
    {desc: "FB Demo", path:"/fbdemo1/", Component: TabContainer},
];

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
 * @returns JSX
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