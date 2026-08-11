//! Import Three.js basics
import * as THREE from "three";
import { OrbitControls } from "./utils/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
import useGSAP from "gsap";

//! Import Stats.js
import Stats from "three/examples/jsm/libs/stats.module.js";

//! Import Three.js Loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

//! Shaders
//? Holographic Shader
import holographicVertexShader from "./shaders/holographic/vertexShader.glsl";
import holographicFragmentShader from "./shaders/holographic/fragmentShader.glsl";

//? Coffee Smoke Shader
import coffeeSmokeVertexShader from "./shaders/coffeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "./shaders/coffeSmoke/fragment.glsl";

//! Textures
import textures from "./utils/data.js";

/*
 * Fps Stats 
*/
const stats = Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

stats.dom.style.position = 'fixed';
stats.dom.style.top = '50%';
stats.dom.style.left = 'auto'; // Sol bağını kopar
stats.dom.style.right = '0px';

//? GUI
// const gui = new GUI({
//     width: 200,

// });

/**
 ** Loaders
 */
//? Loading Manager
const manager = new THREE.LoadingManager();

//? Texture Loader
const textureLoader = new THREE.TextureLoader(manager);

//? Draco Loader
const dracoLoader = new DRACOLoader(manager);
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
let junkFood2 = [];
let juice2 = [];
let pringles2 = [];
let hologramBall = [];
let pokeball2 = [];
let pokeball1 = [];
let switchConsole = [];
let jettPhoto = [];
let portfolio = [];
let toothlesPhoto = [];
let twitchPhoto = [];
let plant = [];
let pencil = [];
let tinyCuteCat = [];
let bigCuteCat = [];
let rubikCube = [];
let bigFanBlades = [];
let smallFanBlades = [];
let hoverableObjects = [];
let keyboardKeys = [];
let chair = null;

//? Debug GUI
// const gui = new GUI();

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
camera.position.set(-1.6684164356179783, 1.8450633594387291, 2.494341334167269);
scene.add(camera);

//? Setup The Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.zoomSpeed = 0.4;

controls.minPolarAngle = -Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = 0;

controls.minDistance = 1;
controls.maxDistance = 4;

controls.target.set(-0.12779923809391466, 0.6983715139496336, 0.17216488665852941);

//? Coffe Smoke Texture
const coffeTexture = textureLoader.load("./textures/PerlinNoise/perlin.png");
coffeTexture.wrapS = THREE.RepeatWrapping;
coffeTexture.wrapT = THREE.RepeatWrapping;

/*
* Materials  
*/
//? Holographic Material
const hologarphicMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: holographicVertexShader,
    fragmentShader: holographicFragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color("#983e77")),
    },
})

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

//? Default Material 
const material = new THREE.MeshStandardMaterial();

/*
* Animation Functions 
*/
//! Buttons Animations
const themeToggleBtn = document.getElementById('themeToggle');
const toggleHandle = document.getElementById('toggleHandle');
const iconSun = document.getElementById('iconSun'); // Gündüz PNG/SVG'si
const iconMoon = document.getElementById('iconMoon'); // Gece PNG/SVG'si

let isNight = false;
gsap.set(iconMoon, { opacity: 0, scale: 0.5, rotation: -90 });

//! Toggle Animation Function
const playToggleAnimation = () => {
    isNight = !isNight; // Durumu tersine çevir

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "back.out(1.2)" } });

    if (isNight) {
        tl.to(toggleHandle, { x: 68, backgroundColor: "#3b82f6" })
            .to(themeToggleBtn, { backgroundColor: "#1e293b" }, "<")
            .to(iconSun, { opacity: 0, scale: 0.5, rotation: 90, duration: 0.3 }, "<")
            .to(iconMoon, { opacity: 1, scale: 1, rotation: 0, duration: 0.4 }, "<0.1");
    } else {
        tl.to(toggleHandle, { x: 0, backgroundColor: "#E5B8D9" })
            .to(themeToggleBtn, { backgroundColor: "#ff0fff" }, "<")
            .to(iconMoon, { opacity: 0, scale: 0.5, rotation: -90, duration: 0.3 }, "<")
            .to(iconSun, { opacity: 1, scale: 1, rotation: 0, duration: 0.4 }, "<0.1");
    }
};

//! Keyboard Keys Blup Sound (Do it after Loading Page is ready)
const blupSound = new Audio("./Sounds/keyboardblupsound.mp3");

function playBlupSound() {
    const soundClone = blupSound.cloneNode(true);
    soundClone.currentTime = 0; // Reset the sound to the beginning
    soundClone.volume = 0.01;

    soundClone.play().catch((error) => {
        console.error("Error playing blup sound:", error);
    });
    soundClone.addEventListener("ended", () => {
        soundClone.src = null; // Ses kaynağını bellekten sil
        soundClone.remove(); // Objeyi kalıcı olarak yok et
    }, { once: true }); // once: true, bu dinleyicinin sadece bir kez çalışıp kendini yok etmesini sağlar
}

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
            }

        });

        tl.to(key.scale, {
            x: 1,
            y: 1,
            z: 1,
            onStart: () => {
                playBlupSound();
            }
        }).to(key.position,
            {
                y: key.userData.defaultYPosition.y + 0.01,
            });
    });
}

