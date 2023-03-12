import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three';
import { TextureLoader } from 'three';

export default function Tee() {
    function Model({ ...props }) {
        const texture = new THREE.TextureLoader().load('./assets/texture.jpg');
        const loader = new THREE.TextureLoader();
        loader.load(
            './assets/texture.jpg',
            function (texture) {
                const material = new THREE.MeshBasicMaterial({
                    map: texture
                });
            }, undefined,
            function (err) {
                console.error('An error happened.');
            }
        );


        loader.load('./assets/texture.jpg',
            function (image) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                context.drawImage(image, 100, 100);
            },
            undefined,
            function () {
                console.error('An error happened.');
            }
        );

        const group = useRef();
        const { nodes, materials } = useGLTF("/tees.gltf");
        const textureEx = useTexture("/texture.jpg");

        return (
            <group ref={group} {...props} dispose={null}>
                <mesh geometry={nodes.Ribbing.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Ribbing_1.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Ribbing_2.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Ribbing_3.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Ribbing_4.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Ribbing_5.geometry} material={materials.Body_FRONT_2664} />
                <mesh geometry={nodes.Body_Front.geometry} material={materials.Body_FRONT_2664}  >
                    <meshBasicMaterial map={textureEx} />
                </mesh>
                <mesh geometry={nodes.Body_Front_1.geometry} material={materials.Body_FRONT_2664}  >
                    <meshBasicMaterial map={textureEx} />
                </mesh>
                <mesh geometry={nodes.Body_Front_2.geometry} material={materials.Body_FRONT_2664} >

                </mesh>
                <mesh geometry={nodes.Body_Back.geometry} material={materials.Body_FRONT_2664}></mesh>
                <mesh geometry={nodes.Body_Back_1.geometry} material={materials.Body_FRONT_2664}></mesh>
                <mesh geometry={nodes.Body_Back_2.geometry} material={materials.Body_FRONT_2664}></mesh>
                <mesh geometry={nodes.Sleeves.geometry} material={materials.Sleeves_FRONT_2669}></mesh>
                <mesh geometry={nodes.Sleeves_1.geometry} material={materials.Sleeves_FRONT_2669} />
                <mesh geometry={nodes.Sleeves_2.geometry} material={materials.Sleeves_FRONT_2669} />
                <mesh geometry={nodes.Sleeves_3.geometry} material={materials.Sleeves_FRONT_2669} />
                <mesh geometry={nodes.Sleeves_4.geometry} material={materials.Sleeves_FRONT_2669} />
                <mesh geometry={nodes.Sleeves_5.geometry} material={materials.Sleeves_FRONT_2669} />
            </group>);
    }

    return (
        <>
            <Canvas camera={{ position: [-10, 10, 42], fov: 50 }}>
                <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
                <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
                <group position={[0, -15, 0]}>
                    <Model position={[0, 0.25, 0]} url='tees.gltf' scale={[20, 20, 20]} />
                    <ContactShadows scale={20} blur={10} far={20} />
                </group>
                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.4} minPolarAngle={Math.PI / 2 - 0.4} enablePan={false} />
            </Canvas>
        </>
    )
}


