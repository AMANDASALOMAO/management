import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import styles from './Header.module.scss'
import { Button } from '@mui/material'

interface IHeader {
    handleSignOut?: () => void
}

const Header = ({handleSignOut}: IHeader) => {
    const navigate = useNavigate()

    const { userLoggedIn } = useAuth()
    return (
        <nav>
        {
                userLoggedIn
                    ?
                    <div className={styles.container}>
                        <Button variant='text' className={styles.history} onClick={() => { navigate('/employeeform')}}>Registrar funcionário</Button>
                        <Button variant='text' className={styles.history} onClick={() => { navigate('/employeehistory')}}>Lista de Funcionários</Button>
                        <Button variant='outlined' className={styles.logout} onClick={handleSignOut}>Sair</Button>
                    </div>
                    :
                    <div className={styles.login}>
                        <Link className={styles.link} to={'/login'}>Entrar</Link>
                        <Link className={styles.link} to={'/register'}>Criar nova conta</Link>
                    </div>
            }

        </nav>
    )
}

export default Header