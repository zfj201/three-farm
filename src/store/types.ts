import type { CropId } from '../data/crops'

export type CellState = {
  id: string
  plotId: 0 | 1
  col: number
  row: number
  cropId: CropId | null
  plantedAt: number | null
}

export type Counts = Record<CropId, number>

export type HarvestBurst = {
  id: number
  x: number
  z: number
  color: string
  createdAt: number
}

export type FarmSnapshot = {
  coins: number
  seeds: Counts
  harvest: Counts
  selectedSeed: CropId
  cells: CellState[]
  tutorialDone: boolean
}
