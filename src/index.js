import {React} from 'react'
import ReactDOM from 'react-dom/client'
import { NameForm } from "./components/input";

document.addEventListener("DOMContentLoaded", setup)

function setup(){
    const root = ReactDOM.createRoot(document.getElementById('root'));
    //const element = <App />;
    const element = <NameForm />;
    root.render(element);

}