import { Sky } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Color, Vector3, type DirectionalLight, type HemisphereLight } from 'three'

const sun = new Vector3()
const skyColor = new Color()
const groundColor = new Color()
const DAY = new Color('#9ad4ff')
const DUSK = new Color('#f0b27a')
const NIGHT = new Color('#0b1c33')
const FOG_DAY = new Color('#b7e0a8')
const FOG_NIGHT = new Color('#1b2a38')

export function Lighting() {
  const dir = useRef<DirectionalLight>(null)
  const hemi = useRef<HemisphereLight>(null)
  const elapsed = useRef(18)
  const sample = useRef(0)
  const [skySun, setSkySun] = useState<[number, number, number]>([18, 22, 8])

  useFrame(({ scene }, delta) => {
    elapsed.current = (elapsed.current + delta) % 90
    const t = elapsed.current / 90
    const angle = t * Math.PI * 2
    const elevation = Math.sin(angle)
    sun.set(Math.cos(angle) * 30, elevation * 24, 10)
    const dayness = Math.max(0, elevation)
    const dusk = Math.max(0, 1 - Math.abs(elevation) * 2)
    if (dir.current) {
      dir.current.position.set(sun.x, Math.max(sun.y, 2), sun.z)
      dir.current.intensity = 0.18 + dayness * 1.45
      dir.current.color.set(dusk > 0.25 ? '#ffb067' : '#fff3c4')
    }
    if (hemi.current) {
      hemi.current.intensity = 0.22 + dayness * 0.4
    }
    skyColor.copy(DAY).lerp(DUSK, dusk).lerp(NIGHT, 1 - dayness)
    groundColor.copy(FOG_DAY).lerp(FOG_NIGHT, 1 - dayness)
    scene.background = skyColor
    if (scene.fog && 'color' in scene.fog) scene.fog.color.copy(groundColor)

    sample.current += delta
    if (sample.current > 0.08) {
      sample.current = 0
      setSkySun([sun.x, Math.max(sun.y, 1.2), sun.z])
    }
  })

  return (
    <>
      <Sky sunPosition={skySun} turbidity={8} rayleigh={1.2} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <hemisphereLight ref={hemi} args={['#fff4dc', '#3d6b3a', 0.55]} />
      <ambientLight intensity={0.22} color="#fff6e0" />
      <directionalLight
        ref={dir}
        castShadow
        position={[14, 20, 10]}
        intensity={1.55}
        color="#fff3c4"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.0004}
      />
    </>
  )
}
