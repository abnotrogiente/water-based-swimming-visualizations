var Et=Object.defineProperty;var He=s=>{throw TypeError(s)};var _t=(s,e,r)=>e in s?Et(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var ie=(s,e,r)=>_t(s,typeof e!="symbol"?e+"":e,r),Tt=(s,e,r)=>e.has(s)||He("Cannot "+r);var we=(s,e,r)=>e.has(s)?He("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,r);var q=(s,e,r)=>(Tt(s,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const u of d)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function r(d){const u={};return d.integrity&&(u.integrity=d.integrity),d.referrerPolicy&&(u.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?u.credentials="include":d.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(d){if(d.ep)return;d.ep=!0;const u=r(d);fetch(d.href,u)}})();var v=function(){var s,e={create:function(a){a=a||{};var n=document.createElement("canvas");n.width=800,n.height=600,"alpha"in a||(a.alpha=!1);try{s=n.getContext("webgl2",a)}catch{}try{s=s||n.getContext("experimental-webgl",a)}catch{}if(!s)throw new Error("WebGL not supported");return s.HALF_FLOAT_OES=36193,r(),l(),d(),R(),s},keys:{},Matrix:w,Indexer:F,Buffer:B,Mesh:g,HitTest:V,Raytracer:N,Shader:k,Texture:O,Vector:E};function r(){s.MODELVIEW=D|1,s.PROJECTION=D|2;var a=new w,n=new w;s.modelviewMatrix=new w,s.projectionMatrix=new w;var t=[],o=[],c,h;s.matrixMode=function(m){switch(m){case s.MODELVIEW:c="modelviewMatrix",h=t;break;case s.PROJECTION:c="projectionMatrix",h=o;break;default:throw new Error("invalid matrix mode "+m)}},s.loadIdentity=function(){w.identity(s[c])},s.loadMatrix=function(m){for(var f=m.m,b=s[c].m,y=0;y<16;y++)b[y]=f[y]},s.multMatrix=function(m){s.loadMatrix(w.multiply(s[c],m,n))},s.perspective=function(m,f,b,y){s.multMatrix(w.perspective(m,f,b,y,a))},s.frustum=function(m,f,b,y,x,T){s.multMatrix(w.frustum(m,f,b,y,x,T,a))},s.ortho=function(m,f,b,y,x,T){s.multMatrix(w.ortho(m,f,b,y,x,T,a))},s.scale=function(m,f,b){s.multMatrix(w.scale(m,f,b,a))},s.translate=function(m,f,b){s.multMatrix(w.translate(m,f,b,a))},s.rotate=function(m,f,b,y){s.multMatrix(w.rotate(m,f,b,y,a))},s.lookAt=function(m,f,b,y,x,T,M,P,L){s.multMatrix(w.lookAt(m,f,b,y,x,T,M,P,L,a))},s.pushMatrix=function(){h.push(Array.prototype.slice.call(s[c].m))},s.popMatrix=function(){var m=h.pop();s[c].m=S?new Float32Array(m):m},s.project=function(m,f,b,y,x,T){y=y||s.modelviewMatrix,x=x||s.projectionMatrix,T=T||s.getParameter(s.VIEWPORT);var M=x.transformPoint(y.transformPoint(new E(m,f,b)));return new E(T[0]+T[2]*(M.x*.5+.5),T[1]+T[3]*(M.y*.5+.5),M.z*.5+.5)},s.unProject=function(m,f,b,y,x,T){y=y||s.modelviewMatrix,x=x||s.projectionMatrix,T=T||s.getParameter(s.VIEWPORT);var M=new E((m-T[0])/T[2]*2-1,(f-T[1])/T[3]*2-1,b*2-1);return w.inverse(w.multiply(x,y,a),n).transformPoint(M)},s.matrixMode(s.MODELVIEW)}function l(){var a={mesh:new g({coords:!0,colors:!0,triangles:!1}),mode:-1,coord:[0,0,0,0],color:[1,1,1,1],shader:new k("      uniform float pointSize;      out vec4 color;      out vec4 coord;      void main() {        color = gl_Color;        coord = gl_TexCoord;        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;        gl_PointSize = pointSize;      }    ","      uniform sampler2D tex;      uniform float pointSize;      uniform bool useTexture;      in vec4 color;      in vec4 coord;      out vec4 fragColor;      void main() {        fragColor = color;        if (useTexture) fragColor *= texture(tex, coord.xy);      }    ")};s.pointSize=function(n){a.shader.uniforms({pointSize:n})},s.begin=function(n){if(a.mode!=-1)throw new Error("mismatched gl.begin() and gl.end() calls");a.mode=n,a.mesh.colors=[],a.mesh.coords=[],a.mesh.vertices=[]},s.color=function(n,t,o,c){a.color=arguments.length==1?n.toArray().concat(1):[n,t,o,c||1]},s.texCoord=function(n,t){a.coord=arguments.length==1?n.toArray(2):[n,t]},s.vertex=function(n,t,o){a.mesh.colors.push(a.color),a.mesh.coords.push(a.coord),a.mesh.vertices.push(arguments.length==1?n.toArray():[n,t,o])},s.end=function(){if(a.mode==-1)throw new Error("mismatched gl.begin() and gl.end() calls");a.mesh.compile(),a.shader.uniforms({useTexture:!!s.getParameter(s.TEXTURE_BINDING_2D)}).draw(a.mesh,a.mode),a.mode=-1}}function d(){var a=s,n=0,t=0,o={},c=!1,h=Object.prototype.hasOwnProperty;function m(){for(var P in o)if(h.call(o,P)&&o[P])return!0;return!1}function f(P){var L={};for(var X in P)typeof P[X]=="function"?L[X]=function(Q){return function(){Q.apply(P,arguments)}}(P[X]):L[X]=P[X];L.original=P,L.x=L.pageX,L.y=L.pageY;for(var W=s.canvas;W;W=W.offsetParent)L.x-=W.offsetLeft,L.y-=W.offsetTop;return c?(L.deltaX=L.x-n,L.deltaY=L.y-t):(L.deltaX=0,L.deltaY=0,c=!0),n=L.x,t=L.y,L.dragging=m(),L.preventDefault=function(){L.original.preventDefault()},L.stopPropagation=function(){L.original.stopPropagation()},L}function b(P){s=a,m()||(p(document,"mousemove",y),p(document,"mouseup",x),_(s.canvas,"mousemove",y),_(s.canvas,"mouseup",x)),o[P.which]=!0,P=f(P),s.onmousedown&&s.onmousedown(P),P.preventDefault()}function y(P){s=a,P=f(P),s.onmousemove&&s.onmousemove(P),P.preventDefault()}function x(P){s=a,o[P.which]=!1,m()||(_(document,"mousemove",y),_(document,"mouseup",x),p(s.canvas,"mousemove",y),p(s.canvas,"mouseup",x)),P=f(P),s.onmouseup&&s.onmouseup(P),P.preventDefault()}function T(){c=!1}function M(){o={},c=!1}p(s.canvas,"mousedown",b),p(s.canvas,"mousemove",y),p(s.canvas,"mouseup",x),p(s.canvas,"mouseover",T),p(s.canvas,"mouseout",T),p(document,"contextmenu",M)}function u(a){var n={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};return n[a]||(a>=65&&a<=90?String.fromCharCode(a):null)}function p(a,n,t){a.addEventListener(n,t)}function _(a,n,t){a.removeEventListener(n,t)}p(document,"keydown",function(a){if(!a.altKey&&!a.ctrlKey&&!a.metaKey){var n=u(a.keyCode);n&&(e.keys[n]=!0),e.keys[a.keyCode]=!0}}),p(document,"keyup",function(a){if(!a.altKey&&!a.ctrlKey&&!a.metaKey){var n=u(a.keyCode);n&&(e.keys[n]=!1),e.keys[a.keyCode]=!1}});function R(){(function(a){s.makeCurrent=function(){s=a}})(s),s.animate=function(){var a=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(c){setTimeout(c,16.666666666666668)},n=new Date().getTime(),t=s;function o(){s=t;var c=new Date().getTime();s.onupdate&&s.onupdate((c-n)/1e3),s.ondraw&&s.ondraw(),a(o),n=c}o()},s.fullscreen=function(a){a=a||{};var n=a.paddingTop||0,t=a.paddingLeft||0,o=a.paddingRight||0,c=a.paddingBottom||0;if(!document.body)throw new Error("document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)");document.body.appendChild(s.canvas),document.body.style.overflow="hidden",s.canvas.style.position="absolute",s.canvas.style.left=t+"px",s.canvas.style.top=n+"px";function h(){s.canvas.width=window.innerWidth-t-o,s.canvas.height=window.innerHeight-n-c,s.viewport(0,0,s.canvas.width,s.canvas.height),(a.camera||!("camera"in a))&&(s.matrixMode(s.PROJECTION),s.loadIdentity(),s.perspective(a.fov||45,s.canvas.width/s.canvas.height,a.near||.1,a.far||1e3),s.matrixMode(s.MODELVIEW)),s.ondraw&&s.ondraw()}p(window,"resize",h),h()}}var D=305397760,S=typeof Float32Array<"u";function w(){var a=Array.prototype.concat.apply([],arguments);a.length||(a=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.m=S?new Float32Array(a):a}w.prototype={inverse:function(){return w.inverse(this,new w)},transpose:function(){return w.transpose(this,new w)},multiply:function(a){return w.multiply(this,a,new w)},transformPoint:function(a){var n=this.m;return new E(n[0]*a.x+n[1]*a.y+n[2]*a.z+n[3],n[4]*a.x+n[5]*a.y+n[6]*a.z+n[7],n[8]*a.x+n[9]*a.y+n[10]*a.z+n[11]).divide(n[12]*a.x+n[13]*a.y+n[14]*a.z+n[15])},transformVector:function(a){var n=this.m;return new E(n[0]*a.x+n[1]*a.y+n[2]*a.z,n[4]*a.x+n[5]*a.y+n[6]*a.z,n[8]*a.x+n[9]*a.y+n[10]*a.z)}},w.inverse=function(a,n){n=n||new w;var t=a.m,o=n.m;o[0]=t[5]*t[10]*t[15]-t[5]*t[14]*t[11]-t[6]*t[9]*t[15]+t[6]*t[13]*t[11]+t[7]*t[9]*t[14]-t[7]*t[13]*t[10],o[1]=-t[1]*t[10]*t[15]+t[1]*t[14]*t[11]+t[2]*t[9]*t[15]-t[2]*t[13]*t[11]-t[3]*t[9]*t[14]+t[3]*t[13]*t[10],o[2]=t[1]*t[6]*t[15]-t[1]*t[14]*t[7]-t[2]*t[5]*t[15]+t[2]*t[13]*t[7]+t[3]*t[5]*t[14]-t[3]*t[13]*t[6],o[3]=-t[1]*t[6]*t[11]+t[1]*t[10]*t[7]+t[2]*t[5]*t[11]-t[2]*t[9]*t[7]-t[3]*t[5]*t[10]+t[3]*t[9]*t[6],o[4]=-t[4]*t[10]*t[15]+t[4]*t[14]*t[11]+t[6]*t[8]*t[15]-t[6]*t[12]*t[11]-t[7]*t[8]*t[14]+t[7]*t[12]*t[10],o[5]=t[0]*t[10]*t[15]-t[0]*t[14]*t[11]-t[2]*t[8]*t[15]+t[2]*t[12]*t[11]+t[3]*t[8]*t[14]-t[3]*t[12]*t[10],o[6]=-t[0]*t[6]*t[15]+t[0]*t[14]*t[7]+t[2]*t[4]*t[15]-t[2]*t[12]*t[7]-t[3]*t[4]*t[14]+t[3]*t[12]*t[6],o[7]=t[0]*t[6]*t[11]-t[0]*t[10]*t[7]-t[2]*t[4]*t[11]+t[2]*t[8]*t[7]+t[3]*t[4]*t[10]-t[3]*t[8]*t[6],o[8]=t[4]*t[9]*t[15]-t[4]*t[13]*t[11]-t[5]*t[8]*t[15]+t[5]*t[12]*t[11]+t[7]*t[8]*t[13]-t[7]*t[12]*t[9],o[9]=-t[0]*t[9]*t[15]+t[0]*t[13]*t[11]+t[1]*t[8]*t[15]-t[1]*t[12]*t[11]-t[3]*t[8]*t[13]+t[3]*t[12]*t[9],o[10]=t[0]*t[5]*t[15]-t[0]*t[13]*t[7]-t[1]*t[4]*t[15]+t[1]*t[12]*t[7]+t[3]*t[4]*t[13]-t[3]*t[12]*t[5],o[11]=-t[0]*t[5]*t[11]+t[0]*t[9]*t[7]+t[1]*t[4]*t[11]-t[1]*t[8]*t[7]-t[3]*t[4]*t[9]+t[3]*t[8]*t[5],o[12]=-t[4]*t[9]*t[14]+t[4]*t[13]*t[10]+t[5]*t[8]*t[14]-t[5]*t[12]*t[10]-t[6]*t[8]*t[13]+t[6]*t[12]*t[9],o[13]=t[0]*t[9]*t[14]-t[0]*t[13]*t[10]-t[1]*t[8]*t[14]+t[1]*t[12]*t[10]+t[2]*t[8]*t[13]-t[2]*t[12]*t[9],o[14]=-t[0]*t[5]*t[14]+t[0]*t[13]*t[6]+t[1]*t[4]*t[14]-t[1]*t[12]*t[6]-t[2]*t[4]*t[13]+t[2]*t[12]*t[5],o[15]=t[0]*t[5]*t[10]-t[0]*t[9]*t[6]-t[1]*t[4]*t[10]+t[1]*t[8]*t[6]+t[2]*t[4]*t[9]-t[2]*t[8]*t[5];for(var c=t[0]*o[0]+t[1]*o[4]+t[2]*o[8]+t[3]*o[12],h=0;h<16;h++)o[h]/=c;return n},w.transpose=function(a,n){n=n||new w;var t=a.m,o=n.m;return o[0]=t[0],o[1]=t[4],o[2]=t[8],o[3]=t[12],o[4]=t[1],o[5]=t[5],o[6]=t[9],o[7]=t[13],o[8]=t[2],o[9]=t[6],o[10]=t[10],o[11]=t[14],o[12]=t[3],o[13]=t[7],o[14]=t[11],o[15]=t[15],n},w.multiply=function(a,n,t){t=t||new w;var o=a.m,c=n.m,h=t.m;return h[0]=o[0]*c[0]+o[1]*c[4]+o[2]*c[8]+o[3]*c[12],h[1]=o[0]*c[1]+o[1]*c[5]+o[2]*c[9]+o[3]*c[13],h[2]=o[0]*c[2]+o[1]*c[6]+o[2]*c[10]+o[3]*c[14],h[3]=o[0]*c[3]+o[1]*c[7]+o[2]*c[11]+o[3]*c[15],h[4]=o[4]*c[0]+o[5]*c[4]+o[6]*c[8]+o[7]*c[12],h[5]=o[4]*c[1]+o[5]*c[5]+o[6]*c[9]+o[7]*c[13],h[6]=o[4]*c[2]+o[5]*c[6]+o[6]*c[10]+o[7]*c[14],h[7]=o[4]*c[3]+o[5]*c[7]+o[6]*c[11]+o[7]*c[15],h[8]=o[8]*c[0]+o[9]*c[4]+o[10]*c[8]+o[11]*c[12],h[9]=o[8]*c[1]+o[9]*c[5]+o[10]*c[9]+o[11]*c[13],h[10]=o[8]*c[2]+o[9]*c[6]+o[10]*c[10]+o[11]*c[14],h[11]=o[8]*c[3]+o[9]*c[7]+o[10]*c[11]+o[11]*c[15],h[12]=o[12]*c[0]+o[13]*c[4]+o[14]*c[8]+o[15]*c[12],h[13]=o[12]*c[1]+o[13]*c[5]+o[14]*c[9]+o[15]*c[13],h[14]=o[12]*c[2]+o[13]*c[6]+o[14]*c[10]+o[15]*c[14],h[15]=o[12]*c[3]+o[13]*c[7]+o[14]*c[11]+o[15]*c[15],t},w.identity=function(a){a=a||new w;var n=a.m;return n[0]=n[5]=n[10]=n[15]=1,n[1]=n[2]=n[3]=n[4]=n[6]=n[7]=n[8]=n[9]=n[11]=n[12]=n[13]=n[14]=0,a},w.perspective=function(a,n,t,o,c){var h=Math.tan(a*Math.PI/360)*t,m=h*n;return w.frustum(-m,m,-h,h,t,o,c)},w.frustum=function(a,n,t,o,c,h,m){m=m||new w;var f=m.m;return f[0]=2*c/(n-a),f[1]=0,f[2]=(n+a)/(n-a),f[3]=0,f[4]=0,f[5]=2*c/(o-t),f[6]=(o+t)/(o-t),f[7]=0,f[8]=0,f[9]=0,f[10]=-(h+c)/(h-c),f[11]=-2*h*c/(h-c),f[12]=0,f[13]=0,f[14]=-1,f[15]=0,m},w.ortho=function(a,n,t,o,c,h,m){m=m||new w;var f=m.m;return f[0]=2/(n-a),f[1]=0,f[2]=0,f[3]=-(n+a)/(n-a),f[4]=0,f[5]=2/(o-t),f[6]=0,f[7]=-(o+t)/(o-t),f[8]=0,f[9]=0,f[10]=-2/(h-c),f[11]=-(h+c)/(h-c),f[12]=0,f[13]=0,f[14]=0,f[15]=1,m},w.scale=function(a,n,t,o){o=o||new w;var c=o.m;return c[0]=a,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=n,c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=t,c[11]=0,c[12]=0,c[13]=0,c[14]=0,c[15]=1,o},w.translate=function(a,n,t,o){o=o||new w;var c=o.m;return c[0]=1,c[1]=0,c[2]=0,c[3]=a,c[4]=0,c[5]=1,c[6]=0,c[7]=n,c[8]=0,c[9]=0,c[10]=1,c[11]=t,c[12]=0,c[13]=0,c[14]=0,c[15]=1,o},w.rotate=function(a,n,t,o,c){if(!a||!n&&!t&&!o)return w.identity(c);c=c||new w;var h=c.m,m=Math.sqrt(n*n+t*t+o*o);a*=Math.PI/180,n/=m,t/=m,o/=m;var f=Math.cos(a),b=Math.sin(a),y=1-f;return h[0]=n*n*y+f,h[1]=n*t*y-o*b,h[2]=n*o*y+t*b,h[3]=0,h[4]=t*n*y+o*b,h[5]=t*t*y+f,h[6]=t*o*y-n*b,h[7]=0,h[8]=o*n*y-t*b,h[9]=o*t*y+n*b,h[10]=o*o*y+f,h[11]=0,h[12]=0,h[13]=0,h[14]=0,h[15]=1,c},w.lookAt=function(a,n,t,o,c,h,m,f,b,y){y=y||new w;var x=y.m,T=new E(a,n,t),M=new E(o,c,h),P=new E(m,f,b),L=T.subtract(M).unit(),X=P.cross(L).unit(),W=L.cross(X).unit();return x[0]=X.x,x[1]=X.y,x[2]=X.z,x[3]=-X.dot(T),x[4]=W.x,x[5]=W.y,x[6]=W.z,x[7]=-W.dot(T),x[8]=L.x,x[9]=L.y,x[10]=L.z,x[11]=-L.dot(T),x[12]=0,x[13]=0,x[14]=0,x[15]=1,y};function F(){this.unique=[],this.indices=[],this.map={}}F.prototype={add:function(a){var n=JSON.stringify(a);return n in this.map||(this.map[n]=this.unique.length,this.unique.push(a)),this.map[n]}};function B(a,n){this.buffer=null,this.target=a,this.type=n,this.data=[]}B.prototype={compile:function(a){for(var n=[],t=0,o=1e4;t<this.data.length;t+=o)n=Array.prototype.concat.apply(n,this.data.slice(t,t+o));var c=this.data.length?n.length/this.data.length:0;if(c!=Math.round(c))throw new Error("buffer elements not of consistent size, average size is "+c);this.buffer=this.buffer||s.createBuffer(),this.buffer.length=n.length,this.buffer.spacing=c,s.bindBuffer(this.target,this.buffer),s.bufferData(this.target,new this.type(n),a||s.STATIC_DRAW)}};function g(a){a=a||{},this.vertexBuffers={},this.indexBuffers={},this.addVertexBuffer("vertices","gl_Vertex"),a.coords&&this.addVertexBuffer("coords","gl_TexCoord"),a.normals&&this.addVertexBuffer("normals","gl_Normal"),a.colors&&this.addVertexBuffer("colors","gl_Color"),(!("triangles"in a)||a.triangles)&&this.addIndexBuffer("triangles"),a.lines&&this.addIndexBuffer("lines")}g.prototype={addVertexBuffer:function(a,n){var t=this.vertexBuffers[n]=new B(s.ARRAY_BUFFER,Float32Array);t.name=a,this[a]=[]},addIndexBuffer:function(a){this.indexBuffers[a]=new B(s.ELEMENT_ARRAY_BUFFER,Uint16Array),this[a]=[]},compile:function(){for(var a in this.vertexBuffers){var n=this.vertexBuffers[a];n.data=this[n.name],n.compile()}for(var t in this.indexBuffers){var n=this.indexBuffers[t];n.data=this[t],n.compile()}},transform:function(a){if(this.vertices=this.vertices.map(function(t){return a.transformPoint(E.fromArray(t)).toArray()}),this.normals){var n=a.inverse().transpose();this.normals=this.normals.map(function(t){return n.transformVector(E.fromArray(t)).unit().toArray()})}return this.compile(),this},computeNormals:function(){this.normals||this.addVertexBuffer("normals","gl_Normal");for(var a=0;a<this.vertices.length;a++)this.normals[a]=new E;for(var a=0;a<this.triangles.length;a++){var n=this.triangles[a],t=E.fromArray(this.vertices[n[0]]),o=E.fromArray(this.vertices[n[1]]),c=E.fromArray(this.vertices[n[2]]),h=o.subtract(t).cross(c.subtract(t)).unit();this.normals[n[0]]=this.normals[n[0]].add(h),this.normals[n[1]]=this.normals[n[1]].add(h),this.normals[n[2]]=this.normals[n[2]].add(h)}for(var a=0;a<this.vertices.length;a++)this.normals[a]=this.normals[a].unit().toArray();return this.compile(),this},computeWireframe:function(){for(var a=new F,n=0;n<this.triangles.length;n++)for(var t=this.triangles[n],o=0;o<t.length;o++){var c=t[o],h=t[(o+1)%t.length];a.add([Math.min(c,h),Math.max(c,h)])}return this.lines||this.addIndexBuffer("lines"),this.lines=a.unique,this.compile(),this},getAABB:function(){var a={min:new E(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};a.max=a.min.negative();for(var n=0;n<this.vertices.length;n++){var t=E.fromArray(this.vertices[n]);a.min=E.min(a.min,t),a.max=E.max(a.max,t)}return a},getBoundingSphere:function(){for(var a=this.getAABB(),n={center:a.min.add(a.max).divide(2),radius:0},t=0;t<this.vertices.length;t++)n.radius=Math.max(n.radius,E.fromArray(this.vertices[t]).subtract(n.center).length());return n}},g.plane=function(a){a=a||{};for(var n=new g(a),t=a.detailX||a.detail||1,o=a.detailY||a.detail||1,c=a.width||2,h=a.height||2,m=0;m<=o;m++)for(var f=m/o,b=0;b<=t;b++){var y=b/t;if(n.vertices.push([(y-.5)*c,(f-.5)*h,0]),n.coords&&n.coords.push([y,f]),n.normals&&n.normals.push([0,0,1]),b<t&&m<o){var x=b+m*(t+1);n.triangles.push([x,x+1,x+t+1]),n.triangles.push([x+t+1,x+1,x+t+2])}}return n.compile(),n};var A=[[0,4,2,6,-1,0,0],[1,3,5,7,1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,1]];function z(a){return new E((a&1)*2-1,(a&2)-1,(a&4)/2-1)}g.cube=function(a){for(var n=new g(a),t=a&&a.width||2,o=a&&a.height||2,c=a&&a.depth||2,h=0;h<A.length;h++){for(var m=A[h],f=h*4,b=0;b<4;b++){var y=m[b];const x=z(y).toArray();x[0]*=t/2,x[1]*=o/2,x[2]*=c/2,n.vertices.push(x),n.coords&&n.coords.push([b&1,(b&2)/2]),n.normals&&n.normals.push(m.slice(4,7))}n.triangles.push([f,f+1,f+2]),n.triangles.push([f+2,f+1,f+3])}return n.compile(),n},g.sphere=function(a){function n(W,Q,re){return b?[W,re,Q]:[W,Q,re]}function t(W){return W+(W-W*W)/2}a=a||{};for(var o=new g(a),c=new F,h=a.detail||6,m=0;m<8;m++)for(var f=z(m),b=f.x*f.y*f.z>0,y=[],x=0;x<=h;x++){for(var T=0;x+T<=h;T++){var M=x/h,P=T/h,L=(h-x-T)/h,X={vertex:new E(t(M),t(P),t(L)).unit().multiply(f).toArray()};o.coords&&(X.coord=f.y>0?[1-M,L]:[L,1-M]),y.push(c.add(X))}if(x>0)for(var T=0;x+T<=h;T++){var M=(x-1)*(h+1)+(x-1-(x-1)*(x-1))/2+T,P=x*(h+1)+(x-x*x)/2+T;o.triangles.push(n(y[M],y[M+1],y[P])),x+T<h&&o.triangles.push(n(y[P],y[M+1],y[P+1]))}}return o.vertices=c.unique.map(function(W){return W.vertex}),o.coords&&(o.coords=c.unique.map(function(W){return W.coord})),o.normals&&(o.normals=o.vertices),o.compile(),o},g.load=function(a,n){n=n||{},"coords"in n||(n.coords=!!a.coords),"normals"in n||(n.normals=!!a.normals),"colors"in n||(n.colors=!!a.colors),"triangles"in n||(n.triangles=!!a.triangles),"lines"in n||(n.lines=!!a.lines);var t=new g(n);return t.vertices=a.vertices,t.coords&&(t.coords=a.coords),t.normals&&(t.normals=a.normals),t.colors&&(t.colors=a.colors),t.triangles&&(t.triangles=a.triangles),t.lines&&(t.lines=a.lines),t.compile(),t};function V(a,n,t){this.t=arguments.length?a:Number.MAX_VALUE,this.hit=n,this.normal=t}V.prototype={mergeWith:function(a){a.t>0&&a.t<this.t&&(this.t=a.t,this.hit=a.hit,this.normal=a.normal)}};function N(){var a=s.getParameter(s.VIEWPORT),n=s.modelviewMatrix.m,t=new E(n[0],n[4],n[8]),o=new E(n[1],n[5],n[9]),c=new E(n[2],n[6],n[10]),h=new E(n[3],n[7],n[11]);this.eye=new E(-h.dot(t),-h.dot(o),-h.dot(c));var m=a[0],f=m+a[2],b=a[1],y=b+a[3];this.ray00=s.unProject(m,b,1).subtract(this.eye),this.ray10=s.unProject(f,b,1).subtract(this.eye),this.ray01=s.unProject(m,y,1).subtract(this.eye),this.ray11=s.unProject(f,y,1).subtract(this.eye),this.viewport=a}N.prototype={getRayForPixel:function(a,n){a=(a-this.viewport[0])/this.viewport[2],n=1-(n-this.viewport[1])/this.viewport[3];var t=E.lerp(this.ray00,this.ray10,a),o=E.lerp(this.ray01,this.ray11,a);return E.lerp(t,o,n).unit()}},N.hitTestBox=function(a,n,t,o){var c=t.subtract(a).divide(n),h=o.subtract(a).divide(n),m=E.min(c,h),f=E.max(c,h),b=m.max(),y=f.min();if(b>0&&b<y){var x=1e-6,T=a.add(n.multiply(b));return t=t.add(x),o=o.subtract(x),new V(b,T,new E((T.x>o.x)-(T.x<t.x),(T.y>o.y)-(T.y<t.y),(T.z>o.z)-(T.z<t.z)))}return null},N.hitTestSphere=function(a,n,t,o){var c=a.subtract(t),h=n.dot(n),m=2*n.dot(c),f=c.dot(c)-o*o,b=m*m-4*h*f;if(b>0){var y=(-m-Math.sqrt(b))/(2*h),x=a.add(n.multiply(y));return new V(y,x,x.subtract(t).divide(o))}return null},N.hitTestTriangle=function(a,n,t,o,c){var h=o.subtract(t),m=c.subtract(t),f=h.cross(m).unit(),b=f.dot(t.subtract(a))/f.dot(n);if(b>0){var y=a.add(n.multiply(b)),x=y.subtract(t),T=m.dot(m),M=m.dot(h),P=m.dot(x),L=h.dot(h),X=h.dot(x),W=T*L-M*M,Q=(L*P-M*X)/W,re=(T*X-M*P)/W;if(Q>=0&&re>=0&&Q+re<=1)return new V(b,y,f)}return null};function U(a,n,t){let o;for(;(o=a.exec(n))!=null;)t(o)}var I="LIGHTGL";function k(a,n){function t(T){var M=document.getElementById(T);return M?M.text:T}a=t(a),n=t(n);var o="    uniform mat3 gl_NormalMatrix;    uniform mat4 gl_ModelViewMatrix;    uniform mat4 gl_ProjectionMatrix;    uniform mat4 gl_ModelViewProjectionMatrix;    uniform mat4 gl_ModelViewMatrixInverse;    uniform mat4 gl_ProjectionMatrixInverse;    uniform mat4 gl_ModelViewProjectionMatrixInverse;  ",c=`#version 300 es
    `+o+"    in vec4 gl_Vertex;    in vec4 gl_TexCoord;    in vec3 gl_Normal;    in vec4 gl_Color;    vec4 ftransform() {      return gl_ModelViewProjectionMatrix * gl_Vertex;    }  ",h=`#version 300 es
    precision highp float;
  `+o,m=a+n,f={};U(/\b(gl_[^;]*)\b;/g,o,function(T){var M=T[1];if(m.indexOf(M)!=-1){var P=M.replace(/[a-z_]/g,"");f[P]=I+M}}),m.indexOf("ftransform")!=-1&&(f.MVPM=I+"gl_ModelViewProjectionMatrix"),this.usedMatrices=f;function b(T,M){var P={},L=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(M);return M=L?L[1]+T+M.substr(L[1].length):T+M,U(/\bgl_\w+\b/g,T,function(X){X in P||(M=M.replace(new RegExp("\\b"+X+"\\b","g"),I+X),P[X]=!0)}),M}a=b(c,a),n=b(h,n);function y(T,M){var P=s.createShader(T);if(s.shaderSource(P,M),s.compileShader(P),!s.getShaderParameter(P,s.COMPILE_STATUS))throw new Error("compile error: "+s.getShaderInfoLog(P));return P}if(this.program=s.createProgram(),s.attachShader(this.program,y(s.VERTEX_SHADER,a)),s.attachShader(this.program,y(s.FRAGMENT_SHADER,n)),s.linkProgram(this.program),!s.getProgramParameter(this.program,s.LINK_STATUS))throw new Error("link error: "+s.getProgramInfoLog(this.program));this.attributes={},this.uniformLocations={};var x={};U(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,a+n,function(T){x[T[2]]=1}),this.isSampler=x}function K(a){var n=Object.prototype.toString.call(a);return n=="[object Array]"||n=="[object Float32Array]"}function te(a){var n=Object.prototype.toString.call(a);return n=="[object Number]"||n=="[object Boolean]"}new w,new w,k.prototype={uniforms:function(a){s.useProgram(this.program);for(var n in a){var t=this.uniformLocations[n]||s.getUniformLocation(this.program,n);if(t){this.uniformLocations[n]=t;var o=a[n];if(o instanceof E?o=[o.x,o.y,o.z]:o instanceof w&&(o=o.m),K(o))switch(o.length){case 1:s.uniform1fv(t,new Float32Array(o));break;case 2:s.uniform2fv(t,new Float32Array(o));break;case 3:s.uniform3fv(t,new Float32Array(o));break;case 4:s.uniform4fv(t,new Float32Array(o));break;case 9:s.uniformMatrix3fv(t,!1,new Float32Array([o[0],o[3],o[6],o[1],o[4],o[7],o[2],o[5],o[8]]));break;case 16:s.uniformMatrix4fv(t,!1,new Float32Array([o[0],o[4],o[8],o[12],o[1],o[5],o[9],o[13],o[2],o[6],o[10],o[14],o[3],o[7],o[11],o[15]]));break;default:throw new Error(`don't know how to load uniform "`+n+'" of length '+o.length)}else if(te(o))(this.isSampler[n]?s.uniform1i:s.uniform1f).call(s,t,o);else throw new Error('attempted to set uniform "'+n+'" to invalid value '+o)}}return this},draw:function(a,n){this.drawBuffers(a.vertexBuffers,a.indexBuffers[n==s.LINES?"lines":"triangles"],arguments.length<2?s.TRIANGLES:n)},drawBuffers:function(a,n,t){var o=this.usedMatrices,c=s.modelviewMatrix,h=s.projectionMatrix,m=o.MVMI||o.NM?c.inverse():null,f=o.PMI?h.inverse():null,b=o.MVPM||o.MVPMI?h.multiply(c):null,y={};if(o.MVM&&(y[o.MVM]=c),o.MVMI&&(y[o.MVMI]=m),o.PM&&(y[o.PM]=h),o.PMI&&(y[o.PMI]=f),o.MVPM&&(y[o.MVPM]=b),o.MVPMI&&(y[o.MVPMI]=b.inverse()),o.NM){var x=m.m;y[o.NM]=[x[0],x[4],x[8],x[1],x[5],x[9],x[2],x[6],x[10]]}this.uniforms(y);var T=0;for(var M in a){var P=a[M],L=this.attributes[M]||s.getAttribLocation(this.program,M.replace(/^(gl_.*)$/,I+"$1"));L==-1||!P.buffer||(this.attributes[M]=L,s.bindBuffer(s.ARRAY_BUFFER,P.buffer),s.enableVertexAttribArray(L),s.vertexAttribPointer(L,P.buffer.spacing,s.FLOAT,!1,0,0),T=P.buffer.length/P.buffer.spacing)}for(var M in this.attributes)M in a||s.disableVertexAttribArray(this.attributes[M]);return T&&(!n||n.buffer)&&(n?(s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,n.buffer),s.drawElements(t,n.buffer.length,s.UNSIGNED_SHORT,0)):s.drawArrays(t,0,T)),this}};function O(a,n,t){t=t||{},this.width=a,this.height=n,this.id=s.createTexture();let o=t.type||s.UNSIGNED_BYTE,c=t.format||s.RGBA,h=s.RGBA;const m=s.getExtension("EXT_color_buffer_float"),f=s.getExtension("EXT_color_buffer_half_float");o===s.FLOAT?(m?s instanceof WebGL2RenderingContext&&(c=s.RGBA32F):(console.warn("FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),o=s.UNSIGNED_BYTE,c=s.RGBA8),h=s.RGBA):o===s.HALF_FLOAT_OES?(f?s instanceof WebGL2RenderingContext&&(c=s.RGBA16F):(console.warn("HALF_FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),o=s.UNSIGNED_BYTE,c=s.RGBA8),h=s.RGBA):(o=s.UNSIGNED_BYTE,c=s.RGBA8,h=s.RGBA);const b=t.filter||t.magFilter||s.LINEAR,y=t.filter||t.minFilter||s.LINEAR;s.bindTexture(s.TEXTURE_2D,this.id),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,1),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,b),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,y),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,t.wrap||t.wrapS||s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,t.wrap||t.wrapT||s.CLAMP_TO_EDGE),s instanceof WebGL2RenderingContext?s.texImage2D(s.TEXTURE_2D,0,c,a,n,0,h,o,null):s.texImage2D(s.TEXTURE_2D,0,h,a,n,0,h,o,null),s.bindTexture(s.TEXTURE_2D,null),this.format=h,this.type=o,this.internalFormat=c}var H,j,Z;O.prototype={bind:function(a){s.activeTexture(s.TEXTURE0+(a||0)),s.bindTexture(s.TEXTURE_2D,this.id)},unbind:function(a){s.activeTexture(s.TEXTURE0+(a||0)),s.bindTexture(s.TEXTURE_2D,null)},canDrawTo:function(){H=H||s.createFramebuffer(),s.bindFramebuffer(s.FRAMEBUFFER,H),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,this.id,0);var a=s.checkFramebufferStatus(s.FRAMEBUFFER)==s.FRAMEBUFFER_COMPLETE;return s.bindFramebuffer(s.FRAMEBUFFER,null),a},drawTo:function(a){s.getExtension("EXT_color_buffer_float")||console.warn("EXT_color_buffer_float not available!");var t=s.getParameter(s.VIEWPORT);if(H=H||s.createFramebuffer(),j=j||s.createRenderbuffer(),s.bindFramebuffer(s.FRAMEBUFFER,H),s.bindRenderbuffer(s.RENDERBUFFER,j),(this.width!=j.width||this.height!=j.height)&&(j.width=this.width,j.height=this.height,s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_COMPONENT16,this.width,this.height)),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,this.id,0),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,j),s.checkFramebufferStatus(s.FRAMEBUFFER)!=s.FRAMEBUFFER_COMPLETE)throw new Error("Rendering to this texture is not supported (incomplete framebuffer)");s.viewport(0,0,this.width,this.height),a(),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindRenderbuffer(s.RENDERBUFFER,null),s.viewport(t[0],t[1],t[2],t[3])},swapWith:function(a){var n;n=a.id,a.id=this.id,this.id=n,n=a.width,a.width=this.width,this.width=n,n=a.height,a.height=this.height,this.height=n}},O.fromImage=function(a,n){n=n||{};var t=new O(a.width,a.height,n);s.bindTexture(s.TEXTURE_2D,t.id);try{s.texImage2D(s.TEXTURE_2D,0,t.format,t.format,t.type,a)}catch{throw location.protocol=="file:"?new Error('image not loaded for security reasons (serve this page over "http://" instead)'):new Error("image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)")}return n.minFilter&&n.minFilter!=s.NEAREST&&n.minFilter!=s.LINEAR&&s.generateMipmap(s.TEXTURE_2D),s.bindTexture(s.TEXTURE_2D,null),t},O.fromURL=function(a,n){Z=Z||function(){var h=document.createElement("canvas").getContext("2d");h.canvas.width=h.canvas.height=128;for(var m=0;m<h.canvas.height;m+=16)for(var f=0;f<h.canvas.width;f+=16)h.fillStyle=(f^m)&16?"#FFF":"#DDD",h.fillRect(f,m,16,16);return h.canvas}();var t=O.fromImage(Z,n),o=new Image,c=s;return o.onload=function(){c.makeCurrent(),O.fromImage(o,n).swapWith(t)},o.src=a,t},O.canUseFloatingPointTextures=function(){return!!s.getExtension("OES_texture_float")},O.canUseFloatingPointLinearFiltering=function(){return!!s.getExtension("OES_texture_float_linear")},O.canUseHalfFloatingPointTextures=function(){return!!s.getExtension("OES_texture_half_float")},O.canUseHalfFloatingPointLinearFiltering=function(){return!!s.getExtension("OES_texture_half_float_linear")};function E(a,n,t){this.x=a||0,this.y=n||0,this.z=t||0}return E.prototype={negative:function(){return new E(-this.x,-this.y,-this.z)},add:function(a){return a instanceof E?new E(this.x+a.x,this.y+a.y,this.z+a.z):new E(this.x+a,this.y+a,this.z+a)},subtract:function(a){return a instanceof E?new E(this.x-a.x,this.y-a.y,this.z-a.z):new E(this.x-a,this.y-a,this.z-a)},multiply:function(a){return a instanceof E?new E(this.x*a.x,this.y*a.y,this.z*a.z):new E(this.x*a,this.y*a,this.z*a)},divide:function(a){return a instanceof E?new E(this.x/a.x,this.y/a.y,this.z/a.z):new E(this.x/a,this.y/a,this.z/a)},equals:function(a){return this.x==a.x&&this.y==a.y&&this.z==a.z},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},cross:function(a){return new E(this.y*a.z-this.z*a.y,this.z*a.x-this.x*a.z,this.x*a.y-this.y*a.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},angleTo:function(a){return Math.acos(this.dot(a)/(this.length()*a.length()))},toArray:function(a){return[this.x,this.y,this.z].slice(0,a||3)},clone:function(){return new E(this.x,this.y,this.z)},init:function(a,n,t){return this.x=a,this.y=n,this.z=t,this}},E.negative=function(a,n){return n.x=-a.x,n.y=-a.y,n.z=-a.z,n},E.add=function(a,n,t){return n instanceof E?(t.x=a.x+n.x,t.y=a.y+n.y,t.z=a.z+n.z):(t.x=a.x+n,t.y=a.y+n,t.z=a.z+n),t},E.subtract=function(a,n,t){return n instanceof E?(t.x=a.x-n.x,t.y=a.y-n.y,t.z=a.z-n.z):(t.x=a.x-n,t.y=a.y-n,t.z=a.z-n),t},E.multiply=function(a,n,t){return n instanceof E?(t.x=a.x*n.x,t.y=a.y*n.y,t.z=a.z*n.z):(t.x=a.x*n,t.y=a.y*n,t.z=a.z*n),t},E.divide=function(a,n,t){return n instanceof E?(t.x=a.x/n.x,t.y=a.y/n.y,t.z=a.z/n.z):(t.x=a.x/n,t.y=a.y/n,t.z=a.z/n),t},E.cross=function(a,n,t){return t.x=a.y*n.z-a.z*n.y,t.y=a.z*n.x-a.x*n.z,t.z=a.x*n.y-a.y*n.x,t},E.unit=function(a,n){var t=a.length();return n.x=a.x/t,n.y=a.y/t,n.z=a.z/t,n},E.fromAngles=function(a,n){return new E(Math.cos(a)*Math.cos(n),Math.sin(n),Math.sin(a)*Math.cos(n))},E.randomDirection=function(){return E.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))},E.min=function(a,n){return new E(Math.min(a.x,n.x),Math.min(a.y,n.y),Math.min(a.z,n.z))},E.max=function(a,n){return new E(Math.max(a.x,n.x),Math.max(a.y,n.y),Math.max(a.z,n.z))},E.lerp=function(a,n,t){return n.subtract(a).multiply(t).add(a)},E.fromArray=function(a){return new E(a[0],a[1],a[2])},E.angleBetween=function(a,n){return a.angleTo(n)},e}();class le{constructor({tx:e=0,ty:r=0,zoom:l=4,ax:d=-25,ay:u=-200,az:p=0,fov:_=45}){this.tx=e,this.ty=r,this.zoom=l,this.ax=d,this.ay=u,this.az=p,this.fov=_}interpolate(e,r,l=1){const d=(u,p,_,R=1)=>Math.pow(_,R)*p+(1-Math.pow(_,R))*u;return new le({tx:d(this.tx,e.tx,r,l),ty:d(this.ty,e.ty,r,l),zoom:d(this.zoom,e.zoom,r,l),ax:d(this.ax,e.ax,r,l),ay:d(this.ay,e.ay,r,l),az:d(this.az,e.az,r,l),fov:d(this.fov,e.fov,r,l)})}}const ke=.3,Be=.15,Oe=1,St=10,et=Math.ceil(St/4),tt=10,Se=`
    uniform float wr;
    #define sqrt_2_PI 2.50662827
    #define PI 3.1415926536
    uniform sampler2D swimmersAttributesTexture;
    const int SWIMMERS_NUM_ATTRIBUTES = 4;
    const vec2 TEXTURE_SIZE = vec2(`+et+", "+tt+`);
    uniform float swimmersNumber;
    uniform float time;

    vec2 getSwimmerPosition(int i) {
        float i_float = float(i);
        vec2 pixel = vec2(0., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.rg;
    }

    float getSwimmerSpeed(int i) {
        float i_float = float(i);
        vec2 pixel = vec2(1., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.g;
    }

    vec2 getSwimmerDivingInfo(int i) {
        float i_float = float(i);
        vec2 pixel = vec2(0., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.ba;
    }

    vec2 getSwimmerBreakoutInfo(int i) {
        float i_float = float(i);
        vec2 pixel = vec2(2., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.rg;
    }

    float getSwimmerFinishTime(int i) {
        float i_float = float(i);
        vec2 pixel = vec2(2., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.b;
    }

    float getSwimmerReactionTime(int i ) {
        float i_float = float(i);
        vec2 pixel = vec2(1., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.r;
    }

    float getSwimmerNationality(int i ) {
        float i_float = float(i);
        vec2 pixel = vec2(1., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.b;
    }

    float getSwimmerAltitude(int i ) {
        float i_float = float(i);
        vec2 pixel = vec2(1., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.a;
    }

    float getSwimmerWaterDamping(int i ) {
        float i_float = float(i);
        vec2 pixel = vec2(2., i_float);
        vec4 attributes = texture(swimmersAttributesTexture, (pixel + .5) / TEXTURE_SIZE);
        return attributes.a;
    }


    float gaussian(float x, float mean, float std) {
        return exp(-(x - mean) * (x - mean) / (2. * std * std)) / (std * sqrt_2_PI);
    }

    float getRecordWave(vec2 coord) {
        float z = poolSize.z * coord.y;
        if (true || abs(z - wr) < 1.) {
            float amplitude = .2;
            float g = amplitude * gaussian(z, wr, .25);
            float w = exp(g - amplitude) - exp(-amplitude);
            return w;
        }
        return 0.;
    }

    void ripples(in vec2 coord, in vec2 eventPosition, in float eventTime, float intensity, out vec4 res) {
        float timeSinceDiving = time - eventTime;
        const float rippleSpeed = .5;
        const float maxTime = 10.;
        const float lambda = 2. * PI / 0.6;
        float frequency = 2.;
        float omega = 2. * PI * frequency;
        vec2 center = eventPosition;
        vec2 pos = (coord - .5) * poolSize.xz;
        vec2 diff = pos - center;
        float d = sqrt(dot(diff, diff));
        d*=2.;
        
        float r_max_max = 0.65;
        
        float r_max = max(0.3, intensity * r_max_max);
        float attenuationDist = r_max;
        
        float duration = 1.5;
        duration = 5.;
        float c =  cos(lambda * d - omega * timeSinceDiving);
        float attenuation = exp(-d / attenuationDist - timeSinceDiving / duration);
        bool condition = timeSinceDiving > d / frequency;
        if (condition) res.x += .05 * attenuation * c;
        if (c > 0.8 && condition) {
            res.y = max(res.y, min(1., 15.*attenuation));
            res.z = 1.;
            res.w = intensity;
        }
    }

    void divingRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 divingInfo, out vec4 res) {
        float swimmer_x = swimmerPosition.x;
        float divingDistance = divingInfo.x;
        float divingTime = divingInfo.y;

        vec2 divingLocation = vec2(swimmer_x, divingDistance - poolSize.z / 2.);

        float divingDistRange = .7;
        float divingDistMin = 3.3;
        float intensity = (divingDistance - divingDistMin) / divingDistRange;
        
        ripples(coord, divingLocation, divingTime, intensity, res);
    }

    void breakoutRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 breakoutInfo, out vec4 res) {
        float swimmer_x = swimmerPosition.x;
        float breakoutDistance = breakoutInfo.x;
        float breakoutTime = breakoutInfo.y;

        vec2 breakoutLocation = vec2(swimmer_x, breakoutDistance - poolSize.z / 2.);

        float breakoutDistRange = 1.3;
        float breakoutDistMin = 10.7;
        float intensity = (breakoutDistance - breakoutDistMin) / breakoutDistRange;
        
        ripples(coord, breakoutLocation, breakoutTime, intensity, res);
    }



    vec4 getDivingWaves(vec2 coord) {
        vec4 res = vec4(0., 0., -1., 0.);
        
        for (int i = 0; i < 10; i++) {
            float i_float = float(i);
            if (i_float > swimmersNumber - 0.1) break;
            vec2 swimmerPos = getSwimmerPosition(i);
            vec2 divingInfo = getSwimmerDivingInfo(i);
            vec2 breakoutInfo = getSwimmerBreakoutInfo(i);
            
            divingRipples(coord, swimmerPos, divingInfo, res);
            breakoutRipples(coord, swimmerPos, breakoutInfo, res);
            
        }
        return res;
    }
`,it=200,At=`
/// The amount of 'sparks' to use (spark count between about 73-206 is known to crash Win7/Chrome)
uniform float iTime;
uniform vec2 iResolution;
uniform float sparksGlow;
uniform float sparksLengthFactor;
uniform float sparksGlowOffset;
uniform float sparksStroke;
uniform float sparksNumber;
uniform float sparksSizeFactor;
uniform float fov;
#define MAX_SPARKS `+it+`
/// The amount of 'sparks' to use (spark count between about 73-206 is known to crash Win7/Chrome)
#define SPARKS 40    // Low-end
//#define SPARKS 100   // Low-mid
//#define SPARKS 210   // Mid-high (recommended)
//#define SPARKS 500   // High
//#define SPARKS 1000  // Really High
//#define SPARKS 2000  // Insane

/// Switch between defines to choose different sets of settings
//#define ORIGINAL_SPARKS
//#define WATER_SPOUT
#define FIRE_STREAM
//#define STAR_BOMB
//#define WATER_LINE

#define SIZE_FACTOR 50.

#define BRIGHTNESS 1.0   /// 0.0 == auto-brightness

#ifdef ORIGINAL_SPARKS
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 0.6
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.3
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
#endif

#ifdef WATER_SPOUT
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 0.5
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
	#define BLUE
#endif

#ifdef FIRE_STREAM
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 0.0
#endif

#ifdef STAR_BOMB
	#define SPEED_FACTOR 0.5
	#define LENGTH_FACTOR 0.2
	#define GROUP_FACTOR 1.0
	#define SPREAD_FACTOR 0.2
	#define MIN_ANGLE 0.3
	#define RAND_FACTOR 0.0
	#define DOT_SPREAD
#endif

#ifdef WATER_LINE
	#define SPEED_FACTOR 1.5
	#define LENGTH_FACTOR 1.5
	#define GROUP_FACTOR 0.7
	#define SPREAD_FACTOR 0.1
	#define MIN_ANGLE 0.1
	#define RAND_FACTOR 1.0
	#define LINEAR_SPREAD
	#define BLUE
#endif

const float brightness = (float(BRIGHTNESS) == 0.0) ? 200.0 / (float(SPARKS) + 40.0) : float(BRIGHTNESS);

vec3 sampleAngle(float u1) {
	float r = sqrt(u1);
	return r * sparkDirection -sqrt(1.0 - u1) * waterNormal;
	return r * sparkDirection + vec3(0., -sqrt(1.0 - u1), 0.);
	return vec3(-r * -0.809017, -sqrt(1.0 - u1), r * 0.587785);
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

float spread(vec2 co) {
#ifdef LINEAR_SPREAD
	return fract(co.x * 0.618033988749895);
#else
	#ifdef DOT_SPREAD
		return fract(co.x * 1.0);
	#else
    	return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
	#endif
#endif
}

float planeIntersection(vec3 rpos, vec3 rdir, vec3 n) {
	return -dot(n, rpos) / dot(rdir, n);
}

float cylinder(vec3 pos, vec3 dir, float len) {
	float x = dot(pos, dir);
	return max(max(length(pos - dir * x) - sparksStroke, x), -x-len);
}

vec4 color(float age) {
	float f = 1.0 - age * 0.05;
	#ifdef BLUE
	return vec4(0.2*f*f, 0.5*f*f+0.05, 0.5*f+0.4, min(f*2.0, 1.0));
	#else
	return vec4(0.5*f+0.4, 0.5*f*f+0.05, 0.2*f*f, min(f*2.0, 1.0));
	#endif
}

vec3 trace(vec3 rpos, vec3 rdir, vec2 fragCoord, vec3 center, float reactionTime) {
    // center *= 0.;

	float sparkT = planeIntersection(rpos - center, rdir, sparkPlaneNormal);
	float floorT = planeIntersection(rpos - center, rdir, waterNormal);

	// float sparkT = planeIntersection(rpos - center, rdir, vec3(0.587785, 0.0, -0.809017));
	// float floorT = planeIntersection(rpos - center, rdir, vec3(0., 1., 0.));
	
	vec4 col = vec4(0.0, 0.0, 0.0, rdir.y < 0.0 ? 1.0 : 1.0);
	vec3 sparkCol = vec3(0.0, 0.0, 0.0);
	
	vec3 floorPos = rpos + rdir * floorT;
	vec3 sparkPos = rpos + rdir * sparkT;

    float maxSparksSubstraction = 3.*sparksNumber / 4.;

    float attenuation = min(.9, (reactionTime - .1) / .2);

    float sizeFactor =  sparksSizeFactor / (1. - attenuation);

    float sparksSubstraction = maxSparksSubstraction * attenuation;
	
	float time = iTime * SPEED_FACTOR;
    if (time < 0. || time > 2. ) return vec3(0., 0., 0.);
	for (int i = 0; i < MAX_SPARKS; i++)
	{
        float float_i = float(i);
        if (float_i >= sparksNumber - sparksSubstraction) break;
		// Calculate spark position and velocity
		float a = spread(vec2(i, 1.0))*SPREAD_FACTOR+MIN_ANGLE;
		float b = spread(vec2(i, 3.0))*RAND_FACTOR;
		float startTime = spread(vec2(i, 5.0)) * GROUP_FACTOR;
		vec3 dir = sampleAngle(a) * 10.0 * (1. - attenuation);
        vec3 gravity = -1.2 * 2. * waterNormal / sizeFactor;
	
		vec3 start = -dir * (1.35 + b * 0.3) / sizeFactor;
		vec3 force = start * 0.02 + gravity;

		float c = (time + startTime) * 20.0;
        if (c > 20.) break;
		vec3 offset = center + start * c + force * c * c * 0.5;
        bool visible = true;
        if (dot(offset - center, waterNormal) < 0.) {
            visible = false;
        }
		
		vec3 v = start + force * c;
		float vel = length(v) * sparksLengthFactor;
		vec3 vdir = normalize(v);
		vec4 sc = color(c);
				
		// Shade floor
		if (true || rdir.y < 0.0) {
			vec3 spos = floorPos - offset;
			float h = cylinder(spos, vdir, vel);
						
			float invRad = 10.0;
			float dist = h * 0.5;
			float atten = 1.0 / (1.0 + 2.0 * invRad * dist + invRad * invRad * dist * dist);
			if (floorT <= sparkT && sparkT > 0.0) {
				dist += 0.8;
				atten += 1.0 / (1.0 + 100.0*dist*dist*dist);
			}
            atten /= sizeFactor;
			col += vec4(sc.xyz * sc.w * atten, 0.0) * brightness;
		}
	
		// Shade sparks
		if (visible) {
			vec3 spos = sparkPos - offset;			
			float h = cylinder(spos, vdir, vel);
				
			if (h < 0.0) {
				sparkCol += vec3(sc.xyz * sc.w);
			} else {
				float dist = h * 0.05 * sizeFactor + sparksGlowOffset;
				float atten = 1.0 / (1.0 + 100.0 * pow(dist, sparksGlow));
				sparkCol += sc.xyz * sc.w * (atten);
				// sparkCol += sc.xyz * sc.w * (atten + clamp(1.0 - h * sparkT * 0.05, 0.0, 1.0));
			}
		}
	}
	
	vec3 final =  col.xyz + sparkCol * brightness;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.000002;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.00002;
	return final + vec3(rand(vec2(fragCoord.x * fragCoord.y, iTime))) * 0.002;
}

// Ray-generation
vec3 sparks(vec2 px, vec3 offset, float reactionTime) {
	vec2 rd = (px / iResolution.yy - vec2(iResolution.x/iResolution.y*0.5-0.5, 0.0)) * 2.0 - 1.0;
    rd *= -1.;
    float d = 1. / tan(fov / 2.); // TODO pre compute this before shader
	vec3 rdir = normalize(vec3(rd.x , rd.y, d));
    vec3 center = (gl_ModelViewMatrix * vec4(offset, 1.)).xyz;
	return pow(trace(vec3(0., 0., 0.), rdir, px, center, reactionTime), vec3(0.4545));
}

`;var xe,rt,ot;class Ce{constructor(e,r,l,d){we(this,xe);if(this.gl=e,this.calibration=l,this.copyVideo=!1,this.show=!1,this.videoStartTime=d,e===null){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),this.shader=new v.Shader(`
    out highp vec2 vTextureCoord;
    out vec3 waterNormal;
    out vec3 sparkPlaneNormal;
    out vec3 sparkDirection;
    out vec2 posScreen;

    uniform float ratio_screen;
    uniform float dx_screen;
    uniform mat4 calib_MVPMI;

    void main(void) {
        // vec4 posAbsolute = calib_MVPMI * vec4(gl_Vertex.xz*1000., 0., 1.);
        // vec4 posAbsolute = gl_ModelViewProjectionMatrixInverse * vec4(gl_Vertex.xz, 0., 1.);
        // gl_Position = gl_ModelViewProjectionMatrix * posAbsolute;
        gl_Position = vec4(gl_Vertex.xz, 0., 1.);
        gl_Position.x *= ratio_screen;

        waterNormal = (gl_ModelViewMatrix * vec4(0., 1., 0., 0.)).xyz;
        sparkPlaneNormal = (gl_ModelViewMatrix * vec4(-1., 0., 0., 0.)).xyz;
        sparkDirection = (gl_ModelViewMatrix * vec4(0., 0., 1., 0.)).xyz;
        vTextureCoord = gl_TexCoord.st;
        posScreen = gl_Position.xy;
    }
`,`
    in highp vec2 vTextureCoord;
    in vec3 waterNormal;
    in vec3 sparkPlaneNormal;
    in vec3 sparkDirection;
    in vec2 posScreen;
    out vec4 fragColor;

    uniform sampler2D uSampler;
    uniform sampler2D screen;
    uniform bool screenAvailabe;
    uniform bool sparksEnabled;
    uniform vec3 poolSize;
    uniform bool thresholdBlending;
    uniform float blendingThreshold;
    uniform float opacity;
    uniform float distanceFixed;
    uniform bool hideObstructions;
    uniform float hideObstructionThreshold;

    `+At+Se+`

    float cross2D(vec2 a, vec2 b) {
        return a.x * b.y - a.y * b.x;
    }

    bool isOverPool(vec2 p) {
        vec4 A = vec4(-poolSize.x/2., 0., poolSize.z/2., 1.);
        vec4 B = vec4(-poolSize.x/2., 0., -poolSize.z/2., 1.);
        vec4 C = vec4(poolSize.x/2., 0., -poolSize.z/2., 1.);
        vec4 D = vec4(poolSize.x/2., 0., poolSize.z/2., 1.);

        vec4 a_hom = gl_ModelViewProjectionMatrix*A;
        vec4 b_hom = gl_ModelViewProjectionMatrix*B;
        vec4 c_hom = gl_ModelViewProjectionMatrix*C;
        vec4 d_hom = gl_ModelViewProjectionMatrix*D;

        vec2 a = a_hom.xy / a_hom.w;
        vec2 b = b_hom.xy / b_hom.w;
        vec2 c = c_hom.xy / c_hom.w;
        vec2 d = d_hom.xy / d_hom.w;


        float c1 = cross2D(b-a, p-a);
        float c2 = cross2D(c-b, p-b);
        float c3 = cross2D(d-c, p-c);
        float c4 = cross2D(a-d, p-d);

        
        return c1 <= 0. && c2 <= 0. && c3 <= 0. && c4 <= 0.;


    }

    void main(void) {
        highp vec4 texelColor = texture(uSampler, vTextureCoord);

        if (screenAvailabe) {
            vec4 screenColor = texture(screen, posScreen/2. + .5);
            float alpha = screenColor.a;
            if (alpha < .9) {
                fragColor = vec4(0., 0., 0., 0.);
                return;
                // fragColor.a = 0.;
            }
            else {
                fragColor = texelColor;
                return;
            }
        }
        // if (max(max(texelColor.r, texelColor.g), texelColor.b) < .2){
        //     fragColor = vec4(0., 0., 0., 0.);
        //     return;
        // }
        
        vec3 waterColor = vec3(.294, .812, 1.);

        vec3 waterColor1 = vec3(.39, .98, .9);
        vec3 waterColor2 = vec3(.08, .57, .59);

        float r = opacity;
        if (thresholdBlending) {
            if (length(waterColor - texelColor.rgb) < blendingThreshold ||
             length(texelColor.rgb) > 1.5 && texelColor.b > .1 + (texelColor.r + texelColor.g) * .5) r = 0.3 * opacity;
        }
        fragColor = vec4(texelColor.rgb, r);

        if (hideObstructions && isOverPool(posScreen)){
            if (max(max(texelColor.r, texelColor.g), texelColor.b) < hideObstructionThreshold) fragColor = vec4(0., 0., 0., 0.);
            // return;
        }

        

        // vec4 backgroundCol = texture(screen, (posScreen+1.)/2.);
        // if (backgroundCol.r > .6) {
        //     fragColor = vec4(0., 0., 0., 1.);
        // }
        //fragColor.a += 1. - r;
        if (!sparksEnabled) return;
        vec3 spark1 = sparks(gl_FragCoord.xy, vec3(2., 1., -poolSize.z / 2.), .1);
        vec3 spark2 = sparks(gl_FragCoord.xy, vec3(-2., 1., -poolSize.z / 2.), .1);
        vec3 spark = vec3(0., 0., 0.);
        // spark = spark1 + spark2;
        for (int i = 0; i < 10; i++) {
            float i_float = float(i);
            vec3 sparkPos = vec3(25. / 2. - 25. / 10. / 2. - i_float * 25./10., 1., -25.);
            float reactionTime = getSwimmerReactionTime(i);
            spark += sparks(gl_FragCoord.xy, sparkPos, reactionTime);
        }
        // fragColor = vec4(mix(fragColor.rgb, spark, .5), max(0.5, 2.*length(spark)));
        fragColor = vec4(mix(fragColor.rgb, spark, 2.*length(spark)), max(0.5, 2.*length(spark)));
        if (thresholdBlending) {
            fragColor.a = r;
        }
        // fragColor = vec4(fragColor.rgb + spark, max(0.5, 2.*length(spark)));
        // float m = max(fragColor.r, max(fragColor.g, fragColor.b));
        // if (m > 1.) fragColor.rgb /= m;
        // fragColor = vec4(spark, 2.*length(spark));
        // fragColor = vec4(1, 0, 0, 1);
    }
`),this.mesh=v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.mesh.transform(v.Matrix.rotate(90,1,0,0)),this.mesh.transform(v.Matrix.translate(0,.1,0)),this.programInfo=null,this.texture=this.initTexture(),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),r!=""&&(this.video=this.setupVideo(r))}render(){let e=!1;const r=i.params.visualizations.sparks,l=i.params.simulation.poolSize;if(!i.params.video.show)return;this.copyVideo&&this.updateTexture(),(!this.mesh.vertexBuffers||!this.mesh.vertexBuffers.vertex)&&this.mesh.compile(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);const u=16*this.gl.canvas.height/9,p=(this.gl.canvas.width-u)/2,_=this.gl.modelviewMatrix;this.gl.projectionMatrix.multiply(_).inverse(),G.swimmersAttributesTexture&&G.swimmersAttributesTexture.bind(1),e=i.classicalOverlayEnabled&&i.drawingFameBuffer!==null,e&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i.drawingFameBufferB),i.gl.activeTexture(i.gl.TEXTURE15),i.gl.bindTexture(i.gl.TEXTURE_2D,i.drawingTexture)),this.shader.uniforms({ratio_screen:u/this.gl.canvas.width,dx_screen:p/this.gl.canvas.width,calib_MVPMI:i.MVPMI?i.MVPMI.m:new Float32Array(16),uSampler:0,swimmersHelperFunctions:1,screen:15,screenAvailabe:e,iTime:i.getRaceTime(),poolSize:[l.x,l.y,l.z],iResolution:[this.gl.canvas.width,this.gl.canvas.height],sparksEnabled:r.enabled,sparksGlow:r.glow,sparksGlowOffset:r.glowOffset,sparksStroke:r.stroke,sparksNumber:r.num,sparksLengthFactor:r.lengthFactor,sparksSizeFactor:r.sizeFactor,fov:r.fov,thresholdBlending:i.params.video.thresholdBlending,blendingThreshold:i.params.video.blendingThreshold,opacity:i.params.video.opacity,distanceFixed:i.distanceFixed,hideObstructions:i.params.video.hideObstructions,hideObstructionThreshold:i.params.video.hideObstructionThreshold}).draw(this.mesh),this.gl.disable(this.gl.BLEND),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),e&&q(this,xe,rt).call(this)}async setTime(e){if(!this.copyVideo||Math.abs(this.video.currentTime-e)<1e-6)return;const r=this.video;let l;const d=new Promise(u=>{l=u});if(r.currentTime=e,r.requestVideoFrameCallback)r.requestVideoFrameCallback(()=>l());else{const u=()=>{r.removeEventListener("seeked",u),l()};r.addEventListener("seeked",u,{once:!0})}await d}initTexture(){const e=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,e);const r=0,l=this.gl.RGBA,d=1,u=1,p=0,_=this.gl.RGBA,R=this.gl.UNSIGNED_BYTE,D=new Uint8Array([0,0,255,255]);return this.gl.texImage2D(this.gl.TEXTURE_2D,r,l,d,u,p,_,R,D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),e}updateTexture(){const r=this.gl.RGBA,l=this.gl.RGBA,d=this.gl.UNSIGNED_BYTE;this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,r,l,d,this.video)}setupVideo(e){const r=document.createElement("video");let l=!1,d=!1;r.playsInline=!0,r.muted=!0,r.loop=!1,r.addEventListener("playing",()=>{l=!0,p()},!0),r.addEventListener("timeupdate",()=>{d=!0,p()},!0),r.src=e,r.play();const u=this,p=()=>{l&&d&&(u.copyVideo=!0,r.paused||q(this,xe,ot).call(this))};return r}}xe=new WeakSet,rt=function(){const e=i.drawingTextureB;i.drawingTextureB=i.drawingTexture,i.drawingTexture=e,this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i.drawingFameBufferB),this.gl.bindTexture(this.gl.TEXTURE_2D,i.drawingTextureB),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i.drawingTextureB,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i.drawingFrameBuffer),this.gl.bindTexture(this.gl.TEXTURE_2D,this.drawingTexture),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i.drawingTexture,0)},ot=function(){this.hasPausedFirstTime||(this.hasPausedFirstTime=!0,this.video.pause())};class ze{constructor(e,{poolSize:r=new GL.Vector(2,2),waterResolution:l=new GL.Vector(256,256),thresholdBlending:d=!1,numSwimmers:u=1,dataFolder:p=null}){this.title=e,this.videos=[],this.poolSize=r,this.waterResolution=l,this.numSwimmers=u,this.thresholdBlending=d,this.dataFolder=p}addVideo(e){this.videos.push(e)}async parseData(e){for(let r=0;r<e.length;r++)await e[r].parseData(this.dataFolder+r+".csv")}}const $e=new v.Vector(0,-4,0);class ge{constructor(e,r,l=new v.Vector(1,1,1),d=null){this.initCenter=new v.Vector(e.x,e.y,e.z),this.center=new v.Vector(e.x,e.y,e.z),this.oldCenter=new v.Vector(e.x,e.y,e.z),this.radius=r,this.cinematic=!1,this.velocity=new v.Vector(0,0,0),this.acceleration=new v.Vector(0,0,0),this.mass=4/3*Math.PI*Math.pow(r,3)*1e3,this.invMass=1/this.mass,this.radiusSquared=r*r,this.mesh=v.Mesh.sphere({detail:10}),this.followTarget=!1,this.showStreak=!1,this.buoyancyFactor=d,this.color=l}spawnSplashes(e){if(!i.params.simulation.splashes.enabled&&!i.params.visualizations.showStreaks)return;const r=this.center.subtract(this.oldCenter).multiply(1/e),l=r.z>0?-Math.PI/2:Math.PI/2,d=r.dot(r);let u=this.center.subtract(this.velocity.unit());i.isSceneSynchronizedSwimming()&&(u=this.center.clone()),u.y=.15,!i.isSceneSynchronizedSwimming()&&i.params.simulation.splashes.enabled&&this.center.x<100&&Math.abs(this.center.y)<=this.radius&&i.splashParticles.spawnSplash(u,l,Math.sqrt(d),i.params.simulation.splashes.strengthThreshold,{});let p=(this.velocity.length()-1.6)/.9;const _={fixed:!0};if(i.isSceneSynchronizedSwimming())_.shrinking=.02;else{const R=new v.Vector(p,0,1-p);R.multiply(1/R.max()),_.color=R}_.shrinking=.2,i.params.visualizations.showStreaks&&this.showStreak&&this.velocity.length()>.01&&i.splashParticles.spawnSplash(this.center,0,p,0,_)}update(e){if(this.moved||(this.oldCenter=new v.Vector(this.center.x,this.center.y,this.center.z)),this.moved=!1,this.cinematic){if(this.followTarget||(this.velocity=new v.Vector(0,0,0)),!this.targetPos||!this.followTarget)return;let r=e/this.targetTime;r=Math.min(Math.max(r,0),1),this.center=this.center.multiply(1-r).add(this.targetPos.multiply(r)),this.velocity=this.center.subtract(this.oldCenter).multiply(1/e),this.targetTime-=e,this.targetTime<0&&(this.targetPos=null)}else{const r=Math.max(0,Math.min(1,(this.radius-this.center.y)/(2*this.radius))),l=this.buoyancyFactor?this.buoyancyFactor:i.params.simulation.buoyancyFactor,d=$e.multiply(-l*this.mass*r),u=this.velocity.unit().multiply(-1e3*this.radiusSquared*r*this.velocity.dot(this.velocity));this.addForce(u),this.addForce(d),this.addForce($e.multiply(this.mass)),this.velocity=this.velocity.add(this.acceleration.multiply(e)),this.acceleration=new v.Vector(0,0,0),this.center=this.center.add(this.velocity.multiply(e)),this.center.y<this.radius-i.params.simulation.poolSize.y&&(this.center.y=this.radius-1,this.velocity.y=Math.abs(this.velocity.y)*.7)}}setTarget(e,r){this.targetPos=e,this.targetTime=r}addForce(e){this.cinematic?console.warn("Trying to add force to a cinematic sphere."):this.acceleration=this.acceleration.add(e.multiply(this.invMass))}move(e){this.moved=!0,this.oldCenter=new v.Vector(this.center.x,this.center.y,this.center.z),this.center=new v.Vector(e.x,e.y,e.z),this.cinematic||console.warn("Moving a non cinematic sphere.")}}class Rt{constructor(){this.mesh=new v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.waterTexture=null,this.shader=new v.Shader(`
            out highp vec2 pos;
            out highp vec2 vTextureCoord;


            void main(void) {
                gl_Position = vec4(gl_Vertex.xy, 0., 1.);
                pos = gl_Vertex.xz;

                vTextureCoord = gl_TexCoord.st;
            }
        `,`
            in highp vec2 pos;
            in highp vec2 vTextureCoord;

            uniform sampler2D foamTexPrev;
            uniform sampler2D water;
            uniform float velThreshold;
            uniform float velMax;
            uniform float dispersion;
            uniform float dt;
            uniform float seed;
            uniform float timeVariation;
            uniform float spaceVariation;
            uniform float attenuation;
            uniform vec3 poolSize;

            out vec4 fragColor;

            #define M_PI 3.14159265358979323846

            float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
            float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
            float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

            float perlin(vec2 p, float dim, float time) {
                vec2 pos = floor(p * dim);
                vec2 posx = pos + vec2(1.0, 0.0);
                vec2 posy = pos + vec2(0.0, 1.0);
                vec2 posxy = pos + vec2(1.0);
                
                float c = rand(pos, dim, time);
                float cx = rand(posx, dim, time);
                float cy = rand(posy, dim, time);
                float cxy = rand(posxy, dim, time);
                
                vec2 d = fract(p * dim);
                d = -0.5 * cos(d * M_PI) + 0.5;
                
                float ccx = mix(c, cx, d.x);
                float cycxy = mix(cy, cxy, d.x);
                float center = mix(ccx, cycxy, d.y);
                
                return center * 2.0 - 1.0;
            }
            
            float computeFoam(vec2 uv) {
                vec4 info = texture(water, uv);
                float velocity = info.g / dt;

                // if (velocity > .01) return 1.;

                float foam = 0.0;

                // velocity-based foam
                foam += smoothstep(velThreshold, velMax, length(velocity));

                // // curvature-based foam (difference with neighbors)
                // foam += smoothstep(curvThreshold, curvMax, abs(height - avgNeighborHeight));

                // // collision boost (optional)
                // foam += collisionImpact * collisionFactor;

                //TODO î

                // clamp
                foam = clamp(foam, 0.0, 1.0);
                return foam;
            }

            vec2 getPrevUV(vec2 uv) {
                vec4 info = texture(water, uv);
                float velocity = info.g / dt;

                float factor = (.1*dispersion + velocity*.01);

                float perlinDim = 1.;

                vec2 res = uv;

                vec2 pos = uv*poolSize.xz;

                res.x += perlin(pos.xy*spaceVariation + vec2(seed*timeVariation, 0.), perlinDim, 0.) * factor;
                res.y += perlin(pos.yx*spaceVariation + vec2(seed*timeVariation, 0.), perlinDim, 0.) * factor;
                //TODO
                // vec2 vel = texture(velocityTex, res).xy;
                // vec2 prevUV = res - vel * dt;

                // float oldFoam = texture(foamTexPrev, prevUV).r;
                return res;
            }

            void main() {

                float oldFoam = texture(foamTexPrev, getPrevUV(vTextureCoord)).r;
                float newFoam = computeFoam(vTextureCoord); // your velocity/curvature logic

                float foam = oldFoam * (1.-attenuation) + newFoam * 0.2;

                // foam = 1.;

                fragColor = vec4(foam, 0.0, 0.0, 1.0);

            }
        `)}updateFoam(e){if(!this.waterTexture){console.log("NO WATER TO UPDATE FOAM");return}this.foamTexNext.swapWith(this.foamTexPrev),this.foamTexNext.drawTo(()=>{this.foamTexPrev.bind(0),i.water.textureA.bind(1),this.shader.uniforms({foamTexPrev:0,water:1,dt:e,seed:i.time,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],timeVariation:i.params.simulation.foam.timeVariation,spaceVariation:i.params.simulation.foam.spaceVariation,velThreshold:i.params.simulation.foam.velThreshold,velMax:i.params.simulation.foam.velMax,dispersion:i.params.simulation.foam.dispersion,attenuation:i.params.simulation.foam.attenuation}).draw(this.mesh)})}resetTextures(e,r,l){this.foamTexPrev=new v.Texture(e,r,{type:i.gl.FLOAT,filter:i.gl.LINEAR}),this.foamTexNext=new v.Texture(e,r,{type:i.gl.FLOAT,filter:i.gl.LINEAR}),this.waterTexture=l}}function ae(s,e=null){this.gl=s,this.visualizationWavesEnabled=!0,this.sqrt_2_PI=Math.sqrt(2*Math.PI),this.foam=new Rt;var r=`
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `;this.reset(e),v.Texture.canUseFloatingPointTextures(),this.dropShader=new v.Shader(r,`
    const float PI = 3.141592653589793;
    uniform sampler2D tex;
    uniform vec2 center;
    uniform vec3 poolSize;
    uniform float radius;
    uniform float strength;
    in vec2 coord;
    out vec4 fragColor;
    void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);
      
      /* add the drop to the height */
      float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / (radius / poolSize.z));
      drop = 0.5 - cos(drop * PI) * 0.5;
      info.r += drop * strength;
      
      fragColor = info;
    }
  `),this.updateShader=new v.Shader(r,`
    uniform sampler2D tex;
    uniform vec2 delta;
    uniform float prev_wr;
    uniform float damping;
    uniform float sqrt_2_PI;
    uniform vec3 poolSize;
    `+Se+`
    in vec2 coord;
    out vec4 fragColor;


    void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);

      /* calculate average neighbor height */
      vec2 dx = vec2(delta.x, 0.0);
      vec2 dy = vec2(0.0, delta.y);
      float average = (
      texture(tex, coord - dx).r +
      texture(tex, coord - dy).r +
      texture(tex, coord + dx).r +
      texture(tex, coord + dy).r
    ) * 0.25;

    /* change the velocity to move toward the average */
    info.g += (average - info.r) * 2.0;

    /* attenuate the velocity a little so waves do not last forever */
    float d = damping;
    vec2 pos = (coord - .5) * poolSize.xz;
    float halfLane = poolSize.x / 20.;
    for (int i = 0; i < 10; i++) {
    float i_float = float(i);
      if (i_float > swimmersNumber - 0.1) break;
      vec2 swimmerPos = getSwimmerPosition(i);
      if (abs(swimmerPos.x - pos.x) <= halfLane) {
        d = getSwimmerWaterDamping(i);
        break;
      }
    }
    info.g *= 1. - d;/*TODO parametriser ça*/

    /* move the vertex along the velocity */
    info.r += info.g;
      

    fragColor = info;
  }
  `),this.normalShader=new v.Shader(r,`
    uniform sampler2D tex;
    uniform vec2 delta;
    in vec2 coord;
    out vec4 fragColor;
  void main() {
      /* get vertex info */
      vec4 info = texture(tex, coord);

      /* update the normal */
      vec3 dx = vec3(delta.x, texture(tex, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);
      vec3 dy = vec3(0.0, texture(tex, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);
    info.ba = normalize(cross(dy, dx)).xz;

    fragColor = info;
  }
  `),this.sphereShader=new v.Shader(`
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      // displacement = texture(displacementTexture, coord).r;
      // oldDisplacement = texture(oldDisplacementTexture, coord).r;

      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `,`
    uniform sampler2D tex;
    
    
    uniform vec3 poolSize;
    in vec2 coord;
    uniform sampler2D oldDisplacementTexture;
    uniform sampler2D displacementTexture;
    uniform bool optimized;
    uniform float radius;
    uniform vec3 newCenter;
    uniform vec3 oldCenter;

    out vec4 fragColor;
    
    float volumeInSphere(vec3 center) {
      vec3 toCenter = vec3((coord.x - 0.5) * poolSize.x, 0.0, (coord.y - 0.5) * poolSize.z) - center;
      float t = length(toCenter) / radius;
      float dy = exp(-pow(t * 1.5, 6.0));
      float ymin = min(0.0, center.y - dy);
      float ymax = min(max(0.0, center.y + dy), ymin + 2.0 * dy);
    return (ymax - ymin) * 0.1;
  }

  void main() {

  vec4 info = texture(tex, coord);
  
  if (optimized) {
      float displacement = texture(displacementTexture, coord).r;
      float oldDisplacement = texture(oldDisplacementTexture, coord).r;

      
      info.r += oldDisplacement - displacement;
      fragColor = info;
      return;
    }

    fragColor = info;

    // vec2 diff = oldCenter.xz - newCenter.xz;
    // float distSq = dot(diff, diff);
    // float eps = poolSize.x * .5;
    if (abs(newCenter.z) > 2.*poolSize.z) return;

    // /* add the old volume */
    info.r += volumeInSphere(oldCenter);

    // /* subtract the new volume */
    info.r -= volumeInSphere(newCenter);

    fragColor = info;
  }
  `),this.visualizationWavesShader=new v.Shader(r,`
    uniform sampler2D tex;
    uniform bool add;
    uniform vec3 poolSize;
    uniform bool showWR;
    uniform bool showDivingDistance;
    in vec2 coord;
    out vec4 fragColor;
    uniform float t;

    `+Se+`

    const int order = 20;

    uniform float amplitudeFactor;
    uniform float frequencyFactor;
    uniform float amplitude;
    uniform float omega0;
    uniform float waveLength0;

    float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}

    float waveFunctionExp(vec2 pos) {
      float y = 0.0;
      for (int i = 0; i < 20; i++) {
        float i_float = float(i); 
        float seed = i_float + .5;
        float kx = rand(vec2(seed, seed));
        float ky = rand(vec2(seed, -seed));
        float omega = rand(vec2(-seed, seed));
        vec2 k = normalize(vec2(kx, ky));
        k *= waveLength0 * pow(frequencyFactor, i_float);
        omega = omega0 * (omega - .5) * pow(frequencyFactor, i_float);
        float s = sin(dot(k, pos) + omega * t) * amplitude * pow(amplitudeFactor, i_float);
        y += exp(s - 1.0) - .37;
      }
      return y;
    }

    float interpIntensity(float intensity) {
      return 1. - sqrt(2.*intensity - intensity * intensity);
    }

    void main() {
      vec4 info = texture(tex, coord);
      float w = 0.;
      if(showDivingDistance) w += getDivingWaves(coord).x;
      if(showWR) w += getRecordWave(coord);
      info.r += add ? w : -w;
      float h = 0.;
      if (time < 0.) {
        float interval = 5.;
        float intensity = -time / interval;
        // intensity = .5;
        intensity = min(max(intensity, 0.), 1.);
        intensity = 1. - intensity;
        intensity = interpIntensity(intensity);
        h = waveFunctionExp(coord*poolSize.xz) * intensity;
      }
      info.r += add ? h : -h;
      fragColor = info;

    }
    `)}ae.prototype.resetTextures=function(){const s=this.gl;this.textureA&&s.deleteTexture(this.textureA.id),this.textureB&&s.deleteTexture(this.textureB.id),this.textureA=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.foam.resetTextures(this.W,this.H,this.textureA),this.areaConservationTexture=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.showAreaConservedGrid=!1,this.showProjectionGrid=!1,this.invPoolSize=new v.Vector(1/i.params.simulation.poolSize.x,1/i.params.simulation.poolSize.y,1/i.params.simulation.poolSize.z);var e=v.Texture.canUseFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST;(!this.textureA.canDrawTo()||!this.textureB.canDrawTo())&&v.Texture.canUseHalfFloatingPointTextures()&&(console.log("No draw"),e=v.Texture.canUseHalfFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST,this.textureA=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}))};ae.prototype.reset=function(s=null){this.WR_position=1e5,this.prev_WR_position=0,s!==null?(console.log("resolution.y : "+s.y),this.W=Math.round(s.x),this.H=Math.round(s.y),console.log("Using custom resolution:",this.W,this.H)):(this.W=256,this.H=256),G.reset(new v.Vector(this.W,this.H)),this.plane=v.Mesh.plane({detail:255,width:i.params.simulation.poolSize.x,height:i.params.simulation.poolSize.z}),this.delta=new v.Vector(1/this.W,1/this.H),this.resetTextures()};ae.prototype.addDrop=function(s,e,r,l){var d=this;this.textureB.drawTo(function(){d.textureA.bind(),d.dropShader.uniforms({invPoolSizeVertex:[d.invPoolSize.x,d.invPoolSize.z],center:[s,e],radius:r,strength:l,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z]}).draw(d.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.addOrRemoveVisualizationWaves=function(s){if(i.classicalOverlayEnabled)return;const e=2.155;if(this.prev_WR_position=this.WR_position,this.WR_position=i.getRaceTime()*e,this.WR_position>i.params.simulation.poolSize.z&&(this.WR_position=2*i.params.simulation.poolSize.z-this.WR_position),!(!this.visualizationWavesEnabled||!G.raceHasStarted)){var r=this;this.textureB.drawTo(function(){r.textureA.bind();const l=G.getAttributesTexture();l&&l.bind(1),r.visualizationWavesShader.uniforms({swimmersAttributesTexture:1,showDivingDistance:i.params.visualizations.showDivingDistance,showWR:i.params.visualizations.showWR,invPoolSizeVertex:[r.invPoolSize.x,r.invPoolSize.z],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],wr:r.WR_position,sqrt_2_PI:r.sqrt_2_PI,add:s,swimmersNumber:i.swimmers.length,time:i.getRaceTime(),t:i.time,amplitudeFactor:i.params.quiver.amplitudeFactor,frequencyFactor:i.params.quiver.frequencyFactor,amplitude:i.params.quiver.amplitude,omega0:i.params.quiver.omega,waveLength0:i.params.quiver.waveLength}).draw(r.plane)}),this.textureB.swapWith(this.textureA)}};ae.prototype.updateSpheres=function(s){if(i.params.simulation.optimized)G.attributes.draw(),this.textureB.drawTo(()=>{this.textureA.bind(),G.bindDisplacementTexture(1),G.bindOldDisplacementTexture(2),this.sphereShader.uniforms({oldDisplacementTexture:2,displacementTexture:1,invPoolSizeVertex:[this.invPoolSize.x,this.invPoolSize.z],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],optimized:!0}).draw(this.plane),this.textureB.swapWith(this.textureA),G.attributes.draw()});else{const e=[];i.swimmers.forEach(r=>r.spheres.forEach(l=>e.push(l)));for(let r=0;r<e.length;r++){const l=e[r];this.moveSphere(l.oldCenter,l.center,l.radius)}}};ae.prototype.moveSphere=function(s,e,r){var l=this;this.textureB.drawTo(function(){l.textureA.bind(),l.sphereShader.uniforms({invPoolSizeVertex:[l.invPoolSize.x,l.invPoolSize.z],oldCenter:s,newCenter:e,radius:r,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],optimized:!1}).draw(l.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.stepSimulation=function(s){var e=this;this.textureB.drawTo(function(){e.textureA.bind();const r=G.getAttributesTexture();r&&r.bind(2),e.updateShader.uniforms({swimmersAttributesTexture:2,swimmersNumber:i.swimmers.length,invPoolSizeVertex:[e.invPoolSize.x,e.invPoolSize.z],delta:[e.delta.x,e.delta.y],time:i.time,wr:e.WR_position,prev_wr:e.prev_WR_position,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],sqrt_2_PI:e.sqrt_2_PI,damping:i.params.simulation.waterDamping}).draw(e.plane)}),this.textureB.swapWith(this.textureA),i.params.simulation.foam.enabled&&this.foam.updateFoam(s),this.updateAreaConservation()};ae.prototype.updateNormals=function(){var s=this;this.textureB.drawTo(function(){s.textureA.bind(),s.normalShader.uniforms({invPoolSizeVertex:[s.invPoolSize.x,s.invPoolSize.z],delta:[s.delta.x,s.delta.y]}).draw(s.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.updateAreaConservation=function(){if(!i.params.visualizations.areaConservationEnabled)return;var s,e,r;if(this.textureA.type===this.gl.FLOAT)s=this.gl.FLOAT,e=Float32Array,r="EXT_color_buffer_float";else if(this.textureA.type===this.gl.HALF_FLOAT_OES)s=this.gl.HALF_FLOAT_OES,e=Uint16Array,r="EXT_color_buffer_half_float";else{console.warn("Unsupported texture type for reading");return}if(!this.gl.getExtension(r)){console.warn(r+" not available; cannot read pixels");return}this.fb||(this.fb=this.gl.createFramebuffer()),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.textureA.id,0);const l=this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);if(l!==this.gl.FRAMEBUFFER_COMPLETE){console.error("Framebuffer incomplete: "+l+" for texture type "+this.textureA.type),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);return}this.gl.pixelStorei(this.gl.PACK_ALIGNMENT,1);const d=new e(this.W*this.H*4),u=new Float32Array(this.W*this.H*4);this.gl.readPixels(0,0,this.W,this.H,this.gl.RGBA,s,d);for(let S=0;S<this.W;S++)u[S*4+1]=1;const p=i.params.simulation.poolSize.x/this.W,_=i.params.simulation.poolSize.z/this.H,R=p*p,D=_*_;if(this.textureA.type===this.gl.FLOAT){for(let S=0;S<this.H;S+=1)for(let w=0;w<this.W;w+=1){const F=(S*this.W+w)*4,B=((this.H-1-S)*this.W+w)*4,g=u[B],A=u[B+1];if(w+1<this.W){const z=d[F]-d[F+4],V=Math.sqrt(z*z+R);u[B+4]=g+V}if(S+1<this.H){const z=d[F]-d[F+this.W*4],V=Math.sqrt(z*z+D);u[B-4*this.W+1]=A+V}}this.gl.bindTexture(this.gl.TEXTURE_2D,this.areaConservationTexture.id),this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.W,this.H,this.gl.RGBA,this.gl.FLOAT,u)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.bindTexture(this.gl.TEXTURE_2D,null)};const Ct=`#version 300 es
    in vec3 pos;
    in float life;
    in float size;
    in vec3 color;
    in float isFixed;

    out float vLife;
    out vec3 vColor;
    out float altitude;
    out float vFixed;
    out float vSize;

    uniform mat4 MVM;
    uniform mat4 projection;
    uniform bool showStreaks;
    uniform bool showSplashes;


    void main() {
        vec4 posInView = MVM * vec4(pos, 1.);
        gl_Position = projection * posInView;
        // gl_Position = vec4(0., 0., 0., 1.);
        gl_PointSize = size * 5000. / -posInView.z;

        // if (isFixed > 0.) gl_PointSize = 500. / -posInView.z;

        if (isFixed > 0. && !showStreaks) gl_PointSize = 0.;
        if (isFixed == 0. && !showSplashes) gl_PointSize = 0.;

        vLife = life;
        vColor = min(color, 1.);
        altitude = pos.y;
        vFixed = isFixed;
        vSize = size;
    }

`,zt=`#version 300 es
    precision mediump float;

    in float vLife;
    in vec3 vColor;
    in float altitude;
    in float vFixed;
    in float vSize;

    out vec4 fragColor;

    float max3(vec3 v) {
        return max(max(v.x, v.y), v.z);
    }

    void main() {
        vec3 col = vColor;
        // if (isFixed) {
        //     col = vec3(vColor, 0., 1. - vColor);
        //     col /= max3(col);
        // }
        vec2 uv = gl_PointCoord - 0.5;

        float d = length(uv);

        // soft circle
        float alpha = smoothstep(0.5, 0.0, d);

        if (vSize >= .3) alpha *= 2.; 

        // fade with life
        if(vFixed < .1) alpha *= vLife;
        else alpha *= pow(vLife, 1.);

        if (altitude < 0. && vFixed >.1) alpha /= (1.-altitude)*2.;

        if (altitude < 0. && vFixed < .1) alpha /= (1.-altitude)*4.;

        if (vLife > 1.) alpha = 0.;
        fragColor = vec4(col, alpha);
    }

`,Ft=-9.8,Ye=.01;class je{constructor(e,r,l,d,{shrinking:u=1,size:p=null}){this.pos=e,this.vel=r,this.fixed=l,this.color=d,this.life=1,this.size=p||Math.random()*.05+.02,this.shrinking=u}update(e){if(this.fixed){this.life-=e*.15*this.shrinking;return}this.life-=e*1.5*this.shrinking,this.vel.y+=Ft*e,this.pos=this.pos.add(this.vel.multiply(e)),this.vel=this.vel.multiply(1-Ye),this.size*=1-Ye*this.shrinking}}class Pt{constructor(e){this.gl=e,this.particles=[],this.particleBuffer=this.gl.createBuffer(),this.initPrograms()}spawnSplash(e,r,l,d,{fixed:u=!1,color:p=new v.Vector(1,1,1),speed0:_=1,maxParticles:R=15,shrinking:D=null,size:S=null}){let w=D!==null?D:1;if(u){const B=new v.Vector(0,0,0),g=p||new v.Vector(l,0,1-l);p===null&&g.multiply(1/g.max());const A=S||.1,z=new je(e,B,u,g,{shrinking:w,size:A});z.life+=w*.1,this.particles.push(z);return}const F=Math.min(R,l*20);for(let B=0;B<F;B++){const g=(Math.random()-.5)*Math.PI,A=Math.random()*2*Math.PI,z=_*(.5+Math.random()),V=new v.Vector(Math.sin(g)*Math.cos(A)*z,Math.cos(g)*z,Math.sin(g)*Math.sin(A)*z);this.particles.push(new je(e,V,u,p,{shrinking:w}))}}update(e){this.particles.forEach((r,l)=>{r.update(e),r.life<=0&&this.particles.splice(l,1)})}buildShader(e,r){const l=this.gl.createShader(r);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const r=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(r,l)}),this.gl.linkProgram(r),r}checkShaders(e,r,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(r)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}buildProgram(e,r){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(r,this.gl.FRAGMENT_SHADER),u=this.createProgram([l,d]);return this.checkShaders(l,d,u),u}initPrograms(){this.program=this.buildProgram(Ct,zt)}draw({showStreaks:e=!0,showSplashes:r=!0}){const l=this.gl;l.enable(l.BLEND),l.blendFunc(l.SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA);const d=[];this.particles.forEach(k=>{const K=k.pos;d.push(K.x,K.y,K.z,k.life,k.size,k.color.x,k.color.y,k.color.z,k.fixed)}),l.bindBuffer(l.ARRAY_BUFFER,this.particleBuffer),l.bufferData(l.ARRAY_BUFFER,new Float32Array(d),l.DYNAMIC_DRAW),l.useProgram(this.program);const u=l.getUniformLocation(this.program,"MVM"),p=new Float32Array(l.modelviewMatrix.m);l.uniformMatrix4fv(u,!0,p);const _=l.getUniformLocation(this.program,"projection"),R=new Float32Array(l.projectionMatrix.m);l.uniformMatrix4fv(_,!0,R);const D=l.getUniformLocation(this.program,"showStreaks");l.uniform1i(D,e);const S=l.getUniformLocation(this.program,"showSplashes");l.uniform1i(S,r);const w=l.getAttribLocation(this.program,"pos"),F=l.getAttribLocation(this.program,"life"),B=l.getAttribLocation(this.program,"size"),g=l.getAttribLocation(this.program,"color"),A=l.getAttribLocation(this.program,"isFixed"),z=l.FLOAT,V=!1,N=4,U=9*N;let I=0;l.bindBuffer(l.ARRAY_BUFFER,this.particleBuffer),l.vertexAttribPointer(w,3,z,V,U,I),l.enableVertexAttribArray(w),I=3*N,l.vertexAttribPointer(F,1,z,V,U,I),l.enableVertexAttribArray(F),I=4*N,l.vertexAttribPointer(B,1,z,V,U,I),l.enableVertexAttribArray(B),I=5*N,l.vertexAttribPointer(g,3,z,V,U,I),l.enableVertexAttribArray(g),I=8*N,l.vertexAttribPointer(A,1,z,V,U,I),l.enableVertexAttribArray(A),l.drawArrays(l.POINTS,0,this.particles.length),l.disable(l.BLEND)}}function qe(s){const e={};for(let r=0;r<s.length;r++)e[s[r]]=r;return e}const oe=new v.Vector(1e3,0,-1e3),Ke=["none","only medals","all"],Ze=["neighbours","per swimmer"],Mt=["none","cycle frequency","speed","acceleration"],Dt={none:{value:0,name:"PARAMETER_NONE"},"cycle frequency":{value:1,name:"PARAMETER_CYCLES"},speed:{value:2,name:"PARAMETER_SPEED"},acceleration:{value:3,name:"PARAMETER_ACCELERATION"}},Lt=["realistic","height field","lambert","toon"],It={realistic:{value:0,name:"RENDERING_REALISTIC"},"height field":{value:1,name:"RENDERING_HEIGHT_FIELD"},lambert:{value:2,name:"RENDERING_LAMBERT"},toon:{value:3,name:"RENDERING_TOON"}};var Y,Bt,st,at,nt,lt,ct,dt,ht,Ve,ut;class kt{constructor(){we(this,Y);this.params={numSteps:2,fov:45,visualizations:{enabled:!0,showFlags:!1,showWR:!1,showSpeed:!1,showDivingDistance:!0,showFinishTimes:!1,showStreaks:!1,customWaterPerturbation:"none",waterColorParameter:"none",customParametersList:Mt,customParametersDict:Dt,PARAMETER_NONE:"none",PARAMETER_CYCLES:"cycle frequency",PARAMETER_SPEED:"speed",PARAMETER_ACCELERATION:"acceleration",showSwimmersLines:"none",swimmersLinesList:Ke,showSwimmersLinesDict:qe(Ke),swimmersLinesMode:"neighbours",swimmersLinesModeList:Ze,swimmersLinesModeDict:qe(Ze),medalsModeBeforeFinish:"none",medalsModesDict:{none:0,stars:1,bright:2,lanes:3},medalsModeAfterFinish:"none",areaConservationEnabled:!0,rendering:"realistic",renderingList:Lt,renderingDict:It,transitionBeginTime:null,shadow:{enabled:!0,shadowRadius:.5,shadowPower:.5,showCircle:!0,circleRadius:.6,circleStroke:.15},sparks:{enabled:!1,glow:5,glowOffset:.5,lengthFactor:1,stroke:.01,num:40,sizeFactor:50,fov:Math.PI/4}},swimmers:{showSpheres:!0,useTracking:!1},video:{thresholdBlending:!1,blendingThreshold:.41,show:!1,opacity:1,hideObstructions:!1,hideObstructionThreshold:.35},simulation:{heightLimit:.04,optimized:!1,waterDamping:.02,poolSize:new v.Vector(4,1,4),buoyancyFactor:1.1,foam:{enabled:!0,velThreshold:.35,velMax:3,dispersion:.015,timeVariation:2.5,spaceVariation:25,attenuation:.015},splashes:{enabled:!0,strengthThreshold:2}},quiver:{amplitudeFactor:.78,frequencyFactor:1.2,amplitude:.1,omega:2,waveLength:1},cornerView:{show:!0},chronoPhotography:{available:!1}},this.resolution=new v.Vector(256,256),this.gl=v.create({preserveDrawingBuffer:!0}),this.gl.canvas.tabIndex=0,this.originalVisParams=JSON.parse(JSON.stringify(this.params.visualizations)),delete this.originalVisParams.shadow,delete this.originalVisParams.sparks,this.useConfigFile=!1,this.time=0,this.swimmers=[],this.translateX=0,this.translateY=0,this.zoomDistance=4,this.angleX=-25,this.angleY=-200.5,this.angleZ=0,this.water=null;const e=new ze("—",{poolSize:new v.Vector(2,1,2),waterResolution:new v.Vector(256,256),numSwimmers:1}),r=new le({});e.addVideo(new Ce(this.gl,"",r));const l=new ze("100m freestyle",{poolSize:new v.Vector(25,2,50),waterResolution:new v.Vector(1024,2048),numSwimmers:10,thresholdBlending:!0,dataFolder:"./assets/race-data/"}),d=new le({tx:-.53,ty:1.25,zoom:47.86,ax:-29,ay:-260.5,az:-5,fov:39.98});l.addVideo(new Ce(this.gl,"swimming-race.mp4",d,16.5)),this.currentVideo=l.videos[0];const u=new ze("synchronized swimming",{poolSize:new v.Vector(25,2,30),waterResolution:new v.Vector(1024,2048),numSwimmers:2,dataFolder:"./assets/synchronized-swimming-data/"}),p=new le({tx:-1.32,ty:.4,zoom:32.41,ax:-18,ay:-291.5,az:1,fov:42.8});u.addVideo(new Ce(this.gl,"synchronized-swimming.mp4",p,0)),this.scenesList=[e,l,u],this.scenes={},this.scenesList.forEach(_=>this.scenes[_.title]=_),this.currentScene=e,this.paused=!1,this.configPlayButton(),this.transitions={},this.playingDemo=!1,this.renderWater=!0,this.renderCube=!0,this.spheresRadiusCoeff=1,this.distanceFixed=0,this.chronoFrameBuffer=this.gl.createFramebuffer(),this.drawingFrameBuffer=null,this.drawingFameBufferB=this.gl.createFramebuffer(),this.drawingTextureB=this.gl.createTexture(),this.drawingTexture=this.gl.createTexture(),this.resetDrawingTexture(),this.cornerView=!1,this.splashParticles=new Pt(this.gl),this.floaters=[],this.showTimeline=!0,this.MVPMI=null,this.bubbleSpheres=[],this.classicalOverlayEnabled=!1}hideEditorPanel(e){const r=document.getElementById("event-editor");r&&(r.style.display=e?"block":"none")}resetDrawingTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.chronoFrameBuffer),this.gl.bindTexture(this.gl.TEXTURE_2D,this.drawingTexture);const e=this.gl.canvas.width,r=this.gl.canvas.height;this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,e,r,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.drawingTexture,0);const l=this.gl.createRenderbuffer();this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,l),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,r),this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.drawingFameBufferB),this.gl.bindTexture(this.gl.TEXTURE_2D,this.drawingTextureB),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,e,r,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.drawingTextureB,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}configStopButton(){this.stopButton=document.getElementById("stop-button"),this.stopButton.addEventListener("click",()=>{this.stopRace()})}configPlayButton(){this.configStopButton(),this.playButton=document.getElementById("play-button"),this.playButton.addEventListener("click",()=>{this.playButton.textContent=="pause"?this.pause():(G.raceHasStarted||this.startRace(),this.play())})}setCalibration(e){this.translateX=e.tx,this.translateY=e.ty,this.zoomDistance=e.zoom,this.angleX=e.ax,this.angleY=e.ay,this.angleZ=e.az,this.params.fov=e.fov,this.gl.matrixMode(this.gl.PROJECTION),this.gl.loadIdentity(),this.gl.perspective(this.params.fov,this.gl.canvas.width/this.gl.canvas.height,.01,100),this.gl.matrixMode(this.gl.MODELVIEW)}updateFloaters(e){}isSceneSynchronizedSwimming(){return this.currentScene.title=="synchronized swimming"}setMVPMI(){const e=this.gl.modelviewMatrix,l=this.gl.projectionMatrix.multiply(e);this.MVPMI=l.inverse(),console.log("MVPMI set")}async setScene(e){if(console.log("SET SCENE : "+e),this.currentScene=this.scenes[e],this.currentScene){q(this,Y,st).call(this,this.currentScene.poolSize),this.currentScene.title=="100m freestyle"?q(this,Y,at).call(this):this.floaters=[];const r=document.getElementById("time-slider-container");this.currentVideo=this.currentScene.videos[0],this.params.video.show=!!this.currentVideo.video,this.params.swimmers.showSpheres=!this.currentVideo.video,r.hidden=!this.currentVideo.video,this.currentScene.title!="—"?this.params.simulation.waterDamping=.1:this.params.simulation.waterDamping=.02;const l=this.currentScene.numSwimmers;if(console.log("num swimmers : "+l),this.swimmers.length!=l){for(let d=this.swimmers.length;d<l;d++){const u=new G(new v.Vector(0,0,0));this.swimmers.push(u)}for(let d=this.swimmers.length;d>l;d--)this.swimmers=this.swimmers.slice(1);this.swimmers.forEach(d=>d.waterDamping=this.params.simulation.waterDamping)}this.params.swimmers.useTracking=!0,await this.currentScene.parseData(this.swimmers),this.swimmers.forEach(d=>d.update(0)),console.log("scene name : "+this.currentScene.title),this.setCalibration(this.currentVideo.calibration),this.resolution=this.currentScene.waterResolution,this.params.video.thresholdBlending=this.currentScene.thresholdBlending,this.currentScene.thresholdBlending?this.params.video.opacity=1:this.params.video.opacity=.5,this.params.visualizations.areaConservationEnabled=!1,this.stopRace(),this._reset(),this.params.simulation.optimized=!!this.currentVideo.video,this.useConfigFile=!this.isSceneSynchronizedSwimming(),this._setPannelMinimized(this.currentScene.title!="100m freestyle"),this.isSceneSynchronizedSwimming()&&(this.params.simulation.foam.velThreshold=0,this.params.simulation.foam.velMax=2.2,this.params.simulation.foam.dispersion=.0025,this.params.simulation.foam.timeVariation=2.5,this.params.simulation.foam.spaceVariation=10,this.params.simulation.foam.attenuation=2e-4)}}useGravity(e){G.useGravity=e;for(let r of i.swimmers)r.body.cinematic=!G.useGravity}isOneVisualizationEnabled(){return this.params.visualizations.showFlags||this.params.visualizations.medalsModeBeforeFinish!="none"||this.params.visualizations.medalsModeAfterFinish!="none"||this.params.visualizations.showWR||this.params.visualizations.showSpeed||this.params.visualizations.showDivingDistance}updateTime(e){this.time+=e,this._updateDistanceMarker&&this._updateDistanceMarker()}getRaceTime(){return G.raceHasStarted?this.time-this.currentVideo.videoStartTime:0}resetParams(){Object.entries(this.originalVisParams).forEach(e=>{const r=e[0],l=e[1];this.params.visualizations[r]=l}),this.params.visualizations.areaConservationEnabled=!1}updateEventIndex(){for(this.currentEventIndex=0;this.events[this.currentEventIndex]&&this.events[this.currentEventIndex].time<this.getRaceTime();)this.currentEventIndex++;this.currentEventIndex>0&&this.currentEventIndex--}setRaceTime(e){const r=this.currentVideo.videoStartTime?this.currentVideo.videoStartTime:0;this.time=r+e,this.currentVideo.video&&this.currentVideo.setTime(this.time),this.events&&(this.updateEventIndex(),this.resetParams())}showTexts(e){document.getElementById("h").hidden=!e,e?this.showCommands&&(document.getElementById("commands").hidden=!1):(this.showCommands=!document.getElementById("commands").hidden,document.getElementById("commands").hidden=!0)}startRace(){this.currentVideo.videoStartTime>=3?this.setRaceTime(-3):this.setRaceTime(0),this.currentVideo.video&&this.currentVideo.video.play(),this.swimmers.forEach(e=>e.startRace()),G.raceHasStarted=!0,G.useGravity=!0,this.water.resetTextures(),this.water.WR_position=0,this.stopButton.hidden=!1,this._clearChronoTexture(this.gl.canvas.width,this.gl.canvas.height,this.gl),this.showTexts(!1)}stopRace(){this.paused&&this.play(),this.setRaceTime(0),this.currentVideo.video&&this.currentVideo.video.pause(),this.swimmers.forEach(e=>e.swim(!1)),G.raceHasStarted=!1,this.water.resetTextures(),this.playButton.textContent="play",this.stopButton.hidden=!0,this.showTexts(!0)}pause(){this.paused=!0,this.pauseVideo(),this.playButton.textContent="play"}play(){this.paused=!1,G.raceHasStarted&&(this.playVideo(),this.playButton.textContent="pause")}pauseVideo(){this.currentVideo.video&&this.currentVideo.video.pause()}playVideo(){this.currentVideo.video&&(this.currentVideo.video.play(),this.currentVideo.video.currentTime=this.time)}renderVideo(){this.currentVideo.video&&this.currentVideo.render()}parseConfigFile(e){fetch(e).then(r=>r.text()).then(r=>{this.events=JSON.parse(r),this.currentEventIndex=0,this._renderTimeline&&this._renderTimeline()})}updateTransitions(){Object.entries(this.transitions).forEach(e=>{const r=e[0],l=e[1],d=this.getRaceTime()-l.beginTime;if(d>l.duration){delete this.transitions[r];return}l.show?l.opacity=d/l.duration:l.opacity=1-d/l.duration})}updateParams(){if(!G.raceHasStarted||!this.events||!this.useConfigFile)return;const e=this.events[this.currentEventIndex];if(!e)return;let r=e.rankSwimmerToggle;if(r||(r=1),e.distance&&this.swimmers[r-1].getDistanceTraveled()>=e.distance||e.time!==void 0&&this.getRaceTime()>=e.time){this.currentEventIndex++;const l=e.transition&&e.transition.type=="dissolve";Object.entries(e.params).forEach(d=>{const u=d[0],p=d[1];u!=="transition"&&(l&&(p===!0||p===!1)&&(this.transitions[u]={opacity:1-1*p,show:p,beginTime:this.getRaceTime(),duration:e.transition.duration}),this.params.visualizations[u]=p)})}}chronoPhotography({circle:e=!1}){console.log("shoot"),this.distanceFixed=this.swimmers[0].getDistanceTraveled(),console.log("distance fixed : "+this.distanceFixed),this._fixTexture(e)}recalibrate(){this.currentVideo&&this.setCalibration(this.currentVideo.calibration)}async updateVideoForOfflineRendering(){if(this.currentVideo&&this.currentVideo.video){if(this.time<0||this.time>this.currentVideo.video.duration)return;await this.currentVideo.setTime(this.time)}}async launchDemo(){this.playingDemo=!0,this.parseConfigFile("./assets/vis-config-classical-overlay.json"),this.params.chronoPhotography.available=!0,this.drawingFrameBuffer=this.chronoFrameBuffer,console.log("Launch demo"),await this.setScene("100m freestyle").then(()=>{this.params.video.show=!1,this.translateX=200}),this._gui.hide(),document.getElementById("event-editor").hidden=!0,document.getElementById("time-slider-container").hidden=!0,document.getElementById("h").hidden=!0,this.demoTime=0,this.classicalOverlayEnabled=!0,this.startRace(),this.params.visualizations.showDivingDistance=!1,this.params.visualizations.shadow.enabled=!1,this.params.simulation.splashes.enabled=!1,this.demoEvents=[{time:0,text:`Situated Water-Based Visual Effects for Sports Video Augmentation 
 Submission to IEEE Vis 2026 #1528`,duration:4,pause:!0},{time:0,text:"Reproduction of the current TV approach",duration:2,action:()=>{this.params.video.show=!0,this.translateX=this.currentVideo.calibration.tx}},{time:8,text:"Currently they use an overlay projection plan.",duration:2,action:()=>this.showOverlayPlane=!0,pause:!1},{time:10,text:"Then the flags are drawn on the overlay.",duration:2,action:()=>this.params.visualizations.showFlags=!0,pause:!1},{time:12,text:"The overlay is transparent where nothing is drawn.",duration:3,action:()=>this.showOverlayPlane=!1,pause:!1},{time:16,text:"Our method",duration:3,action:()=>q(this,Y,nt).call(this),pause:!1},{time:4,text:"We use water-based visual effects to amplify swimming race data",duration:5,pause:!1},{time:15,text:"Method breakdown",duration:3,action:()=>q(this,Y,lt).call(this),pause:!0},{time:.5,text:"Evan Wallace's WebGL water",duration:3.5,pause:!1},{time:4,text:"nothing",duration:0,action:()=>q(this,Y,ct).call(this),pause:!1},{time:0,text:"We adapted to swimming",duration:2,action:()=>this.showOverlayPlane=!1,pause:!0},{time:.5,text:"Pool",duration:1,pause:!1},{time:1.5,text:"Water",duration:1,pause:!1},{time:2.5,text:"Floaters",duration:1,action:()=>this.hideFloaters=!1,pause:!1},{time:3.5,text:"Spheres",duration:2,pause:!1},{time:6,text:"Let' start a swimming race",duration:1},{time:7.5,text:"Flag appear with water-based transition",duration:2.5,pause:!0,calib:new le({tx:16.9,ty:6.9,zoom:20.5,ax:-37,ay:-126.5,az:-5,fov:39.98})},{time:11.5,text:"Diving points and swimmers' shadows",duration:2.5,pause:!0,calib:new le({tx:9,ty:-10,zoom:3,ax:-30,ay:-15,az:0,fov:39.98})},{time:14.8,text:"Breakout points",duration:2,pause:!0,calib:new le({tx:-3,ty:-7,zoom:12,ax:-30,ay:10,az:0,fov:39.98})},{time:15.7,text:"Speeds",duration:1.5,pause:!1},{time:17.2,text:"First swimmers lines",duration:1.5,pause:!1},{time:18.7,text:"Potential medals",duration:1.5,pause:!1},{time:20.2,text:"World record line",duration:1.5,pause:!1},{time:22.5,text:"Embedding in the original swimming race video",duration:2,pause:!1},{time:24.5,text:"Hiding spheres",duration:2.5,pause:!1},{time:27,text:"Hiding obstructions",duration:2,pause:!1},{time:28.5,text:"Corner view from above",duration:2,action:()=>this.params.cornerView.show=!0,pause:!1},{time:33.5,text:"Transferring to synchronized swimming",duration:20,action:()=>q(this,Y,dt).call(this),pause:!1},{time:27.5,text:"Artificially enhanced foam to draw the trajectory",duration:2,pause:!1},{time:30.1,text:"Splashes to emphasize an event",duration:2,pause:!0}],this.currentDemoEvent=this.demoEvents.shift()}stopDemo(){this.playingDemo=!1,this.setScene("—"),document.getElementById("event-editor").hidden=!1,document.getElementById("time-slider-container").hidden=!1,document.getElementById("h").hidden=!1,this.renderWater=!0,this.renderCube=!0,this.params.visualizations.shadow.enabled=!0,this._gui.show(),this.params.simulation.buoyancyFactor=1.1}updateDemo(e){if(!this.playingDemo)return;if(this.demoEventDisplayed){if(this.demoEventDuration+=e,this.currentDemoEvent.calib){const g=this.currentDemoEvent.duration;let A;this.demoEventDuration<g/6||this.demoEventDuration>5*g/6?A=0:this.demoEventDuration<=g/2?A=(this.demoEventDuration-g/6)/(g/3):A=1-(this.demoEventDuration-g/2)/(g/3),this.demoShowVideoTime||(this.demoSavedCalib.ay+=15*e),this.setCalibration(this.demoSavedCalib.interpolate(this.currentDemoEvent.calib,A,.33))}if(this.demoEventDuration>this.currentDemoEvent.duration)this.demoEventDisplayed=!1,this.play(),this.demoSavedCalib&&this.setCalibration(this.demoSavedCalib),this.demoSavedCalib=null,this.currentDemoEvent=this.demoEvents.shift(),document.getElementById("demo-text").innerText="";else if(this.currentDemoEvent.pause)return}this.demoTime+=e,!this.demoEventDisplayed&&this.currentDemoEvent&&this.demoTime>this.currentDemoEvent.time&&(this.demoEventDisplayed=!0,this.demoEventDuration=0,this.currentDemoEvent.pause&&this.pause(),document.getElementById("demo-text").innerText=this.currentDemoEvent.text,this.currentDemoEvent.action&&this.currentDemoEvent.action(),this.currentDemoEvent.calib&&(this.demoSavedCalib=new le({tx:this.translateX,ty:this.translateY,zoom:this.zoomDistance,ax:this.angleX,ay:this.angleY,az:this.angleZ,fov:this.params.fov})));const r=this.demoTime;if(!this.demoPart3Started||this.demoPart5Started)return;const l=1.5,d=3.5,u=4.5,p=6.5,_=1;if(r<=_){const g=q(this,Y,Ve).call(this,0,_,r);this.translateX=g*this.currentVideo.calibration.tx+(1-g)*200}if(this.demoPart4Started)this.demoShowVideoTime||(this.angleY+=15*e);else return;if(!this.renderWater&&r>l&&(this.renderWater=!0),r>l&&r<l+.5)for(var R=0;R<10;R++)this.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,R&1?.6:-.6);q(this,Y,ht).call(this,r,d),!G.raceHasStarted&&r>=u&&r<p&&(this.params.simulation.splashes.enabled=!1,this.swimmers.forEach(g=>{g.body.cinematic=!0;const A=new v.Vector(g.body.center.x,0,0),z=new v.Vector(g.body.center.x,1,-this.params.simulation.poolSize.z/2);g.body.move(q(this,Y,ut).call(this,A,z,u,p,r))})),!G.raceHasStarted&&r>=p&&(this.params.simulation.buoyancyFactor=1.1,this.params.simulation.splashes.enabled=!0,this.params.visualizations.shadow.enabled=!0,this.startRace()),!this.demoShowVideoTime&&this.angleY>=this.currentVideo.calibration.ay+360&&(this.demoShowVideoTime=22.5),!this.params.video.show&&this.demoShowVideoTime&&r>=this.demoShowVideoTime&&(this.params.video.show=!0,this.params.video.opacity=0);const D=2;this.params.video.show&&r<=this.demoShowVideoTime+D&&(this.params.video.opacity=(r-this.demoShowVideoTime)/D,console.log("opacity : "+this.params.video.opacity));const S=2;let w=null;this.demoShowVideoTime&&(w=this.demoShowVideoTime+D+S),this.params.video.show&&r>this.demoShowVideoTime+D&&r<w&&(this.spheresRadiusCoeff=1-(r-(this.demoShowVideoTime+D))/S);let F=null;w&&(F=w+.5);const B=2;F&&r>F&&r<F+B&&(this.params.video.hideObstructions=!0,this.params.video.hideObstructionThreshold=(r-F)/B*.5)}}Y=new WeakSet,Bt=function(){this.gl.matrixMode(this.gl.PROJECTION),this.gl.loadIdentity(),this.gl.perspective(this.params.fov,this.gl.canvas.width/this.gl.canvas.height,.01,100),this.gl.matrixMode(this.gl.MODELVIEW),this.gl.loadIdentity(),this.gl.translate(this.translateX,this.translateY,-this.zoomDistance),this.gl.rotate(-this.angleZ,0,0,1),this.gl.rotate(-this.angleX,1,0,0),this.gl.rotate(-this.angleY,0,1,0),this.gl.translate(0,.5,0)},st=function(e){console.log("SET POOL SIZE : "+e.z),this.params.simulation.poolSize.x=e.x,this.params.simulation.poolSize.y=e.y,this.params.simulation.poolSize.z=e.z},at=function(){this.floaters=[];const e=.1,r=this.params.simulation.poolSize,l=r.x/10,d=r.z/(2*e),u=-r.z/2,p=-r.x/2,_=new v.Vector(0,1/2,0),R=new v.Vector(1/2,1/2,0),D=new v.Vector(0,.5/2,1/2),S=new v.Vector(1/2,0,0),w=[_,D,D,R,R,R,D,D,_];for(let F=1;F<10;F++)for(let B=0;B<d;B++){const g=new v.Vector(p+F*l,0,u+e+B*2*e);let A=w[F-1];(Math.abs(g.z)>=20||Math.abs(g.z)<=.5||Math.abs(Math.abs(g.z)-10)<=.25)&&(A=S),this.floaters.push(new ge(g,e,A,2.5))}},nt=function(){this.classicalOverlayEnabled=!1,this.params.chronoPhotography.available=!1,this.drawingFrameBuffer=null,this.parseConfigFile("./assets/vis-config.json"),this.stopRace(),this.params.simulation.splashes.enabled=!0,this.params.visualizations.shadow.enabled=!0,this.startRace(),this.params.video.hideObstructions=!0,this.params.cornerView.show=!1,this.water.resetTextures(),this.demoTime=0,this.demoSecondPartStarted=!0},lt=function(){this.stopRace(),this.params.video.hideObstructions=!1,this.demoTime=0,this.params.visualizations.shadow.enabled=!1,this.setScene("—").then(()=>{this.useGravity(!0),this.swimmers[0].body.center.y=.5,this.translateX=200,this.params.simulation.splashes.enabled=!1,this.pause()}),this.demoPart3Started=!0},ct=function(){this.params.cornerView.show=!1,this.params.simulation.splashes.enabled=!0,this.hideFloaters=!0,this.stopRace(),this.parseConfigFile("./assets/vis-config-demo-2.json"),this.setScene("100m freestyle").then(()=>{this.translateX=200,this.swimmers.forEach(e=>e.body.move(oe))}),this.classicalOverlayEnabled=!1,this.params.video.show=!1,this.params.swimmers.showSpheres=!0,this.spheresRadiusCoeff=1,this.swimmersShown=0,this.useGravity(!0),this.params.simulation.buoyancyFactor=1.5,this.params.visualizations.shadow.enabled=!1,this.renderWater=!1,this.hideFloaters=!0,this.demoTime=0,this.demoPart4Started=!0},dt=function(){this.stopRace(),this.parseConfigFile("./assets/vis-config-classical-overlay.json"),this.setScene("synchronized swimming").then(()=>{this.startRace(),this.params.video.hideObstructions=!1}),this.demoPart5Started=!0,this.demoTime=0},ht=function(e,r){const d=Math.floor((e-r)/.1);if(this.swimmersShown<10&&d>=this.swimmersShown){console.log("swimmers shown : "+this.swimmersShown),console.log("next index swimmer : "+d),console.log("num swimmers : "+this.swimmers.length),this.params.simulation.poolSize.x;const u=this.swimmers[d];u.body.move(new v.Vector(u.body.initCenter.x,.5,0)),this.swimmersShown++}},Ve=function(e,r,l){if(l<e)return 0;if(l>r)return 1;const d=(l-e)/(r-e);return 1-(Math.cos(d*Math.PI)+1)/2},ut=function(e,r,l,d,u){const p=q(this,Y,Ve).call(this,l,d,u);console.log("t norm : "+p);const _=(R,D,S,w=1)=>Math.pow(S,w)*D+(1-Math.pow(S,w))*R;return new v.Vector(_(e.x,r.x,p),_(e.y,r.y,p,20),_(e.z,r.z,p,2))};const i=new kt;i.parseConfigFile("./assets/vis-config.json");const Ot=`#version 300 es
    const float ARM_DELTA_X = float(`+ke+`);
    const float FOOT_DELTA_X = float( `+Be+`);
    const float FOOT_DELTA_Z = float( `+Oe+`);
    uniform vec2 invPoolSize;
    in vec4 iData1;
    in vec4 iData2;
    in vec4 iData3;
    out float fragAltitude;
    out float fragCyclePhase;
    void main() {
        fragCyclePhase = iData3.r;
        fragAltitude = iData2.a;
        vec2 center = iData1.rg;
        vec2 ips = vec2(.5, .5);
        gl_Position = vec4(center * 2. * invPoolSize, 0., 1.); // TODO SET ips TO invPoolSize
        gl_PointSize = 1.;
    }

`,Vt=`#version 300 es
    precision highp float;
    in float fragCyclePhase;
    in float fragAltitude;
    const float PI = 3.141592;
    out vec4 fragColor;
    void main() {
        fragColor = vec4(fragAltitude, fragCyclePhase / (2. * PI), 1., 1.);
    }
`,Nt=`#version 300 es
    in vec2 iVertex;
    out vec2 fragCoord;
    void main() {
        fragCoord = iVertex * .5 + .5;
        gl_Position = vec4(iVertex.xy, 0., 1.);
    }
`,Ut=`#version 300 es
    precision highp float;
    uniform sampler2D tex;
    uniform vec2 poolSize;
    uniform bool horizontal;
    uniform bool show;
    uniform bool swapColor;
    uniform bool blur;
    in vec2 fragCoord;
    out vec4 fragColor;

    float volumeInSphere(vec2 diff, float altitude, float cyclePhase) {
        vec3 toCenter = vec3(diff.x, -altitude, diff.y);
        const float radius = .25;
        float t = length(toCenter) / radius;
        float dy = exp(-pow(t * 1.5, 6.0));
        float ymin = min(0.0, altitude - dy);
        float ymax = min(max(0.0, altitude + dy), ymin + 2.0 * dy);
        return (ymax - ymin) * 0.1;
    }

    vec4 horizontalPass(float radius, vec2 delta, int rx) {
        float radiusSq = radius*radius;
        vec4 res = vec4(0., 0., 0., .5);
        int N = textureSize(tex, 0).x;
        // float dx_texel = fragCoord.x * float(N) - floor(fragCoord.x * float(N)) - .5;
        // dx_texel /= float(N);
        // dx_texel *= poolSize.x;
        for(int i = -rx; i < rx; i++) {
            float i_float = float(i);
            //TODO tester si vraiment dans kernel
            float j_float = 0.;
            float diff = i_float * delta.x;
            vec2 p = fragCoord + vec2(diff, 0.);
            vec4 info = texture(tex, p);
            if(info.b != 0.) {
                float X = diff * poolSize.x;
                float Y = sqrt(radiusSq - X*X);
                res.g = Y;
                res.r = X;
                //res.r += volumeInSphere(vec2(-X, 0.), info.r, info.g) * 5.;
                res.b = info.r;
            }
        }
        return res;
    }

    vec4 verticalPass(float radius, vec2 delta, int ry) {
        // vec4 info = texture(tex, fragCoord);
        // return info;
        float radiusSq = radius*radius;
        int M = textureSize(tex, 0).y;
        float dy_texel = fragCoord.y * float(M) - floor(fragCoord.y * float(M)) - .5;
        dy_texel /= float(M);

        
        
        int N = textureSize(tex, 0).x;
        float dx_texel = fragCoord.x * float(N) - floor(fragCoord.x * float(N)) - .5;
        dx_texel /= float(N);

        vec2 d_texel = vec2(dx_texel, dy_texel);

        float dy = dy_texel * poolSize.y;
        vec4 res = vec4(0., 0., 0., .5);
        for(int j = -ry; j < ry; j++) {
            float j_float = float(j);
            //TODO tester si vraiment dans kernel
            float diff = j_float * delta.y;
            vec2 p = fragCoord + vec2(0., diff);
            vec2 p_centered = p - d_texel;
            vec4 info_centered = texture(tex, p_centered);
            p -= vec2(0., dy_texel);
            vec4 info = texture(tex, p);
            // info = info_centered;
            float Y = diff * poolSize.y;
            Y -= dy;
            if(info_centered.rgb != vec3(0., 0., 0.) && abs(Y) <= info.g) {
                float X = info_centered.r;
                res.r = volumeInSphere(vec2(X, Y), 2.*info_centered.b, info.g) * 5.;
            }
        }
        return res;
    }

    void main() {

        if (show) {
            fragColor = vec4(texture(tex, fragCoord).rgb, .7);
            if (swapColor) fragColor = vec4(texture(tex, fragCoord).grb, .7);
            return;
        }

        ivec2 textureSizeInt = textureSize(tex, 0);
        vec2 textureSize = vec2(float(textureSizeInt.x), float(textureSizeInt.y));
        vec2 delta = vec2(1./textureSize.x, 1./textureSize.y);
        const float radius = .25;
        float radiusSq = radius*radius;
        int rx = int(radius * textureSize.x / poolSize.x);
        int ry = int(radius * textureSize.y / poolSize.y);

        if (horizontal) fragColor = horizontalPass(radius, delta, rx);
        else fragColor = verticalPass(radius, delta, ry);
    }
`,Gt=new Float32Array([-1,-1,1,-1,1,1,-1,1]),Wt=new Uint16Array([0,1,2,2,3,0]);var ee,mt,ve,ft;class Xt{constructor(){we(this,ee);this.numVecAttributes=et,this.maxNumSwimmer=tt,this.gl=i.gl;const e=this.gl.NEAREST;this.texture=new v.Texture(this.numVecAttributes,this.maxNumSwimmer,{type:this.gl.FLOAT,filter:e}),this.initPrograms(),this.indexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,Wt,this.gl.STATIC_DRAW),this.vboPlane=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.bufferData(this.gl.ARRAY_BUFFER,Gt,this.gl.STATIC_DRAW),this.vboPoints=this.gl.createBuffer()}update(){this.numSwimmers=i.swimmers.length;const e=5;this.swimmersAttributes=new Float32Array(this.numVecAttributes*4*this.maxNumSwimmer*e);const r=q(this,ee,mt).call(this,i.swimmers);for(let l=0;l<i.swimmers.length;l++){const d=r[l];q(this,ee,ft).call(this,l,d),q(this,ee,ve).call(this,i.swimmers.length+l,d.leftArm),q(this,ee,ve).call(this,2*i.swimmers.length+l,d.rightArm),q(this,ee,ve).call(this,3*i.swimmers.length+l,d.leftFoot),q(this,ee,ve).call(this,4*i.swimmers.length+l,d.rightFoot)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture.id),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.numVecAttributes,this.maxNumSwimmer,this.gl.RGBA,this.gl.FLOAT,this.swimmersAttributes),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.swimmersAttributes,this.gl.DYNAMIC_DRAW)}buildShader(e,r){const l=this.gl.createShader(r);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const r=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(r,l)}),this.gl.linkProgram(r),r}checkShaders(e,r,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(r)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}createRenderingTexture(e,r){this.pointsTexture=new v.Texture(e,r,{type:this.gl.FLOAT,filter:this.gl.NEAREST}),this.pointsFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer);const l=this.gl.COLOR_ATTACHMENT0;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.pointsTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.horizontalPassTexture=new v.Texture(e,r,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.horizontalPassFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.horizontalPassTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);const d=r/4,u=d,p=d;this.displacementTexture=new v.Texture(u,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.displacementFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.displacementTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.oldDisplacementTexture=new v.Texture(u,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR})}buildProgram(e,r){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(r,this.gl.FRAGMENT_SHADER),u=this.createProgram([l,d]);return this.checkShaders(l,d,u),u}initPrograms(){this.programPoints=this.buildProgram(Ot,Vt),this.programVolume=this.buildProgram(Nt,Ut),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}volumePass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.useProgram(this.programVolume);const e=this.gl.getAttribLocation(this.programVolume,"iVertex"),r=this.gl.getUniformLocation(this.programVolume,"poolSize");this.gl.uniform2f(r,i.params.simulation.poolSize.x,i.params.simulation.poolSize.z);const l=this.gl.getUniformLocation(this.programVolume,"horizontal");this.gl.uniform1i(l,!0);const d=this.gl.getUniformLocation(this.programVolume,"show");this.gl.uniform1i(d,!1);const u=this.gl.getUniformLocation(this.programVolume,"swapColor");this.gl.uniform1i(u,!1);const p=2,_=this.gl.FLOAT,R=!1,D=0,S=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.vertexAttribPointer(e,p,_,R,D,S),this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pointsTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.uniform1i(l,!1),this.gl.uniform1i(d,!1),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.horizontalPassTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.viewport(0,0,this.displacementTexture.width,this.displacementTexture.height),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}pointPass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer),this.gl.useProgram(this.programPoints);const e=this.gl.getAttribLocation(this.programPoints,"iData1"),r=this.gl.getAttribLocation(this.programPoints,"iData2"),l=this.gl.getAttribLocation(this.programPoints,"iData3"),d=this.gl.getUniformLocation(this.programPoints,"invPoolSize");this.gl.uniform2f(d,1/i.params.simulation.poolSize.x,1/i.params.simulation.poolSize.z);const u=4,p=this.gl.FLOAT,_=!1,R=4,D=12*R;let S=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),e>=0&&(this.gl.vertexAttribPointer(e,u,p,_,D,S),this.gl.enableVertexAttribArray(e)),S=4*R,r>=0&&(this.gl.vertexAttribPointer(r,u,p,_,D,S),this.gl.enableVertexAttribArray(r)),S=2*4*R,l>=0&&(this.gl.vertexAttribPointer(l,u,p,_,D,S),this.gl.enableVertexAttribArray(l)),this.gl.viewport(0,0,this.pointsTexture.width,this.pointsTexture.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawArrays(this.gl.POINTS,0,5*this.numSwimmers)}updateOldDisplacementTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.oldDisplacementTexture.id),this.gl.copyTexSubImage2D(this.gl.TEXTURE_2D,0,0,0,0,0,this.oldDisplacementTexture.width,this.oldDisplacementTexture.height)}draw(){this.updateOldDisplacementTexture(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.pointPass(),this.volumePass(),this.gl.disable(this.gl.BLEND)}}ee=new WeakSet,mt=function(e){const r=function(u,p){return p.getDistanceTraveled()-u.getDistanceTraveled()};let l=0;e.forEach(u=>{u.hasFinished()>.1&&l++});const d=e.slice(0,l).concat(e.slice(l).sort(r));for(let u=0;u<e.length;u++)e[u]=d[u];return e},ve=function(e,r){this.swimmersAttributes[this.numVecAttributes*4*e]=r.center.x,this.swimmersAttributes[this.numVecAttributes*4*e+1]=r.center.z,this.swimmersAttributes[this.numVecAttributes*4*e+7]=r.center.y},ft=function(e,r){q(this,ee,ve).call(this,e,r.body),this.swimmersAttributes[this.numVecAttributes*4*e+2]=r.divingDistance,this.swimmersAttributes[this.numVecAttributes*4*e+3]=r.divingTime,this.swimmersAttributes[this.numVecAttributes*4*e+4]=r.reactionTime,this.swimmersAttributes[this.numVecAttributes*4*e+5]=r.body.velocity.z,this.swimmersAttributes[this.numVecAttributes*4*e+6]=r.nationality,this.swimmersAttributes[this.numVecAttributes*4*e+8]=r.breakoutDistance,this.swimmersAttributes[this.numVecAttributes*4*e+9]=r.breakoutTime,this.swimmersAttributes[this.numVecAttributes*4*e+10]=r.finishTime,this.swimmersAttributes[this.numVecAttributes*4*e+11]=r.waterDamping};function Fe(s=0,e=1){const r=1-Math.random(),l=Math.random();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*l)*e+s}const Ht=.5,$t=2,ue="Temps (s)",ye="event",Te="eventX",be="eventY",Yt="frequence (cylce/min)";var Re,pt;const $=class ${constructor(e){we(this,Re);this.startingPoint=new v.Vector(e.x,e.y,e.z),this.center=new v.Vector(e.x,e.y,e.z),this.force=new v.Vector(0,0,190+Fe(0,20)),this.reactionTime=Math.max(.1,Fe(.15,.02));const r=.25,l=.15;this.body=new ge(e,r),this.body.showStreak=!0,this.leftArm=new ge(oe,l),this.rightArm=new ge(oe,l),this.leftFoot=new ge(oe,l),this.rightFoot=new ge(oe,l),this.body.cinematic=!$.useGravity,this.leftArm.cinematic=!0,this.rightArm.cinematic=!0,this.leftFoot.cinematic=!0,this.rightFoot.cinematic=!0,this.spheres=[this.body,this.leftArm,this.rightArm,this.leftFoot,this.rightFoot],this.divingDistance=0,this.divingTime=1e3,this.breakoutDistance=0,this.breakoutTime=1e3,this.nationality=Math.random()>.5?0:1,this.currendDataIndex=0,this.useTracking=!1,this.armPulsation=2*Math.PI*$t,this.cycleTime=0,this.cyclePhase=0,this.finishTime=0,this.waterDamping=i.params.simulation.waterDamping}async parseData(e){await fetch(e).then(r=>{const l=r.headers.get("content-type");return!l||!l.includes("text/csv")?(console.log("no file found : "+e),null):r.text()}).then(r=>{if(!r)return;const l=r.split(`
`),d=l[0].split(/,|;/);this.data=l.slice(1).map(u=>{const p=u.split(/,|;/);return Object.fromEntries(d.map((_,R)=>[_,p[R]]))}),i.params.swimmers.useTracking&&(this.armPulsation=0)})}getDistanceTraveled(){const e=this.body.velocity.z,r=i.params.simulation.poolSize.z,l=this.body.center.z+r/2;return e>=0?l:2*r-l}startRace(){this.hasBrokeOut=!1,this.hasDove=!1,this.hasReacted=!1}jump(e=4.5){this.body.cinematic=!1,this.body.velocity=new v.Vector(0,0,e+Fe(0,1)),this.body.center=new v.Vector(this.startingPoint.x,1,-i.params.simulation.poolSize.z/2)}swim(e){this.hasReacted=e,this.isSwimming=e,this.finishTime=0,e||(this.body.followTarget=!1),e?(this.body.cinematic=!1,this.useGravity=!0,this.useTracking?this.moveToBeginning():this.body.center=new v.Vector(this.startingPoint.x,0,-i.params.simulation.poolSize.z/2)):(this.moveSpheresAway(),this.body.velocity=new v.Vector(0,0,0),this.body.center=new v.Vector(this.startingPoint.x,0,0))}moveToBeginning(){this.useTracking||console.warn("tried to use tracking on untracked swimmer");const e=this.data[0];this.body.center=q(this,Re,pt).call(this,e)}hasFinished(){return this.finishTime>.1}getArmOffset(e,r){r+=this.cyclePhase;const l=this.body.velocity.z>=0?this.armPulsation:-this.armPulsation;return new v.Vector(0,Math.cos(l*e+r),Math.sin(l*e+r)).multiply(Ht)}setCurrentDataIndex(){if(console.log("set current data index"),this.currendDataIndex=0,!!this.data){for(;this.data[this.currendDataIndex]&&this.data[this.currendDataIndex][ue]<i.getRaceTime();)this.currendDataIndex++;if(this.currendDataIndex+1<this.data.length){if(this.currendDataIndex-1>=0){const e=parseFloat(this.data[this.currendDataIndex][Te]);let r=e;const l=i.params.simulation.poolSize.z;e>l&&(r=2*l-r),r-=l/2;const d=this.body.center;d.x,i.isSceneSynchronizedSwimming()&&parseFloat(this.data[this.currendDataIndex][be])-i.params.simulation.poolSize.x/2,this.body.move(new v.Vector(d.x,d.y,r));const u=Math.sign(50-e)*.1;this.body.velocity=new v.Vector(0,0,u),console.log("vz : "+u)}this.body.setTarget(null),this.body.followTarget=!0,this.finishTime=0}}}findNextCycle(){let e=this.currendDataIndex+1;if(!this.data)return null;for(;this.data[e]&&this.data[e][ye]!="cycle";)e++;return this.data[e]?parseFloat(this.data[e][ue]):null}setDamping(e){if(i.params.visualizations.customWaterPerturbation==i.params.visualizations.PARAMETER_CYCLES){const r=parseFloat(e[Yt]);if(r<50)return;if(r>0){console.log("FREQ : "+r);const l=80,d=50;let u=(r-d)/(l-d);u=Math.max(Math.min(u,1),0);const p=.015,_=.25;this.waterDamping=p+(_-p)*(1-u)}}else this.waterDamping=i.params.simulation.waterDamping}handleTracking(e){if(this.hasReacted&&this.useTracking&&this.currendDataIndex<this.data.length&&this.data[this.currendDataIndex][ue]<e){this.setDamping(this.data[this.currendDataIndex]);let r=null,l=this.startingPoint.x,d=e;const u=this.data[this.currendDataIndex+1];this.currendDataIndex+1<this.data.length&&(r=parseFloat(u[Te]),i.isSceneSynchronizedSwimming()&&(r=i.params.simulation.poolSize.z-r*30/25,u[be]&&(l=parseFloat(u[be])-i.params.simulation.poolSize.x/2)),d=parseFloat(u[ue]));const p=i.params.simulation.poolSize.z;let _=-this.body.radius/2;const R=this.data[this.currendDataIndex][ye];if(R=="enter"||R=="turn"&&u[ye]!="under"){d=(e+d)/2,r=(this.body.center.z+p/2+r)/2;const S={[ue]:d,[Te]:r,[ye]:"under"};this.data.splice(this.currendDataIndex+1,0,S),_=-1.5}u&&u[ye]=="under"&&(_=-1.5),r>p&&(r=2*p-r),r-=i.params.simulation.poolSize.z/2;const D=new v.Vector(l,_,r);if(this.currendDataIndex+1<this.data.length?this.body.setTarget(D,d-e):this.body.setTarget(null),R=="figure"&&(console.log("FIGURE"),i.splashParticles.spawnSplash(D,null,1e4,null,{speed0:4,maxParticles:400}),i.chronoPhotography({circle:!0})),R=="cycle"){const S=parseFloat(this.data[this.currendDataIndex][ue]),w=this.findNextCycle();if(w){const B=1/(w-S);this.armPulsation=2*Math.PI*B,this.cycleTime=0,this.cyclePhase==0?this.cyclePhase=Math.PI:this.cyclePhase=0}}else R=="finish"&&(this.finishTime=this.data[this.currendDataIndex][ue],this.body.followTarget=!1,this.isSwimming=!1);this.currendDataIndex++}}moveSpheresAway(){this.rightArm.move(oe),this.leftArm.move(oe),this.rightFoot.move(oe),this.leftFoot.move(oe)}moveSpheres(e){if(this.body.center.z<=-i.params.simulation.poolSize.z/2+.1)return;this.cycleTime+=e;const r=this.getArmOffset(.5*this.cycleTime,0),l=this.getArmOffset(.5*this.cycleTime,Math.PI),d=this.getArmOffset(.5*this.cycleTime*2,0),u=this.getArmOffset(.5*this.cycleTime*2,Math.PI);this.rightArm.move(this.body.center.add(r).add(new v.Vector(ke,0,0))),this.leftArm.move(this.body.center.add(l).add(new v.Vector(-ke,0,0)));const p=this.body.velocity.z>=0?-Oe:Oe;this.rightFoot.move(this.body.center.add(new v.Vector(Be,d.y*.5,p))),this.leftFoot.move(this.body.center.add(new v.Vector(-Be,u.y*.5,p)))}update(e){const r=i.getRaceTime();!$.raceHasStarted&&this.data&&(this.useTracking=i.params.swimmers.useTracking),!this.hasReacted&&$.raceHasStarted&&(this.useTracking||r>this.reactionTime&&!i.params.swimmers.useTracking?(this.swim(!0),this.waterDamping=i.params.simulation.waterDamping,this.useTracking||this.jump(),this.useTracking&&(this.body.cinematic=!0,this.body.followTarget=!0,this.body.setTarget(null))):(this.swim(!1),this.body.cinematic=!0,i.playingDemo?this.body.move(new v.Vector(this.body.center.x,1,-i.params.simulation.poolSize.z/2)):this.body.move(oe)),this.currendDataIndex=0),this.isSwimming&&(this.useTracking||this.body.addForce(this.force),this.body.center.y>-this.body.radius&&!i.isSceneSynchronizedSwimming()?this.moveSpheres(e):this.moveSpheresAway()),this.handleTracking(r);for(let d of this.spheres)d.update(e),d.spawnSplashes(e);if(this.body.center.z>-i.params.simulation.poolSize.z/2+20||i.isSceneSynchronizedSwimming())return;$.raceHasStarted&&!this.hasDove&&this.body.center.y<0&&this.body.oldCenter.y>=0&&(this.divingDistance=this.body.center.z+i.params.simulation.poolSize.z/2,this.divingTime=r,this.hasDove=!0);const l=this.body.radius;$.raceHasStarted&&!this.hasBrokeOut&&this.body.center.y>-l&&this.body.oldCenter.y<=-l&&(this.breakoutDistance=this.body.center.z+i.params.simulation.poolSize.z/2,this.breakoutTime=r,this.hasBrokeOut=!0)}};Re=new WeakSet,pt=function(e){let r=parseFloat(e[Te]),l=this.body.center.x;return i.isSceneSynchronizedSwimming()&&(r=i.params.simulation.poolSize.z-r*30/25,e[be]&&(l=parseFloat(e[be])-i.params.simulation.poolSize.x/2)),r-=i.params.simulation.poolSize.z/2,new v.Vector(l,1,r)},ie($,"useGravity",!1),ie($,"raceHasStarted",!1),ie($,"swimming",!1),ie($,"attributes"),ie($,"initAttributes",()=>{$.attributes=new Xt}),ie($,"updateAttributesTexture",()=>{$.attributes.update()}),ie($,"getAttributesTexture",()=>$.attributes.texture),ie($,"bindDisplacementTexture",e=>{$.attributes.displacementTexture.bind(e)}),ie($,"bindOldDisplacementTexture",e=>{$.attributes.oldDisplacementTexture.bind(e)}),ie($,"reset",e=>{$.attributes.createRenderingTexture(e.x,e.y)});let G=$;const jt=`
/*** Settings ***/

#define FONT_TEXTURE iChannel0 // Set to the iChannel containing the alphabet texture

#define FONT_SPACING 2.        // Horizontal character spacing [1 - 2.5]

uniform sampler2D iChannel0;


/* ### How to use this shader ? ###
   
   === Setup ===
   
   0. Copy the content of the "Common" tab inside your shader
   1. Make sure the FONT_TEXTURE #define is set to the iChannel 
      containing the alphabet texture
      
      Also make sure the texture filter type is set to "linear"  
      (not "mipmap", which creates horizontal lines between the characters)
   
   === Declare String ===
   
   2. Use makeStr to declare a new string (needs to be done outside any function)
   3. Write your text using _ before each char, and __ for spaces
   4. Finish your string with the _end keyword
   
       makeStr(printExample) _A _n _o _t _h _e _r __ _E _x _a _m _p _l _e    _end
          
   === Print String ===
   
   5. Call the new function by passing it your uvs. It returns a grayscale value.
   
       finalCol += printExample(uv);
   
   - Note that you are responsible for scaling/offsetting the uvs 
     to control the text placement before calling the function.
   
   - If you want to print float or integer variables, see below.
   
   
   ###### Printing variables ######
   
   In order to print int & float variables, you can call two other functions instead of makeStr:
   
     - makeStrI (for integers) & makeStrF (for floats).
     
   [ IMPORTANT ]: When using makeStrI or makeStrF, you MUST use _endNum instead of _end 
                  to terminate a string.
                  
                  If you're seeing many errors when trying to compile, it's probably
                  because you're using the wrong terminator for the current string type (_end/_endNum)
   
   === Declare Strings ===
   
   - In both cases, the variable will be displayed at the position of the _num_ keyword:
   
       makeStrI(print_my_int)   _M _y __ _I _n _t _e _g _e _r       _num_            _endNum
       makeStrF(print_my_float) _F _l _o _a _t  _num_  _A _d _d _i _t _i _o _n _a _l _endNum
   
    - print_my_int   will be (vec2 uv, int num)
    - print_my_float will be (vec2 uv, float num, int number_of_decimals)
      
   === Print Strings ===

       print_my_int(uv, 42);          // will print "My Integer 42"
       print_my_float(uv, 42.123, 2); // will print "Float 42.12 Additional"
       
    - A limitation of this version compared to the previous one is that you can only display
      one variable per string definition (so only one _num_ keyword is allowed per string).
   
   === Debug variables without makeStr ===
  
   A handy thing you can do in your Image tab is to create 
   the following debugInt & debugFloat helpers:
  
       makeStrF(debugFloat) _num_ _endNum
       makeStrI(debugInt) _num_ _endNum
       
   Defining these two helpers allow to quickly debug int/float variables, 
   without the need to create a full string definition every time using makeStr().
 
      color += debugInt(uv, 42);
      color += debugFloat(uv, 3.14, 2);
 
 
   ### Characters available ###
   
   uppercase: _A _B _C ...
   lowercase: _a _b _c ...
   digits   : _0 _1 _2 ...
   special  : _ADD _SUB _DOT ... (see "Special Characters" below)
   
   
   ### Javascript string generator helper ###
    
    Even if this framework allow for easier string editing, it can still be a bit tedious to create
    long strings with special characters, so I've also made a javascript function that you can run
    in your developer console to easily create strings:

    function createString(str) {
        const special_chars = {
            " ": "_", "!": "EX", """:"DBQ", "#": "NUM", "$": "DOL", "%": "PER",  "&": "AMP", 
            "'":"QT", "(": "LPR", ")": "RPR", "*": "MUL", "+": "ADD", ",": "COM", "-": "SUB", 
            ".": "DOT", "/": "DIV", ":": "COL", ";": "SEM", "<": "LES", "=": "EQ", ">": "GE", 
            "?": "QUE", "@": "AT", "[": "LBR", "\\": "ANTI", "]": "RBR",  "_": "UN", 
        };
        const num = str.indexOf('_num_');
        const end = num == -1 ? ' _end' : ' _endNum';
        str = str.replace('_num_', '').split('').map(e =>  '_' + (special_chars[e] || e));
        if (num != -1) str = str.slice(0, num).concat( '_num_', str.slice(num));
        return str.join(' ') + end;
    }

    Usage (static): 
        > createString("Hello World!") 
        '_H _e _l _l _o __ _W _o _r _l _d _EX _end'
           
    Usage (variable): 
        > createString("My Number is _num_!")
        '_M _y __ _N _u _m _b _e _r __ _i _s __ _num_ _EX _endNum'
*/

// Special characters
#define _STAR 28,
#define __    32,
#define _EX   33, // " ! "
#define _DBQ  34, // " " "
#define _NUM  35, // " # "
#define _DOL  36, // " $ "
#define _PER  37, // " % "
#define _AMP  38, // " & "
#define _QT   39, // " ' "
#define _LPR  40, // " ( "
#define _RPR  41, // " ) "
#define _MUL  42, // " * "
#define _ADD  43, // " + "
#define _COM  44, // " , "
#define _SUB  45, // " - "
#define _DOT  46, // " . "
#define _DIV  47, // " / "
#define _COL  58, // " : "
#define _SEM  59, // " ; "
#define _LES  60, // " < "
#define _EQ   61, // " = "
#define _GE   62, // " > "
#define _QUE  63, // " ? "
#define _AT   64, // " @ "
#define _LBR  91, // " [ "
#define _ANTI 92, // "  "
#define _RBR  93, // " ] "
#define _UN   95, // " _ "

// Digits
#define _0 48,
#define _1 49,
#define _2 50,
#define _3 51,
#define _4 52,
#define _5 53,
#define _6 54,
#define _7 55,
#define _8 56,
#define _9 57,
// Uppercase
#define _A 65,
#define _B 66,
#define _C 67,
#define _D 68,
#define _E 69,
#define _F 70,
#define _G 71,
#define _H 72,
#define _I 73,
#define _J 74,
#define _K 75,
#define _L 76,
#define _M 77,
#define _N 78,
#define _O 79,
#define _P 80,
#define _Q 81,
#define _R 82,
#define _S 83,
#define _T 84,
#define _U 85,
#define _V 86,
#define _W 87,
#define _X 88,
#define _Y 89,
#define _Z 90,
// Lowercase
#define _a 97,
#define _b 98,
#define _c 99,
#define _d 100,
#define _e 101,
#define _f 102,
#define _g 103,
#define _h 104,
#define _i 105,
#define _j 106,
#define _k 107,
#define _l 108,
#define _m 109,
#define _n 110,
#define _o 111,
#define _p 112,
#define _q 113,
#define _r 114,
#define _s 115,
#define _t 116,
#define _u 117,
#define _v 118,
#define _w 119,
#define _x 120,
#define _y 121,
#define _z 122,

// ======  utils  ======

#define print_char(i)     texture(FONT_TEXTURE, u + vec2(float(i)-float(x)/FONT_SPACING + FONT_SPACING/8., 15-(i)/16) / 16.).r

// ======  makeStr()  ======

// Function start
#define makeStr(func_name)                                   float func_name(vec2 u) {                                    if (u.x < 0. || abs(u.y - .03) > .03) return 0.;         const int[] str = int[](                         
// Function end
#define _end  0);                                            int x = int(u.x * 16. * FONT_SPACING);                   if (x >= str.length()-1) return 0.;                      return print_char(str[x]);                           }


// -------------------------------------------------------------------
//    If you only plan to display static characters (no variables) 
//    you don't need to include anything below this disclaimer
// -------------------------------------------------------------------

// ======  makeStrFloat() & makeStrInt() ======

#define log10(x) int(ceil(.4342944819 * log(x + x*1e-5)))
#define _num_ 0); const int[] str2 = int[]( 

// makeStrFloat() start
#define makeStrF(func_name)                                  float func_name(vec2 u, float num, int dec) {                if (u.x < 0. || abs(u.y - .03) > .03) return 0.;         const int[] str1 = int[](

// makeStrInt() start
#define makeStrI(func_name)                                  float func_name(vec2 u, int num_i) {                         if (u.x < 0. || abs(u.y - .03) > .03) return 0.;         float num = float(num_i);                                const int dec = -1;                                      const int[] str1 = int[](

// makeStrFloat & makeStrInt end
#define _endNum  0);                                const int l1 = str1.length() - 1;               int x = int(u.x * 16. * FONT_SPACING);          if (x < l1) return print_char(str1[x]);         int neg = 0;                                    if (num < 0.) {                                     if (x == l1) return print_char(45);             num = abs(num);                                 neg = 1;                                    }                                               int pre = neg + max(1, log10(num));             int s2 = l1 + pre + dec + 1;                    if (x >= s2) {                                      if (x >= s2+str2.length()-1) return 0.;         int n2 = str2[x - s2];                          return print_char(n2);                      }                                               float d = float(l1 + pre - x);                  if (d == 0.) return print_char(46);             d = pow(10., d < 0.  ? ++d : d);                int n = 48 + int(10.*fract(num/.999999/d));     return print_char(n);                       }

/* === Curious about how makeStrI() and makeStrF() work ? ===

Here is a broken-down and commented version of the following syntax:

    makeStrF(print_string_with_float) _H _e _l _l _o _num_ _W _o _r _l _d _endNum
    
This will translate exactly to the following code:

float print_string_with_float(vec2 u, float num, int decimals) 
{
    if (u.x < 0. || abs(u.y - .03) > .03) return 0.;
    
    // The number (num) will be displayed between these two strings.
    // The separation is handled by the #define "_num_"
    const int[] str1 = int[]( _H _e _l _l _o  0);
    const int[] str2 = int[]( _W _o _r _l _d  0);
    
    const int str1_length = str1.length() - 1;
    
    int x = int(u.x * 16. * SPACING);
    
    // Print char from 1st string (before number)
    if (x < str1_length) {
        int n1 = str1[x];
        return print_char(n1);
    }
    
    // Handle negative numbers
    int is_negative = 0;
    if (num < 0.) {        
        // Print a minus sign
        if (x == str1_length) return print_char(45);
        
        num = abs(num);
        is_negative = 1;
    }
        
    int digit_count = is_negative + max(1, log10(num)); // Number of characters before decimal point
    int num_length  = digit_count + decimals + 1;       // Total number of characters for the number
    int str2_start  = str1_length + num_length;
    
    // Print char from 2nd string (after number)
    if (x >= str2_start) {
        const int str2_length = str2.length() - 1;
        int n2 = str2[x - str2_start];
        if (x >= str2_start + str2_length) return 0.; // right bound
        return print_char(n2);
    }
        
    // Print the decmial separator (dot)
    if (x == str1_length + digit_count) {
        return print_char(46);
    }
    
    // Get current digit
    int digit_index = x - str1_length;
    if (digit_index > digit_count) {
        // Offset by 1 for digits located after the decimal point
        digit_index--;
    }
    float exponent = float(digit_count - digit_index);
    int n = 48 + int(10.*fract(num/.999999/pow(10., exponent)));
        
    // Print digit
    return print_char(n);
}
*/
`;var me=`
  const float IOR_AIR = 1.0;
  const float IOR_WATER = 1.333;
  const vec3 abovewaterColor = vec3(0.25, 1.0, 1.25);
  const vec3 skyColor = vec3(.4, .8, 1.);
  const vec3 underwaterColor = vec3(0.4, 0.9, 1.0);
  uniform vec3 light;
  uniform vec3 sphereCenter;
  uniform float sphereRadius;
  uniform sampler2D tiles;
  uniform sampler2D causticTex;
  uniform sampler2D water;
  uniform sampler2D areaConservationTexture;
  uniform bool areaConservation;
  uniform vec2 flagCenter;
  uniform vec3 poolSize;
  uniform bool renderWater;
  uniform bool cornerView;
  
  vec2 intersectCube(vec3 origin, vec3 ray, vec3 cubeMin, vec3 cubeMax) {
    vec3 tMin = (cubeMin - origin) / ray;
    vec3 tMax = (cubeMax - origin) / ray;
    vec3 t1 = min(tMin, tMax);
    vec3 t2 = max(tMin, tMax);
    float tNear = max(max(t1.x, t1.y), t1.z);
    float tFar = min(min(t2.x, t2.y), t2.z);
    return vec2(tNear, tFar);
  }
  
  float intersectSphere(vec3 origin, vec3 ray, vec3 sphereCenter, float sphereRadius) {
    vec3 toSphere = origin - sphereCenter;
    float a = dot(ray, ray);
    float b = 2.0 * dot(toSphere, ray);
    float c = dot(toSphere, toSphere) - sphereRadius * sphereRadius;
    float discriminant = b*b - 4.0*a*c;
    if (discriminant > 0.0) {
      float t = (-b - sqrt(discriminant)) / (2.0 * a);
      if (t > 0.0) return t;
    }
    return 1.0e6;
  }
  
  vec3 getSphereColor(vec3 point) {
    vec3 color = vec3(0.5);
    
    /* ambient occlusion with walls */
    color *= 1.0 - 0.9 / pow((1.0 + sphereRadius - abs(point.x) / (0.5*poolSize.x)) / sphereRadius, 3.0);
    color *= 1.0 - 0.9 / pow((1.0 + sphereRadius - abs(point.z) / (0.5*poolSize.z)) / sphereRadius, 3.0);
    color *= 1.0 - 0.9 / pow((point.y + 1.0 + sphereRadius) / sphereRadius, 3.0);
    
    /* caustics */
    vec3 sphereNormal = (point - sphereCenter) / sphereRadius;
    vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);
    float diffuse = max(0.0, dot(-refractedLight, sphereNormal)) * 0.5;
    vec2 coord = point.xz / poolSize.xz + 0.5;
    vec4 info = texture(water, coord);
    if (point.y < info.r && renderWater) {
      vec4 caustic = texture(causticTex, 0.75 * (point.xz - point.y * refractedLight.xz / refractedLight.y) / poolSize.xz + 0.5);
      diffuse *= caustic.r * 4.0;
    }
    color += diffuse;
    
    return color;
  }
  
  vec3 getWallColor(vec3 point) {
    float scale = 0.5;
    
    vec3 wallColor;
    vec3 normal;
    if (abs(point.x) > poolSize.x * 0.5 - 0.01) {
      wallColor = texture(tiles, point.yz * 0.5 + vec2(1.0, 0.5)).rgb;
      normal = vec3(-point.x, 0.0, 0.0);
    } else if (abs(point.z) > poolSize.z * 0.5 - 0.01) {
      wallColor = texture(tiles, point.yx * 0.5 + vec2(1.0, 0.5)).rgb;
      normal = vec3(0.0, 0.0, -point.z);
    } else {
      wallColor = texture(tiles, point.xz * 0.5 + 0.5).rgb;
      normal = vec3(0.0, 1.0, 0.0);
    }
    
    /*scale /= length(point) * 10;*/ /* pool ambient occlusion */
    scale *= 1.0 - 0.9 / pow(length(point - sphereCenter) / sphereRadius, 4.0); /* sphere ambient occlusion */
    
    /* caustics */
    vec3 refractedLight = -refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);
    float diffuse = max(0.0, dot(refractedLight, normal));
    vec4 info = texture(water, point.xz / poolSize.xz + 0.5);
    if (renderWater && point.y < info.r) {
      vec4 caustic = texture(causticTex, 0.75 * (point.xz - point.y * refractedLight.xz / refractedLight.y) / poolSize.xz + 0.5);
      scale += diffuse * caustic.r * 2.0 * caustic.g;
    } else {
      /* shadow for the rim of the pool */
      vec2 t = intersectCube(point, refractedLight, vec3(-poolSize.x / 2., -poolSize.y, -poolSize.z / 2.), vec3(poolSize.x / 2., poolSize.y, poolSize.z / 2.));
      diffuse *= 1.0 / (1.0 + exp(-200.0 / (1.0 + 10.0 * (t.y - t.x)) * (point.y + refractedLight.y * t.y - 2.0 / 12.0)));
      
      scale += diffuse * 0.5;
      scale = min(1., scale);
    }
    
    return wallColor * scale;
  }
`;function he(s,e,r,l){this.water=e,this.gl=s,this.tileTexture=v.Texture.fromImage(document.getElementById("tiles"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGB}),this.franceTexture=v.Texture.fromImage(document.getElementById("france"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.chinaTexture=v.Texture.fromImage(document.getElementById("china"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.lettersTexture=v.Texture.fromImage(document.getElementById("letters"),{minFilter:this.gl.LINEAR,magFilter:this.gl.LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.flagSize=l,this.flagSize=[1.5,1],this.flagCenter=r,this.lightDir=new v.Vector(2,2,-1).unit(),this.causticTex=new v.Texture(1024,1024),this.waterShaders=[];let d="";Object.entries(i.params.visualizations.customParametersDict).forEach(_=>{const R=_[1].name,D=_[1].value;d+="#define "+R+" "+D+`
`}),Object.entries(i.params.visualizations.renderingDict).forEach(_=>{const R=_[1].name,D=_[1].value;d+="#define "+R+" "+D+`
`});for(var u=0;u<2;u++)this.waterShaders[u]=new v.Shader(`
      uniform sampler2D water;
      uniform vec3 poolSizeVertexShader;
      out vec3 position;
      void main() {
        vec4 info = texture(water, gl_Vertex.xy / poolSizeVertexShader.xz + 0.5);
        position = gl_Vertex.xzy;
        position.y += info.r;
        gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
      }
    `,me+`
      uniform vec3 eye;
      in vec3 position;
      out vec4 fragColor;
      uniform float showFlags;
      uniform bool showWR;
      uniform bool showSpeed;
      uniform bool showFinishTimes;
      uniform bool showDivingDistance;
      uniform samplerCube sky;
      uniform bool showProjectionGrid;
      uniform bool showAreaConservedGrid;
      uniform sampler2D france;
      uniform sampler2D china;
      uniform vec2 flagSize;

      uniform sampler2D foamTex;

      uniform float rendering;

      uniform bool foamEnabled;
      uniform bool shadowEnabled;
      uniform float shadowRadius;
      uniform float shadowPower;
      uniform bool showCircle;
      uniform float shadowCircleRadius;
      uniform float shadowCircleStroke;
      uniform float showSwimmersLines;
      uniform float swimmersLinesMode;
      uniform float medalsModeBeforeFinish;
      uniform float medalsModeAfterFinish;

      uniform bool classicalOverlayEnabled;
      uniform float showOverlayPlane;

      uniform float heightLimit;

      uniform float seed;

      uniform float waterColorParameter;

      `+d+`
      
      // Show lines
      #define LINES_NONE 0
      #define LINES_ONLY_MEDALS 1
      #define LINES_ALL 2

      // Lines modes
      #define LINES_MODE_NEIGHBOURS 0
      #define LINES_MODE_PER_SWIMMER 1

      // Show medals modes
      #define MEDALS_NONE 0
      #define MEDALS_STARS 1
      #define MEDALS_BRIGHT 2
      #define MEDALS_LANES 3
      
      // Color declarations
      #define RED     vec3( 1,.3,.4)
      #define GREEN   vec3(.2, 1,.4)
      // #define BLUE    vec3(.2,.8, 1)
      #define RAINBOW abs(cos(uv.x + vec3(5,6,1)))

      #define GOLD    vec3(1., 1., 0.)
      #define SILVER  vec3(.8, .8, .8)
      #define BRONZE  vec3(.75, .54, .44)

      #define PINK (vec3(241., 171., 201.) / 255.)
      #define BLUE (vec3(35., 147., 205.) / 255.)
      #define YELLOW (vec3(217., 196., 122.) / 255.)

      const vec3[] colorRankDict = vec3[](GOLD, SILVER, BRONZE); 
      
      
      `+Se+jt+`
      makeStrF(printSpeed) _num_ __ _m _DIV _s _endNum
      makeStrF(printTime) _num_ __ _s _endNum


      #define M_PI 3.14159265358979323846

      float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
      float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
      float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

      float perlin(vec2 p, float dim, float time) {
        vec2 pos = floor(p * dim);
        vec2 posx = pos + vec2(1.0, 0.0);
        vec2 posy = pos + vec2(0.0, 1.0);
        vec2 posxy = pos + vec2(1.0);
        
        float c = rand(pos, dim, time);
        float cx = rand(posx, dim, time);
        float cy = rand(posy, dim, time);
        float cxy = rand(posxy, dim, time);
        
        vec2 d = fract(p * dim);
        d = -0.5 * cos(d * M_PI) + 0.5;
        
        float ccx = mix(c, cx, d.x);
        float cycxy = mix(cy, cxy, d.x);
        float center = mix(ccx, cycxy, d.y);
        
        return center * 2.0 - 1.0;
      }

      makeStr(printStar) _STAR _end
      
      bool isOnConservedAreaGrid(vec2 pos, float size) {
        vec2 gridCoord = pos / size;
        return abs(fract(gridCoord.x) - 0.5) < 0.05 || abs(fract(gridCoord.y) - 0.5) < 0.05;
      }
      bool isInCircle(vec2 position, vec2 center, float R, float r) {
        vec2 diff = position - center;
        float dist_sq = dot(diff, diff);
        return dist_sq < R*R && dist_sq > r*r;
      }


      void drawWorldRecordLine(in vec2 position, inout vec3 color) {
        if (abs(position.y + poolSize.z / 2. - wr) < .05) color = YELLOW; 
      }

      void maximiseColor(out vec3 c) {
        float m = max(c.r, max(c.g, c.b));
        c /= m;
      }

      void drawDivingRipples(in vec2 coord, inout vec3 color) {
        vec4 divingWave = getDivingWaves(coord);
        bool toDraw = divingWave.z > 0.;
        float blending = divingWave.y;

        float intensity = divingWave.w;
        vec3 rippleColor = intensity * PINK + (1. - intensity) * BLUE;
        maximiseColor(rippleColor);

        if (toDraw) {
          color = (1. - blending) * color + blending * rippleColor;
        }
      
      }

      void distort(inout vec2 pos, vec2 swimmerPos, in float intensity) {
        if (classicalOverlayEnabled) return;
        float distFactor = intensity / 2.;
        // pos.x += perlin(pos.xy + swimmerPos, 3., seed*.0000005) * distFactor;
        // pos.y += perlin(pos.yx + swimmerPos, 3., seed*.0000005) * distFactor;
        pos.x += perlin(pos.xy + swimmerPos + vec2(seed * 2., 0.), 3., 0.) * distFactor;
        pos.y += perlin(pos.yx + swimmerPos + vec2(seed * 2., 0.), 3., 0.) * distFactor; 
      }

      void distort(inout vec2 pos, vec2 swimmerPos, in float beginTime, in float endTime, in bool appearing) {
        if (time < beginTime || time > endTime) return;
        float intensity = (time - beginTime) / (endTime - beginTime);
        intensity = pow(intensity, 2.);
        if (!appearing) intensity = 1. - intensity;
        distort(pos, swimmerPos, intensity);
      }

      void drawFlags(in vec2 position, in vec2 swimmerPos, in float swimmerAltitude, in float nationality, bool rightSide, inout vec3 color) {
        float swimmer_x = swimmerPos.x;
        float swimmer_z = swimmerPos.y;
        float dz = rightSide ? -2.5 : 2.5;
        float staticFlag_z = flagSize.y / 2. - poolSize.z / 2. + 2.;
        float flag_z = swimmerAltitude <= 0. ? max(staticFlag_z, swimmer_z + dz) : staticFlag_z;
        vec2 flagCenterNew = vec2(swimmer_x, flag_z);
        // TODO nettoyer
        vec2 flagCorner = flagCenterNew - flagSize / 2.;
        
        if (areaConservation) {
          //vec2 coord = position / poolSize.xz + 0.5;
          //position = texture(areaConservationTexture, coord).xy;
          flagCorner = texture(areaConservationTexture, flagCorner / poolSize.xz + 0.5).xy;
        }
        if (showAreaConservedGrid && isOnConservedAreaGrid(position, 0.1)) color = vec3(1., 0., 0.); /* Debug conserved area grid */
        vec2 posFlag = position - flagCorner - flagSize / 2.;/*Fixes the corner of the flag on the XZ plane*/
        float distFactor = 0.;
        float startDissipationTime = 0.5;
        float stopDissipationTime = 1.5;
        float reshowTime = 5.;
        float reshowAppearDuration = 2.;
        float opacity = showFlags;
        if (time >= stopDissipationTime && time <= reshowTime) opacity = 0.;
        else if (time >= reshowTime && time <= reshowTime + reshowAppearDuration) opacity *= (time - reshowTime) / reshowAppearDuration;
        else if (time >= startDissipationTime && time <= stopDissipationTime ) opacity *= 1. - (time - startDissipationTime) / (stopDissipationTime - startDissipationTime);
        if (opacity < .99) distort(posFlag, swimmerPos, pow(1. - opacity, 2.));
        else distort(posFlag, swimmerPos, startDissipationTime, stopDissipationTime, true);
        // distort(posFlag, swimmerPos, .75);
        vec2 flagCoord = posFlag / flagSize + 0.5;
        if (bool(showFlags) && abs(posFlag.x) <= flagSize.x / 2. && abs(posFlag.y) <= flagSize.y / 2.) {
          vec3 flagColor;
          if(nationality < .5) flagColor = texture(france, vec2(1.-flagCoord.y,1.- flagCoord.x)).xyz;
          else flagColor = texture(china, vec2(1.-flagCoord.y,1.- flagCoord.x)).xyz;
          
          color = opacity * flagColor + (1. - opacity) * color;
          float delta = .1;
          vec2 delta_tex = vec2(delta, delta) / flagSize;
          if (min(flagCoord.y, 1.- flagCoord.y) <= delta_tex.y 
            || min(flagCoord.x, 1. - flagCoord.x) <= delta_tex.x) color = opacity * vec3(1., 1., 1.) + (1. - opacity) * color;
        }
      }

      vec2 toTextCoord(vec2 position, float textSize) {
        position = position.yx;
        position.y += textSize / 2.;
        return position / (20. * textSize);
      }

      void drawNumbers(in vec2 position, in vec2 swimmerPosition, in int index, in bool rightSide, inout vec3 color) {
        float speed = getSwimmerSpeed(index);
        float finishTime = getSwimmerFinishTime(index);
        float visSize = flagSize.x / 2.;
        float delta = bool(showFlags)? 5. : 2.;
        float dz = rightSide? delta : -delta - 9. * visSize * .75 ;
        vec2 visPosition = swimmerPosition - position - vec2(0., dz);
        vec2 visCoord = toTextCoord(visPosition, visSize);
        

        if (showSpeed) {
          vec3 visColor = GREEN/.4 * printSpeed(visCoord, abs(speed), 2);
          if (max(visColor.r, max(visColor.g, visColor.b)) > .3) color = visColor;
        }
        if (showFinishTimes && finishTime > .1) {
          vec3 visColor = GREEN/.4 * printTime(visCoord, finishTime, 2);
          if (max(visColor.r, max(visColor.g, visColor.b)) > .3) color = visColor;
        }
      }

      void drawFinishTime(in vec2 position, in vec2 swimmerPosition, in float finishTime, inout vec3 color) {
      }

      void drawRanks(in vec2 position, in vec2 swimmerPosition, in int rank, in bool rightSide, inout vec3 color) {
        int showMode = int(medalsModeBeforeFinish);
        if (getSwimmerFinishTime(rank) > .1) showMode = int(medalsModeAfterFinish);
        if (showMode == MEDALS_NONE) return;

        vec3 medalColor = vec3(0);
        if (rank == 0) medalColor = GOLD;
        else if (rank == 1) medalColor = SILVER;
        else if (rank == 2) medalColor = BRONZE;
        else return;
        if (showMode == MEDALS_LANES) {
          if (abs(position.x - swimmerPosition.x) <= poolSize.x/20.) color = medalColor; 
        }
        float visSize = flagSize.x / 2.;
        float dz = rightSide? 2. : -2.;
        vec2 visPosition = swimmerPosition - position + vec2(0., dz);
        vec2 visCoord = toTextCoord(visPosition, visSize);

        
        
        vec3 visColor = vec3(1., 1., 1.)*printStar(visCoord);
        //if (max(visColor.r, max(visColor.g, visColor.b)) <= .3) return;
        // visColor *= pow(length(visPosition), 1.0);
        
        
        if (showMode == MEDALS_STARS && max(visColor.r, max(visColor.g, visColor.b)) > .3) color = visColor * medalColor;
        else if (showMode == MEDALS_BRIGHT) color += 0.2/pow(length(visPosition), 1.) * medalColor;
      }

      void drawShadows(in vec2 projectedPosition, in vec2 swimmerPosition, in float altitude, inout vec3 color) {
        if (!cornerView && (!shadowEnabled || abs(altitude - (-.06)) < .18)) return;
        vec2 diff = (projectedPosition - swimmerPosition);
        vec2 diffNormalized = diff/shadowRadius;
        float distSq = dot(diffNormalized, diffNormalized);
        float attenuation = min(1., pow(distSq, shadowPower));
        float altitudeAttenuation = min(1., abs(altitude));
        attenuation = 1.-(1.-attenuation)*altitudeAttenuation;
        color *= attenuation;
        if (!showCircle && !cornerView) return;
        if(cornerView) altitudeAttenuation = 1.;
        distSq = dot(diff, diff);
        float intensity = max(0.,1.-abs((shadowCircleRadius - distSq)/shadowCircleStroke)) * altitudeAttenuation;
        color = intensity * YELLOW + (1. - intensity) * color;
      }

      void drawLine(in vec2 projectedPosition, in vec2 swimmerPosition, in int swimmerRank, in vec3 lineColor, inout vec3 color) {
        int showLinesMode = int(showSwimmersLines);
        int linesMode = int(swimmersLinesMode);
        if (showLinesMode == LINES_ONLY_MEDALS && swimmerRank > 2) return;
        float lineThickness = .1;
        if (swimmerRank > 2) lineThickness = .03;
        float lineLength = 2.*poolSize.x;
        if (linesMode == LINES_MODE_NEIGHBOURS) {
          lineLength = poolSize.x / 30.;
        }
        float line_z = getSwimmerPosition(swimmerRank).y;
        if (abs(projectedPosition.y - line_z) <= lineThickness && 
            abs(projectedPosition.x - swimmerPosition.x) <= lineLength) color = lineColor;
      }

      void drawSwimmerLines(in vec2 projectedPosition, in vec2 swimmerPosition, in int swimmerRank, inout vec3 color) {
        int showLinesMode = int(showSwimmersLines);
        int linesMode = int(swimmersLinesMode);
        if (showLinesMode == LINES_NONE) return;
        float colorAttenuation = .7;
        if (linesMode == LINES_MODE_PER_SWIMMER) {
          vec3 lineColor = vec3(1., 0., 0.) * colorAttenuation;
          if (swimmerRank <= 2) lineColor = colorRankDict[swimmerRank] * colorAttenuation;
          drawLine(projectedPosition, swimmerPosition, swimmerRank, lineColor, color);

        }
        else if (linesMode == LINES_MODE_NEIGHBOURS) {
          vec3 aheadColor = vec3(0., 1., 0.) * colorAttenuation;
          vec3 behindColor = vec3(1., 0., 0.) * colorAttenuation;

          

          if (swimmerRank == 0) behindColor = SILVER;
          else if (swimmerRank == 1) {
            aheadColor = GOLD * 5.;
            behindColor = BRONZE;
          }
          else if (swimmerRank == 2) aheadColor = SILVER;
          else if (swimmerRank == 3) aheadColor = BRONZE;

          if (swimmerRank != 0) drawLine(projectedPosition, swimmerPosition, swimmerRank-1, aheadColor, color);
          if (float(swimmerRank) < swimmersNumber - 1.) drawLine(projectedPosition, swimmerPosition, swimmerRank+1, behindColor, color);
        }
      }

      void colorWater(in vec2 projectedPosition, in vec2 swimmerPosition, in float value, inout vec3 color) {
        vec3 minColor = vec3(1., 1., 1.)*0.;
        minColor = color;
        vec3 maxColor = vec3(1., 0., 0.);
        vec3 localColor = value * maxColor + (1. - value) * minColor;
        float maxDist = .5 + value;
        vec2 diff = projectedPosition - swimmerPosition;
        vec2 diffDistorted = vec2(diff.x, .33*diff.y);
        float distSq = dot(diffDistorted, diffDistorted);
        float coeff = pow(max(0., (maxDist - sqrt(distSq))/maxDist), 2.);
        color = coeff * localColor + (1. - coeff) * color;
        
      }

      float getColorValue(float speed) {
      float res;
        if (int(waterColorParameter) == PARAMETER_SPEED) {
          float minSpeed = 5.;
          float maxSpeed = 8.;
          res = (abs(speed) - minSpeed) / (maxSpeed - minSpeed);
          res = min(max(res, 0.), 1.);
          } 
          return res;
      }

      void drawVisualizations(in vec2 position, inout vec3 color) {
        vec2 projectedPosition = position;
        vec2 coord = position / poolSize.xz + .5;
        if (classicalOverlayEnabled && showOverlayPlane > 0.01){
          vec3 overlayColor  = vec3(1.);
          if (min(fract(position.y), fract(position.x)) <= .1) overlayColor *= 0.;
          color = showOverlayPlane * overlayColor + (1. - showOverlayPlane) * color;
        }
        bool hasFirstFinished = getSwimmerFinishTime(0) > 0.1;
        if (showDivingDistance) drawDivingRipples(coord, color);
        for (int i = 0; i < 10; i++) {
          float i_float = float(i);
          if (i_float > swimmersNumber - 0.1) break;
          vec2 swimmerPos = getSwimmerPosition(i);
          float swimmerAltitude = getSwimmerAltitude(i);
          if (showProjectionGrid && isOnConservedAreaGrid(position, 0.1)) color = vec3(1., 1., 0.); /* Debug conserved area grid */
          if (showWR) drawWorldRecordLine(position, color); 
          if (areaConservation) {
            vec2 coord = position / poolSize.xz + 0.5;
            position = texture(areaConservationTexture, coord).xy;
          }

          float speed = getSwimmerSpeed(i);
          bool rightSide = hasFirstFinished ? false : speed >= 0.;
          
          drawSwimmerLines(projectedPosition, swimmerPos, i, color);
          drawRanks(projectedPosition, swimmerPos, i, rightSide, color);
          if (shadowEnabled) drawShadows(projectedPosition, swimmerPos, swimmerAltitude, color);
          // if (cornerView) continue;
          
          drawFlags(position, swimmerPos, swimmerAltitude, getSwimmerNationality(i), rightSide, color);
          if (showSpeed || showFinishTimes) drawNumbers(position, swimmerPos, i, rightSide, color);
          colorWater(projectedPosition, swimmerPos, getColorValue(speed), color);
        }
      }

      vec3 toonRendering(vec3 normal, vec3 ray) {
        // Calculate diffuse lighting
        float diffuse = max(0., dot(light, normal));
        
        // Quantize to 4 levels for toon effect
        float levels = 5.0;
        float quantized = floor(diffuse * levels) / levels;
        
        // Create toon colors - tropical paradisiac water tones
        vec3 toonColors[6];
        toonColors[0] = vec3(0.0, 0.2, 0.4); // Deep tropical blue
        toonColors[1] = vec3(0.0, 0.4, 0.7); // Rich turquoise
        toonColors[2] = vec3(0.2, 0.6, 0.9); // Bright turquoise
        toonColors[3] = vec3(0.4, 0.8, 1.0); // Light turquoise
        toonColors[4] = vec3(0.7, 0.95, 1.0); // Crystal clear tropical
        toonColors[5] = vec3(1., 1., 1.0); // white
        
        // Get the color based on quantized level
        int level = int(quantized * levels);
        vec3 color = toonColors[level];
        
        // Add a small specular highlight for toon effect
        vec3 reflectDir = reflect(-light, normal);
        float spec = pow(max(0., dot(ray, reflectDir)), 32.0);
        // if (spec > 0.5) {
        //   color += vec3(1.0, 1.0, 0.8) * 0.3;
        // }
        
        return color;
      }

      vec3 lambertRendering(vec3 normal) {
        vec3 color = vec3(.3);
        float diffuse = max(0., dot(light, normal)) * .3;
        color += diffuse;
        return color;
      }

      vec3 heightFieldRendering(float height) {
        float interval = .1;
        float value = abs(height) / interval;
        value = min(max(value, 0.), 1.);
        vec3 lowColor = vec3(0., 0., 1.);
        vec3 highColor = vec3(1., 0., 0.);
        vec3 color = height > 0. ? highColor : lowColor;
        return value * color;
      }

      vec3 realisticRendering(vec3 origin, vec3 ray, vec3 waterColor) {
        vec3 color;
        float q = intersectSphere(origin, ray, sphereCenter, sphereRadius);
        if (q < 1.0e6) {
          color = getSphereColor(origin + ray * q);
        } else if (ray.y < 0.0) {
          vec2 t = intersectCube(origin, ray, vec3(-poolSize.x / 2., -poolSize.y, -poolSize.z / 2.), vec3(poolSize.x / 2., poolSize.y, poolSize.z / 2.));
          color = getWallColor(origin + ray * t.y);
        } else {
          vec2 t = intersectCube(origin, ray, vec3(-poolSize.x / 2., -poolSize.y, -poolSize.z / 2.), vec3(poolSize.x / 2., poolSize.y, poolSize.z / 2.));
          vec3 hit = origin + ray * t.y;
          if (hit.y < 2.0 / 12.0) {
            color = getWallColor(hit);
          } else {
            color = texture(sky, ray).rgb;
            color = skyColor;
            color += vec3(pow(max(0.0, dot(light, ray)), 5000.0)) * vec3(10.0, 8.0, 6.0);
          }
        }
        if (ray.y < 0.0) {
          color *= waterColor;
        }
        return color;
      }


      vec4 getSurfaceRayColor(vec3 origin, vec3 ray, vec3 waterColor, vec3 normal) {
        vec3 color;
        if (int(rendering) == RENDERING_REALISTIC) color = realisticRendering(origin, ray, waterColor);
        else if (int(rendering) == RENDERING_HEIGHT_FIELD) color = heightFieldRendering(origin.y);
        else if (int(rendering) == RENDERING_LAMBERT) color = lambertRendering(normal);
        else if (int(rendering) == RENDERING_TOON) color = toonRendering(normal, ray);
        
        vec3 colorBefore = color;
        if (bool(showOverlayPlane) || bool(showFlags) || showWR || int(medalsModeAfterFinish) != MEDALS_NONE || int(medalsModeBeforeFinish) != MEDALS_NONE || showSpeed || showDivingDistance) drawVisualizations(origin.xz, color);
        float alpha = 1.;
        if (length(color - colorBefore) >= .04) {
          alpha = 0.;
        }
          
        
        return vec4(color, alpha);
      }
      
      void main() {
        vec2 coord = position.xz / poolSize.xz + 0.5;
        vec4 info = texture(water, coord);
        /* make water look more "peaked" */
        /*for (int i = 0; i < 5; i++) {
          coord += info.ba * 0.005;
          info = texture(water, coord);
        }*/
        // if (int(rendering) == RENDERING_HEIGHT_FIELD) {
        //   float interval = .1;
        //   float value = abs(info.r) / interval;
        //   value = min(max(value, 0.), 1.);
        //   vec4 lowColor = vec4(0., 0., 1., 1.);
        //   vec4 highColor = vec4(1., 0., 0., 1.);
        //   vec4 color = info.r > 0. ? highColor : lowColor;
        //   fragColor = value * color;
        //   return;
        // }
        
        vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);
        vec3 incomingRay = normalize(position - eye);
        
        `+(u?`
          normal = -normal;
          vec3 reflectedRay = reflect(incomingRay, normal);
          vec3 refractedRay = refract(incomingRay, normal, IOR_WATER / IOR_AIR);
          float fresnel = mix(0.5, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));
          
          vec4 reflectedColor = getSurfaceRayColor(position, reflectedRay, underwaterColor, normal);
          vec4 refractedColor = getSurfaceRayColor(position, refractedRay, vec3(1.0), normal) * vec4(0.8, 1.0, 1.1, 1.);
          
          fragColor = mix(reflectedColor, refractedColor, (1.0 - fresnel) * length(refractedRay));
        `:`
          vec3 reflectedRay = reflect(incomingRay, normal);
          vec3 refractedRay = refract(incomingRay, normal, IOR_AIR / IOR_WATER);
          float fresnel = mix(0.25, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));
          
          vec4 reflectedColor = getSurfaceRayColor(position, reflectedRay, abovewaterColor, normal);
          vec4 refractedColor = getSurfaceRayColor(position, refractedRay, abovewaterColor, normal);
          
          fragColor = mix(refractedColor, reflectedColor, fresnel);

          if (reflectedColor.a <.1) fragColor.a = 0.;
          // return;

          // if (info.r > heightLimit) fragColor = vec4(1., 0., 0., 1.);

          if(!foamEnabled) return;

          vec3 waterColor = abovewaterColor;
          vec4 foamColor = vec4(vec3(.9), fragColor.a);
          float foam = texture(foamTex, coord).r;
          fragColor = mix(fragColor, foamColor, foam);
        `)+`
      }
    `);this.sphereMesh=v.Mesh.sphere({detail:10}),this.sphereShader=new v.Shader(me+`
    out vec3 position;
  void main() {
    position = sphereCenter + gl_Vertex.xyz * sphereRadius;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
  }
  `,me+`
    in vec3 position;
    out vec4 fragColor;
    uniform vec3 color;
  void main() {
    fragColor = vec4(getSphereColor(position)*color, 1.0);
      vec4 info = texture(water, position.xz / poolSize.xz + 0.5);
    if (position.y < info.r && renderWater) {
      fragColor.rgb *= underwaterColor * 1.2;
    }
  }
  `),this.reset(),this.cubeShader=new v.Shader(me+`
    out vec3 position;
  void main() {
    position = gl_Vertex.xyz;
    position.y = ((1.0 - position.y) * (7.0 / 12.0) - 1.0) * poolSize.y;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
  }
  `,me+`
    in vec3 position;
    out vec4 fragColor;
  void main() {
    fragColor = vec4(getWallColor(position), 1.0);
      vec4 info = texture(water, position.xz / poolSize.xz + 0.5);
    if (renderWater && position.y < info.r) {
      fragColor.rgb *= underwaterColor * 1.2;
    }
  }
  `),this.sphereCenter=new v.Vector,this.sphereRadius=0;var p=!!this.gl.getExtension("OES_standard_derivatives");this.causticsShader=new v.Shader(me+`
    out vec3 oldPos;
    out vec3 newPos;
    out vec3 ray;

    /* project the ray onto the plane */
    vec3 project(vec3 origin, vec3 ray, vec3 refractedLight) {
      vec2 tcube = intersectCube(origin, ray, vec3(-poolSize.x / 2., -poolSize.y, -poolSize.z / 2.), vec3(poolSize.x / 2., poolSize.y, poolSize.z / 2.));
    origin += ray * tcube.y;
      float tplane = (-origin.y - 1.0) / refractedLight.y;
    return origin + refractedLight * tplane;
  }

  void main() {
      vec2 coord = gl_Vertex.xy / poolSize.xz + 0.5;
      vec4 info = texture(water, coord);
    info.ba *= 0.5;
      vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);

      /* project the vertices along the refracted vertex ray */
      vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);
    ray = refract(-light, normal, IOR_AIR / IOR_WATER);
    oldPos = project(gl_Vertex.xzy, refractedLight, refractedLight);
    newPos = project(gl_Vertex.xzy + vec3(0.0, info.r, 0.0), ray, refractedLight);

    gl_Position = vec4(0.75 * (newPos.xz + refractedLight.xz / refractedLight.y), 0.0, 1.0);
  }
  `,(p?`#extension GL_OES_standard_derivatives: enable
