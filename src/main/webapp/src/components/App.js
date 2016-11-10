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
import MediaQuery from'react-responsive';
import Icon from './Icon';

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

            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
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
            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
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
            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
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


    Show= () => {
        let that = this;
        if(!this.state.hover){
            this.timer = setTimeout(function() {
                console.log("asd");
                that.setState({hover: true});
            },200)
        }else{
            this.setState({hover: true});
        }

    };

    Hide= () => {
        clearTimeout(this.timer);
        this.setState({hover: false});
    }

    toggleHover= () =>{
        //this.setState({hover: true});
      this.setState({hover: !this.state.hover});
    };


    render() {
        const user = this.state.userData;
        const myRole = this.state.roles;
        const filteredData = data.filter(item => {

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
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    })
                } else {
                    return true;
                }

            });
        const margin = 30;

        const fontSize = 12;

        const headerStyle={
            position: 'relative',
            fontSize: fontSize,
            height: 105,
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
            height: 30,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 5,
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

            verticalAlign: 'top',
            heigth:'100%',
        };
        const tabStyle={
            ...style,
            paddingTop: 15,
            display:'block',
            maxWidth:'none',
            backgroundColor:"#159ECB",
        }

        const base={
            float: 'left',
            position: "absolute",
            zIndex:100,
            top: 70,
            width: '99%',
        };

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

        return(
            <div>
                <MediaQuery minWidth={1224}>
                <div style={headerStyle}>
                    <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                    {SignOut({
                        userData:this.state.userData,
                        device:'desktop'
                    })}
                </div>
                <div style={base}>

                        <div  style={{position: 'static', display: 'flex'}}>
                            <a href="/virkailijan-stp-ui/html/#/etusivu" style={{...imageStyle, backgroundColor: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '#1194bf':''}}><img src={homeLogo}/></a>
                            {filteredData.map((item) => <Header transkey={item.key} key={item.key} links={item.links} href={item.href} style={style} hover={this.state.hover} show={this.Show} hide={this.Hide} />)}
                        </div>


                </div>
                </MediaQuery>
                <MediaQuery minWidth={641} maxWidth={1223}>
                    <div style={headerTabStyle}>

                        <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                        <div style={{float:'right', padding:20, paddingTop:10, fontSize: 20}} onClick={this.toggleHover}>
                            <Icon name="bars"/>
                        </div>
                        {SignOut({userData:this.state.userData, signOutStyle:tabSignOutStyle, device:'tab'})}
                        <div  style={{position: 'absolute', top:60, width:'100%', display: this.state.hover?'':'none', backgroundColor:"white"}}>


                            <a href="/virkailijan-stp-ui/html/#/etusivu" style={{
                                textDecoration:'none',
                                color: '#333333',
                                width:'100%',
                                backgroundColor: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '#1194bf':''
                            }}>
                                <div className="links">
                                    <img src={homeLogo}/> <Translations trans="virkailijantyopoyta"/>
                                </div>
                            </a>

                            {filteredData.map((item) => <Header transkey={item.key} key={item.key} links={item.links} href={item.href} style={tabStyle} hover={this.state.hover} />)}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={640}>
                    <div style={headerTabStyle}>

                        <img className="opintopolkuLogo" src={opintopolkuLogo}/>
                        <div style={{float:'right', padding:20, paddingTop:10, fontSize: 20}} onClick={this.toggleHover}>
                            <Icon name="bars"/>
                        </div>

                        <div  style={{position: 'absolute', top:60, width:'100%', display: this.state.hover?'':'none', backgroundColor:"white"}}>
                            {SignOut({userData:this.state.userData, signOutStyle:mobileSignOutStyle, device:'mobile'})}

                            <a href="/virkailijan-stp-ui/html/#/etusivu" style={{
                                textDecoration:'none',
                                color: '#333333',
                                width:'100%',
                                backgroundColor: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '#1194bf':''
                            }}>
                                <div className="links">
                                    <img src={homeLogo}/> <Translations trans="virkailijantyopoyta"/>
                                </div>
                            </a>

                            {filteredData.map((item) => <Header transkey={item.key} key={item.key} links={item.links} href={item.href} style={tabStyle} hover={this.state.hover} />)}
                        </div>
                    </div>

                </MediaQuery>

            </div>
        );
    }
};
