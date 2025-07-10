import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//scene
const scene = new THREE.Scene();


//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//directional light so that there is a light that points from the top
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(2, 2, 3);
scene.add(camera);
camera.lookAt(0, 0, 0);

//model from blender
//dracoloader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/static/draco/');

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    '/static/Isometric_Room_Alwin.glb',
    (gltf) => {
        console.log('loaded')
        gltf.scene.scale.set(1, 1, 1)

        gltf.scene.position.set(0, 0, 0)
        scene.add(gltf.scene)
    }
)

//canvas 
const canvas = document.querySelector('canvas.webgl')

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    requestAnimationFrame(tick)
    renderer.render(scene, camera)
}

tick()