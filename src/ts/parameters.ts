import "./page-interface-generated";

/* === IDs ============================================================ */
const controlId = {
    REFRACTION_RANGE_ID: "refraction-range-id",
    GEM_COLOR_PICKER: "gem-color-picker-id",
    GEM_ABSOPTION_RANGE_ID: "absorption-range-id",
    RAY_DEPTH_RANGE_ID: "ray-depth-range-id",
    REFLECTION: "reflection-checkbox-id",
    BACKGROUND_COLOR_PICKER: "background-color-picker-id",
    DISPLAY_INDICATORS: "display-indicators-checkbox-id",
    RAYTRACED_VOLUME: "raytraced-volume-checkbox-id",
    DISPLAY_NORMALS: "display-normals-checkbox-id",
};

type Observer = () => unknown;

const recomputeShaderObservers: Observer[] = [];
function callRecomputeShaderObservers(): void {
    for (const observer of recomputeShaderObservers) {
        observer();
    }
}
Page.Range.addLazyObserver(controlId.RAY_DEPTH_RANGE_ID, callRecomputeShaderObservers);

function updateIndicatorsVisibility(): void {
    const visible = Page.Checkbox.isChecked(controlId.DISPLAY_INDICATORS);
    Page.Canvas.setIndicatorsVisibility(visible);
}
updateIndicatorsVisibility();
Page.Checkbox.addObserver(controlId.DISPLAY_INDICATORS, updateIndicatorsVisibility);

interface IRGB {
    r: number;
    g: number;
    b: number;
}

const backgroundColorChangeObservers: Observer[] = [];
const backgroundColor: IRGB = { r: 0, g: 0, b: 0 };
function updateBackgroundColor(): void {
    const rgb = Page.ColorPicker.getValue(controlId.BACKGROUND_COLOR_PICKER);
    backgroundColor.r = rgb.r;
    backgroundColor.g = rgb.g;
    backgroundColor.b = rgb.b;

    for (const observer of backgroundColorChangeObservers) {
        observer();
    }
}
Page.ColorPicker.addObserver(controlId.BACKGROUND_COLOR_PICKER, updateBackgroundColor);
updateBackgroundColor();

const gemColor: IRGB = { r: 0, g: 0, b: 0 };
function updateGemColor(): void {
    const rgb = Page.ColorPicker.getValue(controlId.GEM_COLOR_PICKER);
    gemColor.r = rgb.r;
    gemColor.g = rgb.g;
    gemColor.b = rgb.b;
}
Page.ColorPicker.addObserver(controlId.GEM_COLOR_PICKER, updateGemColor);
updateGemColor();

abstract class Parameters {
    public static get refractionIndex(): number {
        return Page.Range.getValue(controlId.REFRACTION_RANGE_ID);
    }

    public static get backgroundColor(): IRGB {
        return backgroundColor;
    }

    public static get gemColor(): IRGB {
        return gemColor;
    }

    public static get absorption(): number {
        return Page.Range.getValue(controlId.GEM_ABSOPTION_RANGE_ID);
    }

    public static get rayDepth(): number {
        return Math.ceil(Page.Range.getValue(controlId.RAY_DEPTH_RANGE_ID));
    }

    public static get displayReflection(): boolean {
        return Page.Checkbox.isChecked(controlId.REFLECTION);
    }

    public static get displayRaytracedVolume(): boolean {
        return Page.Checkbox.isChecked(controlId.RAYTRACED_VOLUME);
    }

    public static get displayNormals(): boolean {
        return Page.Checkbox.isChecked(controlId.DISPLAY_NORMALS);
    }

    public static addBackgroundColorObserver(observer: Observer): void {
        backgroundColorChangeObservers.push(observer);
    }

    public static addRecomputeShaderObservers(observer: Observer): void {
        recomputeShaderObservers.push(observer);
    }
}

export {
    Parameters,
};
