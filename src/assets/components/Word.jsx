export default function Word({isGameLost, letters, guessedLetters}) {
  const letterElements = letters.map((letter, index) => {
    return (
      <span 
        className={isGameLost && !guessedLetters.includes(letter) ? "letter-red" : "letter"} 
        key={index}
        >
          {isGameLost ? letter : guessedLetters.includes(letter) ? letter : ""}
      </span>
    )})

    return <>{letterElements}</>
}