import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const Logout = () => {
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() =>{
        if(checked){
            signOut(auth).then(()=>{
                setTimeout(() => {
                    navigate("/", {replace:true})
                }, 1000);
            }).catch(error =>{
                setError(error)
            })
        } 
    }, [checked])

    const handleChange = e =>{
        setChecked(e.target.checked)
    }
    return (
        <div className="logoutContainer">
            {
                error
            }
        <label className="switch">
        <input
            onChange={handleChange}
            type="checkbox"
            checked={checked}
            />
            <span 
            className="slider round" 
            data-tooltip-id="my-tooltip"
            data-tooltip-place="left"
            data-tooltip-content="Déconnexion"
            >
            </span>
        </label>
        <Tooltip id="my-tooltip"/>
        </div>
  )
}

export default Logout
