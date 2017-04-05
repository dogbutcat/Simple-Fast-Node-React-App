import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/app';
import { Tweet } from '../modules/local/Tweet';
import { Root } from './containers/Root';
let rootEl = document.getElementById('react-app');

// Old Entry
// var request = new XMLHttpRequest();
// request.open('GET', '/json', true);
// request.onload = () => {
//     if (request.status >= 200 && request.status < 400)
//         rendeDOM(JSON.parse(request.responseText) as Tweet);
// }

// function rendeDOM(data:Tweet) {
//     ReactDOM.render(<App Posts={data} />, rootEl);
// }
// request.send();

ReactDOM.render(<Root></Root>, rootEl);