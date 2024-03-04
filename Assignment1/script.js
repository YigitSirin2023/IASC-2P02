import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS


//cone
const geometry = new THREE.ConeGeometry( 2, 2, 5 ); 
const material = new THREE.MeshNormalMaterial();
const cone = new THREE.Mesh(geometry, material ); 
cone.rotation.z = Math.PI * -0.5
cone.rotation.x = Math.PI * -0.5
cone.position.set(6.5, -1.5, 8)

cone.castShadow = true
scene.add( cone );

//Octahedron 
const octahedrongeometry = new THREE.OctahedronGeometry( 2,0); 
const octahedronmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const octahedron = new THREE.Mesh( octahedrongeometry, octahedronmaterial ); 
octahedron.position.set(7.5, -1.5, -3)


octahedron.castShadow = true
scene.add( octahedron );




// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('aqua'),
    emissiveIntensity: 10
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)




/***********
** LIGHTS **
************/
/*
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

// Direcional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('aqua'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)


/*******************
** DOM INTERACTIONS **
********************/
//domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// continue-reading
    document.querySelector('#continue-reading').onclick = function(){
        document.querySelector('#part-two').classList.remove('hidden')
        document.querySelector('#part-one').classList.add('hidden')
        domObject.part = 2
    }

//restart
document.querySelector('#restart').onclick = function(){
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    //reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false

    octahedron.position.set(7.5, -1.5, -3)
    // cone.position.set(6.5, -1.5, 8)
   

    //reset octahedron back to only show triangle by rotating it as well as the cone
    octahedron.rotation.x = 1.5
    cone.lookAt(-5,60,6.1)
  

    //reset directionalLight
    directionalLight.position.set(10, 5, 0)
}

//first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

//second change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}

//third change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

//fourth change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

   

    // Controls
    controls.update()

    

    //DOM INTERACTIONS

    //part 1
    if(domObject.part === 1){
       camera.position.set(0.17,0.28,0.04)
       camera.lookAt(-5,0,0.1)
    }

    //part 2
    if(domObject.part === 2){
        camera.position.set(12,3.12,12.11)
       camera.lookAt(-3,0.5,1)
        
    }

    //first-change
    if(domObject.firstChange){
       
        directionalLight.position.set (10,2.5,0)
        

    }

    //second-change
    if(domObject.secondChange){
        directionalLight.position.z = Math.sin(elapsedTime * 1.5) * 4
        octahedron.rotation.x = elapsedTime
       
    }

    //third-change
    if(domObject.thirdChange){
       
        cone.rotation.z = elapsedTime
    
        
    }

    //fourth-change
    if(domObject.fourthChange){
        domObject.secondChange = false
        domObject.thirdChange = false
        domObject.firstChange = false
        directionalLight.position.y -= 0.008
        
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()