import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import { playerRuntime } from './runtime'

const desired = new Vector3()
const look = new Vector3()

export function FollowCamera() {
  const { gl } = useThree()
  const snapped = useRef(false)

  useEffect(() => {
    const element = gl.domElement
    let dragging = false
    let lastX = 0
    let lastY = 0

    const onDown = (event: PointerEvent) => {
      dragging = true
      lastX = event.clientX
      lastY = event.clientY
      element.setPointerCapture(event.pointerId)
    }
    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      lastX = event.clientX
      lastY = event.clientY
      playerRuntime.cameraYaw -= dx * 0.0055
      playerRuntime.cameraPitch = MathUtils.clamp(
        playerRuntime.cameraPitch + dy * 0.0038,
        0.16,
        1.05,
      )
    }
    const onUp = (event: PointerEvent) => {
      dragging = false
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId)
      }
    }
    const onContext = (event: Event) => event.preventDefault()

    element.addEventListener('pointerdown', onDown)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerup', onUp)
    element.addEventListener('pointercancel', onUp)
    element.addEventListener('contextmenu', onContext)
    return () => {
      element.removeEventListener('pointerdown', onDown)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerup', onUp)
      element.removeEventListener('pointercancel', onUp)
      element.removeEventListener('contextmenu', onContext)
    }
  }, [gl])

  useFrame(({ camera }, delta) => {
    const { position, cameraYaw, cameraPitch } = playerRuntime
    const distance = 9
    const planar = Math.cos(cameraPitch) * distance
    desired.set(
      position.x + Math.sin(cameraYaw) * planar,
      position.y + 1.05 + Math.sin(cameraPitch) * distance,
      position.z + Math.cos(cameraYaw) * planar,
    )
    look.set(position.x, position.y + 0.95, position.z)
    if (!Number.isFinite(desired.x) || !Number.isFinite(desired.y) || !Number.isFinite(desired.z)) {
      return
    }
    if (!snapped.current) {
      camera.position.copy(desired)
      snapped.current = true
    } else {
      const dt = Math.min(delta, 0.05)
      camera.position.lerp(desired, 1 - Math.exp(-dt * 5.4))
    }
    camera.lookAt(look)
  })

  return null
}
