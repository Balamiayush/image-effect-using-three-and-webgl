import "./style.css";
import * as THREE from "three";

class Site {
  constructor({ dom }) {
    this.time = 0;
    this.container = dom;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.images = [...document.querySelectorAll(".images img")];
    this.material = null;
    this.imagesStore = [];
    this.uStartIndex = 0;
    this.uEndIndex = 1;

    // Create scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.z = 200;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 200) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // smooth edges
      alpha: true, // transparency
    });

    // ✅ FIX: use "this.renderer", not "renderer"
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    // Add objects and start render loop
    // this.addObjects();
    this.addImages();
    this.render();
  }
  //Adding Images
  addImages() {
    const textureLoader = new THREE.TextureLoader();
    const textures = this.images.map((img) => textureLoader.load(img));
    const uniforms = {
      uTime: { value: 0 },
      uImage: { value: textures[0] },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
    });
    this.images.forEach((img) => {
      const bounds = img.getBoundingClientRect();
      const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height);
      const mesh = new THREE.Mesh(geometry, this.material);
      this.scene.add(mesh);
      this.imagesStore.push({
        img: img,
        mesh: mesh,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
      });
    });
  }

  render() {
    // Animation loop
    this.time += 0.05;

    this.renderer.render(this.scene, this.camera);

    // ✅ Enable continuous animation
    requestAnimationFrame(this.render.bind(this));
  }
}

new Site({
  dom: document.querySelector(".canvas"),
});
