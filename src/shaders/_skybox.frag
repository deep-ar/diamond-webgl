uniform float uASETSkybox;
uniform float uLightDirection; // 1 or -1

float sampleSkyboxMonochrome(const vec3 direction) {
    float z = uLightDirection * direction.z;
    return 0.8 * step(z, 0.975) * (1.0 + step(0.6, z));
}

vec3 sampleSkybox(const vec3 direction) {
    vec3 skybox = vec3(sampleSkyboxMonochrome(direction));

    float z = uLightDirection * direction.z;
    vec3 asetSkybox = vec3(
        step(0.70, z) * step(z, 0.98),
        step(0.0, z) * step(z, 0.70),
        step(0.98, z)
    );

    return mix(skybox, asetSkybox, uASETSkybox);
}