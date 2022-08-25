/// <reference types="../types"/>

import PostProcessingBlurFrag from "../../shaders/post-processing/blur.frag";
import PostProcessingCompositingFrag from "../../shaders/post-processing/compositing.frag";
import PostProcessingDownsizingFrag from "../../shaders/post-processing/downsizing.frag";
import PostProcessingFullscreenVert from "../../shaders/post-processing/fullscreen.vert";

import NormalsFrag from "../../shaders/normals.frag";
import RaytracedVolumeFrag from "../../shaders/raytracedVolume.frag";
import RaytracedVolumeVert from "../../shaders/raytracedVolume.vert";
import ShaderRawFrag from "../../shaders/shader.frag";
import ShaderVert from "../../shaders/shader.vert";
import ShaderMulticolorRawFrag from "../../shaders/shader-multicolor.frag";
import SkyboxRawFrag from "../../shaders/skybox.frag";
import SkyboxVert from "../../shaders/skybox.vert";
import SkyboxPartialFrag from "../../shaders/_skybox.frag";

const skyboxFrag = SkyboxRawFrag.replace("#include \"_skybox.frag\"", SkyboxPartialFrag);
const shaderFrag = ShaderRawFrag.replace("#include \"_skybox.frag\"", SkyboxPartialFrag);
const shaderMulticolorFrag = ShaderMulticolorRawFrag.replace("#include \"_skybox.frag\"", SkyboxPartialFrag);

export {
    PostProcessingBlurFrag,
    PostProcessingCompositingFrag,
    PostProcessingDownsizingFrag,
    PostProcessingFullscreenVert,

    NormalsFrag,
    RaytracedVolumeFrag,
    RaytracedVolumeVert,
    shaderMulticolorFrag as ShaderMulticolorFrag,
    shaderFrag as ShaderFrag,
    ShaderVert,

    skyboxFrag as SkyboxFrag,
    SkyboxVert,
};

