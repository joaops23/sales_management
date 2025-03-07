import Api from "../../services/api";
import "./login.css";
import { useState } from "react";

export function Login(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = () => {
        const api = new Api();
        api.loginPost()
        .then(result => {
            console.log(result)
        }).catch(e => {
            console.log(e)
        });
    };

    return (
        <div className='containerForm'>
            <div className="line">
                <h1 className="lineBottom">Login</h1>
            </div>
            <div className="line">
                <form method="post" id='loginForm'>
                    <div className="formInput">
                        <label for='emailUser' className="formLabel">Email</label>
                        <input type='email' name='emailUser' id='emailUser' className="inputDefault" placeholder="email@example.com" onChange={(val) => setEmail(val.target.value)} required='true'/>
                    </div>
                    <div className="formInput">
                        <label for='pwdUser' className="formLabel">Senha</label>
                        <input type='password' name='pwdUser' id='pwdUser' className="inputDefault" placeholder="********" onChange={(val) => setPwd(val.target.value)}/>
                    </div>
                    <div className="line formInput">
                        <button className='buttonWelcome' type="button" onClick={handleSubmit}>Acessar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}