`:"")+`
  `+me+`
    in vec3 oldPos;
    in vec3 newPos;
    in vec3 ray;
    out vec4 fragColor;

  void main() {
    `+(p?`
        /* if the triangle gets smaller, it gets brighter, and vice versa */
        float oldArea = length(dFdx(oldPos)) * length(dFdy(oldPos));
        float newArea = length(dFdx(newPos)) * length(dFdy(newPos));
    fragColor = vec4(oldArea / newArea * 0.2, 1.0, 0.0, 0.0);
    `:`
    fragColor = vec4(0.2, 0.2, 0.0, 0.0);
    `)+`
      
      vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);

      /* compute a blob shadow and make sure we only draw a shadow if the player is blocking the light */
      vec3 dir = (sphereCenter - newPos) / sphereRadius;
      vec3 area = cross(dir, refractedLight);
      float shadow = dot(area, area);
      float dist = dot(dir, -refractedLight);
    shadow = 1.0 + (shadow - 1.0) / (0.05 + dist * 0.025);
    shadow = clamp(1.0 / (1.0 + exp(-shadow)), 0.0, 1.0);
    shadow = mix(1.0, shadow, clamp(dist * 2.0, 0.0, 1.0));
    fragColor.g = shadow;

      /* shadow for the rim of the pool */
      vec2 t = intersectCube(newPos, -refractedLight, vec3(-poolSize.x / 2., -poolSize.y, -poolSize.z / 2.), vec3(poolSize.x / 2., poolSize.y, poolSize.z / 2.));
    fragColor.r *= 1.0 / (1.0 + exp(-200.0 / (1.0 + 10.0 * (t.y - t.x)) * (newPos.y - refractedLight.y * t.y - 2.0 / 12.0)));
  }
  `)}he.prototype.reset=function(){this.cubeMesh=v.Mesh.cube({width:i.params.simulation.poolSize.x,height:2,depth:i.params.simulation.poolSize.z}),this.cubeMesh.triangles.splice(4,2),this.cubeMesh.compile()};he.prototype.updateCaustics=function(s){};he.prototype.renderWater=function(s,e,r){if(!i.renderWater)return;var l=new v.Raytracer;s.textureA.bind(0),this.tileTexture.bind(1),e.bind(2),this.causticTex.bind(3),this.franceTexture.bind(4),this.chinaTexture.bind(8),i.water.foam.foamTexNext.bind(9),this.lettersTexture.bind(7),s.areaConservationTexture.bind(5);const d=G.getAttributesTexture();d&&d.bind(6),this.gl.enable(this.gl.CULL_FACE),i.updateTransitions();for(var u=0;u<2;u++)this.gl.cullFace(u?this.gl.BACK:this.gl.FRONT),this.waterShaders[u].uniforms({renderWater:!0,light:this.lightDir,water:0,tiles:1,sky:2,causticTex:3,france:4,china:8,foamTex:9,areaConservationTexture:5,swimmersAttributesTexture:6,iChannel0:7,areaConservation:i.params.visualizations.areaConservationEnabled,flagSize:[1.5,2],flagCenter:[this.flagCenter.x,this.flagCenter.y],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],poolSizeVertexShader:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],eye:l.eye,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,showProjectionGrid:s.showProjectionGrid,showAreaConservedGrid:s.showAreaConservedGrid,wr:s.WR_position,swimmersNumber:i.swimmers.length,cornerView:i.cornerView,showFlags:i.transitions.showFlags?i.transitions.showFlags.opacity:i.params.visualizations.showFlags,showWR:i.params.visualizations.showWR,showSpeed:i.params.visualizations.showSpeed,showDivingDistance:i.params.visualizations.showDivingDistance,showFinishTimes:i.params.visualizations.showFinishTimes,time:i.getRaceTime(),seed:i.time,foamEnabled:i.params.simulation.foam.enabled,shadowEnabled:r.enabled,shadowRadius:r.shadowRadius,shadowPower:r.shadowPower,showCircle:r.showCircle,shadowCircleRadius:r.circleRadius,shadowCircleStroke:r.circleStroke,showSwimmersLines:Math.round(i.params.visualizations.showSwimmersLinesDict[i.params.visualizations.showSwimmersLines]),swimmersLinesMode:i.params.visualizations.swimmersLinesModeDict[i.params.visualizations.swimmersLinesMode],medalsModeBeforeFinish:Math.round(i.params.visualizations.medalsModesDict[i.params.visualizations.medalsModeBeforeFinish]),medalsModeAfterFinish:Math.round(i.params.visualizations.medalsModesDict[i.params.visualizations.medalsModeAfterFinish]),rendering:i.params.visualizations.renderingDict[i.params.visualizations.rendering].value,heightLimit:i.params.simulation.heightLimit,waterColorParameter:i.params.visualizations.customParametersDict[i.params.visualizations.waterColorParameter].value,classicalOverlayEnabled:i.classicalOverlayEnabled,showOverlayPlane:i.showOverlayPlane?i.showOverlayPlane:0}).draw(s.plane);this.gl.disable(this.gl.CULL_FACE)};he.prototype.renderSpheres=function(s){const e=[];i.params.swimmers.showSpheres&&i.swimmers.forEach(r=>r.spheres.forEach(l=>e.push(l))),!i.params.video.show&&!i.hideFloaters&&i.floaters.forEach(r=>e.push(r)),i.bubbleSpheres.forEach(r=>e.push(r));for(let r of e)this.renderSphere(s,r)};he.prototype.renderSphere=function(s,e){s.textureA.bind(0),this.causticTex.bind(1),this.sphereShader.uniforms({light:this.lightDir,water:0,causticTex:1,sphereCenter:[e.center.x,e.center.y,e.center.z],sphereRadius:e.radius*i.spheresRadiusCoeff,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],color:[e.color.x,e.color.y,e.color.z]}).draw(e.mesh)};he.prototype.renderSphereOld=function(s){s.textureA.bind(0),this.causticTex.bind(1),this.sphereShader.uniforms({light:this.lightDir,water:0,causticTex:1,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z]}).draw(this.sphereMesh)};he.prototype.renderCube=function(s){i.renderCube&&(this.gl.enable(this.gl.CULL_FACE),s.textureA.bind(0),this.tileTexture.bind(1),this.causticTex.bind(2),this.cubeShader.uniforms({light:this.lightDir,water:0,tiles:1,causticTex:2,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],renderWater:i.renderWater}).draw(this.cubeMesh),this.gl.disable(this.gl.CULL_FACE))};function We(s,e){this.gl=e,this.id=e.createTexture(),e.bindTexture(e.TEXTURE_CUBE_MAP,this.id),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.xneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.xpos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.yneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.ypos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.zneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,s.zpos)}We.prototype.bind=function(s){this.gl.activeTexture(this.gl.TEXTURE0+(s||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.id)};We.prototype.unbind=function(s){this.gl.activeTexture(this.gl.TEXTURE0+(s||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null)};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class se{constructor(e,r,l,d,u="div"){this.parent=e,this.object=r,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(d),this.$name=document.createElement("div"),this.$name.classList.add("name"),se.nextNameID=se.nextNameID||0,this.$name.id="lil-gui-name-"+ ++se.nextNameID,this.$widget=document.createElement(u),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const r=this.parent.add(this.object,this.property,e);return r.name(this._name),this.destroy(),r}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class qt extends se{constructor(e,r,l){super(e,r,l,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ne(s){let e,r;return(e=s.match(/(#|0x)?([a-f0-9]{6})/i))?r=e[2]:(e=s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?r=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(r=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!r&&"#"+r}const Kt={isPrimitive:!0,match:s=>typeof s=="string",fromHexString:Ne,toHexString:Ne},Ee={isPrimitive:!0,match:s=>typeof s=="number",fromHexString:s=>parseInt(s.substring(1),16),toHexString:s=>"#"+s.toString(16).padStart(6,0)},Zt={isPrimitive:!1,match:Array.isArray,fromHexString(s,e,r=1){const l=Ee.fromHexString(s);e[0]=(l>>16&255)/255*r,e[1]=(l>>8&255)/255*r,e[2]=(255&l)/255*r},toHexString:([s,e,r],l=1)=>Ee.toHexString(s*(l=255/l)<<16^e*l<<8^r*l<<0)},Jt={isPrimitive:!1,match:s=>Object(s)===s,fromHexString(s,e,r=1){const l=Ee.fromHexString(s);e.r=(l>>16&255)/255*r,e.g=(l>>8&255)/255*r,e.b=(255&l)/255*r},toHexString:({r:s,g:e,b:r},l=1)=>Ee.toHexString(s*(l=255/l)<<16^e*l<<8^r*l<<0)},Qt=[Kt,Ee,Zt,Jt];class ei extends se{constructor(e,r,l,d){var u;super(e,r,l,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(u=this.initialValue,Qt.find(p=>p.match(u))),this._rgbScale=d,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const p=Ne(this.$text.value);p&&this._setValueFromHexString(p)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const r=this._format.fromHexString(e);this.setValue(r)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Pe extends se{constructor(e,r,l){super(e,r,l,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",d=>{d.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ti extends se{constructor(e,r,l,d,u,p){super(e,r,l,"number"),this._initInput(),this.min(d),this.max(u);const _=p!==void 0;this.step(_?p:this._getImplicitStep(),_),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,r=!0){return this._step=e,this._stepExplicit=r,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let r=(e-this._min)/(this._max-this._min);r=Math.max(0,Math.min(r,1)),this.$fill.style.width=100*r+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=S=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+S),this.$input.value=this.getValue())};let r,l,d,u,p,_=!1;const R=S=>{if(_){const w=S.clientX-r,F=S.clientY-l;Math.abs(F)>5?(S.preventDefault(),this.$input.blur(),_=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>5&&D()}if(!_){const w=S.clientY-d;p-=w*this._step*this._arrowKeyMultiplier(S),u+p>this._max?p=this._max-u:u+p<this._min&&(p=this._min-u),this._snapClampSetValue(u+p)}d=S.clientY},D=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",R),window.removeEventListener("mouseup",D)};this.$input.addEventListener("input",()=>{let S=parseFloat(this.$input.value);isNaN(S)||(this._stepExplicit&&(S=this._snap(S)),this.setValue(this._clamp(S)))}),this.$input.addEventListener("keydown",S=>{S.code==="Enter"&&this.$input.blur(),S.code==="ArrowUp"&&(S.preventDefault(),e(this._step*this._arrowKeyMultiplier(S))),S.code==="ArrowDown"&&(S.preventDefault(),e(this._step*this._arrowKeyMultiplier(S)*-1))}),this.$input.addEventListener("wheel",S=>{this._inputFocused&&(S.preventDefault(),e(this._step*this._normalizeMouseWheel(S)))},{passive:!1}),this.$input.addEventListener("mousedown",S=>{r=S.clientX,l=d=S.clientY,_=!0,u=this.getValue(),p=0,window.addEventListener("mousemove",R),window.addEventListener("mouseup",D)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=F=>{const B=this.$slider.getBoundingClientRect();let g=(A=F,z=B.left,V=B.right,N=this._min,U=this._max,(A-z)/(V-z)*(U-N)+N);var A,z,V,N,U;this._snapClampSetValue(g)},r=F=>{e(F.clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",l)};let d,u,p=!1;const _=F=>{F.preventDefault(),this._setDraggingStyle(!0),e(F.touches[0].clientX),p=!1},R=F=>{if(p){const B=F.touches[0].clientX-d,g=F.touches[0].clientY-u;Math.abs(B)>Math.abs(g)?_(F):(window.removeEventListener("touchmove",R),window.removeEventListener("touchend",D))}else F.preventDefault(),e(F.touches[0].clientX)},D=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",R),window.removeEventListener("touchend",D)},S=this._callOnFinishChange.bind(this);let w;this.$slider.addEventListener("mousedown",F=>{this._setDraggingStyle(!0),e(F.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",l)}),this.$slider.addEventListener("touchstart",F=>{F.touches.length>1||(this._hasScrollBar?(d=F.touches[0].clientX,u=F.touches[0].clientY,p=!0):_(F),window.addEventListener("touchmove",R,{passive:!1}),window.addEventListener("touchend",D))},{passive:!1}),this.$slider.addEventListener("wheel",F=>{if(Math.abs(F.deltaX)<Math.abs(F.deltaY)&&this._hasScrollBar)return;F.preventDefault();const B=this._normalizeMouseWheel(F)*this._step;this._snapClampSetValue(this.getValue()+B),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(S,400)},{passive:!1})}_setDraggingStyle(e,r="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+r,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:r,deltaY:l}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(r=0,l=-e.wheelDelta/120,l*=this._stepExplicit?1:10),r+-l}_arrowKeyMultiplier(e){let r=this._stepExplicit?1:10;return e.shiftKey?r*=10:e.altKey&&(r/=10),r}_snap(e){const r=Math.round(e/this._step)*this._step;return parseFloat(r.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ii extends se{constructor(e,r,l,d){super(e,r,l,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(d)?d:Object.values(d),this._names=Array.isArray(d)?d:Object.keys(d),this._names.forEach(u=>{const p=document.createElement("option");p.innerHTML=u,this.$select.appendChild(p)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),r=this._values.indexOf(e);return this.$select.selectedIndex=r,this.$display.innerHTML=r===-1?e:this._names[r],this}}class ri extends se{constructor(e,r,l){super(e,r,l,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",d=>{d.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let Je=!1;class Xe{constructor({parent:e,autoPlace:r=e===void 0,container:l,width:d,title:u="Controls",injectStyles:p=!0,touchStyles:_=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",R=>{R.code!=="Enter"&&R.code!=="Space"||(R.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(u),_&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Je&&p&&(function(R){const D=document.createElement("style");D.innerHTML=R;const S=document.querySelector("head link[rel=stylesheet], head style");S?document.head.insertBefore(D,S):document.head.appendChild(D)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Je=!0),l?l.appendChild(this.domElement):r&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),d&&this.domElement.style.setProperty("--width",d+"px"),this.domElement.addEventListener("keydown",R=>R.stopPropagation()),this.domElement.addEventListener("keyup",R=>R.stopPropagation())}add(e,r,l,d,u){if(Object(l)===l)return new ii(this,e,r,l);const p=e[r];switch(typeof p){case"number":return new ti(this,e,r,l,d,u);case"boolean":return new qt(this,e,r);case"string":return new ri(this,e,r);case"function":return new Pe(this,e,r)}console.error(`gui.add failed
	property:`,r,`
	object:`,e,`
	value:`,p)}addColor(e,r,l=1){return new ei(this,e,r,l)}addFolder(e){return new Xe({parent:this,title:e})}load(e,r=!0){return e.controllers&&this.controllers.forEach(l=>{l instanceof Pe||l._name in e.controllers&&l.load(e.controllers[l._name])}),r&&e.folders&&this.folders.forEach(l=>{l._title in e.folders&&l.load(e.folders[l._title])}),this}save(e=!0){const r={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof Pe)){if(l._name in r.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);r.controllers[l._name]=l.save()}}),e&&this.folders.forEach(l=>{if(l._title in r.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);r.folders[l._title]=l.save()}),r}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const r=this.$children.clientHeight;this.$children.style.height=r+"px",this.domElement.classList.add("transition");const l=u=>{u.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const d=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=d+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(r=>{e=e.concat(r.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(r=>{e=e.concat(r.foldersRecursive())}),e}}const ne=new Xe,oi=function(s,e){const r=ne.addFolder("visualizations");r.close(),r.add(i,"useConfigFile").name("use configuration file"),r.add(i,"showTimeline").name("show event timeline").listen().onChange(g=>{i.hideEditorPanel(g)}),r.add(i.params.visualizations,"showFlags").name("show flags").listen(),r.add(i.params.visualizations,"showStreaks").name("show streaks").listen(),r.add(i.params.visualizations,"showWR").name("show world record").listen(),r.add(i.params.visualizations,"showSwimmersLines",i.params.visualizations.swimmersLinesList).name("show neighbours lines").listen(),r.add(i.params.visualizations,"swimmersLinesMode",i.params.visualizations.swimmersLinesModeList).name("show neighbours lines").listen(),r.add(i.params.visualizations,"customWaterPerturbation",i.params.visualizations.customParametersList).name("custom water perturbation").listen(),r.add(i.params.visualizations,"waterColorParameter",i.params.visualizations.customParametersList).name("water color parameter").listen(),r.add(i.params.visualizations,"medalsModeBeforeFinish",["none","stars","bright","lanes"]).name("show potential medals").listen(),r.add(i.params.visualizations,"medalsModeAfterFinish",["none","stars","bright","lanes"]).name("show potential medals after finish").listen(),r.add(i.params.visualizations,"showSpeed").name("show speed").listen(),r.add(i.params.visualizations,"showDivingDistance").name("show diving distance").listen(),r.add(i.params.visualizations.shadow,"enabled").name("show shadow"),r.add(i.params.visualizations,"areaConservationEnabled","areaConservationEnabled").name("area conservation").listen(),r.add(i.params.visualizations,"rendering",i.params.visualizations.renderingList).name("rendering").listen().onChange(()=>{i.params.visualizations.rendering=="toon"&&(i.params.simulation.waterDamping=.35)});const l=ne.addFolder("video");l.close(),l.add(i.params.video,"opacity").name("opacity").listen(),l.add(i.params.video,"thresholdBlending").name("threshold blending").listen(),l.add(i.params.video,"blendingThreshold",.1,1.5).name("blending threshold"),l.add(i.params.video,"show").name("show").listen(),l.add(i.params.video,"hideObstructions").name("hide obstructions"),l.add(i.params.video,"hideObstructionThreshold",0,.5).name("obstructions threshold");const d=r.addFolder("Sparks");d.close(),d.add(i.params.visualizations.sparks,"enabled").name("sparks enabled"),d.add(i.params.visualizations.sparks,"glow",1,30).name("sparks glow factor"),d.add(i.params.visualizations.sparks,"lengthFactor",.1,10).name("sparks length factor"),d.add(i.params.visualizations.sparks,"glowOffset",.1,3).name("sparks glow offset"),d.add(i.params.visualizations.sparks,"stroke",.001,.05).name("sparks stroke"),d.add(i.params.visualizations.sparks,"num",10,it).step(1).name("sparks number"),d.add(i.params.visualizations.sparks,"sizeFactor",10,100).name("size factor");const u=r.addFolder("Swimmers shadows");u.close(),u.add(i.params.visualizations.shadow,"shadowRadius",0,2).name("shadow radius"),u.add(i.params.visualizations.shadow,"shadowPower",.1,2).name("shadow power"),u.add(i.params.visualizations.shadow,"showCircle").name("circle"),u.add(i.params.visualizations.shadow,"circleRadius",.5,2).name("circle radius"),u.add(i.params.visualizations.shadow,"circleStroke",.1,.5).name("circle stroke");const p=ne.addFolder("Simulation");p.close(),p.add(i.params.simulation,"optimized").name("optimized").listen(),p.add(i.params.simulation.poolSize,"x",1,25).name("pool width").onChange(function(g){e()}).listen(),p.add(i.params.simulation.poolSize,"z",1,50).name("pool height").onChange(function(g){e()}).listen(),p.add(i.params.simulation.poolSize,"y",1,3).name("pool depth").onChange(function(g){e()}).listen(),p.add(i.params.simulation,"waterDamping",.005,.4).name("water damping").listen();const _=p.addFolder("foam");_.close(),_.add(i.params.simulation.foam,"enabled").name("enabled").listen(),_.add(i.params.simulation.foam,"velThreshold",0,15).name("velocity threshold"),_.add(i.params.simulation.foam,"velMax",0,20).name("max velocity"),_.add(i.params.simulation.foam,"dispersion",0,.1).name("dispersion"),_.add(i.params.simulation.foam,"timeVariation",0,10).name("time variation"),_.add(i.params.simulation.foam,"spaceVariation",0,100).name("space variation"),_.add(i.params.simulation.foam,"attenuation",0,.2).name("attenuation");const R=p.addFolder("splash");R.close(),R.add(i.params.simulation.splashes,"enabled").name("enabled"),R.add(i.params.simulation.splashes,"strengthThreshold",.1,10).name("strength threshold");const D=ne.addFolder("swimmers");D.close(),D.add(i.params.swimmers,"showSpheres").name("show spheres").listen(),D.add(i.params.swimmers,"useTracking").name("use tracking data").listen();const S=ne.addFolder("camera");S.close(),S.add(i.params,"fov",28,45).name("fov").listen().onChange(function(g){i.params.visualizations.sparks.fov=g*2*Math.PI/360,s.matrixMode(s.PROJECTION),s.loadIdentity(),s.perspective(i.params.fov,s.canvas.width/s.canvas.height,.01,100),s.matrixMode(s.MODELVIEW),console.log("perspective : "+i.params.fov)});const w=ne.addFolder("quiver");w.close(),w.add(i.params.quiver,"amplitude",.01,1).name("amplitude"),w.add(i.params.quiver,"omega",.5,5).name("omega"),w.add(i.params.quiver,"amplitudeFactor",.5,.9).name("amplitude factor"),w.add(i.params.quiver,"frequencyFactor",1.1,2).name("frequency factor"),w.add(i.params.quiver,"waveLength",1,30).name("wave length");const F=ne.addFolder("corner view");F.close(),F.add(i.params.cornerView,"show").name("show");const B=ne.addFolder("chrono-photography");B.close(),B.add(i.params.chronoPhotography,"available").name("available").onChange(()=>{i.params.chronoPhotography.available?i.drawingFrameBuffer=i.chronoFrameBuffer:i.drawingFrameBuffer=null}),i._gui=ne},Me=150,de=100;function si(s){const e=document.createElement("div");if(document.body.appendChild(e),e.id="event-editor",e.style.position="fixed",e.display="block",e.style.bottom="60px",e.style.left="10px",e.style.right="10px",e.style.height="120px",e.style.zIndex="4",e.style.background="#222",e.style.color="#fff",e.style.overflow="auto",e.style.padding="4px",e.style.fontSize="12px",e.style.position=e.style.position||"relative",!e){console.warn(`event editor container "${s}" not found`);return}let r,l=!1;const d=[{name:"showFlags",type:"boolean"},{name:"showWR",type:"boolean"},{name:"showSpeed",type:"boolean"},{name:"showDivingDistance",type:"boolean"},{name:"showFinishTimes",type:"boolean"},{name:"showSwimmersLines",type:"select",options:i.params.visualizations.swimmersLinesList},{name:"swimmersLinesMode",type:"select",options:i.params.visualizations.swimmersLinesModeList},{name:"customWaterPerturbation",type:"select",options:i.params.visualizations.customParametersList},{name:"waterColorParameter",type:"select",options:i.params.visualizations.customParametersList},{name:"medalsModeBeforeFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"medalsModeAfterFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"rankSwimmerToggle",type:"number",min:1,max:10},{name:"showStreaks",type:"boolean"}];function u(g){const A=document.createElement("div");A.style.flex="1",A.style.padding="4px",A.style.background="#222",A.style.border="1px solid #555",A.style.borderRadius="4px",A.style.fontFamily="monospace",A.style.fontSize="12px",A.style.whiteSpace="pre-wrap",A.style.overflow="auto",A.style.maxHeight="100px";function z(){const V=g.params;if(Object.keys(V).length===0){A.textContent="(no params)";return}const N=Object.entries(V).map(([U,I])=>`${U}: ${JSON.stringify(I)}`);A.textContent=N.join(`
