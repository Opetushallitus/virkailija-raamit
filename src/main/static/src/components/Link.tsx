import React from 'react';
import Translation from './Translations';

const linkStyle = {
    maxWidth: 300,
    fontSize: 14,
    verticalAlign: 'top',
    height: '100%',
    textDecoration: 'none',
    color: '#000',
    backgroundColor: '#F6FCFF'
};

const Link: React.FC<{ translationKey: string, resolvedHref: string }> = ({translationKey, resolvedHref}) => {
    return <a className="nav-link" style={linkStyle} href={resolvedHref}>
        <div className="links"><Translation trans={translationKey}/></div>
    </a>;
}
export default Link;
