import { useFrame } from '@react-three/fiber'
import { useFarmStore } from '../store/useFarmStore'
import { distanceToStall, findCellAt } from '../systems/interaction'
import { consumeInteract, consumeSeedSlot } from './player/input'
import { playerRuntime } from './player/runtime'

export function GameSystems() {
  useFrame(() => {
    const now = Date.now()
    const store = useFarmStore.getState()
    store.tickHud(now)

    const cell = findCellAt(playerRuntime.position.x, playerRuntime.position.z)
    const nearShop = distanceToStall(playerRuntime.position.x, playerRuntime.position.z) < 2.15
    store.setFocus(cell?.id ?? null, nearShop)
    if (store.shopOpen && !nearShop) store.closeShop()

    if (!store.tutorialDone) {
      consumeSeedSlot()
      consumeInteract()
      return
    }

    const slot = consumeSeedSlot()
    if (slot) store.selectSeedBySlot(slot)

    if (!consumeInteract()) return
    const result = store.tryInteract()
    if (result === 'plant') {
      playerRuntime.actionName = 'Wave'
      playerRuntime.actionUntil = performance.now() + 850
    } else if (result === 'harvest') {
      playerRuntime.actionName = 'Punch'
      playerRuntime.actionUntil = performance.now() + 700
    }
  })

  return null
}
