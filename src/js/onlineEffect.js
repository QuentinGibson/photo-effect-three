import * as THREE from 'three';
const onlineEffect = {
  uniforms: {
    time: { value: 0.0 },
    mouse: { value: new THREE.Vector2() },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: `
      precision mediump float;
    
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
     `,
  fragmentShader: `
  #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    
    varying vec2 vUv;
    
    void main( void ) {
      vec2 uv = (vUv * 2.0 - 1.0);
      uv.y *= resolution.y / resolution.x;
      
      float dist = length(uv);
      float angle = atan(uv.y, uv.x);
      
      float rippleEffect = sin(8.0 * dist - time * 2.0) * 0.1 / dist;
      vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2.0, 4.0));
      color += rippleEffect;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
}

export default onlineEffect