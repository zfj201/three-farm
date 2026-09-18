import { useEffect, useMemo, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { LoopOnce, LoopRepeat, type AnimationAction, type Group } from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { bindPlayerInput, readInput } from './input'
import { clampToYard, playerRuntime, resolveYawDelta } from './runtime'

const MODEL_URL = '/models/RobotExpressive.glb'
const WALK_SPEED = 3.35
const RUN_SPEED = 6.15

export function Player() {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(MODEL_URL)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)
  const currentClip = useRef('Idle')

  useEffect(() => clone.traverse((child) => {
    child.castShadow = true
    child.receiveShadow = true
  }), [clone])

  useEffect(() => bindPlayerInput(), [])

  useEffect(() => {
    actions.Idle?.reset().fadeIn(0.2).play()
    return () => {
      Object.values(actions).forEach((action) => action?.stop())
    }
  }, [actions])

  useFrame((_, delta) => {
    const input = readInput()
    const moveZ = Number(input.forward) - Number(input.back)
    const moveX = Number(input.right) - Number(input.left)
    const hasMove = moveX !== 0 || moveZ !== 0
    const running = hasMove && input.run
    const now = performance.now()
    const acting = now < playerRuntime.actionUntil

    let nextX = playerRuntime.position.x
    let nextZ = playerRuntime.position.z

    if (hasMove && !acting) {
      const yaw = playerRuntime.cameraYaw
      const sin = Math.sin(yaw)
      const cos = Math.cos(yaw)
      const dirX = -sin * moveZ + cos * moveX
      const dirZ = -cos * moveZ - sin * moveX
      const length = Math.hypot(dirX, dirZ) || 1
      const speed = (running ? RUN_SPEED : WALK_SPEED) * delta
      const nx = nextX + (dirX / length) * speed
      const nz = nextZ + (dirZ / length) * speed
      const clamped = clampToYard(nx, nz)
      nextX = clamped.x
      nextZ = clamped.z
      const targetYaw = Math.atan2(dirX, dirZ)
      playerRuntime.yaw += resolveYawDelta(playerRuntime.yaw, targetYaw) * (1 - Math.exp(-delta * 10))
    }

    playerRuntime.position.set(nextX, 0, nextZ)
    playerRuntime.moving = hasMove && !acting
    playerRuntime.running = running && !acting

    if (group.current) {
      group.current.position.copy(playerRuntime.position)
      group.current.rotation.y = playerRuntime.yaw
    }

    let clip = 'Idle'
    if (acting) clip = playerRuntime.actionName
    else if (playerRuntime.running) clip = 'Running'
    else if (playerRuntime.moving) clip = 'Walking'
    switchClip(currentClip, actions, clip)
  }, -1)

  return (
    <group ref={group} dispose={null}>
      <primitive object={clone} scale={1} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[0.55, 16]} />
        <meshStandardMaterial color="#3f6d32" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

useGLTF.preload(MODEL_URL)

function switchClip(
  currentClip: { current: string },
  actions: Record<string, AnimationAction | null | undefined>,
  name: string,
) {
  if (currentClip.current === name) return
  const next = actions[name]
  const prev = actions[currentClip.current]
  if (!next) return
  prev?.fadeOut(0.18)
  next.reset().fadeIn(0.18).play()
  if (name === 'Wave' || name === 'Punch') {
    next.setLoop(LoopOnce, 1)
    next.clampWhenFinished = true
  } else {
    next.setLoop(LoopRepeat, Infinity)
    next.clampWhenFinished = false
  }
  currentClip.current = name
}
