import { create } from 'zustand'
import { CROPS, CROP_IDS, type CropId } from '../data/crops'
import { WORLD, cellWorldPosition } from '../data/world'
import { cropByHotkey, cropStage } from '../systems/growth'
import { loadSave, writeSave } from './persist'
import type { CellState, Counts, FarmSnapshot, HarvestBurst } from './types'

let burstSeq = 1

function emptyCounts(): Counts {
  return { carrot: 0, tomato: 0, corn: 0 }
}

function createCells(): CellState[] {
  const cells: CellState[] = []
  for (const plotId of [0, 1] as const) {
    for (let row = 0; row < WORLD.rows; row += 1) {
      for (let col = 0; col < WORLD.cols; col += 1) {
        cells.push({
          id: `${plotId}-${col}-${row}`,
          plotId,
          col,
          row,
          cropId: null,
          plantedAt: null,
        })
      }
    }
  }
  return cells
}

export function initialFarm(): FarmSnapshot {
  return {
    coins: 40,
    seeds: { carrot: 8, tomato: 4, corn: 2 },
    harvest: emptyCounts(),
    selectedSeed: 'carrot',
    cells: createCells(),
    tutorialDone: false,
  }
}

type FarmStore = FarmSnapshot & {
  focusedCellId: string | null
  nearShop: boolean
  shopOpen: boolean
  hudNow: number
  harvestBursts: HarvestBurst[]
  setFocus: (cellId: string | null, nearShop: boolean) => void
  selectSeed: (id: CropId) => void
  selectSeedBySlot: (slot: 1 | 2 | 3) => void
  tryInteract: () => 'plant' | 'harvest' | 'shop' | null
  buySeed: (id: CropId) => boolean
  sellCrop: (id: CropId) => boolean
  sellAll: () => number
  tickHud: (now: number) => void
  closeShop: () => void
  completeTutorial: () => void
  dismissBurst: (id: number) => void
  resetFarm: () => void
  hydrate: (snapshot: FarmSnapshot) => void
}

function persist(get: () => FarmStore) {
  const { coins, seeds, harvest, selectedSeed, cells, tutorialDone } = get()
  writeSave({ coins, seeds, harvest, selectedSeed, cells, tutorialDone })
}

export const useFarmStore = create<FarmStore>((set, get) => ({
  ...(loadSave() ?? initialFarm()),
  focusedCellId: null,
  nearShop: false,
  shopOpen: false,
  hudNow: Date.now(),
  harvestBursts: [],

  setFocus: (cellId, nearShop) => {
    const state = get()
    if (state.focusedCellId === cellId && state.nearShop === nearShop) return
    set({ focusedCellId: cellId, nearShop })
  },

  selectSeed: (id) => {
    set({ selectedSeed: id })
    persist(get)
  },

  selectSeedBySlot: (slot) => {
    set({ selectedSeed: cropByHotkey(slot) })
    persist(get)
  },

  tryInteract: () => {
    const state = get()
    const now = Date.now()
    if (state.shopOpen) {
      set({ shopOpen: false })
      return 'shop'
    }
    if (state.nearShop) {
      set({ shopOpen: true })
      return 'shop'
    }
    const cell = state.cells.find((item) => item.id === state.focusedCellId)
    if (!cell) return null
    const stage = cropStage(cell, now)
    if (stage === 'empty') {
      const seed = state.selectedSeed
      if (state.seeds[seed] <= 0) return null
      set({
        seeds: { ...state.seeds, [seed]: state.seeds[seed] - 1 },
        cells: state.cells.map((item) =>
          item.id === cell.id ? { ...item, cropId: seed, plantedAt: now } : item,
        ),
      })
      persist(get)
      return 'plant'
    }
    if (stage === 'mature' && cell.cropId) {
      const cropId = cell.cropId
      const pos = cellWorldPosition(cell.plotId, cell.col, cell.row)
      const burst: HarvestBurst = {
        id: burstSeq,
        x: pos.x,
        z: pos.z,
        color: CROPS[cropId].fruitColor,
        createdAt: now,
      }
      burstSeq += 1
      set({
        harvest: { ...state.harvest, [cropId]: state.harvest[cropId] + 1 },
        cells: state.cells.map((item) =>
          item.id === cell.id ? { ...item, cropId: null, plantedAt: null } : item,
        ),
        harvestBursts: [...state.harvestBursts, burst],
      })
      persist(get)
      return 'harvest'
    }
    return null
  },

  buySeed: (id) => {
    const state = get()
    const cost = CROPS[id].seedCost
    if (state.coins < cost) return false
    set({
      coins: state.coins - cost,
      seeds: { ...state.seeds, [id]: state.seeds[id] + 1 },
    })
    persist(get)
    return true
  },

  sellCrop: (id) => {
    const state = get()
    if (state.harvest[id] <= 0) return false
    set({
      coins: state.coins + CROPS[id].sellPrice,
      harvest: { ...state.harvest, [id]: state.harvest[id] - 1 },
    })
    persist(get)
    return true
  },

  sellAll: () => {
    const state = get()
    let gained = 0
    const next = { ...state.harvest }
    for (const id of CROP_IDS) {
      gained += next[id] * CROPS[id].sellPrice
      next[id] = 0
    }
    if (gained <= 0) return 0
    set({ coins: state.coins + gained, harvest: next })
    persist(get)
    return gained
  },

  tickHud: (now) => {
    if (now - get().hudNow < 200) return
    set({ hudNow: now })
  },

  closeShop: () => set({ shopOpen: false }),
  completeTutorial: () => {
    set({ tutorialDone: true })
    persist(get)
  },
  dismissBurst: (id) =>
    set({ harvestBursts: get().harvestBursts.filter((burst) => burst.id !== id) }),

  resetFarm: () => {
    set({
      ...initialFarm(),
      focusedCellId: get().focusedCellId,
      nearShop: get().nearShop,
      shopOpen: false,
      hudNow: Date.now(),
      harvestBursts: [],
    })
    persist(get)
  },

  hydrate: (snapshot) =>
    set({
      ...snapshot,
      shopOpen: false,
      harvestBursts: [],
      hudNow: Date.now(),
    }),
}))
