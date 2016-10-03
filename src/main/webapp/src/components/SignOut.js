import Translation from './Translations';
import ratas from '../../virkailija-raamit/img/ratas.png'
const style ={
    float: "right",
    marginRight: 20,
    marginTop: 20,

};

const logout={
    paddingLeft: 10,
    paddingRight: 10,
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
        <a href="/authentication-henkiloui/html/#/omattiedot" style={logout}>
            <img style={{...logout,...settingsImage}} src={ratas}/>{userName}
        </a>
        |
        <a href="/service-provider-app/saml/logout" style={logout}><Translation trans="logout"/></a></div>;
}
