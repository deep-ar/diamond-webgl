#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 uEyePosition;

varying vec3 vPosition; // in [-0.5,+0.5]^3

#define MAX 0.49

#INJECT(FACETS_DEFINITION)

void computeIntersectionWithPlane(const vec3 planePoint, const vec3 planeNormal, const vec3 startingPoint, const vec3 startingDirection, inout float currentTheta, inout vec3 currentNormal) {
    float b = dot(startingDirection, planeNormal);
    if (b < 0.0) {
        float theta = dot(planePoint - startingPoint, planeNormal) / b;

        if (theta > 0.0 && currentTheta < theta) {
            vec3 finalPosition = startingPoint + theta * startingDirection;
            if (abs(finalPosition.x) < MAX && abs(finalPosition.y) < MAX && abs(finalPosition.z) < MAX) {
                currentTheta = theta;
                currentNormal = planeNormal;
            }
        }
    }
}

bool isInside(const vec3 planePoint, const vec3 planeNormal, const vec3 position) {
    return dot(planePoint - position, planeNormal) >= -0.00001;
}

void computeEntryPoint(const vec3 eyePosition, const vec3 fromEyeNormalized, out vec3 entryPoint, out vec3 facetNormal) {
    float theta = -1.0;

    #INJECT(COMPUTE_ENTRY_POINT)

    if (theta < 0.0) {
        discard;
    }

    entryPoint = uEyePosition + theta * fromEyeNormalized;
    if (!(#INJECT(CHECK_IF_INSIDE))) {
        discard;
    }
}

void main(void) {
    if (abs(vPosition.x) >= MAX && abs(vPosition.y) >= MAX && abs(vPosition.z) >= MAX) {
        gl_FragColor = vec4(vec3(1, 0, 0), 1);
        return;
    }

    vec3 fromEyeNormalized = normalize(vPosition - uEyePosition);

    vec3 entryPoint;
    vec3 entryFacetNormal;
    computeEntryPoint(uEyePosition, fromEyeNormalized, entryPoint, entryFacetNormal);

    vec3 normalAsColor = vec3(0.5 + 0.5 * entryFacetNormal);
    gl_FragColor = vec4(normalAsColor, 1);
}