import React from 'react';
import ReactDOM from 'react-dom';
import './virkailija-raamit/css/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener("DOMContentLoaded", function(event) {
    const raamit_app = window.document.body.insertBefore(window.document.createElement('div') ,window.document.body.firstChild);
    raamit_app.setAttribute("id", "raamit_app_root");
    ReactDOM.render(<App />, window.document.getElementById('raamit_app_root'));
    registerServiceWorker();
});
