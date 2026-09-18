import { WORLD } from '../../data/world'

const EXTENT = WORLD.halfSize
const STEP = 2

export function Fence() {
  const posts: Array<[number, number]> = []
  for (let i = -EXTENT; i <= EXTENT; i += STEP) {
    posts.push([-EXTENT, i], [EXTENT, i], [i, -EXTENT], [i, EXTENT])
  }

  return (
    <group>
      {posts.map(([x, z], index) => (
        <mesh key={`${x}:${z}:${index}`} position={[x, 0.62, z]} castShadow>
          <boxGeometry args={[0.16, 1.24, 0.16]} />
          <meshStandardMaterial color="#8d5a32" roughness={0.8} />
        </mesh>
      ))}
      <Rail axis="x" z={-EXTENT} />
      <Rail axis="x" z={EXTENT} />
      <Rail axis="z" x={-EXTENT} />
      <Rail axis="z" x={EXTENT} />
    </group>
  )
}

function Rail({ axis, x = 0, z = 0 }: { axis: 'x' | 'z'; x?: number; z?: number }) {
  const length = EXTENT * 2
  const rotation: [number, number, number] = axis === 'x' ? [0, 0, 0] : [0, Math.PI / 2, 0]
  return (
    <>
      <mesh position={[x, 0.42, z]} rotation={rotation} castShadow>
        <boxGeometry args={[length, 0.1, 0.08]} />
        <meshStandardMaterial color="#b07a45" />
      </mesh>
      <mesh position={[x, 0.86, z]} rotation={rotation} castShadow>
        <boxGeometry args={[length, 0.1, 0.08]} />
        <meshStandardMaterial color="#c48952" />
      </mesh>
    </>
  )
}
