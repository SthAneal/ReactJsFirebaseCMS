import React, {useState} from "react";


type UserProfileType = {
    bio:{
        name:string
        // profileImage:string
        // email:string
        // mobile:string 
        // headingText:string
    }
    experience:{
        company:string 
        // tenureDuration:string
        // position:string
        // responsibilities:string[]
    }[]
    skills:{
        skillType:string
        // toolName:string[]
    }[]
}

type HomeContextProviderProps = {
    children:React.ReactNode
}

type HomeContextType = {
    user: UserProfileType | null,
    setUser: React.Dispatch<React.SetStateAction<UserProfileType | null>>
}

export const HomeContext = React.createContext({} as HomeContextType);

export const HomeContextProvider = ({children}:HomeContextProviderProps)=>{
    const [user, setUser ] = useState<UserProfileType | null >(null);
    return(
        <HomeContext.Provider value={{user, setUser}}>
            {children}
        </HomeContext.Provider>
    )
}





























// type HomeContextType = {
//     user: UserProfileType | null,
//     setUser: React.Dispatch<React.SetStateAction<UserProfileType | null>>
// }

// type HomeContextProviderProps = {
//     children:React.ReactNode
// }

// export const HomeContext = React.createContext({} as HomeContextType);

// export const HomeContextProvider = ({children}:HomeContextProviderProps)=>{
//     const [user, setUser] = useState<UserProfileType | null>(null)

//     return(
//         <HomeContext.Provider value={{user, setUser}}>
//             {children}
//         </HomeContext.Provider>
//     )
// }
