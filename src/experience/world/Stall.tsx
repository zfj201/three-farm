import { WORLD } from '../../data/world'

export function Stall() {
  const { x, z } = WORLD.stall

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.4, 1.5]} />
        <meshStandardMaterial color="#a36a3b" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.55, 0]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[3.5, 0.08, 1.9]} />
        <meshStandardMaterial color="#d64545" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.48, 0.15]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[3.2, 0.02, 0.35]} />
        <meshStandardMaterial color="#f4f0e0" />
      </mesh>
      <mesh position={[0, 1.48, -0.2]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[3.2, 0.02, 0.35]} />
        <meshStandardMaterial color="#d64545" />
      </mesh>
      <mesh position={[-1.5, 0.85, 0.85]} castShadow>
        <boxGeometry args={[0.12, 1.7, 0.12]} />
        <meshStandardMaterial color="#7a4b24" />
      </mesh>
      <mesh position={[1.5, 0.85, 0.85]} castShadow>
        <boxGeometry args={[0.12, 1.7, 0.12]} />
        <meshStandardMaterial color="#7a4b24" />
      </mesh>
      <mesh position={[-0.9, 0.28, 1.05]} castShadow>
        <boxGeometry args={[0.7, 0.55, 0.55]} />
        <meshStandardMaterial color="#c47a3a" />
      </mesh>
      <mesh position={[0.95, 0.22, 1.05]} castShadow>
        <boxGeometry args={[0.6, 0.42, 0.5]} />
        <meshStandardMaterial color="#b86a2b" />
      </mesh>
      <mesh position={[0, 1.05, 0.78]}>
        <boxGeometry args={[1.7, 0.38, 0.08]} />
        <meshStandardMaterial color="#f7e7b4" />
      </mesh>
    </group>
  )
}
