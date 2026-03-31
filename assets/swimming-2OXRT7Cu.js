var vt=Object.defineProperty;var He=o=>{throw TypeError(o)};var xt=(o,e,s)=>e in o?vt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var ie=(o,e,s)=>xt(o,typeof e!="symbol"?e+"":e,s),wt=(o,e,s)=>e.has(o)||He("Cannot "+s);var ve=(o,e,s)=>e.has(o)?He("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,s);var K=(o,e,s)=>(wt(o,e,"access private method"),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const u of d)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function s(d){const u={};return d.integrity&&(u.integrity=d.integrity),d.referrerPolicy&&(u.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?u.credentials="include":d.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(d){if(d.ep)return;d.ep=!0;const u=s(d);fetch(d.href,u)}})();var g=function(){var o,e={create:function(n){n=n||{};var a=document.createElement("canvas");a.width=800,a.height=600,"alpha"in n||(n.alpha=!1);try{o=a.getContext("webgl2",n)}catch{}try{o=o||a.getContext("experimental-webgl",n)}catch{}if(!o)throw new Error("WebGL not supported");return o.HALF_FLOAT_OES=36193,s(),l(),d(),A(),o},keys:{},Matrix:w,Indexer:P,Buffer:I,Mesh:x,HitTest:V,Raytracer:O,Shader:B,Texture:N,Vector:_};function s(){o.MODELVIEW=D|1,o.PROJECTION=D|2;var n=new w,a=new w;o.modelviewMatrix=new w,o.projectionMatrix=new w;var t=[],r=[],c,h;o.matrixMode=function(m){switch(m){case o.MODELVIEW:c="modelviewMatrix",h=t;break;case o.PROJECTION:c="projectionMatrix",h=r;break;default:throw new Error("invalid matrix mode "+m)}},o.loadIdentity=function(){w.identity(o[c])},o.loadMatrix=function(m){for(var f=m.m,b=o[c].m,y=0;y<16;y++)b[y]=f[y]},o.multMatrix=function(m){o.loadMatrix(w.multiply(o[c],m,a))},o.perspective=function(m,f,b,y){o.multMatrix(w.perspective(m,f,b,y,n))},o.frustum=function(m,f,b,y,v,E){o.multMatrix(w.frustum(m,f,b,y,v,E,n))},o.ortho=function(m,f,b,y,v,E){o.multMatrix(w.ortho(m,f,b,y,v,E,n))},o.scale=function(m,f,b){o.multMatrix(w.scale(m,f,b,n))},o.translate=function(m,f,b){o.multMatrix(w.translate(m,f,b,n))},o.rotate=function(m,f,b,y){o.multMatrix(w.rotate(m,f,b,y,n))},o.lookAt=function(m,f,b,y,v,E,M,F,L){o.multMatrix(w.lookAt(m,f,b,y,v,E,M,F,L,n))},o.pushMatrix=function(){h.push(Array.prototype.slice.call(o[c].m))},o.popMatrix=function(){var m=h.pop();o[c].m=S?new Float32Array(m):m},o.project=function(m,f,b,y,v,E){y=y||o.modelviewMatrix,v=v||o.projectionMatrix,E=E||o.getParameter(o.VIEWPORT);var M=v.transformPoint(y.transformPoint(new _(m,f,b)));return new _(E[0]+E[2]*(M.x*.5+.5),E[1]+E[3]*(M.y*.5+.5),M.z*.5+.5)},o.unProject=function(m,f,b,y,v,E){y=y||o.modelviewMatrix,v=v||o.projectionMatrix,E=E||o.getParameter(o.VIEWPORT);var M=new _((m-E[0])/E[2]*2-1,(f-E[1])/E[3]*2-1,b*2-1);return w.inverse(w.multiply(v,y,n),a).transformPoint(M)},o.matrixMode(o.MODELVIEW)}function l(){var n={mesh:new x({coords:!0,colors:!0,triangles:!1}),mode:-1,coord:[0,0,0,0],color:[1,1,1,1],shader:new B("      uniform float pointSize;      out vec4 color;      out vec4 coord;      void main() {        color = gl_Color;        coord = gl_TexCoord;        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;        gl_PointSize = pointSize;      }    ","      uniform sampler2D tex;      uniform float pointSize;      uniform bool useTexture;      in vec4 color;      in vec4 coord;      out vec4 fragColor;      void main() {        fragColor = color;        if (useTexture) fragColor *= texture(tex, coord.xy);      }    ")};o.pointSize=function(a){n.shader.uniforms({pointSize:a})},o.begin=function(a){if(n.mode!=-1)throw new Error("mismatched gl.begin() and gl.end() calls");n.mode=a,n.mesh.colors=[],n.mesh.coords=[],n.mesh.vertices=[]},o.color=function(a,t,r,c){n.color=arguments.length==1?a.toArray().concat(1):[a,t,r,c||1]},o.texCoord=function(a,t){n.coord=arguments.length==1?a.toArray(2):[a,t]},o.vertex=function(a,t,r){n.mesh.colors.push(n.color),n.mesh.coords.push(n.coord),n.mesh.vertices.push(arguments.length==1?a.toArray():[a,t,r])},o.end=function(){if(n.mode==-1)throw new Error("mismatched gl.begin() and gl.end() calls");n.mesh.compile(),n.shader.uniforms({useTexture:!!o.getParameter(o.TEXTURE_BINDING_2D)}).draw(n.mesh,n.mode),n.mode=-1}}function d(){var n=o,a=0,t=0,r={},c=!1,h=Object.prototype.hasOwnProperty;function m(){for(var F in r)if(h.call(r,F)&&r[F])return!0;return!1}function f(F){var L={};for(var X in F)typeof F[X]=="function"?L[X]=function(J){return function(){J.apply(F,arguments)}}(F[X]):L[X]=F[X];L.original=F,L.x=L.pageX,L.y=L.pageY;for(var W=o.canvas;W;W=W.offsetParent)L.x-=W.offsetLeft,L.y-=W.offsetTop;return c?(L.deltaX=L.x-a,L.deltaY=L.y-t):(L.deltaX=0,L.deltaY=0,c=!0),a=L.x,t=L.y,L.dragging=m(),L.preventDefault=function(){L.original.preventDefault()},L.stopPropagation=function(){L.original.stopPropagation()},L}function b(F){o=n,m()||(p(document,"mousemove",y),p(document,"mouseup",v),T(o.canvas,"mousemove",y),T(o.canvas,"mouseup",v)),r[F.which]=!0,F=f(F),o.onmousedown&&o.onmousedown(F),F.preventDefault()}function y(F){o=n,F=f(F),o.onmousemove&&o.onmousemove(F),F.preventDefault()}function v(F){o=n,r[F.which]=!1,m()||(T(document,"mousemove",y),T(document,"mouseup",v),p(o.canvas,"mousemove",y),p(o.canvas,"mouseup",v)),F=f(F),o.onmouseup&&o.onmouseup(F),F.preventDefault()}function E(){c=!1}function M(){r={},c=!1}p(o.canvas,"mousedown",b),p(o.canvas,"mousemove",y),p(o.canvas,"mouseup",v),p(o.canvas,"mouseover",E),p(o.canvas,"mouseout",E),p(document,"contextmenu",M)}function u(n){var a={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};return a[n]||(n>=65&&n<=90?String.fromCharCode(n):null)}function p(n,a,t){n.addEventListener(a,t)}function T(n,a,t){n.removeEventListener(a,t)}p(document,"keydown",function(n){if(!n.altKey&&!n.ctrlKey&&!n.metaKey){var a=u(n.keyCode);a&&(e.keys[a]=!0),e.keys[n.keyCode]=!0}}),p(document,"keyup",function(n){if(!n.altKey&&!n.ctrlKey&&!n.metaKey){var a=u(n.keyCode);a&&(e.keys[a]=!1),e.keys[n.keyCode]=!1}});function A(){(function(n){o.makeCurrent=function(){o=n}})(o),o.animate=function(){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(c){setTimeout(c,16.666666666666668)},a=new Date().getTime(),t=o;function r(){o=t;var c=new Date().getTime();o.onupdate&&o.onupdate((c-a)/1e3),o.ondraw&&o.ondraw(),n(r),a=c}r()},o.fullscreen=function(n){n=n||{};var a=n.paddingTop||0,t=n.paddingLeft||0,r=n.paddingRight||0,c=n.paddingBottom||0;if(!document.body)throw new Error("document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)");document.body.appendChild(o.canvas),document.body.style.overflow="hidden",o.canvas.style.position="absolute",o.canvas.style.left=t+"px",o.canvas.style.top=a+"px";function h(){o.canvas.width=window.innerWidth-t-r,o.canvas.height=window.innerHeight-a-c,o.viewport(0,0,o.canvas.width,o.canvas.height),(n.camera||!("camera"in n))&&(o.matrixMode(o.PROJECTION),o.loadIdentity(),o.perspective(n.fov||45,o.canvas.width/o.canvas.height,n.near||.1,n.far||1e3),o.matrixMode(o.MODELVIEW)),o.ondraw&&o.ondraw()}p(window,"resize",h),h()}}var D=305397760,S=typeof Float32Array<"u";function w(){var n=Array.prototype.concat.apply([],arguments);n.length||(n=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.m=S?new Float32Array(n):n}w.prototype={inverse:function(){return w.inverse(this,new w)},transpose:function(){return w.transpose(this,new w)},multiply:function(n){return w.multiply(this,n,new w)},transformPoint:function(n){var a=this.m;return new _(a[0]*n.x+a[1]*n.y+a[2]*n.z+a[3],a[4]*n.x+a[5]*n.y+a[6]*n.z+a[7],a[8]*n.x+a[9]*n.y+a[10]*n.z+a[11]).divide(a[12]*n.x+a[13]*n.y+a[14]*n.z+a[15])},transformVector:function(n){var a=this.m;return new _(a[0]*n.x+a[1]*n.y+a[2]*n.z,a[4]*n.x+a[5]*n.y+a[6]*n.z,a[8]*n.x+a[9]*n.y+a[10]*n.z)}},w.inverse=function(n,a){a=a||new w;var t=n.m,r=a.m;r[0]=t[5]*t[10]*t[15]-t[5]*t[14]*t[11]-t[6]*t[9]*t[15]+t[6]*t[13]*t[11]+t[7]*t[9]*t[14]-t[7]*t[13]*t[10],r[1]=-t[1]*t[10]*t[15]+t[1]*t[14]*t[11]+t[2]*t[9]*t[15]-t[2]*t[13]*t[11]-t[3]*t[9]*t[14]+t[3]*t[13]*t[10],r[2]=t[1]*t[6]*t[15]-t[1]*t[14]*t[7]-t[2]*t[5]*t[15]+t[2]*t[13]*t[7]+t[3]*t[5]*t[14]-t[3]*t[13]*t[6],r[3]=-t[1]*t[6]*t[11]+t[1]*t[10]*t[7]+t[2]*t[5]*t[11]-t[2]*t[9]*t[7]-t[3]*t[5]*t[10]+t[3]*t[9]*t[6],r[4]=-t[4]*t[10]*t[15]+t[4]*t[14]*t[11]+t[6]*t[8]*t[15]-t[6]*t[12]*t[11]-t[7]*t[8]*t[14]+t[7]*t[12]*t[10],r[5]=t[0]*t[10]*t[15]-t[0]*t[14]*t[11]-t[2]*t[8]*t[15]+t[2]*t[12]*t[11]+t[3]*t[8]*t[14]-t[3]*t[12]*t[10],r[6]=-t[0]*t[6]*t[15]+t[0]*t[14]*t[7]+t[2]*t[4]*t[15]-t[2]*t[12]*t[7]-t[3]*t[4]*t[14]+t[3]*t[12]*t[6],r[7]=t[0]*t[6]*t[11]-t[0]*t[10]*t[7]-t[2]*t[4]*t[11]+t[2]*t[8]*t[7]+t[3]*t[4]*t[10]-t[3]*t[8]*t[6],r[8]=t[4]*t[9]*t[15]-t[4]*t[13]*t[11]-t[5]*t[8]*t[15]+t[5]*t[12]*t[11]+t[7]*t[8]*t[13]-t[7]*t[12]*t[9],r[9]=-t[0]*t[9]*t[15]+t[0]*t[13]*t[11]+t[1]*t[8]*t[15]-t[1]*t[12]*t[11]-t[3]*t[8]*t[13]+t[3]*t[12]*t[9],r[10]=t[0]*t[5]*t[15]-t[0]*t[13]*t[7]-t[1]*t[4]*t[15]+t[1]*t[12]*t[7]+t[3]*t[4]*t[13]-t[3]*t[12]*t[5],r[11]=-t[0]*t[5]*t[11]+t[0]*t[9]*t[7]+t[1]*t[4]*t[11]-t[1]*t[8]*t[7]-t[3]*t[4]*t[9]+t[3]*t[8]*t[5],r[12]=-t[4]*t[9]*t[14]+t[4]*t[13]*t[10]+t[5]*t[8]*t[14]-t[5]*t[12]*t[10]-t[6]*t[8]*t[13]+t[6]*t[12]*t[9],r[13]=t[0]*t[9]*t[14]-t[0]*t[13]*t[10]-t[1]*t[8]*t[14]+t[1]*t[12]*t[10]+t[2]*t[8]*t[13]-t[2]*t[12]*t[9],r[14]=-t[0]*t[5]*t[14]+t[0]*t[13]*t[6]+t[1]*t[4]*t[14]-t[1]*t[12]*t[6]-t[2]*t[4]*t[13]+t[2]*t[12]*t[5],r[15]=t[0]*t[5]*t[10]-t[0]*t[9]*t[6]-t[1]*t[4]*t[10]+t[1]*t[8]*t[6]+t[2]*t[4]*t[9]-t[2]*t[8]*t[5];for(var c=t[0]*r[0]+t[1]*r[4]+t[2]*r[8]+t[3]*r[12],h=0;h<16;h++)r[h]/=c;return a},w.transpose=function(n,a){a=a||new w;var t=n.m,r=a.m;return r[0]=t[0],r[1]=t[4],r[2]=t[8],r[3]=t[12],r[4]=t[1],r[5]=t[5],r[6]=t[9],r[7]=t[13],r[8]=t[2],r[9]=t[6],r[10]=t[10],r[11]=t[14],r[12]=t[3],r[13]=t[7],r[14]=t[11],r[15]=t[15],a},w.multiply=function(n,a,t){t=t||new w;var r=n.m,c=a.m,h=t.m;return h[0]=r[0]*c[0]+r[1]*c[4]+r[2]*c[8]+r[3]*c[12],h[1]=r[0]*c[1]+r[1]*c[5]+r[2]*c[9]+r[3]*c[13],h[2]=r[0]*c[2]+r[1]*c[6]+r[2]*c[10]+r[3]*c[14],h[3]=r[0]*c[3]+r[1]*c[7]+r[2]*c[11]+r[3]*c[15],h[4]=r[4]*c[0]+r[5]*c[4]+r[6]*c[8]+r[7]*c[12],h[5]=r[4]*c[1]+r[5]*c[5]+r[6]*c[9]+r[7]*c[13],h[6]=r[4]*c[2]+r[5]*c[6]+r[6]*c[10]+r[7]*c[14],h[7]=r[4]*c[3]+r[5]*c[7]+r[6]*c[11]+r[7]*c[15],h[8]=r[8]*c[0]+r[9]*c[4]+r[10]*c[8]+r[11]*c[12],h[9]=r[8]*c[1]+r[9]*c[5]+r[10]*c[9]+r[11]*c[13],h[10]=r[8]*c[2]+r[9]*c[6]+r[10]*c[10]+r[11]*c[14],h[11]=r[8]*c[3]+r[9]*c[7]+r[10]*c[11]+r[11]*c[15],h[12]=r[12]*c[0]+r[13]*c[4]+r[14]*c[8]+r[15]*c[12],h[13]=r[12]*c[1]+r[13]*c[5]+r[14]*c[9]+r[15]*c[13],h[14]=r[12]*c[2]+r[13]*c[6]+r[14]*c[10]+r[15]*c[14],h[15]=r[12]*c[3]+r[13]*c[7]+r[14]*c[11]+r[15]*c[15],t},w.identity=function(n){n=n||new w;var a=n.m;return a[0]=a[5]=a[10]=a[15]=1,a[1]=a[2]=a[3]=a[4]=a[6]=a[7]=a[8]=a[9]=a[11]=a[12]=a[13]=a[14]=0,n},w.perspective=function(n,a,t,r,c){var h=Math.tan(n*Math.PI/360)*t,m=h*a;return w.frustum(-m,m,-h,h,t,r,c)},w.frustum=function(n,a,t,r,c,h,m){m=m||new w;var f=m.m;return f[0]=2*c/(a-n),f[1]=0,f[2]=(a+n)/(a-n),f[3]=0,f[4]=0,f[5]=2*c/(r-t),f[6]=(r+t)/(r-t),f[7]=0,f[8]=0,f[9]=0,f[10]=-(h+c)/(h-c),f[11]=-2*h*c/(h-c),f[12]=0,f[13]=0,f[14]=-1,f[15]=0,m},w.ortho=function(n,a,t,r,c,h,m){m=m||new w;var f=m.m;return f[0]=2/(a-n),f[1]=0,f[2]=0,f[3]=-(a+n)/(a-n),f[4]=0,f[5]=2/(r-t),f[6]=0,f[7]=-(r+t)/(r-t),f[8]=0,f[9]=0,f[10]=-2/(h-c),f[11]=-(h+c)/(h-c),f[12]=0,f[13]=0,f[14]=0,f[15]=1,m},w.scale=function(n,a,t,r){r=r||new w;var c=r.m;return c[0]=n,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=a,c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=t,c[11]=0,c[12]=0,c[13]=0,c[14]=0,c[15]=1,r},w.translate=function(n,a,t,r){r=r||new w;var c=r.m;return c[0]=1,c[1]=0,c[2]=0,c[3]=n,c[4]=0,c[5]=1,c[6]=0,c[7]=a,c[8]=0,c[9]=0,c[10]=1,c[11]=t,c[12]=0,c[13]=0,c[14]=0,c[15]=1,r},w.rotate=function(n,a,t,r,c){if(!n||!a&&!t&&!r)return w.identity(c);c=c||new w;var h=c.m,m=Math.sqrt(a*a+t*t+r*r);n*=Math.PI/180,a/=m,t/=m,r/=m;var f=Math.cos(n),b=Math.sin(n),y=1-f;return h[0]=a*a*y+f,h[1]=a*t*y-r*b,h[2]=a*r*y+t*b,h[3]=0,h[4]=t*a*y+r*b,h[5]=t*t*y+f,h[6]=t*r*y-a*b,h[7]=0,h[8]=r*a*y-t*b,h[9]=r*t*y+a*b,h[10]=r*r*y+f,h[11]=0,h[12]=0,h[13]=0,h[14]=0,h[15]=1,c},w.lookAt=function(n,a,t,r,c,h,m,f,b,y){y=y||new w;var v=y.m,E=new _(n,a,t),M=new _(r,c,h),F=new _(m,f,b),L=E.subtract(M).unit(),X=F.cross(L).unit(),W=L.cross(X).unit();return v[0]=X.x,v[1]=X.y,v[2]=X.z,v[3]=-X.dot(E),v[4]=W.x,v[5]=W.y,v[6]=W.z,v[7]=-W.dot(E),v[8]=L.x,v[9]=L.y,v[10]=L.z,v[11]=-L.dot(E),v[12]=0,v[13]=0,v[14]=0,v[15]=1,y};function P(){this.unique=[],this.indices=[],this.map={}}P.prototype={add:function(n){var a=JSON.stringify(n);return a in this.map||(this.map[a]=this.unique.length,this.unique.push(n)),this.map[a]}};function I(n,a){this.buffer=null,this.target=n,this.type=a,this.data=[]}I.prototype={compile:function(n){for(var a=[],t=0,r=1e4;t<this.data.length;t+=r)a=Array.prototype.concat.apply(a,this.data.slice(t,t+r));var c=this.data.length?a.length/this.data.length:0;if(c!=Math.round(c))throw new Error("buffer elements not of consistent size, average size is "+c);this.buffer=this.buffer||o.createBuffer(),this.buffer.length=a.length,this.buffer.spacing=c,o.bindBuffer(this.target,this.buffer),o.bufferData(this.target,new this.type(a),n||o.STATIC_DRAW)}};function x(n){n=n||{},this.vertexBuffers={},this.indexBuffers={},this.addVertexBuffer("vertices","gl_Vertex"),n.coords&&this.addVertexBuffer("coords","gl_TexCoord"),n.normals&&this.addVertexBuffer("normals","gl_Normal"),n.colors&&this.addVertexBuffer("colors","gl_Color"),(!("triangles"in n)||n.triangles)&&this.addIndexBuffer("triangles"),n.lines&&this.addIndexBuffer("lines")}x.prototype={addVertexBuffer:function(n,a){var t=this.vertexBuffers[a]=new I(o.ARRAY_BUFFER,Float32Array);t.name=n,this[n]=[]},addIndexBuffer:function(n){this.indexBuffers[n]=new I(o.ELEMENT_ARRAY_BUFFER,Uint16Array),this[n]=[]},compile:function(){for(var n in this.vertexBuffers){var a=this.vertexBuffers[n];a.data=this[a.name],a.compile()}for(var t in this.indexBuffers){var a=this.indexBuffers[t];a.data=this[t],a.compile()}},transform:function(n){if(this.vertices=this.vertices.map(function(t){return n.transformPoint(_.fromArray(t)).toArray()}),this.normals){var a=n.inverse().transpose();this.normals=this.normals.map(function(t){return a.transformVector(_.fromArray(t)).unit().toArray()})}return this.compile(),this},computeNormals:function(){this.normals||this.addVertexBuffer("normals","gl_Normal");for(var n=0;n<this.vertices.length;n++)this.normals[n]=new _;for(var n=0;n<this.triangles.length;n++){var a=this.triangles[n],t=_.fromArray(this.vertices[a[0]]),r=_.fromArray(this.vertices[a[1]]),c=_.fromArray(this.vertices[a[2]]),h=r.subtract(t).cross(c.subtract(t)).unit();this.normals[a[0]]=this.normals[a[0]].add(h),this.normals[a[1]]=this.normals[a[1]].add(h),this.normals[a[2]]=this.normals[a[2]].add(h)}for(var n=0;n<this.vertices.length;n++)this.normals[n]=this.normals[n].unit().toArray();return this.compile(),this},computeWireframe:function(){for(var n=new P,a=0;a<this.triangles.length;a++)for(var t=this.triangles[a],r=0;r<t.length;r++){var c=t[r],h=t[(r+1)%t.length];n.add([Math.min(c,h),Math.max(c,h)])}return this.lines||this.addIndexBuffer("lines"),this.lines=n.unique,this.compile(),this},getAABB:function(){var n={min:new _(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};n.max=n.min.negative();for(var a=0;a<this.vertices.length;a++){var t=_.fromArray(this.vertices[a]);n.min=_.min(n.min,t),n.max=_.max(n.max,t)}return n},getBoundingSphere:function(){for(var n=this.getAABB(),a={center:n.min.add(n.max).divide(2),radius:0},t=0;t<this.vertices.length;t++)a.radius=Math.max(a.radius,_.fromArray(this.vertices[t]).subtract(a.center).length());return a}},x.plane=function(n){n=n||{};for(var a=new x(n),t=n.detailX||n.detail||1,r=n.detailY||n.detail||1,c=n.width||2,h=n.height||2,m=0;m<=r;m++)for(var f=m/r,b=0;b<=t;b++){var y=b/t;if(a.vertices.push([(y-.5)*c,(f-.5)*h,0]),a.coords&&a.coords.push([y,f]),a.normals&&a.normals.push([0,0,1]),b<t&&m<r){var v=b+m*(t+1);a.triangles.push([v,v+1,v+t+1]),a.triangles.push([v+t+1,v+1,v+t+2])}}return a.compile(),a};var R=[[0,4,2,6,-1,0,0],[1,3,5,7,1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,1]];function z(n){return new _((n&1)*2-1,(n&2)-1,(n&4)/2-1)}x.cube=function(n){for(var a=new x(n),t=n&&n.width||2,r=n&&n.height||2,c=n&&n.depth||2,h=0;h<R.length;h++){for(var m=R[h],f=h*4,b=0;b<4;b++){var y=m[b];const v=z(y).toArray();v[0]*=t/2,v[1]*=r/2,v[2]*=c/2,a.vertices.push(v),a.coords&&a.coords.push([b&1,(b&2)/2]),a.normals&&a.normals.push(m.slice(4,7))}a.triangles.push([f,f+1,f+2]),a.triangles.push([f+2,f+1,f+3])}return a.compile(),a},x.sphere=function(n){function a(W,J,re){return b?[W,re,J]:[W,J,re]}function t(W){return W+(W-W*W)/2}n=n||{};for(var r=new x(n),c=new P,h=n.detail||6,m=0;m<8;m++)for(var f=z(m),b=f.x*f.y*f.z>0,y=[],v=0;v<=h;v++){for(var E=0;v+E<=h;E++){var M=v/h,F=E/h,L=(h-v-E)/h,X={vertex:new _(t(M),t(F),t(L)).unit().multiply(f).toArray()};r.coords&&(X.coord=f.y>0?[1-M,L]:[L,1-M]),y.push(c.add(X))}if(v>0)for(var E=0;v+E<=h;E++){var M=(v-1)*(h+1)+(v-1-(v-1)*(v-1))/2+E,F=v*(h+1)+(v-v*v)/2+E;r.triangles.push(a(y[M],y[M+1],y[F])),v+E<h&&r.triangles.push(a(y[F],y[M+1],y[F+1]))}}return r.vertices=c.unique.map(function(W){return W.vertex}),r.coords&&(r.coords=c.unique.map(function(W){return W.coord})),r.normals&&(r.normals=r.vertices),r.compile(),r},x.load=function(n,a){a=a||{},"coords"in a||(a.coords=!!n.coords),"normals"in a||(a.normals=!!n.normals),"colors"in a||(a.colors=!!n.colors),"triangles"in a||(a.triangles=!!n.triangles),"lines"in a||(a.lines=!!n.lines);var t=new x(a);return t.vertices=n.vertices,t.coords&&(t.coords=n.coords),t.normals&&(t.normals=n.normals),t.colors&&(t.colors=n.colors),t.triangles&&(t.triangles=n.triangles),t.lines&&(t.lines=n.lines),t.compile(),t};function V(n,a,t){this.t=arguments.length?n:Number.MAX_VALUE,this.hit=a,this.normal=t}V.prototype={mergeWith:function(n){n.t>0&&n.t<this.t&&(this.t=n.t,this.hit=n.hit,this.normal=n.normal)}};function O(){var n=o.getParameter(o.VIEWPORT),a=o.modelviewMatrix.m,t=new _(a[0],a[4],a[8]),r=new _(a[1],a[5],a[9]),c=new _(a[2],a[6],a[10]),h=new _(a[3],a[7],a[11]);this.eye=new _(-h.dot(t),-h.dot(r),-h.dot(c));var m=n[0],f=m+n[2],b=n[1],y=b+n[3];this.ray00=o.unProject(m,b,1).subtract(this.eye),this.ray10=o.unProject(f,b,1).subtract(this.eye),this.ray01=o.unProject(m,y,1).subtract(this.eye),this.ray11=o.unProject(f,y,1).subtract(this.eye),this.viewport=n}O.prototype={getRayForPixel:function(n,a){n=(n-this.viewport[0])/this.viewport[2],a=1-(a-this.viewport[1])/this.viewport[3];var t=_.lerp(this.ray00,this.ray10,n),r=_.lerp(this.ray01,this.ray11,n);return _.lerp(t,r,a).unit()}},O.hitTestBox=function(n,a,t,r){var c=t.subtract(n).divide(a),h=r.subtract(n).divide(a),m=_.min(c,h),f=_.max(c,h),b=m.max(),y=f.min();if(b>0&&b<y){var v=1e-6,E=n.add(a.multiply(b));return t=t.add(v),r=r.subtract(v),new V(b,E,new _((E.x>r.x)-(E.x<t.x),(E.y>r.y)-(E.y<t.y),(E.z>r.z)-(E.z<t.z)))}return null},O.hitTestSphere=function(n,a,t,r){var c=n.subtract(t),h=a.dot(a),m=2*a.dot(c),f=c.dot(c)-r*r,b=m*m-4*h*f;if(b>0){var y=(-m-Math.sqrt(b))/(2*h),v=n.add(a.multiply(y));return new V(y,v,v.subtract(t).divide(r))}return null},O.hitTestTriangle=function(n,a,t,r,c){var h=r.subtract(t),m=c.subtract(t),f=h.cross(m).unit(),b=f.dot(t.subtract(n))/f.dot(a);if(b>0){var y=n.add(a.multiply(b)),v=y.subtract(t),E=m.dot(m),M=m.dot(h),F=m.dot(v),L=h.dot(h),X=h.dot(v),W=E*L-M*M,J=(L*F-M*X)/W,re=(E*X-M*F)/W;if(J>=0&&re>=0&&J+re<=1)return new V(b,y,f)}return null};function U(n,a,t){let r;for(;(r=n.exec(a))!=null;)t(r)}var k="LIGHTGL";function B(n,a){function t(E){var M=document.getElementById(E);return M?M.text:E}n=t(n),a=t(a);var r="    uniform mat3 gl_NormalMatrix;    uniform mat4 gl_ModelViewMatrix;    uniform mat4 gl_ProjectionMatrix;    uniform mat4 gl_ModelViewProjectionMatrix;    uniform mat4 gl_ModelViewMatrixInverse;    uniform mat4 gl_ProjectionMatrixInverse;    uniform mat4 gl_ModelViewProjectionMatrixInverse;  ",c=`#version 300 es
    `+r+"    in vec4 gl_Vertex;    in vec4 gl_TexCoord;    in vec3 gl_Normal;    in vec4 gl_Color;    vec4 ftransform() {      return gl_ModelViewProjectionMatrix * gl_Vertex;    }  ",h=`#version 300 es
    precision highp float;
  `+r,m=n+a,f={};U(/\b(gl_[^;]*)\b;/g,r,function(E){var M=E[1];if(m.indexOf(M)!=-1){var F=M.replace(/[a-z_]/g,"");f[F]=k+M}}),m.indexOf("ftransform")!=-1&&(f.MVPM=k+"gl_ModelViewProjectionMatrix"),this.usedMatrices=f;function b(E,M){var F={},L=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(M);return M=L?L[1]+E+M.substr(L[1].length):E+M,U(/\bgl_\w+\b/g,E,function(X){X in F||(M=M.replace(new RegExp("\\b"+X+"\\b","g"),k+X),F[X]=!0)}),M}n=b(c,n),a=b(h,a);function y(E,M){var F=o.createShader(E);if(o.shaderSource(F,M),o.compileShader(F),!o.getShaderParameter(F,o.COMPILE_STATUS))throw new Error("compile error: "+o.getShaderInfoLog(F));return F}if(this.program=o.createProgram(),o.attachShader(this.program,y(o.VERTEX_SHADER,n)),o.attachShader(this.program,y(o.FRAGMENT_SHADER,a)),o.linkProgram(this.program),!o.getProgramParameter(this.program,o.LINK_STATUS))throw new Error("link error: "+o.getProgramInfoLog(this.program));this.attributes={},this.uniformLocations={};var v={};U(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,n+a,function(E){v[E[2]]=1}),this.isSampler=v}function q(n){var a=Object.prototype.toString.call(n);return a=="[object Array]"||a=="[object Float32Array]"}function te(n){var a=Object.prototype.toString.call(n);return a=="[object Number]"||a=="[object Boolean]"}new w,new w,B.prototype={uniforms:function(n){o.useProgram(this.program);for(var a in n){var t=this.uniformLocations[a]||o.getUniformLocation(this.program,a);if(t){this.uniformLocations[a]=t;var r=n[a];if(r instanceof _?r=[r.x,r.y,r.z]:r instanceof w&&(r=r.m),q(r))switch(r.length){case 1:o.uniform1fv(t,new Float32Array(r));break;case 2:o.uniform2fv(t,new Float32Array(r));break;case 3:o.uniform3fv(t,new Float32Array(r));break;case 4:o.uniform4fv(t,new Float32Array(r));break;case 9:o.uniformMatrix3fv(t,!1,new Float32Array([r[0],r[3],r[6],r[1],r[4],r[7],r[2],r[5],r[8]]));break;case 16:o.uniformMatrix4fv(t,!1,new Float32Array([r[0],r[4],r[8],r[12],r[1],r[5],r[9],r[13],r[2],r[6],r[10],r[14],r[3],r[7],r[11],r[15]]));break;default:throw new Error(`don't know how to load uniform "`+a+'" of length '+r.length)}else if(te(r))(this.isSampler[a]?o.uniform1i:o.uniform1f).call(o,t,r);else throw new Error('attempted to set uniform "'+a+'" to invalid value '+r)}}return this},draw:function(n,a){this.drawBuffers(n.vertexBuffers,n.indexBuffers[a==o.LINES?"lines":"triangles"],arguments.length<2?o.TRIANGLES:a)},drawBuffers:function(n,a,t){var r=this.usedMatrices,c=o.modelviewMatrix,h=o.projectionMatrix,m=r.MVMI||r.NM?c.inverse():null,f=r.PMI?h.inverse():null,b=r.MVPM||r.MVPMI?h.multiply(c):null,y={};if(r.MVM&&(y[r.MVM]=c),r.MVMI&&(y[r.MVMI]=m),r.PM&&(y[r.PM]=h),r.PMI&&(y[r.PMI]=f),r.MVPM&&(y[r.MVPM]=b),r.MVPMI&&(y[r.MVPMI]=b.inverse()),r.NM){var v=m.m;y[r.NM]=[v[0],v[4],v[8],v[1],v[5],v[9],v[2],v[6],v[10]]}this.uniforms(y);var E=0;for(var M in n){var F=n[M],L=this.attributes[M]||o.getAttribLocation(this.program,M.replace(/^(gl_.*)$/,k+"$1"));L==-1||!F.buffer||(this.attributes[M]=L,o.bindBuffer(o.ARRAY_BUFFER,F.buffer),o.enableVertexAttribArray(L),o.vertexAttribPointer(L,F.buffer.spacing,o.FLOAT,!1,0,0),E=F.buffer.length/F.buffer.spacing)}for(var M in this.attributes)M in n||o.disableVertexAttribArray(this.attributes[M]);return E&&(!a||a.buffer)&&(a?(o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,a.buffer),o.drawElements(t,a.buffer.length,o.UNSIGNED_SHORT,0)):o.drawArrays(t,0,E)),this}};function N(n,a,t){t=t||{},this.width=n,this.height=a,this.id=o.createTexture();let r=t.type||o.UNSIGNED_BYTE,c=t.format||o.RGBA,h=o.RGBA;const m=o.getExtension("EXT_color_buffer_float"),f=o.getExtension("EXT_color_buffer_half_float");r===o.FLOAT?(m?o instanceof WebGL2RenderingContext&&(c=o.RGBA32F):(console.warn("FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),r=o.UNSIGNED_BYTE,c=o.RGBA8),h=o.RGBA):r===o.HALF_FLOAT_OES?(f?o instanceof WebGL2RenderingContext&&(c=o.RGBA16F):(console.warn("HALF_FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),r=o.UNSIGNED_BYTE,c=o.RGBA8),h=o.RGBA):(r=o.UNSIGNED_BYTE,c=o.RGBA8,h=o.RGBA);const b=t.filter||t.magFilter||o.LINEAR,y=t.filter||t.minFilter||o.LINEAR;o.bindTexture(o.TEXTURE_2D,this.id),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,1),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,b),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,y),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,t.wrap||t.wrapS||o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,t.wrap||t.wrapT||o.CLAMP_TO_EDGE),o instanceof WebGL2RenderingContext?o.texImage2D(o.TEXTURE_2D,0,c,n,a,0,h,r,null):o.texImage2D(o.TEXTURE_2D,0,h,n,a,0,h,r,null),o.bindTexture(o.TEXTURE_2D,null),this.format=h,this.type=r,this.internalFormat=c}var H,Y,j;N.prototype={bind:function(n){o.activeTexture(o.TEXTURE0+(n||0)),o.bindTexture(o.TEXTURE_2D,this.id)},unbind:function(n){o.activeTexture(o.TEXTURE0+(n||0)),o.bindTexture(o.TEXTURE_2D,null)},canDrawTo:function(){H=H||o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,H),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.id,0);var n=o.checkFramebufferStatus(o.FRAMEBUFFER)==o.FRAMEBUFFER_COMPLETE;return o.bindFramebuffer(o.FRAMEBUFFER,null),n},drawTo:function(n){o.getExtension("EXT_color_buffer_float")||console.warn("EXT_color_buffer_float not available!");var t=o.getParameter(o.VIEWPORT);if(H=H||o.createFramebuffer(),Y=Y||o.createRenderbuffer(),o.bindFramebuffer(o.FRAMEBUFFER,H),o.bindRenderbuffer(o.RENDERBUFFER,Y),(this.width!=Y.width||this.height!=Y.height)&&(Y.width=this.width,Y.height=this.height,o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT16,this.width,this.height)),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.id,0),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,Y),o.checkFramebufferStatus(o.FRAMEBUFFER)!=o.FRAMEBUFFER_COMPLETE)throw new Error("Rendering to this texture is not supported (incomplete framebuffer)");o.viewport(0,0,this.width,this.height),n(),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindRenderbuffer(o.RENDERBUFFER,null),o.viewport(t[0],t[1],t[2],t[3])},swapWith:function(n){var a;a=n.id,n.id=this.id,this.id=a,a=n.width,n.width=this.width,this.width=a,a=n.height,n.height=this.height,this.height=a}},N.fromImage=function(n,a){a=a||{};var t=new N(n.width,n.height,a);o.bindTexture(o.TEXTURE_2D,t.id);try{o.texImage2D(o.TEXTURE_2D,0,t.format,t.format,t.type,n)}catch{throw location.protocol=="file:"?new Error('image not loaded for security reasons (serve this page over "http://" instead)'):new Error("image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)")}return a.minFilter&&a.minFilter!=o.NEAREST&&a.minFilter!=o.LINEAR&&o.generateMipmap(o.TEXTURE_2D),o.bindTexture(o.TEXTURE_2D,null),t},N.fromURL=function(n,a){j=j||function(){var h=document.createElement("canvas").getContext("2d");h.canvas.width=h.canvas.height=128;for(var m=0;m<h.canvas.height;m+=16)for(var f=0;f<h.canvas.width;f+=16)h.fillStyle=(f^m)&16?"#FFF":"#DDD",h.fillRect(f,m,16,16);return h.canvas}();var t=N.fromImage(j,a),r=new Image,c=o;return r.onload=function(){c.makeCurrent(),N.fromImage(r,a).swapWith(t)},r.src=n,t},N.canUseFloatingPointTextures=function(){return!!o.getExtension("OES_texture_float")},N.canUseFloatingPointLinearFiltering=function(){return!!o.getExtension("OES_texture_float_linear")},N.canUseHalfFloatingPointTextures=function(){return!!o.getExtension("OES_texture_half_float")},N.canUseHalfFloatingPointLinearFiltering=function(){return!!o.getExtension("OES_texture_half_float_linear")};function _(n,a,t){this.x=n||0,this.y=a||0,this.z=t||0}return _.prototype={negative:function(){return new _(-this.x,-this.y,-this.z)},add:function(n){return n instanceof _?new _(this.x+n.x,this.y+n.y,this.z+n.z):new _(this.x+n,this.y+n,this.z+n)},subtract:function(n){return n instanceof _?new _(this.x-n.x,this.y-n.y,this.z-n.z):new _(this.x-n,this.y-n,this.z-n)},multiply:function(n){return n instanceof _?new _(this.x*n.x,this.y*n.y,this.z*n.z):new _(this.x*n,this.y*n,this.z*n)},divide:function(n){return n instanceof _?new _(this.x/n.x,this.y/n.y,this.z/n.z):new _(this.x/n,this.y/n,this.z/n)},equals:function(n){return this.x==n.x&&this.y==n.y&&this.z==n.z},dot:function(n){return this.x*n.x+this.y*n.y+this.z*n.z},cross:function(n){return new _(this.y*n.z-this.z*n.y,this.z*n.x-this.x*n.z,this.x*n.y-this.y*n.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},angleTo:function(n){return Math.acos(this.dot(n)/(this.length()*n.length()))},toArray:function(n){return[this.x,this.y,this.z].slice(0,n||3)},clone:function(){return new _(this.x,this.y,this.z)},init:function(n,a,t){return this.x=n,this.y=a,this.z=t,this}},_.negative=function(n,a){return a.x=-n.x,a.y=-n.y,a.z=-n.z,a},_.add=function(n,a,t){return a instanceof _?(t.x=n.x+a.x,t.y=n.y+a.y,t.z=n.z+a.z):(t.x=n.x+a,t.y=n.y+a,t.z=n.z+a),t},_.subtract=function(n,a,t){return a instanceof _?(t.x=n.x-a.x,t.y=n.y-a.y,t.z=n.z-a.z):(t.x=n.x-a,t.y=n.y-a,t.z=n.z-a),t},_.multiply=function(n,a,t){return a instanceof _?(t.x=n.x*a.x,t.y=n.y*a.y,t.z=n.z*a.z):(t.x=n.x*a,t.y=n.y*a,t.z=n.z*a),t},_.divide=function(n,a,t){return a instanceof _?(t.x=n.x/a.x,t.y=n.y/a.y,t.z=n.z/a.z):(t.x=n.x/a,t.y=n.y/a,t.z=n.z/a),t},_.cross=function(n,a,t){return t.x=n.y*a.z-n.z*a.y,t.y=n.z*a.x-n.x*a.z,t.z=n.x*a.y-n.y*a.x,t},_.unit=function(n,a){var t=n.length();return a.x=n.x/t,a.y=n.y/t,a.z=n.z/t,a},_.fromAngles=function(n,a){return new _(Math.cos(n)*Math.cos(a),Math.sin(a),Math.sin(n)*Math.cos(a))},_.randomDirection=function(){return _.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))},_.min=function(n,a){return new _(Math.min(n.x,a.x),Math.min(n.y,a.y),Math.min(n.z,a.z))},_.max=function(n,a){return new _(Math.max(n.x,a.x),Math.max(n.y,a.y),Math.max(n.z,a.z))},_.lerp=function(n,a,t){return a.subtract(n).multiply(t).add(n)},_.fromArray=function(n){return new _(n[0],n[1],n[2])},_.angleBetween=function(n,a){return n.angleTo(a)},e}();class Re{constructor({tx:e=0,ty:s=0,zoom:l=4,ax:d=-25,ay:u=-200,az:p=0,fov:T=45}){this.tx=e,this.ty=s,this.zoom=l,this.ax=d,this.ay=u,this.az=p,this.fov=T}}const ke=.3,Be=.15,Ne=1,yt=10,et=Math.ceil(yt/4),tt=10,Ee=`
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

    void ripples(in vec2 coord, in vec2 eventPosition, in float eventTime, float intensity, out vec3 res) {
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
        
        float r_max_max = 0.5;
        
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
        }
    }

    void divingRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 divingInfo, out vec3 res) {
        float swimmer_x = swimmerPosition.x;
        float divingDistance = divingInfo.x;
        float divingTime = divingInfo.y;

        vec2 divingLocation = vec2(swimmer_x, divingDistance - poolSize.z / 2.);

        float divingDistRange = 2.;
        float divingDistMin = 2.;
        float intensity = (divingDistance - divingDistMin) / divingDistRange;
        
        ripples(coord, divingLocation, divingTime, intensity, res);
    }

    void breakoutRipples(in vec2 coord, in vec2 swimmerPosition, in vec2 breakoutInfo, out vec3 res) {
        float swimmer_x = swimmerPosition.x;
        float breakoutDistance = breakoutInfo.x;
        float breakoutTime = breakoutInfo.y;

        vec2 breakoutLocation = vec2(swimmer_x, breakoutDistance - poolSize.z / 2.);

        float breakoutDistRange = 8.;
        float breakoutDistMin = 5.;
        float intensity = (breakoutDistance - breakoutDistMin) / breakoutDistRange;
        
        ripples(coord, breakoutLocation, breakoutTime, intensity, res);
    }



    vec3 getDivingWaves(vec2 coord) {
        vec3 res = vec3(0., 0., -1.);
        
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
`,it=200,bt=`
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

`;var Se,rt;class Ce{constructor(e,s,l,d){ve(this,Se);if(this.gl=e,this.calibration=l,this.copyVideo=!1,this.show=!1,this.videoStartTime=d,e===null){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),this.shader=new g.Shader(`
    out highp vec2 vTextureCoord;
    out vec3 waterNormal;
    out vec3 sparkPlaneNormal;
    out vec3 sparkDirection;
    out vec2 posScreen;

    uniform float ratio_screen;
    uniform float dx_screen;

    void main(void) {
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
    uniform bool sparksEnabled;
    uniform vec3 poolSize;
    uniform bool thresholdBlending;
    uniform float blendingThreshold;
    uniform float opacity;
    uniform float distanceFixed;
    uniform bool hideObstructions;
    uniform float hideObstructionThreshold;

    `+bt+Ee+`

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
`),this.mesh=g.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.mesh.transform(g.Matrix.rotate(90,1,0,0)),this.mesh.transform(g.Matrix.translate(0,.1,0)),this.programInfo=null,this.texture=this.initTexture(),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),s!=""&&(this.video=this.setupVideo(s))}render(){const e=i.params.visualizations.sparks,s=i.params.simulation.poolSize;if(!i.params.video.show)return;this.copyVideo&&this.updateTexture(),(!this.mesh.vertexBuffers||!this.mesh.vertexBuffers.vertex)&&this.mesh.compile(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);const d=16*this.gl.canvas.height/9,u=(this.gl.canvas.width-d)/2;G.swimmersAttributesTexture&&G.swimmersAttributesTexture.bind(1),this.shader.uniforms({ratio_screen:d/this.gl.canvas.width,dx_screen:u/this.gl.canvas.width,uSampler:0,swimmersHelperFunctions:1,screen:4,iTime:i.getRaceTime(),poolSize:[s.x,s.y,s.z],iResolution:[this.gl.canvas.width,this.gl.canvas.height],sparksEnabled:e.enabled,sparksGlow:e.glow,sparksGlowOffset:e.glowOffset,sparksStroke:e.stroke,sparksNumber:e.num,sparksLengthFactor:e.lengthFactor,sparksSizeFactor:e.sizeFactor,fov:e.fov,thresholdBlending:i.params.video.thresholdBlending,blendingThreshold:i.params.video.blendingThreshold,opacity:i.params.video.opacity,distanceFixed:i.distanceFixed,hideObstructions:i.params.video.hideObstructions,hideObstructionThreshold:i.params.video.hideObstructionThreshold}).draw(this.mesh),this.gl.disable(this.gl.BLEND),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}setTime(e){this.copyVideo&&(this.video.currentTime=e)}initTexture(){const e=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,e);const s=0,l=this.gl.RGBA,d=1,u=1,p=0,T=this.gl.RGBA,A=this.gl.UNSIGNED_BYTE,D=new Uint8Array([0,0,255,255]);return this.gl.texImage2D(this.gl.TEXTURE_2D,s,l,d,u,p,T,A,D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),e}updateTexture(){const s=this.gl.RGBA,l=this.gl.RGBA,d=this.gl.UNSIGNED_BYTE;this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,s,l,d,this.video)}setupVideo(e){const s=document.createElement("video");let l=!1,d=!1;s.playsInline=!0,s.muted=!0,s.loop=!1,s.addEventListener("playing",()=>{l=!0,p()},!0),s.addEventListener("timeupdate",()=>{d=!0,p()},!0),s.src=e,s.play();const u=this,p=()=>{l&&d&&(u.copyVideo=!0,s.paused||K(this,Se,rt).call(this))};return s}}Se=new WeakSet,rt=function(){this.hasPausedFirstTime||(this.hasPausedFirstTime=!0,this.video.pause())};class ze{constructor(e,{poolSize:s=new GL.Vector(2,2),waterResolution:l=new GL.Vector(256,256),thresholdBlending:d=!1,numSwimmers:u=1,dataFolder:p=null}){this.title=e,this.videos=[],this.poolSize=s,this.waterResolution=l,this.numSwimmers=u,this.thresholdBlending=d,this.dataFolder=p}addVideo(e){this.videos.push(e)}async parseData(e){for(let s=0;s<e.length;s++)await e[s].parseData(this.dataFolder+s+".csv")}}const $e=new g.Vector(0,-4,0);class pe{constructor(e,s,l=new g.Vector(1,1,1),d=null){this.initCenter=new g.Vector(e.x,e.y,e.z),this.center=new g.Vector(e.x,e.y,e.z),this.oldCenter=new g.Vector(e.x,e.y,e.z),this.radius=s,this.cinematic=!1,this.velocity=new g.Vector(0,0,0),this.acceleration=new g.Vector(0,0,0),this.mass=4/3*Math.PI*Math.pow(s,3)*1e3,this.invMass=1/this.mass,this.radiusSquared=s*s,this.mesh=g.Mesh.sphere({detail:10}),this.followTarget=!1,this.showStreak=!1,this.buoyancyFactor=d,this.color=l}spawnSplashes(e){if(!i.params.simulation.splashes.enabled&&!i.params.visualizations.showStreaks)return;const s=this.center.subtract(this.oldCenter).multiply(1/e),l=s.z>0?-Math.PI/2:Math.PI/2,d=s.dot(s);let u=this.center.subtract(this.velocity.unit());i.isSceneSynchronizedSwimming()&&(u=this.center.clone()),u.y=.15,!i.isSceneSynchronizedSwimming()&&i.params.simulation.splashes.enabled&&this.center.x<100&&Math.abs(this.center.y)<=this.radius&&i.splashParticles.spawnSplash(u,l,Math.sqrt(d),i.params.simulation.splashes.strengthThreshold,{});let p=(this.velocity.length()-1.6)/.9;const T={fixed:!0};if(i.isSceneSynchronizedSwimming())T.shrinking=.02;else{const A=new g.Vector(p,0,1-p);A.multiply(1/A.max()),T.color=A}i.params.visualizations.showStreaks&&this.showStreak&&this.velocity.length()>.01&&i.splashParticles.spawnSplash(this.center,0,p,0,T)}update(e){if(this.moved||(this.oldCenter=new g.Vector(this.center.x,this.center.y,this.center.z)),this.moved=!1,this.cinematic){if(this.followTarget||(this.velocity=new g.Vector(0,0,0)),!this.targetPos||!this.followTarget)return;let s=e/this.targetTime;s=Math.min(Math.max(s,0),1),this.center=this.center.multiply(1-s).add(this.targetPos.multiply(s)),this.velocity=this.center.subtract(this.oldCenter).multiply(1/e),this.targetTime-=e,this.targetTime<0&&(this.targetPos=null)}else{const s=Math.max(0,Math.min(1,(this.radius-this.center.y)/(2*this.radius))),l=this.buoyancyFactor?this.buoyancyFactor:i.params.simulation.buoyancyFactor,d=$e.multiply(-l*this.mass*s),u=this.velocity.unit().multiply(-1e3*this.radiusSquared*s*this.velocity.dot(this.velocity));this.addForce(u),this.addForce(d),this.addForce($e.multiply(this.mass)),this.velocity=this.velocity.add(this.acceleration.multiply(e)),this.acceleration=new g.Vector(0,0,0),this.center=this.center.add(this.velocity.multiply(e)),this.center.y<this.radius-i.params.simulation.poolSize.y&&(this.center.y=this.radius-1,this.velocity.y=Math.abs(this.velocity.y)*.7)}}setTarget(e,s){this.targetPos=e,this.targetTime=s}addForce(e){this.cinematic?console.warn("Trying to add force to a cinematic sphere."):this.acceleration=this.acceleration.add(e.multiply(this.invMass))}move(e){this.moved=!0,this.oldCenter=new g.Vector(this.center.x,this.center.y,this.center.z),this.center=new g.Vector(e.x,e.y,e.z),this.cinematic||console.warn("Moving a non cinematic sphere.")}}class _t{constructor(){this.mesh=new g.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.waterTexture=null,this.shader=new g.Shader(`
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
        `)}updateFoam(e){if(!this.waterTexture){console.log("NO WATER TO UPDATE FOAM");return}this.foamTexNext.swapWith(this.foamTexPrev),this.foamTexNext.drawTo(()=>{this.foamTexPrev.bind(0),i.water.textureA.bind(1),this.shader.uniforms({foamTexPrev:0,water:1,dt:e,seed:i.time,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],timeVariation:i.params.simulation.foam.timeVariation,spaceVariation:i.params.simulation.foam.spaceVariation,velThreshold:i.params.simulation.foam.velThreshold,velMax:i.params.simulation.foam.velMax,dispersion:i.params.simulation.foam.dispersion,attenuation:i.params.simulation.foam.attenuation}).draw(this.mesh)})}resetTextures(e,s,l){this.foamTexPrev=new g.Texture(e,s,{type:i.gl.FLOAT,filter:i.gl.LINEAR}),this.foamTexNext=new g.Texture(e,s,{type:i.gl.FLOAT,filter:i.gl.LINEAR}),this.waterTexture=l}}function ne(o,e=null){this.gl=o,this.visualizationWavesEnabled=!0,this.sqrt_2_PI=Math.sqrt(2*Math.PI),this.foam=new _t;var s=`
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `;this.reset(e),g.Texture.canUseFloatingPointTextures(),this.dropShader=new g.Shader(s,`
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
  `),this.updateShader=new g.Shader(s,`
    uniform sampler2D tex;
    uniform vec2 delta;
    uniform float prev_wr;
    uniform float damping;
    uniform float sqrt_2_PI;
    uniform vec3 poolSize;
    `+Ee+`
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
  `),this.normalShader=new g.Shader(s,`
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
  `),this.sphereShader=new g.Shader(`
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
  `),this.visualizationWavesShader=new g.Shader(s,`
    uniform sampler2D tex;
    uniform bool add;
    uniform vec3 poolSize;
    uniform bool showWR;
    uniform bool showDivingDistance;
    in vec2 coord;
    out vec4 fragColor;
    uniform float t;

    `+Ee+`

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
    `)}ne.prototype.resetTextures=function(){const o=this.gl;this.textureA&&o.deleteTexture(this.textureA.id),this.textureB&&o.deleteTexture(this.textureB.id),this.textureA=new g.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new g.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.foam.resetTextures(this.W,this.H,this.textureA),this.areaConservationTexture=new g.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.showAreaConservedGrid=!1,this.showProjectionGrid=!1,this.invPoolSize=new g.Vector(1/i.params.simulation.poolSize.x,1/i.params.simulation.poolSize.y,1/i.params.simulation.poolSize.z);var e=g.Texture.canUseFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST;(!this.textureA.canDrawTo()||!this.textureB.canDrawTo())&&g.Texture.canUseHalfFloatingPointTextures()&&(console.log("No draw"),e=g.Texture.canUseHalfFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST,this.textureA=new g.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new g.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}))};ne.prototype.reset=function(o=null){this.WR_position=1e5,this.prev_WR_position=0,o!==null?(console.log("resolution.y : "+o.y),this.W=Math.round(o.x),this.H=Math.round(o.y),console.log("Using custom resolution:",this.W,this.H)):(this.W=256,this.H=256),G.reset(new g.Vector(this.W,this.H)),this.plane=g.Mesh.plane({detail:255,width:i.params.simulation.poolSize.x,height:i.params.simulation.poolSize.z}),this.delta=new g.Vector(1/this.W,1/this.H),this.resetTextures()};ne.prototype.addDrop=function(o,e,s,l){var d=this;this.textureB.drawTo(function(){d.textureA.bind(),d.dropShader.uniforms({invPoolSizeVertex:[d.invPoolSize.x,d.invPoolSize.z],center:[o,e],radius:s,strength:l,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z]}).draw(d.plane)}),this.textureB.swapWith(this.textureA)};ne.prototype.addOrRemoveVisualizationWaves=function(o){if(this.prev_WR_position=this.WR_position,this.WR_position=i.getRaceTime()*2.155,this.WR_position>i.params.simulation.poolSize.z&&(this.WR_position=2*i.params.simulation.poolSize.z-this.WR_position),!(!this.visualizationWavesEnabled||!G.raceHasStarted)){var s=this;this.textureB.drawTo(function(){s.textureA.bind();const l=G.getAttributesTexture();l&&l.bind(1),s.visualizationWavesShader.uniforms({swimmersAttributesTexture:1,showDivingDistance:i.params.visualizations.showDivingDistance,showWR:i.params.visualizations.showWR,invPoolSizeVertex:[s.invPoolSize.x,s.invPoolSize.z],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],wr:s.WR_position,sqrt_2_PI:s.sqrt_2_PI,add:o,swimmersNumber:i.swimmers.length,time:i.getRaceTime(),t:i.time,amplitudeFactor:i.params.quiver.amplitudeFactor,frequencyFactor:i.params.quiver.frequencyFactor,amplitude:i.params.quiver.amplitude,omega0:i.params.quiver.omega,waveLength0:i.params.quiver.waveLength}).draw(s.plane)}),this.textureB.swapWith(this.textureA)}};ne.prototype.updateSpheres=function(o){if(i.params.simulation.optimized)G.attributes.draw(),this.textureB.drawTo(()=>{this.textureA.bind(),G.bindDisplacementTexture(1),G.bindOldDisplacementTexture(2),this.sphereShader.uniforms({oldDisplacementTexture:2,displacementTexture:1,invPoolSizeVertex:[this.invPoolSize.x,this.invPoolSize.z],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],optimized:!0}).draw(this.plane),this.textureB.swapWith(this.textureA),G.attributes.draw()});else{const e=[];i.swimmers.forEach(s=>s.spheres.forEach(l=>e.push(l)));for(let s=0;s<e.length;s++){const l=e[s];this.moveSphere(l.oldCenter,l.center,l.radius)}}};ne.prototype.moveSphere=function(o,e,s){var l=this;this.textureB.drawTo(function(){l.textureA.bind(),l.sphereShader.uniforms({invPoolSizeVertex:[l.invPoolSize.x,l.invPoolSize.z],oldCenter:o,newCenter:e,radius:s,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],optimized:!1}).draw(l.plane)}),this.textureB.swapWith(this.textureA)};ne.prototype.stepSimulation=function(o){var e=this;this.textureB.drawTo(function(){e.textureA.bind();const s=G.getAttributesTexture();s&&s.bind(2),e.updateShader.uniforms({swimmersAttributesTexture:2,swimmersNumber:i.swimmers.length,invPoolSizeVertex:[e.invPoolSize.x,e.invPoolSize.z],delta:[e.delta.x,e.delta.y],time:i.time,wr:e.WR_position,prev_wr:e.prev_WR_position,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],sqrt_2_PI:e.sqrt_2_PI,damping:i.params.simulation.waterDamping}).draw(e.plane)}),this.textureB.swapWith(this.textureA),i.params.simulation.foam.enabled&&this.foam.updateFoam(o),this.updateAreaConservation()};ne.prototype.updateNormals=function(){var o=this;this.textureB.drawTo(function(){o.textureA.bind(),o.normalShader.uniforms({invPoolSizeVertex:[o.invPoolSize.x,o.invPoolSize.z],delta:[o.delta.x,o.delta.y]}).draw(o.plane)}),this.textureB.swapWith(this.textureA)};ne.prototype.updateAreaConservation=function(){if(!i.params.visualizations.areaConservationEnabled)return;var o,e,s;if(this.textureA.type===this.gl.FLOAT)o=this.gl.FLOAT,e=Float32Array,s="EXT_color_buffer_float";else if(this.textureA.type===this.gl.HALF_FLOAT_OES)o=this.gl.HALF_FLOAT_OES,e=Uint16Array,s="EXT_color_buffer_half_float";else{console.warn("Unsupported texture type for reading");return}if(!this.gl.getExtension(s)){console.warn(s+" not available; cannot read pixels");return}this.fb||(this.fb=this.gl.createFramebuffer()),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.textureA.id,0);const l=this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);if(l!==this.gl.FRAMEBUFFER_COMPLETE){console.error("Framebuffer incomplete: "+l+" for texture type "+this.textureA.type),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);return}this.gl.pixelStorei(this.gl.PACK_ALIGNMENT,1);const d=new e(this.W*this.H*4),u=new Float32Array(this.W*this.H*4);this.gl.readPixels(0,0,this.W,this.H,this.gl.RGBA,o,d);for(let S=0;S<this.W;S++)u[S*4+1]=1;const p=i.params.simulation.poolSize.x/this.W,T=i.params.simulation.poolSize.z/this.H,A=p*p,D=T*T;if(this.textureA.type===this.gl.FLOAT){for(let S=0;S<this.H;S+=1)for(let w=0;w<this.W;w+=1){const P=(S*this.W+w)*4,I=((this.H-1-S)*this.W+w)*4,x=u[I],R=u[I+1];if(w+1<this.W){const z=d[P]-d[P+4],V=Math.sqrt(z*z+A);u[I+4]=x+V}if(S+1<this.H){const z=d[P]-d[P+this.W*4],V=Math.sqrt(z*z+D);u[I-4*this.W+1]=R+V}}this.gl.bindTexture(this.gl.TEXTURE_2D,this.areaConservationTexture.id),this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.W,this.H,this.gl.RGBA,this.gl.FLOAT,u)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.bindTexture(this.gl.TEXTURE_2D,null)};const Et=`#version 300 es
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

`,Tt=`#version 300 es
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
        else alpha *= pow(vLife, 10.);

        if (altitude < 0. && vFixed >.1) alpha /= (1.-altitude)*2.;

        if (altitude < 0. && vFixed < .1) alpha /= (1.-altitude)*4.;

        if (vLife > 1.) alpha = 0.;
        fragColor = vec4(col, alpha);
    }

`,St=-9.8,Ye=.01;class qe{constructor(e,s,l,d,{shrinking:u=1,size:p=null}){this.pos=e,this.vel=s,this.fixed=l,this.color=d,this.life=1,this.size=p||Math.random()*.05+.02,this.shrinking=u}update(e){if(this.fixed){this.life-=e*.15*this.shrinking;return}this.life-=e*1.5*this.shrinking,this.vel.y+=St*e,this.pos=this.pos.add(this.vel.multiply(e)),this.vel=this.vel.multiply(1-Ye),this.size*=1-Ye*this.shrinking}}class At{constructor(e){this.gl=e,this.particles=[],this.particleBuffer=this.gl.createBuffer(),this.initPrograms()}spawnSplash(e,s,l,d,{fixed:u=!1,color:p=new g.Vector(1,1,1),speed0:T=1,maxParticles:A=10,shrinking:D=null,size:S=null}){let w=D!==null?D:1;if(u){const I=new g.Vector(0,0,0),x=p||new g.Vector(l,0,1-l);p===null&&x.multiply(1/x.max());const R=S||.1,z=new qe(e,I,u,x,{shrinking:w,size:R});z.life+=w*.1,this.particles.push(z);return}const P=Math.min(A,l*20);for(let I=0;I<P;I++){const x=(Math.random()-.5)*Math.PI,R=Math.random()*2*Math.PI,z=T*(.5+Math.random()),V=new g.Vector(Math.sin(x)*Math.cos(R)*z,Math.cos(x)*z,Math.sin(x)*Math.sin(R)*z);this.particles.push(new qe(e,V,u,p,{shrinking:w}))}}update(e){this.particles.forEach((s,l)=>{s.update(e),s.life<=0&&this.particles.splice(l,1)})}buildShader(e,s){const l=this.gl.createShader(s);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const s=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(s,l)}),this.gl.linkProgram(s),s}checkShaders(e,s,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(s)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}buildProgram(e,s){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(s,this.gl.FRAGMENT_SHADER),u=this.createProgram([l,d]);return this.checkShaders(l,d,u),u}initPrograms(){this.program=this.buildProgram(Et,Tt)}draw({showStreaks:e=!0,showSplashes:s=!0}){const l=this.gl;l.enable(l.BLEND),l.blendFunc(l.SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA);const d=[];this.particles.forEach(B=>{const q=B.pos;d.push(q.x,q.y,q.z,B.life,B.size,B.color.x,B.color.y,B.color.z,B.fixed)}),l.bindBuffer(l.ARRAY_BUFFER,this.particleBuffer),l.bufferData(l.ARRAY_BUFFER,new Float32Array(d),l.DYNAMIC_DRAW),l.useProgram(this.program);const u=l.getUniformLocation(this.program,"MVM"),p=new Float32Array(l.modelviewMatrix.m);l.uniformMatrix4fv(u,!0,p);const T=l.getUniformLocation(this.program,"projection"),A=new Float32Array(l.projectionMatrix.m);l.uniformMatrix4fv(T,!0,A);const D=l.getUniformLocation(this.program,"showStreaks");l.uniform1i(D,e);const S=l.getUniformLocation(this.program,"showSplashes");l.uniform1i(S,s);const w=l.getAttribLocation(this.program,"pos"),P=l.getAttribLocation(this.program,"life"),I=l.getAttribLocation(this.program,"size"),x=l.getAttribLocation(this.program,"color"),R=l.getAttribLocation(this.program,"isFixed"),z=l.FLOAT,V=!1,O=4,U=9*O;let k=0;l.bindBuffer(l.ARRAY_BUFFER,this.particleBuffer),l.vertexAttribPointer(w,3,z,V,U,k),l.enableVertexAttribArray(w),k=3*O,l.vertexAttribPointer(P,1,z,V,U,k),l.enableVertexAttribArray(P),k=4*O,l.vertexAttribPointer(I,1,z,V,U,k),l.enableVertexAttribArray(I),k=5*O,l.vertexAttribPointer(x,3,z,V,U,k),l.enableVertexAttribArray(x),k=8*O,l.vertexAttribPointer(R,1,z,V,U,k),l.enableVertexAttribArray(R),l.drawArrays(l.POINTS,0,this.particles.length),l.disable(l.BLEND)}}function je(o){const e={};for(let s=0;s<o.length;s++)e[o[s]]=s;return e}const oe=new g.Vector(1e3,0,-1e3),Ke=["none","only medals","all"],Ze=["neighbours","per swimmer"],Rt=["none","cycle frequency","speed","acceleration"],Ct={none:{value:0,name:"PARAMETER_NONE"},"cycle frequency":{value:1,name:"PARAMETER_CYCLES"},speed:{value:2,name:"PARAMETER_SPEED"},acceleration:{value:3,name:"PARAMETER_ACCELERATION"}},zt=["realistic","height field","lambert","toon"],Ft={realistic:{value:0,name:"RENDERING_REALISTIC"},"height field":{value:1,name:"RENDERING_HEIGHT_FIELD"},lambert:{value:2,name:"RENDERING_LAMBERT"},toon:{value:3,name:"RENDERING_TOON"}};var Q,ot,st,nt,Ve,at;class Pt{constructor(){ve(this,Q);this.params={numSteps:2,fov:45,visualizations:{enabled:!0,showFlags:!1,showWR:!1,showSpeed:!1,showDivingDistance:!1,showFinishTimes:!1,showStreaks:!1,customWaterPerturbation:"none",waterColorParameter:"none",customParametersList:Rt,customParametersDict:Ct,PARAMETER_NONE:"none",PARAMETER_CYCLES:"cycle frequency",PARAMETER_SPEED:"speed",PARAMETER_ACCELERATION:"acceleration",showSwimmersLines:"none",swimmersLinesList:Ke,showSwimmersLinesDict:je(Ke),swimmersLinesMode:"neighbours",swimmersLinesModeList:Ze,swimmersLinesModeDict:je(Ze),medalsModeBeforeFinish:"none",medalsModesDict:{none:0,stars:1,bright:2,lanes:3},medalsModeAfterFinish:"none",areaConservationEnabled:!0,rendering:"realistic",renderingList:zt,renderingDict:Ft,transitionBeginTime:null,shadow:{enabled:!0,shadowRadius:.5,shadowPower:.5,showCircle:!0,circleRadius:.6,circleStroke:.15},sparks:{enabled:!1,glow:5,glowOffset:.5,lengthFactor:1,stroke:.01,num:40,sizeFactor:50,fov:Math.PI/4}},swimmers:{showSpheres:!0,useTracking:!1},video:{thresholdBlending:!1,blendingThreshold:.41,show:!1,opacity:1,hideObstructions:!1,hideObstructionThreshold:.2},simulation:{showFloaters:!1,optimized:!1,waterDamping:.02,poolSize:new g.Vector(4,1,4),buoyancyFactor:1.1,foam:{enabled:!0,velThreshold:.35,velMax:3.5,dispersion:.015,timeVariation:2.5,spaceVariation:8,attenuation:.015},splashes:{enabled:!0,strengthThreshold:2}},quiver:{amplitudeFactor:.78,frequencyFactor:1.2,amplitude:.1,omega:2,waveLength:1},cornerView:{show:!0},chronoPhotography:{available:!1}},this.resolution=new g.Vector(256,256),this.gl=g.create({preserveDrawingBuffer:!0}),this.gl.canvas.tabIndex=0,this.originalVisParams=JSON.parse(JSON.stringify(this.params.visualizations)),delete this.originalVisParams.shadow,delete this.originalVisParams.sparks,this.useConfigFile=!1,this.time=0,this.swimmers=[],this.translateX=0,this.translateY=0,this.zoomDistance=4,this.angleX=-25,this.angleY=-200.5,this.angleZ=0,this.water=null;const e=new ze("—",{poolSize:new g.Vector(2,1,2),waterResolution:new g.Vector(256,256),numSwimmers:1}),s=new Re({});e.addVideo(new Ce(this.gl,"",s));const l=new ze("100m freestyle",{poolSize:new g.Vector(25,2,50),waterResolution:new g.Vector(1024,2048),numSwimmers:10,thresholdBlending:!0,dataFolder:"./assets/race-data/"}),d=new Re({tx:-.53,ty:1.25,zoom:47.86,ax:-29,ay:-260.5,az:-5,fov:39.98});l.addVideo(new Ce(this.gl,"swimming-race.mp4",d,16.5)),this.currentVideo=l.videos[0];const u=new ze("synchronized swimming",{poolSize:new g.Vector(25,2,30),waterResolution:new g.Vector(1024,2048),numSwimmers:2,dataFolder:"./assets/synchronized-swimming-data/"}),p=new Re({tx:-1.32,ty:.4,zoom:32.41,ax:-18,ay:-291.5,az:1,fov:42.8});u.addVideo(new Ce(this.gl,"synchronized-swimming.mp4",p,0)),this.scenesList=[e,l,u],this.scenes={},this.scenesList.forEach(T=>this.scenes[T.title]=T),this.currentScene=e,this.paused=!1,this.configPlayButton(),this.transitions={},this.playingDemo=!1,this.renderWater=!0,this.renderCube=!0,this.spheresRadiusCoeff=1,this.distanceFixed=0,this.chronoFrameBuffer=this.gl.createFramebuffer(),this.drawingFrameBuffer=null,this.drawingTexture=this.gl.createTexture(),this.resetDrawingTexture(),this.cornerView=!1,this.splashParticles=new At(this.gl),this.floaters=[],this.showTimeline=!0}hideEditorPanel(e){const s=document.getElementById("event-editor");s&&(s.style.display=e?"block":"none")}resetDrawingTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.chronoFrameBuffer),this.gl.bindTexture(this.gl.TEXTURE_2D,this.drawingTexture);const e=this.gl.canvas.width,s=this.gl.canvas.height;this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,e,s,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.drawingTexture,0);const l=this.gl.createRenderbuffer();this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,l),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,s),this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}configStopButton(){this.stopButton=document.getElementById("stop-button"),this.stopButton.addEventListener("click",()=>{this.stopRace()})}configPlayButton(){this.configStopButton(),this.playButton=document.getElementById("play-button"),this.playButton.addEventListener("click",()=>{this.playButton.textContent=="pause"?this.pause():(G.raceHasStarted||this.startRace(),this.play())})}setCalibration(e){this.translateX=e.tx,this.translateY=e.ty,this.zoomDistance=e.zoom,this.angleX=e.ax,this.angleY=e.ay,this.angleZ=e.az,this.params.fov=e.fov,this.gl.matrixMode(this.gl.PROJECTION),this.gl.loadIdentity(),this.gl.perspective(this.params.fov,this.gl.canvas.width/this.gl.canvas.height,.01,100),this.gl.matrixMode(this.gl.MODELVIEW)}updateFloaters(e){}isSceneSynchronizedSwimming(){return this.currentScene.title=="synchronized swimming"}async setScene(e){if(console.log("SET SCENE : "+e),this.currentScene=this.scenes[e],this.currentScene){K(this,Q,ot).call(this,this.currentScene.poolSize),this.currentScene.title=="100m freestyle"?K(this,Q,st).call(this):this.floaters=[];const s=document.getElementById("time-slider-container");this.currentVideo=this.currentScene.videos[0],this.params.video.show=!!this.currentVideo.video,this.params.swimmers.showSpheres=!this.currentVideo.video,s.hidden=!this.currentVideo.video,this.currentScene.title!="—"?this.params.simulation.waterDamping=.1:this.params.simulation.waterDamping=.02;const l=this.currentScene.numSwimmers;if(console.log("num swimmers : "+l),this.swimmers.length!=l){for(let d=this.swimmers.length;d<l;d++){const u=new G(new g.Vector(0,0,0));this.swimmers.push(u)}for(let d=this.swimmers.length;d>l;d--)this.swimmers=this.swimmers.slice(1);this.swimmers.forEach(d=>d.waterDamping=this.params.simulation.waterDamping)}this.params.swimmers.useTracking=!0,await this.currentScene.parseData(this.swimmers),this.swimmers.forEach(d=>d.update(0)),console.log("scene name : "+this.currentScene.title),this.setCalibration(this.currentVideo.calibration),this.resolution=this.currentScene.waterResolution,this.params.video.thresholdBlending=this.currentScene.thresholdBlending,this.currentScene.thresholdBlending?this.params.video.opacity=1:this.params.video.opacity=.5,this.params.visualizations.areaConservationEnabled=!1,this.stopRace(),this._reset(),this.params.simulation.optimized=!!this.currentVideo.video,this.useConfigFile=!this.isSceneSynchronizedSwimming(),this._setPannelMinimized(this.currentScene.title!="100m freestyle")}}useGravity(e){G.useGravity=e;for(let s of i.swimmers)s.body.cinematic=!G.useGravity}isOneVisualizationEnabled(){return this.params.visualizations.showFlags||this.params.visualizations.medalsModeBeforeFinish!="none"||this.params.visualizations.medalsModeAfterFinish!="none"||this.params.visualizations.showWR||this.params.visualizations.showSpeed||this.params.visualizations.showDivingDistance}updateTime(e){this.time+=e,this._updateDistanceMarker&&this._updateDistanceMarker()}getRaceTime(){return G.raceHasStarted?this.time-this.currentVideo.videoStartTime:0}resetParams(){Object.entries(this.originalVisParams).forEach(e=>{const s=e[0],l=e[1];this.params.visualizations[s]=l}),this.params.visualizations.areaConservationEnabled=!1}updateEventIndex(){for(this.currentEventIndex=0;this.events[this.currentEventIndex]&&this.events[this.currentEventIndex].time<this.getRaceTime();)this.currentEventIndex++;this.currentEventIndex>0&&this.currentEventIndex--}setRaceTime(e){this.time=this.currentVideo.videoStartTime+e,this.currentVideo.video&&this.currentVideo.setTime(this.time),this.events&&(this.updateEventIndex(),this.resetParams())}showTexts(e){document.getElementById("h").hidden=!e,e?this.showCommands&&(document.getElementById("commands").hidden=!1):(this.showCommands=!document.getElementById("commands").hidden,document.getElementById("commands").hidden=!0)}startRace(){console.log("START RACE"),this.currentVideo.videoStartTime>=3?this.setRaceTime(-3):this.setRaceTime(0),this.currentVideo.video&&this.currentVideo.video.play(),this.swimmers.forEach(e=>e.startRace()),G.raceHasStarted=!0,G.useGravity=!0,this.water.resetTextures(),this.water.WR_position=0,this.stopButton.hidden=!1,this._clearChronoTexture(this.gl.canvas.width,this.gl.canvas.height,this.gl),this.showTexts(!1),this.isSceneSynchronizedSwimming()&&(this.params.simulation.foam.velThreshold=0,this.params.simulation.foam.velMax=2.2,this.params.simulation.foam.dispersion=.0025,this.params.simulation.foam.timeVariation=.3,this.params.simulation.foam.spaceVariation=8,this.params.simulation.foam.attenuation=0),console.log("show streaks : "+this.params.visualizations.showStreaks)}stopRace(){this.paused&&this.play(),this.setRaceTime(0),this.currentVideo.video&&this.currentVideo.video.pause(),this.swimmers.forEach(e=>e.swim(!1)),G.raceHasStarted=!1,this.water.resetTextures(),this.playButton.textContent="play",this.stopButton.hidden=!0,this.showTexts(!0)}pause(){this.paused=!0,this.pauseVideo(),this.playButton.textContent="play"}play(){this.paused=!1,G.raceHasStarted&&(this.playVideo(),this.playButton.textContent="pause")}pauseVideo(){this.currentVideo.video&&this.currentVideo.video.pause()}playVideo(){this.currentVideo.video&&(this.currentVideo.video.play(),this.currentVideo.video.currentTime=this.time)}renderVideo(){this.currentVideo.video&&this.currentVideo.render()}parseConfigFile(e){fetch(e).then(s=>s.text()).then(s=>{this.events=JSON.parse(s),this.currentEventIndex=0,this._renderTimeline&&this._renderTimeline()})}updateTransitions(){Object.entries(this.transitions).forEach(e=>{const s=e[0],l=e[1],d=this.getRaceTime()-l.beginTime;if(d>l.duration){delete this.transitions[s];return}l.show?l.opacity=d/l.duration:l.opacity=1-d/l.duration})}updateParams(){if(!G.raceHasStarted||!this.events||!this.useConfigFile)return;const e=this.events[this.currentEventIndex];if(!e)return;let s=e.rankSwimmerToggle;if(s||(s=1),e.distance&&this.swimmers[s-1].getDistanceTraveled()>=e.distance||e.time!==void 0&&this.getRaceTime()>=e.time){this.currentEventIndex++;const l=e.transition&&e.transition.type=="dissolve";Object.entries(e.params).forEach(d=>{const u=d[0],p=d[1];u!=="transition"&&(l&&(p===!0||p===!1)&&(this.transitions[u]={opacity:1-1*p,show:p,beginTime:this.getRaceTime(),duration:e.transition.duration}),this.params.visualizations[u]=p)})}}chronoPhotography({circle:e=!1}){console.log("shoot"),this.distanceFixed=this.swimmers[0].getDistanceTraveled(),console.log("distance fixed : "+this.distanceFixed),this._fixTexture(e)}recalibrate(){this.currentVideo&&this.setCalibration(this.currentVideo.calibration)}async launchDemo(){console.log("Launch demo"),await this.setScene("100m freestyle"),this.params.video.show=!1,this.params.swimmers.showSpheres=!0,this.spheresRadiusCoeff=1,this.demoTime=0,this.swimmers.forEach(e=>e.body.move(oe)),this.swimmersShown=0,this.playingDemo=!0,this.useGravity(!0),this.params.simulation.buoyancyFactor=1.5,this.params.visualizations.shadow.enabled=!1,this.renderWater=!1,this.translateX=200,this._gui.hide(),document.getElementById("event-editor").hidden=!0,document.getElementById("time-slider-container").hidden=!0,document.getElementById("h").hidden=!0}stopDemo(){this.playingDemo=!1,this.setScene("—"),document.getElementById("event-editor").hidden=!1,document.getElementById("time-slider-container").hidden=!1,document.getElementById("h").hidden=!1,this.renderWater=!0,this.renderCube=!0,this.params.visualizations.shadow.enabled=!0,this._gui.show(),this.params.simulation.buoyancyFactor=1.1}updateDemo(e){if(!this.playingDemo)return;const s=this.demoTime;this.demoTime+=e;const l=2,d=1;if(s<=d){const x=K(this,Q,Ve).call(this,0,d,s);this.translateX=x*this.currentVideo.calibration.tx+(1-x)*200}else this.demoShowVideoTime||(this.angleY+=20*e);!this.renderCube&&s>.5&&(this.renderCube=!0);const u=1.5;if(!this.renderWater&&s>1.5&&(this.renderWater=!0),s>u&&s<u+.5)for(var p=0;p<10;p++)this.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,p&1?.6:-.6);K(this,Q,nt).call(this,s,l);const T=3,A=5;!G.raceHasStarted&&s>=T&&s<A&&(this.params.simulation.splashes.enabled=!1,this.swimmers.forEach(x=>{x.body.cinematic=!0;const R=new g.Vector(x.body.center.x,0,0),z=new g.Vector(x.body.center.x,1,-this.params.simulation.poolSize.z/2);x.body.move(K(this,Q,at).call(this,R,z,T,A,s))})),!G.raceHasStarted&&s>=A&&(this.params.simulation.buoyancyFactor=1.1,this.params.simulation.splashes.enabled=!0,this.params.visualizations.shadow.enabled=!0,this.startRace()),!this.demoShowVideoTime&&this.angleY>=this.currentVideo.calibration.ay+360&&(this.demoShowVideoTime=this.demoTime+1),!this.params.video.show&&this.demoShowVideoTime&&s>=this.demoShowVideoTime&&(this.params.video.show=!0,this.params.video.opacity=0);const D=2;this.params.video.show&&s<=this.demoShowVideoTime+D&&(this.params.video.opacity=(s-this.demoShowVideoTime)/D,console.log("opacity : "+this.params.video.opacity));const S=2;let w=null;this.demoShowVideoTime&&(w=this.demoShowVideoTime+D+S),this.params.video.show&&s>this.demoShowVideoTime+D&&s<w&&(this.spheresRadiusCoeff=1-(s-(this.demoShowVideoTime+D))/S);let P=null;w&&(P=w+.5);const I=2;P&&s>P&&s<P+I&&(this.params.video.hideObstructions=!0,this.params.video.hideObstructionThreshold=(s-P)/I*.5)}}Q=new WeakSet,ot=function(e){console.log("SET POOL SIZE : "+e.z),this.params.simulation.poolSize.x=e.x,this.params.simulation.poolSize.y=e.y,this.params.simulation.poolSize.z=e.z},st=function(){this.floaters=[];const e=.1,s=this.params.simulation.poolSize,l=s.x/10,d=s.z/(2*e),u=-s.z/2,p=-s.x/2,T=new g.Vector(0,1,0),A=new g.Vector(1,1,0),D=new g.Vector(0,.5,1),S=[T,D,D,A,A,A,D,D,T];for(let w=1;w<10;w++)for(let P=0;P<d;P++){const I=new g.Vector(p+w*l,0,u+e+P*2*e);let x=S[w-1];(Math.abs(I.z)>=20||Math.abs(I.z)<=.5||Math.abs(Math.abs(I.z)-10)<=.25)&&(x=new g.Vector(1,0,0)),this.floaters.push(new pe(I,e,x,2.5))}},nt=function(e,s){const d=Math.floor((e-s)/.1);if(this.swimmersShown<10&&d>=this.swimmersShown){console.log("swimmers shown : "+this.swimmersShown),console.log("next index swimmer : "+d),console.log("num swimmers : "+this.swimmers.length);const u=this.params.simulation.poolSize.x,T=-u/2+u/20+d*u/10;this.swimmers[d].body.move(new g.Vector(T,.5,0)),this.swimmersShown++}},Ve=function(e,s,l){if(l<e)return 0;if(l>s)return 1;const d=(l-e)/(s-e);return 1-(Math.cos(d*Math.PI)+1)/2},at=function(e,s,l,d,u){const p=K(this,Q,Ve).call(this,l,d,u);console.log("t norm : "+p);const T=(A,D,S,w=1)=>Math.pow(S,w)*D+(1-Math.pow(S,w))*A;return new g.Vector(T(e.x,s.x,p),T(e.y,s.y,p,20),T(e.z,s.z,p,2))};const i=new Pt;i.parseConfigFile("./assets/vis-config.json");const Mt=`#version 300 es
    const float ARM_DELTA_X = float(`+ke+`);
    const float FOOT_DELTA_X = float( `+Be+`);
    const float FOOT_DELTA_Z = float( `+Ne+`);
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

`,Dt=`#version 300 es
    precision highp float;
    in float fragCyclePhase;
    in float fragAltitude;
    const float PI = 3.141592;
    out vec4 fragColor;
    void main() {
        fragColor = vec4(fragAltitude, fragCyclePhase / (2. * PI), 1., 1.);
    }
`,Lt=`#version 300 es
    in vec2 iVertex;
    out vec2 fragCoord;
    void main() {
        fragCoord = iVertex * .5 + .5;
        gl_Position = vec4(iVertex.xy, 0., 1.);
    }
`,It=`#version 300 es
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
`,kt=new Float32Array([-1,-1,1,-1,1,1,-1,1]),Bt=new Uint16Array([0,1,2,2,3,0]);var ee,lt,ge,ct;class Nt{constructor(){ve(this,ee);this.numVecAttributes=et,this.maxNumSwimmer=tt,this.gl=i.gl;const e=this.gl.NEAREST;this.texture=new g.Texture(this.numVecAttributes,this.maxNumSwimmer,{type:this.gl.FLOAT,filter:e}),this.initPrograms(),this.indexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,Bt,this.gl.STATIC_DRAW),this.vboPlane=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.bufferData(this.gl.ARRAY_BUFFER,kt,this.gl.STATIC_DRAW),this.vboPoints=this.gl.createBuffer()}update(){this.numSwimmers=i.swimmers.length;const e=5;this.swimmersAttributes=new Float32Array(this.numVecAttributes*4*this.maxNumSwimmer*e);const s=K(this,ee,lt).call(this,i.swimmers);for(let l=0;l<i.swimmers.length;l++){const d=s[l];K(this,ee,ct).call(this,l,d),K(this,ee,ge).call(this,i.swimmers.length+l,d.leftArm),K(this,ee,ge).call(this,2*i.swimmers.length+l,d.rightArm),K(this,ee,ge).call(this,3*i.swimmers.length+l,d.leftFoot),K(this,ee,ge).call(this,4*i.swimmers.length+l,d.rightFoot)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture.id),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.numVecAttributes,this.maxNumSwimmer,this.gl.RGBA,this.gl.FLOAT,this.swimmersAttributes),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.swimmersAttributes,this.gl.DYNAMIC_DRAW)}buildShader(e,s){const l=this.gl.createShader(s);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const s=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(s,l)}),this.gl.linkProgram(s),s}checkShaders(e,s,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(s)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}createRenderingTexture(e,s){this.pointsTexture=new g.Texture(e,s,{type:this.gl.FLOAT,filter:this.gl.NEAREST}),this.pointsFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer);const l=this.gl.COLOR_ATTACHMENT0;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.pointsTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.horizontalPassTexture=new g.Texture(e,s,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.horizontalPassFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.horizontalPassTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);const d=s/4,u=d,p=d;this.displacementTexture=new g.Texture(u,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.displacementFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.displacementTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.oldDisplacementTexture=new g.Texture(u,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR})}buildProgram(e,s){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(s,this.gl.FRAGMENT_SHADER),u=this.createProgram([l,d]);return this.checkShaders(l,d,u),u}initPrograms(){this.programPoints=this.buildProgram(Mt,Dt),this.programVolume=this.buildProgram(Lt,It),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}volumePass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.useProgram(this.programVolume);const e=this.gl.getAttribLocation(this.programVolume,"iVertex"),s=this.gl.getUniformLocation(this.programVolume,"poolSize");this.gl.uniform2f(s,i.params.simulation.poolSize.x,i.params.simulation.poolSize.z);const l=this.gl.getUniformLocation(this.programVolume,"horizontal");this.gl.uniform1i(l,!0);const d=this.gl.getUniformLocation(this.programVolume,"show");this.gl.uniform1i(d,!1);const u=this.gl.getUniformLocation(this.programVolume,"swapColor");this.gl.uniform1i(u,!1);const p=2,T=this.gl.FLOAT,A=!1,D=0,S=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.vertexAttribPointer(e,p,T,A,D,S),this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pointsTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.uniform1i(l,!1),this.gl.uniform1i(d,!1),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.horizontalPassTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.viewport(0,0,this.displacementTexture.width,this.displacementTexture.height),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}pointPass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer),this.gl.useProgram(this.programPoints);const e=this.gl.getAttribLocation(this.programPoints,"iData1"),s=this.gl.getAttribLocation(this.programPoints,"iData2"),l=this.gl.getAttribLocation(this.programPoints,"iData3"),d=this.gl.getUniformLocation(this.programPoints,"invPoolSize");this.gl.uniform2f(d,1/i.params.simulation.poolSize.x,1/i.params.simulation.poolSize.z);const u=4,p=this.gl.FLOAT,T=!1,A=4,D=12*A;let S=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),e>=0&&(this.gl.vertexAttribPointer(e,u,p,T,D,S),this.gl.enableVertexAttribArray(e)),S=4*A,s>=0&&(this.gl.vertexAttribPointer(s,u,p,T,D,S),this.gl.enableVertexAttribArray(s)),S=2*4*A,l>=0&&(this.gl.vertexAttribPointer(l,u,p,T,D,S),this.gl.enableVertexAttribArray(l)),this.gl.viewport(0,0,this.pointsTexture.width,this.pointsTexture.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawArrays(this.gl.POINTS,0,5*this.numSwimmers)}updateOldDisplacementTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.oldDisplacementTexture.id),this.gl.copyTexSubImage2D(this.gl.TEXTURE_2D,0,0,0,0,0,this.oldDisplacementTexture.width,this.oldDisplacementTexture.height)}draw(){this.updateOldDisplacementTexture(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.pointPass(),this.volumePass(),this.gl.disable(this.gl.BLEND)}}ee=new WeakSet,lt=function(e){const s=function(u,p){return p.getDistanceTraveled()-u.getDistanceTraveled()};let l=0;e.forEach(u=>{u.hasFinished()>.1&&l++});const d=e.slice(0,l).concat(e.slice(l).sort(s));for(let u=0;u<e.length;u++)e[u]=d[u];return e},ge=function(e,s){this.swimmersAttributes[this.numVecAttributes*4*e]=s.center.x,this.swimmersAttributes[this.numVecAttributes*4*e+1]=s.center.z,this.swimmersAttributes[this.numVecAttributes*4*e+7]=s.center.y},ct=function(e,s){K(this,ee,ge).call(this,e,s.body),this.swimmersAttributes[this.numVecAttributes*4*e+2]=s.divingDistance,this.swimmersAttributes[this.numVecAttributes*4*e+3]=s.divingTime,this.swimmersAttributes[this.numVecAttributes*4*e+4]=s.reactionTime,this.swimmersAttributes[this.numVecAttributes*4*e+5]=s.body.velocity.z*3.6,this.swimmersAttributes[this.numVecAttributes*4*e+6]=s.nationality,this.swimmersAttributes[this.numVecAttributes*4*e+8]=s.breakoutDistance,this.swimmersAttributes[this.numVecAttributes*4*e+9]=s.breakoutTime,this.swimmersAttributes[this.numVecAttributes*4*e+10]=s.finishTime,this.swimmersAttributes[this.numVecAttributes*4*e+11]=s.waterDamping};function Fe(o=0,e=1){const s=1-Math.random(),l=Math.random();return Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*l)*e+o}const Vt=.5,Ot=2,he="Temps (s)",xe="event",_e="eventX",we="eventY",Ut="frequence (cylce/min)";var Ae,dt;const $=class ${constructor(e){ve(this,Ae);this.startingPoint=new g.Vector(e.x,e.y,e.z),this.center=new g.Vector(e.x,e.y,e.z),this.force=new g.Vector(0,0,190+Fe(0,20)),this.reactionTime=Math.max(.1,Fe(.15,.02));const s=.25,l=.15;this.body=new pe(e,s),this.body.showStreak=!0,this.leftArm=new pe(oe,l),this.rightArm=new pe(oe,l),this.leftFoot=new pe(oe,l),this.rightFoot=new pe(oe,l),this.body.cinematic=!$.useGravity,this.leftArm.cinematic=!0,this.rightArm.cinematic=!0,this.leftFoot.cinematic=!0,this.rightFoot.cinematic=!0,this.spheres=[this.body,this.leftArm,this.rightArm,this.leftFoot,this.rightFoot],this.divingDistance=0,this.divingTime=1e3,this.breakoutDistance=0,this.breakoutTime=1e3,this.nationality=Math.random()>.5?0:1,this.currendDataIndex=0,this.useTracking=!1,this.armPulsation=2*Math.PI*Ot,this.cycleTime=0,this.cyclePhase=0,this.finishTime=0,this.waterDamping=i.params.simulation.waterDamping}async parseData(e){await fetch(e).then(s=>{const l=s.headers.get("content-type");return!l||!l.includes("text/csv")?(console.log("no file found : "+e),null):s.text()}).then(s=>{if(!s)return;const l=s.split(`
`),d=l[0].split(/,|;/);this.data=l.slice(1).map(u=>{const p=u.split(/,|;/);return Object.fromEntries(d.map((T,A)=>[T,p[A]]))}),i.params.swimmers.useTracking&&(this.armPulsation=0)})}getDistanceTraveled(){const e=this.body.velocity.z,s=i.params.simulation.poolSize.z,l=this.body.center.z+s/2;return e>=0?l:2*s-l}startRace(){this.hasBrokeOut=!1,this.hasDove=!1,this.hasReacted=!1}jump(e=4.5){this.body.cinematic=!1,this.body.velocity=new g.Vector(0,0,e+Fe(0,1)),this.body.center=new g.Vector(this.startingPoint.x,1,-i.params.simulation.poolSize.z/2)}swim(e){this.hasReacted=e,this.isSwimming=e,this.finishTime=0,e||(this.body.followTarget=!1),e?(this.body.cinematic=!1,this.useGravity=!0,this.useTracking?this.moveToBeginning():this.body.center=new g.Vector(this.startingPoint.x,0,-i.params.simulation.poolSize.z/2)):(this.body.velocity=new g.Vector(0,0,0),this.body.center=new g.Vector(this.startingPoint.x,0,0))}moveToBeginning(){this.useTracking||console.warn("tried to use tracking on untracked swimmer");const e=this.data[0];this.body.center=K(this,Ae,dt).call(this,e)}hasFinished(){return this.finishTime>.1}getArmOffset(e,s){s+=this.cyclePhase;const l=this.body.velocity.z>=0?this.armPulsation:-this.armPulsation;return new g.Vector(0,Math.cos(l*e+s),Math.sin(l*e+s)).multiply(Vt)}setCurrentDataIndex(){if(console.log("set current data index"),this.currendDataIndex=0,!!this.data){for(;this.data[this.currendDataIndex]&&this.data[this.currendDataIndex][he]<i.getRaceTime();)this.currendDataIndex++;if(this.currendDataIndex+1<this.data.length){if(this.currendDataIndex-1>=0){const e=parseFloat(this.data[this.currendDataIndex][_e]);let s=e;const l=i.params.simulation.poolSize.z;e>l&&(s=2*l-s),s-=l/2;const d=this.body.center;d.x,i.isSceneSynchronizedSwimming()&&parseFloat(this.data[this.currendDataIndex][we])-i.params.simulation.poolSize.x/2,this.body.move(new g.Vector(d.x,d.y,s));const u=Math.sign(50-e)*.1;this.body.velocity=new g.Vector(0,0,u),console.log("vz : "+u)}this.body.setTarget(null),this.body.followTarget=!0,this.finishTime=0}}}findNextCycle(){let e=this.currendDataIndex+1;if(!this.data)return null;for(;this.data[e]&&this.data[e][xe]!="cycle";)e++;return this.data[e]?parseFloat(this.data[e][he]):null}setDamping(e){if(i.params.visualizations.customWaterPerturbation==i.params.visualizations.PARAMETER_CYCLES){const s=parseFloat(e[Ut]);if(s<50)return;if(s>0){console.log("FREQ : "+s);const l=80,d=50;let u=(s-d)/(l-d);u=Math.max(Math.min(u,1),0);const p=.015,T=.25;this.waterDamping=p+(T-p)*(1-u)}}else this.waterDamping=i.params.simulation.waterDamping}handleTracking(e){if(this.hasReacted&&this.useTracking&&this.currendDataIndex<this.data.length&&this.data[this.currendDataIndex][he]<e){this.setDamping(this.data[this.currendDataIndex]);let s=null,l=this.startingPoint.x,d=e;const u=this.data[this.currendDataIndex+1];this.currendDataIndex+1<this.data.length&&(s=parseFloat(u[_e]),i.isSceneSynchronizedSwimming()&&(s=i.params.simulation.poolSize.z-s*30/25,u[we]&&(l=parseFloat(u[we])-i.params.simulation.poolSize.x/2)),d=parseFloat(u[he]));const p=i.params.simulation.poolSize.z;let T=-this.body.radius/2;const A=this.data[this.currendDataIndex][xe];if(A=="enter"||A=="turn"&&u[xe]!="under"){d=(e+d)/2,s=(this.body.center.z+p/2+s)/2;const S={[he]:d,[_e]:s,[xe]:"under"};this.data.splice(this.currendDataIndex+1,0,S),T=-1.5}u&&u[xe]=="under"&&(T=-1.5),s>p&&(s=2*p-s),s-=i.params.simulation.poolSize.z/2;const D=new g.Vector(l,T,s);if(this.currendDataIndex+1<this.data.length?this.body.setTarget(D,d-e):this.body.setTarget(null),A=="figure"&&(console.log("FIGURE"),i.splashParticles.spawnSplash(D,null,1e4,null,{speed0:4,maxParticles:400}),i.chronoPhotography({circle:!0})),A=="cycle"){const S=parseFloat(this.data[this.currendDataIndex][he]),w=this.findNextCycle();if(w){const I=1/(w-S);this.armPulsation=2*Math.PI*I,this.cycleTime=0,this.cyclePhase==0?this.cyclePhase=Math.PI:this.cyclePhase=0}}else A=="finish"&&(this.finishTime=this.data[this.currendDataIndex][he],this.body.followTarget=!1,this.isSwimming=!1);this.currendDataIndex++}}moveSpheresAway(){this.rightArm.move(oe),this.leftArm.move(oe),this.rightFoot.move(oe),this.leftFoot.move(oe)}moveSpheres(e){this.cycleTime+=e;const s=this.getArmOffset(.5*this.cycleTime,0),l=this.getArmOffset(.5*this.cycleTime,Math.PI),d=this.getArmOffset(.5*this.cycleTime*2,0),u=this.getArmOffset(.5*this.cycleTime*2,Math.PI);this.rightArm.move(this.body.center.add(s).add(new g.Vector(ke,0,0))),this.leftArm.move(this.body.center.add(l).add(new g.Vector(-ke,0,0)));const p=this.body.velocity.z>=0?-Ne:Ne;this.rightFoot.move(this.body.center.add(new g.Vector(Be,d.y*.5,p))),this.leftFoot.move(this.body.center.add(new g.Vector(-Be,u.y*.5,p)))}update(e){const s=i.getRaceTime();!$.raceHasStarted&&this.data&&(this.useTracking=i.params.swimmers.useTracking),!this.hasReacted&&$.raceHasStarted&&(this.useTracking||s>this.reactionTime&&!i.params.swimmers.useTracking?(this.swim(!0),this.waterDamping=i.params.simulation.waterDamping,this.useTracking||this.jump(),this.useTracking&&(this.body.cinematic=!0,this.body.followTarget=!0,this.body.setTarget(null))):(this.swim(!1),this.body.cinematic=!0,i.playingDemo?this.body.move(new g.Vector(this.body.center.x,1,-i.params.simulation.poolSize.z/2)):this.body.move(oe)),this.currendDataIndex=0),this.isSwimming&&(this.useTracking||this.body.addForce(this.force),this.body.center.y>-this.body.radius&&!i.isSceneSynchronizedSwimming()?this.moveSpheres(e):this.moveSpheresAway()),this.handleTracking(s);for(let d of this.spheres)d.update(e),d.spawnSplashes(e);if(this.body.center.z>-i.params.simulation.poolSize.z/2+20||i.isSceneSynchronizedSwimming())return;$.raceHasStarted&&!this.hasDove&&this.body.center.y<0&&this.body.oldCenter.y>=0&&(this.divingDistance=this.body.center.z+i.params.simulation.poolSize.z/2,this.divingTime=s,this.hasDove=!0);const l=this.body.radius;$.raceHasStarted&&!this.hasBrokeOut&&this.body.center.y>-l&&this.body.oldCenter.y<=-l&&(this.breakoutDistance=this.body.center.z+i.params.simulation.poolSize.z/2,this.breakoutTime=s,this.hasBrokeOut=!0)}};Ae=new WeakSet,dt=function(e){let s=parseFloat(e[_e]),l=this.body.center.x;return i.isSceneSynchronizedSwimming()&&(s=i.params.simulation.poolSize.z-s*30/25,e[we]&&(l=parseFloat(e[we])-i.params.simulation.poolSize.x/2)),s-=i.params.simulation.poolSize.z/2,new g.Vector(l,1,s)},ie($,"useGravity",!1),ie($,"raceHasStarted",!1),ie($,"swimming",!1),ie($,"attributes"),ie($,"initAttributes",()=>{$.attributes=new Nt}),ie($,"updateAttributesTexture",()=>{$.attributes.update()}),ie($,"getAttributesTexture",()=>$.attributes.texture),ie($,"bindDisplacementTexture",e=>{$.attributes.displacementTexture.bind(e)}),ie($,"bindOldDisplacementTexture",e=>{$.attributes.oldDisplacementTexture.bind(e)}),ie($,"reset",e=>{$.attributes.createRenderingTexture(e.x,e.y)});let G=$;const Gt=`
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
`;var ue=`
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
    if (point.y < info.r) {
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
`;function de(o,e,s,l){this.water=e,this.gl=o,this.tileTexture=g.Texture.fromImage(document.getElementById("tiles"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGB}),this.franceTexture=g.Texture.fromImage(document.getElementById("france"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.chinaTexture=g.Texture.fromImage(document.getElementById("china"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.lettersTexture=g.Texture.fromImage(document.getElementById("letters"),{minFilter:this.gl.LINEAR,magFilter:this.gl.LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.flagSize=l,this.flagSize=[1.5,1],this.flagCenter=s,this.lightDir=new g.Vector(2,2,-1).unit(),this.causticTex=new g.Texture(1024,1024),this.waterShaders=[];let d="";Object.entries(i.params.visualizations.customParametersDict).forEach(T=>{const A=T[1].name,D=T[1].value;d+="#define "+A+" "+D+`
`}),Object.entries(i.params.visualizations.renderingDict).forEach(T=>{const A=T[1].name,D=T[1].value;d+="#define "+A+" "+D+`
`});for(var u=0;u<2;u++)this.waterShaders[u]=new g.Shader(`
      uniform sampler2D water;
      uniform vec3 poolSizeVertexShader;
      out vec3 position;
      void main() {
        vec4 info = texture(water, gl_Vertex.xy / poolSizeVertexShader.xz + 0.5);
        position = gl_Vertex.xzy;
        position.y += info.r;
        gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
      }
    `,ue+`
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
      #define BLUE    vec3(.2,.8, 1)
      #define RAINBOW abs(cos(uv.x + vec3(5,6,1)))

      #define GOLD    vec3(1., 1., 0.)
      #define SILVER  vec3(.8, .8, .8)
      #define BRONZE  vec3(.75, .54, .44)

      const vec3[] colorRankDict = vec3[](GOLD, SILVER, BRONZE); 
      
      
      `+Ee+Gt+`
      makeStrF(printSpeed) _num_ __ _k _m _DIV _h _endNum
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
        if (abs(position.y + poolSize.z / 2. - wr) < .05) color = vec3(1., 1., 0.); 
      }

      void drawDivingRipples(in vec2 coord, inout vec3 color) {
        vec3 divingWave = getDivingWaves(coord);
        bool toDraw = divingWave.z > 0.;
        float blending = divingWave.y;
        if (toDraw) {
          color = (1. - blending) * color + blending * vec3(0., 1., 0.);
        }
      
      }

      void distort(inout vec2 pos, vec2 swimmerPos, in float intensity) {
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
        float reshowTime = 4.;
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
        color += max(0.,1.-abs((shadowCircleRadius - distSq)/shadowCircleStroke)) * vec3(1., 1., 0.) * altitudeAttenuation;
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


      vec3 getSurfaceRayColor(vec3 origin, vec3 ray, vec3 waterColor, vec3 normal) {
        vec3 color;
        if (int(rendering) == RENDERING_REALISTIC) color = realisticRendering(origin, ray, waterColor);
        else if (int(rendering) == RENDERING_HEIGHT_FIELD) color = heightFieldRendering(origin.y);
        else if (int(rendering) == RENDERING_LAMBERT) color = lambertRendering(normal);
        else if (int(rendering) == RENDERING_TOON) color = toonRendering(normal, ray);
        
        if (bool(showFlags) || showWR || int(medalsModeAfterFinish) != MEDALS_NONE || int(medalsModeBeforeFinish) != MEDALS_NONE || showSpeed || showDivingDistance) drawVisualizations(origin.xz, color);
          
          
        
        return color;
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
          
          vec3 reflectedColor = getSurfaceRayColor(position, reflectedRay, underwaterColor, normal);
          vec3 refractedColor = getSurfaceRayColor(position, refractedRay, vec3(1.0), normal) * vec3(0.8, 1.0, 1.1);
          
          fragColor = vec4(mix(reflectedColor, refractedColor, (1.0 - fresnel) * length(refractedRay)), 1.0);
        `:`
          vec3 reflectedRay = reflect(incomingRay, normal);
          vec3 refractedRay = refract(incomingRay, normal, IOR_AIR / IOR_WATER);
          float fresnel = mix(0.25, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));
          
          vec3 reflectedColor = getSurfaceRayColor(position, reflectedRay, abovewaterColor, normal);
          vec3 refractedColor = getSurfaceRayColor(position, refractedRay, abovewaterColor, normal);
          
          fragColor = vec4(mix(refractedColor, reflectedColor, fresnel), 1.0);

          if(!foamEnabled) return;

          vec3 waterColor = abovewaterColor;
          vec4 foamColor = vec4(vec3(.9), fragColor.a);
          float foam = texture(foamTex, coord).r;
          fragColor = mix(fragColor, foamColor, foam);
        `)+`
      }
    `);this.sphereMesh=g.Mesh.sphere({detail:10}),this.sphereShader=new g.Shader(ue+`
    out vec3 position;
  void main() {
    position = sphereCenter + gl_Vertex.xyz * sphereRadius;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
  }
  `,ue+`
    in vec3 position;
    out vec4 fragColor;
    uniform vec3 color;
  void main() {
    fragColor = vec4(getSphereColor(position)*color, 1.0);
      vec4 info = texture(water, position.xz / poolSize.xz + 0.5);
    if (position.y < info.r) {
      fragColor.rgb *= underwaterColor * 1.2;
    }
  }
  `),this.reset(),this.cubeShader=new g.Shader(ue+`
    out vec3 position;
  void main() {
    position = gl_Vertex.xyz;
    position.y = ((1.0 - position.y) * (7.0 / 12.0) - 1.0) * poolSize.y;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
  }
  `,ue+`
    in vec3 position;
    out vec4 fragColor;
  void main() {
    fragColor = vec4(getWallColor(position), 1.0);
      vec4 info = texture(water, position.xz / poolSize.xz + 0.5);
    if (renderWater && position.y < info.r) {
      fragColor.rgb *= underwaterColor * 1.2;
    }
  }
  `),this.sphereCenter=new g.Vector,this.sphereRadius=0;var p=!!this.gl.getExtension("OES_standard_derivatives");this.causticsShader=new g.Shader(ue+`
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
  `+ue+`
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
  `)}de.prototype.reset=function(){this.cubeMesh=g.Mesh.cube({width:i.params.simulation.poolSize.x,height:2,depth:i.params.simulation.poolSize.z}),this.cubeMesh.triangles.splice(4,2),this.cubeMesh.compile()};de.prototype.updateCaustics=function(o){};de.prototype.renderWater=function(o,e,s){if(!i.renderWater)return;var l=new g.Raytracer;o.textureA.bind(0),this.tileTexture.bind(1),e.bind(2),this.causticTex.bind(3),this.franceTexture.bind(4),this.chinaTexture.bind(8),i.water.foam.foamTexNext.bind(9),this.lettersTexture.bind(7),o.areaConservationTexture.bind(5);const d=G.getAttributesTexture();d&&d.bind(6),this.gl.enable(this.gl.CULL_FACE),i.updateTransitions();for(var u=0;u<2;u++)this.gl.cullFace(u?this.gl.BACK:this.gl.FRONT),this.waterShaders[u].uniforms({renderWater:!0,light:this.lightDir,water:0,tiles:1,sky:2,causticTex:3,france:4,china:8,foamTex:9,areaConservationTexture:5,swimmersAttributesTexture:6,iChannel0:7,areaConservation:i.params.visualizations.areaConservationEnabled,flagSize:[1.5,2],flagCenter:[this.flagCenter.x,this.flagCenter.y],poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],poolSizeVertexShader:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],eye:l.eye,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,showProjectionGrid:o.showProjectionGrid,showAreaConservedGrid:o.showAreaConservedGrid,wr:o.WR_position,swimmersNumber:i.swimmers.length,cornerView:i.cornerView,showFlags:i.transitions.showFlags?i.transitions.showFlags.opacity:i.params.visualizations.showFlags,showWR:i.params.visualizations.showWR,showSpeed:i.params.visualizations.showSpeed,showDivingDistance:i.params.visualizations.showDivingDistance,showFinishTimes:i.params.visualizations.showFinishTimes,time:i.getRaceTime(),seed:i.time,foamEnabled:i.params.simulation.foam.enabled,shadowEnabled:s.enabled,shadowRadius:s.shadowRadius,shadowPower:s.shadowPower,showCircle:s.showCircle,shadowCircleRadius:s.circleRadius,shadowCircleStroke:s.circleStroke,showSwimmersLines:Math.round(i.params.visualizations.showSwimmersLinesDict[i.params.visualizations.showSwimmersLines]),swimmersLinesMode:i.params.visualizations.swimmersLinesModeDict[i.params.visualizations.swimmersLinesMode],medalsModeBeforeFinish:Math.round(i.params.visualizations.medalsModesDict[i.params.visualizations.medalsModeBeforeFinish]),medalsModeAfterFinish:Math.round(i.params.visualizations.medalsModesDict[i.params.visualizations.medalsModeAfterFinish]),rendering:i.params.visualizations.renderingDict[i.params.visualizations.rendering].value,waterColorParameter:i.params.visualizations.customParametersDict[i.params.visualizations.waterColorParameter].value}).draw(o.plane);this.gl.disable(this.gl.CULL_FACE)};de.prototype.renderSpheres=function(o){const e=[];i.params.swimmers.showSpheres&&i.swimmers.forEach(s=>s.spheres.forEach(l=>e.push(l))),i.params.simulation.showFloaters&&i.floaters.forEach(s=>e.push(s));for(let s of e)this.renderSphere(o,s)};de.prototype.renderSphere=function(o,e){o.textureA.bind(1),this.causticTex.bind(2),this.sphereShader.uniforms({light:this.lightDir,water:1,causticTex:2,sphereCenter:[e.center.x,e.center.y,e.center.z],sphereRadius:e.radius*i.spheresRadiusCoeff,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],color:[e.color.x,e.color.y,e.color.z]}).draw(e.mesh)};de.prototype.renderSphereOld=function(o){o.textureA.bind(0),this.causticTex.bind(1),this.sphereShader.uniforms({light:this.lightDir,water:0,causticTex:1,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z]}).draw(this.sphereMesh)};de.prototype.renderCube=function(o){i.renderCube&&(this.gl.enable(this.gl.CULL_FACE),o.textureA.bind(0),this.tileTexture.bind(1),this.causticTex.bind(2),this.cubeShader.uniforms({light:this.lightDir,water:0,tiles:1,causticTex:2,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],renderWater:i.renderWater}).draw(this.cubeMesh),this.gl.disable(this.gl.CULL_FACE))};function We(o,e){this.gl=e,this.id=e.createTexture(),e.bindTexture(e.TEXTURE_CUBE_MAP,this.id),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.xneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.xpos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.yneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.ypos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.zneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.zpos)}We.prototype.bind=function(o){this.gl.activeTexture(this.gl.TEXTURE0+(o||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.id)};We.prototype.unbind=function(o){this.gl.activeTexture(this.gl.TEXTURE0+(o||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null)};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class se{constructor(e,s,l,d,u="div"){this.parent=e,this.object=s,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(d),this.$name=document.createElement("div"),this.$name.classList.add("name"),se.nextNameID=se.nextNameID||0,this.$name.id="lil-gui-name-"+ ++se.nextNameID,this.$widget=document.createElement(u),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const s=this.parent.add(this.object,this.property,e);return s.name(this._name),this.destroy(),s}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Wt extends se{constructor(e,s,l){super(e,s,l,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Oe(o){let e,s;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?s=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?s=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(s=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!s&&"#"+s}const Xt={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Oe,toHexString:Oe},ye={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},Ht={isPrimitive:!1,match:Array.isArray,fromHexString(o,e,s=1){const l=ye.fromHexString(o);e[0]=(l>>16&255)/255*s,e[1]=(l>>8&255)/255*s,e[2]=(255&l)/255*s},toHexString:([o,e,s],l=1)=>ye.toHexString(o*(l=255/l)<<16^e*l<<8^s*l<<0)},$t={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,s=1){const l=ye.fromHexString(o);e.r=(l>>16&255)/255*s,e.g=(l>>8&255)/255*s,e.b=(255&l)/255*s},toHexString:({r:o,g:e,b:s},l=1)=>ye.toHexString(o*(l=255/l)<<16^e*l<<8^s*l<<0)},Yt=[Xt,ye,Ht,$t];class qt extends se{constructor(e,s,l,d){var u;super(e,s,l,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(u=this.initialValue,Yt.find(p=>p.match(u))),this._rgbScale=d,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const p=Oe(this.$text.value);p&&this._setValueFromHexString(p)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const s=this._format.fromHexString(e);this.setValue(s)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Pe extends se{constructor(e,s,l){super(e,s,l,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",d=>{d.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class jt extends se{constructor(e,s,l,d,u,p){super(e,s,l,"number"),this._initInput(),this.min(d),this.max(u);const T=p!==void 0;this.step(T?p:this._getImplicitStep(),T),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,s=!0){return this._step=e,this._stepExplicit=s,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let s=(e-this._min)/(this._max-this._min);s=Math.max(0,Math.min(s,1)),this.$fill.style.width=100*s+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=S=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+S),this.$input.value=this.getValue())};let s,l,d,u,p,T=!1;const A=S=>{if(T){const w=S.clientX-s,P=S.clientY-l;Math.abs(P)>5?(S.preventDefault(),this.$input.blur(),T=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>5&&D()}if(!T){const w=S.clientY-d;p-=w*this._step*this._arrowKeyMultiplier(S),u+p>this._max?p=this._max-u:u+p<this._min&&(p=this._min-u),this._snapClampSetValue(u+p)}d=S.clientY},D=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",D)};this.$input.addEventListener("input",()=>{let S=parseFloat(this.$input.value);isNaN(S)||(this._stepExplicit&&(S=this._snap(S)),this.setValue(this._clamp(S)))}),this.$input.addEventListener("keydown",S=>{S.code==="Enter"&&this.$input.blur(),S.code==="ArrowUp"&&(S.preventDefault(),e(this._step*this._arrowKeyMultiplier(S))),S.code==="ArrowDown"&&(S.preventDefault(),e(this._step*this._arrowKeyMultiplier(S)*-1))}),this.$input.addEventListener("wheel",S=>{this._inputFocused&&(S.preventDefault(),e(this._step*this._normalizeMouseWheel(S)))},{passive:!1}),this.$input.addEventListener("mousedown",S=>{s=S.clientX,l=d=S.clientY,T=!0,u=this.getValue(),p=0,window.addEventListener("mousemove",A),window.addEventListener("mouseup",D)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=P=>{const I=this.$slider.getBoundingClientRect();let x=(R=P,z=I.left,V=I.right,O=this._min,U=this._max,(R-z)/(V-z)*(U-O)+O);var R,z,V,O,U;this._snapClampSetValue(x)},s=P=>{e(P.clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",l)};let d,u,p=!1;const T=P=>{P.preventDefault(),this._setDraggingStyle(!0),e(P.touches[0].clientX),p=!1},A=P=>{if(p){const I=P.touches[0].clientX-d,x=P.touches[0].clientY-u;Math.abs(I)>Math.abs(x)?T(P):(window.removeEventListener("touchmove",A),window.removeEventListener("touchend",D))}else P.preventDefault(),e(P.touches[0].clientX)},D=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",A),window.removeEventListener("touchend",D)},S=this._callOnFinishChange.bind(this);let w;this.$slider.addEventListener("mousedown",P=>{this._setDraggingStyle(!0),e(P.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",l)}),this.$slider.addEventListener("touchstart",P=>{P.touches.length>1||(this._hasScrollBar?(d=P.touches[0].clientX,u=P.touches[0].clientY,p=!0):T(P),window.addEventListener("touchmove",A,{passive:!1}),window.addEventListener("touchend",D))},{passive:!1}),this.$slider.addEventListener("wheel",P=>{if(Math.abs(P.deltaX)<Math.abs(P.deltaY)&&this._hasScrollBar)return;P.preventDefault();const I=this._normalizeMouseWheel(P)*this._step;this._snapClampSetValue(this.getValue()+I),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(S,400)},{passive:!1})}_setDraggingStyle(e,s="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+s,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:s,deltaY:l}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(s=0,l=-e.wheelDelta/120,l*=this._stepExplicit?1:10),s+-l}_arrowKeyMultiplier(e){let s=this._stepExplicit?1:10;return e.shiftKey?s*=10:e.altKey&&(s/=10),s}_snap(e){const s=Math.round(e/this._step)*this._step;return parseFloat(s.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Kt extends se{constructor(e,s,l,d){super(e,s,l,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(d)?d:Object.values(d),this._names=Array.isArray(d)?d:Object.keys(d),this._names.forEach(u=>{const p=document.createElement("option");p.innerHTML=u,this.$select.appendChild(p)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),s=this._values.indexOf(e);return this.$select.selectedIndex=s,this.$display.innerHTML=s===-1?e:this._names[s],this}}class Zt extends se{constructor(e,s,l){super(e,s,l,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",d=>{d.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let Je=!1;class Xe{constructor({parent:e,autoPlace:s=e===void 0,container:l,width:d,title:u="Controls",injectStyles:p=!0,touchStyles:T=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",A=>{A.code!=="Enter"&&A.code!=="Space"||(A.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(u),T&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Je&&p&&(function(A){const D=document.createElement("style");D.innerHTML=A;const S=document.querySelector("head link[rel=stylesheet], head style");S?document.head.insertBefore(D,S):document.head.appendChild(D)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Je=!0),l?l.appendChild(this.domElement):s&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),d&&this.domElement.style.setProperty("--width",d+"px"),this.domElement.addEventListener("keydown",A=>A.stopPropagation()),this.domElement.addEventListener("keyup",A=>A.stopPropagation())}add(e,s,l,d,u){if(Object(l)===l)return new Kt(this,e,s,l);const p=e[s];switch(typeof p){case"number":return new jt(this,e,s,l,d,u);case"boolean":return new Wt(this,e,s);case"string":return new Zt(this,e,s);case"function":return new Pe(this,e,s)}console.error(`gui.add failed
	property:`,s,`
	object:`,e,`
	value:`,p)}addColor(e,s,l=1){return new qt(this,e,s,l)}addFolder(e){return new Xe({parent:this,title:e})}load(e,s=!0){return e.controllers&&this.controllers.forEach(l=>{l instanceof Pe||l._name in e.controllers&&l.load(e.controllers[l._name])}),s&&e.folders&&this.folders.forEach(l=>{l._title in e.folders&&l.load(e.folders[l._title])}),this}save(e=!0){const s={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof Pe)){if(l._name in s.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);s.controllers[l._name]=l.save()}}),e&&this.folders.forEach(l=>{if(l._title in s.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);s.folders[l._title]=l.save()}),s}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const s=this.$children.clientHeight;this.$children.style.height=s+"px",this.domElement.classList.add("transition");const l=u=>{u.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const d=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=d+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(s=>s.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(s=>{e=e.concat(s.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(s=>{e=e.concat(s.foldersRecursive())}),e}}const ae=new Xe,Jt=function(o,e){const s=ae.addFolder("visualizations");s.close(),s.add(i,"useConfigFile").name("use configuration file"),s.add(i,"showTimeline").name("show event timeline").listen().onChange(x=>{i.hideEditorPanel(x)}),s.add(i.params.visualizations,"showFlags").name("show flags").listen(),s.add(i.params.visualizations,"showStreaks").name("show streaks").listen(),s.add(i.params.visualizations,"showWR").name("show world record").listen(),s.add(i.params.visualizations,"showSwimmersLines",i.params.visualizations.swimmersLinesList).name("show neighbours lines").listen(),s.add(i.params.visualizations,"swimmersLinesMode",i.params.visualizations.swimmersLinesModeList).name("show neighbours lines").listen(),s.add(i.params.visualizations,"customWaterPerturbation",i.params.visualizations.customParametersList).name("custom water perturbation").listen(),s.add(i.params.visualizations,"waterColorParameter",i.params.visualizations.customParametersList).name("water color parameter").listen(),s.add(i.params.visualizations,"medalsModeBeforeFinish",["none","stars","bright","lanes"]).name("show potential medals").listen(),s.add(i.params.visualizations,"medalsModeAfterFinish",["none","stars","bright","lanes"]).name("show potential medals after finish").listen(),s.add(i.params.visualizations,"showSpeed").name("show speed").listen(),s.add(i.params.visualizations,"showDivingDistance").name("show diving distance").listen(),s.add(i.params.visualizations.shadow,"enabled").name("show shadow"),s.add(i.params.visualizations,"areaConservationEnabled","areaConservationEnabled").name("area conservation").listen(),s.add(i.params.visualizations,"rendering",i.params.visualizations.renderingList).name("rendering").listen().onChange(()=>{i.params.visualizations.rendering=="toon"&&(i.params.simulation.waterDamping=.35)});const l=ae.addFolder("video");l.close(),l.add(i.params.video,"opacity").name("opacity").listen(),l.add(i.params.video,"thresholdBlending").name("threshold blending").listen(),l.add(i.params.video,"blendingThreshold",.1,1.5).name("blending threshold"),l.add(i.params.video,"show").name("show").listen(),l.add(i.params.video,"hideObstructions").name("hide obstructions"),l.add(i.params.video,"hideObstructionThreshold",0,.5).name("obstructions threshold");const d=s.addFolder("Sparks");d.close(),d.add(i.params.visualizations.sparks,"enabled").name("sparks enabled"),d.add(i.params.visualizations.sparks,"glow",1,30).name("sparks glow factor"),d.add(i.params.visualizations.sparks,"lengthFactor",.1,10).name("sparks length factor"),d.add(i.params.visualizations.sparks,"glowOffset",.1,3).name("sparks glow offset"),d.add(i.params.visualizations.sparks,"stroke",.001,.05).name("sparks stroke"),d.add(i.params.visualizations.sparks,"num",10,it).step(1).name("sparks number"),d.add(i.params.visualizations.sparks,"sizeFactor",10,100).name("size factor");const u=s.addFolder("Swimmers shadows");u.close(),u.add(i.params.visualizations.shadow,"shadowRadius",0,2).name("shadow radius"),u.add(i.params.visualizations.shadow,"shadowPower",.1,2).name("shadow power"),u.add(i.params.visualizations.shadow,"showCircle").name("circle"),u.add(i.params.visualizations.shadow,"circleRadius",.5,2).name("circle radius"),u.add(i.params.visualizations.shadow,"circleStroke",.1,.5).name("circle stroke");const p=ae.addFolder("Simulation");p.close(),p.add(i.params.simulation,"showFloaters").name("show floaters").listen(),p.add(i.params.simulation,"optimized").name("optimized").listen(),p.add(i.params.simulation.poolSize,"x",1,25).name("pool width").onChange(function(x){e()}).listen(),p.add(i.params.simulation.poolSize,"z",1,50).name("pool height").onChange(function(x){e()}).listen(),p.add(i.params.simulation.poolSize,"y",1,3).name("pool depth").onChange(function(x){e()}).listen(),p.add(i.params.simulation,"waterDamping",.005,.4).name("water damping").listen();const T=p.addFolder("foam");T.close(),T.add(i.params.simulation.foam,"enabled").name("enabled"),T.add(i.params.simulation.foam,"velThreshold",0,15).name("velocity threshold"),T.add(i.params.simulation.foam,"velMax",0,20).name("max velocity"),T.add(i.params.simulation.foam,"dispersion",0,.1).name("dispersion"),T.add(i.params.simulation.foam,"timeVariation",0,10).name("time variation"),T.add(i.params.simulation.foam,"spaceVariation",0,100).name("space variation"),T.add(i.params.simulation.foam,"attenuation",0,.2).name("attenuation");const A=p.addFolder("splash");A.close(),A.add(i.params.simulation.splashes,"enabled").name("enabled"),A.add(i.params.simulation.splashes,"strengthThreshold",.1,10).name("strength threshold");const D=ae.addFolder("swimmers");D.close(),D.add(i.params.swimmers,"showSpheres").name("show spheres").listen(),D.add(i.params.swimmers,"useTracking").name("use tracking data").listen();const S=ae.addFolder("camera");S.close(),S.add(i.params,"fov",28,45).name("fov").listen().onChange(function(x){i.params.visualizations.sparks.fov=x*2*Math.PI/360,o.matrixMode(o.PROJECTION),o.loadIdentity(),o.perspective(i.params.fov,o.canvas.width/o.canvas.height,.01,100),o.matrixMode(o.MODELVIEW),console.log("perspective : "+i.params.fov)});const w=ae.addFolder("quiver");w.close(),w.add(i.params.quiver,"amplitude",.01,1).name("amplitude"),w.add(i.params.quiver,"omega",.5,5).name("omega"),w.add(i.params.quiver,"amplitudeFactor",.5,.9).name("amplitude factor"),w.add(i.params.quiver,"frequencyFactor",1.1,2).name("frequency factor"),w.add(i.params.quiver,"waveLength",1,30).name("wave length");const P=ae.addFolder("corner view");P.close(),P.add(i.params.cornerView,"show").name("show");const I=ae.addFolder("chrono-photography");I.close(),I.add(i.params.chronoPhotography,"available").name("available").onChange(()=>{i.params.chronoPhotography.available?i.drawingFrameBuffer=i.chronoFrameBuffer:i.drawingFrameBuffer=null}),i._gui=ae},Me=150,ce=100;function Qt(o){const e=document.createElement("div");if(document.body.appendChild(e),e.id="event-editor",e.style.position="fixed",e.display="block",e.style.bottom="60px",e.style.left="10px",e.style.right="10px",e.style.height="120px",e.style.zIndex="4",e.style.background="#222",e.style.color="#fff",e.style.overflow="auto",e.style.padding="4px",e.style.fontSize="12px",e.style.position=e.style.position||"relative",!e){console.warn(`event editor container "${o}" not found`);return}let s,l=!1;const d=[{name:"showFlags",type:"boolean"},{name:"showWR",type:"boolean"},{name:"showSpeed",type:"boolean"},{name:"showDivingDistance",type:"boolean"},{name:"showFinishTimes",type:"boolean"},{name:"showSwimmersLines",type:"select",options:i.params.visualizations.swimmersLinesList},{name:"swimmersLinesMode",type:"select",options:i.params.visualizations.swimmersLinesModeList},{name:"customWaterPerturbation",type:"select",options:i.params.visualizations.customParametersList},{name:"waterColorParameter",type:"select",options:i.params.visualizations.customParametersList},{name:"medalsModeBeforeFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"medalsModeAfterFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"rankSwimmerToggle",type:"number",min:1,max:10},{name:"showStreaks",type:"boolean"}];function u(x){const R=document.createElement("div");R.style.flex="1",R.style.padding="4px",R.style.background="#222",R.style.border="1px solid #555",R.style.borderRadius="4px",R.style.fontFamily="monospace",R.style.fontSize="12px",R.style.whiteSpace="pre-wrap",R.style.overflow="auto",R.style.maxHeight="100px";function z(){const V=x.params;if(Object.keys(V).length===0){R.textContent="(no params)";return}const O=Object.entries(V).map(([U,k])=>`${U}: ${JSON.stringify(k)}`);R.textContent=O.join(`
`)}return z(),{element:R,update:z}}function p(x,R){const z=document.createElement("div");z.style.display="flex",z.style.flexWrap="wrap",z.style.margin="4px 0",z.style.background="#333",z.style.padding="4px";function V(){R&&(R(),I())}d.forEach(B=>{const q=document.createElement("div");q.style.marginRight="8px",q.style.marginBottom="4px";const te=document.createElement("label");te.style.whiteSpace="nowrap",te.textContent=B.name+":",q.appendChild(te);let N;if(B.type==="boolean"){N=document.createElement("select"),[{value:"",label:"—"},{value:"true",label:"ON"},{value:"false",label:"OFF"}].forEach(j=>{const _=document.createElement("option");_.value=j.value,_.textContent=j.label,N.appendChild(_)});const Y=x.params[B.name];Y===void 0?N.value="":Y===!0?N.value="true":Y===!1&&(N.value="false"),N.addEventListener("change",()=>{N.value===""?delete x.params[B.name]:N.value==="true"?x.params[B.name]=!0:N.value==="false"&&(x.params[B.name]=!1),V()})}else if(B.type==="select"){N=document.createElement("select");const H=document.createElement("option");H.value="",H.textContent="—",N.appendChild(H),B.options.forEach(Y=>{const j=document.createElement("option");j.value=Y,j.textContent=Y,N.appendChild(j)}),N.value=x.params[B.name]||"",N.addEventListener("change",()=>{N.value===""?delete x.params[B.name]:x.params[B.name]=N.value,V()})}else B.type==="number"&&(N=document.createElement("input"),N.type="number",B.min!==void 0&&(N.min=B.min),B.max!==void 0&&(N.max=B.max),N.placeholder="—",N.style.width="50px",N.value=x.params[B.name]!==void 0?x.params[B.name]:"",N.addEventListener("change",()=>{if(N.value==="")delete x.params[B.name];else{const H=parseFloat(N.value);isNaN(H)||(x.params[B.name]=H)}V()}));N&&q.appendChild(N),z.appendChild(q)});const O=document.createElement("div");O.style.marginRight="8px",O.style.marginBottom="4px";const U=document.createElement("label");U.style.whiteSpace="nowrap",U.textContent="transition :",O.appendChild(U);const k=document.createElement("input");return k.type="number",k.min=0,k.placeholder="—",k.style.width="50px",k.value=x.transition!==void 0?x.transition.duration:"",k.addEventListener("change",()=>{if(k.value===""){delete x.transition;return}const B=parseFloat(k.value);isNaN(B)||(x.transition={type:"dissolve",duration:B},V())}),O.appendChild(k),z.appendChild(O),z}function T(){const x=document.createElement("div");x.style.marginTop="8px",x.style.padding="8px",x.style.background="#555",x.style.border="1px solid #777";const R=document.createElement("div");R.textContent="Add New Event",R.style.fontWeight="bold",R.style.marginBottom="4px",x.appendChild(R);const z=document.createElement("input");z.type="number",z.placeholder="Distance",z.style.width="auto",z.style.marginRight="8px",x.appendChild(z);const V={params:{}},O=p(V,null);O.style.margin="4px 0",x.appendChild(O);const U=document.createElement("button");U.textContent="OK",U.addEventListener("click",()=>{const B=parseFloat(z.value);if(isNaN(B)){alert("Please enter a valid distance");return}const q={distance:B,...V};i.events.push(q),I(),s.remove(),s=null}),x.appendChild(U);const k=document.createElement("button");return k.textContent="cancel",k.addEventListener("click",()=>{s.remove(),s=null}),x.appendChild(k),x}function A(x,R,{title:z="",id:V=null,color:O="#e74c3c"}){const U=x/R*100,k=document.createElement("div");return k.style.position="absolute",k.style.left=U+"%",k.style.transform="translateX(-50%)",k.style.width="4px",k.style.height="100%",k.style.background=O,k.style.cursor="pointer",k.title=z,V&&(k.id=V),k.addEventListener("click",()=>{P(idx)}),k}function D(){let x=document.getElementById("distance-marker");const R=i.swimmers[0].getDistanceTraveled();if(!x){if(l)return;const z=document.getElementById("timeline-track");x=A(R,ce,{color:"blue",id:"distance-marker"}),z.appendChild(x)}x.style.left=R+"%"}function S(x){l=x,w()}function w(){e.innerHTML="";const x=document.createElement("button");if(x.textContent=l?"□":"—",x.style.position="absolute",x.style.top="0",x.style.right="0",x.style.width="20px",x.style.height="20px",x.style.zIndex="100001",x.addEventListener("click",()=>{l=!l,w()}),e.appendChild(x),l){e.style.height="20px";return}e.style.height="300px";const R=document.createElement("div");if(R.style.position="relative",R.style.top="0px",R.style.left="50%",R.style.transform="translateX(-50%)",R.style.width="80px",R.style.height="15px",R.style.background="grey",R.style.border="1px solid black",R.style.cursor="ns-resize",R.style.zIndex="100000",R.style.lineHeight="16px",R.style.textAlign="center",R.textContent="drag",e.appendChild(R),R.addEventListener("mousedown",r=>{r.preventDefault();const c=r.clientY,h=e.offsetHeight;function m(b){const y=h-(b.clientY-c);y>20&&(e.style.height=y+"px")}function f(){document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",f)}document.addEventListener("mousemove",m),document.addEventListener("mouseup",f)}),!i.events){e.textContent="no events defined";return}const z=document.createElement("div");e.appendChild(z),z.style.marginRight="8px",z.style.marginBottom="4px";const V=document.createElement("label");V.style.whiteSpace="nowrap",V.textContent="select scene",V.style.margin="30px",z.appendChild(V);const O=document.createElement("select");O.style.width="auto",i.scenesList.forEach(r=>{const c=document.createElement("option");c.textContent=r.title,c.value=r.title,O.appendChild(c)}),O.addEventListener("change",()=>{i.setScene(O.value)}),z.appendChild(O);const U=i.events.slice().sort((r,c)=>{const h=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,m=c.distance!==void 0?c.distance:c.time!==void 0?c.time:0;return h-m}),k=new Set;U.forEach(r=>{r.params&&Object.keys(r.params).forEach(c=>k.add(c))});let B=d.map(r=>r.name).filter(r=>k.has(r));const q=["#4caf50","#2196f3","#ff9800","#9c27b0","#f44336","#009688","#e91e63","#3f51b5"],te={};B.forEach((r,c)=>{te[r]=q[c%q.length]});const N={},H={};B.forEach(r=>{H[r]=!1,N[r]=0});const Y=[];if(U.forEach(r=>{const c=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0;r.params&&Object.keys(r.params).forEach(h=>{if(B.includes(h)){const m=!!r.params[h];m!==H[h]&&(H[h]&&Y.push({name:h,start:N[h],end:c}),H[h]=m,N[h]=c)}})}),B.forEach(r=>{H[r]&&Y.push({name:r,start:N[r],end:ce})}),B.length>0){const r=document.createElement("div");r.style.position="relative";const c=20;r.style.height=B.length*c+"px",r.style.background="#222",r.style.marginBottom="4px",r.style.marginTop="10px",B.forEach((m,f)=>{const b=document.createElement("div");b.textContent=m,b.style.position="absolute",b.style.left="0",b.style.top=f*c+2+"px",b.style.width=Me+"px",b.style.color="#aaa",b.style.fontSize="10px",b.style.pointerEvents="none",r.appendChild(b)});const h=document.createElement("div");h.style.position="absolute",h.style.left=Me+"px",h.style.top="0",h.style.right="0",h.style.bottom="0",h.style.overflow="hidden",r.appendChild(h),Y.forEach(m=>{const f=document.createElement("div"),b=m.start/ce*100,y=(m.end-m.start)/ce*100;f.style.position="absolute",f.style.left=b+"%",f.style.top=B.indexOf(m.name)*c+2+"px",f.style.height=c-4+"px",f.style.width=y+"%",f.style.background=te[m.name]||"#4caf50",f.title=`${m.name}: ${m.start.toFixed(2)} → ${m.end.toFixed(2)}`;const v=document.createElement("span");if(v.textContent=`${m.name}: ${m.start.toFixed(2)} → ${m.end.toFixed(2)}`,v.style.position="absolute",v.style.top="0",v.style.left="2px",v.style.fontSize="10px",v.style.color="white",v.style.pointerEvents="none",v.style.whiteSpace="nowrap",v.style.overflow="hidden",v.style.textOverflow="ellipsis",f.appendChild(v),m.end<ce){const E=document.createElement("div");E.style.position="absolute",E.style.right="0",E.style.top="0",E.style.width="5px",E.style.height="100%",E.style.background="rgba(255,255,255,0.5)",E.style.cursor="ew-resize",f.appendChild(E),E.addEventListener("mousedown",M=>{M.preventDefault(),M.stopPropagation();const F=M.clientX,L=f.offsetWidth;function X(J){const re=J.clientX-F,le=Math.max(1,L+re),fe=le/h.offsetWidth*100;f.style.width=fe+"%";const gt=m.start+le/h.offsetWidth*ce;v.textContent=`${m.name}: ${m.start.toFixed(2)} → ${gt.toFixed(2)}`}function W(){document.removeEventListener("mousemove",X),document.removeEventListener("mouseup",W);const J=f.offsetWidth,re=m.start+J/h.offsetWidth*ce,le=U.find(fe=>(fe.distance!==void 0?fe.distance:fe.time!==void 0?fe.time:0)===m.end);le&&(le.distance!==void 0?le.distance=re:le.time!==void 0&&(le.time=re)),I()}document.addEventListener("mousemove",X),document.addEventListener("mouseup",W)})}h.appendChild(f)}),e.appendChild(r)}const j=document.createElement("div");j.style.position="relative",j.style.height="40px",j.style.background="#222",j.style.marginBottom="4px",j.style.paddingLeft="80px";const _=document.createElement("div");_.id="timeline-track",_.style.position="absolute",_.style.background="#444",_.style.left=Me+"px",_.style.top="0",_.style.right="0",_.style.bottom="0",j.appendChild(_),U.forEach((r,c)=>{const h=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,m=`event ${c}: ${JSON.stringify(r.params)}`,f=A(h,ce,{title:m});_.appendChild(f)}),e.appendChild(j),U.forEach((r,c)=>{const h=document.createElement("div");h.style.display="flex",h.style.flexDirection="column",h.style.marginBottom="4px";const m=document.createElement("div");m.style.display="flex",m.style.alignItems="center";const f=document.createElement("input");f.type="number",f.style.width="60px",f.value=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,f.addEventListener("change",()=>{const M=parseFloat(f.value);isNaN(M)||(r.distance!==void 0?r.distance=M:r.time=M,I())}),m.appendChild(f);const b=u(r);m.appendChild(b.element);const y=document.createElement("button");y.textContent="⚙",y.style.marginLeft="4px",m.appendChild(y);const v=document.createElement("button");v.textContent="✖",v.style.marginLeft="4px",v.addEventListener("click",()=>{const M=i.events.indexOf(U[c]);M!==-1&&(i.events.splice(M,1),w())}),m.appendChild(v),h.appendChild(m);let E;y.addEventListener("click",()=>{E?(E.remove(),E=null):(E=p(r,b.update),h.appendChild(E))}),e.appendChild(h)});const n=document.createElement("button");n.textContent="+ add event",n.addEventListener("click",()=>{s?(s.remove(),s=null):(s=T(),e.appendChild(s),e.scrollTop=e.scrollHeight)}),e.appendChild(n);const a=document.createElement("button");a.textContent="export JSON",a.style.marginLeft="8px",a.addEventListener("click",()=>{const r=JSON.stringify(i.events,null,2),c=new Blob([r],{type:"application/json"}),h=URL.createObjectURL(c),m=document.createElement("a");m.href=h,m.download="vis-config.json",m.click(),URL.revokeObjectURL(h)}),e.appendChild(a);const t=document.createElement("input");t.type="file",t.accept=".json",t.style.marginLeft="8px",t.addEventListener("change",r=>{const c=r.target.files[0];if(c){const h=new FileReader;h.onload=m=>{try{const f=JSON.parse(m.target.result);i.events=f,I()}catch(f){alert("Invalid JSON: "+f.message)}},h.readAsText(c)}}),e.appendChild(t)}function P(x){const z=e.querySelectorAll("div")[1+x];z&&z.scrollIntoView({behavior:"smooth",block:"center"})}function I(){i.events.sort((x,R)=>{const z=x.distance!==void 0?x.distance:x.time!==void 0?x.time:0,V=R.distance!==void 0?R.distance:R.time!==void 0?R.time:0;return z-V}),w()}w(),i._renderTimeline=w,i._updateDistanceMarker=D,i._setPannelMinimized=S}const ht=new g.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),ei=new g.Shader(`
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
`),ti=new g.Shader(`
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
`);let be=new g.Texture,Ue=new g.Texture,ut=!1,Qe=null;const mt=(o,e,s)=>{ut=!0,be=new g.Texture(o,e,{type:s.FLOAT,filter:s.NEAREST}),Ue=new g.Texture(o,e,{type:s.FLOAT,filter:s.NEAREST}),Qe=s.createFramebuffer(),s.bindFramebuffer(s.FRAMEBUFFER,Qe);const l=s.COLOR_ATTACHMENT0;s.framebufferTexture2D(s.FRAMEBUFFER,l,s.TEXTURE_2D,be.id,0),s.bindFramebuffer(s.FRAMEBUFFER,null)};function De(o){o.x/=i.gl.canvas.width/2,o.x-=1,o.y/=i.gl.canvas.height/2,o.y-=1}const ft=o=>{console.log("take chrono photo : "+o),ut||mt(i.gl.canvas.width,i.gl.canvas.height,i.gl);const e=i.params.simulation.poolSize,s=i.gl.project(e.x/2,0,i.distanceFixed+1-e.z/2),l=i.gl.project(-e.x/2,0,i.distanceFixed+1-e.z/2);De(s),De(l);const d=i.swimmers[0].body.center,u=i.gl.project(d.x,d.y,d.z);De(u),Ue.drawTo(()=>{be.bind(0),i.gl.activeTexture(i.gl.TEXTURE1),i.gl.bindTexture(i.gl.TEXTURE_2D,i.drawingTexture),i.gl.activeTexture(i.gl.TEXTURE2),i.gl.bindTexture(i.gl.TEXTURE_2D,i.currentVideo.texture),ei.uniforms({oldPicture:0,screen:1,videoTex:2,distanceFixed:i.distanceFixed,poolSize:[i.params.simulation.poolSize.x,i.params.simulation.poolSize.y,i.params.simulation.poolSize.z],linep1:[s.x,s.y],linep2:[l.x,l.y],center:[u.x,u.y],circleZone:o}).draw(ht)}),be.swapWith(Ue),i.gl.bindFramebuffer(i.gl.FRAMEBUFFER,i.drawingFrameBuffer)},ii=()=>{i.chronoPhotoCircleTime&&i.time>=i.chronoPhotoCircleTime&&(i.chronoPhotoCircleTime=null,ft(!0)),i.gl.bindFramebuffer(i.gl.FRAMEBUFFER,null),be.bind(7),i.gl.activeTexture(i.gl.TEXTURE8),i.gl.bindTexture(i.gl.TEXTURE_2D,i.drawingTexture),ti.uniforms({picture:7,screen:8}).draw(ht)};i._fixTexture=ft;i._clearChronoTexture=mt;function ri(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}function oi(o){var e=ri(o);e=="WebGL not supported"&&(e='Your browser does not support WebGL.<br>Please see    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">    Getting a WebGL Implementation</a>.');var s=document.getElementById("loading");s.innerHTML=e,s.style.zIndex=1}window.onerror=oi;var Le,Z;const si=10,C=i.gl;var Te,Ge;G.initAttributes();function pt(){document.getElementById("warning").hidden=!(i.resolution.x*i.resolution.y>3e5&&i.water&&i.params.visualizations.areaConservationEnabled)}let Ie=0;function ni(o){Ie+=o,Ie>=1&&(document.getElementById("fps").innerText=`${(1/o).toFixed(1)} FPS`,Ie=0)}function me(){console.log("reset"),document.getElementById("resolution").innerText=`Resolution: ${i.resolution.x} x ${i.resolution.y}`,pt(),Te=new g.Vector(0,-i.params.simulation.poolSize.z/2+1),i.water.reset(i.resolution),Z.flagCenter=Te,Z.flagSize=Ge,Z.reset();const o=i.params.simulation.poolSize.x/si;let e=i.params.simulation.poolSize.x/2-o/2;for(let s of i.swimmers)s.body.center.x=e,s.startingPoint.x=e,e-=o}function ai(o){const e=parseFloat(o.target.value);isNaN(e)||(i.setRaceTime(e),i.swimmers.forEach(s=>s.setCurrentDataIndex()))}window.onload=function(){var o=window.devicePixelRatio||1,e=document.getElementById("help");function s(){var r=innerWidth,c=innerHeight;C.canvas.width=r*o,C.canvas.height=c*o,C.canvas.style.width=r+"px",C.canvas.style.height=c+"px",C.viewport(0,0,C.canvas.width,C.canvas.height),C.matrixMode(C.PROJECTION),C.loadIdentity(),C.perspective(i.params.fov,C.canvas.width/C.canvas.height,.01,100),C.matrixMode(C.MODELVIEW),i.resetDrawingTexture(),t()}document.body.appendChild(C.canvas),C.canvas.oncontextmenu=function(r){r.preventDefault()},C.clearColor(0,0,0,1),Te=new g.Vector(0,-i.params.simulation.poolSize.z/2+1),Ge=.7;const l=document.getElementById("time-slider");l&&l.addEventListener("input",ai);const d=document.getElementById("drop-zone");let u=0;document.addEventListener("dragenter",r=>{u++,d.style.display="flex"}),document.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="copy"}),document.addEventListener("dragleave",r=>{u--,u===0&&(d.style.display="none")}),Jt(C,me),i._reset=me,setTimeout(()=>{Qt("event-editor")},50),Z=new de(C,i.water,Te,Ge),Le=new We({xneg:document.getElementById("xneg"),xpos:document.getElementById("xpos"),yneg:document.getElementById("ypos"),ypos:document.getElementById("ypos"),zneg:document.getElementById("zneg"),zpos:document.getElementById("zpos")},C);const p=new G(new g.Vector(0,0,0));if(i.swimmers.push(p),i.water=new ne(i.gl),!i.water.textureA.canDrawTo()||!i.water.textureB.canDrawTo())throw new Error("Rendering to floating-point textures is required but not supported");me();for(var T=0;T<20;T++)i.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,T&1?.01:-.01);document.getElementById("loading").innerHTML="",s();var A=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(r){setTimeout(r,0)},D=new Date().getTime();function S(){var r=new Date().getTime();i.paused||(n((r-D)/1e3),t()),D=r,A(S)}A(S),window.onresize=s;var w,P,I,x=-1,R=0,z=1,V=2;const O=3;var U,k;function B(r,c,h){if(U=r,k=c,!h||h.button===0){var m=new g.Raytracer,f=m.getRayForPixel(r*o,c*o),b=m.eye.add(f.multiply(-m.eye.y/f.y));for(let v of i.swimmers){var y=g.Raytracer.hitTestSphere(m.eye,f,v.body.center,v.body.radius);if(y){x=z,I=v,v.body.cinematic=!0,w=y.hit,P=m.getRayForPixel(C.canvas.width/2,C.canvas.height/2).negative();return}}Math.abs(b.x)<i.params.simulation.poolSize.x/2&&Math.abs(b.z)<i.params.simulation.poolSize.z/2&&(x=R,q(r,c))}else h.button===2?x=V:h.button===1&&(x=O)}function q(r,c,h){switch(x){case R:{var m=new g.Raytracer,f=m.getRayForPixel(r*o,c*o),b=m.eye.add(f.multiply(-m.eye.y/f.y));i.water.addDrop(b.x/i.params.simulation.poolSize.x*2,b.z/i.params.simulation.poolSize.z*2,.06,.03),i.paused&&(i.water.updateNormals(),Z.updateCaustics(i.water));break}case z:{var m=new g.Raytracer,f=m.getRayForPixel(r*o,c*o),y=-P.dot(m.eye.subtract(w))/P.dot(f),v=m.eye.add(f.multiply(y));const F=I.body.center.add(v.subtract(w)),L=I.body.radius,X=Math.max(L-i.params.simulation.poolSize.x/2,Math.min(i.params.simulation.poolSize.x/2-L,F.x)),W=Math.max(L-i.params.simulation.poolSize.y,Math.min(10,F.y)),J=Math.max(L-i.params.simulation.poolSize.z/2,Math.min(i.params.simulation.poolSize.z/2-L,F.z));I.body.move(new g.Vector(X,W,J)),w=v,i.paused&&Z.updateCaustics(i.water);break}case V:{if(h&&h.shiftKey){i.angleZ-=r-U,i.angleZ=Math.max(-89.999,Math.min(89.999,i.angleZ));break}i.angleY-=r-U,i.angleX-=c-k,i.angleX=Math.max(-89.999,Math.min(89.999,i.angleX));break}case O:{const E=.001*i.zoomDistance;i.translateX+=E*(r-U),i.translateY-=E*(c-k)}}U=r,k=c,i.paused&&t()}function te(){x=-1,I&&(I.body.cinematic=!G.useGravity)}function N(r){return r===e||r.parentNode&&N(r.parentNode)}function H(r){return r&&(r.id==="event-editor"||r.parentNode&&H(r.parentNode))}function Y(r){i.zoomDistance*=1-r*2e-4,i.zoomDistance=Math.max(2,Math.min(1e3,i.zoomDistance)),i.paused&&t()}addEventListener("wheel",function(r){if(!H(r.target)){var c=r.deltaY;Y(-c)}}),document.onmousedown=function(r){C.canvas.focus(),N(r.target)||B(r.pageX,r.pageY,r)},document.onmousemove=function(r){q(r.pageX,r.pageY,r)},document.onmouseup=function(){te()},document.ontouchstart=function(r){r.touches.length===1&&!N(r.target)&&(r.preventDefault(),B(r.touches[0].pageX,r.touches[0].pageY,!1))},document.ontouchmove=function(r){r.touches.length===1&&q(r.touches[0].pageX,r.touches[0].pageY)},document.ontouchend=function(r){r.touches.length==0&&te()};function j(){i.paused?i.play():i.pause()}const _=async function(r){if(r.which==32)j();else if(r.which==71)i.useGravity(!G.useGravity);else if(r.which==76&&i.paused)t();else if(r.which==74)i.swimmers.forEach(c=>c.jump(2));else if(r.which==67)i.params.visualizations.areaConservationEnabled=!i.params.visualizations.areaConservationEnabled,pt(),console.log("Area conservation "+(i.params.visualizations.areaConservationEnabled?"enabled.":"disabled."));else if(r.which==80)i.water.showProjectionGrid=!i.water.showProjectionGrid,console.log("Projection grid "+(i.water.showProjectionGrid?"enabled.":"disabled."));else if(r.which==65)i.water.showAreaConservedGrid=!i.water.showAreaConservedGrid,console.log("Area conserved grid "+(i.water.showAreaConservedGrid?"enabled.":"disabled."));else if(r.which==83){if(G.swimming=!G.swimming,G.swimming)for(let c of i.swimmers)c.swim(!0);else stopRace();console.log("Swimming "+(G.swimming?"enabled.":"disabled."))}else r.which==86?i.params.video.show=!i.params.video.show:r.which==72?(document.getElementById("commands").hidden=!document.getElementById("commands").hidden,document.getElementById("h").hidden=!document.getElementById("h").hidden):r.which==68?i.playingDemo?i.stopDemo():await i.launchDemo():r.which==81?i.chronoPhotography({}):r.which==82?(i.setScene("100m freestyle").then(()=>i.startRace()),i._setPannelMinimized(!0)):r.which==75?i.recalibrate():r.which==40?(i.resolution.x>129&&(i.resolution.x=Math.round(i.resolution.x/2)),me(),console.log("decreasing x resolution")):r.which==38?(i.resolution.x<16384&&(i.resolution.x=Math.round(i.resolution.x*2)),me(),console.log("increasing x resolution")):r.which==37?(i.resolution.y>129&&(i.resolution.y=Math.round(i.resolution.y/2)),me(),console.log("decreasing y resolution")):r.which==39&&(i.resolution.y<16384&&(i.resolution.y=Math.round(i.resolution.y*2)),me(),console.log("increasing y resolution"))};C.canvas.addEventListener("keydown",_);function n(r){if(!(r>1)){if(x==z)for(let c of i.swimmers)c.body.velocity=new g.Vector(0,0,0);C.clearColor(0,0,0,1),C.bindFramebuffer(C.FRAMEBUFFER,null),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT);for(let c of i.swimmers)c.update(r);i.updateFloaters(r),i.water.updateSpheres(r);for(let c=0;c<i.params.numSteps;c++)i.water.stepSimulation(r);Z.updateCaustics(i.water),i.updateTime(r),i.updateParams(),l.value=i.getRaceTime(),ni(r),i.updateDemo(r),i.splashParticles.update(r)}}function a(){if(!G.raceHasStarted||!i.params.cornerView.show)return;i.cornerView=!0,C.loadIdentity(),C.translate(0,0,-35),C.rotate(90,1,0,0),C.rotate(-90,0,1,0),C.translate(0,.5,0);const r=C.canvas.height/3,c=16*r/9,h=0,m=C.canvas.height-r;C.viewport(h,m,c,r),Z.renderWater(i.water,Le,i.params.visualizations.shadow),i.isSceneSynchronizedSwimming()&&(i.params.visualizations.showStreaks||i.params.simulation.splashes.enabled)&&i.splashParticles.draw({}),Z.renderSpheres(i.water),C.viewport(0,0,C.canvas.width,C.canvas.height),C.loadIdentity(),C.translate(i.translateX,i.translateY,-i.zoomDistance),C.rotate(-i.angleZ,0,0,1),C.rotate(-i.angleX,1,0,0),C.rotate(-i.angleY,0,1,0),C.translate(0,.5,0),i.cornerView=!1}function t(){g.keys.L&&(Z.lightDir=g.Vector.fromAngles((90-i.angleY)*Math.PI/180,-i.angleX*Math.PI/180),i.paused&&Z.updateCaustics(i.water)),i.isOneVisualizationEnabled()&&G.updateAttributesTexture(),i.water.addOrRemoveVisualizationWaves(!0),i.water.updateNormals(),C.clearColor(.1,.2,.5,1),C.bindFramebuffer(C.FRAMEBUFFER,i.drawingFrameBuffer),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT),C.loadIdentity(),C.translate(i.translateX,i.translateY,-i.zoomDistance),C.rotate(-i.angleZ,0,0,1),C.rotate(-i.angleX,1,0,0),C.rotate(-i.angleY,0,1,0),C.translate(0,.5,0),C.enable(C.DEPTH_TEST),C.disable(C.BLEND),C.viewport(0,0,C.canvas.width,C.canvas.height),Z.sphereCenter=i.swimmers[0].body.center,Z.sphereRadius=i.swimmers[0].body.radius,Z.renderCube(i.water),Z.renderWater(i.water,Le,i.params.visualizations.shadow),Z.renderSpheres(i.water),C.disable(C.DEPTH_TEST);const r={};(i.params.visualizations.showStreaks||i.params.simulation.splashes.enabled)&&i.splashParticles.draw(r),i.renderVideo(),i.params.chronoPhotography.available&&ii(),a(),i.water.addOrRemoveVisualizationWaves(!1)}};
//# sourceMappingURL=swimming-2OXRT7Cu.js.map
