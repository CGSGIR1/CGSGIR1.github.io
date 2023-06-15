import {
  vec3,
  mat4,
  MatrIdentity,
  MatrTranspose,
  MatrMulMatr,
} from "./mth/mth.js";
export { vec3, mat4, MatrIdentity };

class _vert {
  constructor(p1 = null) {
    if (p1 == null) {
      this.pos = [0, 0, 0];
      this.color = [0, 0, 0, 0];
      this.normal = [0, 0, 0];
    } else if (typeof p1 == "object" && p1.length == 3) {
      this.pos = p1[0];
      this.color = p1[1];
      this.normal = p1[2];
    } else if (typeof p1 == "object" && p1.length == 10) {
      this.pos = [p1[0], p1[1], p1[2]];
      this.color = [p1[3], p1[4], p1[5], p1[6]];
      this.normal = [p1[7], p1[8], p1[9]];
    } else {
      let k = arguments.length;
      this.pos = [0, 0, 0];
      this.color = [0, 0, 0, 0];
      this.normal = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        this.pos[i] = arguments[i];
      }
      for (let i = 3; i < 7; i++) {
        this.color[i - 3] = arguments[i];
      }
      if (k == 10) {
        this.normal = [arguments[7], arguments[8], arguments[9]];
      }
    }
  }
  toArray() {
    return [].concat(this.pos, this.color, this.normal);
  } // End of 'toArray' function
}

export function vert(...args) {
  return new _vert(...args);
} // End of 'vec3' function

export function arrayVert(mode, array) {
  let res = [];
  console.log(array);
  if (mode === false) {
    for (let i = 0; i < array.length; i += 7) {
      res.push(
        vert(
          array[i],
          array[i + 1],
          array[i + 2],
          array[i + 3],
          array[i + 4],
          array[i + 5],
          array[i + 6]
        )
      );
    }
  } else {
    for (let i = 0; i < array.length; i += 10) {
      res.push(
        vert(
          array[i],
          array[i + 1],
          array[i + 2],
          array[i + 3],
          array[i + 4],
          array[i + 5],
          array[i + 6],
          0,
          0,
          0
        )
      );
    }
  }
  return res;
}

export function VertToArray(array) {
  let res = [];
  for (let i = 0; i < array.length; i++) {
    res.push(...array[i].toArray());
  }
  return res;
}

class _prim {
  constructor(gl, type, V, NumofV, I, shd) {
    if (type == null) {
      this.Trans = MatrIdentity();
      this.type = gl.TRIANGLE_STRIP;
      this.V = [];
      this.NumofV = 0;
      this.I = [];
      this.shd = null;
    }
    this.Trans = mat4().setIdentity();
    this.type = type;
    if (I != undefined) {
      this.NumofElements = I.length;
      this.IBuf = gl.createBuffer();
    } else {
      if (V != undefined) {
        this.NumofElements = V.length;
      }
    }
    this.NV = NumofV;
    this.VBuf = gl.createBuffer();
    this.VA = gl.createVertexArray();
    gl.bindVertexArray(this.VA);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(V), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(I), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 10 * 4, 0);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 10 * 4, 4 * 3);

    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 10 * 4, 4 * 7);
    // gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 12 * 4, 4 * 7);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);

    //  gl.enableVertexAttribArray(2);
    // gl.enableVertexAttribArray(3);
    gl.bindVertexArray(null);
    this.shader = shd;
    this.gl = gl;
  }
}
export function prim(...args) {
  return new _prim(...args);
} // End of 'prim' function

