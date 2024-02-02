import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SET-UP **
**********/

//Sizes
    const sizes= {
        width: window.innerWidth,
        height: window.innerHeight,
        asprectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
**********/

//Canvas
    const canvas = document.querySelector('.webgl')

//Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('navy')
//Camaera
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.asprectRatio,
        0.1,
        100
    )

    camera.position.set(2,2,4)
    scene.add(camera)

//Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width,sizes.height)

// Controls
        const controls = new OrbitControls(camera,canvas)
        controls.enableDamping = true


/**********
** MESHES **
**********/

//plane
        const planeGeometry = new THREE.PlaneGeometry(10,10,50,50)
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color('red'),
            side: THREE.DoubleSide,
            wireframe: true
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        
        plane.position.set(0,0,0)
        plane.rotation.x = Math.PI *0.5
        scene.add(plane)

//testSphere
        const geometry = new THREE.SphereGeometry(1)
        const material = new THREE.MeshNormalMaterial()
        const testSphere = new THREE.Mesh(geometry, material)

        testSphere.position.z = 0
        scene.add(testSphere)

        

/*******
** UI**
*******/

//UI
        const ui = new dat.GUI()

//UI Obj
        const uiObject = {}
        uiObject.play = false
        uiObject.speed = 0.5
        uiObject.distance = 2

//Plane UI
        const planeFolder = ui.addFolder('plane')

        planeFolder
            .add(planeMaterial, 'wireframe')
        
       


        
        

//Sphere UI
        const sphereFolder =  ui.addFolder('Sphere')
        
        sphereFolder
            
            .add(testSphere.position, 'x')
            .min(-5)
            .max(5)
            .step(0.1)
            .name('x')

        sphereFolder
            .add(testSphere.position, 'y')
            .min(-5)
            .max(5)
            .step(0.1)
            .name('Y')
        
        sphereFolder
            .add(uiObject,'play')
            .name('Animate sphere')
        
        sphereFolder
            .add(uiObject, 'speed')
            .min(0)
            .max(10)
            .step(1)
            .name('speed')
        sphereFolder
            .add(uiObject, 'distance')
            .min(0)
            .max(10)
            .step(1)
            .name('Distance')


/*******************
** ANIMATION LOOP **
*******************/
const clock= new THREE.Clock()
//Animate
        const animation = () =>
        {
            // return elapsedTime
            const elapsedTime = clock.getElapsedTime()

            // Controls
            controls.update()

            //Animate Sphere
            if(uiObject.play)
            {
                testSphere.position.y = Math.sin(elapsedTime * uiObject.speed)*uiObject.distance
                testSphere.position.x = Math.sin(elapsedTime *5)*8
            }

            //Renderer
            renderer.render(scene, camera)

            //Return next frame
            window.requestAnimationFrame(animation)
        }

animation()

