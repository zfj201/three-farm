import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color, type DirectionalLight } from 'three'

const FOG_DAY = new Color('#c5e8b4')
const FOG_DUSK = new Color('#e2b48a')
const FOG_NIGHT = new Color('#9aadc2')

export function Lighting() {
  const dir = useRef<DirectionalLight>(null)
  const elapsed = useRef(22)

  useFrame(({ scene }, delta) => {
    elapsed.current = (elapsed.current + delta) % 140
    const t = elapsed.current / 140
    const angle = t * Math.PI * 2
    const elevation = Math.sin(angle)
    const dusk = Math.max(0, 1 - Math.abs(elevation) * 2.2)
    const dayness = 0.55 + Math.max(0, elevation) * 0.45

    if (dir.current) {
      dir.current.position.set(Math.cos(angle) * 28, 10 + Math.max(elevation, 0) * 18, 12)
      dir.current.intensity = 1.05 + Math.max(0, elevation) * 0.45
      dir.current.color.set(dusk > 0.3 ? '#ffb067' : '#fff4d4')
    }

    if (scene.fog && 'color' in scene.fog) {
      scene.fog.color.copy(FOG_DAY).lerp(FOG_DUSK, dusk).lerp(FOG_NIGHT, 1 - dayness)
    }
  })

  return (
    <>
      <hemisphereLight args={['#fff7e0', '#4d7c41', 1.25]} />
      <ambientLight intensity={0.9} color="#fff6e8" />
      <directionalLight
        ref={dir}
        castShadow
        position={[12, 28, 8]}
        intensity={1.35}
        color="#fff4d4"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={2}
        shadow-camera-far={70}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0008}
      />
    </>
  )
}
