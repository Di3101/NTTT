// ==================== GALAXY 3D SCENE WITH RUBIK CUBE ====================
let galaxyScene, galaxyCamera, galaxyRenderer, controls, raycaster, mouse;
let magicCube, magicDust, galaxyParticles;
let photoMeshes = [];
let animationId;

function initGalaxy3D() {
    console.log('Initializing Galaxy 3D Scene...');
    
    const container = document.getElementById('giftReveal');
    if (!container) {
        console.error('Gift reveal container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Kiểm tra nếu là mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // UI cho Controls - Responsive
    const infoDiv = document.createElement('div');
    infoDiv.style.cssText = `position: fixed; bottom: ${isMobile ? '15px' : '30px'}; left: 50%; transform: translateX(-50%); z-index: 10000; text-align: center; background: rgba(0,0,0,0.85); padding: ${isMobile ? '12px 20px' : '20px 30px'}; border-radius: 15px; color: white; border: 2px solid #ff6b9d; font-family: Arial; max-width: 90%;`;
    infoDiv.innerHTML = `
        <div style="margin-bottom: 8px; font-size: ${isMobile ? '1rem' : '1.2rem'}; font-weight: bold; color: #ff6b9d;">✨ Khối Rubik Kỷ Niệm ✨</div>
        <div style="font-size: ${isMobile ? '0.85rem' : '1rem'};">${isMobile ? '👆 Chạm để xoay | 🔍 Pinch zoom | 👆 Tap khối Rubik' : '🖐️ Kéo chuột để xoay | 🔍 Cuộn để zoom | 👆 Click khối Rubik'}</div>
    `;
    document.body.appendChild(infoDiv);
    
    // Scene setup
    galaxyScene = new THREE.Scene();
    galaxyScene.background = new THREE.Color(0x0a0a1a);
    galaxyScene.fog = new THREE.FogExp2(0x0a0a1a, 0.0003);
    
    // Camera
    galaxyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    galaxyCamera.position.set(0, 50, 150);
    
    // Renderer - Tối ưu cho mobile
    galaxyRenderer = new THREE.WebGLRenderer({ 
        antialias: !isMobile, // Tắt antialias trên mobile để tăng performance
        alpha: false,
        powerPreference: 'high-performance' // Ưu tiên performance
    });
    galaxyRenderer.setSize(window.innerWidth, window.innerHeight);
    galaxyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)); // Giới hạn pixelRatio trên mobile
    container.appendChild(galaxyRenderer.domElement);
    
    // OrbitControls - Hỗ trợ touch cho mobile
    controls = new THREE.OrbitControls(galaxyCamera, galaxyRenderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = isMobile ? 0.3 : 0.5; // Xoay chậm hơn trên mobile
    controls.minDistance = 50;
    controls.maxDistance = 300;
    controls.touches = { // Cấu hình touch gestures
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
    };
    
    // Raycaster for click detection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    galaxyScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff6b9d, 2, 300);
    pointLight.position.set(0, 50, 50);
    galaxyScene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x48dbfb, 1, 200);
    pointLight2.position.set(-50, -30, -50);
    galaxyScene.add(pointLight2);
    
    // Create scene objects
    createGalaxyParticles();
    createMagicCube();
    createMagicDust();
    createPhotoGallery();
    
    // Event listeners
    window.addEventListener('click', onSceneClick);
    window.addEventListener('touchstart', onSceneClick); // Hỗ trợ touch cho mobile
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
    
    console.log('Galaxy 3D initialized successfully');
}

// Create background galaxy particles
function createGalaxyParticles() {
    // Giảm particles trên mobile để tăng performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const count = isMobile ? 3000 : 8000; // Mobile: 3000, Desktop: 8000
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    
    galaxyParticles = new THREE.Points(geometry, material);
    galaxyScene.add(galaxyParticles);
}

