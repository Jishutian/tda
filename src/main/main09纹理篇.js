import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// 导入GUI
import * as dat from 'dat.gui'
import { BufferAttribute } from 'three';
// console.log(THREE)
// 目标： 创建纹理
// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机 摄像机视锥体垂直视野角度  摄像机视锥体长宽比 摄像机视锥体近端面 摄像机视锥体远端面
const camear = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置 x y z 默认0 0 0 
camear.position.set(0, 0, 10)
// 相机添加进场景
scene.add(camear);
// 创建纹理
const textureLoad = new THREE.TextureLoader();
// 创建贴图
const doorColorTextture = textureLoad.load('/textures/door/color.jpg');
// 纹理偏移
// doorColorTextture.offset.x = 0.5;
// doorColorTextture.offset.y = 0.5;
// doorColorTextture.offset.set(0.5,0.5);
// 设置旋转
// doorColorTextture.rotation = Math.PI/4;
// 设置旋转中心点
// doorColorTextture.center.x = 0.5;
// doorColorTextture.center.y = 0.5;
// doorColorTextture.center.set(0.5,0.5);
// 设置纹理重复次数
// doorColorTextture.repeat.x = 2 ;   
// doorColorTextture.repeat.y = 3 ;    
// doorColorTextture.repeat.set(4,6);
// 设置纹理水平方向重复方式 这里设置的方式用到了three.js的常量，具体看文档
// doorColorTextture.wrapS = THREE.MirroredRepeatWrapping; //镜像重复
// doorColorTextture.wrapT = THREE.RepeatWrapping; //正常重复

// 像素级别纹理算法 值为常量，具体有什么值还是得看文档
const doorColorTextture2 = textureLoad.load('/textures/minecraft.png');
doorColorTextture2.minFilter = THREE.NearestMipmapNearestFilter;
doorColorTextture2.magFilter = THREE.NearestFilter;
// 创建透明纹理
const doorColorTextture3 = textureLoad.load('/textures/door/alpha.jpg');
// 导入环境切图
const doorColorTextture4 = textureLoad.load('/textures/door/ambientOcclusion.jpg');


const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const planeGeometry = new THREE.PlaneGeometry(2, 2)
// 将贴图赋值给材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'ffffff', map: doorColorTextture }); //创建材质
const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 'ffffff', map: doorColorTextture2 }); //创建材质
const cubeMaterial3 = new THREE.MeshBasicMaterial({ color: 'ffffff', map: doorColorTextture, alphaMap: doorColorTextture3, transparent: true, 
side: THREE.DoubleSide,aoMap:doorColorTextture4,aoMapIntensity:1
}); //创建透明材质

// 环境切图需要设置第二组UV
console.log(planeGeometry)
planeGeometry.setAttribute('uv2',new BufferAttribute(planeGeometry.attributes.uv.array,2))
cubeGeometry.setAttribute('uv2',new BufferAttribute(cubeGeometry.attributes.uv.array,2))

// 根据几何体和材质创建物理
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);
const cube4 = new THREE.Mesh(planeGeometry, cubeMaterial3);


cube2.position.x = 2;
cube3.position.y = 2;
cube4.position.x = -2;
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);


// 添加物体

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
// document.addEventListener('dblclick', function () {
//     const fullScrenElment = document.fullscreenElement;
//     if (!fullScrenElment) {
//         // 进入全屏
//         renderer.domElement.requestFullscreen();
//     } else {
//         // 退出全屏
//         document.exitFullscreen()
//     }
// })
render();
// 监听屏幕变化，更新画面渲染
// window.addEventListener('resize', () => {
//     // 更新摄像头
//     camear.aspect = window.innerWidth / window.innerHeight;
//     // 更新相机矩阵投影
//     camear.updateProjectionMatrix();
//     // 更新渲染器
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // 设置渲染器的像素比
//     renderer.setPixelRatio(window.devicePixelRatio)
// })