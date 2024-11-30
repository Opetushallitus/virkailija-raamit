var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import environments from './environments.json';
import Header from './Header';
import SignOut from './SignOut';
import Translations from './Translations';
import opintopolkuLogo from './opintopolku-logo-uusi.svg';
import MediaQuery from 'react-responsive';
import Icon from './Icon/Icon';
import mapKeys from 'lodash/mapKeys';
import urls from './virkailija-raamit-oph.json';
import { find } from 'ramda';
import browserUpdate from 'browser-update';
import { colors } from './colors';
import './styles.css';
var Raamit = /** @class */ (function (_super) {
    __extends(Raamit, _super);
    function Raamit(props) {
        var _this = _super.call(this, props) || this;
        _this.dataWithConcatenatedParentRoles = [];
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
        _this.getDataWithConcatenatedParentRoles = function (data) {
            return data.map(function (item) {
                // Concatenate links' required roles to parent's required roles
                if (item.requiresRole && item.links) {
                    item.links.forEach(function (link) {
                        if (link.requiresRole) {
                            item.requiresRole = item.requiresRole.concat(link.requiresRole);
                        }
                    });
                }
                // Map all item's properties to array's objects
                return mapKeys(item, function (key, value) {
                    return value;
                });
            });
        };
        _this.Show = function () {
            var that = _this;
            clearTimeout(_this.openTimer);
            clearTimeout(_this.fadeInTimer);
            clearTimeout(_this.fadeOutTimer);
            clearTimeout(_this.closeTimer);
            _this.fadeInTimer = setTimeout(function () {
                that.setState({ fade: true });
            }, 300);
            _this.openTimer = setTimeout(function () {
                that.setState({ hover: true });
            }, 300);
        };
        _this.Hide = function () {
            var that = _this;
            clearTimeout(_this.openTimer);
            clearTimeout(_this.fadeInTimer);
            _this.fadeOutTimer = setTimeout(function () {
                that.setState({ fade: false });
                that.setState({ fadingOut: true });
            }, 300);
            _this.closeTimer = setTimeout(function () {
                that.setState({ hover: false });
                that.setState({ fadingOut: false });
            }, 600);
        };
        _this.toggleHover = function () {
            _this.setState({ fade: true });
            _this.setState({ hover: !_this.state.hover });
        };
        _this.getCategoryWidth = function (item) {
            var categoryNode = document.querySelector(".category-".concat(item));
            if (categoryNode) {
                // @ts-ignore
                console.log(categoryNode.getBoundingClientRect().width, getComputedStyle(categoryNode, null).width, categoryNode.offsetWidth);
                // @ts-ignore
                return categoryNode.offsetWidth;
            }
        };
        _this.state = {
            userData: { groups: [] },
            data: [],
            fade: false,
            hover: false,
            fadingOut: false,
        };
        _this.getData();
        _this.getUserData();
        _this.getCategoryWidth = _this.getCategoryWidth.bind(_this);
        return _this;
    }
    Raamit.prototype.componentWillUpdate = function (_nextProps, nextState) {
        // Only update role basedata when userdata has changed
        if (nextState.userData !== this.state.userData || nextState.data !== this.state.data) {
            this.dataWithConcatenatedParentRoles = this.getDataWithConcatenatedParentRoles(nextState.data);
        }
    };
    Raamit.prototype.showBrowserUpdate = function (lang) {
        var updateText;
        if (lang === "fi") {
            updateText = 'Selaimesi {brow_name} on vanhentunut. Päivitä selaimesi turvallisempaan, nopeampaan ja helppokäyttöisempään. <a{up_but}>Päivitä selain</a><a{ignore_but}>Hylkää</a>';
        }
        else if (lang === "sv") {
            updateText = 'Din webbläsare {brow_name} är föråldrad. Uppdatera din webbläsare för mer säkerhet, snabbhet och den bästa upplevelsen. <a{up_but}>Uppdatera webbläsaren</a><a{ignore_but}>Ignorera</a>';
        }
        else {
            updateText = 'Your web browser {brow_name}, is out of date. Update your browser for more security, speed and the best experience. <a{up_but}>Update browser</a><a{ignore_but}>Ignore</a>';
        }
        browserUpdate({
            required: {
                //e:0, // MS Edge
                i: 12 // Below IE 12
                //f:0, // Firefox
                //o:0, // Opera
                //s:0, // Safari
                //c:0 // Chrome
            },
            //test:true, //Uncomment to show update bar always
            reminder: 0,
            reminderClosed: 0,
            newwindow: true,
            insecure: true,
            unsupported: true,
            text: updateText,
            no_permanent_hide: true,
            api: 2018.12
        });
    };
    Raamit.prototype.getData = function () {
        var _this = this;
        this.dataPromise()
            .then(function (respProm) { return respProm.json(); })
            .then(function (data) { return _this.setState(__assign(__assign({}, _this.state), { data: data })); });
    };
    Raamit.prototype.dataPromise = function () {
        return fetch(urls["raamit.data"], {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Caller-Id': 'virkailija-raamit'
            }
        });
    };
    Raamit.prototype.getUserData = function () {
        var _this = this;
        this.userDataPromise()
            .then(function (respProm) { return respProm.json(); })
            .then(function (data) { return _this.setUserState(data); })
            .catch(function (error) {
            if (window.location.host.indexOf('localhost') === 0 || window.location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                _this.setState({ userData: _this.props.userData });
                if (_this.props.userData) {
                    _this.getTranslate();
                }
            }
            else { // real usage
                console.log(error);
                if (window.location.href.indexOf('virkailijan-tyopoyta/?ticket=') > 0) {
                    window.location.href = window.location.origin + urls["virkailijan-stp-ui.etusivu"];
                }
                else {
                    // If failed, warm up CAS and try again
                    fetch(urls["cas.prequel"], {
                        headers: {
                            'Caller-Id': 'virkailija-raamit'
                        }
                    }).then(function () {
                        _this.userDataPromise()
                            .then(function (respRetry) { return respRetry.json(); })
                            .then(function (retryData) { return _this.setUserState(retryData); })
                            .catch(function (_err) { return window.location.href = urls["cas.login"] + window.location.origin + urls["virkailijan-stp-ui.etusivu"]; });
                    });
                }
            }
        });
    };
    Raamit.prototype.userDataPromise = function () {
        return fetch(urls["cas.me"], {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Caller-Id': 'virkailija-raamit'
            }
        });
    };
    Raamit.prototype.setUserState = function (ud) {
        this.setState(__assign(__assign({}, this.state), { userData: ud }));
        // @ts-ignore
        window.myroles = ud.groups;
        this.getTranslate();
    };
    Raamit.prototype.getTranslate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lang, groups, i, response, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lang = 'fi';
                        groups = this.state.userData.groups || [];
                        for (i = 0; i < groups.length; i++) {
                            if (groups[i].indexOf('LANG_') === 0) {
                                lang = groups[i].substring(5);
                            }
                        }
                        //Calling browser update here, because we need user lang.
                        this.showBrowserUpdate(lang);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(urls["lokalisointi.localisation"] + lang, {
                                credentials: 'include',
                                headers: {
                                    'Caller-Id': 'virkailija-raamit'
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        _b = (_a = Translations).setTranslations;
                        return [4 /*yield*/, response.json()];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        if (window.location.host.indexOf('localhost') === 0 || window.location.host.indexOf('10.0.2.2') === 0) { // dev mode (copypaste from upper)
                            Translations.setTranslations(this.props.translation);
                        }
                        else { // real usage
                            if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                                alert('Problems with login, please reload page or log out and try again');
                            }
                            else {
                                window.location.href = urls["cas.login"] + window.location.origin + urls["virkailijan-stp-ui.etusivu"];
                            }
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Raamit.prototype.render = function () {
        var _this = this;
        var myRole = this.state.userData.groups || [];
        // Check if current URL contains the environment object's href
        var isCurrentEnvironment = function (environment) {
            return window.location.href.indexOf(environment.href) > -1;
        };
        var currentEnvironment = find(isCurrentEnvironment)(environments);
        var isTestEnvironment = currentEnvironment && currentEnvironment.type === 'test';
        var theme = isTestEnvironment ? colors.test : colors.production;
        var dataWithLinks = this.dataWithConcatenatedParentRoles.filter(function (item) {
            if (item.requiresRole && item.links) {
                return item.requiresRole.some(function (requiredRole) {
                    if (myRole.indexOf(requiredRole.toUpperCase()) > -1) {
                        if (item.links) {
                            item.links = item.links.filter(function (link) {
                                if (link.requiresRole) {
                                    return link.requiresRole.some(function (linkRequiredRole) {
                                        //console.log(linkRequiredRole.toUpperCase(), myRole.toUpperCase());
                                        return myRole.indexOf(linkRequiredRole.toUpperCase()) > -1;
                                    });
                                }
                                else {
                                    return true;
                                }
                            });
                        }
                    }
                    // Check if parent should be displayed if it has no 'links' property, or it has children in 'links'
                    if (item.links && item.links.length) {
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    }
                    return false;
                });
            }
            else if (item.links) {
                return true;
            }
            return false;
        });
        var dataWithoutLinks = this.dataWithConcatenatedParentRoles.filter(function (item) {
            if (item.requiresRole && !item.links) {
                return item.requiresRole.some(function (requiredRole) {
                    if (!item.links) {
                        return myRole.indexOf(requiredRole.toUpperCase()) > -1;
                    }
                    return false;
                });
            }
            else if (!item.links) {
                return true;
            }
            return false;
        });
        var maxLinksLength = 0;
        var previousMaxLinksLength = 0;
        dataWithLinks.forEach(function (item) {
            if (previousMaxLinksLength < item.links.length) {
                maxLinksLength = item.links.length;
                previousMaxLinksLength = maxLinksLength;
            }
        });
        // @ts-ignore
        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        var fontSize = 14;
        var headerStyle = {
            position: 'relative',
            fontSize: fontSize,
            height: 100,
            paddingTop: 5,
            color: "white",
            boxSizing: "border-box",
            zIndex: 100
        };
        var headerTabStyle = __assign(__assign({}, headerStyle), { height: 55 });
        var mobileSignOutStyle = {
            width: '100%',
            float: 'none',
            color: '#333333',
            backgroundColor: 'white',
            textDecoration: 'none',
            borderBottom: '1px solid gray',
            marginTop: 0,
        };
        var tabSignOutStyle = {
            width: '60%',
            margin: '10px 0px auto',
        };
        var imageStyle = {
            display: "inline-block",
            boxSizing: 'border-box',
            textAlign: 'center',
            height: 45,
            padding: 15,
            paddingTop: 8,
            fontSize: 20,
            color: 'white',
            textDecoration: 'none',
            boxShadow: theme.iconBoxShadow,
            zIndex: 2,
            borderBottom: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? theme.iconBorder : ''
        };
        var style = {
            textAlign: 'center',
            fontSize: fontSize,
            textDecoration: 'none',
            verticalAlign: 'top',
        };
        var tabStyle = __assign(__assign({}, style), { paddingTop: 15, maxWidth: 'none' });
        var base = {
            float: 'left',
            position: "absolute",
            zIndex: 100,
            top: 55
        };
        var testEnvironmentAlertStyle = {
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
        var resolvedHref = function (item) {
            item.resolvedHref = isTestEnvironment && item.testHref ? item.testHref : item.href;
            item.links && item.links.forEach(resolvedHref);
        };
        dataWithLinks.forEach(resolvedHref);
        dataWithoutLinks.forEach(resolvedHref);
        return (_jsxs("header", __assign({ className: "virkailija-raamit ".concat(isTestEnvironment ? "virkailija-raamit-test" : "virkailija-raamit-production") }, { children: [isTestEnvironment &&
                    _jsx("div", __assign({ style: testEnvironmentAlertStyle }, { children: currentEnvironment.name })), _jsxs(MediaQuery, __assign({ minWidth: 1224 }, { children: [_jsxs("div", __assign({ style: headerStyle }, { children: [_jsx("img", { className: "opintopolkuLogo", src: opintopolkuLogo, alt: "opintopolku logo" }), SignOut({
                                    userData: this.state.userData,
                                    device: 'desktop',
                                    signOutStyle: undefined
                                })] })), _jsx("div", __assign({ style: __assign({}, base) }, { children: _jsxs("div", __assign({ style: { position: 'static', display: 'flex' } }, { children: [_jsx("a", __assign({ className: "nav-link", href: urls["virkailijan-stp-ui.etusivu"], style: imageStyle }, { children: _jsx(Icon, { name: "house" }) })), _jsx("div", __assign({ style: {
                                            display: 'flex',
                                            boxShadow: this.state.fade ? '0px 1px 4px 0px rgba(0,0,0,0.20)' : '',
                                            transition: 'box-shadow .3s ease',
                                            zIndex: 1
                                        } }, { children: dataWithLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, isIE11: isIE11, links: item.links, maxLinksLength: maxLinksLength, href: item.resolvedHref, target: item.target, style: style, hover: _this.state.hover, fade: _this.state.fade, fadingOut: _this.state.fadingOut, show: _this.Show, hide: _this.Hide, media: "desktop" }, item.key); }) })), dataWithoutLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, href: item.resolvedHref, target: item.target, style: style }, item.key); })] })) }))] })), _jsx(MediaQuery, __assign({ minWidth: 641, maxWidth: 1223 }, { children: _jsxs("div", __assign({ style: headerTabStyle }, { children: [_jsx("img", { className: "opintopolkuLogo", src: opintopolkuLogo, alt: "opintopolku logo" }), _jsx("div", __assign({ style: { float: 'right', padding: 20, paddingRight: 15, paddingTop: 5, fontSize: 20 }, onClick: this.toggleHover }, { children: _jsx(Icon, { name: "bars" }) })), SignOut({ userData: this.state.userData, signOutStyle: tabSignOutStyle, device: 'tab' }), _jsxs("div", __assign({ style: {
                                    position: 'absolute',
                                    top: 60,
                                    width: '100%',
                                    display: this.state.hover ? '' : 'none',
                                    backgroundColor: "white"
                                } }, { children: [_jsx("a", __assign({ href: urls["virkailijan-stp-ui.etusivu"], style: {
                                            textDecoration: 'none',
                                            color: '#333333',
                                            width: '100%',
                                            backgroundColor: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? '#1194bf' : ''
                                        } }, { children: _jsxs("div", __assign({ className: "links" }, { children: [_jsx(Icon, { name: "house" }), " ", _jsx(Translations, { trans: "virkailijantyopoyta" })] })) })), dataWithLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, links: item.links, href: item.resolvedHref, target: item.target, style: tabStyle, hover: _this.state.hover, fade: _this.state.fade, media: "tablet" }, item.key); }), dataWithoutLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, href: item.resolvedHref, target: item.target, style: style }, item.key); })] }))] })) })), _jsx(MediaQuery, __assign({ maxWidth: 640 }, { children: _jsxs("div", __assign({ style: headerTabStyle }, { children: [_jsx("img", { className: "opintopolkuLogo", src: opintopolkuLogo, alt: "opintopolku logo" }), _jsx("div", __assign({ style: { float: 'right', padding: 20, paddingRight: 15, paddingTop: 5, fontSize: 20 }, onClick: this.toggleHover }, { children: _jsx(Icon, { name: "bars" }) })), _jsxs("div", __assign({ style: {
                                    position: 'absolute',
                                    top: 60,
                                    width: '100%',
                                    display: this.state.hover ? '' : 'none',
                                    backgroundColor: "white"
                                } }, { children: [SignOut({
                                        userData: this.state.userData,
                                        signOutStyle: mobileSignOutStyle,
                                        device: 'mobile'
                                    }), _jsx("a", __assign({ href: urls["virkailijan-stp-ui.etusivu"], style: {
                                            textDecoration: 'none',
                                            color: '#333333',
                                            width: '100%',
                                            backgroundColor: window.location.href.indexOf(urls["virkailijan-stp-ui.base"]) > -1 ? '#1194bf' : ''
                                        } }, { children: _jsxs("div", __assign({ className: "links" }, { children: [_jsx(Icon, { name: "house" }), " ", _jsx(Translations, { trans: "virkailijantyopoyta" })] })) })), dataWithLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, links: item.links, href: item.resolvedHref, target: item.target, style: tabStyle, hover: _this.state.hover, fade: _this.state.fade, media: "mobile" }, item.key); }), dataWithoutLinks.map(function (item) { return _jsx(Header, { testEnvironment: isTestEnvironment, transkey: item.key, href: item.resolvedHref, target: item.target, style: style }, item.key); })] }))] })) }))] })));
    };
    return Raamit;
}(React.Component));
export default Raamit;
;
//# sourceMappingURL=Raamit.js.map