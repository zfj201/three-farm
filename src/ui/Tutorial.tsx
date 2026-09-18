import { useFarmStore } from '../store/useFarmStore'

const STEPS = [
  'WASD 移动，Shift 跑步，按住鼠标拖拽旋转镜头。',
  '走到 4×3 菜地的格子上，按 E 种植；成熟后再按 E 收获。',
  '走到红色售货摊按 E，用金币买种子、卖掉收获的作物。',
]

export function Tutorial() {
  const done = useFarmStore((state) => state.tutorialDone)
  const completeTutorial = useFarmStore((state) => state.completeTutorial)

  if (done) return null

  return (
    <div className="modal-backdrop">
      <div className="modal tutorial" role="dialog" aria-labelledby="tutorial-title">
        <h2 id="tutorial-title">欢迎来到晨露农场</h2>
        <ol>
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="hint">按 1 / 2 / 3 切换胡萝卜、番茄、玉米种子。</p>
        <button type="button" className="primary-btn" onClick={completeTutorial}>
          开始种田
        </button>
      </div>
    </div>
  )
}
