import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import customEffect from './customEffect';
import * as dat from 'dat.gui';
import t0 from '../assets/catwomen.png'
import t1 from '../assets/asian-closeup.png'
import t2 from '../assets/purple-asian.png'
import rawMask from '../assets/maskTexture.png'

// const newFileUrl = new URL('../assets/Alpaca.gltf', import.meta.url)

const raw = [t0, t1, t2]
const textures = raw.map(image => new THREE.TextureLoader().load(image))
const maskTexture = new THREE.TextureLoader().load(rawMask)

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  110,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 470);
orbit.update()


// const gui = new dat.GUI();

let groupGeometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
let group = new THREE.Group()
scene.add(group)


for (let i = 0; i < 3; i++) {
  let m
  let mesh

  if (i > 0) {
    m = new THREE.MeshBasicMaterial({
      map: textures[0],
      alphaMap: maskTexture,
      transparent: true
    })
    mesh = new THREE.Mesh(
      groupGeometry, m
    )
  } else {
    altM = new THREE.MeshBasicMaterial({
      map: textures[0],
    })
    mesh = new THREE.Mesh(
      groupGeometry, altM
    )
  }
  mesh.position.set(0, 0, 0)
  mesh.position.z += (i + 1) * 40
  group.add(mesh)
}


function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', function () {

})