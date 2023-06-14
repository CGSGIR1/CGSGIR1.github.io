function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("!!!!");
    }

    return shader;
}

export function initGL() {
    const canvas = document.getElementById("glCanvas");
    const gl = canvas.getContext("webgl2");
    gl.clearColor(0, 1, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vs = `#version 300 es
        precision highp float;
        in vec4 in_pos;
        out vec4 color;
        out vec2 tpos;
        uniform float Time;
        
        void main()
        {
            gl_Position = in_pos;
            tpos = in_pos.xy;
            color = vec4(in_pos.xy, 0.9, 0.3);
        }
    `;

    const fs = `#version 300 es
        precision highp float;
        out vec4 o_color;
        in vec4 color;
        in vec2 tpos;
        uniform float Time;

        vec2 mul( vec2 z1, vec2 z2 ) {
            return vec2(z1.x * z2.x -  z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);
        }
        float Jul(vec2 z0, vec2 z1) {
            for (int i = 0; i < 256; i++) {
                if (dot(z0, z0) > 4.0) {
                    return float(i);
                }
                z0 = mul(z0, z0) + z1;
            }
            return 256.0;
        }
        
        void main()
        {
            o_color = color * Jul(tpos, vec2(0.3 + sin(Time) * 0.12, 0.4)) / 256.0 * vec4(0.1, 1, 0.3 , 1);
        }
    `;
    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    const program = gl.createProgram();
    gl.attachShader(program, vertexSh);
    gl.attachShader(program, fragmentSh);
    gl.linkProgram(program);
    const start = Date.now();

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("!!!!!!");
    }

    const posLoc = gl.getAttribLocation(program, "in_pos");

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    const pos = [-1, 1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
    gl.useProgram(program);

    const timeFromStart = Date.now() - start;
    const loc = gl.getUniformLocation(program, "Time");
    gl.uniform1f(loc, timeFromStart / 1000);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const draw = () => {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);
        gl.useProgram(program);
        const timeFromStart = Date.now() - start;
        gl.uniform1f(loc, timeFromStart / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        window.requestAnimationFrame(draw);
    };
    draw();
}
