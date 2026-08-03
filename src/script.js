//? Import Three.js basics
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

//? Import Three.js Loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

//? Shaders
import vertexShader from "./shaders/holographic/vertexShader.glsl";
import fragmentShader from "./shaders/holographic/fragmentShader.glsl";
import gsap from "gsap";

/**
 ** Loaders
 */
//? Texture Loader
const textureLoader = new THREE.TextureLoader();

//? Draco Loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

//? Mouse
const mouse = new THREE.Vector2();

//? Raycaster 
const raycaster = new THREE.Raycaster();

//? Mouse Move Event
window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

//? Textures
const textures = {
    first: {
        morning: "./textures/Morning/Bake1.webp",
        night: "./textures/Night/Bake1Night.webp"
    },
    second: {
        morning: "./textures/Morning/Bake2.webp",
        night: "./textures/Night/Bake2Night.webp"
    },
    third: {
        morning: "./textures/Morning/Bake3.webp",
        night: "./textures/Night/Bake3Night.webp"
    },
    fourth: {
        morning: "./textures/Morning/Bake4.webp",
        night: "./textures/Night/Bake4Night.webp"
    },
    fifth: {
        morning: "./textures/Morning/Bake5.webp",
        night: "./textures/Night/Bake5Night.webp"
    },
    envmap: {
        morning: "./textures/Morning/EnvMapMMorning.png",
        night: "./textures/Night/EnvMapNight.png",
    },
}

//? Loader Textures
const loaderTextures = {
    morning: {},
    night: {},
}

//? Load Textures
Object.entries(textures).forEach(([key, paths]) => {
    const morningTexture = textureLoader.load(paths.morning);
    const nightTexture = textureLoader.load(paths.night);

    morningTexture.flipY = false;
    nightTexture.flipY = false;

    morningTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    loaderTextures.morning[key] = morningTexture;
    loaderTextures.night[key] = nightTexture;

});

//? Arrays and Objects
let jettKnife = [];
let bigFanBlades = [];
let smallFanBlades = [];
let hoverableObjects = [];
let keyboardKeys = [];
let chair = null;

//? Debug GUI
const gui = new GUI();

//? Canvas
const canvas = document.querySelector("#experience canvas.webgl");

//? Scene
const scene = new THREE.Scene();

//? Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//? Cursor
const cursor = {
    x: 0,
    y: 0,
};

//? Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(
    75,
    aspectRatio,
    0.1,
    1000,
);
camera.position.set(-2, 2, 0)
// camera.position.set(-2.0936600303324573, 2.5216470408974607, 2.114066167250461);
// camera.rotation.set(-0.7686747537784157, Math.PI / 2, -0.514317856919106);
// scene.add(camera);

//? Setup The Controls
const controls = new OrbitControls(camera, canvas);
controls.minPolarAngle = -Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

controls.minDistance = 1.2;
controls.maxDistance = 3.2;

controls.target.set(-0.001, 1, 0.001);
controls.enableDamping = true;

/*
* Materials  
*/
//? Holographic Material
const hologarphicMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color("#2a3cdd")),
    },
})
gui.addColor(hologarphicMaterial.uniforms.uColor, "value").name("Holographic Color").onChange((value) => {
    hologarphicMaterial.uniforms.uColor.value.set(value);
});

/*
* Monitors Materials 
*/
// //! First Monitor Video
// const firstMonitorVideo = document.createElement("video");
// firstMonitorVideo.src = "./textures/FirstMonitorVideo.mp4";
// firstMonitorVideo.loop = true;
// firstMonitorVideo.muted = true;
// firstMonitorVideo.autoplay = true;
// firstMonitorVideo.play();

// const firstVideoTexture = new THREE.VideoTexture(firstMonitorVideo);
// firstVideoTexture.flipY = false;
// firstVideoTexture.colorSpace = THREE.SRGBColorSpace;

// const firstMonitorMaterial = new THREE.MeshBasicMaterial({ map: firstVideoTexture });

