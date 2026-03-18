import {
  Float,
  Line,
  MeshDistortMaterial,
  Scroll,
  ScrollControls,
  Sparkles,
  Stars,
  Text,
  useScroll,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type OceanSceneProps = {
  children: ReactNode
  reducedMotion: boolean
}

type Vec3Tuple = [number, number, number]

type CameraKeyframe = {
  t: number
  position: THREE.Vector3
  target: THREE.Vector3
}

const cameraKeyframes: CameraKeyframe[] = [
  {
    t: 0,
    position: new THREE.Vector3(0, 4.5, 13),
    target: new THREE.Vector3(0, 1.6, 0),
  },
  {
    t: 0.15,
    position: new THREE.Vector3(0.8, 1.8, 10.8),
    target: new THREE.Vector3(0, 0.2, -2),
  },
  {
    t: 0.33,
    position: new THREE.Vector3(1.6, -4.5, 10),
    target: new THREE.Vector3(0, -7, -6),
  },
  {
    t: 0.55,
    position: new THREE.Vector3(-2.8, -12.5, 9.2),
    target: new THREE.Vector3(0, -14.5, -12),
  },
  {
    t: 0.74,
    position: new THREE.Vector3(2.2, -20.2, 11),
    target: new THREE.Vector3(0, -22.5, -16),
  },
  {
    t: 0.88,
    position: new THREE.Vector3(0.8, -8.5, 12),
    target: new THREE.Vector3(0, -5, -6),
  },
  {
    t: 1,
    position: new THREE.Vector3(0, 3.5, 13.5),
    target: new THREE.Vector3(0, 1.2, 0),
  },
]

function interpolateVectors(a: THREE.Vector3, b: THREE.Vector3, alpha: number) {
  return new THREE.Vector3().copy(a).lerp(b, alpha)
}

function sampleCameraPath(offset: number) {
  const clamped = THREE.MathUtils.clamp(offset, 0, 1)

  for (let index = 0; index < cameraKeyframes.length - 1; index += 1) {
    const start = cameraKeyframes[index]!
    const end = cameraKeyframes[index + 1]!

    if (clamped >= start.t && clamped <= end.t) {
      const alpha = (clamped - start.t) / (end.t - start.t)
      return {
        position: interpolateVectors(start.position, end.position, alpha),
        target: interpolateVectors(start.target, end.target, alpha),
      }
    }
  }

  const last = cameraKeyframes[cameraKeyframes.length - 1]!

  return {
    position: last.position.clone(),
    target: last.target.clone(),
  }
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scroll = useScroll()
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    const sample = sampleCameraPath(scroll.offset)
    const easing = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.4)

    if (!reducedMotion) {
      const drift = Math.sin(state.clock.elapsedTime * 0.2) * 0.015
      sample.position.x += Math.sin(state.clock.elapsedTime * 0.16) * 0.5
      sample.position.y += drift
      sample.target.x += Math.cos(state.clock.elapsedTime * 0.14) * 0.35
    }

    state.camera.position.lerp(sample.position, easing)
    lookTarget.current.lerp(sample.target, easing)
    state.camera.lookAt(lookTarget.current)
  })

  return null
}

function SurfaceWater() {
  const scroll = useScroll()
  const surfaceRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const fade = 1 - THREE.MathUtils.smoothstep(scroll.offset, 0.14, 0.34)

    if (surfaceRef.current) {
      const material = surfaceRef.current.material as THREE.Material & { opacity: number }
      material.opacity = THREE.MathUtils.clamp(fade * 0.86, 0.04, 0.86)
    }
  })

  return (
    <>
      <mesh ref={surfaceRef} rotation-x={-Math.PI / 2} position={[0, 0, -6]} receiveShadow>
        <planeGeometry args={[140, 140, 180, 180]} />
        <MeshDistortMaterial
          color="#0a2b59"
          transparent
          opacity={0.86}
          speed={0.7}
          distort={0.18}
          roughness={0.16}
          metalness={0.35}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.18, -6]}>
        <planeGeometry args={[140, 140]} />
        <meshBasicMaterial color="#9fdcff" transparent opacity={0.06} />
      </mesh>
    </>
  )
}

