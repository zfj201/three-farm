function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 1.4, 6]} />
        <meshStandardMaterial color="#6b3f1d" />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <coneGeometry args={[1.05, 1.6, 7]} />
        <meshStandardMaterial color="#2f7d32" />
      </mesh>
      <mesh position={[0, 2.45, 0]} castShadow>
        <coneGeometry args={[0.78, 1.2, 7]} />
        <meshStandardMaterial color="#3f9a42" />
      </mesh>
    </group>
  )
}

function Rock({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <mesh position={[x, 0.18 * scale, z]} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.38, 0]} />
      <meshStandardMaterial color="#8d8a84" roughness={1} />
    </mesh>
  )
}

export function Decor() {
  return (
    <group>
      <Tree x={-9.4} z={8.2} />
      <Tree x={9.2} z={7.6} scale={1.15} />
      <Tree x={-8.8} z={-8.6} scale={0.9} />
      <Tree x={8.6} z={-4.2} />
      <Tree x={-10} z={1.5} scale={0.8} />
      <Rock x={-6.8} z={7.4} />
      <Rock x={7.4} z={5.8} scale={1.3} />
      <Rock x={4.8} z={-7.2} scale={0.8} />
      <group position={[8.2, 0, -8.3]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.82, 0.9, 12]} />
          <meshStandardMaterial color="#9aa3ad" />
        </mesh>
        <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.08, 8, 16]} />
          <meshStandardMaterial color="#7b838c" />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.2, 12]} />
          <meshStandardMaterial color="#3d7ea6" />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[2.2, 18]} />
        <meshStandardMaterial color="#c4a574" roughness={1} />
      </mesh>
    </group>
  )
}
