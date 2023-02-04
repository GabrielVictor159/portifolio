import React from 'react';
import { Hud, PresentationControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import { Suspense } from 'react'
import styles from "../styles/components/modelViewer.module.scss"
function Model(props:any) {
  if(props.url){
  const { scene } = useGLTF(`${props.url}`);
  return <primitive object={scene} {...props} />
  }
  else{
    return <></>
  }
}
export default function ModelViewer({ ...props }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas  dpr={[1, 2]} shadows camera={{ fov: 45 }}    style={{width: `200vw`, height: `200vh`, position: `relative` , borderRadius:8}}>
        <color attach={"background"} args={[props.background]} />

        <PresentationControls  speed={2.5} global zoom={.5} polar={[-0.1, Math.PI / 4]} >
          <Stage scale={10} environment={'park'}  shadows={'accumulative'} >
            <Model scale={10}  url={props.url}/>
          </Stage>
        </PresentationControls>

      </Canvas>
    </Suspense>


  );
}
const LoadingSpinner = () => (
  <div className={styles.dot_spinner}>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
</div>
);