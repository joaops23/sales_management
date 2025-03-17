import React from 'react';
import { useJwt } from "react-jwt";

export default class Auth extends React.Component
{

    
    constructor(...args)
    {
        super()
        let data = args.pop();
        if(typeof data != 'undefined') {
            this.setToken(data.token);
        }
        
    }

    setToken(token)
    {
        localStorage.setItem("token", token);
    }

    logOff()
    {
        localStorage.removeItem("token");
    }
    
    verifyToken()
    {
        let token = localStorage.getItem('token');

        if(typeof token === 'undefined' || token === null || token === '') {
            return false;
        }
        
        return true;
    }

    getToken()
    {
        let token = localStorage.getItem('token');

        return token;
    }

}