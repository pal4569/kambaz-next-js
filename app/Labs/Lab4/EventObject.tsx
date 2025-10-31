import { useState } from "react";

export default function EventObject() {
    const [event, setEvent] = useState<Record<string, unknown> | null>(null);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const simplifiedEvent = {
            type: e.type,
            clientX: e.clientX,
            clientY: e.clientY,
            target: e.target instanceof HTMLElement ? e.target.outerHTML : null,
        };
        setEvent(simplifiedEvent);
    };

    return (
        <div>
            <h2>Event Object</h2>
            <button onClick={(e) => handleClick(e)}
            className="btn btn-primary"
            id="wd-display-event-obj-click">
            Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr/>
        </div>
);}
