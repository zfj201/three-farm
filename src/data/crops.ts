export const CROP_IDS = ['carrot', 'tomato', 'corn'] as const
export type CropId = (typeof CROP_IDS)[number]

export type CropDef = {
  id: CropId
  name: string
  seedName: string
  seedCost: number
  sellPrice: number
  growMs: number
  stemColor: string
  leafColor: string
  fruitColor: string
  hotkey: 1 | 2 | 3
}

export const CROPS: Record<CropId, CropDef> = {
  carrot: {
    id: 'carrot',
    name: '胡萝卜',
    seedName: '胡萝卜种子',
    seedCost: 5,
    sellPrice: 12,
    growMs: 9000,
    stemColor: '#2f7d32',
    leafColor: '#49a33a',
    fruitColor: '#e67e22',
    hotkey: 1,
  },
  tomato: {
    id: 'tomato',
    name: '番茄',
    seedName: '番茄种子',
    seedCost: 8,
    sellPrice: 20,
    growMs: 13000,
    stemColor: '#3e8e41',
    leafColor: '#5dbb63',
    fruitColor: '#e74c3c',
    hotkey: 2,
  },
  corn: {
    id: 'corn',
    name: '玉米',
    seedName: '玉米种子',
    seedCost: 12,
    sellPrice: 32,
    growMs: 17000,
    stemColor: '#6aa84f',
    leafColor: '#8bc34a',
    fruitColor: '#f1c40f',
    hotkey: 3,
  },
}

export const CROP_LIST = CROP_IDS.map((id) => CROPS[id])
