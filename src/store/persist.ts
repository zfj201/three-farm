import { CROP_IDS } from '../data/crops'
import type { FarmSnapshot } from './types'

const SAVE_KEY = 'three-farm-save-v1'

function isCounts(value: unknown): value is FarmSnapshot['seeds'] {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return CROP_IDS.every((id) => typeof record[id] === 'number')
}

export function isFarmSnapshot(value: unknown): value is FarmSnapshot {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<FarmSnapshot>
  return (
    typeof data.coins === 'number' &&
    isCounts(data.seeds) &&
    isCounts(data.harvest) &&
    (data.selectedSeed === 'carrot' || data.selectedSeed === 'tomato' || data.selectedSeed === 'corn') &&
    Array.isArray(data.cells) &&
    typeof data.tutorialDone === 'boolean'
  )
}

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isFarmSnapshot(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function writeSave(snapshot: FarmSnapshot) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot))
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY)
}
