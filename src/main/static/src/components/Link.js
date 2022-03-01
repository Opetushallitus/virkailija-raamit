import React from 'react';
import Translation from './Translations';

const linkStyle={
    maxWidth:300,
    fontSize: 14,
    verticalAlign: 'top',
    height: '100%',
    textDecoration: 'none',
    color: '#000',
    backgroundColor: '#F6FCFF'
};

export default ({key,resolvedHref},hover, index) =>{
    return <a className="nav-link" style={linkStyle} href={resolvedHref} key={index}><div  className="links" key={index}><Translation trans={key}/></div></a>;
}
