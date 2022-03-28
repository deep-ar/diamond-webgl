precision lowp float;

uniform vec3 uEyePosition;
uniform float uOrthographic;

varying vec3 vPosition;

#include "_skybox.frag"

void main(void) {
    vec3 fromEyeNormalized = normalize(mix(vPosition - uEyePosition, -uEyePosition, uOrthographic));
    vec3 skybox = sampleSkybox(fromEyeNormalized);
    gl_FragColor = vec4(skybox, 0.1) ;
}
