import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import customEffect from './customEffect';
import onlineEffect from './onlineEffect';
import onlineEffect2 from './onlineEffect2';
import lavaEffect from './lavaEffect'
import * as dat from 'dat.gui';

// const newFileUrl = new URL('../assets/Alpaca.gltf', import.meta.url)

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 1);
orbit.update();

// const gui = new dat.GUI();

const onlineShaderMaterial = new THREE.ShaderMaterial(lavaEffect)
const planeGeometry = new THREE.PlaneGeometry(2, 1, 300, 300)
const planeMesh = new THREE.Mesh(planeGeometry, onlineShaderMaterial)
scene.add(planeMesh)

function animate() {
  renderer.render(scene, camera);
  onlineShaderMaterial.uniforms.time.value += 0.01;
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});