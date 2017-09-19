import data from '../../resources/data.json';
import environments from '../../resources/environments.json';
import Header from './Header';
import Link from './Link';
import SignOut from './SignOut';
import Translations from './Translations';
import userData from '../../dev/me.json';
import translation from '../../dev/translation.json';
import opintopolkuLogo from '../../virkailija-raamit/img/opintopolkufi.png';
import MediaQuery from'react-responsive';
import Icon from './Icon';
import mapKeys from 'lodash/mapKeys';
import urls from '../virkailija-raamit-oph.json'

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userData: []
        };

        this.getUserData();

        this.getCategoryWidth = this.getCategoryWidth.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        // Only update role basedata when userdata has changed
        if (nextState.userData !== this.state.userData) {
            this.dataWithConcatenatedParentRoles = this.getDataWithConcatenatedParentRoles(data);
        }
    }

    async getUserData(){

        try {
            const response = await fetch(urls["cas.me"],{
                credentials: 'include'
            });
            const ud = await response.json();
            this.setState({
                userData: ud
            });
            if(ud) {
                window.myroles = ud.groups;
                this.getTranslate();
            }
        } catch (error) {
            if (location.host.indexOf('localhost') === 0 || location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                this.setState({userData});
                if(userData){
                    this.getTranslate();
                }
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
        var groups = this.state.userData.groups;
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].indexOf('LANG_') === 0) {
                lang = groups[i].substring(5);
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

    getCategoryWidth = (item) => {
        const categoryNode = document.querySelector(`.category-${item}`);

        if (categoryNode) {
            console.log(categoryNode.getBoundingClientRect().width, getComputedStyle(categoryNode, null).width, categoryNode.offsetWidth);
            return categoryNode.offsetWidth;
        }
    };

    render() {
        const myRole = this.state.userData.groups;

        const dataWithLinks = this.dataWithConcatenatedParentRoles.filter(item => {
            if (item.requiresRole && item.links) {
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
                    if (item.links && item.links.length) {
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    }
                })
            }
            else if (item.links) {
                return true;
            }
        });

        const dataWithoutLinks = this.dataWithConcatenatedParentRoles.filter(item => {
            if (item.requiresRole && !item.links) {
                return item.requiresRole.some(requiredRole=> {
                    if (!item.links) {
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    }
                })
            }
            else if (!item.links) {
                return true;
            }
        });

        let maxLinksLength = 0;
        let previousMaxLinksLength = 0;

        dataWithLinks.forEach(item => {
            if (previousMaxLinksLength < item.links.length) {
                maxLinksLength = item.links.length;
                previousMaxLinksLength = maxLinksLength;
            }
        });

        const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

        const margin = 30;

        const fontSize = 14;

        const headerStyle={
            position: 'relative',
            fontSize: fontSize,
            height: 100,
            paddingTop: 5,
            backgroundColor:"#159ECB",
            color: "white",
            boxSizing: "border-box",
            zIndex: 100
        };

        const headerTabStyle= {
            ...headerStyle,
            height: 55,

        };
        const signOutStyle={
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '70%'
        };
        const mobileSignOutStyle={
            width: '100%',
            float: 'none',
            color: '#333333',
            backgroundColor:'white',
            textDecoration: 'none',
            borderBottom: '1px solid gray',
            marginTop: 0,
        };

        const tabSignOutStyle={
            width: '60%',
            margin: '10px 0px auto',
        };

        const imageStyle={
            display:`inline-block`,
            boxSizing: 'border-box',
            textAlign: 'center',
            height: 45,
            padding: 15,
            paddingTop: 8,
            fontSize:20,
            color: 'white',
            textDecoration: 'none',
            boxShadow: 'inset 0 0 0 5px #159ECB',
            zIndex: 2,
            borderBottom: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? '5px solid #BCE5FF' : ''
        };
        const style={
            textAlign: 'center',
            fontSize: fontSize,
            textDecoration:'none',
            verticalAlign: 'top',
        };

        const tabStyle={
            ...style,
            paddingTop: 15,
            maxWidth:'none',
            backgroundColor:"#159ECB"
        };

        const base={
            float: 'left',
            position: "absolute",
            zIndex:100,
            top: 55
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

                        {/*<a*/}
                          {/*style={{*/}
                              {/*fontSize: 20,*/}
                              {/*textDecoration: 'none',*/}
                              {/*textAlign: 'center',*/}
                              {/*width: 50,*/}
                              {/*display: 'inline-block',*/}
                              {/*boxSizing: 'border-box',*/}
                              {/*padding: '15px',*/}
                              {/*borderBottom: window.location.href.indexOf("/virkailijan-stp-ui/") > -1 ? '5px solid #BCE5FF' : '5px solid #159ECB',*/}
                              {/*color: '#FFF'*/}
                          {/*}}*/}
                          {/*href={urls["virkailijan-stp-ui.etusivu"]}*/}
                        {/*>*/}
                            {/*<Icon name="house"/>*/}
                        {/*</a>*/}

                        {/*{dataWithoutLinks.map((item) =>*/}
                          {/*<a*/}
                            {/*key={item.key}*/}
                            {/*style={{*/}
                                {/*textDecoration: 'none',*/}
                                {/*display: 'inline-block',*/}
                                {/*padding: '0 10px',*/}
                                {/*borderBottom: window.location.href.indexOf(item.href) > -1 ? '5px solid #BCE5FF' : '5px solid #159ECB',*/}
                                {/*color: '#FFF'*/}
                            {/*}}*/}
                            {/*href={item.href}*/}
                          {/*>*/}
                              {/*<Translations trans={item.key} />*/}
                          {/*</a>*/}
                        {/*)}*/}
                    </div>

                    <div style={{ ...base }}>
                        <div style={{position: 'static', display: 'flex'}}>
                            <a
                                className="nav-link"
                                href={urls["virkailijan-stp-ui.etusivu"]}
                                style={imageStyle}

                            >
                                <Icon name="house"/>
                            </a>

                            <div style={{
                                display: 'flex',
                                minWidth: 1200,
                                boxShadow: this.state.fade ? '0px 1px 4px 0px rgba(0,0,0,0.20)' : '',
                                transition: 'box-shadow .3s ease',
                                zIndex: 1
                            }}>
                                {dataWithLinks.map((item) => <Header
                                    transkey={item.key}
                                    key={item.key}
                                    isIE11={isIE11}
                                    links={item.links}
                                    maxLinksLength={maxLinksLength}
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

                            {dataWithoutLinks.map((item) => <Header
                              transkey={item.key}
                              key={item.key}
                              href={item.href}
                              style={style}
                            />)}
                        </div>
                    </div>

                    {/*<div style={{*/}
                        {/*fontSize: 14,*/}
                        {/*display: 'flex',*/}
                        {/*color: '#FFF',*/}
                        {/*backgroundColor: '#159ECB'*/}
                    {/*}}>*/}
                        {/*{dataWithLinks.map((item, index) =>*/}
                            {/*<div*/}
                                {/*key={item.key}*/}
                                {/*className={`category-${item.key}`}*/}
                                {/*style={{*/}
                                    {/*width: 200,*/}
                                    {/*padding: '0 10px',*/}
                                    {/*boxSizing: 'border-box',*/}
                                    {/*borderRight: index === dataWithLinks.length - 1 ? '1px solid #56B6D6' : '',*/}
                                    {/*borderBottom: item.links.map(({href}) => {*/}
                                        {/*return (window.location.href.indexOf(href) > -1 ? '5px solid #BCE5FF' : '5px solid #159ECB');*/}
                                    {/*}),*/}
                                    {/*borderLeft: '1px solid #56B6D6',*/}
                                    {/*cursor: 'pointer'*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*<Translations trans={item.key} />*/}
                            {/*</div>*/}
                        {/*)}*/}
                    {/*</div>*/}

                    {/*<div style={{*/}
                        {/*fontSize: 14,*/}
                        {/*backgroundColor: '#FFF',*/}
                        {/*boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.20)'*/}
                    {/*}}>*/}
                        {/*<div style={{*/}
                            {/*display: 'flex'*/}
                        {/*}}>*/}
                            {/*{dataWithLinks.map((item, index) =>*/}
                                {/*<div*/}
                                    {/*key={item.key}*/}
                                    {/*style={{*/}
                                        {/*display: 'inline-block',*/}
                                        {/*boxSizing: 'border-box',*/}
                                        {/*width: 200,*/}
                                        {/*borderRight: index === dataWithLinks.length - 1 ? '1px solid #F0F0F0' : '',*/}
                                        {/*borderLeft: '1px solid #F0F0F0',*/}
                                    {/*}}*/}
                                {/*>*/}
                                    {/*{item.links.map((link, index) =>*/}
                                        {/*<a*/}
                                            {/*key={link.key}*/}
                                            {/*style={{*/}
                                                {/*textDecoration: 'none',*/}
                                                {/*display: 'block',*/}
                                                {/*marginTop: index === 0 ? '5px' : '',*/}
                                                {/*marginBottom: index === item.links.length - 1 ? '5px' : '',*/}
                                                {/*padding: '5px 10px',*/}
                                                {/*color: '#000'*/}
                                            {/*}}*/}
                                            {/*href={link.href}*/}
                                        {/*>*/}
                                            {/*<Translations trans={link.key} />*/}
                                        {/*</a>*/}
                                    {/*)}*/}
                                {/*</div>*/}
                            {/*)}*/}
                        {/*</div>*/}
                    {/*</div>*/}
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

                            {dataWithLinks.map((item) => <Header
                                transkey={item.key}
                                key={item.key}
                                links={item.links}
                                href={item.href}
                                style={tabStyle}
                                hover={this.state.hover}
                                fade={this.state.fade}
                                media="tablet"
                            />)}

                            {dataWithoutLinks.map((item) => <Header
                              transkey={item.key}
                              key={item.key}
                              href={item.href}
                              style={style}
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

                            {dataWithLinks.map((item) => <Header
                                transkey={item.key}
                                key={item.key}
                                links={item.links}
                                href={item.href}
                                style={tabStyle}
                                hover={this.state.hover}
                                fade={this.state.fade}
                                media="mobile"
                            />)}

                            {dataWithoutLinks.map((item) => <Header
                              transkey={item.key}
                              key={item.key}
                              href={item.href}
                              style={style}
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
