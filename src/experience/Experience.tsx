import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import { HarvestBursts } from './farm/HarvestBursts'
import { FarmPlots } from './farm/FarmPlots'
import { GameSystems } from './GameSystems'
import { FollowCamera } from './player/FollowCamera'
import { Player } from './player/Player'
import { Decor } from './world/Decor'
import { Fence } from './world/Fence'
import { Ground } from './world/Ground'
import { Lighting } from './world/Lighting'
import { Stall } from './world/Stall'

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
      <Decor />
      <Fence />
      <FarmPlots />
      <Stall />
      <HarvestBursts />
      <GameSystems />
      <Suspense fallback={null}>
        <Player />
      </Suspense>
      <FollowCamera />
    </Canvas>
  )
}
