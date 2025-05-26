import Confetti from 'react-confetti'
import { useWindowSize } from "@uidotdev/usehooks";

export default function RenderConfetti() {
    const {width, height} = useWindowSize()

    return (
      <Confetti recycle={false} numberOfPieces={1000} width={width} height={height}/>
    )
}