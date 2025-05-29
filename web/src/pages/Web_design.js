import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Link } from "react-router-dom";

export default function WebDesignPage() {
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const mount = document.getElementById("three-container");
    mount.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 100;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xddddff, size: 0.2 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xbbccff, transparent: true, opacity: 0.4 });
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = 5;
    const lines = new Float32Array(PARTICLE_COUNT * maxConnections * 3 * 2);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(lines, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 20;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array;
      const linePos = lineGeometry.attributes.position.array;
      let ptr = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let ix = i * 3;
        let x = pos[ix], y = pos[ix + 1], z = pos[ix + 2];

        let connections = 0;
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          if (connections >= maxConnections) break;

          let jx = j * 3;
          let dx = pos[jx] - x;
          let dy = pos[jx + 1] - y;
          let dz = pos[jx + 2] - z;
          let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 5) {
            linePos[ptr++] = x;
            linePos[ptr++] = y;
            linePos[ptr++] = z;
            linePos[ptr++] = pos[jx];
            linePos[ptr++] = pos[jx + 1];
            linePos[ptr++] = pos[jx + 2];
            connections++;
          }
        }
      }

      lineGeometry.setDrawRange(0, ptr / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <div id="three-container" className="absolute inset-0 z-0" />
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-white/90 shadow-md" : "bg-white/60"} backdrop-blur-md`}
      >
        <div className="text-xl font-bold text-slate-800">Curat-ify</div>
        <div className="space-x-4">
          <Link to="/" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-block">Home</Link>
          <Link to="/ai_solutions" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-block">AI Solutions</Link>
          <Link to="/web_design" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-block">Web Design</Link>
          <Link to="/contact" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-block">Contact</Link>
        </div>
      </motion.nav>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-slate-800 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          We design cutting edge landing page to suit your brand<br>
          </br>
          <span className="text-blue-600">with innovation and intelligence</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl mb-6"
        >
          from innovative web designs to intelligent AI solutions, we create experiences that captivate and convert. <br />
          With our hosting service and AI solutions, we ensure your website is not only stunning but also optimized for performance and user engagement.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button onClick={() => window.open('https://github.com/your-github-username', '_blank', 'noopener')} className="mr-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">View Portfolio</button>
          <button onClick={() => window.open('https://calendly.com/your-username/meeting', '_blank', 'noopener')} className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white">
            Schedule a Call
          </button>
        </motion.div>
      </div>
    </div>
  );
}
