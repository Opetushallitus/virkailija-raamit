
import data from '../../resources/data.json';
import Header from './Header';
import Link from './Link';
import SignOut from './SignOut';
import roles from '../../virkailija-raamit/myroles.json'
import userData from '../../virkailija-raamit/myUserData.json'
import homeLogo from '../../virkailija-raamit/img/koti.png'
import opintopolkuLogo from '../../virkailija-raamit/img/opintopolkufi.png'


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roles: []
        };
        this.getRoles();
        this.getUserData();
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

    toggleHover= () =>{
        this.setState({hover: !this.state.hover});
    };

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
        const borderColor = "1px solid #AAAAAA";
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

            display:`inline-block`,
            width:`${100/(filteredData.length+1)}%`,
            maxWidth:300,

            wordWrap: 'break-word',
            paddingBottom: 10,
            verticalAlign: 'bottom',
            borderLeft: borderColor,

        };
        const linkStyle={

            display:`inline-block`,
            width:`${100/(filteredData.length+1)}%`,
            maxWidth:300,
            verticalAlign: 'top',
            height: '100%',

            //marginLeft: 10,
            //paddingLeft: 10,
            //marginRight: 5,
            borderLeft: borderColor,
            backgroundColor: 'white',

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
                <div style={base} onMouseEnter={this.toggleHover}
                     onMouseLeave={this.toggleHover} >

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