`)}return z(),{element:A,update:z}}function p(g,A){const z=document.createElement("div");z.style.display="flex",z.style.flexWrap="wrap",z.style.margin="4px 0",z.style.background="#333",z.style.padding="4px";function V(){A&&(A(),B())}d.forEach(k=>{const K=document.createElement("div");K.style.marginRight="8px",K.style.marginBottom="4px";const te=document.createElement("label");te.style.whiteSpace="nowrap",te.textContent=k.name+":",K.appendChild(te);let O;if(k.type==="boolean"){O=document.createElement("select"),[{value:"",label:"—"},{value:"true",label:"ON"},{value:"false",label:"OFF"}].forEach(Z=>{const E=document.createElement("option");E.value=Z.value,E.textContent=Z.label,O.appendChild(E)});const j=g.params[k.name];j===void 0?O.value="":j===!0?O.value="true":j===!1&&(O.value="false"),O.addEventListener("change",()=>{O.value===""?delete g.params[k.name]:O.value==="true"?g.params[k.name]=!0:O.value==="false"&&(g.params[k.name]=!1),V()})}else if(k.type==="select"){O=document.createElement("select");const H=document.createElement("option");H.value="",H.textContent="—",O.appendChild(H),k.options.forEach(j=>{const Z=document.createElement("option");Z.value=j,Z.textContent=j,O.appendChild(Z)}),O.value=g.params[k.name]||"",O.addEventListener("change",()=>{O.value===""?delete g.params[k.name]:g.params[k.name]=O.value,V()})}else k.type==="number"&&(O=document.createElement("input"),O.type="number",k.min!==void 0&&(O.min=k.min),k.max!==void 0&&(O.max=k.max),O.placeholder="—",O.style.width="50px",O.value=g.params[k.name]!==void 0?g.params[k.name]:"",O.addEventListener("change",()=>{if(O.value==="")delete g.params[k.name];else{const H=parseFloat(O.value);isNaN(H)||(g.params[k.name]=H)}V()}));O&&K.appendChild(O),z.appendChild(K)});const N=document.createElement("div");N.style.marginRight="8px",N.style.marginBottom="4px";const U=document.createElement("label");U.style.whiteSpace="nowrap",U.textContent="transition :",N.appendChild(U);const I=document.createElement("input");return I.type="number",I.min=0,I.placeholder="—",I.style.width="50px",I.value=g.transition!==void 0?g.transition.duration:"",I.addEventListener("change",()=>{if(I.value===""){delete g.transition;return}const k=parseFloat(I.value);isNaN(k)||(g.transition={type:"dissolve",duration:k},V())}),N.appendChild(I),z.appendChild(N),z}function _(){const g=document.createElement("div");g.style.marginTop="8px",g.style.padding="8px",g.style.background="#555",g.style.border="1px solid #777";const A=document.createElement("div");A.textContent="Add New Event",A.style.fontWeight="bold",A.style.marginBottom="4px",g.appendChild(A);const z=document.createElement("input");z.type="number",z.placeholder="Distance",z.style.width="auto",z.style.marginRight="8px",g.appendChild(z);const V={params:{}},N=p(V,null);N.style.margin="4px 0",g.appendChild(N);const U=document.createElement("button");U.textContent="OK",U.addEventListener("click",()=>{const k=parseFloat(z.value);if(isNaN(k)){alert("Please enter a valid distance");return}const K={distance:k,...V};i.events.push(K),B(),r.remove(),r=null}),g.appendChild(U);const I=document.createElement("button");return I.textContent="cancel",I.addEventListener("click",()=>{r.remove(),r=null}),g.appendChild(I),g}function R(g,A,{title:z="",id:V=null,color:N="#e74c3c"}){const U=g/A*100,I=document.createElement("div");return I.style.position="absolute",I.style.left=U+"%",I.style.transform="translateX(-50%)",I.style.width="4px",I.style.height="100%",I.style.background=N,I.style.cursor="pointer",I.title=z,V&&(I.id=V),I.addEventListener("click",()=>{F(idx)}),I}function D(){let g=document.getElementById("distance-marker");const A=i.swimmers[0].getDistanceTraveled();if(!g){if(l)return;const z=document.getElementById("timeline-track");g=R(A,de,{color:"blue",id:"distance-marker"}),z.appendChild(g)}g.style.left=A+"%"}function S(g){l=g,w()}function w(){e.innerHTML="";const g=document.createElement("button");if(g.textContent=l?"□":"—",g.style.position="absolute",g.style.top="0",g.style.right="0",g.style.width="20px",g.style.height="20px",g.style.zIndex="100001",g.addEventListener("click",()=>{l=!l,w()}),e.appendChild(g),l){e.style.height="20px";return}e.style.height="300px";const A=document.createElement("div");if(A.style.position="relative",A.style.top="0px",A.style.left="50%",A.style.transform="translateX(-50%)",A.style.width="80px",A.style.height="15px",A.style.background="grey",A.style.border="1px solid black",A.style.cursor="ns-resize",A.style.zIndex="100000",A.style.lineHeight="16px",A.style.textAlign="center",A.textContent="drag",e.appendChild(A),A.addEventListener("mousedown",o=>{o.preventDefault();const c=o.clientY,h=e.offsetHeight;function m(b){const y=h-(b.clientY-c);y>20&&(e.style.height=y+"px")}function f(){document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",f)}document.addEventListener("mousemove",m),document.addEventListener("mouseup",f)}),!i.events){e.textContent="no events defined";return}const z=document.createElement("div");e.appendChild(z),z.style.marginRight="8px",z.style.marginBottom="4px";const V=document.createElement("label");V.style.whiteSpace="nowrap",V.textContent="select scene",V.style.margin="30px",z.appendChild(V);const N=document.createElement("select");N.style.width="auto",i.scenesList.forEach(o=>{const c=document.createElement("option");c.textContent=o.title,c.value=o.title,N.appendChild(c)}),N.addEventListener("change",()=>{i.setScene(N.value)}),z.appendChild(N);const U=i.events.slice().sort((o,c)=>{const h=o.distance!==void 0?o.distance:o.time!==void 0?o.time:0,m=c.distance!==void 0?c.distance:c.time!==void 0?c.time:0;return h-m}),I=new Set;U.forEach(o=>{o.params&&Object.keys(o.params).forEach(c=>I.add(c))});let k=d.map(o=>o.name).filter(o=>I.has(o));const K=["#4caf50","#2196f3","#ff9800","#9c27b0","#f44336","#009688","#e91e63","#3f51b5"],te={};k.forEach((o,c)=>{te[o]=K[c%K.length]});const O={},H={};k.forEach(o=>{H[o]=!1,O[o]=0});const j=[];if(U.forEach(o=>{const c=o.distance!==void 0?o.distance:o.time!==void 0?o.time:0;o.params&&Object.keys(o.params).forEach(h=>{if(k.includes(h)){const m=!!o.params[h];m!==H[h]&&(H[h]&&j.push({name:h,start:O[h],end:c}),H[h]=m,O[h]=c)}})}),k.forEach(o=>{H[o]&&j.push({name:o,start:O[o],end:de})}),k.length>0){const o=document.createElement("div");o.style.position="relative";const c=20;o.style.height=k.length*c+"px",o.style.background="#222",o.style.marginBottom="4px",o.style.marginTop="10px",k.forEach((m,f)=>{const b=document.createElement("div");b.textContent=m,b.style.position="absolute",b.style.left="0",b.style.top=f*c+2+"px",b.style.width=Me+"px",b.style.color="#aaa",b.style.fontSize="10px",b.style.pointerEvents="none",o.appendChild(b)});const h=document.createElement("div");h.style.position="absolute",h.style.left=Me+"px",h.style.top="0",h.style.right="0",h.style.bottom="0",h.style.overflow="hidden",o.appendChild(h),j.forEach(m=>{const f=document.createElement("div"),b=m.start/de*100,y=(m.end-m.start)/de*100;f.style.position="absolute",f.style.left=b+"%",f.style.top=k.indexOf(m.name)*c+2+"px",f.style.height=c-4+"px",f.style.width=y+"%",f.style.background=te[m.name]||"#4caf50",f.title=`${m.name}: ${m.start.toFixed(2)} → ${m.end.toFixed(2)}`;const x=document.createElement("span");if(x.textContent=`${m.name}: ${m.start.toFixed(2)} → ${m.end.toFixed(2)}`,x.style.position="absolute",x.style.top="0",x.style.left="2px",x.style.fontSize="10px",x.style.color="white",x.style.pointerEvents="none",x.style.whiteSpace="nowrap",x.style.overflow="hidden",x.style.textOverflow="ellipsis",f.appendChild(x),m.end<de){const T=document.createElement("div");T.style.position="absolute",T.style.right="0",T.style.top="0",T.style.width="5px",T.style.height="100%",T.style.background="rgba(255,255,255,0.5)",T.style.cursor="ew-resize",f.appendChild(T),T.addEventListener("mousedown",M=>{M.preventDefault(),M.stopPropagation();const P=M.clientX,L=f.offsetWidth;function X(Q){const re=Q.clientX-P,ce=Math.max(1,L+re),pe=ce/h.offsetWidth*100;f.style.width=pe+"%";const bt=m.start+ce/h.offsetWidth*de;x.textContent=`${m.name}: ${m.start.toFixed(2)} → ${bt.toFixed(2)}`}function W(){document.removeEventListener("mousemove",X),document.removeEventListener("mouseup",W);const Q=f.offsetWidth,re=m.start+Q/h.offsetWidth*de,ce=U.find(pe=>(pe.distance!==void 0?pe.distance:pe.time!==void 0?pe.time:0)===m.end);ce&&(ce.distance!==void 0?ce.distance=re:ce.time!==void 0&&(ce.time=re)),B()}document.addEventListener("mousemove",X),document.addEventListener("mouseup",W)})}h.appendChild(f)}),e.appendChild(o)}const Z=document.createElement("div");Z.style.position="relative",Z.style.height="40px",Z.style.background="#222",Z.style.marginBottom="4px",Z.style.paddingLeft="80px";const E=document.createElement("div");E.id="timeline-track",E.style.position="absolute",E.style.background="#444",E.style.left=Me+"px",E.style.top="0",E.style.right="0",E.style.bottom="0",Z.appendChild(E),U.forEach((o,c)=>{const h=o.distance!==void 0?o.distance:o.time!==void 0?o.time:0,m=`event ${c}: ${JSON.stringify(o.params)}`,f=R(h,de,{title:m});E.appendChild(f)}),e.appendChild(Z),U.forEach((o,c)=>{const h=document.createElement("div");h.style.display="flex",h.style.flexDirection="column",h.style.marginBottom="4px";const m=document.createElement("div");m.style.display="flex",m.style.alignItems="center";const f=document.createElement("input");f.type="number",f.style.width="60px",f.value=o.distance!==void 0?o.distance:o.time!==void 0?o.time:0,f.addEventListener("change",()=>{const M=parseFloat(f.value);isNaN(M)||(o.distance!==void 0?o.distance=M:o.time=M,B())}),m.appendChild(f);const b=u(o);m.appendChild(b.element);const y=document.createElement("button");y.textContent="⚙",y.style.marginLeft="4px",m.appendChild(y);const x=document.createElement("button");x.textContent="✖",x.style.marginLeft="4px",x.addEventListener("click",()=>{const M=i.events.indexOf(U[c]);M!==-1&&(i.events.splice(M,1),w())}),m.appendChild(x),h.appendChild(m);let T;y.addEventListener("click",()=>{T?(T.remove(),T=null):(T=p(o,b.update),h.appendChild(T))}),e.appendChild(h)});const a=document.createElement("button");a.textContent="+ add event",a.addEventListener("click",()=>{r?(r.remove(),r=null):(r=_(),e.appendChild(r),e.scrollTop=e.scrollHeight)}),e.appendChild(a);const n=document.createElement("button");n.textContent="export JSON",n.style.marginLeft="8px",n.addEventListener("click",()=>{const o=JSON.stringify(i.events,null,2),c=new Blob([o],{type:"application/json"}),h=URL.createObjectURL(c),m=document.createElement("a");m.href=h,m.download="vis-config.json",m.click(),URL.revokeObjectURL(h)}),e.appendChild(n);const t=document.createElement("input");t.type="file",t.accept=".json",t.style.marginLeft="8px",t.addEventListener("change",o=>{const c=o.target.files[0];if(c){const h=new FileReader;h.onload=m=>{try{const f=JSON.parse(m.target.result);i.events=f,B()}catch(f){alert("Invalid JSON: "+f.message)}},h.readAsText(c)}}),e.appendChild(t)}function F(g){const z=e.querySelectorAll("div")[1+g];z&&z.scrollIntoView({behavior:"smooth",block:"center"})}function B(){i.events.sort((g,A)=>{const z=g.distance!==void 0?g.distance:g.time!==void 0?g.time:0,V=A.distance!==void 0?A.distance:A.time!==void 0?A.time:0;return z-V}),w()}w(),i._renderTimeline=w,i._updateDistanceMarker=D,i._setPannelMinimized=S}const gt=new v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),ai=new v.Shader(`
    out highp vec2 pos;
    out highp vec2 vTextureCoord;


    void main(void) {
        gl_Position = vec4(gl_Vertex.xy, 0., 1.);
        pos = gl_Vertex.xy;

        vTextureCoord = gl_TexCoord.st;
    }
