import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: ""
    })

<<<<<<< HEAD
    const [isAppLoading, setIsAppLoading] = useState(true)

    return (
        <AuthContext.Provider value={{
            user, setUser,
            isAppLoading, setIsAppLoading
        }}>
=======
    return (
        <AuthContext.Provider value={{ user, setUser }}>
>>>>>>> 1bd6ad0b6c03349a1753951fae9f3f01b373f4cc
            {props.children}
        </AuthContext.Provider>
    )
}