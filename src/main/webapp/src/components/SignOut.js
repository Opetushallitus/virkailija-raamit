import Translation from './Translations';
import Icon from './Icon';
const style ={
    float: "right",
    marginRight: 20,
    marginTop: 20,

};

const logout={

    textDecoration: "none"
};

const desktopStyle={
    ...logout,
    color:'white',
    marginLeft: 10,
    marginRight: 10,
};

const mobileStyle={
    ...logout,
    color:'black',
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5
}

const settingsImage={
    marginBottom: -3,
};

export default ({userData, signOutStyle, device}) =>{
    var userName = '';

    if(userData){
        userName = userData.kutsumanimi + " "+ userData.sukunimi;
    }
    let content;

    if (device == 'desktop' || device == 'tab') {
        content = <span>
            <a href="/ohjeet" style={desktopStyle}>
                <Icon name="help"/> <Translation trans="ohjeet"/>
            </a>
            |
            <a href="/authentication-henkiloui/html/#/omattiedot" style={desktopStyle}>
                <Icon name="settings"/> {userName}
            </a>
            |
            <a href="/service-provider-app/saml/logout" style={desktopStyle}><Icon name="logout"/><Translation trans="logout"/></a>
        </span>;
    }else if(device == 'mobile'){
        content = <span>

            <a href="/ohjeet" style={mobileStyle}>
                <div style={mobileStyle}>
                    <Icon name="help"/> <Translation trans="ohjeet"/>
                </div>
            </a>


            <a href="/authentication-henkiloui/html/#/omattiedot" style={mobileStyle}>
                <div style={mobileStyle}>
                    <Icon name="settings"/> {userName}
                </div>
            </a>


            <a href="/service-provider-app/saml/logout" style={mobileStyle}>
                <div style={mobileStyle}>
                    <Icon name="logout"/> <Translation trans="logout"/>
                </div>
            </a>

        </span>;
    }


    return <div style={{...style, ...signOutStyle}}>
        {content}
        </div>
}
