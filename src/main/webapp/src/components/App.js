
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
        this.getTranslate();
    }


    async getRoles(){

        try {
            const response = await fetch("/cas/myroles",{
                credentials: 'include'
            });
            this.setState({
                roles: await response.json()
            });
        } catch (error) {
            if (location.host.indexOf('localhost') === 0) { // dev mode (copypaste from upper)
                this.setState({roles});
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
        /*
        for (var i = 0; i < window.myroles.length; i++) {
            if (this.state[i].indexOf('LANG_') === 0) {
                lang = window.myroles[i].substring(5);
            }
        }
        */

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
        const headerBorderColor = "1px solid #56B6D6";

        const borderColor = "1px solid #F0F0F0";
        const headerStyle={

            //paddingLeft: "10%",
            paddingTop: 10,
            paddingLeft: margin,
            marginLeft: -margin,
            //paddingRight: "10%",
            paddingRight: margin,
            marginRight: -margin,
            backgroundColor:"#159ECB",
            color: "white"
        };
        const imageStyle={
            display:`inline-block`,
            height: 30,
            paddingLeft: 10,
            paddingRight: 10,
            width: 27
        };
        const style={
            fontSize: '14px',
            display:`inline-block`,
            width:`${100/(filteredData.length+1)}%`,
            maxWidth:300,

            wordWrap: 'break-word',
            paddingBottom: 10,
            verticalAlign: 'bottom',
            borderLeft: headerBorderColor,

        };
        const linkStyle={
            fontSize: '14px',
            display:`inline-block`,
            width:`${100/(filteredData.length+1)}%`,
            maxWidth:300,
            verticalAlign: 'top',
            height: '100%',
            borderLeft: borderColor,
            backgroundColor: 'white',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.20)',

        };
        const linkBase={

            width: '100%',
            position:'absolute',
            display:this.state.hover?'table':'none',

        };
        const base={
            marginLeft: margin,
            marginRight: margin,
            position: "relative",
            zIndex:1,
        };

        const shadow={
            display:this.state.hover?'':'none',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",

        };

        return(
            <div style={headerStyle}>
                <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                {SignOut(this.state.userData)}
                <div style={base} onMouseEnter={this.Show}
                     onMouseLeave={this.Hide} >

                    <div>

                        <a href="index.html" style={{...imageStyle, borderBottom: window.location.href.indexOf("index.html") > -1 ? '3px solid white':''}}><img src={homeLogo}/></a>
                        {filteredData.map((item, ...rest) => Header({...item, style}, ...rest))}
                    </div>

                    <div style={linkBase}>
                        <div style={imageStyle} className="linkCol"></div>
                        {filteredData.map(({links}, index) => <div style={linkStyle} className="linkCol" key={index}>{links.map(Link)}</div>)}
                    </div>
                </div>
                <div style={shadow}></div>
            </div>
        );
    }
};
