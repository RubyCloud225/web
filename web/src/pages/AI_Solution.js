import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { createRenderer } from "../utils/threeRenderer";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function AISolutionPage() {
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    const renderer = createRenderer();
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
      <SEO
        title="AI Solutions | Curat-ify"
        description="We build custom AI solutions to optimize business operations and improve customer experiences."
        canonical={`${DOMAIN}/ai_solutions`}
        url={`${DOMAIN}/ai_solutions`}
        image={`${DOMAIN}/assets/ai-og-image.png`}
        twitterHandle="@curatifyai"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Solutions",
          "description": "We build custom AI solutions to optimize business operations and improve customer experiences.",
          "url": `${DOMAIN}/ai_solutions`
        }}
      />
      <div id="three-container" className="absolute inset-0 z-0" />
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-white/90 shadow-md" : "bg-white/60"} backdrop-blur-md`}
      >
        <div className="text-xl font-bold text-slate-800">Curat-ify</div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`md:flex space-x-4 ${menuOpen ? "flex flex-col absolute top-20 left-0 w-full bg-white/90 p-4" : "hidden"} md:static md:flex-row md:bg-transparent md:p-0`}>
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
          We build AI Solutions that transform your business<br>
          </br>
          <span className="text-blue-600">with innovation and intelligence</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl mb-6"
        >
          From AI chatbots to predictive analytics, we leverage the power of AI to enhance your operations and customer experience.
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-10 w-full overflow-x-auto whitespace-nowrap px-4 py-6">
            <div className="inline-flex space-x-6">
              {[
                "Custom AI Models", 
                "Chatbot Development",
                "Predictive Analytics",
                "Computer Vision",
                "AI Strategy Consulting",
                "Process Automation",
                "Data Engineering",
                "NLP Solutions"
              ].map((service, index) => (
                <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="min-w-[250px] bg-blue-50 text-blue-900 rounded-lg px-6 py-4 shadow-md border border-blue-200">
                  <h3 className="text-lg font-semibold">{service}</h3>
                </motion.div>
              ))}
            </div>
        </motion.div>
        <footer className="fixed bottom-0 left-0 w-full z-10 bg-white/80 backdrop-blur-md text-slate-700 text-xs px-4 py-2 shadow-t border-t border-gray-200 flex flex-wrap justify-between items-center">
          <div className="w-full flex flex-wrap justify-between items-center text-center sm:text-left">
            <div className="font-semibold text-sm">© {new Date().getFullYear()} Curat-ify</div>
            <div className="flex space-x-4 text-xs">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/ai_solutions" className="hover:underline">AI</Link>
              <Link to="/web_design" className="hover:underline">Design</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
            <div className="text-[10px] text-gray-500 mt-1 sm:mt-0">Curatify Consultants Ltd, 3rd Floor 45 Albemarle Street, London W1S 4JL</div>
          </div>
        </footer>
      </div>
      
    </div>
  );
}
