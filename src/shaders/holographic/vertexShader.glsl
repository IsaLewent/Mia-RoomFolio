#include "./Random2D/random2D.glsl"

varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;

void main() {
    //? Model Position 
    vec4 modelPosiiton = modelMatrix * vec4(position, 1.0);

    float glitchTime =  (uTime - modelPosiiton.y * 20.0);
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.450);
    glitchStrength /= 3.0; 
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.095;

    modelPosiiton.x += (random((modelPosiiton.xz + uTime)) - 0.5) * glitchStrength; 
    modelPosiiton.z += (random((modelPosiiton.xz + uTime)) - 0.5) * glitchStrength; 

    //? Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosiiton;

    vPosition = modelPosiiton.xyz;

    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    vNormal = modelNormal.xyz;
}
