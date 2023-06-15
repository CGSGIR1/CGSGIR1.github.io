import {
  prim,
  primDraw,
  vert,
  VertToArray,
  arrayVert,
  PrimLoad,
} from "./prim.js";
import { vec3, mat4, camera, MatrIdentity, MatrMulMatr } from "./mth/mth.js";

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
let tetraf = false;
let cubef = false;
let octaf = false;
let icosf = false;
let dodef = false;

function fun1() {
  var chbox;
  chbox = document.getElementById("Tetrahedron");
  if (chbox.checked) {
    tetraf = true;
  } else {
    tetraf = false;
  }
}
function fun2() {
  var chbox;
  chbox = document.getElementById("Cube");
  if (chbox.checked) {
    cubef = true;
  } else {
    cubef = false;
  }
}
function fun3() {
  var chbox;
  chbox = document.getElementById("Octahedron");
  if (chbox.checked) {
    octaf = true;
  } else {
    octaf = false;
  }
}
function fun4() {
  var chbox;
  chbox = document.getElementById("Icosahedron");
  if (chbox.checked) {
    icosf = true;
  } else {
    icosf = false;
  }
}
function fun5() {
  var chbox;
  chbox = document.getElementById("Dodecahedron");
  if (chbox.checked) {
    dodef = true;
  } else {
    dodef = false;
  }
}

function normalas(V, Ibuf) {
  let Vbuf = arrayVert(true, V);
  for (let i = 0; i < Ibuf.length; i += 3) {
    let p0 = vec3(Vbuf[Ibuf[i]].pos);
    let p1 = vec3(Vbuf[Ibuf[i + 1]].pos);
    let p2 = vec3(Vbuf[Ibuf[i + 2]].pos);
    let N = p1.sub(p0).cross(p2.sub(p0)).normalize();
    //console.log(p0, p1, p2);

    Vbuf[Ibuf[i]].normal = vec3(Vbuf[Ibuf[i]].normal).add(N).toArray();
    //console.log(N);
    Vbuf[Ibuf[i + 1]].normal = vec3(Vbuf[Ibuf[i + 1]].normal)
      .add(N)
      .toArray();
    Vbuf[Ibuf[i + 2]].normal = vec3(Vbuf[Ibuf[i + 2]].normal)
      .add(N)
      .toArray();
  }
  for (let i = 0; i < Vbuf.length; i++) {
    Vbuf[i].normal = vec3(Vbuf[i].normal).normalize().toArray();
  }
  return VertToArray(Vbuf);
}

