import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene();


//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//point light so that it illuminates and has the cool shadow and also added a beige color as the light
const light = new THREE.PointLight(0xf5f5dc, 1);
light.position.x = 1
light.position.y = 1.5
light.position.z = 0

scene.add(light);

//camera and played around with x, y, and z coordinates to find the best position for the model
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1.99
camera.position.y = 1.4
camera.position.z = -1.88

scene.add(camera);

//model from blender
//dracoloader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/static/draco/');

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    '/static/Isometric_Room_Alwin.glb',
    (gltf) => {
        gltf.scene.scale.x = 1
        gltf.scene.scale.y = 1
        gltf.scene.scale.z = 1

        gltf.scene.position.x = 0;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 0;

        scene.add(gltf.scene)
        
    }
    
)


//canvas 
const canvas = document.querySelector('canvas.webgl')

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    window.requestAnimationFrame(tick)

    renderer.render(scene, camera)
    controls.update()

}

tick()

c