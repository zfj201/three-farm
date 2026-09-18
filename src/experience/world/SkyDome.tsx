import { BackSide } from 'three'

export function SkyDome({ color = '#8ec8ff' }: { color?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[120, 24, 16]} />
      <meshBasicMaterial color={color} side={BackSide} depthWrite={false} />
    </mesh>
  )
}