//! Landing Animation
const landingAnimation = () => {
    const t1 = gsap.timeline({
        defaults: {
            ease: "back.inOut(1.8)",
            duration: 0.6,
        },
    });
    t1.delay(.4);
    const t2 = gsap.timeline({
        defaults: {
            ease: "back.inOut(1.8)",
            duration: 0.6,
        },
    });
    t2.delay(.4);

    t1.to(rubikCube[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(junkFood2[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(juice2[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(pringles2[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(hologramBall[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(pokeball2[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(pokeball1[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(jettKnife[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "<").to(jettKnife[0].rotation, {
        y: Math.PI * 4,
        ease: "power1.inOut",
    }, "-=0.4").to(switchConsole[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.60");


    t2.to(bigCuteCat[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(tinyCuteCat[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(pencil[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(plant[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.4").to(twitchPhoto[0].scale, {
        x: 1,
        y: 1,
        z: 1,
    }, "-=0.4").to(toothlesPhoto[0].scale, {
        x: 1,
        y: 1,
        z: 1,
    }, "-=0.45").to(portfolio[0].scale, {
        x: 1,
        y: 1,
        z: 1,
    }, "-=0.45").to(jettPhoto[0].scale, {
        x: 1,
        y: 1,
        z: 1
    }, "-=0.45");
}

/**
 ** Load Model
 */
gltfLoader.load("./models/BakeFileV5.glb", (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const childName = child.name.toLowerCase(); // Convert the name to lowercase for case-insensitive comparison

            /*
            *Single Objects
            */
            if (childName.includes("hologrampokeball")) {
                child.scale.set(0, 0, 0);
                hologramBall.push(child);
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
            else if (childName.includes("coffesmoke")) {
                console.log(child.position.x, child.position.y, child.position.z);
            }

            //? PC Glass
            else if (childName.includes("pcglass")) {
                child.material = pcGlassMaterial;
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
            * Landing Animation Objects
            */
            else if (childName.includes("knife")) {
                child.scale.set(0, 0, 0);
                jettKnife.push(child);
            }
            else if (childName.includes("rubiccube")) {
                child.scale.set(0, 0, 0);
                rubikCube.push(child);
            }
            else if (childName.includes("junkfood2")) {
                child.scale.set(0, 0, 0);
                junkFood2.push(child);
            }
            else if (childName.includes("juice2")) {
                child.scale.set(0, 0, 0);
                juice2.push(child);
            }
            else if (childName.includes("pringles2")) {
                child.scale.set(0, 0, 0);
                pringles2.push(child);
            }
            else if (childName.includes("pokeball2")) {
                child.scale.set(0, 0, 0);
                pokeball2.push(child);
            }
            else if (childName.includes("pokeball1")) {
                child.scale.set(0, 0, 0);
                pokeball1.push(child);
            }
            else if (childName.includes("switchconsole")) {
                child.scale.set(0, 0, 0);
                switchConsole.push(child);
            }
            else if (childName.includes("jettphoto")) {
                child.scale.set(0, 0, 0);
                jettPhoto.push(child);
            }
            else if (childName.includes("portfoliotext")) {
                child.scale.set(0, 0, 0);
                portfolio.push(child);
            }
            else if (childName.includes("toothlesphoto")) {
                child.scale.set(0, 0, 0);
                toothlesPhoto.push(child);
            }
            else if (childName.includes("twitchlogo")) {
                child.scale.set(0, 0, 0);
                twitchPhoto.push(child);
            }
            else if (childName.includes("plant")) {
                child.scale.set(0, 0, 0);
                plant.push(child);
            }
            else if (childName.includes("pencil")) {
                child.scale.set(0, 0, 0);
                pencil.push(child);
            }
            else if (childName.includes("tinycutecat")) {
                child.scale.set(0, 0, 0);
                tinyCuteCat.push(child);
            }
            else if (childName.includes("bigcutecat")) {
                child.scale.set(0, 0, 0);
                bigCuteCat.push(child);
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
            if (childName.includes("raycaster")) {
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


});

//? Knife Click Event
window.addEventListener("click", () => {
    const intersects = raycaster.intersectObjects(jettKnife, false);

    if (intersects.length > 0) {
        const target = intersects[0].object;
        if (target.name.toLowerCase().includes("knife")) {
            //? Knife Click Animation
            gsap.to(target.rotation, {
                ease: "power2.inOut",
                duration: 1.1,
                y: target.rotation.y + Math.PI * 2, // 360 derece döndür
            })
        }
    }

});
themeToggleBtn.addEventListener('click', () => {
    playToggleAnimation();
    scene.traverse((child) => {
        // Sadece 3D modelleri (Mesh) ve materyali olanları filtrele
        if (child.isMesh && child.material) {
            const childName = child.name.toLowerCase();
            // Kendi texture objenin içindeki isimleri dön (bake1, bake2 vb.)
            Object.keys(textures).forEach((key) => {

                // Eğer objenin adı texture adıyla eşleşiyorsa
                if (childName.includes(key)) {

                    // isNight durumuna göre materyalin resmini değiştir
                    if (isNight) {
                        child.material.map = loaderTextures.night[key];
                    } else {
                        child.material.map = loaderTextures.morning[key];
                    }

                    // Ekran kartına (GPU) değişimi bildir
                    child.material.needsUpdate = true;
                }
            });
        }
    });

    hologarphicMaterial.uniforms.uColor.value.set(isNight ? "#0b2089" : "#983e77")

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

    //? Stats Update
    stats.update();

    //? Time
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - prevTime
    prevTime = elapsedTime

    //? Update Shader Uniforms
    hologarphicMaterial.uniforms.uTime.value = elapsedTime;

    //? Raycaster Update
    raycaster.setFromCamera(mouse, camera);
    const allHoverableObjects = [...hoverableObjects, ...jettKnife];
    const intersects = raycaster.intersectObjects(allHoverableObjects, false);

    if (intersects.length > 0) {

        const target = intersects[0].object; // For first object that the raycaster intersects

        if (currentHovered !== target) {
            if (currentHovered) {
                gsap.to(currentHovered.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 0.5,
                    ease: "bounce.out"
                });
            }
            currentHovered = target;

            if (!currentHovered.name.toLowerCase().includes("knife")) {
                gsap.to(currentHovered.scale, {
                    x: 1.3, y: 1.3, z: 1.3,
                    duration: 0.5,
                    ease: "bounce.out"
                });
            }
            canvas.style.cursor = 'pointer';
        }
    }
    else {
        if (currentHovered) {
            gsap.to(currentHovered.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.5,
                ease: "bounce.out"
            });

            currentHovered = null;
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
    //? SmokeMat Utime Update
    // smokeMat.uniforms.uTime.value = elapsedTime;

    //? Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();

//? Loading Manager Events
//? DOM Elements
const loadingText = document.getElementById("loadingText");
const enterButton = document.getElementById("enterButton");
const withoutEnterButton = document.getElementById("withoutEnterButton");
const loadingPage = document.querySelector(".loadingPage");
let isLoaded = false;

//! Loading Page Animation
const tl = gsap.timeline({
    defaults: {
        ease: "power3.inOut",
        duration: 0.25,
    }
});
gsap.set(loadingText, { opacity: 0, scale: 0.5 });
gsap.set(enterButton, { opacity: 0, scale: 0.5 });
gsap.set(withoutEnterButton, { opacity: 0, scale: 0.5 });

tl.to(loadingText, {
    opacity: 1,
    scale: 1,
});

manager.onProgress = (url, loaded, total) => {
    const progress = (loaded / total) * 100;
    loadingText.textContent = `${progress.toFixed(0)}% Loaded`;
}
manager.onLoad = () => {
    document.fonts.ready.then(() => {
        loadingText.textContent = "Loading Complete";

        const tl1 = gsap.timeline({
            defaults: {
                ease: "power3.inOut",
                duration: 0.25,
            }
        });

        tl1.to(enterButton, {
            opacity: 1,
            scale: 1,
        }, "+<0.1").to(withoutEnterButton, {
            opacity: 1,
            scale: 1,
        }, "+<0.2");

        isLoaded = true;

        if (isLoaded) {
            enterButton.addEventListener("click", () => {
                const tl2 = gsap.timeline({
                    defaults: {
                        ease: "power2.inOut",
                        duration: 0.5,
                    }
                });
                tl2.to(enterButton, {
                    opacity: 0,
                    scale: 0,
                }).to(withoutEnterButton, {
                    opacity: 0,
                    scale: 0,
                }, "<").to(loadingText, {
                    opacity: 0,
                    scale: 0,
                }, "<").to(loadingPage, {
                    clipPath: "circle(0% at 50% 50%)",
                    ease: "back.out(1.8)",
                    onComplete: () => {
                        //! Call Animation for Keyboard Keys
                        keyboardKeyAnimation(keyboardKeys);
                        landingAnimation();
                        withoutEnterButton.remove();
                        enterButton.remove();
                        loadingText.remove();
                        loadingPage.remove();
                    }
                });
            });

            withoutEnterButton.addEventListener("click", () => {
                const tl3 = gsap.timeline({
                    defaults: {
                        ease: "power2.inOut",
                        duration: 0.5,
                    }
                });
                tl3.to(enterButton, {
                    opacity: 0,
                    scale: 0,
                }).to(withoutEnterButton, {
                    opacity: 0,
                    scale: 0,
                }, "<").to(loadingText, {
                    opacity: 0,
                    scale: 0,
                }, "<").to(loadingPage, {
                    clipPath: "circle(0% at 50% 50%)",
                    ease: "power1.inOut",
                    onComplete: () => {
                        //! Call Animation for Keyboard Keys
                        keyboardKeyAnimation(keyboardKeys);
                        landingAnimation();
                        withoutEnterButton.remove();
                        enterButton.remove();
                        loadingText.remove();
                        loadingPage.remove();
                    }
                });
            });
        }
    })
};

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