import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
document.addEventListener("DOMContentLoaded", function(event) {
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


