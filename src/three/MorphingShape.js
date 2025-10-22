/**
 * MorphingShape - Mascha's Organic Liquid Blob Animation
 * Adapted from Desktop animation to work as fixed portfolio background
 * Creates branching organic tubes with vivid red material and cursor interaction
 */

import * as THREE from 'three';

/**
 * Perlin Noise implementation for organic movement
 */
class PerlinNoise {
  constructor() {
    this.permutation = [];
    for (let i = 0; i < 256; i++) this.permutation[i] = i;
    this.permutation.sort(() => Math.random() - 0.5);
    this.p = [...this.permutation, ...this.permutation];
  }
  
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t, a, b) { return a + t * (b - a); }
  
  grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  
  noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);
    const A = this.p[X] + Y;
    const AA = this.p[A] + Z;
    const AB = this.p[A + 1] + Z;
    const B = this.p[X + 1] + Y;
    const BA = this.p[B] + Z;
    const BB = this.p[B + 1] + Z;
    
    return this.lerp(w,
      this.lerp(v,
        this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)),
        this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))
      ),
      this.lerp(v,
        this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)),
        this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))
      )
    );
  }
}

export default class MorphingShape {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas element to render to
   */
  constructor(canvas) {
    this.canvas = canvas;
    
    // Three.js core objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.liquidGroup = null;
    this.allOriginalPositions = [];
    
    // Perlin noise for organic movement
    this.perlin = new PerlinNoise();
    
    // Mouse tracking
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    
    // Animation
    this.animationId = null;
    this.clock = new THREE.Clock();
    this.isPlaying = false;
    
    // Performance
    this.isMobile = window.innerWidth < 768;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    
    // Bind methods
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  
  /**
   * Initialize the Three.js scene
   */
  async init() {
    try {
      console.log('=== MorphingShape.init() START ===');
      console.log('Canvas element:', this.canvas);
      console.log('Canvas dimensions:', {
        width: this.canvas.width,
        height: this.canvas.height,
        clientWidth: this.canvas.clientWidth,
        clientHeight: this.canvas.clientHeight
      });
      
      console.log('Step 1: Setting up scene...');
      this.setupScene();
      console.log('Scene created:', !!this.scene, 'Background:', this.scene?.background);
      
      console.log('Step 2: Setting up camera...');
      this.setupCamera();
      console.log('Camera created:', !!this.camera, 'Position:', this.camera?.position);
      
      console.log('Step 3: Setting up renderer...');
      this.setupRenderer();
      console.log('Renderer created:', !!this.renderer);
      console.log('Renderer info:', {
        domElement: !!this.renderer?.domElement,
        capabilities: this.renderer?.capabilities,
        clearColor: this.renderer?.getClearColor(),
        clearAlpha: this.renderer?.getClearAlpha()
      });
      
      console.log('Step 4: Setting up lights...');
      this.setupLights();
      console.log('Scene children after lights:', this.scene?.children.length);
      
      console.log('Step 5: Creating liquid blob...');
      this.createLiquidBlob();
      console.log('Liquid group created:', !!this.liquidGroup);
      console.log('Liquid group children:', this.liquidGroup?.children.length);
      console.log('Scene children after blob:', this.scene?.children.length);
      
      // Event listeners
      console.log('Step 6: Adding event listeners...');
      window.addEventListener('resize', this.handleResize, { passive: true });
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      
      // Start animation
      console.log('Step 7: Starting animation loop...');
      this.start();
      console.log('Animation started, isPlaying:', this.isPlaying);
      
      console.log('=== MorphingShape.init() COMPLETE ===');
      return true;
    } catch (error) {
      console.error('!!! ERROR in MorphingShape.init() !!!');
      console.error('Error:', error);
      console.error('Stack:', error.stack);
      return false;
    }
  }
  
  /**
   * Setup Three.js scene
   */
  setupScene() {
    console.log('Creating Three.js Scene...');
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent background for black body background to show through
    console.log('Scene created with transparent background');
  }
  
  /**
   * Setup camera - FIXED position, no scroll movement
   */
  setupCamera() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const aspect = width / height;
    
    console.log('Setting up camera with dimensions:', { width, height, aspect });
    
    // Validate aspect ratio
    if (!isFinite(aspect) || aspect <= 0) {
      throw new Error(`Invalid aspect ratio: ${aspect}. Canvas dimensions: ${width}x${height}`);
    }
    
    this.camera = new THREE.PerspectiveCamera(
      75,      // FOV
      aspect,  // Aspect ratio
      0.1,     // Near plane
      1000     // Far plane
    );
    
    // FIXED camera position - close to viewer
    this.camera.position.set(0, 3, 15);
    this.camera.lookAt(0, 0, 0);
    console.log('Camera positioned at:', this.camera.position, 'looking at origin');
  }
  
