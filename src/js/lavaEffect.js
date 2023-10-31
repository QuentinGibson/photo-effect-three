import * as THREE from 'three';
import frag from '../assets/shaders/lava.frag'
import vert from '../assets/shaders/lava.vert'

const lavaEffect = {
  uniforms: {
    time: { value: 0.0 },
    mouse: { value: new THREE.Vector2() },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: vert,
  fragmentShader: frag,
}

export default lavaEffect