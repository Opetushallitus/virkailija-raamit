import React from 'react';
import './styles.css';

/**
 * icomoon.ttf acts as source which one can edit and convert to .woff. The .woff should be base64 encoded and added to
 * copy pasted to styles.css since build process messes the charset.
 */
const Icon = ({name}) =>{
    return <span className={"raami-icon-"+name} style={{verticalAlign: "baseline"}} />
};

export default Icon;
