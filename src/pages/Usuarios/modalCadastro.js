import { Alert, Avatar, Box, Button, Fab, Grid2, Modal, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form"
import Api from "../../services/api";
import { UsuIdContextEdit } from ".";
  
export default function ModalCadastro(props)
{
    const [open, setOpen] = useState(false);
    const usuIdContext = useContext(UsuIdContextEdit);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid rgb(132, 125, 79)',
        boxShadow: 24,
        borderRadius:3,
        pt: 2,
        px: 4,
        pb: 3,
      };

    const handleOpen = () => {
        setOpen(true);
        
    };
    const handleClose = () => {
        setOpen(false);
        
        if(usuIdContext != null ) {
            props.handleEditClose();
        }
    };

    useEffect(() => {
        if(usuIdContext !== 'null' && usuIdContext > 0  && open == false) {
            handleOpen();
        }

    })

    return(
        <div className='addButton'>
            <Fab color="secondary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Modal
                open={props?.opened ? true : open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className='modalCadastroUsuario modalCadastro'
            >
                <Box sx={{ ...style, width: "50%" }}>
                    <h3 id="" className="text-center">{props.usuId == null ? "Cadastro" : "Edição" } de Usuários</h3>
                    <Avatar className="align-center" sx={{ bgcolor: green[500]}}>
                        <PersonAddIcon />
                    </Avatar>

                    <Grid2 container spacing={2}>
                        <FormCadastro usuId={props?.usuId} />
                    </Grid2>
                </Box>
            </Modal>
        </div>
    )
}


const FormCadastro = (props) => {
    const spacingForm = 3;
    const inputSize = 6;
    const api = new Api();
    const [alertCad, setAlertCad] = useState(null);

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = (data) => {
        setUSer(data)
    }

    const setUSer = async(data) => {
        try{
            let ret = await api.setInsertUser(data);

            if(ret.status === 201) {

                let tipo = data.usu_id === '' ? 'cadastrado' : 'Atualizado';
                setAlertCad({type: 'success', message: `Usuário ${tipo} com sucesso!`})
                setTimeout(() => {
                    window.location.reload()
                }, 2000);

            }
        }catch(err) {
            setAlertCad({type: 'error', message: (err.message.split("!"))[0]})
            setTimeout(() => {
                setAlertCad(false);
            }, 3000);
        }
    }

    const searchUser = async() => {
        try{
            const res = await api.getUsuById(props.usuId);

            if(typeof res !== 'undefined' ) {
                setDataUser(res.data)
            }
        }catch(err) {
            setAlertCad({type: 'error', message: "Aconteceu um erro inesperado!" })
            setTimeout(() => {
                setAlertCad(false);
            }, 3000);
        }
    }

    const setDataUser = (data) => {
        setValue('usu_nome', data.usu_nome)        
        setValue('usu_email', data.usu_email)
        setValue('usu_cpf', data.usu_cpf)
        

    }

    useEffect(() => {
        return () => {
            if(props.usuId !== null) {
                searchUser();
            }
        }
    }, [])


    return(
        <div style={{width: '100%', marginTop: '2rem'}}>
            <form onSubmit={handleSubmit(onSubmit)} >
            <input id='usu_id' value={props.usuId} style={{display: 'none'}} 
            {...register("usu_id")}/>
            <Grid2 container spacing={4} >
                
                <Grid2 offset={spacingForm} size={inputSize}>
                    {alertCad && (
                        <Alert severity={alertCad.type} style={{fontSize: '11px', fontWeight: 600}}>
                        {alertCad.message}
                        </Alert>
                    )}
                </Grid2>
                <Grid2 offset={spacingForm} size={inputSize}>
                <TextField id="usu_nome" className='input-control' label="Nome" variant="standard" 
                    {...register("usu_nome", { required: true, maxLength: 100 })}/>
                </Grid2>
                <Grid2 offset={spacingForm} size={inputSize}>
                    <TextField id="usu_cpf" className='input-control' label="Documento (CPF)" variant="standard"
                    {...register("usu_cpf", { required: true, maxLength: 11, pattern: /^[0-9]+$/i })}/>
                </Grid2>
                <Grid2 offset={spacingForm} size={inputSize}>
                    <TextField id="usu_email" className='input-control' label="E-mail" variant="standard"
                    {...register("usu_email", { required: true, maxLength:100, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}/>
                </Grid2>
                <Grid2 offset={spacingForm} size={inputSize}>
                    <Button type="submit" variant="contained" color="success" className="submitClass">
                        Enviar
                    </Button>
                </Grid2>

                {errors.usu_nome?.type === "required" && (
                        <p role="alert">Preencha corretamente o nome</p>
                )}
                {errors.usu_nome?.type === "maxLength" && (
                    <p role="alert">Nome Inválido</p>
                )}
                {errors.usu_cpf?.type === "required" && (
                    <p role="alert">Preencha corretamente o Documento</p>
                )}
                {errors.usu_cpf?.type === "maxLength" && (
                    <p role="alert">Documento Inválido</p>
                )}
                {errors.usu_email?.type === "required" && (
                        <p role="alert">Preencha corretamente o Email</p>
                )}
                {errors.usu_email?.type === "maxLength" && (
                    <p role="alert">Email Inválido</p>
                )}
            </Grid2>
            </form>
        </div>
    );
}