`,`
    in highp vec2 pos;
    in highp vec2 vTextureCoord;
    uniform float distanceFixed;
    uniform vec3 poolSize;
    uniform vec3 clearColor;
    uniform sampler2D screen;
    uniform sampler2D videoTex;
    uniform sampler2D oldPicture;
    uniform vec2 linep1;
    uniform vec2 linep2;
    uniform vec2 center;
    uniform float circleZone;
    out vec4 fragColor;




    bool isInFixedPart(vec2 p) {
        if (circleZone > .1) {
            float deltaY = .3;
            p.y -= 2.*deltaY;
            vec3 waterColor1 = vec3(.39, .98, .9);
            vec3 waterColor2 = vec3(.08, .57, .59);
            vec3 skinColor1 = vec3(1., 1., .9);
            vec3 skinColor2 = vec3(.39, .3, .2);
            vec3 color = texture(videoTex, vTextureCoord - vec2(0., deltaY)).rgb;
            vec2 diff = p - center;
            diff.x *= 2.;
            float d1 = length(color - waterColor1);
            float d2 = length(color - waterColor2);
            float d3 = length(color - skinColor1);
            float d4 = length(color - skinColor2);
            // bool isSkin = d3 < d2 && d3 < d1 || d4 < d2 && d4 < d1 || d3 + d4 < d1 + d2;
            bool isSkin = color.r > color.b * 0.9;
            // isSkin = !(d1 < .4 || d2 < .4);
            return dot(diff, diff) <= .01;
            return dot(diff, diff) <= .02 && isSkin;
        }
        // vec4 P1 = vec4(poolSize.x/2., 0., distanceFixed - poolSize.z / 2., 1.);
        // vec4 P2 = vec4(-poolSize.x/2., 0., distanceFixed - poolSize.z / 2., 1.);
        // vec4 P1 = vec4(12.5, 0., distanceFixed - 12.52, 1.);
        // vec4 P2 = vec4(-12.5, 0., distanceFixed - 12.52, 1.);
        // vec2 p1 = (gl_ModelViewMatrix * P1).xy;
        // vec2 p2 = (gl_ModelViewMatrix * P2).xy;
        vec2 p1 = linep1;
        vec2 p2 = linep2;
        // p1 = vec2(-.4, -.8);
        // p2 = vec2(.2, .5);
        // p1 = vec2(-1., 0.);
        // p2 = vec2(1., 0.);
        vec2 d = p2 - p1;
        vec2 n = vec2(-d.y, d.x);
        // return dot(vec2(0.5, .5)-p1, n) <= 0.;
        return dot(p-p1, n) <= 0.;
    }

    bool isInPinPointLine(vec2 p) {
        vec2 diff = p - center;
        return abs(diff.x) <= .005 && diff.y >= 0. && diff.y <= 2.*.3;
    }

    void main() {
        vec4 oldPix = texture(oldPicture, vTextureCoord);
        if (oldPix.rgb != vec3(0)) {
            fragColor = oldPix;
            if (circleZone == 0.) return;
        }
        if (circleZone > .1 && isInPinPointLine(vTextureCoord*2.-1.)) fragColor = vec4(1.);
        if (isInFixedPart(vTextureCoord*2.-1.)) {
            if(circleZone > .01) fragColor = texture(videoTex, vTextureCoord - vec2(0., 0.3));
            else fragColor = texture(screen, vTextureCoord);
        }
        // if(circleZone && isInFixedPart(vTextureCoord*2.-1.)) fragColor = texture(videoTex, vTextureCoord);
        // if(isInFixedPart(vTextureCoord*2.-1.)) fragColor = vec4(1., 0., 0., 1.);
        // if(isInFixedPart(vTextureCoord*2.-1.)) texture(screen, vTextureCoord);
        // if(isInFixedPart(pos)) fragColor = texture(screen, vTextureCoord);
        // else fragColor = vec4(0., 0., 0., 0.);
    }
