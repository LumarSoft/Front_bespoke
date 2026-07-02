export const distortVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const distortFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uHasTexture;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
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
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 22.0 - uTime * 3.0) * 0.03 * uHover * smoothstep(0.6, 0.0, dist);
    vec2 dir = normalize(uv - uMouse + 0.0001);
    vec2 distortedUv = uv + dir * ripple;

    vec3 color;
    if (uHasTexture > 0.5) {
      float shift = 0.006 * uHover;
      float r = texture2D(uTexture, distortedUv + dir * shift).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - dir * shift).b;
      color = vec3(r, g, b);
    } else {
      float n = noise(distortedUv * 18.0 + uTime * 0.05);
      float stripes = step(0.5, fract((distortedUv.x + distortedUv.y) * 9.0 - uTime * 0.02));
      vec3 arena = vec3(0.914, 0.886, 0.827);
      vec3 grisCalido = vec3(0.541, 0.514, 0.467);
      color = mix(arena, grisCalido, stripes) * (0.88 + n * 0.12);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
