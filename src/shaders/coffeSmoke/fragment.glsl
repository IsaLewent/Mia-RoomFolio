uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;

void main() {

    // Scale and Animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5; 
    smokeUv.y *= 0.33;
    smokeUv.y -=(uTime * 0.08);
    
    // Smoke
    float smoke = texture2D(uTexture, smokeUv).r;
    
    // Remap 
    smoke = smoothstep(0.5, 1.0, smoke);
    
    // Edges 
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.6, vUv.y);
    

    // Final Color
    gl_FragColor = vec4(0.8,0.25,0.1, smoke);
    // gl_FragColor = vec4(1.0,0,0, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}