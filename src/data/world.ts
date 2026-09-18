export const WORLD = {
  halfSize: 12,
  walkLimit: 10.6,
  cellSize: 1.35,
  cellGap: 0.18,
  cols: 4,
  rows: 3,
  plotCenters: [
    { x: -5.15, z: 0.35 },
    { x: 5.15, z: 0.35 },
  ] as const,
  stall: { x: 0, z: -8.4 },
  spawn: { x: 0, y: 0, z: 6.4 },
} as const

export function plotSize() {
  const { cols, rows, cellSize, cellGap } = WORLD
  return {
    width: cols * cellSize + (cols - 1) * cellGap,
    depth: rows * cellSize + (rows - 1) * cellGap,
  }
}

export function cellWorldPosition(plotId: 0 | 1, col: number, row: number) {
  const { cellSize, cellGap, plotCenters } = WORLD
  const { width, depth } = plotSize()
  const center = plotCenters[plotId]
  const originX = center.x - width / 2 + cellSize / 2
  const originZ = center.z - depth / 2 + cellSize / 2
  return {
    x: originX + col * (cellSize + cellGap),
    z: originZ + row * (cellSize + cellGap),
  }
}
