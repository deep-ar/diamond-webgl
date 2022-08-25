import { Shader } from "./gl-utils/shader";
import * as ShaderManager from "./gl-utils/shader-manager";

import "./page-interface-generated";


let shaderIndex = 0;

class LazyShader {
    private readonly fragmentShaderSource: string;
    private readonly vertexShaderSource: string;

    private readonly errorKey: string;
    private readonly errorMessage: string;

    private _shader: Shader | null = null;

    private injected: Record<string, string>;

    public constructor(fragmentShaderSource: string, vertexShaderSource: string, name: string) {
        this.fragmentShaderSource = fragmentShaderSource;
        this.vertexShaderSource = vertexShaderSource;
        this.errorKey = `shader_fail_${shaderIndex++}`;
        this.errorMessage = `Failed to build the shader '${name}'.`;
        this.injected = {};
    }

    public get shader(): Shader | null {
        if (!this._shader) {
            this.build();
        }

        return this._shader;
    }

    public reset(newInjected: Record<string, string>): void {
        this.injected = newInjected;

        if (this._shader) {
            this._shader.freeGLResources();
            this._shader = null;
        }
    }

    private build(): void {
        const builtShader = ShaderManager.buildShader({
            fragmentSource: this.fragmentShaderSource,
            vertexSource: this.vertexShaderSource,
            injected: this.injected,
        });

        if (builtShader !== null) {
            this._shader = builtShader;
        } else {
            Page.Demopage.setErrorMessage(this.errorKey, this.errorMessage);
        }
    }
}

export {
    LazyShader,
};
