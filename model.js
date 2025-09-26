import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//global variable that is the gltf model
var gltfmodel;
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4f4d46);

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


        gltfmodel = gltf.scene;
        gltf.scene.scale.x = 1
        gltf.scene.scale.y = 1
        gltf.scene.scale.z = 1

        gltf.scene.position.x = 0;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 0;

        scene.add(gltfmodel)

        const objNames = [];
        gltfmodel.traverse((child) => {
            if (child.isMesh || child.isObject3D) {
                if (child.name) {
                    objNames.push(child.name);
                }
            }
        });

        console.log(objNames) //Cube103 and Cube104
    }
)


//canvas 
const canvas = document.querySelector('canvas.webgl')

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height)


const tick = () => {
    window.requestAnimationFrame(tick)

    renderer.render(scene, camera)
    controls.update()

}

//adding a raycaster so that things may be clickable in the blender file
const raycaster = new THREE.Raycaster()
document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    const coordinates = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),

    );


    raycaster.setFromCamera(coordinates, camera);
    //TODO: have to make it show dialog boxes when clicked now
    const intersections = raycaster.intersectObjects(gltfmodel.children, true);
    for (let i = 0; i < intersections.length; i++) {
        if (intersections[i].object.name == 'Cube103') {
            console.log("About");
        } else if (intersections[i].object.name == 'Cube104') {
            console.log("Contact")
        }
    }
}

tick()