// Create Magic Rubik Cube
function createMagicCube() {
    const loader = new THREE.TextureLoader();
    
    // Photo URLs for 6 faces - SỬ DỤNG 4 ẢNH KHÁC NHAU
    const photoUrls = [
        'images/photo1.jpg', // Front
        'images/photo2.jpg', // Back
        'images/photo3.jpg', // Top
        'images/photo4.jpg', // Bottom
        'images/photo1.jpg', // Right (lặp lại ảnh 1)
        'images/photo3.jpg'  // Left (lặp lại ảnh 3)
    ];
    
    // Create materials for each face
    const materials = photoUrls.map((url, index) => {
        const texture = loader.load(
            url,
            undefined,
            undefined,
            () => {
                // Fallback colors if image fails
                const fallbackColors = [0xff6b9d, 0x48dbfb, 0xfeca57, 0xff9ff3, 0xc06c84, 0x00d2d3];
                const mat = new THREE.MeshStandardMaterial({
                    color: fallbackColors[index],
                    emissive: fallbackColors[index],
                    emissiveIntensity: 0.3
                });
                materials[index] = mat;
            }
        );
        
        return new THREE.MeshStandardMaterial({
            map: texture,
            emissive: 0x222222,
            emissiveIntensity: 0.1
        });
    });
    
    // Create cube
    const geometry = new THREE.BoxGeometry(30, 30, 30);
    magicCube = new THREE.Mesh(geometry, materials);
    magicCube.position.set(0, 0, 0);
    magicCube.userData.isCube = true;
    
    // Add glowing edges
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: 0xff6b9d,
        linewidth: 2
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    magicCube.add(edges);
    
    galaxyScene.add(magicCube);
}

// Create magic dust particles around cube
function createMagicDust() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const geometry = new THREE.BufferGeometry();
    const count = isMobile ? 1000 : 2000; // Mobile: 1000, Desktop: 2000
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPalette = [
        { r: 1, g: 0.42, b: 0.62 },  // Pink
        { r: 1, g: 0.84, b: 0.0 },   // Gold
        { r: 0.28, g: 0.86, b: 0.98 }, // Cyan
        { r: 1, g: 0.62, b: 0.95 }   // Light pink
    ];
    
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 50 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    magicDust = new THREE.Points(geometry, material);
    galaxyScene.add(magicDust);
}

// Create floating photo gallery - 10 ẢNH KHÁC NHAU BAY XUNG QUANH
function createPhotoGallery() {
    const loader = new THREE.TextureLoader();
    
    // DANH SÁCH 10 ẢNH KHÁC NHAU - Bạn thêm 10 file ảnh vào thư mục images/
    const photoList = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',  // THÊM ẢNH MỚI
        'images/photo6.jpg',  // THÊM ẢNH MỚI
        'images/photo7.jpg',  // THÊM ẢNH MỚI
        'images/photo8.jpg',  // THÊM ẢNH MỚI
        'images/photo9.jpg',  // THÊM ẢNH MỚI
        'images/photo10.jpg'  // THÊM ẢNH MỚI
    ];
    
    const photoCount = photoList.length;
    
    for (let i = 0; i < photoCount; i++) {
        // Load ảnh theo thứ tự từ danh sách
        const texture = loader.load(photoList[i]);
        
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(12, 16), // Giảm size một chút để nhiều ảnh hơn
            new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.85
            })
        );
        
        const angle = (i / photoCount) * Math.PI * 2;
        const radius = 85; // Tăng radius để không bị chen chúc
        
        mesh.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 40,
            Math.sin(angle) * radius
        );
        
        mesh.lookAt(0, 0, 0);
        mesh.userData.isPhoto = true;
        mesh.userData.angle = angle;
        mesh.userData.radius = radius;
        
        galaxyScene.add(mesh);
        photoMeshes.push(mesh);
    }
}

