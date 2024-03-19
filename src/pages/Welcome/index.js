import { Link } from "react-router-dom";
import "./../../index.css";


export function Welcome()
{
    const SYSTEM_NAME = `Sales Management`
    return(
        <div className='welcome'>
            <h1>Bem vindo(a) ao {SYSTEM_NAME}</h1>
            <div class='welcomeButtons'>
                <Link to="/Login">
                <button className='buttonWelcome'>Entrar</button>
                </Link>
            </div>
        </div>
    );
}