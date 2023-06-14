export function Degree2Radian(A) {
  return (A * Math.PI) / 180.0;
}

class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) (this.x = 0), (this.y = 0), (this.z = 0);
    else if (typeof x == "object")
      if (x.length == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
      else (this.x = x.x), (this.y = x.y), (this.z = x.z);
    else if (y == undefined && z == undefined)
      (this.x = x), (this.y = x), (this.z = x);
    else (this.x = x), (this.y = y), (this.z = z);
  } // End of 'constructor' function

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  } // End of 'set' function

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  } // End of 'dot' function

  cross(v) {
    return vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  } // End of 'cross' function

  add(v) {
    if (typeof v == "number") return vec3(this.x + v, this.y + v, this.z + v);
    return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  } // End of 'add' function

  sub(v) {
    if (typeof v == "number") return vec3(this.x - v, this.y - v, this.z - v);
    return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  } // End of 'sub' function

  mul(v) {
    if (typeof v == "number") return vec3(this.x * v, this.y * v, this.z * v);
    return vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  } // End of 'mul' function

  div(v) {
    if (typeof v == "number") return vec3(this.x / v, this.y / v, this.z / v);
    return vec3(this.x / v.x, this.y / v.y, this.z / v.z);
  } // End of 'div' function

  len2() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  } // End of 'len2' function

  len() {
    let len = this.x * this.x + this.y * this.y + this.z * this.z;

    if (len != 0 && len != 1) return Math.sqrt(len);
    return len;
  } // End of 'len' function

  normalize() {
    let len = this.x * this.x + this.y * this.y + this.z * this.z;

    if (len != 0 && len != 1) {
      len = Math.sqrt(len);
      return vec3(this.x / len, this.y / len, this.z / len);
    }
    return vec3(this);
  } // End of 'normalize' function

  toArray() {
    return [this.x, this.y, this.z];
  } // End of 'toArray' function
} // End of '_vec3' class

export function vec3(...args) {
  return new _vec3(...args);
} // End of 'vec3' function

class _mat4 {
  constructor(m = null) {
    if (m == null)
      this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    else if (typeof m == "object" && m.length == 4) this.m = m;
    else this.m = m.m;
  } // End of 'constructor' function

  mul(m) {
    let matr;
    if (m.length == 4) matr = m;
    else matr = m.m;
    this.m = [
      [
        this.m[0][0] * matr[0][0] +
          this.m[0][1] * matr[1][0] +
          this.m[0][2] * matr[2][0] +
          this.m[0][3] * matr[3][0],
        this.m[0][0] * matr[0][1] +
          this.m[0][1] * matr[1][1] +
          this.m[0][2] * matr[2][1] +
          this.m[0][3] * matr[3][1],
        this.m[0][0] * matr[0][2] +
          this.m[0][1] * matr[1][2] +
          this.m[0][2] * matr[2][2] +
          this.m[0][3] * matr[3][2],
        this.m[0][0] * matr[0][3] +
          this.m[0][1] * matr[1][3] +
          this.m[0][2] * matr[2][3] +
          this.m[0][3] * matr[3][3],
      ],
      [
        this.m[1][0] * matr[0][0] +
          this.m[1][1] * matr[1][0] +
          this.m[1][2] * matr[2][0] +
          this.m[1][3] * matr[3][0],
        this.m[1][0] * matr[0][1] +
          this.m[1][1] * matr[1][1] +
          this.m[1][2] * matr[2][1] +
          this.m[1][3] * matr[3][1],
        this.m[1][0] * matr[0][2] +
          this.m[1][1] * matr[1][2] +
          this.m[1][2] * matr[2][2] +
          this.m[1][3] * matr[3][2],
        this.m[1][0] * matr[0][3] +
          this.m[1][1] * matr[1][3] +
          this.m[1][2] * matr[2][3] +
          this.m[1][3] * matr[3][3],
      ],
      [
        this.m[2][0] * matr[0][0] +
          this.m[2][1] * matr[1][0] +
          this.m[2][2] * matr[2][0] +
          this.m[2][3] * matr[3][0],
        this.m[2][0] * matr[0][1] +
          this.m[2][1] * matr[1][1] +
          this.m[2][2] * matr[2][1] +
          this.m[2][3] * matr[3][1],
        this.m[2][0] * matr[0][2] +
          this.m[2][1] * matr[1][2] +
          this.m[2][2] * matr[2][2] +
          this.m[2][3] * matr[3][2],
        this.m[2][0] * matr[0][3] +
          this.m[2][1] * matr[1][3] +
          this.m[2][2] * matr[2][3] +
          this.m[2][3] * matr[3][3],
      ],
      [
        this.m[3][0] * matr[0][0] +
          this.m[3][1] * matr[1][0] +
          this.m[3][2] * matr[2][0] +
          this.m[3][3] * matr[3][0],
        this.m[3][0] * matr[0][1] +
          this.m[3][1] * matr[1][1] +
          this.m[3][2] * matr[2][1] +
          this.m[3][3] * matr[3][1],
        this.m[3][0] * matr[0][2] +
          this.m[3][1] * matr[1][2] +
          this.m[3][2] * matr[2][2] +
          this.m[3][3] * matr[3][2],
        this.m[3][0] * matr[0][3] +
          this.m[3][1] * matr[1][3] +
          this.m[3][2] * matr[2][3] +
          this.m[3][3] * matr[3][3],
      ],
    ];
    return this;
  } // End of 'mul' function

