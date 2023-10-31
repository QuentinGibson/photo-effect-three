uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 pixels;
float PI = 3.14159265358979323846;
  
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}