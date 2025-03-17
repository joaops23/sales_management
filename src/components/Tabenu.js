import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TabMenu(props)
{
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(value === null || value === '')
            setValue(props.title);
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/${newValue}`);
    }
    return(
        <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        >
        <Tab value="Dashboard" label="Dashboard"></Tab>
        <Tab value="Usuarios" label="Usuários" />
        </Tabs>
    );

}