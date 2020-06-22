import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import $ from 'jquery';
import { game } from './index'

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

camera.position.set(0, 10, 0);
camera.lookAt(new Vector3(0, 0, 0));

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0E1413, 1);

const onAnimationFrameHandler = (timestamp) => {
    renderer.render(scene, camera);
    game.update(timestamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

$('body').append(renderer.domElement);

export { scene, camera, renderer }