import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, { AppState, initializeApp, changeCity } from './store'

const logger = (state: AppState) => {
  console.log(new Date())
  console.log('---')
  console.log(state)
  console.log('')
}

store.subscribe(logger)

const win = window as any
win.changeCity = changeCity

initializeApp()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
