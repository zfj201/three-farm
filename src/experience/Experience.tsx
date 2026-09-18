import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping, Color, SRGBColorSpace } from 'three'
import { HarvestBursts } from './farm/HarvestBursts'
import { FarmPlots } from './farm/FarmPlots'
import { GameSystems } from './GameSystems'
import { FollowCamera } from './player/FollowCamera'
import { Player } from './player/Player'
import { Decor } from './world/Decor'
import { Fence } from './world/Fence'
import { Ground } from './world/Ground'
import { Lighting } from './world/Lighting'
import { SkyDome } from './world/SkyDome'
import { Stall } from './world/Stall'

export function Experience() {
  return (
    <Canvas
      shadows
      dpr={1}
      frameloop="always"
      camera={{ fov: 50, near: 0.1, far: 250, position: [0, 10, 16] }}
      gl={{
        alpha: false,
        antialias: true,
        preserveDrawingBuffer: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.12,
        outputColorSpace: SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl, scene, camera }) => {
        gl.setClearColor('#9ad4ff', 1)
        scene.background = new Color('#9ad4ff')
        camera.lookAt(0, 0, 0)
      }}
      style={{ width: '100%', height: '100%', display: 'block', background: '#9ad4ff' }}
    >
      <color attach="background" args={['#9ad4ff']} />
      <Lighting />
      <SkyDome />
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
