// in other than local dev env and vagrant this is eg. "http://itest-virkailija.oph.ware.fi/cas/myroles"
// static html development:
//var myrolesResource = "virkailija-raamit/myroles.json";
// real usage:

var myrolesResource = "/cas/myroles";

// init jquery only if not inited already
var jQueryScriptOutputted = false;

function initJQuery() {
    //if the jQuery object isn't available
    if (typeof(jQuery) == 'undefined') {
        if (!jQueryScriptOutputted) {
            // init jquery
            jQueryScriptOutputted = true; //only output the script once..
            var script = document.createElement('script');
            script.src = '/virkailija-raamit/js/lib/jquery-2.1.1.min.js';
            script.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        setTimeout(initJQuery, 20);
    } else {
        $(function () {
            // jquery has been loaded
            applyRaamit();
        });
    }
}
initJQuery();


function showHome() {
    oph_host = location.host.split(':')[0];
    var homePage = '/virkailijan-stp-ui';
    if (oph_host.indexOf('xtest-') === 0 || oph_host.indexOf('itest-') === 0 || oph_host.indexOf('localhost') === 0) {
        homePage = '/virkailija-raamit/index.html';
    }

    location.href = location.protocol + '//' + location.host + homePage;
    return false;
}

function showEnvironmentBanner() {
    // environment name
    oph_host = window.location.hostname;
    if (oph_host !== 'virkailija.opintopolku.fi') {
        var banner = $("#environment_banner");
        banner.text(oph_host);
        banner.show();
    }
}

function setRaportointiAddress() {
    oph_host = location.host.split(':')[0];
    var raportointiAddress = "https://testiraportit.odw.opintopolku.fi";
    if(oph_host.indexOf('virkailija.opintopolku.fi') === 0) {
       raportointiAddress = "https://raportit.odw.opintopolku.fi/";
    }

    $("#raportointiSrc").attr("src", raportointiAddress);
}

function applyRaamit() {
    $.get(window.url("virkailija-raamit-web.raamit"), function (data) {
        var $data = $(data);
        var $head = $('head');
        $head.append($data.closest("title"));
        $head.append($data.closest("link.virkailija-raamit-import"));
        var $body = $('body');
        var header = $data.closest("header.raamit-header");
        header.hide();
        $body.prepend(header);
        var footer = $data.closest("div.raamit-footer-container");
        footer.hide();
        $body.append(footer);
        activateNavigation();
        header.show();
        footer.show();
        showEnvironmentBanner();
        setRaportointiAddress();
    });
}

function activateNavigarionInner2(myroles, dropDownMenu) {
    window.myroles = myroles; // myroles is also used in valinta ui-components.
    applyI18N();
    dropDownMenu.build();
    showBasedOnRoles(myroles);
    showEnvironmentBanner();
}
function activateNavigationInner(dropDownMenu, myroles) {
    if (typeof jQuery.i18n == "undefined") {
        $.getScript(window.url("virkailija-raamit-web.js.i18next"), function () {
            activateNavigarionInner2(myroles, dropDownMenu);
        });
    } else {
        activateNavigarionInner2(myroles, dropDownMenu);
    }
}
function activateNavigation() {
    // hide navigation items based on user roles (just for convenience, security is implemented elsewhere)
    $.getJSON(myrolesResource,function (myroles) {
        activateNavigationInner(dropDownMenu, myroles);
    }).error(function () { // error while reading /cas/myroles -> not authenticated(?) - todo: the resource should tell when error and when not authenticated!
            if (location.host.indexOf('localhost') === 0) { // dev mode (copypaste from upper)
                $.getJSON(window.urls("virkailija-raamit-web.myroles"), function (myroles) {
                    activateNavigationInner(dropDownMenu, myroles);
                });
            } else { // real usage
                if (window.location.href.indexOf('ticket=') > 0) { // to prevent strange cyclic cas login problems (atm related to sticky sessions)
                    alert('Problems with login, please reload page or log out and try again');
                } else {
                    window.location.href = "/cas/login?service=" + location.href;
                }
            }
        });


    var dropDownMenu = {
        // initiate dropDownMenus
        build: function () {
            dropDownMenu.showHiddenRaamitComponents();
            dropDownMenu.setTriggers();
        },

        // reveal navigation after css has been loaded
        showHiddenRaamitComponents: function () {
            $('.main-navigation .navigation').show();
            $('#app-container .welcome').show();
        },

        // set listener for dropdown navigations
        setTriggers: function () {

            $('.navigation > li:not(.action)').hover(navigationMouseOver, navigationMouseOut);

            // bring dropdown navigation visible on mouseover
            function navigationMouseOver() {
                var $this = $(this);
                if (!($this.hasClass('home'))) {
                    $this.css('background-color', 'white');
                }
                $this.find('span').css('color', '#333');
                $this.find('a').css('color', '#333');
                $this.find('div.dropdown').fadeIn(100);
            }

            // hide dropdown navigation on mouseout
            function navigationMouseOut() {
                var $this = $(this);
                $this.css('background-color', 'transparent');
                $this.find('span').css('color', 'white');
                $this.find('a').css('color', 'white');
                $this.find('div.dropdown').fadeOut(100);
            }
        }
    };
}


function showBasedOnRoles(myroles) {
    // iterate all elements that have 'requires-role' attribute
    $("[data-requires-role]").each(function () {
        // hide element if user doesn't have required role
        var $this = $(this);
        var requiresRole = $this.attr("data-requires-role");
        var hasRole = myroles.toString().toLowerCase().match(new RegExp(requiresRole));
        if (hasRole) {
        	if($this.is('a') || $this.hasClass('block-menu'))
                $this.css('display', 'block');
            else
                $this.css('display', 'inline-block');
        } else {
            $this.css('display', 'none');
        }
    }); // each
}

function applyI18N() {
    // init language properties
    var lang;
    for (var i = 0; i < window.myroles.length; i++) {
        if (window.myroles[i].indexOf('LANG_') === 0) {
            lang = window.myroles[i].substring(5);
        }
    }
    lang = lang ? lang : (navigator.language || navigator.userLanguage).substr(0, 2);
    lang = lang.toLowerCase();

    var host = location.host.indexOf("localhost") === 0 || location.protocol=="file" ? "https://itest-virkailija.oph.ware.fi" : "";
    var path = window.urls("lokalisointi.localisation.virkailija-raamit", lang);
    $.getJSON(host+path, function(messagesarray){
        // messages array -> map
        var messagesmap = {};
        for (var i = 0; i < messagesarray.length; i++) {
            var msg = messagesarray[i];
            messagesmap[msg.key] = msg;
        }
        // bind messages in place
        $("[msg]").each(function () {
            var msgKey = $(this).attr("msg");
            var msgObj = messagesmap[msgKey];
            var msgText = msgObj ? msgObj.value : null;
            if (!msgObj || !msgText || /^\s*$/.test(msgText)) { // not translated or msgText empty
                msgText="["+msgKey+"]";
                addTranslations(msgKey, $(this).text(), msgObj);
            }
            $(this).html(msgText);
        });
    });
}

function addTranslation(msgKey, lang, elemText, oldTranslation) {
    var allowEmptyTranslationUpdate = true;
    if (!oldTranslation || allowEmptyTranslationUpdate && (!oldTranslation.value || oldTranslation.value === "")) { // dont update existing translation
        var createValue = elemText;
        var data = { "value": createValue, "key": msgKey, "locale": lang, "category": "virkailijaraamit" };
        var host = location.host.indexOf("kehitys-virkailija") == 0 ? location.host : "itest-virkailija.oph.ware.fi";
        var localisationPath = "https://" + host + window.url("lokalisointi.localisation");
        $.ajax({
            type: oldTranslation ? "PUT" : "POST",
            url: localisationPath + (oldTranslation ? "/"+oldTranslation.id : ""),
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            dataType: "json"
        });
    }
}

function addTranslations(msgKey, elemText, oldTranslation) {
    addTranslation(msgKey, "fi", elemText, oldTranslation);
    addTranslation(msgKey, "sv", elemText, oldTranslation);
    addTranslation(msgKey, "en", elemText, oldTranslation);
}