// Handle click on scene
function onSceneClick(event) {
    // Xử lý cả mouse và touch
    const clientX = event.clientX || (event.touches && event.touches[0].clientX);
    const clientY = event.clientY || (event.touches && event.touches[0].clientY);
    
    if (!clientX || !clientY) return;
    
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, galaxyCamera);
    const intersects = raycaster.intersectObjects(galaxyScene.children, true);
    
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        
        // Check if clicked on cube or its children
        if (obj.parent?.userData?.isCube || obj.userData?.isCube) {
            showSecretMessage();
            controls.autoRotate = false;
        }
    }
}

// Show secret message popup
function showSecretMessage() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Remove existing popup if any
    const existing = document.getElementById('secret-popup');
    if (existing) existing.remove();
    
    const popup = document.createElement('div');
    popup.id = 'secret-popup';
    popup.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(192, 108, 132, 0.95));
        padding: ${isMobile ? '30px 25px' : '50px 60px'}; border-radius: 20px; color: white; text-align: center;
        z-index: 11000; box-shadow: 0 20px 60px rgba(255, 107, 157, 0.7);
        backdrop-filter: blur(15px); max-width: ${isMobile ? '85%' : '500px'}; width: ${isMobile ? '85%' : 'auto'};
        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    popup.innerHTML = `
        <h2 style="margin: 0 0 20px 0; font-size: ${isMobile ? '1.5rem' : '2.2rem'}; color: white;">💝 Gửi Em Bé Của Anh...</h2>
        <p style="line-height: 1.6; font-size: ${isMobile ? '1rem' : '1.2rem'}; margin-bottom: 25px;">
            Chúc mừng sinh nhật người con gái tuyệt vời nhất thế giới! <br><br>
            Cảm ơn em đã đến bên anh. Mỗi mặt của khối Rubik này đều là 
            những khoảnh khắc đẹp nhất của chúng mình. ❤️
        </p>
        <button onclick="closeSecretMessage()" style="
            padding: ${isMobile ? '12px 25px' : '15px 35px'}; font-size: ${isMobile ? '1rem' : '1.1rem'}; cursor: pointer;
            background: white; color: #ff6b9d; border: none; border-radius: 12px;
            font-weight: bold; box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: all 0.3s;">
            Đóng lại 💕
        </button>
    `;
    
    document.body.appendChild(popup);
}

// Close secret message
window.closeSecretMessage = function() {
    const popup = document.getElementById('secret-popup');
    if (popup) {
        popup.style.transition = 'all 0.4s ease';
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => popup.remove(), 400);
    }
    if (controls) {
        controls.autoRotate = true;
    }
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Rotate cube smoothly
    if (magicCube) {
        magicCube.rotation.y += 0.005;
        magicCube.rotation.x += 0.002;
    }
    
    // Rotate magic dust
    if (magicDust) {
        magicDust.rotation.y -= 0.002;
        magicDust.rotation.x += 0.001;
    }
    
    // Rotate background particles
    if (galaxyParticles) {
        galaxyParticles.rotation.y += 0.0005;
    }
    
    // Animate floating photos
    photoMeshes.forEach((mesh, index) => {
        const angle = mesh.userData.angle + time * 0.1;
        mesh.position.x = Math.cos(angle) * mesh.userData.radius;
        mesh.position.z = Math.sin(angle) * mesh.userData.radius;
        mesh.lookAt(galaxyCamera.position);
    });
    
    // Update controls
    if (controls) {
        controls.update();
    }
    
    galaxyRenderer.render(galaxyScene, galaxyCamera);
}

// Window resize handler
function onWindowResize() {
    if (galaxyCamera && galaxyRenderer) {
        galaxyCamera.aspect = window.innerWidth / window.innerHeight;
        galaxyCamera.updateProjectionMatrix();
        galaxyRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Cleanup function
function cleanupGalaxy3D() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    window.removeEventListener('click', onSceneClick);
    window.removeEventListener('resize', onWindowResize);
    
    if (controls) {
        controls.dispose();
    }
    
    if (galaxyRenderer) {
        galaxyRenderer.dispose();
    }
}

// Export functions
window.initGalaxy3D = initGalaxy3D;
window.cleanupGalaxy3D = cleanupGalaxy3D;
