import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { CROPS, type CropId } from '../../data/crops'
import { cropProgress, cropStage, type CropStage } from '../../systems/growth'

type CropMeshProps = {
  cropId: CropId
  plantedAt: number
}

export function CropMesh({ cropId, plantedAt }: CropMeshProps) {
  const group = useRef<Group>(null)
  const cell = useMemo(
    () => ({ id: cropId, plotId: 0 as const, col: 0, row: 0, cropId, plantedAt }),
    [cropId, plantedAt],
  )
  const [stage, setStage] = useState<CropStage>(() => cropStage(cell, Date.now()))
  const def = CROPS[cropId]

  useFrame(() => {
    const now = Date.now()
    const progress = cropProgress(cell, now)
    const nextStage = cropStage(cell, now)
    if (group.current) {
      const grow = 0.22 + progress * 0.78
      group.current.scale.setScalar(grow)
    }
    if (nextStage !== stage) setStage(nextStage)
  })

  const fruitVisible = stage !== 'seed'
  const mature = stage === 'mature'

  return (
    <group ref={group}>
      {cropId === 'carrot' && (
        <CarrotCrop color={def.fruitColor} leaf={def.leafColor} fruitVisible={fruitVisible} mature={mature} />
      )}
      {cropId === 'tomato' && (
        <TomatoCrop
          stem={def.stemColor}
          leaf={def.leafColor}
          fruit={def.fruitColor}
          fruitVisible={fruitVisible}
          mature={mature}
        />
      )}
      {cropId === 'corn' && (
        <CornCrop
          stem={def.stemColor}
          leaf={def.leafColor}
          fruit={def.fruitColor}
          fruitVisible={fruitVisible}
          mature={mature}
        />
      )}
    </group>
  )
}

function CarrotCrop({
  color,
  leaf,
  fruitVisible,
  mature,
}: {
  color: string
  leaf: string
  fruitVisible: boolean
  mature: boolean
}) {
  return (
    <group>
      {fruitVisible && (
        <mesh position={[0, 0.16, 0]} castShadow>
          <coneGeometry args={[0.12, 0.42, 7]} />
          <meshStandardMaterial color={color} roughness={0.45} />
        </mesh>
      )}
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          position={[Math.cos(index * 2.1) * 0.08, mature ? 0.42 : 0.28, Math.sin(index * 2.1) * 0.08]}
          rotation={[0.45, index, 0.2]}
          castShadow
        >
          <coneGeometry args={[0.05, 0.22, 5]} />
          <meshStandardMaterial color={leaf} />
        </mesh>
      ))}
    </group>
  )
}

function TomatoCrop({
  stem,
  leaf,
  fruit,
  fruitVisible,
  mature,
}: {
  stem: string
  leaf: string
  fruit: string
  fruitVisible: boolean
  mature: boolean
}) {
  return (
    <group>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.56, 6]} />
        <meshStandardMaterial color={stem} />
      </mesh>
      <mesh position={[0.12, 0.34, 0]} rotation={[0, 0, 0.7]} castShadow>
        <boxGeometry args={[0.22, 0.04, 0.12]} />
        <meshStandardMaterial color={leaf} />
      </mesh>
      {fruitVisible && (
        <>
          <mesh position={[0.1, mature ? 0.22 : 0.16, 0.05]} castShadow>
            <sphereGeometry args={[mature ? 0.1 : 0.06, 10, 10]} />
            <meshStandardMaterial color={fruit} roughness={0.35} />
          </mesh>
          <mesh position={[-0.08, mature ? 0.26 : 0.18, -0.04]} castShadow>
            <sphereGeometry args={[mature ? 0.08 : 0.05, 10, 10]} />
            <meshStandardMaterial color={fruit} roughness={0.35} />
          </mesh>
        </>
      )}
    </group>
  )
}

function CornCrop({
  stem,
  leaf,
  fruit,
  fruitVisible,
  mature,
}: {
  stem: string
  leaf: string
  fruit: string
  fruitVisible: boolean
  mature: boolean
}) {
  return (
    <group>
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.84, 6]} />
        <meshStandardMaterial color={stem} />
      </mesh>
      <mesh position={[-0.12, 0.38, 0]} rotation={[0, 0, 0.55]} castShadow>
        <boxGeometry args={[0.28, 0.05, 0.1]} />
        <meshStandardMaterial color={leaf} />
      </mesh>
      <mesh position={[0.12, 0.5, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.26, 0.05, 0.1]} />
        <meshStandardMaterial color={leaf} />
      </mesh>
      {fruitVisible && (
        <mesh position={[0.08, mature ? 0.52 : 0.36, 0.02]} rotation={[0.15, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, mature ? 0.28 : 0.16, 8]} />
          <meshStandardMaterial color={fruit} roughness={0.4} />
        </mesh>
      )}
    </group>
  )
}
