/**
 * Morphing Fragment Shader
 * Creates glass-like material with fresnel effects and color transitions
 * Provides transparency, reflections, and scroll-based color shifts
 */

export const morphingFragmentShader = `
// Uniforms from JavaScript
uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColor;
uniform float uOpacity;

// Varyings from vertex shader
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewPosition;

// ============================================
// Utility Functions
// ============================================

/**
 * Calculate Fresnel effect
 * Creates edge highlighting for glass-like appearance
 */
float fresnel(vec3 viewDirection, vec3 normal, float power) {
  float dotProduct = dot(viewDirection, normal);
  // Clamp to avoid negative values
  dotProduct = max(0.0, dotProduct);
  // Invert and apply power for fresnel effect
  return pow(1.0 - dotProduct, power);
}

/**
 * Smooth color mixing function
 */
vec3 mixColors(vec3 color1, vec3 color2, float mixFactor) {
  return mix(color1, color2, smoothstep(0.0, 1.0, mixFactor));
}

// ============================================
// Main Fragment Shader
// ============================================

void main() {
  // ============================================
  // View direction and fresnel calculation
  // ============================================
  
  // Normalize the view direction
  vec3 viewDirection = normalize(vViewPosition);
  
  // Normalize surface normal
  vec3 normal = normalize(vNormal);
  
  // Calculate fresnel with adjustable power
  // Higher power = more concentrated edge glow
  float fresnelPower = 3.0;
  float fresnelEffect = fresnel(viewDirection, normal, fresnelPower);
  
  // Additional fresnel layer for subtle inner glow
  float fresnelSoft = fresnel(viewDirection, normal, 1.5);
  
  // ============================================
  // Color calculations with scroll influence
  // ============================================
  
  // Base color (from uniform)
  vec3 baseColor = uColor;
  
  // Accent colors for transitions
  vec3 accentColor1 = vec3(0.3, 0.5, 1.0);  // Blue
  vec3 accentColor2 = vec3(0.5, 0.3, 1.0);  // Purple
  vec3 highlightColor = vec3(1.0, 1.0, 1.0); // White for fresnel
  
  // Animate color transition based on scroll
  vec3 scrollColor = mixColors(accentColor1, accentColor2, uScrollProgress);
  
  // Mix base color with scroll-influenced color
  float colorMixAmount = uScrollProgress * 0.5;
  vec3 finalColor = mixColors(baseColor, scrollColor, colorMixAmount);
  
  // ============================================
  // Apply fresnel highlights
  // ============================================
  
  // Strong edge glow
  finalColor = mix(finalColor, highlightColor, fresnelEffect * 0.6);
  
  // Subtle inner glow
  finalColor = mix(finalColor, highlightColor, fresnelSoft * 0.2);
  
  // ============================================
  // Time-based color variation
  // ============================================
  
  // Add subtle pulsing effect
  float pulse = sin(uTime * 0.5) * 0.5 + 0.5;
  vec3 pulseColor = vec3(0.4, 0.6, 1.0);
  finalColor = mix(finalColor, pulseColor, pulse * 0.1);
  
  // ============================================
  // Opacity calculations
  // ============================================
  
  // Base opacity from uniform
  float opacity = uOpacity;
  
  // Increase opacity at edges (fresnel effect)
  opacity = opacity * (0.6 + fresnelEffect * 0.4);
  
  // Reduce opacity based on scroll progress
  // Fade out gradually as user scrolls
  opacity *= (1.0 - uScrollProgress * 0.5);
  
  // Add subtle variation based on position
  float positionVariation = sin(vPosition.y * 2.0 + uTime * 0.3) * 0.1 + 0.9;
  opacity *= positionVariation;
  
  // Ensure opacity stays within valid range
  opacity = clamp(opacity, 0.0, 1.0);
  
  // ============================================
  // Fake environment reflection
  // ============================================
  
  // Create simple reflection effect based on normal direction
  vec3 reflectionColor = vec3(0.0);
  
  // Use normal's y component for sky/ground gradient
  float skyFactor = normal.y * 0.5 + 0.5;
  vec3 skyColor = vec3(0.4, 0.5, 0.8);
  vec3 groundColor = vec3(0.1, 0.1, 0.2);
  reflectionColor = mix(groundColor, skyColor, skyFactor);
  
  // Add reflection to final color with low intensity
  finalColor = mix(finalColor, reflectionColor, 0.15);
  
  // ============================================
  // Final color output
  // ============================================
  
  // Apply gamma correction for better color appearance
  finalColor = pow(finalColor, vec3(1.0 / 2.2));
  
  // Output final color with calculated opacity
  gl_FragColor = vec4(finalColor, opacity);
  
  // Ensure we're using proper blending
  // This allows transparency to work correctly
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;