  setIdentity() {
    this.m = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    return this;
  }

  MatrTranslate(T) {
    let m = mat4();
    let x, y, z;
    if (typeof T == "object")
      if (T.length == 3) (x = T[0]), (y = T[1]), (z = T[2]);
      else (x = T.x), (y = T.y), (z = T.z);
    m.m[3][0] = x;
    m.m[3][1] = y;
    m.m[3][2] = z;
    return m;
  } // End of 'MatrTranslate' function

  MatrScale(T) {
    let m = mat4();
    let x, y, z;
    if (typeof T == "object")
      if (T.length == 3) (x = T[0]), (y = T[1]), (z = T[2]);
      else (x = T.x), (y = T.y), (z = T.z);
    m.m[0][0] = x;
    m.m[1][1] = y;
    m.m[2][2] = z;
    return m;
  } // End of 'MatrTranslate' function

  setRotate(AngleInDegree, R) {
    let a = AngleInDegree * Math.PI,
      sine = Math.sin(a),
      cosine = Math.cos(a);
    let x = 0,
      y = 0,
      z = 1;
    if (typeof R == "object")
      if (R.length == 3) (x = R[0]), (y = R[1]), (z = R[2]);
      else (x = R.x), (y = R.y), (z = R.z);

    let len = x * x + y * y + z * z;
    if (len != 0 && len != 1)
      (len = Math.sqrt(len)), (x /= len), (y /= len), (z /= len);
    this.m[0][0] = cosine + x * x * (1 - cosine);
    this.m[0][1] = x * y * (1 - cosine) + z * sine;
    this.m[0][2] = x * z * (1 - cosine) - y * sine;
    this.m[0][3] = 0;
    this.m[1][0] = y * x * (1 - cosine) - z * sine;
    this.m[1][1] = cosine + y * y * (1 - cosine);
    this.m[1][2] = y * z * (1 - cosine) + x * sine;
    this.m[1][3] = 0;
    this.m[2][0] = z * x * (1 - cosine) + y * sine;
    this.m[2][1] = z * y * (1 - cosine) - x * sine;
    this.m[2][2] = cosine + z * z * (1 - cosine);
    this.m[2][3] = 0;
    this.m[3][0] = 0;
    this.m[3][1] = 0;
    this.m[3][2] = 0;
    this.m[3][3] = 1;
    return this;
  } // End of 'setRotate' function

  setMatrRotateZ(AngleInDegree) {
    let m = new _mat4().setIdentity;
    let a = Degree2Radian(AngleInDegree);
    let co = Math.cos(a),
      si = Math.sin(a);

    m.m[0][0] = co;
    m.m[1][1] = co;
    m.m[0][1] = si;
    m.m[1][0] = -si;
    return m;
  }

  setMatrRotateY(AngleInDegree) {
    let m = new _mat4().setIdentity;
    let a = Degree2Radian(AngleInDegree);
    let co = Math.cos(a),
      si = Math.sin(a);

    m.m[0][0] = co;
    m.m[2][2] = co;
    m.m[0][2] = -si;
    m.m[2][0] = si;
    return m;
  }

