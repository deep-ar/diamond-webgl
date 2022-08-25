/// <reference types="./types"/>

import BrilliantCut from "../models/brilliant_cut.obj";
import BrilliantCutTriangle from "../models/brilliant_cut_triangle.obj";
import Cube from "../models/cube.obj";
import OvalCut from "../models/oval_cut.obj";
import Pc40044 from "../models/pc40044.obj";
import Princess from "../models/princess.obj";
import Sphere from "../models/sphere.obj";
import StepCut from "../models/step_cut.obj";

const cuts: Record<string, string> = {
    "brilliant_cut.obj": BrilliantCut,
    "brilliant_cut_triangle.obj": BrilliantCutTriangle,
    "cube.obj": Cube,
    "oval_cut.obj": OvalCut,
    "pc40044.obj": Pc40044,
    "princess.obj": Princess,
    "sphere.obj": Sphere,
    "step_cut.obj": StepCut,
};

export {
     cuts as Cuts,
};

