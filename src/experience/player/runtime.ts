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

export function moveWithCollision(prevX: number, prevZ: number, nextX: number, nextZ: number) {
  const yard = clampToYard(nextX, nextZ)
  const hx = 1.75
  const hz = 1.2
  const inside =
    Math.abs(yard.x - WORLD.stall.x) < hx && Math.abs(yard.z - WORLD.stall.z) < hz
  if (!inside) return yard

  const resolved = { ...yard }
  if (Math.abs(prevX - WORLD.stall.x) >= hx) resolved.x = prevX
  if (Math.abs(prevZ - WORLD.stall.z) >= hz) resolved.z = prevZ
  if (Math.abs(resolved.x - WORLD.stall.x) < hx && Math.abs(resolved.z - WORLD.stall.z) < hz) {
    return { x: prevX, z: prevZ }
  }
  return resolved
}

export function resolveYawDelta(current: number, target: number) {
  let delta = target - current
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return delta
}
