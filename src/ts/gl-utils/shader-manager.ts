import { gl } from "./gl-canvas";
import { Shader } from "./shader";

type RegisterCallback = (success: boolean, shader: Shader | null) => void;

interface IShaderInfos {
    fragmentSource: string;
    vertexSource: string;
    injected: { [id: string]: string };
}

interface ICachedShader {
    shader: Shader | null;
    infos: IShaderInfos;
    failed: boolean;
    callbacks: RegisterCallback[];
}

const cachedShaders: { [id: string]: ICachedShader } = {};

function getShader(name: string): Shader | null {
    return cachedShaders[name].shader;
}

function buildShader(infos: IShaderInfos): Shader {
    function processSource(source: string): string {
        return source.replace(/#INJECT\(([^)]*)\)/mg, (match: string, name: string) => {
            if (infos.injected[name]) {
                return infos.injected[name];
            }
            return match;
        });
    }

    const processedVert = processSource(infos.vertexSource);
    const processedFrag = processSource(infos.fragmentSource);
    return new Shader(gl, processedVert, processedFrag);
}

function deleteShader(name: string): void {
    if (typeof cachedShaders[name] !== "undefined") {
        const shader = cachedShaders[name].shader;
        if (shader !== null) {
            shader.freeGLResources();
        }
        delete cachedShaders[name];
    }
}

export {
    buildShader,
    getShader,
    IShaderInfos,
    deleteShader,
};
