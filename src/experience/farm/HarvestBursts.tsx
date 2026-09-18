import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, type Group } from 'three'
import { useFarmStore } from '../../store/useFarmStore'

export function HarvestBursts() {
  const bursts = useFarmStore((state) => state.harvestBursts)
  return (
    <group>
      {bursts.map((burst) => (
        <Burst key={burst.id} {...burst} />
      ))}
    </group>
  )
}

function Burst({
  id,
  x,
  z,
  color,
  createdAt,
}: {
  id: number
  x: number
  z: number
  color: string
  createdAt: number
}) {
  const group = useRef<Group>(null)
  const motes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        x: Math.cos(index * 0.7) * 0.18,
        z: Math.sin(index * 0.9) * 0.18,
        speed: 1.1 + (index % 4) * 0.18,
      })),
    [],
  )

  useFrame(() => {
    const t = (Date.now() - createdAt) / 720
    if (t >= 1) {
      useFarmStore.getState().dismissBurst(id)
      return
    }
    if (!group.current) return
    group.current.position.y = 0.3 + t * 1.1
    const fade = 1 - t
    group.current.scale.setScalar(0.7 + t * 0.8)
    group.current.traverse((child) => {
      const material = (child as { material?: { opacity: number } }).material
      if (material && 'opacity' in material) material.opacity = fade
    })
  })

  const fruit = useMemo(() => new Color(color), [color])

  return (
    <group ref={group} position={[x, 0.3, z]}>
      {motes.map((mote, index) => (
        <mesh key={index} position={[mote.x, index * 0.04, mote.z]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color={fruit} transparent opacity={1} />
        </mesh>
      ))}
    </group>
  )
}
