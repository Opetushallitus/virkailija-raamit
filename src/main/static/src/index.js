import React from 'react';
import ReactDOM from 'react-dom';
import './virkailija-raamit/css/styles.css';
import App from './App';

function addStyle(href) {
    const ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = href;
    document.getElementsByTagName("head")[0].appendChild(ss);
}

function appendToBody() {
    const raamit_app = window.document.body.insertBefore(window.document.createElement('div') ,window.document.body.firstChild);
    raamit_app.setAttribute("id", "raamit_app_root");
    addStyle("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
    addStyle('/virkailija-raamit/apply-raamit.css');
    ReactDOM.render(<App />, window.document.getElementById('raamit_app_root'));
}

if ((document.readyState === "complete" || document.readyState === "loaded") && window.virkailija_raamit_set_to_load !== true) {
    appendToBody();
}
else {
    window.virkailija_raamit_set_to_load = true;
    window.document.addEventListener("DOMContentLoaded", function(event) {
        appendToBody();
    });
}