function DataStreams() {
  const groupRef = useRef<THREE.Group>(null)

  const streams = useMemo<Vec3Tuple[][]>(
    () => [
      [
        [-8, -6, -8],
        [-2, -7.2, -12],
        [4, -6.1, -16],
        [8, -7.3, -20],
      ],
      [
        [9, -10, -6],
        [3, -10.8, -12],
        [-4, -10.1, -17],
        [-8, -11.4, -23],
      ],
      [
        [-6, -15.8, -8],
        [-2, -14.8, -12],
        [2, -16.2, -16],
        [7, -15.6, -22],
      ],
    ],
    [],
  )

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.05
  })

  return (
    <group ref={groupRef}>
      {streams.map((points, index) => (
        <Line
          key={`stream-${index}`}
          points={points}
          color={index === 1 ? '#38bdf8' : '#00d4ff'}
          transparent
          opacity={0.45}
          lineWidth={1.2}
        />
      ))}
    </group>
  )
}

function KnowledgeNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const positions = useMemo<Vec3Tuple[]>(
    () => [
      [-5.2, -12.6, -10],
      [-1.4, -13.4, -12],
      [3.2, -12.1, -14.4],
      [6.1, -13.7, -17.6],
      [-3.4, -16.6, -13],
      [0.8, -17.8, -15.8],
      [4.6, -17, -18.4],
    ],
    [],
  )

  const links = useMemo<Array<readonly [number, number]>>(
    () => [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [5, 6],
      [2, 5],
    ],
    [],
  )

  return (
    <group>
      {links.map(([from, to], index) => (
        <Line
          key={`node-line-${index}`}
          points={[positions[from]!, positions[to]! ]}
          color="#6fe4ff"
          transparent
          opacity={0.28}
          lineWidth={1}
        />
      ))}

      {positions.map((position, index) => (
        <Float
          key={`node-${index}`}
          speed={reducedMotion ? 0 : 0.9 + index * 0.08}
          rotationIntensity={reducedMotion ? 0 : 0.16}
          floatIntensity={reducedMotion ? 0 : 0.35}
        >
          <mesh position={position}>
            <sphereGeometry args={[0.18, 18, 18]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? '#8b5cf6' : '#77ebff'}
              emissive={index % 3 === 0 ? '#8b5cf6' : '#00d4ff'}
              emissiveIntensity={1.1}
              transparent
              opacity={0.94}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function AlgorithmForms({ reducedMotion }: { reducedMotion: boolean }) {
  const forms = useMemo(
    () => [
      { position: [-7.5, -9.6, -12] as [number, number, number], scale: 1.6 },
      { position: [7.6, -13.5, -15] as [number, number, number], scale: 1.3 },
      { position: [-4.8, -18.2, -18] as [number, number, number], scale: 2 },
      { position: [6.2, -19, -21] as [number, number, number], scale: 1.5 },
    ],
    [],
  )

  return (
    <group>
      {forms.map((form, index) => (
        <Float
          key={`form-${index}`}
          speed={reducedMotion ? 0 : 0.6 + index * 0.18}
          rotationIntensity={reducedMotion ? 0 : 0.26}
          floatIntensity={reducedMotion ? 0 : 0.5}
        >
          <mesh position={form.position} scale={form.scale}>
            <icosahedronGeometry args={[0.55, 0]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.22} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function BubbleField({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        x: (Math.random() - 0.5) * 18,
        y: -24 + Math.random() * 18,
        z: -6 - Math.random() * 20,
        speed: 0.12 + Math.random() * 0.18,
        scale: 0.04 + Math.random() * 0.08,
        drift: (index % 2 === 0 ? 1 : -1) * (0.12 + Math.random() * 0.25),
      })),
    [],
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return
    }

    particles.forEach((particle, index) => {
      if (!reducedMotion) {
        particle.y += particle.speed * delta * 6
        particle.x += Math.sin(state.clock.elapsedTime * 0.3 + index) * particle.drift * delta * 0.25
      }

      if (particle.y > 2) {
        particle.y = -24
      }

      dummy.position.set(particle.x, particle.y, particle.z)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(index, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[0.8, 8, 8]} />
      <meshBasicMaterial color="#9fe7ff" transparent opacity={0.2} />
    </instancedMesh>
  )
}

function CodeFragments({ reducedMotion }: { reducedMotion: boolean }) {
  const fragments = useMemo(
    () => [
      { text: 'def solve(depth):', position: [-7.5, -7.5, -11] as [number, number, number] },
      { text: '01001001', position: [7.5, -9.2, -13] as [number, number, number] },
      { text: 'graph -> shortest path', position: [-4.6, -14.8, -16] as [number, number, number] },
      { text: 'node.connect(data)', position: [5.4, -17.2, -18] as [number, number, number] },
      { text: '10110010', position: [-6.2, -19.4, -20] as [number, number, number] },
    ],
    [],
  )

  return (
    <group>
      {fragments.map((fragment, index) => (
        <Float
          key={`fragment-${index}`}
          speed={reducedMotion ? 0 : 0.8 + index * 0.1}
          floatIntensity={reducedMotion ? 0 : 0.45}
        >
          <Text
            position={fragment.position}
            fontSize={0.38}
            color="#9ce7ff"
            anchorX="center"
            anchorY="middle"
            maxWidth={4}
          >
            {fragment.text}
          </Text>
        </Float>
      ))}
    </group>
  )
}

function DigitalFloor() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.Material & { opacity: number }
      material.opacity = 0.14 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    }
  })

  return (
    <group position={[0, -23.6, -14]}>
      <gridHelper ref={gridRef} args={[100, 40, '#2ae7ff', '#0a3156']} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 0]}>
        <circleGeometry args={[26, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

function LightColumns() {
  const columns = useMemo<Vec3Tuple[]>(
    () => [
      [-6, -4.5, -10],
      [-2.4, -6, -12],
      [2, -7.2, -14],
      [6.2, -8.5, -16],
    ],
    [],
  )

  return (
    <group>
      {columns.map((position, index) => (
        <mesh key={`column-${index}`} position={position} rotation-z={0.12 * (index - 1.5)}>
          <cylinderGeometry args={[0.42, 1.8, 18, 16, 1, true]} />
          <meshBasicMaterial
            color={index < 2 ? '#d8f4ff' : '#38bdf8'}
            transparent
            opacity={index < 2 ? 0.07 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function SceneContent({
  reducedMotion,
}: {
  reducedMotion: boolean
}) {
  return (
    <>
      <CameraRig reducedMotion={reducedMotion} />

      <ambientLight intensity={0.72} color="#94d8ff" />
      <hemisphereLight intensity={0.48} color="#c8ebff" groundColor="#02111f" />
      <directionalLight position={[0, 10, 8]} intensity={2.2} color="#d7ecff" />
      <spotLight
        position={[0, 18, 10]}
        angle={0.34}
        penumbra={1}
        intensity={56}
        color="#cfeeff"
      />
      <pointLight position={[-6, -12, -12]} intensity={18} distance={18} color="#00d4ff" />
      <pointLight position={[6, -18, -18]} intensity={13} distance={20} color="#8b5cf6" />

      <fogExp2 attach="fog" args={['#04111d', 0.052]} />
      <color attach="background" args={['#020412']} />

      <Stars radius={80} depth={40} count={2600} factor={3} saturation={0} fade speed={0.35} />
      <Sparkles count={52} scale={[16, 6, 14]} size={2.2} speed={0.18} position={[0, 3.5, -4]} color="#f3f9ff" />
      <Sparkles count={240} scale={[26, 18, 22]} size={3.6} speed={0.3} position={[0, -10, -10]} color="#56daff" />
      <Sparkles count={140} scale={[20, 14, 18]} size={2.4} speed={0.24} position={[0, -18, -16]} color="#1fdaf2" />

      <SurfaceWater />
      <LightColumns />
      <DataStreams />
      <KnowledgeNodes reducedMotion={reducedMotion} />
      <AlgorithmForms reducedMotion={reducedMotion} />
      <BubbleField reducedMotion={reducedMotion} />
      <CodeFragments reducedMotion={reducedMotion} />
      <DigitalFloor />
    </>
  )
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function StaticSceneFallback({ children }: { children: ReactNode }) {
  return (
    <div className="experience-shell static-fallback-shell">
      <div className="scene-fallback-banner" role="status" aria-live="polite">
        Simplified visual mode is active for smoother performance.
      </div>
      {children}
    </div>
  )
}

export function OceanScene({ children, reducedMotion }: OceanSceneProps) {
  const [useFallback] = useState(!supportsWebGL())
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    document.body.style.overflow = useFallback ? 'auto' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [useFallback])

  if (useFallback) {
    return <StaticSceneFallback>{children}</StaticSceneFallback>
  }

  return (
    <div className="experience-shell">
      {!sceneReady ? <div className="scene-loader">Loading cinematic environment...</div> : null}
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 4.5, 13], fov: 42, near: 0.1, far: 180 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={() => setSceneReady(true)}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.18} maxSpeed={reducedMotion ? 0.08 : 0.2}>
            <SceneContent reducedMotion={reducedMotion} />
            <Scroll html style={{ width: '100%' }}>
              {children}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}