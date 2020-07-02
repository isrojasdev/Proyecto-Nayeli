/*
    librerias instaladas:
    - npm i bootstrap
    Nota: los documentos guardados como inventario se cambiaron por los documentos de productos
*/
import React, {Fragment}  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

// *** vistas ***  //
import index from './views/App';
import introducirBC from './views/intruducirBC';
import mostrarBC from './views/mostrar';
import usarBC from './views/usarBC';
import consultarBC from './views/consultarBC';

const App = () =>(
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>

                <Route exact path = "/" component = {index} />
                <Route exact path = "/introducir-bc" component = {introducirBC} />
                <Route exact path = "/mostrar-bc" component = {mostrarBC} />
                <Route exact path = "/usar-bc" component = {usarBC} />
                <Route exact path = "/consultar-bc" component = {consultarBC} />
                
            </Fragment>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();