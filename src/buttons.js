import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

const text1 = document.getElementById("hiSection1");
const text2 = document.getElementById("hiSection2");
const text3 = document.getElementById("hiSection3");
const text4 = document.getElementById("hiSection4");

const text1Split = new SplitText(text1, { type: "chars" });
const text2Split = new SplitText(text2, { type: "chars" });
const text3Split = new SplitText(text3, { type: "chars" });
const text4Split = new SplitText(text4, { type: "chars" });

const textTimeline = gsap.timeline({
    defaults: {
        ease: "back.out(1.5)",
    }
});

textTimeline.set(".hi-section", { autoAlpha: 1 });

textTimeline.from(text1Split.chars, {
    y: -40,
    autoAlpha: 0,
    scale: 0,
    duration: 0.5,
    stagger: {
        each: 0.05,
        from: "start"
    }
}).to(text1Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "end" // Rastgele sırayla düşsünler
    }
}, "+=0.7").from(text2Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "start" // Rastgele sırayla düşsünler
    }
}).to(text2Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "end" // Rastgele sırayla düşsünler
    }
}, "+=0.7").from(text3Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "start" // Rastgele sırayla düşsünler
    }
}).to(text3Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "end" // Rastgele sırayla düşsünler
    }
}, "+=0.7").from(text4Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "start" // Rastgele sırayla düşsünler
    }
}).to(text4Split.chars, {
    y: -40,
    opacity: 0,
    scale: 0,
    duration: 0.5, // Her bir harfin kendi düşme süresi
    stagger: {
        each: 0.05, // Harfler arasındaki gecikme (0.05 saniye çok ideal ve tatlı bir histir)
        from: "end" // Rastgele sırayla düşsünler
    }
}, "+=0.7");