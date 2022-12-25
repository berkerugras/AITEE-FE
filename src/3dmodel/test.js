import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'

export default function Tee() {
    return (
        <>
            <Canvas camera={{ position: [-10, 10, 42], fov: 50 }}>
                <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
                <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
                <group position={[0, -15, 0]}>
                    <Model position={[0, 0.25, 0]} url='tees.gltf' scale={[20, 20, 20]} />
                    <ContactShadows scale={20} blur={10} far={20} />
                </group>
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.4} minPolarAngle={Math.PI / 2 - 0.4} enablePan={false} />
            </Canvas>
        </>
    )
}

function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} {...props} />
}
