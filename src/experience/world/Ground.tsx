import { WORLD } from '../../data/world'

export function Ground() {
  const size = WORLD.halfSize * 2 + 4

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshLambertMaterial color="#6aa84f" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[WORLD.halfSize + 0.4, 48]} />
        <meshLambertMaterial color="#7bb85c" />
      </mesh>
    </group>
  )
}
