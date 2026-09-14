import * as THREE from './vendor/three.module.js';
const canvas=document.querySelector('#justice');
try{
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,1.3,12);camera.lookAt(0,.1,0);
scene.add(new THREE.HemisphereLight(0xfff5dc,0x343e2c,3));
function light(color,intensity,x,y,z){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l)}light(0xffe3a2,5,-4,6,5);light(0xffffff,4,5,3,-1);light(0xb39455,2,0,-3,4);
const gold=new THREE.MeshStandardMaterial({color:0xc2a05a,metalness:.78,roughness:.25}),edge=new THREE.MeshStandardMaterial({color:0xf1d295,metalness:.7,roughness:.2}),black=new THREE.MeshStandardMaterial({color:0x24291f,metalness:.35,roughness:.33});
const root=new THREE.Group();scene.add(root);
function mesh(geometry,material,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m}
function cyl(rt,rb,h,material,parent,x=0,y=0,z=0){return mesh(new THREE.CylinderGeometry(rt,rb,h,64),material,parent,x,y,z)}
function rod(a,b,r,material,parent){const d=new THREE.Vector3().subVectors(b,a);const m=cyl(r,r,d.length(),material,parent);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m}
cyl(1.23,1.36,.17,black,root,0,-2.15);cyl(1.22,1.24,.055,edge,root,0,-2.04);cyl(.98,1.17,.18,gold,root,0,-1.93);cyl(.45,.81,.19,gold,root,0,-1.75);cyl(.22,.4,.22,edge,root,0,-1.56);cyl(.115,.2,2.95,gold,root,0,0);cyl(.22,.22,.08,edge,root,0,1.42);mesh(new THREE.SphereGeometry(.18,32,24),edge,root,0,1.67);const finial=mesh(new THREE.OctahedronGeometry(.22),gold,root,0,1.98);finial.scale.y=1.5;
for(let i=0;i<16;i++){const a=i/16*Math.PI*2;rod(new THREE.Vector3(Math.cos(a)*.16,-1.36,Math.sin(a)*.16),new THREE.Vector3(Math.cos(a)*.105,1.31,Math.sin(a)*.105),.014,edge,root)}
const beam=new THREE.Group();beam.position.y=1.43;root.add(beam);
rod(new THREE.Vector3(-2.04,0,0),new THREE.Vector3(2.04,0,0),.065,gold,beam);
for(const sign of [-1,1]){rod(new THREE.Vector3(0,.19,0),new THREE.Vector3(sign*2.04,0,0),.028,edge,beam);mesh(new THREE.SphereGeometry(.1,24,16),edge,beam,sign*2.04,0,0)}
const bowls=[];
for(const sign of [-1,1]){const pan=new THREE.Group();pan.position.set(sign*1.96,0,0);beam.add(pan);bowls.push(pan);
const points=[new THREE.Vector2(0,0),new THREE.Vector2(.16,.014),new THREE.Vector2(.38,.09),new THREE.Vector2(.61,.23),new THREE.Vector2(.78,.4),new THREE.Vector2(.8,.43)];const material=gold.clone();material.side=THREE.DoubleSide;mesh(new THREE.LatheGeometry(points,80),material,pan,0,-2.12);
const ring=mesh(new THREE.TorusGeometry(.8,.027,12,80),edge,pan,0,-1.69);ring.rotation.x=Math.PI/2;
for(let j=0;j<3;j++){const a=j/3*Math.PI*2+Math.PI/6;rod(new THREE.Vector3(0,-.06,0),new THREE.Vector3(.78*Math.cos(a),-1.69,.78*Math.sin(a)),.014,edge,pan)}
mesh(new THREE.SphereGeometry(.065,16,16),edge,pan,0,-.07);}
const orbit=mesh(new THREE.TorusGeometry(3.5,.006,6,160),new THREE.MeshBasicMaterial({color:0x8a794f,transparent:true,opacity:.25}),scene);orbit.rotation.set(.5,.6,0);
root.rotation.set(.08,-.35,0);
let width=0,height=0;function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=camera.aspect<.8?14:12;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(canvas);resize();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;new IntersectionObserver(e=>{visible=e[0].isIntersecting}).observe(canvas);let targetX=0,targetY=0;canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*.15;targetY=((e.clientY-r.top)/r.height-.5)*.1});canvas.addEventListener('pointerleave',()=>{targetX=targetY=0});
function frame(t){requestAnimationFrame(frame);if(!visible)return;const scroll=Math.min(scrollY/innerHeight,1.4);if(!reduced.matches){root.rotation.y+=(-.35+scroll*.9+targetX-root.rotation.y)*.045;root.rotation.x+=(.08+targetY-root.rotation.x)*.04;beam.rotation.z=Math.sin(t*.0006+scroll*2)*.07;for(const p of bowls)p.rotation.z=-beam.rotation.z;root.position.y=Math.sin(t*.00065)*.035-scroll*.12;orbit.rotation.z=scroll*.3;}renderer.render(scene,camera)}requestAnimationFrame(frame);canvas.parentElement.classList.add('scene-ready');
}catch(e){console.warn('Visualização 3D indisponível',e)}
