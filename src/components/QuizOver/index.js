import React, { Fragment, useEffect, useState } from 'react'
import {FaRegFaceSadCry} from 'react-icons/fa6'
import {AiTwotoneLike as Good} from 'react-icons/ai'
import {TfiCup as Cup} from 'react-icons/tfi'
import Loader from '../Loader'
import Modal from '../Modal'
import axios from 'axios'

const QuizOver = React.forwardRef((props, ref) => {
  const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions, quiz } = props
  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [characterInfo, setCharacterInfo ] = useState([])
  const [loading, setLoading ] = useState(true)
  
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

  const hash = '89d65cda9c5013cf99fd743081187780'

  useEffect(() => {
    setAsked(ref.current)

    if(localStorage.getItem("marvelStorageDate")){
      const date = localStorage.getItem("marvelStorageDate")
      checkDataAge(date)
    }
  }, [ref])

  const checkDataAge = date =>{
    const today = Date.now() 
    const timeDifference = today - date

    const dayDifference =  timeDifference / (1000*3600*24)
    if(dayDifference >=15){
      localStorage.clear()
      localStorage.setItem("marvelStorageDate", Date.now())
    }
  }

  const averageGrade = maxQuestions / 2

  if(score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 7000);
  }

  const decision = score >= averageGrade ?
    (
      <Fragment>
        <div className="stepsBtnContainer">
          {
            quizLevel < levelNames.length ? (
              <Fragment>
                <p className="successMsg"><Good size='50px'/> Bravo, passe au niveau suivant l'ami !</p>
                <button onClick={() => loadLevelQuestions(quizLevel)} className="btnResult success">Next Step</button>
                
              </Fragment>
            )
              :
              (
                <>
                  <p className="successMsg"><Cup size='50px'/> Bravo, t'es un expert mon gars !</p>
                  <button onClick={() => loadLevelQuestions(0)} className="btnResult gameOver">Accueil</button>

                </>
              )
          }
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">Progression : {score}/{maxQuestions}</div>


        </div>

      </Fragment>
    ) 
    :
    (
      <Fragment>
      <div className="stepsBtnContainer">
      <p className="failureMsg"> <FaRegFaceSadCry size='50px'/> Désolé, va falloir encore regarder les films de l'Univers Marvel !</p>
      </div>

      <div className="percentage">
        <div className="progressPercent">Réussite : {percent}%</div>
        <div className="progressPercent">Progression : {score}/{maxQuestions}</div>
      </div>
      </Fragment>
    )

  const questionAnswer = score >= averageGrade ? (
    asked.map(({id, question, answer, heroId}) => {
      return (
        <tr key={id}>
          <td>{question}</td>
          <td>{answer}</td>
          <td>
            <button 
            className="btnInfo" 
            onClick={()=> showModal(heroId)}
            >Infos
            </button>
          </td>
        </tr>
      )
    })
  ) 
  :
  (
    <tr >
      <td colSpan="3">
        <Loader loading={"Vous avez échoué, c'est l'occasion pour vous d'aller encore bien regardé les films Marvel"}/>
      </td>
    </tr>
  )

  const showModal = id =>{
    setOpenModal(true)
    /*Le loader (le state Loading initialement à true), 
    quand il est à false permet d'indiquer que l'on a recupérer de la data 
    soit depuis l'API MARVEL 
    soit existante deja dans le localStorage */
    if(localStorage.getItem(id)){
      setCharacterInfo(JSON.parse(localStorage.getItem(id)))
      setLoading(false)
    } else {
       axios
    .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
    .then(response => { 
      setCharacterInfo(response.data) 
      setLoading(false)
       
      localStorage.setItem(id, JSON.stringify(response.data))
      
      if(!localStorage.getItem('marvelStorageDate')){
        localStorage.setItem('marvelStorageDate', Date.now())
      }
    })
    .catch(error => { console.log(error) })
    }
  }

  const hideModal = ()=>{
    setOpenModal(false) 
    setLoading(true)
  }

  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInfo.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img src={characterInfo.data.results[0].thumbnail.path+'.'+characterInfo.data.results[0].thumbnail.extension} 
          alt={characterInfo.data.results[0].name}/>
          {characterInfo.attributionText}
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {
            characterInfo.data.results[0].description ? (
              <p>{characterInfo.data.results[0].description}</p>
            ):
            (<p>Description indisponible...</p>)
          }
          <h3>Plus d'infos</h3>
          {
            characterInfo.data.results[0].urls &&
             characterInfo.data.results[0].urls.map((url, index)=> {
              return <a key={index} 
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                          {url.type.toUpperCase()}
                    </a>
            }) 
          }  
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>Fermer</button>
      </div>
    </Fragment>)
    :
    (
      <Fragment>
      <div className="modalHeader">
        <h2>Oups, vérifies ta connexion à Internet !</h2>
      </div>
      <div className="modalBody">
          <Loader loading={"Pas de data recupérée depuis l'API MARVEL surement à cause d'un soucis de ta Connexion à Internet"}/>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>Fermer</button>
      </div>
    </Fragment>
      
    )
  return (
    <Fragment>

      {
        decision
      }
      
      <br/>
      <hr />
      <p>Les réponses aux questions posées</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Reponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {
              questionAnswer
            }

          </tbody>
        </table>
      </div>

      <Modal showModal={openModal} hideModal={hideModal}> 
            {
              resultInModal
            }
      </Modal>

    </Fragment>

  )
}
)
export default React.memo(QuizOver)
