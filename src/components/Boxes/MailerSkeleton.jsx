import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";
import { useAppSelector } from "../../lib/store/hooks";
import { selectBoxState } from "../../lib/store/features/box/boxSlice";

export function MailerBoxSkeleton(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/mailer/mailer-box-new.glb"
  );
  const { actions } = useAnimations(animations, group);

  const boxState = useAppSelector(selectBoxState);

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === "open") {
      actions.Animation.setLoop(LoopOnce);
      actions.Animation.clampWhenFinished = true;
      actions.Animation.timeScale = 1;
      actions.Animation.reset().play();
    } else if (boxState === "close") {
      actions.Animation.setLoop(LoopOnce);
      actions.Animation.clampWhenFinished = true;
      actions.Animation.timeScale = -1;
      actions.Animation.paused = false;
    }
  }, [boxState, actions.Animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature001" rotation={[Math.PI, 0, Math.PI]}>
          <group name="material_print001">
            <skinnedMesh
              name="material_print001_1"
              geometry={nodes.material_print001_1.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.material_print001_1.skeleton}
            />
            <skinnedMesh
              name="material_print001_2"
              geometry={nodes.material_print001_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.material_print001_2.skeleton}
            />
            <skinnedMesh
              name="material_print001_3"
              geometry={nodes.material_print001_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.material_print001_3.skeleton}
            />
            <skinnedMesh
              name="material_print001_4"
              geometry={nodes.material_print001_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.material_print001_4.skeleton}
              material-roughness={0.2}
              material-metalness={0.5}
              material-transparent={true}
              material-opacity={0}
            />
            <skinnedMesh
              name="material_print001_5"
              geometry={nodes.material_print001_5.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.material_print001_5.skeleton}
              material-transparent={true}
              material-opacity={0}
            />
          </group>
          <primitive object={nodes.Bone008} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/mailer/mailer-box-new.glb");