  /**
   * Setup WebGL renderer
   */
  setupRenderer() {
    console.log('Creating WebGLRenderer...');
    console.log('Renderer config:', {
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      pixelRatio: this.pixelRatio
    });
    
    // Ensure canvas has valid dimensions
    let width = this.canvas.clientWidth || window.innerWidth;
    let height = this.canvas.clientHeight || window.innerHeight;
    
    console.log('Canvas dimensions:', {
      clientWidth: this.canvas.clientWidth,
      clientHeight: this.canvas.clientHeight,
      fallbackWidth: width,
      fallbackHeight: height
    });
    
    // If dimensions are still invalid, throw a descriptive error
    if (width === 0 || height === 0) {
      throw new Error(`Invalid canvas dimensions: ${width}x${height}. Canvas must have non-zero dimensions.`);
    }
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,  // CRITICAL: Enable transparency
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    
    console.log('Setting renderer size to:', width, 'x', height);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.pixelRatio);
    
    // CRITICAL: Clear color with 0 alpha for transparency
    this.renderer.setClearColor(0x000000, 0);
    console.log('Renderer clear color set to: black with alpha 0 (transparent)');
    
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    console.log('Renderer setup complete');
  }
  
  /**
   * Setup scene lighting
   */
  setupLights() {
    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(10, 10, 10);
    this.scene.add(keyLight);
    
    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-10, 8, -8);
    this.scene.add(fillLight);
    
    // Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 5, -15);
    this.scene.add(rimLight);
    
    // Accent lights
    const accentLight1 = new THREE.SpotLight(0xffffff, 0.7);
    accentLight1.position.set(8, 12, 8);
    accentLight1.angle = Math.PI / 4;
    accentLight1.penumbra = 0.5;
    this.scene.add(accentLight1);
    
    const accentLight2 = new THREE.SpotLight(0xffffff, 0.6);
    accentLight2.position.set(-8, 12, -8);
    accentLight2.angle = Math.PI / 4;
    accentLight2.penumbra = 0.5;
    this.scene.add(accentLight2);
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
  }
  
  /**
   * Create branching organic liquid blob
   */
  createLiquidBlob() {
    // Vivid red organic blob material
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.1,
      roughness: 0.18,
      transmission: 0,
      thickness: 1.0,
      ior: 1.5,
      specularIntensity: 4.0,
      specularColor: new THREE.Color(0xffffff),
      color: 0xff1a1a,
      transparent: false,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 1.0,
      sheenRoughness: 0.2,
      sheenColor: new THREE.Color(0xff6666),
      reflectivity: 1.0,
      vertexColors: true,
      emissive: 0x330000,
      emissiveIntensity: 0.15
    });
    
    this.liquidGroup = new THREE.Group();
    this.allOriginalPositions = [];
    
    // Branch configurations
    const branchConfigs = [
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(1, 0.5, 0), scale: 8 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(-1, 0.3, 0.5), scale: 7 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(0.5, 1, 0.2), scale: 8 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(-0.3, -0.8, 0.4), scale: 7 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(0.2, 0.4, 1), scale: 7 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(-0.5, 0.2, -0.8), scale: 7 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(0.8, -0.4, 0.3), scale: 6 },
      { start: new THREE.Vector3(0, 0, 0), dir: new THREE.Vector3(-0.7, 0.6, -0.2), scale: 6 }
    ];
    
    branchConfigs.forEach(config => {
      const branch = this.createBranch(config.start, config.dir, config.scale, material);
      this.liquidGroup.add(branch);
    });
    
    this.scene.add(this.liquidGroup);
  }
  
  /**
   * Create a single branching tube
   */
  createBranch(startPoint, direction, scale, material) {
    const segments = 30;
    const points = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const offset = new THREE.Vector3(
        direction.x * t * scale + Math.sin(t * Math.PI * 2) * 0.5,
        direction.y * t * scale + Math.cos(t * Math.PI * 3) * 0.4,
        direction.z * t * scale + Math.sin(t * Math.PI * 4) * 0.3
      );
      points.push(startPoint.clone().add(offset));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    const tubePoints = curve.getPoints(400);
    
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const tubularSegments = 400;
    const radialSegments = 48;
    
    const radiusFunction = (t) => {
      const bulge = Math.pow(Math.sin(t * Math.PI), 1.5) * 0.6;
      const detail = Math.sin(t * Math.PI * 3) * 0.2;
      return (0.3 + bulge + detail) * Math.pow(Math.sin(t * Math.PI), 0.3);
    };
    
    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const point = tubePoints[i];
      const tangent = curve.getTangent(t);
      const normal = new THREE.Vector3();
      const binormal = new THREE.Vector3();
      
      if (Math.abs(tangent.z) < 0.999) {
        normal.set(-tangent.y, tangent.x, 0).normalize();
      } else {
        normal.set(1, 0, 0);
      }
      binormal.crossVectors(tangent, normal).normalize();
      normal.crossVectors(binormal, tangent).normalize();
      
      const radius = radiusFunction(t);
      const twist = t * Math.PI * 1.5;
      
      for (let j = 0; j <= radialSegments; j++) {
        const v = (j / radialSegments) * Math.PI * 2;
        const sin = Math.sin(v + twist);
        const cos = Math.cos(v + twist);
        
        const localRadius = radius * (1 + Math.sin(v * 4) * 0.1);
        
        const vertex = new THREE.Vector3();
        vertex.x = point.x + localRadius * (cos * normal.x + sin * binormal.x);
        vertex.y = point.y + localRadius * (cos * normal.y + sin * binormal.y);
        vertex.z = point.z + localRadius * (cos * normal.z + sin * binormal.z);
        
        vertices.push(vertex.x, vertex.y, vertex.z);
      }
    }
    
    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = a + radialSegments + 1;
        const c = a + radialSegments + 2;
        const d = a + 1;
        
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    // Add color attribute for cursor interaction
    const colors = new Float32Array(vertices.length);
    const baseColor = new THREE.Color(0xff1a1a);
    for (let i = 0; i < vertices.length / 3; i++) {
      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const branch = new THREE.Mesh(geometry, material);
    this.allOriginalPositions.push(branch.geometry.attributes.position.clone());
    
    return branch;
  }
  
  /**
   * Handle mouse move for cursor interaction
   */
  handleMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    if (!this.camera || !this.renderer) return;
    
    this.isMobile = window.innerWidth < 768;
    
    // Use fallback dimensions if canvas dimensions are invalid
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    
    console.log('Resizing Three.js scene to:', width, 'x', height);
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }
  
  /**
   * Animation loop - FIXED shape, no scroll reactivity
   */
  animate() {
    if (!this.isPlaying) {
      console.log('Animation stopped - isPlaying is false');
      return;
    }
    
    this.animationId = requestAnimationFrame(this.animate);
    
    const time = this.clock.getElapsedTime();
    
    // Log first frame and every 5 seconds
    if (time < 0.1 || Math.floor(time) % 5 === 0 && Math.floor(time) !== Math.floor(time - 0.016)) {
      console.log('Animation frame at time:', time.toFixed(2), 's');
    }
    
    // Global growth animation with smoothstep
    const growthFactor = Math.min(1.0, time / 5.0);
    const smoothGrowth = growthFactor * growthFactor * (3 - 2 * growthFactor);
    
    // Cast ray for cursor interaction
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.liquidGroup.children, true);
    
    // Calculate cursor world position
    const cursorWorldPos = new THREE.Vector3();
    if (intersects.length > 0) {
      cursorWorldPos.copy(intersects[0].point);
    } else {
      this.raycaster.ray.at(15, cursorWorldPos);
    }
    
    // Animate each branch
    this.liquidGroup.children.forEach((branch, index) => {
      this.animateBranch(branch, index, time, smoothGrowth, cursorWorldPos);
    });
    
    // FIXED position rotation - slow organic rotation only
    this.liquidGroup.rotation.y = time * 0.05 + Math.sin(time * 0.12) * 0.04;
    this.liquidGroup.rotation.x = Math.sin(time * 0.09) * 0.03;
    this.liquidGroup.rotation.z = Math.cos(time * 0.11) * 0.025;
    
    // Render scene
    try {
      this.renderer.render(this.scene, this.camera);
      
      // Log first render
      if (time < 0.1) {
        console.log('First render completed successfully');
        console.log('Scene objects:', this.scene.children.length);
        console.log('Liquid group visible:', this.liquidGroup?.visible);
      }
    } catch (error) {
      console.error('Render error:', error);
    }
  }
  
  /**
   * Animate individual branch with morphing and cursor interaction
   */
  animateBranch(branch, index, time, smoothGrowth, cursorWorldPos) {
    const positions = branch.geometry.attributes.position;
    const colors = branch.geometry.attributes.color;
    const originalPositions = this.allOriginalPositions[index];
    const vertex = new THREE.Vector3();
    
    // Color gradients for cursor interaction
    const baseRedColor = new THREE.Color(0xff1a1a);
    const brightRedColor = new THREE.Color(0xff6666);
    const hotPinkColor = new THREE.Color(0xff00ff);
    const whiteColor = new THREE.Color(0xffffff);
    
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(originalPositions, i);
      
      // World position for cursor distance
      const worldVertex = vertex.clone().applyMatrix4(branch.matrixWorld);
      const distanceToCursor = worldVertex.distanceTo(cursorWorldPos);
      
      // Cursor reaction
      const reactionDistance = 8.0;
      const cursorInfluence = Math.max(0, 1 - distanceToCursor / reactionDistance);
      const smoothInfluence = cursorInfluence * cursorInfluence * (3 - 2 * cursorInfluence);
      
      // Color gradient based on proximity
      const color = new THREE.Color();
      if (smoothInfluence > 0.7) {
        color.lerpColors(hotPinkColor, whiteColor, (smoothInfluence - 0.7) / 0.3);
      } else if (smoothInfluence > 0.4) {
        color.lerpColors(brightRedColor, hotPinkColor, (smoothInfluence - 0.4) / 0.3);
      } else if (smoothInfluence > 0.1) {
        color.lerpColors(baseRedColor, brightRedColor, (smoothInfluence - 0.1) / 0.3);
      } else {
        color.lerpColors(baseRedColor, brightRedColor, smoothInfluence * 10);
      }
      
      colors.setXYZ(i, color.r, color.g, color.b);
      
      const distance = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z);
      const angle = Math.atan2(vertex.y, vertex.x);
      
      // Multi-octave Perlin noise
      const noiseScale = 0.8;
      const noiseSpeed = 0.3;
      
      const noise1 = this.perlin.noise(
        vertex.x * noiseScale * 0.5 + time * noiseSpeed,
        vertex.y * noiseScale * 0.5 + time * noiseSpeed * 0.8,
        vertex.z * noiseScale * 0.5 + time * noiseSpeed * 0.6
      ) * 0.25;
      
      const noise2 = this.perlin.noise(
        vertex.x * noiseScale * 1.5 + time * noiseSpeed * 1.2,
        vertex.y * noiseScale * 1.5 + time * noiseSpeed * 0.9,
        vertex.z * noiseScale * 1.5 + time * noiseSpeed * 1.1
      ) * 0.15;
      
      const noise3 = this.perlin.noise(
        vertex.x * noiseScale * 3.0 + time * noiseSpeed * 1.5,
        vertex.y * noiseScale * 3.0 + time * noiseSpeed * 1.3,
        vertex.z * noiseScale * 3.0 + time * noiseSpeed * 1.4
      ) * 0.08;
      
      // Dynamic waves
      const wave1 = Math.sin(time * 0.5 + vertex.x * 0.4 + vertex.y * 0.3) * 0.12;
      const wave2 = Math.cos(time * 0.6 + vertex.z * 0.5 - vertex.x * 0.2) * 0.10;
      const wave3 = Math.sin(time * 0.7 + distance * 0.6 + angle * 2) * 0.09;
      
      // Pulsating effect
      const pulse1 = Math.sin(time * 0.4 + distance * 0.8) * 0.08;
      const pulse2 = Math.cos(time * 0.45 + angle * 3) * 0.07;
      
      // Global morphing
      const globalMorph = Math.sin(time * 0.35) * 0.1;
      
      // Surface ripples
      const ripple1 = Math.sin(time * 0.8 + vertex.x * 0.7 - vertex.y * 0.4) * 0.06;
      const ripple2 = Math.cos(time * 0.9 + vertex.z * 0.8 + vertex.x * 0.3) * 0.05;
      
      // Combine all effects
      const combinedDisplacement = noise1 + noise2 + noise3 +
                                   wave1 + wave2 + wave3 +
                                   pulse1 + pulse2 +
                                   globalMorph + ripple1 + ripple2;
      
      // Apply transformation
      const radialEffect = smoothGrowth * (1 + combinedDisplacement);
      
      vertex.x *= radialEffect;
      vertex.y *= radialEffect;
      vertex.z *= radialEffect;
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    
    // Update normals for smooth lighting
    branch.geometry.computeVertexNormals();
  }
  
  /**
   * Start animation
   */
  start() {
    if (this.isPlaying) {
      console.log('Animation already playing');
      return;
    }
    console.log('Starting animation loop...');
    this.isPlaying = true;
    this.clock.start();
    console.log('Clock started, elapsed time:', this.clock.getElapsedTime());
    this.animate();
    console.log('Animation loop initiated, animationId:', this.animationId);
  }
  
  /**
   * Stop animation
   */
  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.clock.stop();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    console.log('Liquid blob animation stopped');
  }
  
  /**
   * Cleanup and dispose
   */
  destroy() {
    console.log('Destroying liquid blob animation...');
    
    this.stop();
    
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    // Dispose resources
    if (this.liquidGroup) {
      this.liquidGroup.children.forEach(branch => {
        if (branch.geometry) branch.geometry.dispose();
        if (branch.material) branch.material.dispose();
      });
    }
    
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    
    if (this.scene) {
      while (this.scene.children.length > 0) {
        const object = this.scene.children[0];
        this.scene.remove(object);
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      }
      this.scene = null;
    }
    
    console.log('Liquid blob animation destroyed');
  }
}