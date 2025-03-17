import { useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import Auth from "../../services/AuthService";
import "./login.css";
import { useState } from "react";
import { Alert } from '@mui/material';

export function Login(){
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [alert, setAlert] = useState(null);

    const handleSubmit = () => {
        try{
            const api = new Api();
    
            if(email.length === 0 || pwd.length === 0) {
                throw new Error("Teste!!");
            }
            api.loginPost(email,pwd)
            .then(result => {
                new Auth(result.data);
                navigate('/Dashboard');
                
            }).catch(e => {
                setAlert({type: 'error', message: "Dados de login incorretos"})
                return;
            });
        } catch(err) {
            console.error(err)
            setAlert({type: 'error', message: "Preencha novamente os dados de login!"})
        }
    };

    return (
        <div className='containerForm'>
            {alert && (
                <Alert severity={alert.type} sx={{ mb: 2 }}>
                {alert.message}
                </Alert>
            )}
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