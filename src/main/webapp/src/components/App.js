import data from '../../resources/data.json';
import environments from '../../resources/environments.json';
import Header from './Header';
import Link from './Link';
import SignOut from './SignOut';
import Translations from './Translations';
import roles from '../../virkailija-raamit/myroles.json';
import userData from '../../virkailija-raamit/myUserData.json';
import translation from '../../virkailija-raamit/translation.json';
import opintopolkuLogo from '../../virkailija-raamit/img/opintopolkufi.png';
import MediaQuery from'react-responsive';
import Icon from './Icon';
import mapKeys from 'lodash/mapKeys';
import urls from '../virkailija-raamit-oph.json'

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

    componentWillUpdate(nextProps, nextState) {
        // Only update data when roles are changed
        if (nextState.roles !== this.state.roles) {
            this.dataWithConcatenatedParentRoles = this.getDataWithConcatenatedParentRoles(data);
        }
    }

    async getRoles(){

        try {
            const response = await fetch(urls["cas.myroles"],{
                credentials: 'include'
            });
            const roles = await response.json();
            this.setState({
                roles: roles
            });
            if(roles){
                window.myroles = roles;
                this.getTranslate();
            }
        } catch (error) {

            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                this.setState({roles});
                if(roles){
                    this.getTranslate();
                }
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = urls["cas.login"]+ location.href;
                }
            }
        }
    }

    async getUserData(){

        try {
            const response = await fetch(urls["authentication-service.omattiedot"],{
                credentials: 'include'
            });
            this.setState({
                userData: await response.json()
            });
        } catch (error) {
            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                this.setState({userData});
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = urls["cas.login"] + location.href;
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
            const response = await fetch(urls["lokalisointi.localisation"] + lang,{
                credentials: 'include'
            });
            Translations.setTranslations(await response.json());
        } catch (error) {
            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                Translations.setTranslations(translation);
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = urls["cas.login"] + location.href;
                }
            }
        }
    }

    dataWithConcatenatedParentRoles = [];

    /*
         An array of objects formed as items in 'data.json':
         [
             {
                 requiresRole: [roles],
                 key: [key],
                 links: [links]
             },
            ...
         ]

         Links' requiresRole arrays are concatenated to parent's requiresRole,
         for checking if parent should be displayed in the UI.
     */
    getDataWithConcatenatedParentRoles = (data) => {
        return data.map(item => {
            // Concatenate links' required roles to parent's required roles
            if (item.requiresRole && item.links) {
                item.links.forEach(link => {
                    if (link.requiresRole) {
                        item.requiresRole = item.requiresRole.concat(link.requiresRole);
                    }
                });
            }

            // Map all item's properties to array's objects
            return mapKeys(item, (key, value) => {
                return value;
            });
        });
    };

    Show= () => {
        let that = this;

        clearTimeout(this.openTimer);
        clearTimeout(this.fadeInTimer);
        clearTimeout(this.fadeOutTimer);
        clearTimeout(this.closeTimer);

        this.fadeInTimer = setTimeout(function() {
            that.setState({fade: true});
        }, 300);

        this.openTimer = setTimeout(function() {
            that.setState({hover: true});
        }, 300)
    };

    Hide= () => {
        let that = this;

        clearTimeout(this.openTimer);
        clearTimeout(this.fadeInTimer);

        this.fadeOutTimer = setTimeout(function() {
            that.setState({fade: false});
            that.setState({fadingOut: true})
        }, 300);

        this.closeTimer = setTimeout(function() {
            that.setState({hover: false});
            that.setState({fadingOut: false})
        }, 600);
    };

    toggleHover= () =>{
        this.setState({fade: true});
        this.setState({hover: !this.state.hover});
    };


    render() {
        const user = this.state.userData;
        const myRole = this.state.roles;

        const filteredData = this.dataWithConcatenatedParentRoles.filter(item => {
            if (item.requiresRole) {
                return item.requiresRole.some(requiredRole=> {
                    if (myRole.indexOf(requiredRole.toUpperCase()) > -1) {
                        if(item.links){
                            const links = item.links.filter(link => {
                                if (link.requiresRole) {
                                    return link.requiresRole.some(linkRequiredRole=> {
                                        //console.log(linkRequiredRole.toUpperCase(), myRole.toUpperCase());
                                        return myRole.indexOf(linkRequiredRole.toUpperCase()) > -1;
                                    })
                                } else {
                                    return true;
                                }
                            });
                            item.links = links;
                        }
                    }

                    // Check if parent should be displayed if it has no 'links' property, or it has children in 'links'
                    if (!item.links || (item.links && item.links.length)) {
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    }
                })
            } else {
                return true;
            }
        });

        const margin = 30;

        const fontSize = 14;

        const headerStyle={
            position: 'relative',
            fontSize: fontSize,
            height: 110,
            marginLeft: -8,
            marginRight: -8,
            paddingTop: 10,
            backgroundColor:"#159ECB",
            color: "white",
            boxSizing: "initial",
            zIndex: 100
        };

        const headerTabStyle= {
            ...headerStyle,
            height: 50,

        };
        const signOutStyle={
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '70%'
        };
        const mobileSignOutStyle={
            //paddingRight: 10,
            //paddingLeft: 10,
            width: '100%',
            float: 'none',
            color: '#333333',
            backgroundColor:'white',
            textDecoration: 'none',
            //paddingTop: 10,
            //paddingBottom: 10,
            borderBottom: '1px solid gray',
            marginTop: 0,
        };

        const tabSignOutStyle={
            width: '60%',
            margin: '10px 0px auto',
        };

        const imageStyle={
            display:`inline-block`,
            marginTop: 5,
            boxSizing: 'border-box',
            textAlign: 'center',
            height: 50,
            padding: 15,
            paddingTop: 8,
            fontSize:20,
            color: 'white',
            textDecoration: 'none'
        };
        const style={
            textAlign: 'center',
            fontSize: fontSize,
            textDecoration:'none',
            verticalAlign: 'top'
        };
        const tabStyle={
            ...style,
            paddingTop: 15,
            maxWidth:'none',
            backgroundColor:"#159ECB",
        };

        const base={
            float: 'left',
            position: "absolute",
            zIndex:100,
            top: 65
        };

        // 'Luokka' / QA environment alert

        // Check if current URL contains the environment object's href
        const isCurrentEnvironment = (environment) => {
            return location.href.indexOf(environment.href) > -1;
        };

        const currentEnvironment = environments.find(isCurrentEnvironment);
        const isTestEnvironment = currentEnvironment && currentEnvironment.type === 'test';

        const testEnvironmentAlertStyle = {
            display: 'inline-block',
            position: 'fixed',
            top: '10px',
            left: '-35px',
            width: '120px',
            padding: '5px',
            zIndex: '101',
            fontSize: 12,
            textAlign: 'center',
            color: "#FFF",
            backgroundColor: '#E53935',
            boxShadow: '0 6px 12px rgba(0,0,0,.175)',
            transform: 'rotate(-45deg)'
        };

        return(
            <header className="virkailija-raamit">
                {/*
                 Display alert when not in production environment.
                 */}
                {
                    isTestEnvironment &&
                    <div style={testEnvironmentAlertStyle}>
                        {currentEnvironment.name}
                    </div>
                }

                <MediaQuery minWidth={1224}>
                    <div style={headerStyle}>
                        <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                        {SignOut({
                            userData:this.state.userData,
                            device:'desktop'
                        })}
                    </div>

                    <div style={base}>
                        <div style={{position: 'static', display: 'flex'}}>
                            <a
                                className="nav-link"
                                href={urls["virkailijan-stp-ui.etusivu"]}
                                style={{
                                    ...imageStyle,
                                    borderBottom: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '5px solid #FFF' : ''
                                }}

                            >
                                <Icon name="house"/>
                            </a>

                            {filteredData.map((item) => <Header
                                transkey={item.key}
                                key={item.key}
                                links={item.links}
                                href={item.href}
                                style={style}
                                hover={this.state.hover}
                                fade={this.state.fade}
                                fadingOut={this.state.fadingOut}
                                show={this.Show}
                                hide={this.Hide}
                                media="desktop"
                            />)}
                        </div>


                    </div>
                </MediaQuery>
                <MediaQuery minWidth={641} maxWidth={1223}>
                    <div style={headerTabStyle}>

                        <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                        <div style={{float:'right', padding:20,paddingRight:15, paddingTop:5, fontSize: 20}} onClick={this.toggleHover}>
                            <Icon name="bars"/>
                        </div>
                        {SignOut({userData:this.state.userData, signOutStyle:tabSignOutStyle, device:'tab'})}
                        <div  style={{position: 'absolute', top:60, width:'100%', display: this.state.hover?'':'none', backgroundColor:"white"}}>


                            <a href={urls["virkailijan-stp-ui.etusivu"]} style={{
                                textDecoration:'none',
                                color: '#333333',
                                width:'100%',
                                backgroundColor: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? '#1194bf':''
                            }}>
                                <div className="links">
                                    <Icon name="house"/> <Translations trans="virkailijantyopoyta"/>
                                </div>
                            </a>

                            {filteredData.map((item) => <Header
                                transkey={item.key}
                                key={item.key}
                                links={item.links}
                                href={item.href}
                                style={tabStyle}
                                hover={this.state.hover}
                                fade={this.state.fade}
                                media="tablet"
                            />)}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={640}>
                    <div style={headerTabStyle}>

                        <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                        <div style={{float:'right', padding:20,paddingRight:15, paddingTop:5, fontSize: 20}} onClick={this.toggleHover}>
                            <Icon name="bars"/>
                        </div>

                        <div  style={{position: 'absolute', top:60, width:'100%', display: this.state.hover?'':'none', backgroundColor:"white"}}>
                            {SignOut({userData:this.state.userData, signOutStyle:mobileSignOutStyle, device:'mobile'})}

                            <a href={urls["virkailijan-stp-ui.etusivu"]} style={{
                                textDecoration:'none',
                                color: '#333333',
                                width:'100%',
                                backgroundColor: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? '#1194bf':''
                            }}>
                                <div className="links">
                                    <Icon name="house"/> <Translations trans="virkailijantyopoyta"/>
                                </div>
                            </a>

                            {filteredData.map((item) => <Header
                                transkey={item.key}
                                key={item.key}
                                links={item.links}
                                href={item.href}
                                style={tabStyle}
                                hover={this.state.hover}
                                fade={this.state.fade}
                                media="mobile"
                            />)}
                        </div>
                    </div>

                </MediaQuery>
            </header>
        );

        const shadow={
            display:this.state.hover?'':'none',
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(125, 125, 125, 0.25)",
            zIndex:99,
            left: 0,
            top: 0
        };
    }
};
