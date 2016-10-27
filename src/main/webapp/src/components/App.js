
import data from '../../resources/data.json';
import Header from './Header';
import Link from './Link';
import SignOut from './SignOut';
import Translations from './Translations';
import roles from '../../virkailija-raamit/myroles.json';
import userData from '../../virkailija-raamit/myUserData.json';
import translation from '../../virkailija-raamit/translation.json';
import homeLogo from '../../virkailija-raamit/img/koti.png';
import opintopolkuLogo from '../../virkailija-raamit/img/opintopolkufi.png';


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roles: [],
            userData: []
        };

        this.getRoles();
        this.getUserData();

    }


    async getRoles(){

        try {
            const response = await fetch("/cas/myroles",{
                credentials: 'include'
            });
            const roles = await response.json();
            this.setState({
                roles: roles
            });
            if(roles){
                this.getTranslate();
            }
        } catch (error) {

            if (location.host.indexOf('localhost') === 0) { // dev mode (copypaste from upper)
                this.setState({roles});
                if(roles){
                    this.getTranslate();
                }
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = "/cas/login?service=" + location.href;
                }
            }
        }
    }

    async getUserData(){

        try {
            const response = await fetch("/authentication-service/resources/omattiedot",{
                credentials: 'include'
            });
            this.setState({
                userData: await response.json()
            });
        } catch (error) {
            if (location.host.indexOf('localhost') === 0) { // dev mode (copypaste from upper)
                this.setState({userData});
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = "/cas/login?service=" + location.href;
                }
            }
        }
    }

    async getTranslate(){
        var lang='fi';

        for (var i = 0; i < this.state.roles.length; i++) {
            if (this.state.roles[i].indexOf('LANG_') === 0) {
                lang = this.state.roles[i].substring(5);
            }
        }


        try {
            const response = await fetch("/lokalisointi/cxf/rest/v1/localisation?category=virkailijaraamit&locale="+lang,{
                credentials: 'include'
            });
            Translations.setTranslations(await response.json());
        } catch (error) {
            if (location.host.indexOf('localhost') === 0) { // dev mode (copypaste from upper)
                Translations.setTranslations(translation);
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = "/cas/login?service=" + location.href;
                }
            }
        }
    }


    Show= () => this.setState({hover: true});

    Hide= () => this.setState({hover: false});



    render() {
        const user = this.state.userData;
        const filteredData = data.filter(item => {
            return this.state.roles.some(myRole=> {
                    if (item.requiresRole) {
                        return item.requiresRole.some(requiredRole=> {
                            if (requiredRole.toUpperCase().startsWith(myRole.toUpperCase())) {

                                    const links = item.links.filter(link => {
                                        if (link.requiresRole) {
                                            return link.requiresRole.some(linkRequiredRole=> {
                                                return linkRequiredRole.toUpperCase().startsWith(myRole.toUpperCase());
                                            })
                                        } else {
                                            return true;
                                        }
                                    });
                                    item.links = links;

                            }
                            return requiredRole.toUpperCase().startsWith(myRole.toUpperCase());
                        })
                    } else {
                        return true;
                    }
                }
            )});
        const margin = 30;

        const fontSize = 12;

        const headerStyle={
            fontSize: fontSize,
            height: 105,
            marginLeft: -9,
            marginRight: -9,
            //paddingLeft: "10%",
            paddingTop: 10,
            paddingLeft: margin,

            //paddingRight: "10%",
            paddingRight: margin,
            //marginRight: -margin,
            backgroundColor:"#159ECB",
            color: "white",
            boxSizing: "initial",

        };
        const imageStyle={
            display:`inline-block`,
            height: 30,
            marginLeft: 10,
            marginRight: 10,
            width: 27
        };
        const style={
            paddingTop: 5,
            textAlign: 'center',
            fontSize: fontSize,
            display:`inline-block`,
            maxWidth:300,
            textDecoration:'none',
            wordWrap: 'break-word',
            paddingBottom: 10,
            verticalAlign: 'top',
            heigth:'100%',
        };

        const base={
            float: 'left',
            //marginLeft: margin,
            //marginRight: margin,
            position: "absolute",
            zIndex:100,
            top: 70,
            width: '99%',

        };

        const shadow={
            display:this.state.hover?'':'none',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(125, 125, 125, 0.25)",
            zIndex:99,
            left: 0
        };

        return(
            <div>
                <div style={headerStyle}>

                    <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                    {SignOut(this.state.userData)}
                </div>
                <div style={base}>
                    <div  style={{position: 'static', display: 'flex'}}>
                        <a href="/virkailijan-stp-ui/html/#/etusivu" style={{...imageStyle, backgroundColor: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '#1194bf':''}}><img src={homeLogo}/></a>
                        {filteredData.map((item, ...rest) => Header({...item, style}, this.state.hover, this.Show, this.Hide, ...rest))}
                    </div>

                </div>
                <div style={shadow}></div>
            </div>
        );
    }
};
