import ReactDOM from 'react-dom';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/index.css';
import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initMocks } from './test/server';

window.process = import.meta;
console.log( process, import.meta.env );
initMocks();
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById( 'root' )
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
