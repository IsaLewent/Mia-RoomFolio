<div align="center">

# 🌸 Mia-RoomFolio 🎮
**A Cozy, Interactive 3D Web Portfolio**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Blender](https://img.shields.io/badge/blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white)

</div>

## 📌 About The Project

Mia-RoomFolio is more than just a standard web resume. It is an **interactive 3D room (Isometric WebGL Experience)** that reflects my developer identity, my passion for the gaming world, and my design sense. 

Users can navigate inside this room, control the Day/Night cycle, and experience the fusion of 90s Arcade aesthetics with modern Neo-Brutalism UI. The project aims to create a "cozy" atmosphere with gently playing Lofi background music and sound designs that give the tactile feel of physical arcade buttons.

### 📸 Room Gallery

| ☀️ Morning Vibe | 🌙 Night Vibe |
| :---: | :---: |
| <img src="SecondMorningView.png" alt="Morning View" width="400"/> | <img src="SecondNightView.png" alt="Night View" width="400"/> |
| <img src="Ekran görüntüsü 2026-08-16 094020.png" alt="UI Morning" width="400"/> | <img src="Ekran görüntüsü 2026-08-16 094027.png" alt="UI Night" width="400"/> |

---

## 🛠️ How It's Built (Technical Architecture)

This project is not only a visual feast but also the product of a rigorous web performance and 3D optimization process:

### 1. 3D Modeling & Texturing (Blender)
* All objects in the room (plushies, PC case, neon lights) were modeled as low-poly assets using Blender.
* To maximize web performance, **Texture Baking** was utilized instead of calculating real-time lighting in the browser. Lights, shadows, and base colors were baked directly into the materials.
* *Pro Detail:* For maximum realism and render quality, distinct materials such as coffee foam and mug elements were baked separately rather than being combined prematurely.

### 2. WebGL & Scene Setup (Three.js)
* The baked GLTF/GLB models were integrated into the browser using **Three.js**.
* Using **OrbitControls**, camera rotation and zoom angles were strictly constrained to prevent users from clipping out of the room or getting lost in the 3D space.
* **Mobile Optimization:** To prevent overheating and frame drops on mobile devices, the `window.devicePixelRatio` was capped based on hardware capabilities. The room model is dynamically scaled based on screen size (using `dvh` units) to prevent overflow.

### 3. UI & Animation Engineering (CSS & GSAP)
* **Neo-Brutalism UI:** The menus and info cards feature sharp drop shadows (zero blur), thick dark borders, and high-contrast colors (Neon Pink and Arcade Yellow) to echo retro gaming UI.
* **Flawless Flow with GSAP:** All UI entrance and exit animations are orchestrated using GSAP Timelines.
* **FOUC Prevention:** The notorious "Flash of Unstyled Content" issue during page loads was eradicated by hiding elements initially with CSS and introducing them seamlessly with GSAP's `autoAlpha`.
* **SplitText Animations:** Contact section text is dynamically split and animated letter-by-letter with GSAP SplitText, creating a smooth, cascading stagger effect.

### 4. Audio Engineering
* Interactive "hover" and "click" sound effects were added to strengthen the arcade menu immersion.
* **Polyphony:** To ensure sounds do not interrupt each other when a user rapidly swipes over multiple buttons, a dynamic audio cloning architecture (`cloneNode`) was implemented. These audio instances are garbage-collected immediately after playback to prevent memory leaks.
* The relaxing background music (Lofi BGM) is synchronized with a GSAP `delayedCall` to fade in gently 2 seconds after the scene loads, ensuring a smooth UX without startling the user.

---

## 🚀 Features
* **Day/Night Transition:** A seamless toggle that smoothly transitions both the 3D scene lighting and the 2D UI theme.
* **Bulletproof Responsiveness:** Dynamic camera scaling for phone and tablet screens, coupled with a clean "Touch" experience stripped of default mobile browser tap-highlight artifacts.
* **Interactive Modals:** Retro-styled "About" and "Contact" modals that freeze the 3D scene controls upon opening, featuring fun Easter eggs about gaming habits (Stardew Valley, Subnautica, and Valorant).

---

## 💻 Installation & Local Development

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/YourUsername/Mia-RoomFolio.git](https://github.com/YourUsername/Mia-RoomFolio.git)