import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

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


//canvas 
const canvas = document.querySelector('canvas.webgl')

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
