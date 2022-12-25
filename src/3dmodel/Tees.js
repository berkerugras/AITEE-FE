import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/tees.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={100}>
        <mesh geometry={nodes.Ribbing.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Ribbing_1.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Ribbing_2.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Ribbing_3.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Ribbing_4.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Ribbing_5.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Front.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Front_1.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Front_2.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Back.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Back_1.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Body_Back_2.geometry} material={materials.Body_FRONT_2664} />
        <mesh geometry={nodes.Sleeves.geometry} material={materials.Sleeves_FRONT_2669} />
        <mesh geometry={nodes.Sleeves_1.geometry} material={materials.Sleeves_FRONT_2669} />
        <mesh geometry={nodes.Sleeves_2.geometry} material={materials.Sleeves_FRONT_2669} />
        <mesh geometry={nodes.Sleeves_3.geometry} material={materials.Sleeves_FRONT_2669} />
        <mesh geometry={nodes.Sleeves_4.geometry} material={materials.Sleeves_FRONT_2669} />
        <mesh geometry={nodes.Sleeves_5.geometry} material={materials.Sleeves_FRONT_2669} />
      </group>
    </group>
  )
}

useGLTF.preload('/tees.gltf')
