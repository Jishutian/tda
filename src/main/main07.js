import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// 导入GUI
import * as dat from 'dat.gui'
import { BufferAttribute } from 'three';
// console.log(THREE)
// 目标： 使用缓冲几何体创建一个正方形 
// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机 摄像机视锥体垂直视野角度  摄像机视锥体长宽比 摄像机视锥体近端面 摄像机视锥体远端面
const camear = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置 x y z 默认0 0 0 
camear.position.set(0, 0, 10)
// 相机添加进场景
scene.add(camear);

// 添加物体
const cubeGeometry = new THREE.BufferGeometry(); // 创建缓冲几何体
const certices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,

])
cubeGeometry.setAttribute('position', new BufferAttribute(certices, 3))
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); //创建材质
// 根据几何体和材质创建物理
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体合体添加进场景
scene.add(cube);
// 使用gui插件调整物体

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加岛Body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camear);

// 创建轨道控制器
const controls = new OrbitControls(camear, renderer.domElement);
// 设置控制器阻尼 需要在渲染的时候update一下
controls.enableDamping = true;
// 添加坐标轴辅助线
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
function render() {
    renderer.render(scene, camear);
    requestAnimationFrame(render);
}
// 双击让画布全屏展示
document.addEventListener('dblclick', function () {
    const fullScrenElment = document.fullscreenElement;
    if (!fullScrenElment) {
        // 进入全屏
        renderer.domElement.requestFullscreen();
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
})
render();
// 监听屏幕变化，更新画面渲染
window.addEventListener('resize', () => {
    // 更新摄像头
    camear.aspect = window.innerWidth / window.innerHeight;
    // 更新相机矩阵投影
    camear.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})