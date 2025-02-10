import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import video from './rick_roll.mp4'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <p className="App-title">Rino Agung Priyo U.</p>
                </header>
                <video width="320" height="240" controls muted autoplay>
                    <source src={video} type="video/mp4" />
                    <source src={video} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

export default App;
