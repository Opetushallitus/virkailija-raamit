import 'oph-urls-js';
import './virkailija-raamit-oph.js'
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';
import '../virkailija-raamit/css/styles.css';

function addStyle(href) {
    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = href;
    document.getElementsByTagName("head")[0].appendChild(ss);
}

window.raamiUrl = window.urls("virkailija-raamit").url

document.addEventListener("DOMContentLoaded", function(event) {
    addStyle("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
    addStyle(`${process.env.NODE_ENV === 'production' ? '/virkailija-raamit/build/' : '/build/'}bundle.css`);
    const root = document.body.insertBefore(document.createElement('div'),document.body.firstChild);
    function renderer() {
        render(
            <AppContainer>
                <App />
            </AppContainer>,
            root
        );
    }

    if (process.env.npm_lifecycle_event === 'dev-server') {
        renderer();
        module.hot.accept('./components/App', renderer);
    } else {
        render(<App />, root);
    }
});


