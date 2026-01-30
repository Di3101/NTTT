// Three.js 3D Scene - Heart made of Particles
let scene, camera, renderer, heartParticles, floatingParticles;
let mouseX = 0, mouseY = 0;

function init3DScene() {
    const canvas3d = document.getElementById('scene3d');
    if (!canvas3d) {
        console.error('Canvas not found');
        return;
    }
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas3d, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create Heart from Particles
    createHeartParticles();
    
    // Create Floating Particles
    createFloatingParticles();
    
    // Mouse move interaction
    document.addEventListener('mousemove', onMouseMove, false);
    
    // Window resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
    
    console.log('3D Scene initialized');
}

function createHeartParticles() {
    // Create main heart group
    heartParticles = new THREE.Group();
    
    // Main heart particles (outline and filled)
    const mainHeart = createHeartOutline();
    heartParticles.add(mainHeart);
    
    // Reflection/shadow below
    const reflection = createHeartOutline();
    reflection.scale.y = -0.3;
    reflection.position.y = -2.5;
    reflection.material = reflection.material.clone();
    reflection.material.opacity = 0.3;
    heartParticles.add(reflection);
    
    scene.add(heartParticles);
    console.log('Heart with reflection created');
}

function createHeartOutline() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 12000;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Heart shape function
    function heartFunction(t) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        return { x: x * 0.08, y: y * 0.08 };
    }
    
    let index = 0;
    
    // Create thick bright outline (90% of particles)
    const outlineCount = particlesCount * 0.9;
    for (let layer = 0; layer < 10; layer++) {
        for (let i = 0; i < outlineCount / 10; i++) {
            const t = (i / (outlineCount / 10)) * Math.PI * 2;
            const point = heartFunction(t);
            
            // Create thickness for outline (0.15 units thick)
            const thickness = (layer / 10) * 0.15;
            const angle = Math.random() * Math.PI * 2;
            
            posArray[index * 3] = point.x + Math.cos(angle) * thickness + (Math.random() - 0.5) * 0.02;
            posArray[index * 3 + 1] = point.y + Math.sin(angle) * thickness + (Math.random() - 0.5) * 0.02;
            posArray[index * 3 + 2] = (Math.random() - 0.5) * 0.2;
            
            // Very bright white-pink for outline
            const brightness = 1.0 - (layer / 10) * 0.4; // Outer brighter, inner darker
            colors[index * 3] = 1.0;
            colors[index * 3 + 1] = brightness * 0.9;
            colors[index * 3 + 2] = brightness * 0.95;
            
            index++;
        }
    }
    
    // Sparse dark particles inside (10% of particles)
    const innerCount = particlesCount * 0.1;
    for (let i = 0; i < innerCount; i++) {
        const t = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.7; // Only inner 70%
        const point = heartFunction(t);
        
        posArray[index * 3] = point.x * radius;
        posArray[index * 3 + 1] = point.y * radius;
        posArray[index * 3 + 2] = (Math.random() - 0.5) * 0.1;
        
        // Dark pink/purple inside
        colors[index * 3] = 0.6 + Math.random() * 0.2;
        colors[index * 3 + 1] = 0.1 + Math.random() * 0.2;
        colors[index * 3 + 2] = 0.3 + Math.random() * 0.2;
        
        index++;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        map: createCircleTexture(),
        depthWrite: false
    });
    
    return new THREE.Points(particlesGeometry, particlesMaterial);
}

function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function createFloatingParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create particles floating around
    for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xff6b9d,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    floatingParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(floatingParticles);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate heart particles - subtle pulsating effect
    if (heartParticles) {
        // Subtle heartbeat effect
        const beat = Math.sin(time * 1.5) * 0.04 + Math.sin(time * 3) * 0.02;
        const scale = 1.5 + beat;
        
        heartParticles.scale.set(scale, scale, scale);
        
        // Very slight rotation
        heartParticles.rotation.z = Math.sin(time * 0.2) * 0.05;
    }
    
    // Animate floating particles
    if (floatingParticles) {
        floatingParticles.rotation.y += 0.0005;
        
        const positions = floatingParticles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.003;
            
            // Reset if too far
            if (positions[i + 1] > 10) positions[i + 1] = -10;
            if (positions[i + 1] < -10) positions[i + 1] = 10;
        }
        floatingParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
}

// Initialize when page loads
window.addEventListener('load', () => {
    const canvas3d = document.getElementById('scene3d');
    if (canvas3d) {
        init3DScene();
    } else {
        console.error('Canvas scene3d not found in DOM');
    }
});
