import React from 'react';
import './App.scss';

import Header from './components/Header/Header';

function App() {
    return (
        <div className="App">
            <Header headerType="admin" />
        </div>
    );
}

export default App;