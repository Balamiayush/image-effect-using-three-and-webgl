#version 300 es
precision mediump float;

in vec2 v_uv;
out vec4 outColor;

void main() {
    vec3 color = vec3(v_uv, 0.5);
    outColor = vec4(color, 1.0);
}
