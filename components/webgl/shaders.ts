export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouseInfluence = uMouse * 0.06;

    float flow = noise(uv * 3.0 + vec2(uTime * 0.03, uScroll * 1.4) + mouseInfluence);
    float grain = noise(uv * 40.0 + uTime * 0.15) * 0.05;

    float vignette = smoothstep(1.0, 0.15, length(uv - 0.5));
    float alpha = (flow * 0.4 + grain) * vignette * 0.5;

    gl_FragColor = vec4(uColor, alpha);
  }
`;
