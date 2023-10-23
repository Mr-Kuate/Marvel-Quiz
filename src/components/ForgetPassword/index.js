import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/firebaseConfig'
import { sendPasswordResetEmail as passwordReset } from 'firebase/auth'

const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        passwordReset(auth, email)
            .then(() => {
                setError(null)
                setSuccess(`Consultez votre email pour changer de mot le passe, ${email}`)
                setEmail("")
                setTimeout(() => {
                    navigate('/login', { replace: true })
                }, 5000);
            })
            .catch(error => {
                setError(error)
                setEmail("")
            })
    }

    const disabled = email === ""
    return (
        <div className="signUpLoginBox">
            <div className='slContainer'>
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {
                            success && <span
                                style={{
                                    border: '1px solid green',
                                    background: 'green',
                                    color: '#ffffff'
                                }}>{success}
                            </span>
                        }

                        {
                            error && <span>{error.message}</span>
                        }

                        <h2>Mot de Passe Oublié ?</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" required autoComplete="off" />
                                <label htmlFor="email">Email </label>
                            </div>
                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
