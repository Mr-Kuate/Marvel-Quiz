import React, { useState } from 'react'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { auth} from '../Firebase/firebaseConfig'
import { Link, useNavigate } from 'react-router-dom'
import { setDoc } from 'firebase/firestore'
import { user } from '../Firebase/firebaseConfig'

const SignUp = (props) => {

  const navigate = useNavigate()

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  
  const [loginData, setLoginData] = useState(data)
  const [error, setError] = useState('')

  const handleChange = e =>{
      setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const handleSubmit = e=>{
    e.preventDefault()
    const {email, password, pseudo} = loginData
    createUserWithEmailAndPassword(auth, email, password)
    .then(authUser =>{
      return setDoc(user(authUser.user.uid), {
        pseudo,
        email,
        password
      })
    })
    .then(() =>{
      setLoginData({...data})
      navigate("/welcome")
    })
    .catch(error =>{
      setError(error)
      setLoginData({...data})
    })
    
  }
  const {pseudo, email, password, confirmPassword} = loginData

  const btn = pseudo === '' || email === '' || password ==='' || password !== confirmPassword ?
  <button disabled>Inscription</button> : <button>Inscription</button>  

  // gestion erreurs

  const errorMsg = error !=='' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className="formBoxLeftSignup">
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {
              errorMsg
            }
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required autoComplete="off" />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={email} type="email" id="email" required autoComplete="off" />
                <label htmlFor="email">Email </label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} value={password} type="password" id="password" required autoComplete="off" />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" required autoComplete="off" />
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              </div>
              {
                btn
              }
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déja inscrit ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
