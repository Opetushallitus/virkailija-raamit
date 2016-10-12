import Translation from './Translations';
import Icon from './Icon';
import ratas from '../../virkailija-raamit/img/ratas.png'
import help from '../../virkailija-raamit/img/help.png'
const style ={
    float: "right",
    marginRight: 20,
    marginTop: 20,

};

const logout={
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    textDecoration: "none"
};
const settingsImage={
    marginBottom: -3,
};

export default (userData) =>{
    var userName = '';

    if(userData){
        userName = userData.kutsumanimi + " "+ userData.sukunimi;
    }

    return <div style={style}>

        <a href="/ohjeet" style={logout}>
            <Icon name="help"/><Translation trans="ohjeet"/>
        </a>
        |
        <a href="/authentication-henkiloui/html/#/omattiedot" style={logout}>
            <Icon name="settings"/>{userName}
        </a>
        |

        <a href="/service-provider-app/saml/logout" style={logout}><Icon name="logout"/><Translation trans="logout"/></a></div>;
}
