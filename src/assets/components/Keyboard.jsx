import {useEffect} from 'react'
import clsx from 'clsx'

export default function Keyboard({isGameOver, guessedLetters, addGuessedLetter, currentWord}) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if ("abcdefghijklmnopqrstuvwxyz".includes(key)) {
                addGuessedLetter(key); // Reuse the existing click handler
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [addGuessedLetter]);

    const keyboardElements = alphabet.split("").map((character) => {

    let isGuessed = guessedLetters.includes(character)
    const isCorrect = isGuessed && currentWord.includes(character)
    const isWrong = isGuessed && !currentWord.includes(character)
        
    const keyStyle = clsx({
      wrong: isWrong,
      correct: isCorrect
    })

    return (
      <button 
        className={keyStyle} 
        key={character} 
        id={character}
        disabled={isGameOver} 
        aria-disabled={guessedLetters.includes(character)}
        aria-label={`Letter ${character}`}
        onClick={() => {!isGameOver ? addGuessedLetter(character) : null}} 
        >
          {character}
      </button>
    )
  })

  return <>{keyboardElements}</>
}