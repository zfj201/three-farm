import { CROP_LIST, CROPS } from '../data/crops'
import { useFarmStore } from '../store/useFarmStore'
import { cropStage, remainingGrowMs } from '../systems/growth'

export function HUD() {
  const coins = useFarmStore((state) => state.coins)
  const seeds = useFarmStore((state) => state.seeds)
  const selectedSeed = useFarmStore((state) => state.selectedSeed)
  const selectSeed = useFarmStore((state) => state.selectSeed)
  const focusedCellId = useFarmStore((state) => state.focusedCellId)
  const cells = useFarmStore((state) => state.cells)
  const nearShop = useFarmStore((state) => state.nearShop)
  const shopOpen = useFarmStore((state) => state.shopOpen)
  const hudNow = useFarmStore((state) => state.hudNow)
  const harvest = useFarmStore((state) => state.harvest)

  const focused = cells.find((cell) => cell.id === focusedCellId)
  const prompt = buildPrompt({
    focused,
    nearShop,
    shopOpen,
    selectedSeed,
    seeds,
    now: hudNow,
  })

  return (
    <div className="hud">
      <div className="hud-top">
        <div className="hud-brand">
          <strong>晨露农场</strong>
          <span>Three.js / R3F 农场 Demo</span>
        </div>
        <div className="hud-coins">金币 {coins}</div>
      </div>

      <div className="hud-prompt">{prompt}</div>

      <div className="hotbar">
        {CROP_LIST.map((crop) => {
          const active = crop.id === selectedSeed
          return (
            <button
              key={crop.id}
              type="button"
              className={active ? 'hotbar-slot active' : 'hotbar-slot'}
              onClick={() => selectSeed(crop.id)}
            >
              <span className="hotbar-key">{crop.hotkey}</span>
              <span className="hotbar-swatch" style={{ background: crop.fruitColor }} />
              <span className="hotbar-name">{crop.name}</span>
              <span className="hotbar-count">种子 {seeds[crop.id]}</span>
              <span className="hotbar-count dim">收获 {harvest[crop.id]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function buildPrompt({
  focused,
  nearShop,
  shopOpen,
  selectedSeed,
  seeds,
  now,
}: {
  focused: ReturnType<typeof useFarmStore.getState>['cells'][number] | undefined
  nearShop: boolean
  shopOpen: boolean
  selectedSeed: ReturnType<typeof useFarmStore.getState>['selectedSeed']
  seeds: ReturnType<typeof useFarmStore.getState>['seeds']
  now: number
}) {
  if (shopOpen) return '按 E 关闭商店'
  if (nearShop) return '按 E 打开售货摊，买卖种子和作物'
  if (!focused) return 'WASD 移动 · Shift 跑步 · 走到菜地格子上种收'
  const stage = cropStage(focused, now)
  if (stage === 'empty') {
    if (seeds[selectedSeed] <= 0) return `${CROPS[selectedSeed].seedName} 不足，去售货摊买一些`
    return `按 E 种植 ${CROPS[selectedSeed].name}`
  }
  if (stage === 'mature' && focused.cropId) {
    return `按 E 收获 ${CROPS[focused.cropId].name}`
  }
  const seconds = Math.ceil(remainingGrowMs(focused, now) / 1000)
  const name = focused.cropId ? CROPS[focused.cropId].name : '作物'
  return `${name} 成长中，还剩 ${seconds} 秒`
}
