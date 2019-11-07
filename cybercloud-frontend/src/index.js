import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import {register} from 'timeago.js'

global.ip="192.168.100.106"

const localeFunc = (number, index, total_sec) => {
  return [
      ['justo ahora', 'en un rato'],
      ['hace %s segundos', 'en %s segundos'],
      ['hace 1 minuto', 'en 1 minuto'],
      ['hace %s minutos', 'en %s minutos'],
      ['hace 1 hora', 'en 1 hora'],
      ['hace %s horas', 'en %s horas'],
      ['hace 1 día', 'en 1 día'],
      ['hace %s días', 'en %s días'],
      ['hace 1 semana', 'en 1 semana'],
      ['hace %s semanas', 'en %s semanas'],
      ['hace 1 mes', 'en 1 mes'],
      ['hace %s meses', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años']
  ][index];
};
// register your locale with timeago
register('es_ES', localeFunc);

// use it


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
