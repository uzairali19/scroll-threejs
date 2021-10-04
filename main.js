import "./style.css";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/* Scene */
const scene = new THREE.Scene();

/* Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

/* Debug with GUI */

const gui = new dat.GUI();

/* Background */

/* Textures */

const textureLoader = new THREE.TextureLoader();

/* Geometries */

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1.3);

for (let i = 0; i < 3; i += 1) {
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`./images/${i}.jpg`),
  });

  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(planeMesh);
}

/* Materials */

/* Mesh */

/* lights */

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

/* Orbit Controls */
const controls = new OrbitControls(camera, renderer.domElement);

/* Grid Helper */
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

/* Animation Function */

function animate() {
  requestAnimationFrame(animate);

  // Objects animation

  // Orbit Controls
  controls.update();

  // Renderer
  renderer.render(scene, camera);
}

animate();
