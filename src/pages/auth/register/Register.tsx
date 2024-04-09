import React, { FormEvent, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import { useAuth } from '../../../context/authContext'
import styles from './Register.module.scss'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, ] = useState('')
    const [user, setUser] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
                        <div className={styles.container}>
                            <h1>Criar uma nova conta</h1>

                    <form onSubmit={onSubmit}>
                        
                        <div className={styles.data}>
                        <label>
                                Nome
                           
                            <input
                                type="name"
                                autoComplete='name'
                                required
                                value={user} onChange={(e) => { setUser(e.target.value) }}
                            />
                             </label>

                            <label>
                                Email
                           
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                            />
                             </label>

                            <label>
                                Senha
                            
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                            />
                            </label>

                            <label>
                                Confirme sua senha
                           
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                            />
                            </label>
                        </div>

                        {errorMessage && (
                            <span>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`${isRegistering ? styles.notRegistering : styles.registering}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className={styles.link}>
                            Já possui uma conta? {'   '}
                            <Link to={'/login'}>Continue</Link>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default Register