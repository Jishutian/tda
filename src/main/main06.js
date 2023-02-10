import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// 导入GUI
import * as dat from 'dat.gui'
// console.log(THREE)
// 目标： 引入了dat.tui插件，可以直接通过控制面板调整属性
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
// 使用gui插件调整物体
const gui = new dat.GUI();
gui.add(cube.position,'x').min(0).max(5).step(0.01).onChange((value)=>{}).onFinishChange(value=>{
    console.log(value)
})
const param ={
    color:'#ff0000',
    fn:()=>{
        gsap.to(cube.position,{x:5,duration:3,yoyo:true,repeat:-1})
    }
}
gui.addColor(param,'color').name('颜色').onChange(value=>{
    // cube.material.color.set(value)
}).onFinishChange(value=>{
    cube.material.color.set(value)
})
gui.add(cube,'visible').name('是否显示');
const fileD = gui.addFolder('设置目录1');
fileD.add(param,'fn').name('点击事件')
fileD.add(cube.material,'wireframe')
console.log(cube.material,'wireframe')
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
    if(!fullScrenElment){
        // 进入全屏
        renderer.domElement.requestFullscreen();
    }else{
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