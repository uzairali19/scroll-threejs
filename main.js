import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";

/* Debug with GUI */

// const gui = new dat.GUI();

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
camera.position.y = 0;
camera.position.x = 0;

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
  planeMesh.position.set(3, i * -1.8);
}

const objects = [];

scene.traverse((object) => {
  if (object.isMesh) {
    objects.push(object);
  }
});

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

/* Mouse */

let y = 0;
let position = 0;
function onMouseWheel(event) {
  y = event.deltaY * 0.0007;
}

window.addEventListener("wheel", onMouseWheel);

/* Raycaster */

const rayCaster = new THREE.Raycaster();

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

/* Animation Function */

function animate() {
  requestAnimationFrame(animate);

  // Raycaster
  rayCaster.setFromCamera(mouse, camera);
  const intersects = rayCaster.intersectObjects(objects);

  intersects.forEach((intersect) => {
    gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: -0.7 });
    gsap.to(intersect.object.position, { z: -0.9 });
  });

  objects.forEach((object) => {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
    }
  });
  // Objects animation

  position += y;
  y *= 0.9;
  camera.position.y = -position;
  // Renderer
  renderer.render(scene, camera);
}

animate();
