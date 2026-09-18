import { Vector3 } from 'three'
import { WORLD } from '../../data/world'

export const playerRuntime = {
  position: new Vector3(WORLD.spawn.x, WORLD.spawn.y, WORLD.spawn.z),
  yaw: Math.PI,
  cameraYaw: 0.42,
  cameraPitch: 0.36,
  moving: false,
  running: false,
  actionUntil: 0,
  actionName: 'Wave' as 'Wave' | 'Punch',
}

export function clampToYard(x: number, z: number) {
  const limit = WORLD.walkLimit
  return {
    x: Math.min(limit, Math.max(-limit, x)),
    z: Math.min(limit, Math.max(-limit, z)),
  }
}

export function resolveYawDelta(current: number, target: number) {
  let delta = target - current
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return delta
}
