import{W as pe,S as me,P as ue,T as he,B as te,V as c,F as we,a as ge,b as fe,c as Me,d as ye,A as ae,G as F,M as f,e as R,f as U,g as xe,L as Se,h as De,C as be,i as oe,R as ze,D as Ce,j as ne,k as Pe,l as Ae}from"./three.module-BCYyolF5.js";import{B as W,D as Ne,O as Fe}from"./index-DuDgj-nB.js";const M=1,l=Ae.degToRad;function Re(o,d,a=M){const i=l(o),s=l(d);return new c(a*Math.cos(i)*Math.cos(s),a*Math.sin(i),-a*Math.cos(i)*Math.sin(s))}const re=`
varying vec2 vUv; varying vec3 vN; varying vec3 vP;
void main() {
  vUv = uv;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0); vP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ue=`
uniform sampler2D dayMap; uniform sampler2D nightMap; uniform sampler2D specMap; uniform vec3 sunDir;
varying vec2 vUv; varying vec3 vN; varying vec3 vP;
void main() {
  vec3 n = normalize(vN);
  float d = dot(n, sunDir);
  vec3 day = texture2D(dayMap, vUv).rgb;
  vec3 night = texture2D(nightMap, vUv).rgb;
  float lit = max(d, 0.0);
  vec3 col = day * (0.04 + 1.1 * pow(lit, 0.8));
  float tw = smoothstep(-0.12, 0.0, d) * (1.0 - smoothstep(0.0, 0.22, d));
  col += vec3(0.55, 0.22, 0.05) * tw * 0.22;
  vec3 v = normalize(cameraPosition - vP);
  vec3 h = normalize(sunDir + v);
  float spec = pow(max(dot(n, h), 0.0), 60.0) * texture2D(specMap, vUv).r * lit;
  col += vec3(1.0, 0.94, 0.82) * spec * 0.55;
  vec3 nightCol = night * 1.25 * (1.0 - smoothstep(-0.18, 0.04, d));
  col = mix(nightCol + day * 0.025, col, smoothstep(-0.1, 0.12, d));
  float fr = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  col += vec3(0.35, 0.6, 1.0) * fr * 0.45 * smoothstep(-0.25, 0.35, d);
  gl_FragColor = vec4(col, 1.0);
}`,We=`
uniform sampler2D cloudMap; uniform vec3 sunDir;
varying vec2 vUv; varying vec3 vN; varying vec3 vP;
void main() {
  float a = texture2D(cloudMap, vUv).r;
  float d = dot(normalize(vN), sunDir);
  float lit = smoothstep(-0.08, 0.25, d);
  gl_FragColor = vec4(vec3(0.95) * (0.08 + 0.92 * lit), a * 0.8 * (0.25 + 0.75 * lit));
}`,Be=`
varying vec3 vN; varying vec3 vNW;
void main() { vN = normalize(normalMatrix * normal); vNW = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ge=`
uniform vec3 sunDir; varying vec3 vN; varying vec3 vNW;
void main() {
  float i = pow(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 4.0);
  float s = smoothstep(-0.4, 0.4, dot(vNW, sunDir));
  gl_FragColor = vec4(vec3(0.3, 0.6, 1.0) * i * (0.15 + 0.85 * s), 1.0);
}`;function Le(){const o=document.createElement("canvas");o.width=o.height=128;const d=o.getContext("2d"),a=d.createRadialGradient(64,64,0,64,64,64);return a.addColorStop(0,"rgba(255,255,240,1)"),a.addColorStop(.18,"rgba(255,236,170,0.95)"),a.addColorStop(.45,"rgba(255,190,90,0.25)"),a.addColorStop(1,"rgba(255,160,60,0)"),d.fillStyle=a,d.fillRect(0,0,128,128),new Pe(o)}function Te(o,d="./"){const a=new pe({canvas:o,antialias:!0,alpha:!1,powerPreference:"low-power"});a.setPixelRatio(Math.min(1.75,window.devicePixelRatio||1)),a.setClearColor(198156);const i=new me,s=new ue(38,1,.1,200),u=new c(1,0,0),se=new he,y=e=>new Promise((t,n)=>se.load(d+"tex/"+e,r=>{r.anisotropy=4,t(r)},void 0,n)),B=new te,G=[];for(let e=0;e<1800;e++){const t=new c().randomDirection().multiplyScalar(60);G.push(t.x,t.y,t.z)}B.setAttribute("position",new we(G,3)),i.add(new ge(B,new fe({color:16777215,size:1.3,sizeAttenuation:!1,transparent:!0,opacity:.75})));const z=new Me(new ye({map:Le(),depthWrite:!1,blending:ae}));z.position.copy(u).multiplyScalar(40),z.scale.set(14,14,1),i.add(z);const v=new F;i.add(v);const h=new F;v.add(h);const x={dayMap:{value:null},nightMap:{value:null},specMap:{value:null},sunDir:{value:u}},ie=new f(new R(M,96,64),new U({uniforms:x,vertexShader:re,fragmentShader:Ue}));h.add(ie);const L={cloudMap:{value:null},sunDir:{value:u}},j=new f(new R(M*1.006,96,64),new U({uniforms:L,vertexShader:re,fragmentShader:We,transparent:!0,depthWrite:!1}));h.add(j);const ce=new f(new R(M*1.07,64,48),new U({uniforms:{sunDir:{value:u}},vertexShader:Be,fragmentShader:Ge,side:xe,blending:ae,transparent:!0,depthWrite:!1}));v.add(ce);const k=new Se(new te().setFromPoints([new c(0,-1.35,0),new c(0,1.35,0)]),new De({color:12571903,dashSize:.05,gapSize:.035,transparent:!0,opacity:.8}));k.computeLineDistances(),v.add(k);const T=Re(W.lat,W.lon,M*1.004),w=new F;w.position.copy(T),w.lookAt(T.clone().multiplyScalar(2)),h.add(w);const I=new f(new be(.016,24),new oe({color:16726831})),C=new f(new ze(.03,.038,40),new oe({color:16738893,transparent:!0,opacity:.9,side:Ce}));I.position.z=.002,C.position.z=.002,w.add(I,C);let O=12,V="mar",E=55,_=20,g=3.6,S=!1;const q=new c,P=()=>{const e=l(Ne[V].season),t=l(Fe),n=new c(Math.sin(t)*Math.cos(e),Math.cos(t),Math.sin(t)*Math.sin(e)).normalize();v.quaternion.setFromUnitVectors(new c(0,1,0),n);const r=u.clone().applyQuaternion(v.quaternion.clone().invert()),m=Math.atan2(-r.z,r.x);h.rotation.y=m-l(W.lon)+l((O-12)*15)},A=()=>{const e=l(E),t=l(_);s.position.set(g*Math.cos(t)*Math.cos(e),g*Math.sin(t),g*Math.cos(t)*Math.sin(e)),s.lookAt(0,0,0)},H=()=>{const e=o.clientWidth||360,t=o.clientHeight||300;a.setSize(e,t,!1),s.aspect=e/t,g=e/t<1?4.4:3.6,s.updateProjectionMatrix(),A()};let Q=0,Y=!0,J=!0,N=!0,K=0;const D=()=>{N=!0},p=typeof IntersectionObserver<"u"?new IntersectionObserver(([e])=>{J=e.isIntersecting}):null;p==null||p.observe(o);const le=performance.now(),X=()=>{if(!Y||(Q=requestAnimationFrame(X),!J||document.hidden))return;const e=performance.now();if(!N&&!S&&e-K<50)return;N=!1,K=e;const t=(e-le)/1e3;j.rotation.y=t*.004;const n=1+.25*Math.sin(t*3);if(C.scale.set(n,n,1),S){w.getWorldPosition(q).normalize();const r=q.clone().multiplyScalar(g).add(new c(0,.6,0));s.position.lerp(r,.12),s.lookAt(0,0,0)}a.render(i,s)},de=Promise.all([y("earth-day.jpg"),y("earth-night.jpg"),y("earth-spec.jpg"),y("earth-clouds.jpg")]).then(([e,t,n,r])=>{e.colorSpace=ne,t.colorSpace=ne,x.dayMap.value=e,x.nightMap.value=t,x.specMap.value=n,L.cloudMap.value=r});return H(),P(),X(),{ready:de,setTime(e){O=e,P(),D()},setDate(e){V=e,P(),D()},setCamera(e,t){E=e,_=Math.max(-70,Math.min(70,t)),S||A(),D()},setFollow(e){S=e,e||A()},resize:()=>{H(),D()},dispose(){Y=!1,cancelAnimationFrame(Q),p==null||p.disconnect(),i.traverse(e=>{var n,r,m,Z,b,$,ee;(r=(n=e.geometry)==null?void 0:n.dispose)==null||r.call(n);const t=e.material;if(t){for(const ve of Object.keys(t.uniforms||{}))(Z=(m=t.uniforms[ve].value)==null?void 0:m.dispose)==null||Z.call(m);($=(b=t.map)==null?void 0:b.dispose)==null||$.call(b),(ee=t.dispose)==null||ee.call(t)}}),a.dispose()}}}function Ie(){try{const o=document.createElement("canvas");return!!(o.getContext("webgl2")||o.getContext("webgl"))}catch{return!1}}export{Te as createEarthScene,Re as latLonToLocal,Ie as webglAvailable};
