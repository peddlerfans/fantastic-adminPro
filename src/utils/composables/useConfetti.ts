import CanvasConfetti from 'canvas-confetti'

// https://github.com/catdad/canvas-confetti#options
interface ConfettiOptions extends CanvasConfetti.Options {
  particleCount?: number
  angle?: number
  spread?: number
  startVelocity?: number
  decay?: number
  gravity?: number
  drift?: number
  flat?: boolean
  ticks?: number
  origin?: { x: number, y: number }
  colors?: string[]
  shapes?: CanvasConfetti.Shape[]
  zIndex?: number
  disableForReducedMotion?: boolean
  useWorker?: boolean
  resize?: boolean
  canvas?: HTMLCanvasElement | null
  scalar?: number
}

function confetti(options: ConfettiOptions) {
  if (
    options.disableForReducedMotion
    && window.matchMedia('(prefers-reduced-motion)').matches
  ) {
    return
  }

  const confettiInstance = options.canvas
    ? CanvasConfetti.create(options.canvas, {
        resize: options.resize ?? true,
        useWorker: options.useWorker ?? true,
      })
    : CanvasConfetti

  confettiInstance({
    ...options,
  })
}

confetti.shapeFromPath = (options: { path: string, [key: string]: any }) => {
  return CanvasConfetti.shapeFromPath({ ...options })
}

confetti.shapeFromText = (options: { text: string, [key: string]: any }) => {
  return CanvasConfetti.shapeFromText({ ...options })
}

export default function useConfetti() {
  return confetti
}
