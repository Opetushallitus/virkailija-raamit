import React from 'react';
import './styles.css';

const Icon = ({name}) =>{
    return <span className={"raami-icon-"+name} style={{verticalAlign: "baseline"}} />
};

export default Icon;
