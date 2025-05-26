import Gallows from '../images/Gallows.png'
import Head from '../images/Head.png'
import Body from '../images/Body.png'
import LegLeft from '../images/LegLeft.png'
import LegRight from '../images/LegRight.png'
import Eyes from '../images/Eyes.png'

export default function Man({numberOfGuessesLeft}) {
    return (
        <>
          <img src={Gallows} className={numberOfGuessesLeft <= 6 ? 'gallows' : 'gallows body-good'}></img>          
          <img src={Head} className={numberOfGuessesLeft <= 5 ? 'head' : 'head body-good'}></img>
          <img src={Body} className={numberOfGuessesLeft <= 4 ? 'body' : 'body body-good'}></img>
          <img src={LegLeft} className={numberOfGuessesLeft <= 3 ? 'arm-left' : 'arm-left body-good'}></img>
          <img src={LegRight} className={numberOfGuessesLeft <= 2 ? 'arm-right' : 'arm-right body-good'}></img>
          <img src={LegLeft} className={numberOfGuessesLeft <= 1 ? 'leg-left' : 'leg-left body-good'}></img>
          <img src={LegRight} className={numberOfGuessesLeft <= 0 ?'leg-right' : 'leg-right body-good'}></img>
          <img src={Eyes} className={numberOfGuessesLeft <= 0 ? 'eye-left-done' : 'eye-left'}></img>
          <img src={Eyes} className={numberOfGuessesLeft <= 0 ? 'eye-right-done' : 'eye-right'}></img>

        </>   
    )
}