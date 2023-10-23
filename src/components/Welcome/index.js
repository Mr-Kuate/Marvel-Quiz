import React, { Fragment, useEffect } from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { useState } from 'react'
import { auth, user } from '../Firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'

const Welcome = () => {
  const [userSession, setUserSession] = useState(null)
  const [userDataError, setUserDataError] = useState("")
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  
  useEffect(()=>{
    // Si on est authentifier on aura l'user et on pourra acceder à son id pour aller chercher les data relatives à lui
    let listener = onAuthStateChanged(auth, (user) =>{
      user ? setUserSession(user) : navigate('/', {replace: true})
    })

    if(!!userSession){

      const colRef = user(userSession.uid)
      
      getDoc(colRef)
      .then( snapshot =>{
        if(snapshot.exists()){
          setUserDataError("")
          const mydata = snapshot.data()
          setUserData(mydata)
        }
      }) 
      .catch(error =>{
        setUserDataError(error)
      })
    }
     return () => {
      listener()
     }
  }, [userSession])

  return userSession === null ? (
    <Fragment>
      {
        <span>{userDataError}</span>
      }
      <div className="loader"></div>
      <p className="loaderText">Authentification...</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
        <div className="container">
            <Logout/>
            <Quiz profil={userData}/>
        </div>
    </div>
  )
}

export default React.memo(Welcome)
