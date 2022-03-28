precision lowp float;

uniform vec3 uEyePosition;
uniform float uOrthographic;

varying vec3 vPosition;uniform int uLightType;
uniform float uLightDirection; // 1 or -1

float sampleSkyboxMonochrome(const vec3 direction) {
    float z = uLightDirection * direction.z;

    float value;
    if (uLightType == 1) { // rings
        value = 0.8 * (1.0 + step(0.6, z));
    } else { // noise
        float monoX = 0.4 + 0.6 * abs(cos(6.0 * (direction.x + 0.1)));
        float monoY = 0.5 * cos(7.0 * (direction.y + 0.5 * direction.x + 0.1));
        float monoZ = 0.5 * cos(5.0 * (z + 0.3));
        float pureMono = monoX + monoY + monoZ;

        value = mix(0.7, pureMono, smoothstep(-1.0, 0.2, z)); // darker below
        value = 1.2 * clamp(value, 0.7, 1.5);
    }

    float headShadow = max(0.2, step(z, 0.98));
    return headShadow * value;
}

vec3 sampleSkybox(const vec3 direction) {
    if (uLightType == 0) { // ASET
        float z = uLightDirection * direction.z;
        return vec3(
            step(0.70, z) * step(z, 0.98),
            step(0.0, z) * step(z, 0.70),
            step(0.98, z)
        );
    } else {
        return vec3(sampleSkyboxMonochrome(direction));
    }
}
void main(void) {
    vec3 fromEyeNormalized = normalize(mix(vPosition - uEyePosition, -uEyePosition, uOrthographic));
    vec3 skybox = sampleSkybox(fromEyeNormalized);
    gl_FragColor = vec4(skybox, 0.1) ;
}
