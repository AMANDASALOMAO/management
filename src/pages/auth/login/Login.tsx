import React, { FormEvent, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import styles from './Login.module.scss'
import { Button, TextField } from '@mui/material';

function Login() {

  const { userLoggedIn} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const [error, ] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSignIn) {
        setIsSignIn(true);
        await doSignInWithEmailAndPassword(email, password);
    }
}

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(!isSignIn) {
        setIsSignIn(true)
        await doSignInWithGoogle().catch(err => {
            setIsSignIn(false)
        })
    }
  }
  return (
    <div>
      {userLoggedIn && (<Navigate to={'home'} replace={true} />)}
                <div className={styles.container}>
                            <h1>Bem vindo!</h1>
                    <form
                        onSubmit={onSubmit}
                        className={styles.form}
                    >
                        <div className={styles.login}>
                        <TextField
                            variant="standard"
                            label="Email"
                            autoComplete='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                         <TextField
                            variant="standard"
                            label="Senha"
                            type='password'
                            autoComplete='current-password'
                            value={password} onChange={(e) => { setPassword(e.target.value) }}
                        />
                        </div>

                        {error && (
                            <span>{error}</span>
                        )}

                        <Button
                            variant='contained' 
                            type="submit"
                            disabled={isSignIn}
                            className={`${isSignIn ? styles.notSign : styles.isSign}`}
                        >
                            {isSignIn ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>
                    <div className={styles.register}>
                        <p>Ainda não possui conta? 
                            <Link to={'/register'}>
                                Registre-se
                            </Link>
                        </p>
                            <p>ou</p>
                            <Button
                                variant='outlined' 
                                disabled={isSignIn}
                                onClick={(e) => { onGoogleSignIn(e) }}
                                className={`${isSignIn ? styles.notSign : styles.isSign}`}
                            >
                                {isSignIn ? 'Entrando...' : 'Continuar com Google'}
                            </Button>
                    </div>
                </div>
    </div>
  )
}

export default Login;
