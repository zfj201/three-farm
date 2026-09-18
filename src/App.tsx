import { Loader } from '@react-three/drei'
import { Experience } from './experience/Experience'

export default function App() {
  return (
    <div className="app-shell">
      <Experience />
      <Loader
        containerStyles={{ background: 'rgba(16, 32, 18, 0.88)' }}
        innerStyles={{ width: '220px' }}
        barStyles={{ background: '#8fd36a', height: '8px' }}
        dataInterpolation={(p) => `加载农场 ${p.toFixed(0)}%`}
      />
    </div>
  )
}