`),ni=new v.Shader(`
    out highp vec2 pos;
    out highp vec2 vTextureCoord;


    void main(void) {
        gl_Position = vec4(gl_Vertex.xy, 0., 1.);
        pos = gl_Vertex.xz;

        vTextureCoord = gl_TexCoord.st;
    }
`,`
    in highp vec2 pos;
    in highp vec2 vTextureCoord;

    uniform vec3 poolSize;
    uniform sampler2D picture;
    uniform sampler2D screen;

    out vec4 fragColor;


    void main() {
        vec2 coord = (pos + 1.) / 2.;
        // vec4 pix = texture(screen, coord);
        vec4 pix = texture(screen, vTextureCoord);
        vec4 pixPicture = texture(picture, vTextureCoord);
        fragColor = pix;
        if(pixPicture.rgb != vec3(0)) fragColor = pixPicture;
        
    }
`);let _e=new v.Texture,Ue=new v.Texture,vt=!1,Qe=null;const xt=(s,e,r)=>{vt=!0,_e=new v.Texture(s,e,{type:r.FLOAT,filter:r.NEAREST}),Ue=new v.Texture(s,e,{type:r.FLOAT,filter:r.NEAREST}),Qe=r.createFramebuffer(),r.bindFramebuffer(r.FRAMEBUFFER,Qe);const l=r.COLOR_ATTACHMENT0;r.framebufferTexture2D(r.FRAMEBUFFER,l,r.TEXTURE_2D,_e.id,0),r.bindFramebuffer(r.FRAMEBUFFER,null)};function De(s){s.x/=i.gl.canvas.width/2,s.x-=1,s.y/=i.gl.canvas.height/2,s.y-=1}const wt=s=>{console.log("take chrono photo : "+s),vt||xt(i.gl.canvas.width,i.gl.canvas.height,i.gl);const e=i.params.simulation.poolSize,r=i.gl.project(e.x/2,0,i.distanceFixed+1-e.z/2),l=i.gl.project(-e.x/2,0,i.distanceFixed+1-e.z/2);De(r),De(l);const d=i.swimmers[0].body.center,u=i.gl.project(d.x,d.y,d.z);De(u),Ue.drawTo(()=>{_e.bind(0),i.gl.activeTexture(i.gl.TEXTURE1),i.gl.bindTexture(i.gl.TEXTURE_2D,i.drawingTexture),i.gl.activeTexture(i.gl.TEXTURE2),i.gl.bindTexture(i.gl.TEXTURE_2D,i.currentVideo.texture),ai.uniforms({oldPicture:0,screen:1,videoTex:2,distanceFixed:i.distanceFixed,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],linep1:[r.x,r.y],linep2:[l.x,l.y],center:[u.x,u.y],circleZone:s}).draw(gt)}),_e.swapWith(Ue),i.gl.bindFramebuffer(i.gl.FRAMEBUFFER,i.drawingFrameBuffer)},li=()=>{i.chronoPhotoCircleTime&&i.time>=i.chronoPhotoCircleTime&&(i.chronoPhotoCircleTime=null,wt(!0)),i.gl.bindFramebuffer(i.gl.FRAMEBUFFER,null),_e.bind(7),i.gl.activeTexture(i.gl.TEXTURE8),i.gl.bindTexture(i.gl.TEXTURE_2D,i.drawingTexture),ni.uniforms({picture:7,screen:8}).draw(gt)};i._fixTexture=wt;i._clearChronoTexture=xt;new TextEncoder;function ci(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}function di(s){var e=ci(s);e=="WebGL not supported"&&(e='Your browser does not support WebGL.<br>Please see    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">    Getting a WebGL Implementation</a>.');var r=document.getElementById("loading");r.innerHTML=e,r.style.zIndex=1}window.onerror=di;var Le,J;const hi=10,C=i.gl;var Ae,Ge;G.initAttributes();function yt(){document.getElementById("warning").hidden=!(i.resolution.x*i.resolution.y>3e5&&i.water&&i.params.visualizations.areaConservationEnabled)}let Ie=0;function ui(s){Ie+=s,Ie>=1&&(document.getElementById("fps").innerText=`${(1/s).toFixed(1)} FPS`,Ie=0)}function fe(){console.log("reset"),document.getElementById("resolution").innerText=`Resolution: ${i.resolution.x} x ${i.resolution.y}`,yt(),Ae=new v.Vector(0,-i.params.simulation.poolSize.z/2+1),i.water.reset(i.resolution),J.flagCenter=Ae,J.flagSize=Ge,J.reset();const s=i.params.simulation.poolSize.x/hi;let e=-i.params.simulation.poolSize.x/2+s/2;for(let r of i.swimmers)r.body.center.x=e,r.body.initCenter=r.body.center.clone(),r.startingPoint.x=e,e+=s}function mi(s){const e=parseFloat(s.target.value);isNaN(e)||(i.setRaceTime(e),i.swimmers.forEach(r=>r.setCurrentDataIndex()))}window.onload=function(){var s=window.devicePixelRatio||1,e=document.getElementById("help");function r(){var o=innerWidth,c=innerHeight;C.canvas.width=o*s,C.canvas.height=c*s,C.canvas.style.width=o+"px",C.canvas.style.height=c+"px",C.viewport(0,0,C.canvas.width,C.canvas.height),C.matrixMode(C.PROJECTION),C.loadIdentity(),C.perspective(i.params.fov,C.canvas.width/C.canvas.height,.01,100),C.matrixMode(C.MODELVIEW),i.resetDrawingTexture(),t()}document.body.appendChild(C.canvas),C.canvas.oncontextmenu=function(o){o.preventDefault()},C.clearColor(0,0,0,1),Ae=new v.Vector(0,-i.params.simulation.poolSize.z/2+1),Ge=.7;const l=document.getElementById("time-slider");l&&l.addEventListener("input",mi);const d=document.getElementById("drop-zone");let u=0;document.addEventListener("dragenter",o=>{u++,d.style.display="flex"}),document.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="copy"}),document.addEventListener("dragleave",o=>{u--,u===0&&(d.style.display="none")}),oi(C,fe),i._reset=fe,setTimeout(()=>{si("event-editor")},50),J=new he(C,i.water,Ae,Ge),Le=new We({xneg:document.getElementById("xneg"),xpos:document.getElementById("xpos"),yneg:document.getElementById("ypos"),ypos:document.getElementById("ypos"),zneg:document.getElementById("zneg"),zpos:document.getElementById("zpos")},C);const p=new G(new v.Vector(0,0,0));if(i.swimmers.push(p),i.water=new ae(i.gl),!i.water.textureA.canDrawTo()||!i.water.textureB.canDrawTo())throw new Error("Rendering to floating-point textures is required but not supported");fe();for(var _=0;_<20;_++)i.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,_&1?.01:-.01);document.getElementById("loading").innerHTML="",r();var R=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(o){setTimeout(o,0)},D=new Date().getTime();function S(){var o=new Date().getTime();a((o-D)/1e3),t(),D=o,R(S)}R(S),window.onresize=r;var w,F,B,g=-1,A=0,z=1,V=2;const N=3;var U,I;function k(o,c,h){if(U=o,I=c,!h||h.button===0){var m=new v.Raytracer,f=m.getRayForPixel(o*s,c*s),b=m.eye.add(f.multiply(-m.eye.y/f.y));for(let x of i.swimmers){var y=v.Raytracer.hitTestSphere(m.eye,f,x.body.center,x.body.radius);if(y){g=z,B=x,x.body.cinematic=!0,w=y.hit,F=m.getRayForPixel(C.canvas.width/2,C.canvas.height/2).negative();return}}Math.abs(b.x)<i.params.simulation.poolSize.x/2&&Math.abs(b.z)<i.params.simulation.poolSize.z/2&&(g=A,K(o,c))}else h.button===2?g=V:h.button===1&&(g=N)}function K(o,c,h){switch(g){case A:{var m=new v.Raytracer,f=m.getRayForPixel(o*s,c*s),b=m.eye.add(f.multiply(-m.eye.y/f.y));i.water.addDrop(b.x/i.params.simulation.poolSize.x*2,b.z/i.params.simulation.poolSize.z*2,.06,.03),i.paused&&(i.water.updateNormals(),J.updateCaustics(i.water));break}case z:{var m=new v.Raytracer,f=m.getRayForPixel(o*s,c*s),y=-F.dot(m.eye.subtract(w))/F.dot(f),x=m.eye.add(f.multiply(y));const P=B.body.center.add(x.subtract(w)),L=B.body.radius,X=Math.max(L-i.params.simulation.poolSize.x/2,Math.min(i.params.simulation.poolSize.x/2-L,P.x)),W=Math.max(L-i.params.simulation.poolSize.y,Math.min(10,P.y)),Q=Math.max(L-i.params.simulation.poolSize.z/2,Math.min(i.params.simulation.poolSize.z/2-L,P.z));B.body.move(new v.Vector(X,W,Q)),w=x,i.paused&&J.updateCaustics(i.water);break}case V:{if(h&&h.shiftKey){i.angleZ-=o-U,i.angleZ=Math.max(-89.999,Math.min(89.999,i.angleZ));break}i.angleY-=o-U,i.angleX-=c-I,i.angleX=Math.max(-89.999,Math.min(89.999,i.angleX));break}case N:{const T=.001*i.zoomDistance;i.translateX+=T*(o-U),i.translateY-=T*(c-I)}}U=o,I=c,i.paused&&t()}function te(){g=-1,B&&(B.body.cinematic=!G.useGravity)}function O(o){return o===e||o.parentNode&&O(o.parentNode)}function H(o){return o&&(o.id==="event-editor"||o.parentNode&&H(o.parentNode))}function j(o){i.zoomDistance*=1-o*2e-4,i.zoomDistance=Math.max(2,Math.min(1e3,i.zoomDistance)),i.paused&&t()}addEventListener("wheel",function(o){if(!H(o.target)){var c=o.deltaY;j(-c)}}),document.onmousedown=function(o){C.canvas.focus(),O(o.target)||k(o.pageX,o.pageY,o)},document.onmousemove=function(o){K(o.pageX,o.pageY,o)},document.onmouseup=function(){te()},document.ontouchstart=function(o){o.touches.length===1&&!O(o.target)&&(o.preventDefault(),k(o.touches[0].pageX,o.touches[0].pageY,!1))},document.ontouchmove=function(o){o.touches.length===1&&K(o.touches[0].pageX,o.touches[0].pageY)},document.ontouchend=function(o){o.touches.length==0&&te()};function Z(){i.paused?i.play():i.pause()}const E=async function(o){if(o.which==32)Z();else if(o.which==71)i.useGravity(!G.useGravity);else if(o.which==76&&i.paused)t();else if(o.which==74)i.swimmers.forEach(c=>c.jump(2));else if(o.which==67)i.params.visualizations.areaConservationEnabled=!i.params.visualizations.areaConservationEnabled,yt(),console.log("Area conservation "+(i.params.visualizations.areaConservationEnabled?"enabled.":"disabled."));else if(o.which==80)i.water.showProjectionGrid=!i.water.showProjectionGrid,console.log("Projection grid "+(i.water.showProjectionGrid?"enabled.":"disabled."));else if(o.which==65)i.water.showAreaConservedGrid=!i.water.showAreaConservedGrid,console.log("Area conserved grid "+(i.water.showAreaConservedGrid?"enabled.":"disabled."));else if(o.which==83){if(G.swimming=!G.swimming,G.swimming)for(let c of i.swimmers)c.swim(!0);else stopRace();console.log("Swimming "+(G.swimming?"enabled.":"disabled."))}else o.which==86?i.params.video.show=!i.params.video.show:o.which==72?(document.getElementById("commands").hidden=!document.getElementById("commands").hidden,document.getElementById("h").hidden=!document.getElementById("h").hidden):o.which==68?i.playingDemo?i.stopDemo():await i.launchDemo():o.which==81?i.chronoPhotography({}):o.which==82?(i.setScene("100m freestyle").then(()=>i.startRace()),i._setPannelMinimized(!0)):o.which==77?i.setMVPMI():o.which==75?i.recalibrate():o.which==40?(i.resolution.x>129&&(i.resolution.x=Math.round(i.resolution.x/2)),fe(),console.log("decreasing x resolution")):o.which==38?(i.resolution.x<16384&&(i.resolution.x=Math.round(i.resolution.x*2)),fe(),console.log("increasing x resolution")):o.which==37?(i.resolution.y>129&&(i.resolution.y=Math.round(i.resolution.y/2)),fe(),console.log("decreasing y resolution")):o.which==39&&(i.resolution.y<16384&&(i.resolution.y=Math.round(i.resolution.y*2)),fe(),console.log("increasing y resolution"))};C.canvas.addEventListener("keydown",E);function a(o){if(i.updateDemo(o),!i.paused&&!(o>1)){if(g==z)for(let c of i.swimmers)c.body.velocity=new v.Vector(0,0,0);C.clearColor(0,0,0,1),C.bindFramebuffer(C.FRAMEBUFFER,null),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT);for(let c of i.swimmers)c.update(o);i.updateFloaters(o),i.classicalOverlayEnabled||i.water.updateSpheres(o);for(let c=0;c<i.params.numSteps;c++)i.classicalOverlayEnabled||i.water.stepSimulation(o);J.updateCaustics(i.water),i.updateTime(o),i.updateParams(),l.value=i.getRaceTime(),ui(o),i.splashParticles.update(o),i.bubbleSpheres.forEach(c=>c.update(o))}}function n(){if(!G.raceHasStarted||!i.params.cornerView.show||i.classicalOverlayEnabled)return;i.cornerView=!0,C.loadIdentity(),C.translate(0,0,-35),C.rotate(90,1,0,0),C.rotate(-90,0,1,0),C.translate(0,.5,0);const o=C.canvas.height/4,c=16*o/9,h=0,m=C.canvas.height-o;C.viewport(h,m,c,o),J.renderWater(i.water,Le,i.params.visualizations.shadow),i.isSceneSynchronizedSwimming()&&(i.params.visualizations.showStreaks||i.params.simulation.splashes.enabled)&&i.splashParticles.draw({}),J.renderSpheres(i.water),C.viewport(0,0,C.canvas.width,C.canvas.height),C.loadIdentity(),C.translate(i.translateX,i.translateY,-i.zoomDistance),C.rotate(-i.angleZ,0,0,1),C.rotate(-i.angleX,1,0,0),C.rotate(-i.angleY,0,1,0),C.translate(0,.5,0),i.cornerView=!1}function t(){v.keys.L&&(J.lightDir=v.Vector.fromAngles((90-i.angleY)*Math.PI/180,-i.angleX*Math.PI/180),i.paused&&J.updateCaustics(i.water)),G.updateAttributesTexture(),i.water.addOrRemoveVisualizationWaves(!0),i.water.updateNormals(),C.clearColor(.1,.2,.5,1),C.clearColor(.94/1.5,.92/1.5,.84/1.5,1),C.bindFramebuffer(C.FRAMEBUFFER,i.drawingFrameBuffer),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT),C.loadIdentity(),C.translate(i.translateX,i.translateY,-i.zoomDistance),C.rotate(-i.angleZ,0,0,1),C.rotate(-i.angleX,1,0,0),C.rotate(-i.angleY,0,1,0),C.translate(0,.5,0),C.enable(C.DEPTH_TEST),C.disable(C.BLEND),C.viewport(0,0,C.canvas.width,C.canvas.height),J.sphereCenter=i.swimmers[0].body.center,J.sphereRadius=i.swimmers[0].body.radius,J.renderCube(i.water),J.renderWater(i.water,Le,i.params.visualizations.shadow),J.renderSpheres(i.water),C.disable(C.DEPTH_TEST);const o={};!i.classicalOverlayEnabled&&(i.params.visualizations.showStreaks||i.params.simulation.splashes.enabled)&&i.splashParticles.draw(o),i.renderVideo(),i.drawingFrameBuffer!==null&&li(),n(),i.water.addOrRemoveVisualizationWaves(!1)}};
//# sourceMappingURL=swimming-BjYMQqQ6.js.map
