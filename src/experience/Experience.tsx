import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import { Ground } from './world/Ground'
import { Lighting } from './world/Lighting'

export function Experience() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 50, near: 0.1, far: 90, position: [10, 9, 14] }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
    >
      <color attach="background" args={['#9ad4ff']} />
      <fog attach="fog" args={['#b7e0a8', 22, 48]} />
      <Lighting />
      <Ground />
    </Canvas>
  )
}