//! Second Monitor Video
const secondMonitorVideo = document.createElement("video");
secondMonitorVideo.src = "./Videos//StardewValley.mp4";
secondMonitorVideo.loop = true;
secondMonitorVideo.muted = true;
secondMonitorVideo.autoplay = true;
secondMonitorVideo.play();

const secondVideoTexture = new THREE.VideoTexture(secondMonitorVideo);
secondVideoTexture.flipY = false;
secondVideoTexture.colorSpace = THREE.SRGBColorSpace;

const secondMonitorMaterial = new THREE.MeshBasicMaterial({ map: secondVideoTexture });

//? Coffee Smoke Material
const coffeeSmokeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

//? PC Glass Material
const pcGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,     // Koyu renkli temperli cam efekti için (istediğin gibi açabilirsin)
    metalness: 0.8,      // Camın ortamı yansıtması için yüksek değer
    roughness: 0.05,     // Pürüzsüz ve parlak bir yüzey için düşük değer
    transparent: true,
    opacity: 0.4,        // Işığı kırmak yerine saydamlaştırıyoruz (Sihir burada)
    // transmission: 1,  <-- BU SATIRI TAMAMEN SİLİYORUZ
    side: THREE.FrontSide
});

//! Keyboard Keys Animation
const keyboardKeyAnimation = (keyboardKeys) => {
    keyboardKeys.forEach((key, index) => {
        const generalDelay = 0.1;
        const delay = generalDelay + index * 0.05;

        const tl = gsap.timeline({
            delay: delay,
            defaults: {
                ease: "back.out(2.0)",
                duration: 0.5,
            },
        });

        tl.to(key.scale, {
            x: 1,
            y: 1,
            z: 1
        }).to(key.position,
            {
                y: key.userData.defaultYPosition.y + 0.01,
            });
    });
}

/**
 ** Load Model
 */
gltfLoader.load("./models/TinyPurpleRoomWithoutMaterial.glb", (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const childName = child.name.toLowerCase(); // Convert the name to lowercase for case-insensitive comparison

            /*
            *Single Objects
            */
            if (childName.includes("hologrampokeball")) {
                child.material = hologarphicMaterial;
            }
            //? Monitors
            else if (childName.includes("monitor")) {
                if (childName === "mainmonitor") {
                    // child.material = firstMonitorMaterial;
                }
                else {
                    child.material = secondMonitorMaterial;
                }
            }
            //? Coffe Smoke
            else if (childName.includes("coffesmoke")) {
                child.material = coffeeSmokeMaterial;
            }
            //? PC Glass
            else if (childName.includes("pcglass")) {
                child.material = pcGlassMaterial;
            }
            //? Jett Knife
            else if (childName.includes("knife")) {
                jettKnife.push(child);
            }
            //? Fan Blades
            else if (childName.includes("bigblade")) {
                bigFanBlades.push(child);
            }
            else if (childName.includes("fanblade")) {
                smallFanBlades.push(child);
            }
            //? Chair
            else if (childName.includes("chair")) {
                chair = child;
            }

            /*
             * Multiple Objects 
            */
            //? Keyboard Keys
            else if (childName.includes("key")) {
                child.userData.defaultYPosition = {
                    y: child.position.y,
                }
                child.scale.set(0, 0, 0);
                child.position.y += 0.15;
                keyboardKeys.push(child);
            }

            //? Hoverable Objects
            else if (childName.includes("raycaster") && !childName.includes("key")) {
                hoverableObjects.push(child);
            }

            //? Using Textures for Materials
            Object.keys(textures).forEach((key) => {
                if (childName.includes(key)) {
                    const material = new THREE.MeshBasicMaterial({
                        map: loaderTextures.morning[key],
                    });
                    child.material = material;

                }
            });
        }
    });

    gltf.scene.scale.set(1, 1, 1);
    scene.add(gltf.scene);
    console.log("Model loaded");

    //? Sort Keyboard Keys by Name
    keyboardKeys.sort((a, b) => {
        // İsimlerin içindeki metinleri silip SADECE rakamları alıyoruz
        // Örnek: "Key12" veya "keyboard_key12" -> Sadece 12 rakamını alır
        const numA = parseInt(a.name.replace(/\D/g, ""));
        const numB = parseInt(b.name.replace(/\D/g, ""));

        // Küçükten büyüğe sıralama komutu
        return numA - numB;
    });

    //! Call Animation for Keyboard Keys
    keyboardKeyAnimation(keyboardKeys);

});

//? Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//? Clock
const clock = new THREE.Clock();
let prevTime = 0;

//? Hovered Object
let currentHovered = null;

//? Animate
const tick = () => {
    //? Controls Update
    controls.dampingFactor = 0.01;
    controls.update();

    //? Time
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - prevTime
    prevTime = elapsedTime

    //? Update Shader Uniforms
    hologarphicMaterial.uniforms.uTime.value = elapsedTime;

    //? Raycaster Update
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(hoverableObjects, false);

    if (intersects.length > 0) {

        const target = intersects[0].object; // For first object that the raycaster intersects

        // Eğer fare YENİ bir objenin üzerine geldiyse (yani saniyede 60 kere tetiklenmesini engelliyoruz)
        if (currentHovered !== target) {
            if (currentHovered) {
                gsap.to(currentHovered.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 0.5,
                    ease: "bounce.out"
                });
            }

            // b) Artık yeni odaklandığımız obje bu oldu
            currentHovered = target;

            // c) Yeni objeyi Bounce animasyonu ile 1.3 katına çıkar
            gsap.to(currentHovered.scale, {
                x: 1.3, y: 1.3, z: 1.3,
                duration: 0.5,
                ease: "bounce.out"
            });

            // d) İmleci tıklanabilir (pointer) yap
            canvas.style.cursor = 'pointer';
        }
    }
    // 4. EĞER LAZER BOŞLUĞA ÇIKTIYSA (MOUSE OBJEDEN AYRILDIYSA)
    else {
        // Eğer az önce bir objenin üzerindeysek ama şimdi boşluğa çıktıysak
        if (currentHovered) {

            // O objeyi orijinal boyutuna (1) geri döndür
            gsap.to(currentHovered.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.5,
                ease: "bounce.out"
            });

            // Kontrol değişkenini sıfırla ki hafızayı boşaltsın
            currentHovered = null;

            // İmleci normal (default) ok haline geri çevir
            canvas.style.cursor = 'default';
        }
    }

    //? Animate Jett Knife, Fan Blades and Chair
    if (jettKnife.length > 0 && bigFanBlades.length > 0 && smallFanBlades.length > 0) {
        //! JETT KNIFE ANIMATION
        const baseY = 1.90; // Bıçağın başlangıç yüksekliğini kaydet
        const baseSpeed = 1.0;
        const burstSpeed = Math.pow(Math.sin(elapsedTime * 0.8), 12) * 15.0;
        const currentRotationSpeed = baseSpeed + burstSpeed;
        jettKnife[0].rotation.y += deltaTime * currentRotationSpeed;

        const hoverBase = Math.sin(elapsedTime * 2.0) * 0.1;
        const hoverSecondary = Math.sin(elapsedTime * 0.73) * 0.08;
        const avarageHover = (hoverBase + hoverSecondary) * 0.09 + 0.09

        // Bıçak aniden hızlanıp dönerken havaya doğru da hafifçe sıçrasın
        const burstLift = Math.pow(Math.sin(elapsedTime * 0.8), 12) * 0.1;
        jettKnife[0].position.y = baseY + avarageHover + burstLift;

        //! FAN BLADES ANIMATION
        const fanRotationSpeed = 1.5;
        bigFanBlades.forEach((blade) => {
            blade.rotation.y -= deltaTime * Math.PI * fanRotationSpeed;
        });
        smallFanBlades.forEach((blade) => {
            blade.rotation.x += deltaTime * Math.PI * fanRotationSpeed;
        });

        //! CHAIR ANIMATION
        if (chair) {
            const chairSpeed = 0.3;
            chair.rotation.y = -Math.sin(elapsedTime * chairSpeed) * (Math.PI / 4); // Hafifçe sağa sola sallanma
        }

    }

    //? Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

//! Resize
window.addEventListener("resize", () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});