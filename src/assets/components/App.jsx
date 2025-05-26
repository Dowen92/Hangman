import { useState, useRef } from 'react'
import {getRandomWord} from '../utils.js'
import Header from './Header'
import Word from './Word.jsx'
import Keyboard from './Keyboard.jsx'
import Man from './Man.jsx'
import RenderConfetti from './Confetti.jsx'

export default function AssemblyEndGame() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const letters = currentWord.split("")

  const [guessedLetters, setGuessedLetters] = useState([])
  
  const newGameButtonRef = useRef(null)

  const numberOfGuessesAllowed = 7
  const wrongGuessCount = guessedLetters.filter(letter => !letters.includes(letter)).length
  const numberOfGuessesLeft = numberOfGuessesAllowed - wrongGuessCount
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numberOfGuessesAllowed
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

  function addGuessedLetter(letter)
  {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  function renderStatus() {
    if(!isGameOver)
    {
      return (<>
          <span className={numberOfGuessesLeft < 4 ? 'low-guesses-left' : 'guesses-left'}>{numberOfGuessesLeft}</span> 
          <span>{numberOfGuessesLeft !== 1 ? ' guesses' : ' guess'} remaining</span>
          </>
      )
    }

    if(isGameWon) {
      return (<span>Congratulations!</span>)
    }
    
    if(isGameLost) {
      return(<span>Better luck next time!</span>)
    }
  }

  function resetGame() {
    setGuessedLetters([])
    setCurrentWord(getRandomWord())
  }

  const setNewGameButtonRef = (element) => {
    if (element) {
      newGameButtonRef.current = element;
      element.focus();
    }
  };

  return (
    <main>      
      <Header/>
      
      {/*The hang man drawing*/}
      <section className='man'>
        <Man numberOfGuessesLeft={numberOfGuessesLeft}/>
      </section>
      
      {/*The users guesses*/}
      <section className='word'>
        <Word isGameLost={isGameLost} letters={letters} guessedLetters={guessedLetters}/>
      </section>

      {/*Combined visually hidden aria-live section for status updates*/}
      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >

        <p>
          {currentWord.includes(lastGuessedLetter) ? 
              `Correct! The letter ${lastGuessedLetter} is in the word.` : 
              `Sorry, the letter ${lastGuessedLetter} is not in the word.`
          }
          You have {numberOfGuessesLeft} attempts left.
        </p>

        <p>Current word: {currentWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter + "." : "blank.")
        .join(" ")}</p>            
      </section>

      {/*Let the player know how many guesses they have left*/}
      <section className="guesses">
        {renderStatus()}
      </section>

      {/*The keyboard*/}
      <section className='keyboard'>
        <Keyboard isGameOver={isGameOver} guessedLetters={guessedLetters} addGuessedLetter={addGuessedLetter} currentWord={currentWord}/>
      </section>

      {isGameOver && <button ref={setNewGameButtonRef} onClick={resetGame}  className="new-game">New Game</button>}

      {isGameWon && <RenderConfetti/>}
    </main>
  )
}