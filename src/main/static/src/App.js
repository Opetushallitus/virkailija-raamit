import React from 'react';
import './App.css';
import Raamit from "./components/Raamit";
import userData from './dev/me.json';
import translation from './dev/translation.json'

class App extends React.Component {
    render() {
        return (
            <Raamit userData={userData} translation={translation}/>
        );
    }
}

export default App;
