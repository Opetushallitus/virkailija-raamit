import Translation from './Translations';
import Icon from './Icon';
const style ={
    float: "right",
    marginRight: 20,
    marginTop: 10,

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
            <a href={raamiUrl("authentication-henkiloui.omattiedot")} style={desktopStyle}>
                <Icon name="settings"/> {userName ? userName:''}
            </a>
            |
            <a href={raamiUrl("service-provider-app.saml.logout")} style={desktopStyle}><Icon name="logout"/><Translation trans="logout"/></a>
        </span>;
    }else if(device == 'mobile'){
        content = <span>

            <a href="/ohjeet" style={mobileStyle}>
                <div style={mobileStyle} className="links">
                    <Icon name="help"/> <Translation trans="ohjeet"/>
                </div>
            </a>


            <a href={raamiUrl("authentication-henkiloui.omattiedot")} style={mobileStyle}>
                <div style={mobileStyle} className="links">
                    <Icon name="settings"/> {userName ? userName:''}
                </div>
            </a>


            <a href={raamiUrl("service-provider-app.saml.logout")} style={mobileStyle}>
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
