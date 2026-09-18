import { WORLD, cellWorldPosition, plotSize } from '../../data/world'
import { useFarmStore } from '../../store/useFarmStore'
import { cropStage } from '../../systems/growth'
import { CropMesh } from './CropMesh'

export function FarmPlots() {
  const cells = useFarmStore((state) => state.cells)
  const focusedCellId = useFarmStore((state) => state.focusedCellId)
  const hudNow = useFarmStore((state) => state.hudNow)
  const size = plotSize()

  return (
    <group>
      {WORLD.plotCenters.map((center) => (
        <group key={center.x} position={[center.x, 0, center.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
            <planeGeometry args={[size.width + 0.7, size.depth + 0.7]} />
            <meshLambertMaterial color="#6b4423" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]} receiveShadow>
            <planeGeometry args={[size.width + 0.35, size.depth + 0.35]} />
            <meshLambertMaterial color="#8a5a2b" />
          </mesh>
        </group>
      ))}

      {cells.map((cell) => {
        const pos = cellWorldPosition(cell.plotId, cell.col, cell.row)
        const focused = cell.id === focusedCellId
        const stage = cropStage(cell, hudNow)
        return (
          <group key={cell.id} position={[pos.x, 0, pos.z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
              <planeGeometry args={[WORLD.cellSize - 0.08, WORLD.cellSize - 0.08]} />
              <meshLambertMaterial color={focused ? '#b9783c' : '#7a4b24'} />
            </mesh>
            {focused && <FocusRing ready={stage === 'mature'} empty={stage === 'empty'} />}
            {cell.cropId && cell.plantedAt != null && (
              <CropMesh cropId={cell.cropId} plantedAt={cell.plantedAt} />
            )}
          </group>
        )
      })}
    </group>
  )
}

function FocusRing({ ready, empty }: { ready: boolean; empty: boolean }) {
  const color = ready ? '#f4d35e' : empty ? '#9be36a' : '#87cefa'
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.055, 0]}>
      <ringGeometry args={[WORLD.cellSize * 0.36, WORLD.cellSize * 0.46, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  )
}
