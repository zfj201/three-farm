import { Sky } from '@react-three/drei'

export function Lighting() {
  return (
    <>
      <Sky
        sunPosition={[18, 22, 8]}
        turbidity={6}
        rayleigh={1.1}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <hemisphereLight args={['#fff4dc', '#3d6b3a', 0.55]} />
      <ambientLight intensity={0.28} color="#fff6e0" />
      <directionalLight
        castShadow
        position={[14, 20, 10]}
        intensity={1.55}
        color="#fff3c4"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.0004}
      />
    </>
  )
}
