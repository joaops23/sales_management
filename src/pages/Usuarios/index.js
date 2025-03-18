import { Button, Container, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import Api from "../../services/api";
import TabMenu from "../../components/Tabenu";
import ModalCadastro from "./modalCadastro";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import Auth from "../../services/AuthService";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const UsuIdContextEdit = createContext(null);

export default function Usuarios()
{
    const api = new Api();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { decodeToken ,isExpired } = useJwt((new Auth()).getToken());
    const navigate = useNavigate();
    const [usuIdEdit, setUsuIdEdit] = useState(null);

    function createData(id, name, cpf, email) {
        return { id, name, cpf, email };
      }
      
    const columns = [
        { id: 'id', label: 'Id', minWidth: 100 },
        {
            id: 'name',
            label: 'Nome',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('pt-BR'),
        },
        {id: 'cpf', label: 'Documento', minWidth: 150 },
        {id: 'email', label: 'Email', minWidth: 250 },
        {id: 'actions', label: 'Ações', minWidth: 250 }
        
    ];
    const [rows, setRows] = useState([]);

    const results = async () => {
        const data = await api.getAllUsers();
        handleRows(data);
    }

    const handleRows = (data) => {
        let returnData = [];
        let actions = 'edit'
        data.forEach(item => {
            returnData.push(createData(
                item.usu_id,
                item.usu_nome,
                item.usu_cpf,
                item.usu_email,
                item.actions = actions
            ))
        });

        setRows(returnData);
    }
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditClose = () => {
        setUsuIdEdit(null)
    }

    const handleEdit = (e) => {
        setUsuIdEdit(e.target.id.split('-')[1])
    }

    useEffect(() => {
        return () => {
            // valida se o token está vencido         
            if(isExpired === true || (decodeToken === null || decodeToken === '') ) {
                navigate('/login');
                return;
            } else {
                if(rows === null || rows.length === 0)
                    results();
            }
        }
    }, [])

    
    
    function Icons(props)
    {
        return(
            <div>
                <Button title='Editar' onClick={handleEdit} id={"userid-" + props.usuId}>
                    <EditIcon />
                </Button>
                <Button title='Desabilitar'>
                    <CancelIcon /> 
                </Button>
                <Button title='Restaurar acesso'>
                    <InboxRoundedIcon />
                </Button>
            </div>
        )
    }

    return(
        <UsuIdContextEdit.Provider value={usuIdEdit} >
            <Container maxWidth="90%" id='containerGrid'>
                <TabMenu title='Usuarios' />
                <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto' }} className='gridUsuario'>
                    <Grid2 size={6} spacing={3}>
                        <TableContainer sx={{ maxHeight: "100vh" }}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                            
                                            {column.id === 'actions' ? <Icons usuId={row.id} /> : null}
                                            </TableCell>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid2>
                    <ModalCadastro usuId={usuIdEdit}  handleEditClose={handleEditClose}/>
                </Paper>
            </Container>
        </UsuIdContextEdit.Provider>
    );
}