  setMatrRotateX(AngleInDegree) {
    let m = new _mat4().setIdentity;
    let a = Degree2Radian(AngleInDegree);
    let co = Math.cos(a),
      si = Math.sin(a);

    m.m[1][1] = co;
    m.m[2][2] = co;
    m.m[1][2] = si;
    m.m[2][1] = -si;
    return m;
  }
  determ3x3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
    return (
      A11 * A22 * A33 -
      A11 * A23 * A32 -
      A12 * A21 * A33 +
      A12 * A23 * A31 +
      A13 * A21 * A32 -
      A13 * A22 * A31
    );
  } // End of 'determ3x3' function

  determ() {
    let det =
      this.m[0][0] *
        this.determ3x3(
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3]
        ) -
      this.m[0][1] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3]
        ) +
      this.m[0][2] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3]
        ) -
      this.m[0][3] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2]
        );

    return det;
  } // End of 'determ' function

  inverse() {
    let r = [[], [], [], []];
    let det = this.determ();

    if (det == 0) {
      let m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];

      return mat4(m);
    }

    /* Build adjoint matrix */
    r[0][0] =
      this.determ3x3(
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[1][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[2][0] =
      this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    r[3][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;

    r[0][1] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[1][1] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[2][1] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    r[3][1] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;

    r[0][2] =
      this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[1][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    r[2][2] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    r[3][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;

    r[0][3] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3]
      ) / det;

    r[1][3] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3]
      ) / det;
    r[2][3] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3]
      ) / det;
    r[3][3] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2]
      ) / det;
    this.m = r;
    return this;
  } // End of 'inverse' function

  setView(Loc, At, Up1) {
    let Dir = At.sub(Loc).normalize(),
      Right = Dir.cross(Up1).normalize(),
      Up = Right.cross(Dir).normalize();
    this.m = [
      [Right.x, Up.x, -Dir.x, 0],
      [Right.y, Up.y, -Dir.y, 0],
      [Right.z, Up.z, -Dir.z, 0],
      [-Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1],
    ];
    return this;
  } // End of 'setView' function

  setOrtho(L, R, B, T, N, F) {
    this.m = [
      [2 / (R - L), 0, 0, 0],
      [0, 2 / (T - B), 0, 0],
      [0, 0, -2 / (F - N), 0],
      [-(R + L) / (R - L), -(T + B) / (T - B), -(F + N) / (F - N), 1],
    ];
    return this;
  } // End of 'setOrtho' function

  setFrustum(L, R, B, T, N, F) {
    this.m = [
      [(2 * N) / (R - L), 0, 0, 0],
      [0, (2 * N) / (T - B), 0, 0],
      [(R + L) / (R - L), (T + B) / (T - B), -(F + N) / (F - N), -1],
      [0, 0, (-2 * N * F) / (F - N), 0],
    ];
    return this;
  } // End of 'setFrustum' function

  view(Loc, At, Up1) {
    return this.mul(mat4().setView(Loc, At, Up1));
  } // End of 'view' function

  ortho(L, R, B, T, N, F) {
    return this.mul(mat4().setOrtho(L, R, B, T, N, F));
  } // End of 'ortho' function

  frustum(L, R, B, T, N, F) {
    return this.mul(mat4().setFrustum(L, R, B, T, N, F));
  } // End of 'frustum' function

  transform(V) {
    let w =
      V.x * this.m[0][3] +
      V.y * this.m[1][3] +
      V.z * this.m[2][3] +
      this.m[3][3];

    return vec3(
      (V.x * this.m[0][0] +
        V.y * this.m[1][0] +
        V.z * this.m[2][0] +
        this.m[3][0]) /
        w,
      (V.x * this.m[0][1] +
        V.y * this.m[1][1] +
        V.z * this.m[2][1] +
        this.m[3][1]) /
        w,
      (V.x * this.m[0][2] +
        V.y * this.m[1][2] +
        V.z * this.m[2][2] +
        this.m[3][2]) /
        w
    );
  } // End of 'transform' function

  transformVector(V) {
    return vec3(
      V.x * this.m[0][0] + V.y * this.m[1][0] + V.z * this.m[2][0],
      V.x * this.m[0][1] + V.y * this.m[1][1] + V.z * this.m[2][1],
      V.x * this.m[0][2] + V.y * this.m[1][2] + V.z * this.m[2][2]
    );
  } // End of 'transformVector' function

  transformPoint(V) {
    return vec3(
      V.x * this.m[0][0] +
        V.y * this.m[1][0] +
        V.z * this.m[2][0] +
        this.m[3][0],
      V.x * this.m[0][1] +
        V.y * this.m[1][1] +
        V.z * this.m[2][1] +
        this.m[3][1],
      V.x * this.m[0][2] +
        V.y * this.m[1][2] +
        V.z * this.m[2][2] +
        this.m[3][2]
    );
  } // End of 'transformPoint' function

  toArray() {
    return [].concat(...this.m);
  } // End of 'toArray' function
} // End of 'mat4' class

