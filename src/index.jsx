import ReactDOM from 'react-dom';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/index.css';
import { StrictMode } from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initMocks } from './test/server';

window.process = import.meta;
console.log( process, import.meta.env );

const StrictApp = () => (
    <StrictMode>
        <App />
    </StrictMode>
);

const rootElement = document.getElementById( 'root' );

initMocks().then( ( ...args ) => {
    console.log( args );
    ReactDOM.render( <StrictApp />, rootElement );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
