import React, { useEffect } from "react";
import Auth from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import TabMenu from "../../components/Tabenu";
import { Container } from "@mui/material";

export default function Dashboard() {

    const auth = new Auth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!auth.verifyToken()) {
            navigate('/login')
        }

    });

    return (
        <Container maxWidth="90%">
            <TabMenu title='Dashboard'/>
        </Container>
    );
}