export function primDraw(Pr, cam, World) {
  let w = MatrMulMatr(Pr.Trans, World);
  //console.log(Pr.Trans);
  //console.log(World);
  //console.log(w);
  //console.log(":(");
  let winw = MatrTranspose(mat4(w).inverse());
  let wvp = mat4(w).mul(cam.matrVP);
  Pr.gl.useProgram(Pr.shader);
  Pr.gl.bindVertexArray(Pr.VA);
  let loc1 = Pr.gl.getUniformLocation(Pr.shader, "MatrWVP");
  if (loc1 != null)
    Pr.gl.uniformMatrix4fv(loc1, false, new Float32Array(wvp.toArray()));
  let loc2 = Pr.gl.getUniformLocation(Pr.shader, "MatrW");
  if (loc2 != null)
    Pr.gl.uniformMatrix4fv(loc2, false, new Float32Array(w.toArray()));
  let loc3 = Pr.gl.getUniformLocation(Pr.shader, "MatrInv");
  if (loc3 != null)
    Pr.gl.uniformMatrix4fv(loc3, false, new Float32Array(winw.toArray()));
  let loc4 = Pr.gl.getUniformLocation(Pr.shader, "CamLoc");
  if (loc4 != null) Pr.gl.uniform3fv(loc4, new Float32Array(cam.loc.toArray()));
  let loc5 = Pr.gl.getUniformLocation(Pr.shader, "CamDir");
  if (loc5 != null) Pr.gl.uniform3fv(loc5, new Float32Array(cam.dir.toArray()));
  if (Pr.IBuf != undefined) {
    Pr.gl.bindBuffer(Pr.gl.ELEMENT_ARRAY_BUFFER, Pr.IBuf);
    Pr.gl.drawElements(Pr.type, Pr.NumofElements, Pr.gl.UNSIGNED_INT, 0);
    Pr.gl.bindBuffer(Pr.gl.ELEMENT_ARRAY_BUFFER, null);
  } else {
    Pr.gl.drawArrays(Pr.type, 0, Pr.NumofElements);
  }

  Pr.gl.bindVertexArray(null);
  Pr.gl.useProgram(null);
}

async function loadfileAsync(FileName) {
  try {
    const response = await fetch(FileName);
    const text = await response.text();
    return text;
  } catch (err) {
    console.log(err);
  }
}

export async function PrimLoad(Pr, FileName) {
  const text = loadfileAsync(FileName);
  const prom = Promise.all([text]).then((res) => {
    const alltext = res[0].split("\n");
    let V = [],
      I = [];
    for (let i = 0; i < alltext.length; i++) {
      let line = alltext[i];
      if (line[0] == "v" && line[1] == " ") {
        let x, y, z;
        let input = line.split(" ");
        x = parseFloat(input[1]);
        y = parseFloat(input[2]);
        z = parseFloat(input[3]);
        let vertex = vert();
        vertex.pos = [x, y, z];
        vertex.color = [0, 0.7, 0.5, 1];
        V.push(vertex);
      } else if (line[0] == "f" && line[1] == " ") {
        let x, y, z;
        let input = line.split(" ");
        x = parseInt(input[1].split("//")[0]) - 1;
        y = parseInt(input[2].split("//")[0]) - 1;
        z = parseInt(input[3].split("//")[0]) - 1;
        I.push(x, y, z);
      }
    }
    for (let i = 0; i < I.length; i += 3) {
      let p0 = vec3(V[I[i]].pos);
      let p1 = vec3(V[I[i + 1]].pos);
      let p2 = vec3(V[I[i + 2]].pos);
      let N = p1.sub(p0).cross(p2.sub(p0)).normalize();

      V[I[i]].normal = vec3(V[I[i]].normal).add(N).toArray();
      //console.log(N);
      V[I[i + 1]].normal = vec3(V[I[i + 1]].normal)
        .add(N)
        .toArray();
      V[I[i + 2]].normal = vec3(V[I[i + 2]].normal)
        .add(N)
        .toArray();
    }
    for (let i = 0; i < V.length; i++) {
      V[i].normal = vec3(V[i].normal).normalize().toArray();
    }
    console.log(Pr);
    let Pr1 = prim(Pr.gl, Pr.type, VertToArray(V), V.lenght, I, Pr.shader);
    return Pr1;
  });
  return prom;
}
