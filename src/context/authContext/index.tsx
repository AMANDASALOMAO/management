import React, { useEffect, useState, createContext, ReactNode, useContext } from "react"
import { auth } from "../../firebase/firebaseConfig"
import { User, onAuthStateChanged } from "firebase/auth"

interface IAuthProvider {
    children: ReactNode
}

interface IAuthContext {
    currentUser: User | null;
    userLoggedIn: boolean;
    loading: boolean;
}

const AuthContext = createContext<IAuthContext>({ currentUser: null, userLoggedIn: false, loading: true })

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider(props: IAuthProvider) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    async function initializeUser(user: any) {
        if(user) {
            setCurrentUser({...user})
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
        }
        setLoading(false)
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;
