import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three';
import { MeshStandardMaterial, TextureLoader } from 'three';

export default function Teem() {
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
        const { nodes, materials } = useGLTF("/teenew.gltf");



        const [colorMap, normalMap, roughMap] = useLoader(TextureLoader, [
            "/texture.jpg",
            './UV/normal2.jpg ',
            './UV/rough.jpg',
        ])

        const txt = new THREE.TextureLoader().load("/texture.jpg");

        return (
            <group {...props} dispose={null}>
                <mesh geometry={nodes.Pattern_539913.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_539913_1.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_539913_2.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']} >
                </mesh>
                <mesh geometry={nodes.Pattern_539914.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_539914_1.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_539914_2.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_473510.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']} >

                </mesh>
                <mesh geometry={nodes.Pattern_473510_1.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>

                </mesh>
                <mesh geometry={nodes.Pattern_473510_2.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_510522.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']}>
                </mesh>
                <mesh geometry={nodes.Pattern_510522_1.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']} >
                </mesh>
                <mesh geometry={nodes.Pattern_510522_2.geometry} material={materials['t-shirt Knit_Cotton_Jersey_FRONT_217918']} >
                </mesh>
                <mesh geometry={nodes.Pattern_192011.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']} >
                </mesh>
                <mesh geometry={nodes.Pattern_192011_1.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']}>
                </mesh>
                <mesh geometry={nodes.Pattern_192011_2.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']} >
                </mesh>
                <mesh geometry={nodes.Pattern_199505.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']} >
                </mesh>
                <mesh geometry={nodes.Pattern_199505_1.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']} >
                </mesh>
                <mesh geometry={nodes.Pattern_199505_2.geometry} material={materials['t-shirt Rib_2X2_468gsm mod_FRONT_217852']} >
                </mesh>

            </group>);
    }

    return (
        <>
            <Canvas camera={{ position: [-10, 10, 42], fov: 50 }}>
                <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
                <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
                <group position={[0, -15, 0]}>
                    <Model position={[0, 0.25, 0]} url='teenew.gltf' scale={[20, 20, 20]} />
                    <ContactShadows scale={20} blur={10} far={20} />
                </group>
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.4} minPolarAngle={Math.PI / 2 - 0.4} enablePan={false} />
            </Canvas>
        </>
    )
}