export function mat4(...args) {
  return new _mat4(...args);
} // End of 'mat4' function

class _camera {
  constructor() {
    // Projection properties
    this.projSize = 0.1; // Project plane fit square
    this.projDist = 0.1; // Distance to project plane from viewer (near)
    this.projFarClip = 1800; // Distance to project far clip plane (far)

    // Local size data
    this.frameW = 1000; // Frame width
    this.frameH = 1000; // Frame height

    // Matrices
    this.matrView = mat4(); // View coordinate system matrix
    this.matrProj = mat4(); // Projection coordinate system matrix
    this.matrVP = mat4(); // View and projection matrix precalculate value

    // Set camera default settings
    this.loc = vec3(); // Camera location
    this.at = vec3(); // Camera destination
    this.dir = vec3(); // Camera Direction
    this.up = vec3(); // Camera UP direction
    this.right = vec3(); // Camera RIGHT direction
    this.setDef();
  } // End of 'constructor' function

  // Camera parmeters setting function
  set(loc, at, up) {
    this.matrView.setView(loc, at, up);
    this.loc = vec3(loc);
    this.at = vec3(at);
    this.dir.set(
      -this.matrView.m[0][2],
      -this.matrView.m[1][2],
      -this.matrView.m[2][2]
    );
    this.up.set(
      this.matrView.m[0][1],
      this.matrView.m[1][1],
      this.matrView.m[2][1]
    );
    this.right.set(
      this.matrView.m[0][0],
      this.matrView.m[1][0],
      this.matrView.m[2][0]
    );
    this.matrVP = mat4(this.matrView).mul(this.matrProj);
  } // End of 'set' function

  // Projection parameters setting function.
  setProj(projSize, projDist, projFarClip) {
    let rx = projSize,
      ry = projSize;

    this.projDist = projDist;
    this.projSize = projSize;
    this.projFarClip = projFarClip;

    // Correct aspect ratio
    if (this.frameW > this.frameH) rx *= this.frameW / this.frameH;
    else ry *= this.frameH / this.frameW;
    this.matrProj.setFrustum(
      -rx / 2.0,
      rx / 2.0,
      -ry / 2.0,
      ry / 2.0,
      projDist,
      projFarClip
    );

    // pre-calculate view * proj matrix
    this.matrVP = mat4(this.matrView).mul(this.matrProj);
  } // End of 'setProj' function

  // Resize camera and projection function.
  setSize(frameW, frameH) {
    if (frameW < 1) frameW = 1;
    if (frameH < 1) frameH = 1;
    this.frameW = frameW;
    this.frameH = frameH;
    // Reset projection with new render window size
    this.setProj(this.projSize, this.projDist, this.projFarClip);
  } // End of 'setSize' function

  // Camera set default values function.
  setDef() {
    this.loc.set(0, -0.5, 8);
    this.at.set(1, 2, 1);
    this.dir.set(0, 0, 1);
    this.up.set(0, 1, 0);
    this.right.set(1, 0, 0);

    this.projDist = 0.1;
    this.projSize = 0.1;
    this.projFarClip = 1800;

    this.frameW = 1000;
    this.frameH = 1000;
    this.matrView.setView(this.loc, this.at, this.up);

    this.setProj(this.projSize, this.projDist, this.projFarClip);
    this.set(this.loc, this.at, this.up);
    this.setSize(this.frameW, this.frameH);
  } // End of 'setDef' function
} // End of 'camera' class

export function camera(...args) {
  return new _camera(...args);
} // End of 'camera' function

export function MatrIdentity() {
  return mat4().setIdentity();
}

export function MatrMulMatr(m1, m2) {
  return mat4(m1).mul(m2);
} // End of 'MatrMulMatr' function

export function MatrTranspose(M) {
  let r = mat4([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      r.m[i][j] = M.m[j][i];
    }
  }
  return r;
}
