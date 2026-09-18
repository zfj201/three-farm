export type InputState = {
  forward: boolean
  back: boolean
  left: boolean
  right: boolean
  run: boolean
}

const keys = new Set<string>()
let interactQueued = false
let seedSlot: 1 | 2 | 3 | null = null

function onKeyDown(event: KeyboardEvent) {
  if (event.repeat && event.code === 'KeyE') return
  keys.add(event.code)
  if (event.code === 'KeyE') interactQueued = true
  if (event.code === 'Digit1' || event.code === 'Numpad1') seedSlot = 1
  if (event.code === 'Digit2' || event.code === 'Numpad2') seedSlot = 2
  if (event.code === 'Digit3' || event.code === 'Numpad3') seedSlot = 3
  if (
    event.code === 'KeyW' ||
    event.code === 'KeyA' ||
    event.code === 'KeyS' ||
    event.code === 'KeyD' ||
    event.code === 'Space'
  ) {
    event.preventDefault()
  }
}

function onKeyUp(event: KeyboardEvent) {
  keys.delete(event.code)
}

export function bindPlayerInput() {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  return () => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    keys.clear()
  }
}

export function readInput(): InputState {
  return {
    forward: keys.has('KeyW') || keys.has('ArrowUp'),
    back: keys.has('KeyS') || keys.has('ArrowDown'),
    left: keys.has('KeyA') || keys.has('ArrowLeft'),
    right: keys.has('KeyD') || keys.has('ArrowRight'),
    run: keys.has('ShiftLeft') || keys.has('ShiftRight'),
  }
}

export function consumeInteract() {
  const pressed = interactQueued
  interactQueued = false
  return pressed
}

export function consumeSeedSlot() {
  const slot = seedSlot
  seedSlot = null
  return slot
}

export function resetInput() {
  keys.clear()
  interactQueued = false
  seedSlot = null
}
