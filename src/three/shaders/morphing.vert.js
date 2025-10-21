/**
 * Morphing Vertex Shader
 * Handles vertex displacement based on scroll position and noise
 * Creates organic, fluid morphing effect
 */

export const morphingVertexShader = `
// Uniforms passed from JavaScript
uniform float uTime;
uniform float uScrollProgress;
uniform float uMorphIntensity;
uniform vec2 uResolution;

// Varyings to pass to fragment shader
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewPosition;

// ============================================
// Simplex Noise Functions
// ============================================

// 3D Simplex Noise by Ian McEwan, Stefan Gustavson
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

// 3D Simplex noise
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients
  float n_ = 0.142857142857; // 1.0/7.0
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// ============================================
// Main Vertex Shader
// ============================================

void main() {
  // Pass varyings to fragment shader
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  
  // Calculate base position
  vec3 pos = position;
  
  // ============================================
  // Noise-based displacement for organic morphing
  // ============================================
  
  // Configure noise parameters
  float noiseFreq = 1.5;
  float noiseAmp = 0.3;
  
  // Animate noise position with time
  vec3 noisePos = pos * noiseFreq + vec3(uTime * 0.1);
  
  // Calculate base noise
  float noise = snoise(noisePos) * noiseAmp;
  
  // Add layered noise for more complexity
  float noise2 = snoise(noisePos * 2.0 + vec3(uTime * 0.15)) * noiseAmp * 0.5;
  float noise3 = snoise(noisePos * 4.0 - vec3(uTime * 0.2)) * noiseAmp * 0.25;
  
  // Combine noise layers
  float totalNoise = noise + noise2 + noise3;
  
  // Apply displacement along normal with morph intensity
  pos += normal * totalNoise * uMorphIntensity;
  
  // ============================================
  // Scroll-based deformation
  // ============================================
  
  // Create wave deformation based on scroll
  float scrollDeform = sin(pos.y * 2.0 + uScrollProgress * 3.14159) * 0.1;
  scrollDeform += cos(pos.x * 1.5 + uScrollProgress * 2.0) * 0.08;
  
  // Apply scroll deformation
  pos += normal * scrollDeform * uScrollProgress;
  
  // Additional twist effect based on scroll
  float twistAmount = uScrollProgress * 0.3;
  float angle = pos.y * twistAmount;
  float cosA = cos(angle);
  float sinA = sin(angle);
  mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);
  pos.xz = rotationMatrix * pos.xz;
  
  // ============================================
  // Final position calculations
  // ============================================
  
  // Store world position for fragment shader
  vPosition = pos;
  
  // Calculate view position (for fresnel effect in fragment shader)
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  
  // Final clip space position
  gl_Position = projectionMatrix * mvPosition;
}
`;