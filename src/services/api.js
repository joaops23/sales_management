import axios from 'axios';
import env from 'react-dotenv';


class Api
{
    constructor()
    {
        this.api = axios.create({
            baseURL: env.BASE_URL,
        });
        
    }

    async loginPost()
    {
        const response = await this.api
            .post("/user/login", {
                "data": {
                    "login": "teste@teste.com",
                    "password": "123456"
                }
            });
        console.log(response);
        
    }
}

export default Api;