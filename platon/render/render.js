import {
  prim,
  primDraw,
  vert,
  VertToArray,
  arrayVert,
  PrimLoad,
} from "./prim.js";
import { vec3, mat4, camera, MatrIdentity, MatrMulMatr } from "./mth/mth.js";
export { vec3 };

async function loadShaderAsync(shaderName) {
  try {
    const response = await fetch(shaderName);
    const text = await response.text();
    return text;
  } catch (err) {
    console.log(err);
  }
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log(buf);
  }
  return shader;
}

export function initGL() {
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.5, 0.0, 0.5, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let dataBuf = [
    0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0,
    1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, -1, 0, 0,
    1, 1, 1, 0, 1, 1, 1, -1, 0, 0, 1, 1, 0, 1, 0, 0, 1, -1, 0, 0, 1, 0, 0, 0, 1,
    0, 1, -1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0.5, 1, 0.3, 0, 1,
    0, 0, 1, 0, 1, 1, 0.4, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0.5, 0.4, 0, 1, 0, 0, 0,
    0, 1, 0, 0, 1, 0, -1, 0, 0, 0, 1, 1, 0, 0, 1, 0, -1, 0, 0, 1, 1, 1, 0, 1, 1,
    0, -1, 0, 0, 1, 0, 1, 0, 0, 1, 0, -1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1,
    0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, -1, 1, 0,
    0, 1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 0, -1,
  ];
  let ind = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ];

  const vs = loadShaderAsync("./render/vert.vert");
  const fs = loadShaderAsync("./render/frag.frag");

  Promise.all([vs, fs]).then((res) => {
    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, res[0]);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, res[1]);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexSh);
    gl.attachShader(shaderProgram, fragmentSh);
    gl.linkProgram(shaderProgram);

    const vBuf = gl.createBuffer();

    //let prim1 = prim(gl, gl.TRIANGLE_STRIP, dataBuf, 24, ind, shaderProgram);
    let cam1 = camera();

    //  const dataBuf = [-1, -1, 0, 1, 1, 1, 0, 1,
    //                   -1, 1, 0, 1,  0, 1, 1, 1,
    //                     Math.sqrt(3) / 2, 0, 0, 1, 1, 0, 1, 1];

    let prim2 = prim(gl, gl.TRIANGLES, dataBuf, 24, ind, shaderProgram);
    PrimLoad(prim2, "./render/cow.obj").then((res) => {
      prim2 = res;

      const render = () => {
        //    gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
        //    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataBuf), gl.STATIC_DRAW);

        //    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 8 * 4, 0);
        //    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 8 * 4, 4 * 4);

        //    gl.enableVertexAttribArray(0);
        //    gl.enableVertexAttribArray(1);

        //    gl.useProgram(shaderProgram);

        //    gl.drawArrays(gl.TRIANGLE_STRIP, 0, dataBuf.length / 8);]
        //console.log(prim1);
        gl.enable(gl.DEPTH_TEST);
        // primDraw(
        //  prim1,
        //  cam1,
        //  mat4().setRotate(Math.sin(Date.now() / 1000.0), vec3(1, 2, 3))
        // );
        primDraw(
          prim2,
          cam1,
          MatrMulMatr(
            mat4().setRotate(Math.sin(Date.now() / 787.0), vec3(2, 4, 3)),
            mat4().MatrScale([0.1, 0.1, 0.1])
          )
        );

        window.requestAnimationFrame(render);
      };

      render();
    });
  });
}
