import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export const UserContext = createContext(null)

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(()=> {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
              const userRef = await createUserProfileDocument(userAuth);
      
              return userRef.onSnapshot(snapShot => {
                setCurrentUser({
                  id: snapShot.id,
                  ...snapShot.data()
                });
              });
            }
      
            setCurrentUser(userAuth);
          });
        return () => unsubscribeFromAuth()
    }, [setCurrentUser])
    
    return (
        <UserContext.Provider value={{
            currentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;