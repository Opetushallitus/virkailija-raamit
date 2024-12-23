import React from 'react';
import Translation from './Translations';
import Icon from './Icon/Icon';
const style ={
    float: "right",
    marginTop: 10,

};

const logout={

    textDecoration: "none"
};

const desktopStyle={
    ...logout,
    color:'white',
    padding: 15,
};

const mobileStyle={
    ...logout,
    color:'black',
    width: "100%",
}

export default ({userData, signOutStyle, device}) =>{
    let userName = '';

    if(userData){
        userName = userData.firstName + " "+ userData.lastName;
    }

    let content;

    if (device === 'desktop' || device === 'tab') {
        content = <span>
            <a className="nav-link" href="https://wiki.eduuni.fi/x/TlPICw" target="_blank" rel="noopener noreferrer" style={desktopStyle}>
                <Icon name="help"/> <Translation trans="ohjeet"/>
            </a>
            <a className="nav-link" href="/henkilo-ui/omattiedot" style={desktopStyle}>
                <Icon name="settings"/> {userName ? userName:''}
            </a>
            <a className="nav-link" href="/service-provider-app/saml/logout" style={desktopStyle}><Icon name="logout"/><Translation trans="logout"/></a>
        </span>;
    }else if(device === 'mobile'){
        content = <span>

            <a className="nav-link" href="https://wiki.eduuni.fi/x/TlPICw" target="_blank" rel="noopener noreferrer" style={mobileStyle}>
                <div style={mobileStyle} className="links">
                    <Icon name="help"/> <Translation trans="ohjeet"/>
                </div>
            </a>


            <a className="nav-link" href="/henkilo-ui/omattiedot" style={mobileStyle}>
                <div style={mobileStyle} className="links">
                    <Icon name="settings"/> {userName ? userName:''}
                </div>
            </a>


            <a className="nav-link" href="/service-provider-app/saml/logout" style={mobileStyle}>
                <div style={mobileStyle} className="links">
                    <Icon name="logout"/> <Translation trans="logout"/>
                </div>
            </a>

        </span>;
    }

    return <div style={{...style, ...signOutStyle}}>
        {content}
        </div>
}
