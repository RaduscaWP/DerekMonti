import * as THREE from 'three';

export function initParticles(canvas) {
  if (!canvas || window.innerWidth < 768) {
    return () => {};
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025,
    transparent: true,
    opacity: 0.42,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 5;

  let frameId;
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.00008;
    const current = geometry.attributes.position.array;
    for (let i = 1; i < current.length; i += 3) {
      current[i] += 0.0012;
      if (current[i] > 6) current[i] = -6;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  };

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener('resize', resize, { passive: true });
  animate();

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
