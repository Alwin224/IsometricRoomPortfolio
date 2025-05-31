import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//scene
const scene = new THREE.Scene();


//sizes
const sizes = {
    width:800,
    height:600
}


//hemisphere light so that there is a light that points from the top
const hemisphereLight = new THREE.HemisphereLight(0xffffff)
scene.add(hemisphereLight)

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 2
scene.add(camera)

//model from blender
//dracoloader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    './Isometric_Room_Alwin.glb',
    (gltf) =>
    {
        console.log('loaded')
        gltf.scene.traverse((child) =>
        {
            child.material = new THREE.MeshBasicMaterial(0xffffff)
        })
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

renderer.render(scene, camera)
