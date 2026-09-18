import { CROP_LIST, CROPS, type CropId } from '../data/crops'
import type { CellState } from '../store/types'

export type CropStage = 'empty' | 'seed' | 'growing' | 'mature'

export function cropProgress(cell: CellState, now: number) {
  if (!cell.cropId || cell.plantedAt == null) return 0
  return Math.min(1, (now - cell.plantedAt) / CROPS[cell.cropId].growMs)
}

export function cropStage(cell: CellState, now: number): CropStage {
  if (!cell.cropId || cell.plantedAt == null) return 'empty'
  const progress = cropProgress(cell, now)
  if (progress >= 1) return 'mature'
  if (progress >= 0.38) return 'growing'
  return 'seed'
}

export function remainingGrowMs(cell: CellState, now: number) {
  if (!cell.cropId || cell.plantedAt == null) return 0
  return Math.max(0, CROPS[cell.cropId].growMs - (now - cell.plantedAt))
}

export function cropByHotkey(slot: 1 | 2 | 3): CropId {
  return CROP_LIST[slot - 1].id
}