export function initGL() {
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.5, 0.0, 0.5, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  /*let dataBuf = [
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
  ];*/
  let dataBuf0 = [
    -1, -1, 1, 0, 1, 0, 1, 1, -1, -1, -1, 1, 1, 1, 0, 0, 1, 1, -1, -1, 1, 1, 1,
    0, 0, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, 0, 1, 1, -1, -1, 1, -1, 1, 1, 0, 1,
    1, -1, -1, -1, 1, 1, 1, 0, 1, 1, 1, -1, -1, -1, 1, 1, -1, 1, 0, 1, 1, -1,
    -1, -1, 1, -1, -1, 1, 1, 0, 1, -1, -1, -1, 1, -1, -1, 1, 0, 1, 1, -1, 1, -1,
    -1, -1, -1, 0, 0, 1, -1, -1, 1, -1, -1, 1, -1, 1, 1, 0, 1, -1, 1, -1, 1, 1,
    -1, 1, 0, 1, 1, -1, 1, -1, -1, -1, -1, 1, 0, 1, 1, -1, -1, -1, -1, -1, 1, 0,
    0, 1, 1, -1, -1, -1, -1, 1, 1, 1, 0, 1, 1, -1, -1, -1, -1, 1, -1, 1, 0, 1,
    1, -1, -1, -1, -1, 1, 1, 0, 1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1, 1, 1, -1,
    -1, 1, 1, 1, -1, 1, 0, 0, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1,
    -1, 1, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1, 0, 1, 0, 1, -1, -1, -1, 1, -1,
    -1, 1, 1, 1, 1, -1, -1, -1, 1, -1, 1, 1, 0, 1, 1, -1, -1, -1,
  ];

  let ind0 = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ];

  let dataBuf = [
    1, 2, 1, 1, 0, 0, 1, 1, 2, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 0, 2, 1, 0, 0, 1, 0, 1, 2, 1, 0, 2, 1, 2, 1, 0, 0, 1, 2, 1, 2,
    1, 0, 1, 0, 1, 0, 1, 1, 0, 1,
  ];

  let ind = [
    0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 1, 4, 1, 4, 5, 3, 4, 5, 2, 3, 5, 1, 2, 5,
  ];

  let dataBuf1 = [
    1, 2, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 0, 0, 1, 0,
    1, 1, 2, 0, 0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 2,
  ];

  let ind1 = [0, 1, 2, 0, 2, 3, 0, 1, 3, 1, 2, 3];

  let dataBuf2 = [
    0, -1, 0, 0, 1, 0, 1, 1, 0, 0, -0.276, -0.447, -0.851, 1, 0, 0, 1, 1, 0, 0,
    0.724, -0.447, -0.526, 1, 1, 0, 1, 1, 0, 0, 0.724, -0.447, 0.526, 1, 0, 0,
    1, -1, 0, 0, -0.276, -0.447, 0.851, 0, 1, 0, 1, -1, 0, 0, -0.894, -0.447, 0,
    1, 1, 0.4, 1, 0, 1, 0, -0.724, 0.447, 0.526, 1, 1, 0.5, 0.4, 0, 1, 0,
    -0.724, 0.447, -0.526, 0, 0, 1, 1, 1, 0, 0, 0.276, 0.447, -0.851, 1, 0, 1,
    1, -1, 0, 0, 0.894, 0.447, 0, 0, 1, 1, 1, -1, 0, 0, 0.276, 0.447, 0.851, 1,
    0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0.5, 1, 0.3, 0, 1, 0,
  ];

  let ind2 = [
    0, 1, 2, 0, 1, 5, 0, 4, 5, 0, 3, 4, 0, 2, 3, 6, 10, 11, 6, 7, 11, 7, 8, 11,
    8, 9, 11, 9, 10, 11, 2, 3, 9, 1, 2, 8, 1, 5, 7, 4, 5, 6, 3, 4, 10, 4, 6, 10,
    5, 6, 7, 1, 7, 8, 2, 8, 9, 3, 9, 10,
  ];

  let dataBuf3 = [
    0.149, -0.631, -0.459, 0, 1, 0, 1, 1, 0, 0, -0.39, -0.631, -0.284, 1, 0, 0,
    1, 1, 0, 0, -0.39, -0.631, 0.284, 1, 1, 0, 1, 1, 0, 0, 0.149, -0.631, 0.459,
    1, 0, 0, 1, -1, 0, 0, 0.483, -0.631, 0, 0, 1, 0, 1, -1, 0, 0, -0.149, 0.631,
    0.459, 1, 1, 0.4, 1, 0, 1, 0, -0.483, 0.631, 0, 1, 1, 0.5, 0.4, 0, 1, 0,
    -0.149, 0.631, -0.459, 0, 0, 1, 1, 0, 1, 0, 0.39, 0.631, -0.284, 1, 1, 0, 1,
    0, 1, 0, 0.39, 0.631, 0.284, 1, 0, 1, 1, 0, 1, 0, 0.781, -0.149, 0, 1, 1, 0,
    1, 0, 1, 0, 0.241, -0.149, -0.743, 1, 0, 1, 1, 0, 1, 0, -0.631, -0.149,
    -0.459, 0, 1, 0, 1, 0, 1, 0, -0.631, -0.149, 0.459, 1, 1, 0, 1, 0, 1, 0,
    0.241, -0.149, 0.743, 1, 0, 1, 1, 0, 1, 0, -0.241, 0.149, 0.743, 1, 1, 0, 1,
    0, 1, 0, -0.781, 0.149, 0, 0, 1, 1, 1, 0, 1, 0, -0.241, 0.149, -0.743, 1, 0,
    1, 1, 0, 1, 0, 0.631, 0.149, -0.459, 0, 1, 1, 1, 0, 1, 0, 0.631, 0.149,
    0.459, 0, 0, 1, 1, 0, 1, 0,
  ];

  let ind3 = [
    0, 1, 2, 0, 2, 3, 0, 3, 4, 5, 6, 7, 5, 7, 9, 7, 8, 9, 5, 9, 15, 9, 14, 15,
    9, 14, 19, 2, 13, 15, 2, 3, 15, 3, 14, 15, 5, 6, 15, 6, 15, 16, 13, 15, 16,
    3, 4, 14, 4, 14, 19, 4, 10, 19, 1, 2, 13, 1, 12, 13, 12, 13, 16, 7, 8, 17,
    8, 11, 17, 8, 11, 18, 10, 11, 18, 4, 10, 11, 0, 4, 11, 8, 9, 19, 8, 18, 19,
    10, 18, 19, 0, 1, 11, 1, 11, 17, 1, 12, 17, 12, 16, 17, 6, 16, 17, 6, 7, 17,
  ];
  //dataBuf = normalas(dataBuf, ind);
  //dataBuf1 = normalas(dataBuf1, ind1);
  //dataBuf2 = normalas(dataBuf2, ind2);
  dataBuf3 = normalas(dataBuf3, ind3);
  //dataBuf0 = normalas(dataBuf0, ind0);

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

    let cube = prim(gl, gl.TRIANGLES, dataBuf0, 24, ind0, shaderProgram);
    let cam1 = camera();

    //  const dataBuf = [-1, -1, 0, 1, 1, 1, 0, 1,
    //                   -1, 1, 0, 1,  0, 1, 1, 1,
    //                     Math.Math.sqrt(3) / 2, 0, 0, 1, 1, 0, 1, 1];

    let tetra = prim(gl, gl.TRIANGLES, dataBuf, 24, ind, shaderProgram);
    let octa = prim(gl, gl.TRIANGLES, dataBuf1, 24, ind1, shaderProgram);
    let icos = prim(gl, gl.TRIANGLES, dataBuf2, 24, ind2, shaderProgram);
    let dode = prim(gl, gl.TRIANGLES, dataBuf3, 24, ind3, shaderProgram);
    let pust = prim(gl, gl.POINTS, dataBuf, 24, ind, shaderProgram);

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

      primDraw(pust, cam1, MatrIdentity());
      if (cubef === true) {
        primDraw(
          cube,
          cam1,
          MatrMulMatr(
            MatrMulMatr(
              mat4().MatrTranslate(vec3(-1, 1, 0.5)),
              mat4().setRotate(Math.sin(Date.now() / 2373.0), vec3(1, 1, 1))
            ),
            mat4().MatrScale(vec3(0.5, 0.5, 0.5))
          )
        );
      }
      if (tetraf === true) {
        primDraw(
          tetra,
          cam1,
          mat4().setRotate(Math.sin(Date.now() / 787.0), vec3(2, 4, 3))
        );
      }
      if (octaf === true) {
        primDraw(
          octa,
          cam1,
          MatrMulMatr(
            mat4().MatrTranslate(vec3(1, 2, 1)),
            mat4().setRotate(Math.sin(Date.now() / 1123.0), vec3(2, 2, 3))
          )
        );
      }
      if (icosf === true) {
        primDraw(
          icos,
          cam1,
          MatrMulMatr(
            mat4().MatrTranslate(vec3(1, 0.5, 4)),
            mat4().setRotate(Math.sin(Date.now() / 1467.0), vec3(0.5, 1, 1))
          )
        );
      }
      if (dodef === true) {
        primDraw(
          dode,
          cam1,
          MatrMulMatr(
            mat4().MatrTranslate(vec3(1, 0.5, 4)),
            mat4().setRotate(Math.sin(Date.now() / 1783.0), vec3(0.5, 1, 0))
          )
        );
      }

      window.requestAnimationFrame(render);
    };

    render();
  });
}
export { vec3, fun1, fun2, fun3, fun4, fun5 };
