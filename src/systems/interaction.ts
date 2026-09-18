import { WORLD, cellWorldPosition } from '../data/world'

export function findCellAt(x: number, z: number) {
  const half = WORLD.cellSize / 2 + 0.16
  for (const plotId of [0, 1] as const) {
    for (let row = 0; row < WORLD.rows; row += 1) {
      for (let col = 0; col < WORLD.cols; col += 1) {
        const pos = cellWorldPosition(plotId, col, row)
        if (Math.abs(x - pos.x) <= half && Math.abs(z - pos.z) <= half) {
          return { plotId, col, row, id: `${plotId}-${col}-${row}`, ...pos }
        }
      }
    }
  }
  return null
}

export function distanceToStall(x: number, z: number) {
  const dx = x - WORLD.stall.x
  const dz = z - WORLD.stall.z
  return Math.hypot(dx, dz)
}
