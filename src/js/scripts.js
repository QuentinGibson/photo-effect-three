import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import customEffect from './customEffect';
import * as dat from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import effect1 from './effect1'
import effect2 from './effect2'
import effect3 from './effect3'
import t0 from '../assets/catwomen.png'
import t1 from '../assets/asian-closeup.png'
import t2 from '../assets/purple-asian.png'
import rawMask from '../assets/maskTexture.png'
import gsap from 'gsap'
import { lerp } from 'three/src/math/MathUtils';

// const newFileUrl = new URL('../assets/Alpaca.gltf', import.meta.url)

const raw = [t0, t1, t2]
const textures = raw.map(image => new THREE.TextureLoader().load(image))
const maskTexture = new THREE.TextureLoader().load(rawMask)
const mouseCoords = new THREE.Vector2()
const mouseTarget = new THREE.Vector2()

const renderer = new THREE.WebGLRenderer({ antialias: true });
const composer = new EffectComposer(renderer)

renderer.setSize(window.innerWidth, window.innerHeight);
composer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  110,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

renderer.setClearColor(0x000000);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 10, 400);
orbit.update()

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const effectPass = new ShaderPass(effect2)
composer.addPass(effectPass)
const effectPass2 = new ShaderPass(effect3)
composer.addPass(effectPass2)

const settings = {
  progress: 0,
  progress1: 0,
  runAnimation: () => runAnimation(2500),
  runAnimation2: () => runAnimation(5000),
  reset: () => runAnimation(0)
}

const gui = new dat.GUI();
gui.add(settings, "progress", 0, 1, 0.01).onChange(val => {
  effectPass2.uniforms.uProgress.value = val
})
gui.add(settings, "progress1", 0, 1, 0.01).onChange(val => {
  effectPass.uniforms.uProgress.value = val
})
gui.add(settings, 'runAnimation')
gui.add(settings, 'runAnimation2')
gui.add(settings, 'reset')

function runAnimation(val) {
  let tl = gsap.timeline();

  if (val === 5000) {
    tl.to(camera.position, {
      x: val,
      duration: 1,
      ease: 'power4.inOut'
    }, 0)
  } else {
    tl.to(camera.position, {
      x: val,
      duration: 1,
      ease: 'power4.inOut'
    }, 0)
  }
  tl.to(camera.position, {
    z: 300,
    duration: 0.1,
    ease: 'power4.inOut'
  }, 0)

  tl.to(camera.position, {
    z: 400,
    duration: 0.25,
    ease: 'power4.inOut'
  }, 1)
  tl.to(effectPass.uniforms.uProgress, {
    value: 0.23,
    duration: 0.5,
    ease: 'power4.inOut'
  }, 0)

  tl.to(effectPass2.uniforms.uProgress, {
    value: 0.12,
    duration: 0.5,
    ease: 'power4.inOut'
  }, 0)

  tl.to(effectPass.uniforms.uProgress, {
    value: 0,
    duration: 0.5,
    ease: 'power4.inOut'
  }, 1)

  tl.to(effectPass2.uniforms.uProgress, {
    value: 0,
    duration: 0.5,
    ease: 'power4.inOut'
  }, 1)
}

let groupGeometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
const groups = []
textures.forEach((val, j) => {
  const group = new THREE.Group();
  scene.add(group)
  groups.push(group)
  for (let i = 0; i < 3; i++) {
    let m
    if (i > 0) {
      m = new THREE.MeshBasicMaterial({
        map: val,
        alphaMap: maskTexture,
        transparent: true
      })
    } else {
      m = new THREE.MeshBasicMaterial({
        map: val
      })
    }
    let mesh = new THREE.Mesh(groupGeometry, m)
    mesh.position.z = (i + 1) * 70

    group.add(mesh)
    group.position.x = j * 2500
  }
})


const clock = new THREE.Clock(true);
function animate() {
  const currentTime = clock.getElapsedTime()
  composer.render()
  mouseTarget.lerp(mouseCoords, 0.02)
  groups.forEach(group => {
    group.rotation.x = mouseTarget.y * 0.0001
    group.rotation.y = -mouseTarget.x * 0.00002
  })

}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', function (e) {
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
  // console.log(mouseCoords)
})