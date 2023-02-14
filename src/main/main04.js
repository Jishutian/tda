import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// console.log(THREE)
// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机 摄像机视锥体垂直视野角度  摄像机视锥体长宽比 摄像机视锥体近端面 摄像机视锥体远端面
const camear = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置 x y z 默认0 0 0 
camear.position.set(0, 0, 10)
// 相机添加进场景
scene.add(camear);

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 创建几何体
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); //创建材质
// 根据几何体和材质创建物理
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体合体添加进场景
scene.add(cube);
// cube.scale.set(0.5,0.5,0.5)
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
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
// 设置时钟
gsap.to(cube.position, {
    x: 10, duration: 2, ease: 'power1.in', 
    // 延时启动
    delay:1,
    // 循环次数 -1为无限循环
    repeat:-1,
    // 往返运动
    yoyo:true,
    onComplete: () => {
        console.log('动画结束')
    }, onStart: () => {
        console.log('动画开始')
    },
});
gsap.to(cube.rotation, { x: 5 * Math.PI, duration: 2, ease: 'power1.in', // 延时启动
delay:1,
// 循环次数 -1为无限循环
repeat:-1,
// 往返运动
yoyo:true,
onComplete: () => {
    console.log('动画结束')
}, onStart: () => {
    console.log('动画开始')
},});
const clock = new THREE.Clock();
function render(time) {
    controls.update();
    renderer.render(scene, camear);
    requestAnimationFrame(render);
}

render()