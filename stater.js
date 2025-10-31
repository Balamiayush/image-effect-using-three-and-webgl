import "./style.css";
import * as THREE from "three";

class Site {
  constructor({ dom }) {
    this.time = 0;
    this.render();
    this.container = dom;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.images = [...document.querySelectorAll(".images img")];
    this.material;
    this.imagesStore = [];
    this.uStartIndex = 0;
    this.uEndIndex = 1;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }
  render() {
    // this.time += 0.05;
    // Uncomment the line below to enable continuous rendering updates times

    this.time++;
    console.log(this.time, this.container, this.images);

    // window.requestAnimationFrame(this.render.bind(this));
  }
}
new Site({
  dom: document.querySelector(".canvas"),
});
