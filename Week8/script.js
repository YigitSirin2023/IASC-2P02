import * as THREE from "three"
/**********
** Setup **
**********/

//Sizes
const Sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

let xDistance = 2
let meshSize = 1.5

//Mobile
if(Sizes.aspectRatio < 1 ){
    console.log('mobile device')
    xDistance = 0.5
    meshSize = 0.5
}

//Resizing
window.addEventListener('resize',() =>{

    //Uoadte sizes
    Sizes.width = window.innerWidth
    Sizes.height = window.innerHeight
    Sizes.aspectRatio = window.innerWidth / window.innerHeight
    
    //Update Camera
    camera.aspect = Sizes.aspectRatio
    camera.updateProjectionMatrix
    
    //Update renderer
    renderer.setSize(Sizes.width, Sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  

})

/**********
** Scene **
**********/

//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()


//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    Sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(Sizes.width, Sizes.height)


/**********
** Meshes **
***********/
//Cube
const cubeGeometry = new THREE.BoxGeometry(meshSize,meshSize, meshSize)
const cubeMaterial = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.position.set(-xDistance,0,-3)
scene.add(cube)



/*********************
** DOM Interactions **
*********************/

const domObject = {
    part:1
}

//part 1 click
document.querySelector('#click1').onclick = function(){
    document.querySelector('#first').classList.add('hidden')
    document.querySelector('#second').classList.remove('hidden')
    domObject.part = 2
}

//part 2 click
document.querySelector('#click2').onclick = function(){
    document.querySelector('#second').classList.add('hidden')
    document.querySelector('#third').classList.remove('hidden')
    domObject.part = 3
}

//part 3 click
document.querySelector('#click3').onclick = function(){
    document.querySelector('#third').classList.add('hidden')
    document.querySelector('#first').classList.remove('hidden')
    domObject.part = 1
}
/*******************
** Animation loop **
*******************/

const clock = new THREE.Clock()
//Animate
const animation = () =>{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
    
    // DOM INTERACTIONS

    //Part 2
    if(domObject.part === 2){
        if(cube.rotation.y <= Math.PI * 0.5){
          cube.rotation.y += 0.02  
        }
        


    }
    //Part 3
    if(domObject.part === 3){
        if(cube.rotation.z <= Math.PI * 0.5){
            cube.rotation.z += 0.02 

        }


    }

    //Part reset
    if(domObject.part == 1){
        if(cube.rotation.y >= 0 &&  cube.rotation.z >= 0){
            cube.rotation.y -= 0.02
            cube.rotation.z -= 0.02
        }

    }
    //update renderer
    renderer.render(scene, camera)
    //request next frame
    window.requestAnimationFrame(animation)
}

animation()