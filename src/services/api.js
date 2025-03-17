import axios from 'axios';
import env from 'react-dotenv';
import Auth from './AuthService';


class Api
{
    constructor()
    {
        this.api = axios.create({
            baseURL: env.BASE_URL,
        });
    }

    async loginPost(email, pwd)
    {
        const response = await this.api
            .post("/user/login", {
                "data": {
                    "login": email,
                    "password": pwd
                }
            });
        return response;
    }

    async getAllUsers()
    {
        try{
            const headers = {
                'Authorization': `Baerer ${(new Auth()).getToken()}`
            }
    
            const response = await this.api
                .post("/user/", {
                    "data": {
                        "params": {
                            // "usu_id": ["=", "1"],
                            // "usu_nome": ["like", "%Admin%"],
                            // "usu_cpf": ["like", "%64384667434%"]
                        },
                
                        "order": {
                            "column": "usu_id",
                            "direction": "asc"
                        }
                    }
                }, {
                    headers: headers
                });
                return response.data
            } catch(e) {
            console.error(e)
        }
    }

    async setInsertUser(...args)
    {
        try{
            const headers = {
                'Authorization': `Baerer ${(new Auth()).getToken()}`
            }

            const data = args.pop();

            const response = await this.api
                .post("/user/store", {data: data}, {
                    headers: headers
                });

                
                return response
            } catch(err) {
            throw new Error(err.response.data.message)
        }
    }
}

export default Api;