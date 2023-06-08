#version 300 es

precision highp float;
layout(location = 0) in vec3 in_pos;
layout(location = 1) in vec4 in_color;
layout(location = 2) in vec3 in_normal;        
out vec4 v_color;
uniform mat4 MatrWVP;
uniform mat4 MatrW;
uniform mat4 MatrInv;
uniform vec3 CamDir;
uniform vec3 CamLoc;


void main() {
    vec3 pos = in_pos;
    gl_Position = MatrWVP * vec4(in_pos, 1);
    vec3 V = normalize(mat3(MatrInv) * pos - CamLoc);
    vec3 N = normalize(in_normal);
    N = faceforward(N, V, N);
    v_color = vec4(in_normal, 1);
    //v_color = vec4(in_color.rgb * max(0.1, dot(N, -normalize(CamDir))), 1);
}