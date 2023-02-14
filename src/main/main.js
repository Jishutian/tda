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


// 像素级别纹理算法 值为常量，具体有什么值还是得看文档
const doorColorTextture2 = textureLoad.load('/textures/minecraft.png');
doorColorTextture2.minFilter = THREE.NearestMipmapNearestFilter;
doorColorTextture2.magFilter = THREE.NearestFilter;
// 创建透明纹理
const doorColorTextture3 = textureLoad.load('/textures/door/alpha.jpg');
// 导入环境切图
const doorColorTextture4 = textureLoad.load('/textures/door/ambientOcclusion.jpg');
// 导入置换贴图
const doorColorTextture5 = textureLoad.load('/textures/door/height.jpg');
// 导入粗糙度贴图
const doorColorTextture6 = textureLoad.load('/textures/door/roughness.jpg');
// 导入金属贴图
const doorColorTextture7 = textureLoad.load('/textures/door/metalness.jpg');
// 导入法线贴图
const doorColorTextture8 = textureLoad.load('/textures/door/normal.jpg',function(e){
    console.log(222)
});
const loadImg = new THREE.LoadingManager();

loadImg.onStart  = function(e){
    console.log(111);
}



const cubeGeometry = new THREE.BoxGeometry(2, 2, 2,200,200,200);
const planeGeometry = new THREE.PlaneGeometry(2, 2,200,200)
// 将贴图赋值给材质
const cubeMaterial3 = new THREE.MeshStandardMaterial({ color: 'ffffff', map: doorColorTextture, alphaMap: doorColorTextture3, transparent: true, 
side: THREE.DoubleSide,aoMap:doorColorTextture4,aoMapIntensity:1,displacementMap:doorColorTextture5,displacementScale:0.15,
roughnessMap:doorColorTextture6,roughness:1,metalnessMap:doorColorTextture7,metalness:1,
normalMap:doorColorTextture8
}); //创建透明材质

// 环境切图需要设置第二组UV
planeGeometry.setAttribute('uv2',new BufferAttribute(planeGeometry.attributes.uv.array,2))
cubeGeometry.setAttribute('uv2',new BufferAttribute(cubeGeometry.attributes.uv.array,2))

// 根据几何体和材质创建物理
const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);
const cube4 = new THREE.Mesh(planeGeometry, cubeMaterial3);
cube4.position.x = 2;
scene.add(cube3);
scene.add(cube4);

// 添加灯光
// 环境光
// const light = new THREE.AmbientLight(0xffffff,0.5);
// scene.add(light)
// 平行光
const direcLight = new THREE.DirectionalLight(0xffffff,1);
direcLight.position.set(10,10,10)
scene.add(direcLight)
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
render();
