import React, { useState } from "react";
import { dictionaryItems } from '../../../../config';
import TabContent from "../TabContent/";

const Tabs = () => {
    const [active, setActive] = useState(null);

    const openTab = e => setActive(+e.target.dataset.index);

    return (
        <div className='container mt-5'>
            <div>
                {dictionaryItems.map((n, i) => (
                    <button
                        onClick={openTab}
                        data-index={i}
                    >{n.item}</button>
                ))}
            </div>
            <TabContent/>
        </div>
    );
};

export default Tabs;