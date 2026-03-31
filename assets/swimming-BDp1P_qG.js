var ut=Object.defineProperty;var Ge=o=>{throw TypeError(o)};var mt=(o,e,i)=>e in o?ut(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var te=(o,e,i)=>mt(o,typeof e!="symbol"?e+"":e,i),ft=(o,e,i)=>e.has(o)||Ge("Cannot "+i);var ye=(o,e,i)=>e.has(o)?Ge("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,i);var Z=(o,e,i)=>(ft(o,e,"access private method"),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const m of d)if(m.type==="childList")for(const p of m.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function i(d){const m={};return d.integrity&&(m.integrity=d.integrity),d.referrerPolicy&&(m.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?m.credentials="include":d.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function l(d){if(d.ep)return;d.ep=!0;const m=i(d);fetch(d.href,m)}})();var v=function(){var o,e={create:function(s){s=s||{};var n=document.createElement("canvas");n.width=800,n.height=600,"alpha"in s||(s.alpha=!1);try{o=n.getContext("webgl2",s)}catch{}try{o=o||n.getContext("experimental-webgl",s)}catch{}if(!o)throw new Error("WebGL not supported");return o.HALF_FLOAT_OES=36193,i(),l(),d(),R(),o},keys:{},Matrix:x,Indexer:P,Buffer:k,Mesh:w,HitTest:N,Raytracer:V,Shader:B,Texture:I,Vector:_};function i(){o.MODELVIEW=L|1,o.PROJECTION=L|2;var s=new x,n=new x;o.modelviewMatrix=new x,o.projectionMatrix=new x;var t=[],r=[],c,h;o.matrixMode=function(u){switch(u){case o.MODELVIEW:c="modelviewMatrix",h=t;break;case o.PROJECTION:c="projectionMatrix",h=r;break;default:throw new Error("invalid matrix mode "+u)}},o.loadIdentity=function(){x.identity(o[c])},o.loadMatrix=function(u){for(var f=u.m,b=o[c].m,y=0;y<16;y++)b[y]=f[y]},o.multMatrix=function(u){o.loadMatrix(x.multiply(o[c],u,n))},o.perspective=function(u,f,b,y){o.multMatrix(x.perspective(u,f,b,y,s))},o.frustum=function(u,f,b,y,g,E){o.multMatrix(x.frustum(u,f,b,y,g,E,s))},o.ortho=function(u,f,b,y,g,E){o.multMatrix(x.ortho(u,f,b,y,g,E,s))},o.scale=function(u,f,b){o.multMatrix(x.scale(u,f,b,s))},o.translate=function(u,f,b){o.multMatrix(x.translate(u,f,b,s))},o.rotate=function(u,f,b,y){o.multMatrix(x.rotate(u,f,b,y,s))},o.lookAt=function(u,f,b,y,g,E,M,F,D){o.multMatrix(x.lookAt(u,f,b,y,g,E,M,F,D,s))},o.pushMatrix=function(){h.push(Array.prototype.slice.call(o[c].m))},o.popMatrix=function(){var u=h.pop();o[c].m=T?new Float32Array(u):u},o.project=function(u,f,b,y,g,E){y=y||o.modelviewMatrix,g=g||o.projectionMatrix,E=E||o.getParameter(o.VIEWPORT);var M=g.transformPoint(y.transformPoint(new _(u,f,b)));return new _(E[0]+E[2]*(M.x*.5+.5),E[1]+E[3]*(M.y*.5+.5),M.z*.5+.5)},o.unProject=function(u,f,b,y,g,E){y=y||o.modelviewMatrix,g=g||o.projectionMatrix,E=E||o.getParameter(o.VIEWPORT);var M=new _((u-E[0])/E[2]*2-1,(f-E[1])/E[3]*2-1,b*2-1);return x.inverse(x.multiply(g,y,s),n).transformPoint(M)},o.matrixMode(o.MODELVIEW)}function l(){var s={mesh:new w({coords:!0,colors:!0,triangles:!1}),mode:-1,coord:[0,0,0,0],color:[1,1,1,1],shader:new B("      uniform float pointSize;      out vec4 color;      out vec4 coord;      void main() {        color = gl_Color;        coord = gl_TexCoord;        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;        gl_PointSize = pointSize;      }    ","      uniform sampler2D tex;      uniform float pointSize;      uniform bool useTexture;      in vec4 color;      in vec4 coord;      out vec4 fragColor;      void main() {        fragColor = color;        if (useTexture) fragColor *= texture(tex, coord.xy);      }    ")};o.pointSize=function(n){s.shader.uniforms({pointSize:n})},o.begin=function(n){if(s.mode!=-1)throw new Error("mismatched gl.begin() and gl.end() calls");s.mode=n,s.mesh.colors=[],s.mesh.coords=[],s.mesh.vertices=[]},o.color=function(n,t,r,c){s.color=arguments.length==1?n.toArray().concat(1):[n,t,r,c||1]},o.texCoord=function(n,t){s.coord=arguments.length==1?n.toArray(2):[n,t]},o.vertex=function(n,t,r){s.mesh.colors.push(s.color),s.mesh.coords.push(s.coord),s.mesh.vertices.push(arguments.length==1?n.toArray():[n,t,r])},o.end=function(){if(s.mode==-1)throw new Error("mismatched gl.begin() and gl.end() calls");s.mesh.compile(),s.shader.uniforms({useTexture:!!o.getParameter(o.TEXTURE_BINDING_2D)}).draw(s.mesh,s.mode),s.mode=-1}}function d(){var s=o,n=0,t=0,r={},c=!1,h=Object.prototype.hasOwnProperty;function u(){for(var F in r)if(h.call(r,F)&&r[F])return!0;return!1}function f(F){var D={};for(var X in F)typeof F[X]=="function"?D[X]=function(J){return function(){J.apply(F,arguments)}}(F[X]):D[X]=F[X];D.original=F,D.x=D.pageX,D.y=D.pageY;for(var W=o.canvas;W;W=W.offsetParent)D.x-=W.offsetLeft,D.y-=W.offsetTop;return c?(D.deltaX=D.x-n,D.deltaY=D.y-t):(D.deltaX=0,D.deltaY=0,c=!0),n=D.x,t=D.y,D.dragging=u(),D.preventDefault=function(){D.original.preventDefault()},D.stopPropagation=function(){D.original.stopPropagation()},D}function b(F){o=s,u()||(p(document,"mousemove",y),p(document,"mouseup",g),A(o.canvas,"mousemove",y),A(o.canvas,"mouseup",g)),r[F.which]=!0,F=f(F),o.onmousedown&&o.onmousedown(F),F.preventDefault()}function y(F){o=s,F=f(F),o.onmousemove&&o.onmousemove(F),F.preventDefault()}function g(F){o=s,r[F.which]=!1,u()||(A(document,"mousemove",y),A(document,"mouseup",g),p(o.canvas,"mousemove",y),p(o.canvas,"mouseup",g)),F=f(F),o.onmouseup&&o.onmouseup(F),F.preventDefault()}function E(){c=!1}function M(){r={},c=!1}p(o.canvas,"mousedown",b),p(o.canvas,"mousemove",y),p(o.canvas,"mouseup",g),p(o.canvas,"mouseover",E),p(o.canvas,"mouseout",E),p(document,"contextmenu",M)}function m(s){var n={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};return n[s]||(s>=65&&s<=90?String.fromCharCode(s):null)}function p(s,n,t){s.addEventListener(n,t)}function A(s,n,t){s.removeEventListener(n,t)}p(document,"keydown",function(s){if(!s.altKey&&!s.ctrlKey&&!s.metaKey){var n=m(s.keyCode);n&&(e.keys[n]=!0),e.keys[s.keyCode]=!0}}),p(document,"keyup",function(s){if(!s.altKey&&!s.ctrlKey&&!s.metaKey){var n=m(s.keyCode);n&&(e.keys[n]=!1),e.keys[s.keyCode]=!1}});function R(){(function(s){o.makeCurrent=function(){o=s}})(o),o.animate=function(){var s=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(c){setTimeout(c,16.666666666666668)},n=new Date().getTime(),t=o;function r(){o=t;var c=new Date().getTime();o.onupdate&&o.onupdate((c-n)/1e3),o.ondraw&&o.ondraw(),s(r),n=c}r()},o.fullscreen=function(s){s=s||{};var n=s.paddingTop||0,t=s.paddingLeft||0,r=s.paddingRight||0,c=s.paddingBottom||0;if(!document.body)throw new Error("document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)");document.body.appendChild(o.canvas),document.body.style.overflow="hidden",o.canvas.style.position="absolute",o.canvas.style.left=t+"px",o.canvas.style.top=n+"px";function h(){o.canvas.width=window.innerWidth-t-r,o.canvas.height=window.innerHeight-n-c,o.viewport(0,0,o.canvas.width,o.canvas.height),(s.camera||!("camera"in s))&&(o.matrixMode(o.PROJECTION),o.loadIdentity(),o.perspective(s.fov||45,o.canvas.width/o.canvas.height,s.near||.1,s.far||1e3),o.matrixMode(o.MODELVIEW)),o.ondraw&&o.ondraw()}p(window,"resize",h),h()}}var L=305397760,T=typeof Float32Array<"u";function x(){var s=Array.prototype.concat.apply([],arguments);s.length||(s=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.m=T?new Float32Array(s):s}x.prototype={inverse:function(){return x.inverse(this,new x)},transpose:function(){return x.transpose(this,new x)},multiply:function(s){return x.multiply(this,s,new x)},transformPoint:function(s){var n=this.m;return new _(n[0]*s.x+n[1]*s.y+n[2]*s.z+n[3],n[4]*s.x+n[5]*s.y+n[6]*s.z+n[7],n[8]*s.x+n[9]*s.y+n[10]*s.z+n[11]).divide(n[12]*s.x+n[13]*s.y+n[14]*s.z+n[15])},transformVector:function(s){var n=this.m;return new _(n[0]*s.x+n[1]*s.y+n[2]*s.z,n[4]*s.x+n[5]*s.y+n[6]*s.z,n[8]*s.x+n[9]*s.y+n[10]*s.z)}},x.inverse=function(s,n){n=n||new x;var t=s.m,r=n.m;r[0]=t[5]*t[10]*t[15]-t[5]*t[14]*t[11]-t[6]*t[9]*t[15]+t[6]*t[13]*t[11]+t[7]*t[9]*t[14]-t[7]*t[13]*t[10],r[1]=-t[1]*t[10]*t[15]+t[1]*t[14]*t[11]+t[2]*t[9]*t[15]-t[2]*t[13]*t[11]-t[3]*t[9]*t[14]+t[3]*t[13]*t[10],r[2]=t[1]*t[6]*t[15]-t[1]*t[14]*t[7]-t[2]*t[5]*t[15]+t[2]*t[13]*t[7]+t[3]*t[5]*t[14]-t[3]*t[13]*t[6],r[3]=-t[1]*t[6]*t[11]+t[1]*t[10]*t[7]+t[2]*t[5]*t[11]-t[2]*t[9]*t[7]-t[3]*t[5]*t[10]+t[3]*t[9]*t[6],r[4]=-t[4]*t[10]*t[15]+t[4]*t[14]*t[11]+t[6]*t[8]*t[15]-t[6]*t[12]*t[11]-t[7]*t[8]*t[14]+t[7]*t[12]*t[10],r[5]=t[0]*t[10]*t[15]-t[0]*t[14]*t[11]-t[2]*t[8]*t[15]+t[2]*t[12]*t[11]+t[3]*t[8]*t[14]-t[3]*t[12]*t[10],r[6]=-t[0]*t[6]*t[15]+t[0]*t[14]*t[7]+t[2]*t[4]*t[15]-t[2]*t[12]*t[7]-t[3]*t[4]*t[14]+t[3]*t[12]*t[6],r[7]=t[0]*t[6]*t[11]-t[0]*t[10]*t[7]-t[2]*t[4]*t[11]+t[2]*t[8]*t[7]+t[3]*t[4]*t[10]-t[3]*t[8]*t[6],r[8]=t[4]*t[9]*t[15]-t[4]*t[13]*t[11]-t[5]*t[8]*t[15]+t[5]*t[12]*t[11]+t[7]*t[8]*t[13]-t[7]*t[12]*t[9],r[9]=-t[0]*t[9]*t[15]+t[0]*t[13]*t[11]+t[1]*t[8]*t[15]-t[1]*t[12]*t[11]-t[3]*t[8]*t[13]+t[3]*t[12]*t[9],r[10]=t[0]*t[5]*t[15]-t[0]*t[13]*t[7]-t[1]*t[4]*t[15]+t[1]*t[12]*t[7]+t[3]*t[4]*t[13]-t[3]*t[12]*t[5],r[11]=-t[0]*t[5]*t[11]+t[0]*t[9]*t[7]+t[1]*t[4]*t[11]-t[1]*t[8]*t[7]-t[3]*t[4]*t[9]+t[3]*t[8]*t[5],r[12]=-t[4]*t[9]*t[14]+t[4]*t[13]*t[10]+t[5]*t[8]*t[14]-t[5]*t[12]*t[10]-t[6]*t[8]*t[13]+t[6]*t[12]*t[9],r[13]=t[0]*t[9]*t[14]-t[0]*t[13]*t[10]-t[1]*t[8]*t[14]+t[1]*t[12]*t[10]+t[2]*t[8]*t[13]-t[2]*t[12]*t[9],r[14]=-t[0]*t[5]*t[14]+t[0]*t[13]*t[6]+t[1]*t[4]*t[14]-t[1]*t[12]*t[6]-t[2]*t[4]*t[13]+t[2]*t[12]*t[5],r[15]=t[0]*t[5]*t[10]-t[0]*t[9]*t[6]-t[1]*t[4]*t[10]+t[1]*t[8]*t[6]+t[2]*t[4]*t[9]-t[2]*t[8]*t[5];for(var c=t[0]*r[0]+t[1]*r[4]+t[2]*r[8]+t[3]*r[12],h=0;h<16;h++)r[h]/=c;return n},x.transpose=function(s,n){n=n||new x;var t=s.m,r=n.m;return r[0]=t[0],r[1]=t[4],r[2]=t[8],r[3]=t[12],r[4]=t[1],r[5]=t[5],r[6]=t[9],r[7]=t[13],r[8]=t[2],r[9]=t[6],r[10]=t[10],r[11]=t[14],r[12]=t[3],r[13]=t[7],r[14]=t[11],r[15]=t[15],n},x.multiply=function(s,n,t){t=t||new x;var r=s.m,c=n.m,h=t.m;return h[0]=r[0]*c[0]+r[1]*c[4]+r[2]*c[8]+r[3]*c[12],h[1]=r[0]*c[1]+r[1]*c[5]+r[2]*c[9]+r[3]*c[13],h[2]=r[0]*c[2]+r[1]*c[6]+r[2]*c[10]+r[3]*c[14],h[3]=r[0]*c[3]+r[1]*c[7]+r[2]*c[11]+r[3]*c[15],h[4]=r[4]*c[0]+r[5]*c[4]+r[6]*c[8]+r[7]*c[12],h[5]=r[4]*c[1]+r[5]*c[5]+r[6]*c[9]+r[7]*c[13],h[6]=r[4]*c[2]+r[5]*c[6]+r[6]*c[10]+r[7]*c[14],h[7]=r[4]*c[3]+r[5]*c[7]+r[6]*c[11]+r[7]*c[15],h[8]=r[8]*c[0]+r[9]*c[4]+r[10]*c[8]+r[11]*c[12],h[9]=r[8]*c[1]+r[9]*c[5]+r[10]*c[9]+r[11]*c[13],h[10]=r[8]*c[2]+r[9]*c[6]+r[10]*c[10]+r[11]*c[14],h[11]=r[8]*c[3]+r[9]*c[7]+r[10]*c[11]+r[11]*c[15],h[12]=r[12]*c[0]+r[13]*c[4]+r[14]*c[8]+r[15]*c[12],h[13]=r[12]*c[1]+r[13]*c[5]+r[14]*c[9]+r[15]*c[13],h[14]=r[12]*c[2]+r[13]*c[6]+r[14]*c[10]+r[15]*c[14],h[15]=r[12]*c[3]+r[13]*c[7]+r[14]*c[11]+r[15]*c[15],t},x.identity=function(s){s=s||new x;var n=s.m;return n[0]=n[5]=n[10]=n[15]=1,n[1]=n[2]=n[3]=n[4]=n[6]=n[7]=n[8]=n[9]=n[11]=n[12]=n[13]=n[14]=0,s},x.perspective=function(s,n,t,r,c){var h=Math.tan(s*Math.PI/360)*t,u=h*n;return x.frustum(-u,u,-h,h,t,r,c)},x.frustum=function(s,n,t,r,c,h,u){u=u||new x;var f=u.m;return f[0]=2*c/(n-s),f[1]=0,f[2]=(n+s)/(n-s),f[3]=0,f[4]=0,f[5]=2*c/(r-t),f[6]=(r+t)/(r-t),f[7]=0,f[8]=0,f[9]=0,f[10]=-(h+c)/(h-c),f[11]=-2*h*c/(h-c),f[12]=0,f[13]=0,f[14]=-1,f[15]=0,u},x.ortho=function(s,n,t,r,c,h,u){u=u||new x;var f=u.m;return f[0]=2/(n-s),f[1]=0,f[2]=0,f[3]=-(n+s)/(n-s),f[4]=0,f[5]=2/(r-t),f[6]=0,f[7]=-(r+t)/(r-t),f[8]=0,f[9]=0,f[10]=-2/(h-c),f[11]=-(h+c)/(h-c),f[12]=0,f[13]=0,f[14]=0,f[15]=1,u},x.scale=function(s,n,t,r){r=r||new x;var c=r.m;return c[0]=s,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=n,c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=t,c[11]=0,c[12]=0,c[13]=0,c[14]=0,c[15]=1,r},x.translate=function(s,n,t,r){r=r||new x;var c=r.m;return c[0]=1,c[1]=0,c[2]=0,c[3]=s,c[4]=0,c[5]=1,c[6]=0,c[7]=n,c[8]=0,c[9]=0,c[10]=1,c[11]=t,c[12]=0,c[13]=0,c[14]=0,c[15]=1,r},x.rotate=function(s,n,t,r,c){if(!s||!n&&!t&&!r)return x.identity(c);c=c||new x;var h=c.m,u=Math.sqrt(n*n+t*t+r*r);s*=Math.PI/180,n/=u,t/=u,r/=u;var f=Math.cos(s),b=Math.sin(s),y=1-f;return h[0]=n*n*y+f,h[1]=n*t*y-r*b,h[2]=n*r*y+t*b,h[3]=0,h[4]=t*n*y+r*b,h[5]=t*t*y+f,h[6]=t*r*y-n*b,h[7]=0,h[8]=r*n*y-t*b,h[9]=r*t*y+n*b,h[10]=r*r*y+f,h[11]=0,h[12]=0,h[13]=0,h[14]=0,h[15]=1,c},x.lookAt=function(s,n,t,r,c,h,u,f,b,y){y=y||new x;var g=y.m,E=new _(s,n,t),M=new _(r,c,h),F=new _(u,f,b),D=E.subtract(M).unit(),X=F.cross(D).unit(),W=D.cross(X).unit();return g[0]=X.x,g[1]=X.y,g[2]=X.z,g[3]=-X.dot(E),g[4]=W.x,g[5]=W.y,g[6]=W.z,g[7]=-W.dot(E),g[8]=D.x,g[9]=D.y,g[10]=D.z,g[11]=-D.dot(E),g[12]=0,g[13]=0,g[14]=0,g[15]=1,y};function P(){this.unique=[],this.indices=[],this.map={}}P.prototype={add:function(s){var n=JSON.stringify(s);return n in this.map||(this.map[n]=this.unique.length,this.unique.push(s)),this.map[n]}};function k(s,n){this.buffer=null,this.target=s,this.type=n,this.data=[]}k.prototype={compile:function(s){for(var n=[],t=0,r=1e4;t<this.data.length;t+=r)n=Array.prototype.concat.apply(n,this.data.slice(t,t+r));var c=this.data.length?n.length/this.data.length:0;if(c!=Math.round(c))throw new Error("buffer elements not of consistent size, average size is "+c);this.buffer=this.buffer||o.createBuffer(),this.buffer.length=n.length,this.buffer.spacing=c,o.bindBuffer(this.target,this.buffer),o.bufferData(this.target,new this.type(n),s||o.STATIC_DRAW)}};function w(s){s=s||{},this.vertexBuffers={},this.indexBuffers={},this.addVertexBuffer("vertices","gl_Vertex"),s.coords&&this.addVertexBuffer("coords","gl_TexCoord"),s.normals&&this.addVertexBuffer("normals","gl_Normal"),s.colors&&this.addVertexBuffer("colors","gl_Color"),(!("triangles"in s)||s.triangles)&&this.addIndexBuffer("triangles"),s.lines&&this.addIndexBuffer("lines")}w.prototype={addVertexBuffer:function(s,n){var t=this.vertexBuffers[n]=new k(o.ARRAY_BUFFER,Float32Array);t.name=s,this[s]=[]},addIndexBuffer:function(s){this.indexBuffers[s]=new k(o.ELEMENT_ARRAY_BUFFER,Uint16Array),this[s]=[]},compile:function(){for(var s in this.vertexBuffers){var n=this.vertexBuffers[s];n.data=this[n.name],n.compile()}for(var t in this.indexBuffers){var n=this.indexBuffers[t];n.data=this[t],n.compile()}},transform:function(s){if(this.vertices=this.vertices.map(function(t){return s.transformPoint(_.fromArray(t)).toArray()}),this.normals){var n=s.inverse().transpose();this.normals=this.normals.map(function(t){return n.transformVector(_.fromArray(t)).unit().toArray()})}return this.compile(),this},computeNormals:function(){this.normals||this.addVertexBuffer("normals","gl_Normal");for(var s=0;s<this.vertices.length;s++)this.normals[s]=new _;for(var s=0;s<this.triangles.length;s++){var n=this.triangles[s],t=_.fromArray(this.vertices[n[0]]),r=_.fromArray(this.vertices[n[1]]),c=_.fromArray(this.vertices[n[2]]),h=r.subtract(t).cross(c.subtract(t)).unit();this.normals[n[0]]=this.normals[n[0]].add(h),this.normals[n[1]]=this.normals[n[1]].add(h),this.normals[n[2]]=this.normals[n[2]].add(h)}for(var s=0;s<this.vertices.length;s++)this.normals[s]=this.normals[s].unit().toArray();return this.compile(),this},computeWireframe:function(){for(var s=new P,n=0;n<this.triangles.length;n++)for(var t=this.triangles[n],r=0;r<t.length;r++){var c=t[r],h=t[(r+1)%t.length];s.add([Math.min(c,h),Math.max(c,h)])}return this.lines||this.addIndexBuffer("lines"),this.lines=s.unique,this.compile(),this},getAABB:function(){var s={min:new _(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};s.max=s.min.negative();for(var n=0;n<this.vertices.length;n++){var t=_.fromArray(this.vertices[n]);s.min=_.min(s.min,t),s.max=_.max(s.max,t)}return s},getBoundingSphere:function(){for(var s=this.getAABB(),n={center:s.min.add(s.max).divide(2),radius:0},t=0;t<this.vertices.length;t++)n.radius=Math.max(n.radius,_.fromArray(this.vertices[t]).subtract(n.center).length());return n}},w.plane=function(s){s=s||{};for(var n=new w(s),t=s.detailX||s.detail||1,r=s.detailY||s.detail||1,c=s.width||2,h=s.height||2,u=0;u<=r;u++)for(var f=u/r,b=0;b<=t;b++){var y=b/t;if(n.vertices.push([(y-.5)*c,(f-.5)*h,0]),n.coords&&n.coords.push([y,f]),n.normals&&n.normals.push([0,0,1]),b<t&&u<r){var g=b+u*(t+1);n.triangles.push([g,g+1,g+t+1]),n.triangles.push([g+t+1,g+1,g+t+2])}}return n.compile(),n};var S=[[0,4,2,6,-1,0,0],[1,3,5,7,1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,1]];function z(s){return new _((s&1)*2-1,(s&2)-1,(s&4)/2-1)}w.cube=function(s){for(var n=new w(s),t=s&&s.width||2,r=s&&s.height||2,c=s&&s.depth||2,h=0;h<S.length;h++){for(var u=S[h],f=h*4,b=0;b<4;b++){var y=u[b];const g=z(y).toArray();g[0]*=t/2,g[1]*=r/2,g[2]*=c/2,n.vertices.push(g),n.coords&&n.coords.push([b&1,(b&2)/2]),n.normals&&n.normals.push(u.slice(4,7))}n.triangles.push([f,f+1,f+2]),n.triangles.push([f+2,f+1,f+3])}return n.compile(),n},w.sphere=function(s){function n(W,J,re){return b?[W,re,J]:[W,J,re]}function t(W){return W+(W-W*W)/2}s=s||{};for(var r=new w(s),c=new P,h=s.detail||6,u=0;u<8;u++)for(var f=z(u),b=f.x*f.y*f.z>0,y=[],g=0;g<=h;g++){for(var E=0;g+E<=h;E++){var M=g/h,F=E/h,D=(h-g-E)/h,X={vertex:new _(t(M),t(F),t(D)).unit().multiply(f).toArray()};r.coords&&(X.coord=f.y>0?[1-M,D]:[D,1-M]),y.push(c.add(X))}if(g>0)for(var E=0;g+E<=h;E++){var M=(g-1)*(h+1)+(g-1-(g-1)*(g-1))/2+E,F=g*(h+1)+(g-g*g)/2+E;r.triangles.push(n(y[M],y[M+1],y[F])),g+E<h&&r.triangles.push(n(y[F],y[M+1],y[F+1]))}}return r.vertices=c.unique.map(function(W){return W.vertex}),r.coords&&(r.coords=c.unique.map(function(W){return W.coord})),r.normals&&(r.normals=r.vertices),r.compile(),r},w.load=function(s,n){n=n||{},"coords"in n||(n.coords=!!s.coords),"normals"in n||(n.normals=!!s.normals),"colors"in n||(n.colors=!!s.colors),"triangles"in n||(n.triangles=!!s.triangles),"lines"in n||(n.lines=!!s.lines);var t=new w(n);return t.vertices=s.vertices,t.coords&&(t.coords=s.coords),t.normals&&(t.normals=s.normals),t.colors&&(t.colors=s.colors),t.triangles&&(t.triangles=s.triangles),t.lines&&(t.lines=s.lines),t.compile(),t};function N(s,n,t){this.t=arguments.length?s:Number.MAX_VALUE,this.hit=n,this.normal=t}N.prototype={mergeWith:function(s){s.t>0&&s.t<this.t&&(this.t=s.t,this.hit=s.hit,this.normal=s.normal)}};function V(){var s=o.getParameter(o.VIEWPORT),n=o.modelviewMatrix.m,t=new _(n[0],n[4],n[8]),r=new _(n[1],n[5],n[9]),c=new _(n[2],n[6],n[10]),h=new _(n[3],n[7],n[11]);this.eye=new _(-h.dot(t),-h.dot(r),-h.dot(c));var u=s[0],f=u+s[2],b=s[1],y=b+s[3];this.ray00=o.unProject(u,b,1).subtract(this.eye),this.ray10=o.unProject(f,b,1).subtract(this.eye),this.ray01=o.unProject(u,y,1).subtract(this.eye),this.ray11=o.unProject(f,y,1).subtract(this.eye),this.viewport=s}V.prototype={getRayForPixel:function(s,n){s=(s-this.viewport[0])/this.viewport[2],n=1-(n-this.viewport[1])/this.viewport[3];var t=_.lerp(this.ray00,this.ray10,s),r=_.lerp(this.ray01,this.ray11,s);return _.lerp(t,r,n).unit()}},V.hitTestBox=function(s,n,t,r){var c=t.subtract(s).divide(n),h=r.subtract(s).divide(n),u=_.min(c,h),f=_.max(c,h),b=u.max(),y=f.min();if(b>0&&b<y){var g=1e-6,E=s.add(n.multiply(b));return t=t.add(g),r=r.subtract(g),new N(b,E,new _((E.x>r.x)-(E.x<t.x),(E.y>r.y)-(E.y<t.y),(E.z>r.z)-(E.z<t.z)))}return null},V.hitTestSphere=function(s,n,t,r){var c=s.subtract(t),h=n.dot(n),u=2*n.dot(c),f=c.dot(c)-r*r,b=u*u-4*h*f;if(b>0){var y=(-u-Math.sqrt(b))/(2*h),g=s.add(n.multiply(y));return new N(y,g,g.subtract(t).divide(r))}return null},V.hitTestTriangle=function(s,n,t,r,c){var h=r.subtract(t),u=c.subtract(t),f=h.cross(u).unit(),b=f.dot(t.subtract(s))/f.dot(n);if(b>0){var y=s.add(n.multiply(b)),g=y.subtract(t),E=u.dot(u),M=u.dot(h),F=u.dot(g),D=h.dot(h),X=h.dot(g),W=E*D-M*M,J=(D*F-M*X)/W,re=(E*X-M*F)/W;if(J>=0&&re>=0&&J+re<=1)return new N(b,y,f)}return null};function G(s,n,t){let r;for(;(r=s.exec(n))!=null;)t(r)}var O="LIGHTGL";function B(s,n){function t(E){var M=document.getElementById(E);return M?M.text:E}s=t(s),n=t(n);var r="    uniform mat3 gl_NormalMatrix;    uniform mat4 gl_ModelViewMatrix;    uniform mat4 gl_ProjectionMatrix;    uniform mat4 gl_ModelViewProjectionMatrix;    uniform mat4 gl_ModelViewMatrixInverse;    uniform mat4 gl_ProjectionMatrixInverse;    uniform mat4 gl_ModelViewProjectionMatrixInverse;  ",c=`#version 300 es
    `+r+"    in vec4 gl_Vertex;    in vec4 gl_TexCoord;    in vec3 gl_Normal;    in vec4 gl_Color;    vec4 ftransform() {      return gl_ModelViewProjectionMatrix * gl_Vertex;    }  ",h=`#version 300 es
    precision highp float;
  `+r,u=s+n,f={};G(/\b(gl_[^;]*)\b;/g,r,function(E){var M=E[1];if(u.indexOf(M)!=-1){var F=M.replace(/[a-z_]/g,"");f[F]=O+M}}),u.indexOf("ftransform")!=-1&&(f.MVPM=O+"gl_ModelViewProjectionMatrix"),this.usedMatrices=f;function b(E,M){var F={},D=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(M);return M=D?D[1]+E+M.substr(D[1].length):E+M,G(/\bgl_\w+\b/g,E,function(X){X in F||(M=M.replace(new RegExp("\\b"+X+"\\b","g"),O+X),F[X]=!0)}),M}s=b(c,s),n=b(h,n);function y(E,M){var F=o.createShader(E);if(o.shaderSource(F,M),o.compileShader(F),!o.getShaderParameter(F,o.COMPILE_STATUS))throw new Error("compile error: "+o.getShaderInfoLog(F));return F}if(this.program=o.createProgram(),o.attachShader(this.program,y(o.VERTEX_SHADER,s)),o.attachShader(this.program,y(o.FRAGMENT_SHADER,n)),o.linkProgram(this.program),!o.getProgramParameter(this.program,o.LINK_STATUS))throw new Error("link error: "+o.getProgramInfoLog(this.program));this.attributes={},this.uniformLocations={};var g={};G(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,s+n,function(E){g[E[2]]=1}),this.isSampler=g}function j(s){var n=Object.prototype.toString.call(s);return n=="[object Array]"||n=="[object Float32Array]"}function ee(s){var n=Object.prototype.toString.call(s);return n=="[object Number]"||n=="[object Boolean]"}new x,new x,B.prototype={uniforms:function(s){o.useProgram(this.program);for(var n in s){var t=this.uniformLocations[n]||o.getUniformLocation(this.program,n);if(t){this.uniformLocations[n]=t;var r=s[n];if(r instanceof _?r=[r.x,r.y,r.z]:r instanceof x&&(r=r.m),j(r))switch(r.length){case 1:o.uniform1fv(t,new Float32Array(r));break;case 2:o.uniform2fv(t,new Float32Array(r));break;case 3:o.uniform3fv(t,new Float32Array(r));break;case 4:o.uniform4fv(t,new Float32Array(r));break;case 9:o.uniformMatrix3fv(t,!1,new Float32Array([r[0],r[3],r[6],r[1],r[4],r[7],r[2],r[5],r[8]]));break;case 16:o.uniformMatrix4fv(t,!1,new Float32Array([r[0],r[4],r[8],r[12],r[1],r[5],r[9],r[13],r[2],r[6],r[10],r[14],r[3],r[7],r[11],r[15]]));break;default:throw new Error(`don't know how to load uniform "`+n+'" of length '+r.length)}else if(ee(r))(this.isSampler[n]?o.uniform1i:o.uniform1f).call(o,t,r);else throw new Error('attempted to set uniform "'+n+'" to invalid value '+r)}}return this},draw:function(s,n){this.drawBuffers(s.vertexBuffers,s.indexBuffers[n==o.LINES?"lines":"triangles"],arguments.length<2?o.TRIANGLES:n)},drawBuffers:function(s,n,t){var r=this.usedMatrices,c=o.modelviewMatrix,h=o.projectionMatrix,u=r.MVMI||r.NM?c.inverse():null,f=r.PMI?h.inverse():null,b=r.MVPM||r.MVPMI?h.multiply(c):null,y={};if(r.MVM&&(y[r.MVM]=c),r.MVMI&&(y[r.MVMI]=u),r.PM&&(y[r.PM]=h),r.PMI&&(y[r.PMI]=f),r.MVPM&&(y[r.MVPM]=b),r.MVPMI&&(y[r.MVPMI]=b.inverse()),r.NM){var g=u.m;y[r.NM]=[g[0],g[4],g[8],g[1],g[5],g[9],g[2],g[6],g[10]]}this.uniforms(y);var E=0;for(var M in s){var F=s[M],D=this.attributes[M]||o.getAttribLocation(this.program,M.replace(/^(gl_.*)$/,O+"$1"));D==-1||!F.buffer||(this.attributes[M]=D,o.bindBuffer(o.ARRAY_BUFFER,F.buffer),o.enableVertexAttribArray(D),o.vertexAttribPointer(D,F.buffer.spacing,o.FLOAT,!1,0,0),E=F.buffer.length/F.buffer.spacing)}for(var M in this.attributes)M in s||o.disableVertexAttribArray(this.attributes[M]);return E&&(!n||n.buffer)&&(n?(o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,n.buffer),o.drawElements(t,n.buffer.length,o.UNSIGNED_SHORT,0)):o.drawArrays(t,0,E)),this}};function I(s,n,t){t=t||{},this.width=s,this.height=n,this.id=o.createTexture();let r=t.type||o.UNSIGNED_BYTE,c=t.format||o.RGBA,h=o.RGBA;const u=o.getExtension("EXT_color_buffer_float"),f=o.getExtension("EXT_color_buffer_half_float");r===o.FLOAT?(u?o instanceof WebGL2RenderingContext&&(c=o.RGBA32F):(console.warn("FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),r=o.UNSIGNED_BYTE,c=o.RGBA8),h=o.RGBA):r===o.HALF_FLOAT_OES?(f?o instanceof WebGL2RenderingContext&&(c=o.RGBA16F):(console.warn("HALF_FLOAT textures not renderable, falling back to UNSIGNED_BYTE"),r=o.UNSIGNED_BYTE,c=o.RGBA8),h=o.RGBA):(r=o.UNSIGNED_BYTE,c=o.RGBA8,h=o.RGBA);const b=t.filter||t.magFilter||o.LINEAR,y=t.filter||t.minFilter||o.LINEAR;o.bindTexture(o.TEXTURE_2D,this.id),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,1),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,b),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,y),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,t.wrap||t.wrapS||o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,t.wrap||t.wrapT||o.CLAMP_TO_EDGE),o instanceof WebGL2RenderingContext?o.texImage2D(o.TEXTURE_2D,0,c,s,n,0,h,r,null):o.texImage2D(o.TEXTURE_2D,0,h,s,n,0,h,r,null),o.bindTexture(o.TEXTURE_2D,null),this.format=h,this.type=r,this.internalFormat=c}var H,Y,q;I.prototype={bind:function(s){o.activeTexture(o.TEXTURE0+(s||0)),o.bindTexture(o.TEXTURE_2D,this.id)},unbind:function(s){o.activeTexture(o.TEXTURE0+(s||0)),o.bindTexture(o.TEXTURE_2D,null)},canDrawTo:function(){H=H||o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,H),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.id,0);var s=o.checkFramebufferStatus(o.FRAMEBUFFER)==o.FRAMEBUFFER_COMPLETE;return o.bindFramebuffer(o.FRAMEBUFFER,null),s},drawTo:function(s){o.getExtension("EXT_color_buffer_float")||console.warn("EXT_color_buffer_float not available!");var t=o.getParameter(o.VIEWPORT);if(H=H||o.createFramebuffer(),Y=Y||o.createRenderbuffer(),o.bindFramebuffer(o.FRAMEBUFFER,H),o.bindRenderbuffer(o.RENDERBUFFER,Y),(this.width!=Y.width||this.height!=Y.height)&&(Y.width=this.width,Y.height=this.height,o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT16,this.width,this.height)),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.id,0),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,Y),o.checkFramebufferStatus(o.FRAMEBUFFER)!=o.FRAMEBUFFER_COMPLETE)throw new Error("Rendering to this texture is not supported (incomplete framebuffer)");o.viewport(0,0,this.width,this.height),s(),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindRenderbuffer(o.RENDERBUFFER,null),o.viewport(t[0],t[1],t[2],t[3])},swapWith:function(s){var n;n=s.id,s.id=this.id,this.id=n,n=s.width,s.width=this.width,this.width=n,n=s.height,s.height=this.height,this.height=n}},I.fromImage=function(s,n){n=n||{};var t=new I(s.width,s.height,n);o.bindTexture(o.TEXTURE_2D,t.id);try{o.texImage2D(o.TEXTURE_2D,0,t.format,t.format,t.type,s)}catch{throw location.protocol=="file:"?new Error('image not loaded for security reasons (serve this page over "http://" instead)'):new Error("image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)")}return n.minFilter&&n.minFilter!=o.NEAREST&&n.minFilter!=o.LINEAR&&o.generateMipmap(o.TEXTURE_2D),o.bindTexture(o.TEXTURE_2D,null),t},I.fromURL=function(s,n){q=q||function(){var h=document.createElement("canvas").getContext("2d");h.canvas.width=h.canvas.height=128;for(var u=0;u<h.canvas.height;u+=16)for(var f=0;f<h.canvas.width;f+=16)h.fillStyle=(f^u)&16?"#FFF":"#DDD",h.fillRect(f,u,16,16);return h.canvas}();var t=I.fromImage(q,n),r=new Image,c=o;return r.onload=function(){c.makeCurrent(),I.fromImage(r,n).swapWith(t)},r.src=s,t},I.canUseFloatingPointTextures=function(){return!!o.getExtension("OES_texture_float")},I.canUseFloatingPointLinearFiltering=function(){return!!o.getExtension("OES_texture_float_linear")},I.canUseHalfFloatingPointTextures=function(){return!!o.getExtension("OES_texture_half_float")},I.canUseHalfFloatingPointLinearFiltering=function(){return!!o.getExtension("OES_texture_half_float_linear")};function _(s,n,t){this.x=s||0,this.y=n||0,this.z=t||0}return _.prototype={negative:function(){return new _(-this.x,-this.y,-this.z)},add:function(s){return s instanceof _?new _(this.x+s.x,this.y+s.y,this.z+s.z):new _(this.x+s,this.y+s,this.z+s)},subtract:function(s){return s instanceof _?new _(this.x-s.x,this.y-s.y,this.z-s.z):new _(this.x-s,this.y-s,this.z-s)},multiply:function(s){return s instanceof _?new _(this.x*s.x,this.y*s.y,this.z*s.z):new _(this.x*s,this.y*s,this.z*s)},divide:function(s){return s instanceof _?new _(this.x/s.x,this.y/s.y,this.z/s.z):new _(this.x/s,this.y/s,this.z/s)},equals:function(s){return this.x==s.x&&this.y==s.y&&this.z==s.z},dot:function(s){return this.x*s.x+this.y*s.y+this.z*s.z},cross:function(s){return new _(this.y*s.z-this.z*s.y,this.z*s.x-this.x*s.z,this.x*s.y-this.y*s.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},angleTo:function(s){return Math.acos(this.dot(s)/(this.length()*s.length()))},toArray:function(s){return[this.x,this.y,this.z].slice(0,s||3)},clone:function(){return new _(this.x,this.y,this.z)},init:function(s,n,t){return this.x=s,this.y=n,this.z=t,this}},_.negative=function(s,n){return n.x=-s.x,n.y=-s.y,n.z=-s.z,n},_.add=function(s,n,t){return n instanceof _?(t.x=s.x+n.x,t.y=s.y+n.y,t.z=s.z+n.z):(t.x=s.x+n,t.y=s.y+n,t.z=s.z+n),t},_.subtract=function(s,n,t){return n instanceof _?(t.x=s.x-n.x,t.y=s.y-n.y,t.z=s.z-n.z):(t.x=s.x-n,t.y=s.y-n,t.z=s.z-n),t},_.multiply=function(s,n,t){return n instanceof _?(t.x=s.x*n.x,t.y=s.y*n.y,t.z=s.z*n.z):(t.x=s.x*n,t.y=s.y*n,t.z=s.z*n),t},_.divide=function(s,n,t){return n instanceof _?(t.x=s.x/n.x,t.y=s.y/n.y,t.z=s.z/n.z):(t.x=s.x/n,t.y=s.y/n,t.z=s.z/n),t},_.cross=function(s,n,t){return t.x=s.y*n.z-s.z*n.y,t.y=s.z*n.x-s.x*n.z,t.z=s.x*n.y-s.y*n.x,t},_.unit=function(s,n){var t=s.length();return n.x=s.x/t,n.y=s.y/t,n.z=s.z/t,n},_.fromAngles=function(s,n){return new _(Math.cos(s)*Math.cos(n),Math.sin(n),Math.sin(s)*Math.cos(n))},_.randomDirection=function(){return _.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))},_.min=function(s,n){return new _(Math.min(s.x,n.x),Math.min(s.y,n.y),Math.min(s.z,n.z))},_.max=function(s,n){return new _(Math.max(s.x,n.x),Math.max(s.y,n.y),Math.max(s.z,n.z))},_.lerp=function(s,n,t){return n.subtract(s).multiply(t).add(s)},_.fromArray=function(s){return new _(s[0],s[1],s[2])},_.angleBetween=function(s,n){return s.angleTo(n)},e}();class Te{constructor({tx:e=0,ty:i=0,zoom:l=4,ax:d=-25,ay:m=-200,az:p=0,fov:A=45}){this.tx=e,this.ty=i,this.zoom=l,this.ax=d,this.ay=m,this.az=p,this.fov=A}}const De=.3,Le=.15,Ie=1,pt=10,Je=Math.ceil(pt/4),Qe=10,be=`
    uniform float wr;
    #define sqrt_2_PI 2.50662827
    #define PI 3.1415926536
    uniform sampler2D swimmersAttributesTexture;
    const int SWIMMERS_NUM_ATTRIBUTES = 4;
    const vec2 TEXTURE_SIZE = vec2(`+Je+", "+Qe+`);
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
`,et=200,gt=`
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
#define MAX_SPARKS `+et+`
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

`;var Ee,tt;class Ae{constructor(e,i,l,d){ye(this,Ee);if(this.gl=e,this.calibration=l,this.copyVideo=!1,this.show=!1,this.videoStartTime=d,e===null){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),this.shader=new v.Shader(`
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

    `+gt+be+`

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
`),this.mesh=v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.mesh.transform(v.Matrix.rotate(90,1,0,0)),this.mesh.transform(v.Matrix.translate(0,.1,0)),this.programInfo=null,this.texture=this.initTexture(),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),i!=""&&(this.video=this.setupVideo(i))}render(){const e=a.params.visualizations.sparks,i=a.params.simulation.poolSize;if(!a.params.video.show)return;this.copyVideo&&this.updateTexture(),(!this.mesh.vertexBuffers||!this.mesh.vertexBuffers.vertex)&&this.mesh.compile(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);const d=16*this.gl.canvas.height/9,m=(this.gl.canvas.width-d)/2;U.swimmersAttributesTexture&&U.swimmersAttributesTexture.bind(1),this.shader.uniforms({ratio_screen:d/this.gl.canvas.width,dx_screen:m/this.gl.canvas.width,uSampler:0,swimmersHelperFunctions:1,screen:4,iTime:a.getRaceTime(),poolSize:[i.x,i.y,i.z],iResolution:[this.gl.canvas.width,this.gl.canvas.height],sparksEnabled:e.enabled,sparksGlow:e.glow,sparksGlowOffset:e.glowOffset,sparksStroke:e.stroke,sparksNumber:e.num,sparksLengthFactor:e.lengthFactor,sparksSizeFactor:e.sizeFactor,fov:e.fov,thresholdBlending:a.params.video.thresholdBlending,blendingThreshold:a.params.video.blendingThreshold,opacity:a.params.video.opacity,distanceFixed:a.distanceFixed,hideObstructions:a.params.video.hideObstructions,hideObstructionThreshold:a.params.video.hideObstructionThreshold}).draw(this.mesh),this.gl.disable(this.gl.BLEND),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}setTime(e){this.copyVideo&&(this.video.currentTime=e)}initTexture(){const e=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,e);const i=0,l=this.gl.RGBA,d=1,m=1,p=0,A=this.gl.RGBA,R=this.gl.UNSIGNED_BYTE,L=new Uint8Array([0,0,255,255]);return this.gl.texImage2D(this.gl.TEXTURE_2D,i,l,d,m,p,A,R,L),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),e}updateTexture(){const i=this.gl.RGBA,l=this.gl.RGBA,d=this.gl.UNSIGNED_BYTE;this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,i,l,d,this.video)}setupVideo(e){const i=document.createElement("video");let l=!1,d=!1;i.playsInline=!0,i.muted=!0,i.loop=!1,i.addEventListener("playing",()=>{l=!0,p()},!0),i.addEventListener("timeupdate",()=>{d=!0,p()},!0),i.src=e,i.play();const m=this,p=()=>{l&&d&&(m.copyVideo=!0,i.paused||Z(this,Ee,tt).call(this))};return i}}Ee=new WeakSet,tt=function(){this.hasPausedFirstTime||(this.hasPausedFirstTime=!0,this.video.pause())};class Se{constructor(e,{poolSize:i=new GL.Vector(2,2),waterResolution:l=new GL.Vector(256,256),thresholdBlending:d=!1,numSwimmers:m=1,dataFolder:p=null}){this.title=e,this.videos=[],this.poolSize=i,this.waterResolution=l,this.numSwimmers=m,this.thresholdBlending=d,this.dataFolder=p}addVideo(e){this.videos.push(e)}async parseData(e){for(let i=0;i<e.length;i++)await e[i].parseData(this.dataFolder+i+".csv")}}const We=new v.Vector(0,-4,0);class ge{constructor(e,i){this.initCenter=new v.Vector(e.x,e.y,e.z),this.center=new v.Vector(e.x,e.y,e.z),this.oldCenter=new v.Vector(e.x,e.y,e.z),this.radius=i,this.cinematic=!1,this.velocity=new v.Vector(0,0,0),this.acceleration=new v.Vector(0,0,0),this.mass=4/3*Math.PI*Math.pow(i,3)*1e3,this.invMass=1/this.mass,this.radiusSquared=i*i,this.mesh=v.Mesh.sphere({detail:10}),this.followTarget=!1,this.showStreak=!1}spawnSplashes(e){if(!a.params.simulation.splashes.enabled&&!a.params.visualizations.showStreaks)return;const i=this.center.subtract(this.oldCenter).multiply(1/e),l=i.z>0?-Math.PI/2:Math.PI/2,d=i.dot(i),m=this.center.subtract(this.velocity.unit());m.y=.15,a.params.simulation.splashes.enabled&&this.center.x<100&&Math.abs(this.center.y)<=this.radius&&a.splashParticles.spawnSplash(m,l,Math.sqrt(d),a.params.simulation.splashes.strengthThreshold),a.params.visualizations.showStreaks&&this.showStreak&&this.velocity.length()>.01&&a.splashParticles.spawnSplash(this.center,0,(this.velocity.length()-1.6)/.9,0,!0)}update(e){if(this.moved||(this.oldCenter=new v.Vector(this.center.x,this.center.y,this.center.z)),this.moved=!1,this.cinematic){if(this.followTarget||(this.velocity=new v.Vector(0,0,0)),!this.targetPos||!this.followTarget)return;let i=e/this.targetTime;i=Math.min(Math.max(i,0),1),this.center=this.center.multiply(1-i).add(this.targetPos.multiply(i)),this.velocity=this.center.subtract(this.oldCenter).multiply(1/e),this.targetTime-=e,this.targetTime<0&&(this.targetPos=null)}else{const i=Math.max(0,Math.min(1,(this.radius-this.center.y)/(2*this.radius))),l=We.multiply(-a.params.simulation.buoyancyFactor*this.mass*i),d=this.velocity.unit().multiply(-1e3*this.radiusSquared*i*this.velocity.dot(this.velocity));this.addForce(d),this.addForce(l),this.addForce(We.multiply(this.mass)),this.velocity=this.velocity.add(this.acceleration.multiply(e)),this.acceleration=new v.Vector(0,0,0),this.center=this.center.add(this.velocity.multiply(e)),this.center.y<this.radius-a.params.simulation.poolSize.y&&(this.center.y=this.radius-1,this.velocity.y=Math.abs(this.velocity.y)*.7)}}setTarget(e,i){this.targetPos=e,this.targetTime=i}addForce(e){this.cinematic?console.warn("Trying to add force to a cinematic sphere."):this.acceleration=this.acceleration.add(e.multiply(this.invMass))}move(e){this.moved=!0,this.oldCenter=new v.Vector(this.center.x,this.center.y,this.center.z),this.center=new v.Vector(e.x,e.y,e.z),this.cinematic||console.warn("Moving a non cinematic sphere.")}}class vt{constructor(){this.mesh=new v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),this.waterTexture=null,this.shader=new v.Shader(`
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
        `)}updateFoam(e){if(!this.waterTexture){console.log("NO WATER TO UPDATE FOAM");return}this.foamTexNext.swapWith(this.foamTexPrev),this.foamTexNext.drawTo(()=>{this.foamTexPrev.bind(0),a.water.textureA.bind(1),this.shader.uniforms({foamTexPrev:0,water:1,dt:e,seed:a.time,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],timeVariation:a.params.simulation.foam.timeVariation,spaceVariation:a.params.simulation.foam.spaceVariation,velThreshold:a.params.simulation.foam.velThreshold,velMax:a.params.simulation.foam.velMax,dispersion:a.params.simulation.foam.dispersion,attenuation:a.params.simulation.foam.attenuation}).draw(this.mesh)})}resetTextures(e,i,l){this.foamTexPrev=new v.Texture(e,i,{type:a.gl.FLOAT,filter:a.gl.LINEAR}),this.foamTexNext=new v.Texture(e,i,{type:a.gl.FLOAT,filter:a.gl.LINEAR}),this.waterTexture=l}}function ae(o,e=null){this.gl=o,this.visualizationWavesEnabled=!0,this.sqrt_2_PI=Math.sqrt(2*Math.PI),this.foam=new vt;var i=`
    out vec2 coord;
    uniform vec2 invPoolSizeVertex;
    void main() {
      coord = gl_Vertex.xy * invPoolSizeVertex + 0.5;
      gl_Position = vec4(gl_Vertex.xy * 2. * invPoolSizeVertex, 0., 1.0);
    }
  `;this.reset(e),v.Texture.canUseFloatingPointTextures(),this.dropShader=new v.Shader(i,`
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
  `),this.updateShader=new v.Shader(i,`
    uniform sampler2D tex;
    uniform vec2 delta;
    uniform float prev_wr;
    uniform float damping;
    uniform float sqrt_2_PI;
    uniform vec3 poolSize;
    `+be+`
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
  `),this.normalShader=new v.Shader(i,`
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
  `),this.visualizationWavesShader=new v.Shader(i,`
    uniform sampler2D tex;
    uniform bool add;
    uniform vec3 poolSize;
    uniform bool showWR;
    uniform bool showDivingDistance;
    in vec2 coord;
    out vec4 fragColor;
    uniform float t;

    `+be+`

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
    `)}ae.prototype.resetTextures=function(){const o=this.gl;this.textureA&&o.deleteTexture(this.textureA.id),this.textureB&&o.deleteTexture(this.textureB.id),this.textureA=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.foam.resetTextures(this.W,this.H,this.textureA),this.areaConservationTexture=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.showAreaConservedGrid=!1,this.showProjectionGrid=!1,this.invPoolSize=new v.Vector(1/a.params.simulation.poolSize.x,1/a.params.simulation.poolSize.y,1/a.params.simulation.poolSize.z);var e=v.Texture.canUseFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST;(!this.textureA.canDrawTo()||!this.textureB.canDrawTo())&&v.Texture.canUseHalfFloatingPointTextures()&&(console.log("No draw"),e=v.Texture.canUseHalfFloatingPointLinearFiltering()?this.gl.LINEAR:this.gl.NEAREST,this.textureA=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}),this.textureB=new v.Texture(this.W,this.H,{type:this.gl.FLOAT,filter:e}))};ae.prototype.reset=function(o=null){this.WR_position=1e5,this.prev_WR_position=0,o!==null?(console.log("resolution.y : "+o.y),this.W=Math.round(o.x),this.H=Math.round(o.y),console.log("Using custom resolution:",this.W,this.H)):(this.W=256,this.H=256),U.reset(new v.Vector(this.W,this.H)),this.plane=v.Mesh.plane({detail:255,width:a.params.simulation.poolSize.x,height:a.params.simulation.poolSize.z}),this.delta=new v.Vector(1/this.W,1/this.H),this.resetTextures()};ae.prototype.addDrop=function(o,e,i,l){var d=this;this.textureB.drawTo(function(){d.textureA.bind(),d.dropShader.uniforms({invPoolSizeVertex:[d.invPoolSize.x,d.invPoolSize.z],center:[o,e],radius:i,strength:l,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z]}).draw(d.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.addOrRemoveVisualizationWaves=function(o){if(this.prev_WR_position=this.WR_position,this.WR_position=a.getRaceTime()*2.155,this.WR_position>a.params.simulation.poolSize.z&&(this.WR_position=2*a.params.simulation.poolSize.z-this.WR_position),!(!this.visualizationWavesEnabled||!U.raceHasStarted)){var i=this;this.textureB.drawTo(function(){i.textureA.bind();const l=U.getAttributesTexture();l&&l.bind(1),i.visualizationWavesShader.uniforms({swimmersAttributesTexture:1,showDivingDistance:a.params.visualizations.showDivingDistance,showWR:a.params.visualizations.showWR,invPoolSizeVertex:[i.invPoolSize.x,i.invPoolSize.z],poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],wr:i.WR_position,sqrt_2_PI:i.sqrt_2_PI,add:o,swimmersNumber:a.swimmers.length,time:a.getRaceTime(),t:a.time,amplitudeFactor:a.params.quiver.amplitudeFactor,frequencyFactor:a.params.quiver.frequencyFactor,amplitude:a.params.quiver.amplitude,omega0:a.params.quiver.omega,waveLength0:a.params.quiver.waveLength}).draw(i.plane)}),this.textureB.swapWith(this.textureA)}};ae.prototype.updateSpheres=function(o){if(a.params.simulation.optimized)U.attributes.draw(),this.textureB.drawTo(()=>{this.textureA.bind(),U.bindDisplacementTexture(1),U.bindOldDisplacementTexture(2),this.sphereShader.uniforms({oldDisplacementTexture:2,displacementTexture:1,invPoolSizeVertex:[this.invPoolSize.x,this.invPoolSize.z],poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],optimized:!0}).draw(this.plane),this.textureB.swapWith(this.textureA),U.attributes.draw()});else{const e=[];a.swimmers.forEach(i=>i.spheres.forEach(l=>e.push(l)));for(let i=0;i<e.length;i++){const l=e[i];this.moveSphere(l.oldCenter,l.center,l.radius)}}};ae.prototype.moveSphere=function(o,e,i){var l=this;this.textureB.drawTo(function(){l.textureA.bind(),l.sphereShader.uniforms({invPoolSizeVertex:[l.invPoolSize.x,l.invPoolSize.z],oldCenter:o,newCenter:e,radius:i,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],optimized:!1}).draw(l.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.stepSimulation=function(o){var e=this;this.textureB.drawTo(function(){e.textureA.bind();const i=U.getAttributesTexture();i&&i.bind(2),e.updateShader.uniforms({swimmersAttributesTexture:2,swimmersNumber:a.swimmers.length,invPoolSizeVertex:[e.invPoolSize.x,e.invPoolSize.z],delta:[e.delta.x,e.delta.y],time:a.time,wr:e.WR_position,prev_wr:e.prev_WR_position,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],sqrt_2_PI:e.sqrt_2_PI,damping:a.params.simulation.waterDamping}).draw(e.plane)}),this.textureB.swapWith(this.textureA),a.params.simulation.foam.enabled&&this.foam.updateFoam(o),this.updateAreaConservation()};ae.prototype.updateNormals=function(){var o=this;this.textureB.drawTo(function(){o.textureA.bind(),o.normalShader.uniforms({invPoolSizeVertex:[o.invPoolSize.x,o.invPoolSize.z],delta:[o.delta.x,o.delta.y]}).draw(o.plane)}),this.textureB.swapWith(this.textureA)};ae.prototype.updateAreaConservation=function(){if(!a.params.visualizations.areaConservationEnabled)return;var o,e,i;if(this.textureA.type===this.gl.FLOAT)o=this.gl.FLOAT,e=Float32Array,i="EXT_color_buffer_float";else if(this.textureA.type===this.gl.HALF_FLOAT_OES)o=this.gl.HALF_FLOAT_OES,e=Uint16Array,i="EXT_color_buffer_half_float";else{console.warn("Unsupported texture type for reading");return}if(!this.gl.getExtension(i)){console.warn(i+" not available; cannot read pixels");return}this.fb||(this.fb=this.gl.createFramebuffer()),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.textureA.id,0);const l=this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);if(l!==this.gl.FRAMEBUFFER_COMPLETE){console.error("Framebuffer incomplete: "+l+" for texture type "+this.textureA.type),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);return}this.gl.pixelStorei(this.gl.PACK_ALIGNMENT,1);const d=new e(this.W*this.H*4),m=new Float32Array(this.W*this.H*4);this.gl.readPixels(0,0,this.W,this.H,this.gl.RGBA,o,d);for(let T=0;T<this.W;T++)m[T*4+1]=1;const p=a.params.simulation.poolSize.x/this.W,A=a.params.simulation.poolSize.z/this.H,R=p*p,L=A*A;if(this.textureA.type===this.gl.FLOAT){for(let T=0;T<this.H;T+=1)for(let x=0;x<this.W;x+=1){const P=(T*this.W+x)*4,k=((this.H-1-T)*this.W+x)*4,w=m[k],S=m[k+1];if(x+1<this.W){const z=d[P]-d[P+4],N=Math.sqrt(z*z+R);m[k+4]=w+N}if(T+1<this.H){const z=d[P]-d[P+this.W*4],N=Math.sqrt(z*z+L);m[k-4*this.W+1]=S+N}}this.gl.bindTexture(this.gl.TEXTURE_2D,this.areaConservationTexture.id),this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.W,this.H,this.gl.RGBA,this.gl.FLOAT,m)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.bindTexture(this.gl.TEXTURE_2D,null)};const xt=`#version 300 es
    in vec3 pos;
    in float life;
    in float size;
    in float color;

    out float vLife;
    out float vColor;
    out float altitude;

    uniform mat4 MVM;
    uniform mat4 projection;

    void main() {
        vec4 posInView = MVM * vec4(pos, 1.);
        gl_Position = projection * posInView;
        // gl_Position = vec4(0., 0., 0., 1.);
        gl_PointSize = size * 5000. / -posInView.z;

        if (color > .01) gl_PointSize = 500. / -posInView.z;

        vLife = life;
        vColor = min(color, 1.);
        altitude = pos.y;
    }

`,wt=`#version 300 es
    precision mediump float;

    in float vLife;
    in float vColor;
    in float altitude;

    out vec4 fragColor;

    float max3(vec3 v) {
        return max(max(v.x, v.y), v.z);
    }

    void main() {
        vec3 col = vec3(1., 1., 1.);
        if (vColor > 0.01) {
            col = vec3(vColor, 0., 1. - vColor);
            col /= max3(col);
        }
        vec2 uv = gl_PointCoord - 0.5;

        float d = length(uv);

        // soft circle
        float alpha = smoothstep(0.5, 0.0, d);

        // fade with life
        alpha *= vLife;

        if (altitude < 0. && vColor > 0.01) alpha /= -altitude*10.;

        if (vColor < 0.01 && altitude < 0.) alpha /= (1.-altitude)*10.;

        if (vLife > 1.) alpha = 0.;
        fragColor = vec4(col, alpha);
    }

`,yt=-9.8,Xe=.01;class He{constructor(e,i,l,d=0){this.pos=e,this.vel=i,this.fixed=l,this.color=d,this.life=1,this.size=Math.random()*.05+.02}update(e){if(this.fixed){this.life-=e*.15;return}this.life-=e*1.5,this.vel.y+=yt*e,this.pos=this.pos.add(this.vel.multiply(e)),this.vel=this.vel.multiply(1-Xe),this.size*=1-Xe}}class bt{constructor(e){this.gl=e,this.particles=[],this.particleBuffer=this.gl.createBuffer(),this.initPrograms()}spawnSplash(e,i,l,d,m=!1){if(m){const A=new v.Vector(0,0,0),R=new He(e,A,m,l);R.life=1.1,this.particles.push(R);return}const p=Math.min(10,l*20);for(let A=0;A<p;A++){const R=(Math.random()-.5)*Math.PI,L=Math.random()*2*Math.PI,T=.5+Math.random(),x=new v.Vector(Math.sin(R)*Math.cos(L)*T,Math.cos(R)*T,Math.sin(R)*Math.sin(L)*T);this.particles.push(new He(e,x,m))}}update(e){this.particles.forEach((i,l)=>{i.update(e),i.life<=0&&this.particles.splice(l,1)})}buildShader(e,i){const l=this.gl.createShader(i);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const i=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(i,l)}),this.gl.linkProgram(i),i}checkShaders(e,i,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(i)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}buildProgram(e,i){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(i,this.gl.FRAGMENT_SHADER),m=this.createProgram([l,d]);return this.checkShaders(l,d,m),m}initPrograms(){this.program=this.buildProgram(xt,wt)}draw(e){const i=this.gl;i.enable(i.BLEND),i.blendFunc(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA);const l=[];this.particles.forEach(N=>{const V=N.pos;l.push(V.x,V.y,V.z,N.life,N.size,N.color)}),i.bindBuffer(i.ARRAY_BUFFER,this.particleBuffer),i.bufferData(i.ARRAY_BUFFER,new Float32Array(l),i.DYNAMIC_DRAW),i.useProgram(this.program);const d=i.getUniformLocation(this.program,"MVM"),m=new Float32Array(i.modelviewMatrix.m);i.uniformMatrix4fv(d,!0,m);const p=i.getUniformLocation(this.program,"projection"),A=new Float32Array(i.projectionMatrix.m);i.uniformMatrix4fv(p,!0,A);const R=i.getAttribLocation(this.program,"pos"),L=i.getAttribLocation(this.program,"life"),T=i.getAttribLocation(this.program,"size"),x=i.getAttribLocation(this.program,"color"),P=i.FLOAT,k=!1,w=4,S=6*w;let z=0;i.bindBuffer(i.ARRAY_BUFFER,this.particleBuffer),i.vertexAttribPointer(R,3,P,k,S,z),i.enableVertexAttribArray(R),z=3*w,i.vertexAttribPointer(L,1,P,k,S,z),i.enableVertexAttribArray(L),z=4*w,i.vertexAttribPointer(T,1,P,k,S,z),i.enableVertexAttribArray(T),z=5*w,i.vertexAttribPointer(x,1,P,k,S,z),i.enableVertexAttribArray(x),i.drawArrays(i.POINTS,0,this.particles.length),i.disable(i.BLEND)}}function $e(o){const e={};for(let i=0;i<o.length;i++)e[o[i]]=i;return e}const oe=new v.Vector(1e3,0,-1e3),Ye=["none","only medals","all"],qe=["neighbours","per swimmer"],_t=["none","cycle frequency","speed","acceleration"],Et={none:{value:0,name:"PARAMETER_NONE"},"cycle frequency":{value:1,name:"PARAMETER_CYCLES"},speed:{value:2,name:"PARAMETER_SPEED"},acceleration:{value:3,name:"PARAMETER_ACCELERATION"}},Tt=["realistic","height field","lambert","toon"],At={realistic:{value:0,name:"RENDERING_REALISTIC"},"height field":{value:1,name:"RENDERING_HEIGHT_FIELD"},lambert:{value:2,name:"RENDERING_LAMBERT"},toon:{value:3,name:"RENDERING_TOON"}};var ie,it,rt,ke,ot;class St{constructor(){ye(this,ie);this.params={numSteps:2,fov:45,visualizations:{enabled:!0,showFlags:!1,showWR:!1,showSpeed:!1,showDivingDistance:!0,showFinishTimes:!1,showStreaks:!1,customWaterPerturbation:"none",waterColorParameter:"none",customParametersList:_t,customParametersDict:Et,PARAMETER_NONE:"none",PARAMETER_CYCLES:"cycle frequency",PARAMETER_SPEED:"speed",PARAMETER_ACCELERATION:"acceleration",showSwimmersLines:"none",swimmersLinesList:Ye,showSwimmersLinesDict:$e(Ye),swimmersLinesMode:"neighbours",swimmersLinesModeList:qe,swimmersLinesModeDict:$e(qe),medalsModeBeforeFinish:"none",medalsModesDict:{none:0,stars:1,bright:2,lanes:3},medalsModeAfterFinish:"none",areaConservationEnabled:!0,rendering:"realistic",renderingList:Tt,renderingDict:At,transitionBeginTime:null,shadow:{enabled:!0,shadowRadius:.5,shadowPower:.5,showCircle:!0,circleRadius:.6,circleStroke:.15},sparks:{enabled:!1,glow:5,glowOffset:.5,lengthFactor:1,stroke:.01,num:40,sizeFactor:50,fov:Math.PI/4}},swimmers:{showSpheres:!0,useTracking:!1},video:{thresholdBlending:!1,blendingThreshold:.41,show:!1,opacity:1,hideObstructions:!1,hideObstructionThreshold:.2},simulation:{optimized:!1,waterDamping:.02,poolSize:new v.Vector(4,1,4),buoyancyFactor:1.1,foam:{enabled:!0,velThreshold:.35,velMax:3.5,dispersion:.015,timeVariation:2.5,spaceVariation:8,attenuation:.015},splashes:{enabled:!0,strengthThreshold:2}},quiver:{amplitudeFactor:.78,frequencyFactor:1.2,amplitude:.1,omega:2,waveLength:1},cornerView:{show:!0},chronoPhotography:{available:!1}},this.resolution=new v.Vector(256,256),this.gl=v.create({preserveDrawingBuffer:!0}),this.gl.canvas.tabIndex=0,this.originalVisParams=JSON.parse(JSON.stringify(this.params.visualizations)),delete this.originalVisParams.shadow,delete this.originalVisParams.sparks,this.useConfigFile=!0,this.time=0,this.swimmers=[],this.translateX=0,this.translateY=0,this.zoomDistance=4,this.angleX=-25,this.angleY=-200.5,this.angleZ=0,this.water=null;const e=new Se("—",{poolSize:new v.Vector(2,1,2),waterResolution:new v.Vector(256,256),numSwimmers:1}),i=new Te({});e.addVideo(new Ae(this.gl,"",i));const l=new Se("100m freestyle",{poolSize:new v.Vector(25,2,50),waterResolution:new v.Vector(1024,2048),numSwimmers:10,thresholdBlending:!0,dataFolder:"./assets/race-data/"}),d=new Te({tx:-.53,ty:1.25,zoom:47.86,ax:-29,ay:-260.5,az:-5,fov:39.98});l.addVideo(new Ae(this.gl,"swimming-race.mp4",d,16.5)),this.currentVideo=l.videos[0];const m=new Se("synchronized swimming",{poolSize:new v.Vector(25,2,30),waterResolution:new v.Vector(1024,2048),numSwimmers:2,dataFolder:"./assets/synchronized-swimming-data/"}),p=new Te({tx:-1.32,ty:.4,zoom:32.41,ax:-18,ay:-291.5,az:1,fov:42.8});m.addVideo(new Ae(this.gl,"synchronized-swimming.mp4",p,17.5)),this.scenesList=[e,l,m],this.scenes={},this.scenesList.forEach(A=>this.scenes[A.title]=A),this.currentScene=e,this.paused=!1,this.configPlayButton(),this.transitions={},this.playingDemo=!1,this.renderWater=!0,this.renderCube=!0,this.spheresRadiusCoeff=1,this.distanceFixed=0,this.chronoFrameBuffer=this.gl.createFramebuffer(),this.drawingFrameBuffer=null,this.drawingTexture=this.gl.createTexture(),this.resetDrawingTexture(),this.cornerView=!1,this.splashParticles=new bt(this.gl)}resetDrawingTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.chronoFrameBuffer),this.gl.bindTexture(this.gl.TEXTURE_2D,this.drawingTexture);const e=this.gl.canvas.width,i=this.gl.canvas.height;this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,e,i,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.drawingTexture,0);const l=this.gl.createRenderbuffer();this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,l),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,i),this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}configStopButton(){this.stopButton=document.getElementById("stop-button"),this.stopButton.addEventListener("click",()=>{this.stopRace()})}configPlayButton(){this.configStopButton(),this.playButton=document.getElementById("play-button"),this.playButton.addEventListener("click",()=>{this.playButton.textContent=="pause"?this.pause():(U.raceHasStarted||this.startRace(),this.play())})}setCalibration(e){this.translateX=e.tx,this.translateY=e.ty,this.zoomDistance=e.zoom,this.angleX=e.ax,this.angleY=e.ay,this.angleZ=e.az,this.params.fov=e.fov,this.gl.matrixMode(this.gl.PROJECTION),this.gl.loadIdentity(),this.gl.perspective(this.params.fov,this.gl.canvas.width/this.gl.canvas.height,.01,100),this.gl.matrixMode(this.gl.MODELVIEW)}async setScene(e){if(console.log("SET SCENE : "+e),this.currentScene=this.scenes[e],this.currentScene){const i=document.getElementById("time-slider-container");this.currentVideo=this.currentScene.videos[0],this.params.video.show=!!this.currentVideo.video,this.params.swimmers.showSpheres=!this.currentVideo.video,i.hidden=!this.currentVideo.video,this.currentScene.title!="—"?this.params.simulation.waterDamping=.1:this.params.simulation.waterDamping=.02;const l=this.currentScene.numSwimmers;if(console.log("num swimmers : "+l),this.swimmers.length!=l){for(let d=this.swimmers.length;d<l;d++){const m=new U(new v.Vector(0,0,0));this.swimmers.push(m)}for(let d=this.swimmers.length;d>l;d--)this.swimmers=this.swimmers.slice(1);this.swimmers.forEach(d=>d.waterDamping=this.params.simulation.waterDamping)}this.params.swimmers.useTracking=!0,await this.currentScene.parseData(this.swimmers),this.swimmers.forEach(d=>d.update(0)),console.log("scene name : "+this.currentScene.title),this.setCalibration(this.currentVideo.calibration),Z(this,ie,it).call(this,this.currentScene.poolSize),this.resolution=this.currentScene.waterResolution,this.params.video.thresholdBlending=this.currentScene.thresholdBlending,this.currentScene.thresholdBlending?this.params.video.opacity=1:this.params.video.opacity=.5,this.params.visualizations.areaConservationEnabled=!1,this.stopRace(),this._reset(),this.params.simulation.optimized=!!this.currentVideo.video}}useGravity(e){U.useGravity=e;for(let i of a.swimmers)i.body.cinematic=!U.useGravity}isOneVisualizationEnabled(){return this.params.visualizations.showFlags||this.params.visualizations.medalsModeBeforeFinish!="none"||this.params.visualizations.medalsModeAfterFinish!="none"||this.params.visualizations.showWR||this.params.visualizations.showSpeed||this.params.visualizations.showDivingDistance}updateTime(e){this.time+=e,this._updateDistanceMarker&&this._updateDistanceMarker()}getRaceTime(){return U.raceHasStarted?this.time-this.currentVideo.videoStartTime:0}resetParams(){Object.entries(this.originalVisParams).forEach(e=>{const i=e[0],l=e[1];this.params.visualizations[i]=l}),this.params.visualizations.areaConservationEnabled=!1}updateEventIndex(){for(this.currentEventIndex=0;this.events[this.currentEventIndex]&&this.events[this.currentEventIndex].time<this.getRaceTime();)this.currentEventIndex++;this.currentEventIndex>0&&this.currentEventIndex--}setRaceTime(e){this.time=this.currentVideo.videoStartTime+e,this.currentVideo.video&&this.currentVideo.setTime(this.time),this.events&&(this.updateEventIndex(),this.resetParams())}showTexts(e){document.getElementById("h").hidden=!e,e?this.showCommands&&(document.getElementById("commands").hidden=!1):(this.showCommands=!document.getElementById("commands").hidden,document.getElementById("commands").hidden=!0)}startRace(){console.log("START RACE"),this.setRaceTime(-3),this.currentVideo.video&&this.currentVideo.video.play(),this.swimmers.forEach(e=>e.startRace()),U.raceHasStarted=!0,U.useGravity=!0,this.water.resetTextures(),this.water.WR_position=0,this.stopButton.hidden=!1,this._clearChronoTexture(this.gl.canvas.width,this.gl.canvas.height,this.gl),this.showTexts(!1)}stopRace(){this.paused&&this.play(),this.setRaceTime(0),this.currentVideo.video&&this.currentVideo.video.pause(),this.swimmers.forEach(e=>e.swim(!1)),U.raceHasStarted=!1,this.water.resetTextures(),this.playButton.textContent="play",this.stopButton.hidden=!0,this.showTexts(!0)}pause(){this.paused=!0,this.pauseVideo(),this.playButton.textContent="play"}play(){this.paused=!1,U.raceHasStarted&&(this.playVideo(),this.playButton.textContent="pause")}pauseVideo(){this.currentVideo.video&&this.currentVideo.video.pause()}playVideo(){this.currentVideo.video&&(this.currentVideo.video.play(),this.currentVideo.video.currentTime=this.time)}renderVideo(){this.currentVideo.video&&this.currentVideo.render()}parseConfigFile(e){fetch(e).then(i=>i.text()).then(i=>{this.events=JSON.parse(i),this.currentEventIndex=0,this._renderTimeline&&this._renderTimeline()})}updateTransitions(){Object.entries(this.transitions).forEach(e=>{const i=e[0],l=e[1],d=this.getRaceTime()-l.beginTime;if(d>l.duration){delete this.transitions[i];return}l.show?l.opacity=d/l.duration:l.opacity=1-d/l.duration})}updateParams(){if(!U.raceHasStarted||!this.events||!this.useConfigFile)return;const e=this.events[this.currentEventIndex];if(!e)return;let i=e.rankSwimmerToggle;if(i||(i=1),e.distance&&this.swimmers[i-1].getDistanceTraveled()>=e.distance||e.time!==void 0&&this.getRaceTime()>=e.time){this.currentEventIndex++;const l=e.transition&&e.transition.type=="dissolve";Object.entries(e.params).forEach(d=>{const m=d[0],p=d[1];m!=="transition"&&(l&&(p===!0||p===!1)&&(this.transitions[m]={opacity:1-1*p,show:p,beginTime:this.getRaceTime(),duration:e.transition.duration}),this.params.visualizations[m]=p)})}}chronoPhotography(){console.log("shoot"),this.distanceFixed=this.swimmers[0].getDistanceTraveled(),console.log("distance fixed : "+this.distanceFixed),this._fixTexture()}recalibrate(){this.currentVideo&&this.setCalibration(this.currentVideo.calibration)}async launchDemo(){console.log("Launch demo"),await this.setScene("100m freestyle"),this.params.video.show=!1,this.params.swimmers.showSpheres=!0,this.spheresRadiusCoeff=1,this.demoTime=0,this.swimmers.forEach(e=>e.body.move(oe)),this.swimmersShown=0,this.playingDemo=!0,this.useGravity(!0),this.params.simulation.buoyancyFactor=1.5,this.params.visualizations.shadow.enabled=!1,this.renderWater=!1,this.translateX=200,this._gui.hide(),document.getElementById("event-editor").hidden=!0,document.getElementById("time-slider-container").hidden=!0,document.getElementById("h").hidden=!0}stopDemo(){this.playingDemo=!1,this.setScene("—"),document.getElementById("event-editor").hidden=!1,document.getElementById("time-slider-container").hidden=!1,document.getElementById("h").hidden=!1,this.renderWater=!0,this.renderCube=!0,this.params.visualizations.shadow.enabled=!0,this._gui.show(),this.params.simulation.buoyancyFactor=1.1}updateDemo(e){if(!this.playingDemo)return;const i=this.demoTime;this.demoTime+=e;const l=2,d=1;if(i<=d){const w=Z(this,ie,ke).call(this,0,d,i);this.translateX=w*this.currentVideo.calibration.tx+(1-w)*200}else this.demoShowVideoTime||(this.angleY+=20*e);!this.renderCube&&i>.5&&(this.renderCube=!0);const m=1.5;if(!this.renderWater&&i>1.5&&(this.renderWater=!0),i>m&&i<m+.5)for(var p=0;p<10;p++)this.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,p&1?.6:-.6);Z(this,ie,rt).call(this,i,l);const A=3,R=5;!U.raceHasStarted&&i>=A&&i<R&&(this.params.simulation.splashes.enabled=!1,this.swimmers.forEach(w=>{w.body.cinematic=!0;const S=new v.Vector(w.body.center.x,0,0),z=new v.Vector(w.body.center.x,1,-this.params.simulation.poolSize.z/2);w.body.move(Z(this,ie,ot).call(this,S,z,A,R,i))})),!U.raceHasStarted&&i>=R&&(this.params.simulation.buoyancyFactor=1.1,this.params.simulation.splashes.enabled=!0,this.params.visualizations.shadow.enabled=!0,this.startRace()),!this.demoShowVideoTime&&this.angleY>=this.currentVideo.calibration.ay+360&&(this.demoShowVideoTime=this.demoTime+1),!this.params.video.show&&this.demoShowVideoTime&&i>=this.demoShowVideoTime&&(this.params.video.show=!0,this.params.video.opacity=0);const L=2;this.params.video.show&&i<=this.demoShowVideoTime+L&&(this.params.video.opacity=(i-this.demoShowVideoTime)/L,console.log("opacity : "+this.params.video.opacity));const T=2;let x=null;this.demoShowVideoTime&&(x=this.demoShowVideoTime+L+T),this.params.video.show&&i>this.demoShowVideoTime+L&&i<x&&(this.spheresRadiusCoeff=1-(i-(this.demoShowVideoTime+L))/T);let P=null;x&&(P=x+.5);const k=2;P&&i>P&&i<P+k&&(this.params.video.hideObstructions=!0,this.params.video.hideObstructionThreshold=(i-P)/k*.5)}}ie=new WeakSet,it=function(e){console.log("SET POOL SIZE : "+e.z),this.params.simulation.poolSize.x=e.x,this.params.simulation.poolSize.y=e.y,this.params.simulation.poolSize.z=e.z},rt=function(e,i){const d=Math.floor((e-i)/.1);if(this.swimmersShown<10&&d>=this.swimmersShown){console.log("swimmers shown : "+this.swimmersShown),console.log("next index swimmer : "+d),console.log("num swimmers : "+this.swimmers.length);const m=this.params.simulation.poolSize.x,A=-m/2+m/20+d*m/10;this.swimmers[d].body.move(new v.Vector(A,.5,0)),this.swimmersShown++}},ke=function(e,i,l){if(l<e)return 0;if(l>i)return 1;const d=(l-e)/(i-e);return 1-(Math.cos(d*Math.PI)+1)/2},ot=function(e,i,l,d,m){const p=Z(this,ie,ke).call(this,l,d,m);console.log("t norm : "+p);const A=(R,L,T,x=1)=>Math.pow(T,x)*L+(1-Math.pow(T,x))*R;return new v.Vector(A(e.x,i.x,p),A(e.y,i.y,p,20),A(e.z,i.z,p,2))};const a=new St;a.parseConfigFile("./assets/vis-config.json");const Rt=`#version 300 es
    const float ARM_DELTA_X = float(`+De+`);
    const float FOOT_DELTA_X = float( `+Le+`);
    const float FOOT_DELTA_Z = float( `+Ie+`);
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

`,Ct=`#version 300 es
    precision highp float;
    in float fragCyclePhase;
    in float fragAltitude;
    const float PI = 3.141592;
    out vec4 fragColor;
    void main() {
        fragColor = vec4(fragAltitude, fragCyclePhase / (2. * PI), 1., 1.);
    }
`,zt=`#version 300 es
    in vec2 iVertex;
    out vec2 fragCoord;
    void main() {
        fragCoord = iVertex * .5 + .5;
        gl_Position = vec4(iVertex.xy, 0., 1.);
    }
`,Ft=`#version 300 es
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
`,Pt=new Float32Array([-1,-1,1,-1,1,1,-1,1]),Mt=new Uint16Array([0,1,2,2,3,0]);var Q,st,pe,at;class Dt{constructor(){ye(this,Q);this.numVecAttributes=Je,this.maxNumSwimmer=Qe,this.gl=a.gl;const e=this.gl.NEAREST;this.texture=new v.Texture(this.numVecAttributes,this.maxNumSwimmer,{type:this.gl.FLOAT,filter:e}),this.initPrograms(),this.indexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,Mt,this.gl.STATIC_DRAW),this.vboPlane=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.bufferData(this.gl.ARRAY_BUFFER,Pt,this.gl.STATIC_DRAW),this.vboPoints=this.gl.createBuffer()}update(){this.numSwimmers=a.swimmers.length;const e=5;this.swimmersAttributes=new Float32Array(this.numVecAttributes*4*this.maxNumSwimmer*e);const i=Z(this,Q,st).call(this,a.swimmers);for(let l=0;l<a.swimmers.length;l++){const d=i[l];Z(this,Q,at).call(this,l,d),Z(this,Q,pe).call(this,a.swimmers.length+l,d.leftArm),Z(this,Q,pe).call(this,2*a.swimmers.length+l,d.rightArm),Z(this,Q,pe).call(this,3*a.swimmers.length+l,d.leftFoot),Z(this,Q,pe).call(this,4*a.swimmers.length+l,d.rightFoot)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture.id),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.numVecAttributes,this.maxNumSwimmer,this.gl.RGBA,this.gl.FLOAT,this.swimmersAttributes),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.swimmersAttributes,this.gl.DYNAMIC_DRAW)}buildShader(e,i){const l=this.gl.createShader(i);return this.gl.shaderSource(l,e),this.gl.compileShader(l),l}createProgram(e){const i=this.gl.createProgram();return e.forEach(l=>{this.gl.attachShader(i,l)}),this.gl.linkProgram(i),i}checkShaders(e,i,l){this.gl.getShaderParameter(e,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(e)),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)||console.error(this.gl.getShaderInfoLog(i)),this.gl.getProgramParameter(l,this.gl.LINK_STATUS)||console.error(this.gl.getProgramInfoLog(l))}createRenderingTexture(e,i){this.pointsTexture=new v.Texture(e,i,{type:this.gl.FLOAT,filter:this.gl.NEAREST}),this.pointsFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer);const l=this.gl.COLOR_ATTACHMENT0;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.pointsTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.horizontalPassTexture=new v.Texture(e,i,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.horizontalPassFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.horizontalPassTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);const d=i/4,m=d,p=d;this.displacementTexture=new v.Texture(m,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR}),this.displacementFrameBuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,l,this.gl.TEXTURE_2D,this.displacementTexture.id,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.oldDisplacementTexture=new v.Texture(m,p,{type:this.gl.FLOAT,filter:this.gl.LINEAR})}buildProgram(e,i){const l=this.buildShader(e,this.gl.VERTEX_SHADER),d=this.buildShader(i,this.gl.FRAGMENT_SHADER),m=this.createProgram([l,d]);return this.checkShaders(l,d,m),m}initPrograms(){this.programPoints=this.buildProgram(Rt,Ct),this.programVolume=this.buildProgram(zt,Ft),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}volumePass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.horizontalPassFrameBuffer),this.gl.useProgram(this.programVolume);const e=this.gl.getAttribLocation(this.programVolume,"iVertex"),i=this.gl.getUniformLocation(this.programVolume,"poolSize");this.gl.uniform2f(i,a.params.simulation.poolSize.x,a.params.simulation.poolSize.z);const l=this.gl.getUniformLocation(this.programVolume,"horizontal");this.gl.uniform1i(l,!0);const d=this.gl.getUniformLocation(this.programVolume,"show");this.gl.uniform1i(d,!1);const m=this.gl.getUniformLocation(this.programVolume,"swapColor");this.gl.uniform1i(m,!1);const p=2,A=this.gl.FLOAT,R=!1,L=0,T=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPlane),this.gl.vertexAttribPointer(e,p,A,R,L,T),this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pointsTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.uniform1i(l,!1),this.gl.uniform1i(d,!1),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.horizontalPassTexture.id),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.viewport(0,0,this.displacementTexture.width,this.displacementTexture.height),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}pointPass(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pointsFrameBuffer),this.gl.useProgram(this.programPoints);const e=this.gl.getAttribLocation(this.programPoints,"iData1"),i=this.gl.getAttribLocation(this.programPoints,"iData2"),l=this.gl.getAttribLocation(this.programPoints,"iData3"),d=this.gl.getUniformLocation(this.programPoints,"invPoolSize");this.gl.uniform2f(d,1/a.params.simulation.poolSize.x,1/a.params.simulation.poolSize.z);const m=4,p=this.gl.FLOAT,A=!1,R=4,L=12*R;let T=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vboPoints),e>=0&&(this.gl.vertexAttribPointer(e,m,p,A,L,T),this.gl.enableVertexAttribArray(e)),T=4*R,i>=0&&(this.gl.vertexAttribPointer(i,m,p,A,L,T),this.gl.enableVertexAttribArray(i)),T=2*4*R,l>=0&&(this.gl.vertexAttribPointer(l,m,p,A,L,T),this.gl.enableVertexAttribArray(l)),this.gl.viewport(0,0,this.pointsTexture.width,this.pointsTexture.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.drawArrays(this.gl.POINTS,0,5*this.numSwimmers)}updateOldDisplacementTexture(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.displacementFrameBuffer),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.oldDisplacementTexture.id),this.gl.copyTexSubImage2D(this.gl.TEXTURE_2D,0,0,0,0,0,this.oldDisplacementTexture.width,this.oldDisplacementTexture.height)}draw(){this.updateOldDisplacementTexture(),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.pointPass(),this.volumePass(),this.gl.disable(this.gl.BLEND)}}Q=new WeakSet,st=function(e){const i=function(m,p){return p.getDistanceTraveled()-m.getDistanceTraveled()};let l=0;e.forEach(m=>{m.hasFinished()>.1&&l++});const d=e.slice(0,l).concat(e.slice(l).sort(i));for(let m=0;m<e.length;m++)e[m]=d[m];return e},pe=function(e,i){this.swimmersAttributes[this.numVecAttributes*4*e]=i.center.x,this.swimmersAttributes[this.numVecAttributes*4*e+1]=i.center.z,this.swimmersAttributes[this.numVecAttributes*4*e+7]=i.center.y},at=function(e,i){Z(this,Q,pe).call(this,e,i.body),this.swimmersAttributes[this.numVecAttributes*4*e+2]=i.divingDistance,this.swimmersAttributes[this.numVecAttributes*4*e+3]=i.divingTime,this.swimmersAttributes[this.numVecAttributes*4*e+4]=i.reactionTime,this.swimmersAttributes[this.numVecAttributes*4*e+5]=i.body.velocity.z*3.6,this.swimmersAttributes[this.numVecAttributes*4*e+6]=i.nationality,this.swimmersAttributes[this.numVecAttributes*4*e+8]=i.breakoutDistance,this.swimmersAttributes[this.numVecAttributes*4*e+9]=i.breakoutTime,this.swimmersAttributes[this.numVecAttributes*4*e+10]=i.finishTime,this.swimmersAttributes[this.numVecAttributes*4*e+11]=i.waterDamping};function Re(o=0,e=1){const i=1-Math.random(),l=Math.random();return Math.sqrt(-2*Math.log(i))*Math.cos(2*Math.PI*l)*e+o}const Lt=.5,It=2,he="Temps (s)",ve="event",Ce="eventX",kt="frequence (cylce/min)",$=class ${constructor(e){this.startingPoint=new v.Vector(e.x,e.y,e.z),this.center=new v.Vector(e.x,e.y,e.z),this.force=new v.Vector(0,0,190+Re(0,20)),this.reactionTime=Math.max(.1,Re(.15,.02));const i=.25,l=.15;this.body=new ge(e,i),this.body.showStreak=!0,this.leftArm=new ge(oe,l),this.rightArm=new ge(oe,l),this.leftFoot=new ge(oe,l),this.rightFoot=new ge(oe,l),this.body.cinematic=!$.useGravity,this.leftArm.cinematic=!0,this.rightArm.cinematic=!0,this.leftFoot.cinematic=!0,this.rightFoot.cinematic=!0,this.spheres=[this.body,this.leftArm,this.rightArm,this.leftFoot,this.rightFoot],this.divingDistance=0,this.divingTime=1e3,this.breakoutDistance=0,this.breakoutTime=1e3,this.nationality=Math.random()>.5?0:1,this.currendDataIndex=0,this.useTracking=!1,this.armPulsation=2*Math.PI*It,this.cycleTime=0,this.cyclePhase=0,this.finishTime=0,this.waterDamping=a.params.simulation.waterDamping}async parseData(e){await fetch(e).then(i=>{const l=i.headers.get("content-type");return!l||!l.includes("text/csv")?(console.log("no file found : "+e),null):i.text()}).then(i=>{if(!i)return;const l=i.split(`
`),d=l[0].split(/,|;/);this.data=l.slice(1).map(m=>{const p=m.split(/,|;/);return Object.fromEntries(d.map((A,R)=>[A,p[R]]))}),a.params.swimmers.useTracking&&(this.armPulsation=0)})}getDistanceTraveled(){const e=this.body.velocity.z,i=a.params.simulation.poolSize.z,l=this.body.center.z+i/2;return e>=0?l:2*i-l}startRace(){this.hasBrokeOut=!1,this.hasDove=!1,this.hasReacted=!1}jump(e=4.5){this.body.cinematic=!1,this.body.velocity=new v.Vector(0,0,e+Re(0,1)),this.body.center=new v.Vector(this.startingPoint.x,1,-a.params.simulation.poolSize.z/2)}swim(e){this.hasReacted=e,this.isSwimming=e,this.finishTime=0,e||(this.body.followTarget=!1),e?(this.body.cinematic=!1,this.useGravity=!0,this.body.center=new v.Vector(this.startingPoint.x,0,-a.params.simulation.poolSize.z/2)):(this.body.velocity=new v.Vector(0,0,0),this.body.center=new v.Vector(this.startingPoint.x,0,0))}hasFinished(){return this.finishTime>.1}getArmOffset(e,i){i+=this.cyclePhase;const l=this.body.velocity.z>=0?this.armPulsation:-this.armPulsation;return new v.Vector(0,Math.cos(l*e+i),Math.sin(l*e+i)).multiply(Lt)}setCurrentDataIndex(){if(this.currendDataIndex=0,!!this.data){for(;this.data[this.currendDataIndex]&&this.data[this.currendDataIndex][he]<a.getRaceTime();)this.currendDataIndex++;if(this.currendDataIndex+1<this.data.length){if(this.currendDataIndex-1>=0){const e=parseFloat(this.data[this.currendDataIndex][Ce]);let i=e;const l=a.params.simulation.poolSize.z;e>l&&(i=2*l-i),i-=l/2;const d=this.body.center;this.body.move(new v.Vector(d.x,d.y,i));const m=Math.sign(50-e)*.1;this.body.velocity=new v.Vector(0,0,m),console.log("vz : "+m)}this.body.setTarget(null),this.body.followTarget=!0,this.finishTime=0}}}findNextCycle(){let e=this.currendDataIndex+1;if(!this.data)return null;for(;this.data[e]&&this.data[e][ve]!="cycle";)e++;return this.data[e]?parseFloat(this.data[e][he]):null}setDamping(e){if(a.params.visualizations.customWaterPerturbation==a.params.visualizations.PARAMETER_CYCLES){const i=parseFloat(e[kt]);if(i<50)return;if(i>0){console.log("FREQ : "+i);const l=80,d=50;let m=(i-d)/(l-d);m=Math.max(Math.min(m,1),0);const p=.015,A=.25;this.waterDamping=p+(A-p)*(1-m)}}else this.waterDamping=a.params.simulation.waterDamping}handleTracking(e){if(this.hasReacted&&this.useTracking&&this.currendDataIndex<this.data.length&&this.data[this.currendDataIndex][he]<e){this.setDamping(this.data[this.currendDataIndex]);let i=null,l=this.startingPoint.x,d=e;const m=this.data[this.currendDataIndex+1];this.currendDataIndex+1<this.data.length&&(i=parseFloat(m[Ce]),d=parseFloat(m[he]));const p=a.params.simulation.poolSize.z;let A=-this.body.radius/2;const R=this.data[this.currendDataIndex][ve];if(R=="enter"||R=="turn"&&m[ve]!="under"){d=(e+d)/2,i=(this.body.center.z+p/2+i)/2;const T={[he]:d,[Ce]:i,[ve]:"under"};this.data.splice(this.currendDataIndex+1,0,T),A=-1.5}m&&m[ve]=="under"&&(A=-1.5),i>p&&(i=2*p-i),i-=a.params.simulation.poolSize.z/2;const L=new v.Vector(l,A,i);if(this.currendDataIndex+1<this.data.length?this.body.setTarget(L,d-e):this.body.setTarget(null),R=="cycle"){const T=parseFloat(this.data[this.currendDataIndex][he]),x=this.findNextCycle();if(x){const k=1/(x-T);this.armPulsation=2*Math.PI*k,this.cycleTime=0,this.cyclePhase==0?this.cyclePhase=Math.PI:this.cyclePhase=0}}else R=="finish"&&(this.finishTime=this.data[this.currendDataIndex][he],this.body.followTarget=!1,this.isSwimming=!1);this.currendDataIndex++}}moveSpheresAway(){this.rightArm.move(oe),this.leftArm.move(oe),this.rightFoot.move(oe),this.leftFoot.move(oe)}moveSpheres(e){this.cycleTime+=e;const i=this.getArmOffset(.5*this.cycleTime,0),l=this.getArmOffset(.5*this.cycleTime,Math.PI),d=this.getArmOffset(.5*this.cycleTime*2,0),m=this.getArmOffset(.5*this.cycleTime*2,Math.PI);this.rightArm.move(this.body.center.add(i).add(new v.Vector(De,0,0))),this.leftArm.move(this.body.center.add(l).add(new v.Vector(-De,0,0)));const p=this.body.velocity.z>=0?-Ie:Ie;this.rightFoot.move(this.body.center.add(new v.Vector(Le,d.y*.5,p))),this.leftFoot.move(this.body.center.add(new v.Vector(-Le,m.y*.5,p)))}update(e){const i=a.getRaceTime();!$.raceHasStarted&&this.data&&(this.useTracking=a.params.swimmers.useTracking),!this.hasReacted&&$.raceHasStarted&&(this.useTracking||i>this.reactionTime&&!a.params.swimmers.useTracking?(this.swim(!0),this.waterDamping=a.params.simulation.waterDamping,this.jump(),this.useTracking&&(this.body.cinematic=!0,this.body.followTarget=!0,this.body.setTarget(null))):(this.swim(!1),this.body.cinematic=!0,a.playingDemo?this.body.move(new v.Vector(this.body.center.x,1,-a.params.simulation.poolSize.z/2)):this.body.move(oe)),this.currendDataIndex=0),this.isSwimming&&(this.useTracking||this.body.addForce(this.force),this.body.center.y>-this.body.radius?this.moveSpheres(e):this.moveSpheresAway()),this.handleTracking(i);for(let d of this.spheres)d.update(e),d.spawnSplashes(e);if(this.body.center.z>-a.params.simulation.poolSize.z/2+20)return;$.raceHasStarted&&!this.hasDove&&this.body.center.y<0&&this.body.oldCenter.y>=0&&(this.divingDistance=this.body.center.z+a.params.simulation.poolSize.z/2,this.divingTime=i,this.hasDove=!0);const l=this.body.radius;$.raceHasStarted&&!this.hasBrokeOut&&this.body.center.y>-l&&this.body.oldCenter.y<=-l&&(this.breakoutDistance=this.body.center.z+a.params.simulation.poolSize.z/2,this.breakoutTime=i,this.hasBrokeOut=!0)}};te($,"useGravity",!1),te($,"raceHasStarted",!1),te($,"swimming",!1),te($,"attributes"),te($,"initAttributes",()=>{$.attributes=new Dt}),te($,"updateAttributesTexture",()=>{$.attributes.update()}),te($,"getAttributesTexture",()=>$.attributes.texture),te($,"bindDisplacementTexture",e=>{$.attributes.displacementTexture.bind(e)}),te($,"bindOldDisplacementTexture",e=>{$.attributes.oldDisplacementTexture.bind(e)}),te($,"reset",e=>{$.attributes.createRenderingTexture(e.x,e.y)});let U=$;const Bt=`
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
`;function de(o,e,i,l){this.water=e,this.gl=o,this.tileTexture=v.Texture.fromImage(document.getElementById("tiles"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGB}),this.franceTexture=v.Texture.fromImage(document.getElementById("france"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.chinaTexture=v.Texture.fromImage(document.getElementById("china"),{minFilter:this.gl.LINEAR_MIPMAP_LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.lettersTexture=v.Texture.fromImage(document.getElementById("letters"),{minFilter:this.gl.LINEAR,magFilter:this.gl.LINEAR,wrap:this.gl.REPEAT,format:this.gl.RGBA}),this.flagSize=l,this.flagSize=[1.5,1],this.flagCenter=i,this.lightDir=new v.Vector(2,2,-1).unit(),this.causticTex=new v.Texture(1024,1024),this.waterShaders=[];let d="";Object.entries(a.params.visualizations.customParametersDict).forEach(A=>{const R=A[1].name,L=A[1].value;d+="#define "+R+" "+L+`
`}),Object.entries(a.params.visualizations.renderingDict).forEach(A=>{const R=A[1].name,L=A[1].value;d+="#define "+R+" "+L+`
`});for(var m=0;m<2;m++)this.waterShaders[m]=new v.Shader(`
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
      
      
      `+be+Bt+`
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
        
        `+(m?`
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
    `);this.sphereMesh=v.Mesh.sphere({detail:10}),this.sphereShader=new v.Shader(ue+`
    out vec3 position;
  void main() {
    position = sphereCenter + gl_Vertex.xyz * sphereRadius;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);
  }
  `,ue+`
    in vec3 position;
    out vec4 fragColor;
  void main() {
    fragColor = vec4(getSphereColor(position), 1.0);
      vec4 info = texture(water, position.xz / poolSize.xz + 0.5);
    if (position.y < info.r) {
      fragColor.rgb *= underwaterColor * 1.2;
    }
  }
  `),this.reset(),this.cubeShader=new v.Shader(ue+`
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
  `),this.sphereCenter=new v.Vector,this.sphereRadius=0;var p=!!this.gl.getExtension("OES_standard_derivatives");this.causticsShader=new v.Shader(ue+`
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
  `)}de.prototype.reset=function(){this.cubeMesh=v.Mesh.cube({width:a.params.simulation.poolSize.x,height:2,depth:a.params.simulation.poolSize.z}),this.cubeMesh.triangles.splice(4,2),this.cubeMesh.compile()};de.prototype.updateCaustics=function(o){};de.prototype.renderWater=function(o,e,i){if(!a.renderWater)return;var l=new v.Raytracer;o.textureA.bind(0),this.tileTexture.bind(1),e.bind(2),this.causticTex.bind(3),this.franceTexture.bind(4),this.chinaTexture.bind(8),a.water.foam.foamTexNext.bind(9),this.lettersTexture.bind(7),o.areaConservationTexture.bind(5);const d=U.getAttributesTexture();d&&d.bind(6),this.gl.enable(this.gl.CULL_FACE),a.updateTransitions();for(var m=0;m<2;m++)this.gl.cullFace(m?this.gl.BACK:this.gl.FRONT),this.waterShaders[m].uniforms({renderWater:!0,light:this.lightDir,water:0,tiles:1,sky:2,causticTex:3,france:4,china:8,foamTex:9,areaConservationTexture:5,swimmersAttributesTexture:6,iChannel0:7,areaConservation:a.params.visualizations.areaConservationEnabled,flagSize:[1.5,2],flagCenter:[this.flagCenter.x,this.flagCenter.y],poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],poolSizeVertexShader:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],eye:l.eye,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,showProjectionGrid:o.showProjectionGrid,showAreaConservedGrid:o.showAreaConservedGrid,wr:o.WR_position,swimmersNumber:a.swimmers.length,cornerView:a.cornerView,showFlags:a.transitions.showFlags?a.transitions.showFlags.opacity:a.params.visualizations.showFlags,showWR:a.params.visualizations.showWR,showSpeed:a.params.visualizations.showSpeed,showDivingDistance:a.params.visualizations.showDivingDistance,showFinishTimes:a.params.visualizations.showFinishTimes,time:a.getRaceTime(),seed:a.time,foamEnabled:a.params.simulation.foam.enabled,shadowEnabled:i.enabled,shadowRadius:i.shadowRadius,shadowPower:i.shadowPower,showCircle:i.showCircle,shadowCircleRadius:i.circleRadius,shadowCircleStroke:i.circleStroke,showSwimmersLines:Math.round(a.params.visualizations.showSwimmersLinesDict[a.params.visualizations.showSwimmersLines]),swimmersLinesMode:a.params.visualizations.swimmersLinesModeDict[a.params.visualizations.swimmersLinesMode],medalsModeBeforeFinish:Math.round(a.params.visualizations.medalsModesDict[a.params.visualizations.medalsModeBeforeFinish]),medalsModeAfterFinish:Math.round(a.params.visualizations.medalsModesDict[a.params.visualizations.medalsModeAfterFinish]),rendering:a.params.visualizations.renderingDict[a.params.visualizations.rendering].value,waterColorParameter:a.params.visualizations.customParametersDict[a.params.visualizations.waterColorParameter].value}).draw(o.plane);this.gl.disable(this.gl.CULL_FACE)};de.prototype.renderSpheres=function(o){const e=[];a.swimmers.forEach(i=>i.spheres.forEach(l=>e.push(l)));for(let i of e)this.renderSphere(o,i)};de.prototype.renderSphere=function(o,e){o.textureA.bind(1),this.causticTex.bind(2),this.sphereShader.uniforms({light:this.lightDir,water:1,causticTex:2,sphereCenter:[e.center.x,e.center.y,e.center.z],sphereRadius:e.radius*a.spheresRadiusCoeff,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z]}).draw(e.mesh)};de.prototype.renderSphereOld=function(o){o.textureA.bind(0),this.causticTex.bind(1),this.sphereShader.uniforms({light:this.lightDir,water:0,causticTex:1,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z]}).draw(this.sphereMesh)};de.prototype.renderCube=function(o){a.renderCube&&(this.gl.enable(this.gl.CULL_FACE),o.textureA.bind(0),this.tileTexture.bind(1),this.causticTex.bind(2),this.cubeShader.uniforms({light:this.lightDir,water:0,tiles:1,causticTex:2,sphereCenter:this.sphereCenter,sphereRadius:this.sphereRadius,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],renderWater:a.renderWater}).draw(this.cubeMesh),this.gl.disable(this.gl.CULL_FACE))};function Ve(o,e){this.gl=e,this.id=e.createTexture(),e.bindTexture(e.TEXTURE_CUBE_MAP,this.id),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.xneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.xpos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.yneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.ypos),e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.zneg),e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o.zpos)}Ve.prototype.bind=function(o){this.gl.activeTexture(this.gl.TEXTURE0+(o||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.id)};Ve.prototype.unbind=function(o){this.gl.activeTexture(this.gl.TEXTURE0+(o||0)),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null)};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class se{constructor(e,i,l,d,m="div"){this.parent=e,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(d),this.$name=document.createElement("div"),this.$name.classList.add("name"),se.nextNameID=se.nextNameID||0,this.$name.id="lil-gui-name-"+ ++se.nextNameID,this.$widget=document.createElement(m),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Nt extends se{constructor(e,i,l){super(e,i,l,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Be(o){let e,i;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!i&&"#"+i}const Ot={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Be,toHexString:Be},xe={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},Vt={isPrimitive:!1,match:Array.isArray,fromHexString(o,e,i=1){const l=xe.fromHexString(o);e[0]=(l>>16&255)/255*i,e[1]=(l>>8&255)/255*i,e[2]=(255&l)/255*i},toHexString:([o,e,i],l=1)=>xe.toHexString(o*(l=255/l)<<16^e*l<<8^i*l<<0)},Ut={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,i=1){const l=xe.fromHexString(o);e.r=(l>>16&255)/255*i,e.g=(l>>8&255)/255*i,e.b=(255&l)/255*i},toHexString:({r:o,g:e,b:i},l=1)=>xe.toHexString(o*(l=255/l)<<16^e*l<<8^i*l<<0)},Gt=[Ot,xe,Vt,Ut];class Wt extends se{constructor(e,i,l,d){var m;super(e,i,l,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(m=this.initialValue,Gt.find(p=>p.match(m))),this._rgbScale=d,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const p=Be(this.$text.value);p&&this._setValueFromHexString(p)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ze extends se{constructor(e,i,l){super(e,i,l,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",d=>{d.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Xt extends se{constructor(e,i,l,d,m,p){super(e,i,l,"number"),this._initInput(),this.min(d),this.max(m);const A=p!==void 0;this.step(A?p:this._getImplicitStep(),A),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=100*i+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=T=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+T),this.$input.value=this.getValue())};let i,l,d,m,p,A=!1;const R=T=>{if(A){const x=T.clientX-i,P=T.clientY-l;Math.abs(P)>5?(T.preventDefault(),this.$input.blur(),A=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>5&&L()}if(!A){const x=T.clientY-d;p-=x*this._step*this._arrowKeyMultiplier(T),m+p>this._max?p=this._max-m:m+p<this._min&&(p=this._min-m),this._snapClampSetValue(m+p)}d=T.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",R),window.removeEventListener("mouseup",L)};this.$input.addEventListener("input",()=>{let T=parseFloat(this.$input.value);isNaN(T)||(this._stepExplicit&&(T=this._snap(T)),this.setValue(this._clamp(T)))}),this.$input.addEventListener("keydown",T=>{T.code==="Enter"&&this.$input.blur(),T.code==="ArrowUp"&&(T.preventDefault(),e(this._step*this._arrowKeyMultiplier(T))),T.code==="ArrowDown"&&(T.preventDefault(),e(this._step*this._arrowKeyMultiplier(T)*-1))}),this.$input.addEventListener("wheel",T=>{this._inputFocused&&(T.preventDefault(),e(this._step*this._normalizeMouseWheel(T)))},{passive:!1}),this.$input.addEventListener("mousedown",T=>{i=T.clientX,l=d=T.clientY,A=!0,m=this.getValue(),p=0,window.addEventListener("mousemove",R),window.addEventListener("mouseup",L)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=P=>{const k=this.$slider.getBoundingClientRect();let w=(S=P,z=k.left,N=k.right,V=this._min,G=this._max,(S-z)/(N-z)*(G-V)+V);var S,z,N,V,G;this._snapClampSetValue(w)},i=P=>{e(P.clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",l)};let d,m,p=!1;const A=P=>{P.preventDefault(),this._setDraggingStyle(!0),e(P.touches[0].clientX),p=!1},R=P=>{if(p){const k=P.touches[0].clientX-d,w=P.touches[0].clientY-m;Math.abs(k)>Math.abs(w)?A(P):(window.removeEventListener("touchmove",R),window.removeEventListener("touchend",L))}else P.preventDefault(),e(P.touches[0].clientX)},L=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",R),window.removeEventListener("touchend",L)},T=this._callOnFinishChange.bind(this);let x;this.$slider.addEventListener("mousedown",P=>{this._setDraggingStyle(!0),e(P.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",l)}),this.$slider.addEventListener("touchstart",P=>{P.touches.length>1||(this._hasScrollBar?(d=P.touches[0].clientX,m=P.touches[0].clientY,p=!0):A(P),window.addEventListener("touchmove",R,{passive:!1}),window.addEventListener("touchend",L))},{passive:!1}),this.$slider.addEventListener("wheel",P=>{if(Math.abs(P.deltaX)<Math.abs(P.deltaY)&&this._hasScrollBar)return;P.preventDefault();const k=this._normalizeMouseWheel(P)*this._step;this._snapClampSetValue(this.getValue()+k),this.$input.value=this.getValue(),clearTimeout(x),x=setTimeout(T,400)},{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+i,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:l}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,l=-e.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){const i=Math.round(e/this._step)*this._step;return parseFloat(i.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ht extends se{constructor(e,i,l,d){super(e,i,l,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(d)?d:Object.values(d),this._names=Array.isArray(d)?d:Object.keys(d),this._names.forEach(m=>{const p=document.createElement("option");p.innerHTML=m,this.$select.appendChild(p)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.innerHTML=i===-1?e:this._names[i],this}}class $t extends se{constructor(e,i,l){super(e,i,l,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",d=>{d.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let je=!1;class Ue{constructor({parent:e,autoPlace:i=e===void 0,container:l,width:d,title:m="Controls",injectStyles:p=!0,touchStyles:A=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",R=>{R.code!=="Enter"&&R.code!=="Space"||(R.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(m),A&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!je&&p&&(function(R){const L=document.createElement("style");L.innerHTML=R;const T=document.querySelector("head link[rel=stylesheet], head style");T?document.head.insertBefore(L,T):document.head.appendChild(L)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),je=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),d&&this.domElement.style.setProperty("--width",d+"px"),this.domElement.addEventListener("keydown",R=>R.stopPropagation()),this.domElement.addEventListener("keyup",R=>R.stopPropagation())}add(e,i,l,d,m){if(Object(l)===l)return new Ht(this,e,i,l);const p=e[i];switch(typeof p){case"number":return new Xt(this,e,i,l,d,m);case"boolean":return new Nt(this,e,i);case"string":return new $t(this,e,i);case"function":return new ze(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,p)}addColor(e,i,l=1){return new Wt(this,e,i,l)}addFolder(e){return new Ue({parent:this,title:e})}load(e,i=!0){return e.controllers&&this.controllers.forEach(l=>{l instanceof ze||l._name in e.controllers&&l.load(e.controllers[l._name])}),i&&e.folders&&this.folders.forEach(l=>{l._title in e.folders&&l.load(e.folders[l._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof ze)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),e&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const l=m=>{m.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const d=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=d+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}const ne=new Ue,Yt=function(o,e){const i=ne.addFolder("visualizations");i.close(),i.add(a,"useConfigFile").name("use configuration file");const l={showTimeline:!0};i.add(l,"showTimeline").name("show event timeline").onChange(S=>{const z=document.getElementById("event-editor");z&&(z.style.display=S?"block":"none")}),i.add(a.params.visualizations,"showFlags").name("show flags").listen(),i.add(a.params.visualizations,"showStreaks").name("show streaks").listen(),i.add(a.params.visualizations,"showWR").name("show world record").listen(),i.add(a.params.visualizations,"showSwimmersLines",a.params.visualizations.swimmersLinesList).name("show neighbours lines").listen(),i.add(a.params.visualizations,"swimmersLinesMode",a.params.visualizations.swimmersLinesModeList).name("show neighbours lines").listen(),i.add(a.params.visualizations,"customWaterPerturbation",a.params.visualizations.customParametersList).name("custom water perturbation").listen(),i.add(a.params.visualizations,"waterColorParameter",a.params.visualizations.customParametersList).name("water color parameter").listen(),i.add(a.params.visualizations,"medalsModeBeforeFinish",["none","stars","bright","lanes"]).name("show potential medals").listen(),i.add(a.params.visualizations,"medalsModeAfterFinish",["none","stars","bright","lanes"]).name("show potential medals after finish").listen(),i.add(a.params.visualizations,"showSpeed").name("show speed").listen(),i.add(a.params.visualizations,"showDivingDistance").name("show diving distance").listen(),i.add(a.params.visualizations.shadow,"enabled").name("show shadow"),i.add(a.params.visualizations,"areaConservationEnabled","areaConservationEnabled").name("area conservation").listen(),i.add(a.params.visualizations,"rendering",a.params.visualizations.renderingList).name("rendering").listen().onChange(()=>{a.params.visualizations.rendering=="toon"&&(a.params.simulation.waterDamping=.35)});const d=ne.addFolder("video");d.close(),d.add(a.params.video,"thresholdBlending").name("threshold blending"),d.add(a.params.video,"blendingThreshold",.1,.5).name("blending threshold"),d.add(a.params.video,"show").name("show").listen(),d.add(a.params.video,"hideObstructions").name("hide obstructions"),d.add(a.params.video,"hideObstructionThreshold",0,.5).name("obstructions threshold");const m=i.addFolder("Sparks");m.close(),m.add(a.params.visualizations.sparks,"enabled").name("sparks enabled"),m.add(a.params.visualizations.sparks,"glow",1,30).name("sparks glow factor"),m.add(a.params.visualizations.sparks,"lengthFactor",.1,10).name("sparks length factor"),m.add(a.params.visualizations.sparks,"glowOffset",.1,3).name("sparks glow offset"),m.add(a.params.visualizations.sparks,"stroke",.001,.05).name("sparks stroke"),m.add(a.params.visualizations.sparks,"num",10,et).step(1).name("sparks number"),m.add(a.params.visualizations.sparks,"sizeFactor",10,100).name("size factor");const p=i.addFolder("Swimmers shadows");p.close(),p.add(a.params.visualizations.shadow,"shadowRadius",0,2).name("shadow radius"),p.add(a.params.visualizations.shadow,"shadowPower",.1,2).name("shadow power"),p.add(a.params.visualizations.shadow,"showCircle").name("circle"),p.add(a.params.visualizations.shadow,"circleRadius",.5,2).name("circle radius"),p.add(a.params.visualizations.shadow,"circleStroke",.1,.5).name("circle stroke");const A=ne.addFolder("Simulation");A.close(),A.add(a.params.simulation,"optimized").name("optimized").listen(),A.add(a.params.simulation.poolSize,"x",1,25).name("pool width").onChange(function(S){e()}).listen(),A.add(a.params.simulation.poolSize,"z",1,50).name("pool height").onChange(function(S){e()}).listen(),A.add(a.params.simulation.poolSize,"y",1,3).name("pool depth").onChange(function(S){e()}).listen(),A.add(a.params.simulation,"waterDamping",.005,.4).name("water damping").listen();const R=A.addFolder("foam");R.close(),R.add(a.params.simulation.foam,"enabled").name("enabled"),R.add(a.params.simulation.foam,"velThreshold",0,15).name("velocity threshold"),R.add(a.params.simulation.foam,"velMax",0,20).name("max velocity"),R.add(a.params.simulation.foam,"dispersion",0,.1).name("dispersion"),R.add(a.params.simulation.foam,"timeVariation",0,10).name("time variation"),R.add(a.params.simulation.foam,"spaceVariation",0,100).name("space variation"),R.add(a.params.simulation.foam,"attenuation",0,.2).name("attenuation");const L=A.addFolder("splash");L.close(),L.add(a.params.simulation.splashes,"enabled").name("enabled"),L.add(a.params.simulation.splashes,"strengthThreshold",.1,10).name("strength threshold");const T=ne.addFolder("swimmers");T.close(),T.add(a.params.swimmers,"showSpheres").name("show spheres").listen(),T.add(a.params.swimmers,"useTracking").name("use tracking data").listen();const x=ne.addFolder("camera");x.close(),x.add(a.params,"fov",28,45).name("fov").listen().onChange(function(S){a.params.visualizations.sparks.fov=S*2*Math.PI/360,o.matrixMode(o.PROJECTION),o.loadIdentity(),o.perspective(a.params.fov,o.canvas.width/o.canvas.height,.01,100),o.matrixMode(o.MODELVIEW),console.log("perspective : "+a.params.fov)});const P=ne.addFolder("quiver");P.close(),P.add(a.params.quiver,"amplitude",.01,1).name("amplitude"),P.add(a.params.quiver,"omega",.5,5).name("omega"),P.add(a.params.quiver,"amplitudeFactor",.5,.9).name("amplitude factor"),P.add(a.params.quiver,"frequencyFactor",1.1,2).name("frequency factor"),P.add(a.params.quiver,"waveLength",1,30).name("wave length");const k=ne.addFolder("corner view");k.close(),k.add(a.params.cornerView,"show").name("show");const w=ne.addFolder("chrono-photography");w.close(),w.add(a.params.chronoPhotography,"available").name("available").onChange(()=>{a.params.chronoPhotography.available?a.drawingFrameBuffer=a.chronoFrameBuffer:a.drawingFrameBuffer=null}),a._gui=ne},Fe=150,ce=100;function qt(o){const e=document.createElement("div");if(document.body.appendChild(e),e.id="event-editor",e.style.position="fixed",e.display="block",e.style.bottom="60px",e.style.left="10px",e.style.right="10px",e.style.height="120px",e.style.zIndex="4",e.style.background="#222",e.style.color="#fff",e.style.overflow="auto",e.style.padding="4px",e.style.fontSize="12px",e.style.position=e.style.position||"relative",!e){console.warn(`event editor container "${o}" not found`);return}let i,l=!1;const d=[{name:"showFlags",type:"boolean"},{name:"showWR",type:"boolean"},{name:"showSpeed",type:"boolean"},{name:"showDivingDistance",type:"boolean"},{name:"showFinishTimes",type:"boolean"},{name:"showSwimmersLines",type:"select",options:a.params.visualizations.swimmersLinesList},{name:"swimmersLinesMode",type:"select",options:a.params.visualizations.swimmersLinesModeList},{name:"customWaterPerturbation",type:"select",options:a.params.visualizations.customParametersList},{name:"waterColorParameter",type:"select",options:a.params.visualizations.customParametersList},{name:"medalsModeBeforeFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"medalsModeAfterFinish",type:"select",options:["none","stars","bright","lanes"]},{name:"rankSwimmerToggle",type:"number",min:1,max:10},{name:"showStreaks",type:"boolean"}];function m(w){const S=document.createElement("div");S.style.flex="1",S.style.padding="4px",S.style.background="#222",S.style.border="1px solid #555",S.style.borderRadius="4px",S.style.fontFamily="monospace",S.style.fontSize="12px",S.style.whiteSpace="pre-wrap",S.style.overflow="auto",S.style.maxHeight="100px";function z(){const N=w.params;if(Object.keys(N).length===0){S.textContent="(no params)";return}const V=Object.entries(N).map(([G,O])=>`${G}: ${JSON.stringify(O)}`);S.textContent=V.join(`
`)}return z(),{element:S,update:z}}function p(w,S){const z=document.createElement("div");z.style.display="flex",z.style.flexWrap="wrap",z.style.margin="4px 0",z.style.background="#333",z.style.padding="4px";function N(){S&&(S(),k())}d.forEach(B=>{const j=document.createElement("div");j.style.marginRight="8px",j.style.marginBottom="4px";const ee=document.createElement("label");ee.style.whiteSpace="nowrap",ee.textContent=B.name+":",j.appendChild(ee);let I;if(B.type==="boolean"){I=document.createElement("select"),[{value:"",label:"—"},{value:"true",label:"ON"},{value:"false",label:"OFF"}].forEach(q=>{const _=document.createElement("option");_.value=q.value,_.textContent=q.label,I.appendChild(_)});const Y=w.params[B.name];Y===void 0?I.value="":Y===!0?I.value="true":Y===!1&&(I.value="false"),I.addEventListener("change",()=>{I.value===""?delete w.params[B.name]:I.value==="true"?w.params[B.name]=!0:I.value==="false"&&(w.params[B.name]=!1),N()})}else if(B.type==="select"){I=document.createElement("select");const H=document.createElement("option");H.value="",H.textContent="—",I.appendChild(H),B.options.forEach(Y=>{const q=document.createElement("option");q.value=Y,q.textContent=Y,I.appendChild(q)}),I.value=w.params[B.name]||"",I.addEventListener("change",()=>{I.value===""?delete w.params[B.name]:w.params[B.name]=I.value,N()})}else B.type==="number"&&(I=document.createElement("input"),I.type="number",B.min!==void 0&&(I.min=B.min),B.max!==void 0&&(I.max=B.max),I.placeholder="—",I.style.width="50px",I.value=w.params[B.name]!==void 0?w.params[B.name]:"",I.addEventListener("change",()=>{if(I.value==="")delete w.params[B.name];else{const H=parseFloat(I.value);isNaN(H)||(w.params[B.name]=H)}N()}));I&&j.appendChild(I),z.appendChild(j)});const V=document.createElement("div");V.style.marginRight="8px",V.style.marginBottom="4px";const G=document.createElement("label");G.style.whiteSpace="nowrap",G.textContent="transition :",V.appendChild(G);const O=document.createElement("input");return O.type="number",O.min=0,O.placeholder="—",O.style.width="50px",O.value=w.transition!==void 0?w.transition.duration:"",O.addEventListener("change",()=>{if(O.value===""){delete w.transition;return}const B=parseFloat(O.value);isNaN(B)||(w.transition={type:"dissolve",duration:B},N())}),V.appendChild(O),z.appendChild(V),z}function A(){const w=document.createElement("div");w.style.marginTop="8px",w.style.padding="8px",w.style.background="#555",w.style.border="1px solid #777";const S=document.createElement("div");S.textContent="Add New Event",S.style.fontWeight="bold",S.style.marginBottom="4px",w.appendChild(S);const z=document.createElement("input");z.type="number",z.placeholder="Distance",z.style.width="auto",z.style.marginRight="8px",w.appendChild(z);const N={params:{}},V=p(N,null);V.style.margin="4px 0",w.appendChild(V);const G=document.createElement("button");G.textContent="OK",G.addEventListener("click",()=>{const B=parseFloat(z.value);if(isNaN(B)){alert("Please enter a valid distance");return}const j={distance:B,...N};a.events.push(j),k(),i.remove(),i=null}),w.appendChild(G);const O=document.createElement("button");return O.textContent="cancel",O.addEventListener("click",()=>{i.remove(),i=null}),w.appendChild(O),w}function R(w,S,{title:z="",id:N=null,color:V="#e74c3c"}){const G=w/S*100,O=document.createElement("div");return O.style.position="absolute",O.style.left=G+"%",O.style.transform="translateX(-50%)",O.style.width="4px",O.style.height="100%",O.style.background=V,O.style.cursor="pointer",O.title=z,N&&(O.id=N),O.addEventListener("click",()=>{P(idx)}),O}function L(){let w=document.getElementById("distance-marker");const S=a.swimmers[0].getDistanceTraveled();if(!w){if(l)return;const z=document.getElementById("timeline-track");w=R(S,ce,{color:"blue",id:"distance-marker"}),z.appendChild(w)}w.style.left=S+"%"}function T(w){l=w,x()}function x(){e.innerHTML="";const w=document.createElement("button");if(w.textContent=l?"□":"—",w.style.position="absolute",w.style.top="0",w.style.right="0",w.style.width="20px",w.style.height="20px",w.style.zIndex="100001",w.addEventListener("click",()=>{l=!l,x()}),e.appendChild(w),l){e.style.height="20px";return}e.style.height="300px";const S=document.createElement("div");if(S.style.position="relative",S.style.top="0px",S.style.left="50%",S.style.transform="translateX(-50%)",S.style.width="80px",S.style.height="15px",S.style.background="grey",S.style.border="1px solid black",S.style.cursor="ns-resize",S.style.zIndex="100000",S.style.lineHeight="16px",S.style.textAlign="center",S.textContent="drag",e.appendChild(S),S.addEventListener("mousedown",r=>{r.preventDefault();const c=r.clientY,h=e.offsetHeight;function u(b){const y=h-(b.clientY-c);y>20&&(e.style.height=y+"px")}function f(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",f)}),!a.events){e.textContent="no events defined";return}const z=document.createElement("div");e.appendChild(z),z.style.marginRight="8px",z.style.marginBottom="4px";const N=document.createElement("label");N.style.whiteSpace="nowrap",N.textContent="select scene",N.style.margin="30px",z.appendChild(N);const V=document.createElement("select");V.style.width="auto",a.scenesList.forEach(r=>{const c=document.createElement("option");c.textContent=r.title,c.value=r.title,V.appendChild(c)}),V.addEventListener("change",()=>{a.setScene(V.value)}),z.appendChild(V);const G=a.events.slice().sort((r,c)=>{const h=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,u=c.distance!==void 0?c.distance:c.time!==void 0?c.time:0;return h-u}),O=new Set;G.forEach(r=>{r.params&&Object.keys(r.params).forEach(c=>O.add(c))});let B=d.map(r=>r.name).filter(r=>O.has(r));const j=["#4caf50","#2196f3","#ff9800","#9c27b0","#f44336","#009688","#e91e63","#3f51b5"],ee={};B.forEach((r,c)=>{ee[r]=j[c%j.length]});const I={},H={};B.forEach(r=>{H[r]=!1,I[r]=0});const Y=[];if(G.forEach(r=>{const c=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0;r.params&&Object.keys(r.params).forEach(h=>{if(B.includes(h)){const u=!!r.params[h];u!==H[h]&&(H[h]&&Y.push({name:h,start:I[h],end:c}),H[h]=u,I[h]=c)}})}),B.forEach(r=>{H[r]&&Y.push({name:r,start:I[r],end:ce})}),B.length>0){const r=document.createElement("div");r.style.position="relative";const c=20;r.style.height=B.length*c+"px",r.style.background="#222",r.style.marginBottom="4px",r.style.marginTop="10px",B.forEach((u,f)=>{const b=document.createElement("div");b.textContent=u,b.style.position="absolute",b.style.left="0",b.style.top=f*c+2+"px",b.style.width=Fe+"px",b.style.color="#aaa",b.style.fontSize="10px",b.style.pointerEvents="none",r.appendChild(b)});const h=document.createElement("div");h.style.position="absolute",h.style.left=Fe+"px",h.style.top="0",h.style.right="0",h.style.bottom="0",h.style.overflow="hidden",r.appendChild(h),Y.forEach(u=>{const f=document.createElement("div"),b=u.start/ce*100,y=(u.end-u.start)/ce*100;f.style.position="absolute",f.style.left=b+"%",f.style.top=B.indexOf(u.name)*c+2+"px",f.style.height=c-4+"px",f.style.width=y+"%",f.style.background=ee[u.name]||"#4caf50",f.title=`${u.name}: ${u.start.toFixed(2)} → ${u.end.toFixed(2)}`;const g=document.createElement("span");if(g.textContent=`${u.name}: ${u.start.toFixed(2)} → ${u.end.toFixed(2)}`,g.style.position="absolute",g.style.top="0",g.style.left="2px",g.style.fontSize="10px",g.style.color="white",g.style.pointerEvents="none",g.style.whiteSpace="nowrap",g.style.overflow="hidden",g.style.textOverflow="ellipsis",f.appendChild(g),u.end<ce){const E=document.createElement("div");E.style.position="absolute",E.style.right="0",E.style.top="0",E.style.width="5px",E.style.height="100%",E.style.background="rgba(255,255,255,0.5)",E.style.cursor="ew-resize",f.appendChild(E),E.addEventListener("mousedown",M=>{M.preventDefault(),M.stopPropagation();const F=M.clientX,D=f.offsetWidth;function X(J){const re=J.clientX-F,le=Math.max(1,D+re),fe=le/h.offsetWidth*100;f.style.width=fe+"%";const ht=u.start+le/h.offsetWidth*ce;g.textContent=`${u.name}: ${u.start.toFixed(2)} → ${ht.toFixed(2)}`}function W(){document.removeEventListener("mousemove",X),document.removeEventListener("mouseup",W);const J=f.offsetWidth,re=u.start+J/h.offsetWidth*ce,le=G.find(fe=>(fe.distance!==void 0?fe.distance:fe.time!==void 0?fe.time:0)===u.end);le&&(le.distance!==void 0?le.distance=re:le.time!==void 0&&(le.time=re)),k()}document.addEventListener("mousemove",X),document.addEventListener("mouseup",W)})}h.appendChild(f)}),e.appendChild(r)}const q=document.createElement("div");q.style.position="relative",q.style.height="40px",q.style.background="#222",q.style.marginBottom="4px",q.style.paddingLeft="80px";const _=document.createElement("div");_.id="timeline-track",_.style.position="absolute",_.style.background="#444",_.style.left=Fe+"px",_.style.top="0",_.style.right="0",_.style.bottom="0",q.appendChild(_),G.forEach((r,c)=>{const h=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,u=`event ${c}: ${JSON.stringify(r.params)}`,f=R(h,ce,{title:u});_.appendChild(f)}),e.appendChild(q),G.forEach((r,c)=>{const h=document.createElement("div");h.style.display="flex",h.style.flexDirection="column",h.style.marginBottom="4px";const u=document.createElement("div");u.style.display="flex",u.style.alignItems="center";const f=document.createElement("input");f.type="number",f.style.width="60px",f.value=r.distance!==void 0?r.distance:r.time!==void 0?r.time:0,f.addEventListener("change",()=>{const M=parseFloat(f.value);isNaN(M)||(r.distance!==void 0?r.distance=M:r.time=M,k())}),u.appendChild(f);const b=m(r);u.appendChild(b.element);const y=document.createElement("button");y.textContent="⚙",y.style.marginLeft="4px",u.appendChild(y);const g=document.createElement("button");g.textContent="✖",g.style.marginLeft="4px",g.addEventListener("click",()=>{const M=a.events.indexOf(G[c]);M!==-1&&(a.events.splice(M,1),x())}),u.appendChild(g),h.appendChild(u);let E;y.addEventListener("click",()=>{E?(E.remove(),E=null):(E=p(r,b.update),h.appendChild(E))}),e.appendChild(h)});const s=document.createElement("button");s.textContent="+ add event",s.addEventListener("click",()=>{i?(i.remove(),i=null):(i=A(),e.appendChild(i),e.scrollTop=e.scrollHeight)}),e.appendChild(s);const n=document.createElement("button");n.textContent="export JSON",n.style.marginLeft="8px",n.addEventListener("click",()=>{const r=JSON.stringify(a.events,null,2),c=new Blob([r],{type:"application/json"}),h=URL.createObjectURL(c),u=document.createElement("a");u.href=h,u.download="vis-config.json",u.click(),URL.revokeObjectURL(h)}),e.appendChild(n);const t=document.createElement("input");t.type="file",t.accept=".json",t.style.marginLeft="8px",t.addEventListener("change",r=>{const c=r.target.files[0];if(c){const h=new FileReader;h.onload=u=>{try{const f=JSON.parse(u.target.result);a.events=f,k()}catch(f){alert("Invalid JSON: "+f.message)}},h.readAsText(c)}}),e.appendChild(t)}function P(w){const z=e.querySelectorAll("div")[1+w];z&&z.scrollIntoView({behavior:"smooth",block:"center"})}function k(){a.events.sort((w,S)=>{const z=w.distance!==void 0?w.distance:w.time!==void 0?w.time:0,N=S.distance!==void 0?S.distance:S.time!==void 0?S.time:0;return z-N}),x()}x(),a._renderTimeline=x,a._updateDistanceMarker=L,a._setPannelMinimized=T}const nt=new v.Mesh.plane({width:2,height:2,coords:!0,normals:!0}),jt=new v.Shader(`
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
    uniform sampler2D oldPicture;
    uniform vec2 linep1;
    uniform vec2 linep2;
    out vec4 fragColor;




    bool isInFixedPart(vec2 p) {
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

    void main() {
        vec4 oldPix = texture(oldPicture, vTextureCoord);
        if (oldPix.rgb != vec3(0)) {
            fragColor = oldPix;
            return;
        }
        if(isInFixedPart(vTextureCoord*2.-1.)) fragColor = texture(screen, vTextureCoord);
        if(isInFixedPart(vTextureCoord*2.-1.)) texture(screen, vTextureCoord);
        // if(isInFixedPart(pos)) fragColor = texture(screen, vTextureCoord);
        else fragColor = vec4(0., 0., 0., 0.);
    }
`),Kt=new v.Shader(`
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
`);let we=new v.Texture,Ne=new v.Texture,lt=!1,Ke=null;const ct=(o,e,i)=>{lt=!0,we=new v.Texture(o,e,{type:i.FLOAT,filter:i.NEAREST}),Ne=new v.Texture(o,e,{type:i.FLOAT,filter:i.NEAREST}),Ke=i.createFramebuffer(),i.bindFramebuffer(i.FRAMEBUFFER,Ke);const l=i.COLOR_ATTACHMENT0;i.framebufferTexture2D(i.FRAMEBUFFER,l,i.TEXTURE_2D,we.id,0),i.bindFramebuffer(i.FRAMEBUFFER,null)};function Ze(o){o.x/=a.gl.canvas.width/2,o.x-=1,o.y/=a.gl.canvas.height/2,o.y-=1}const Zt=()=>{lt||ct(a.gl.canvas.width,a.gl.canvas.height,a.gl);const o=a.params.simulation.poolSize,e=a.gl.project(o.x/2,0,a.distanceFixed+1-o.z/2),i=a.gl.project(-o.x/2,0,a.distanceFixed+1-o.z/2);Ze(e),Ze(i),Ne.drawTo(()=>{we.bind(0),a.gl.activeTexture(a.gl.TEXTURE1),a.gl.bindTexture(a.gl.TEXTURE_2D,a.drawingTexture),jt.uniforms({oldPicture:0,screen:1,distanceFixed:a.distanceFixed,poolSize:[a.params.simulation.poolSize.x,a.params.simulation.poolSize.y,a.params.simulation.poolSize.z],linep1:[e.x,e.y],linep2:[i.x,i.y]}).draw(nt)}),we.swapWith(Ne),a.gl.bindFramebuffer(a.gl.FRAMEBUFFER,a.drawingFrameBuffer)},Jt=()=>{a.gl.bindFramebuffer(a.gl.FRAMEBUFFER,null),we.bind(7),a.gl.activeTexture(a.gl.TEXTURE8),a.gl.bindTexture(a.gl.TEXTURE_2D,a.drawingTexture),Kt.uniforms({picture:7,screen:8}).draw(nt)};a._fixTexture=Zt;a._clearChronoTexture=ct;function Qt(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}function ei(o){var e=Qt(o);e=="WebGL not supported"&&(e='Your browser does not support WebGL.<br>Please see    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">    Getting a WebGL Implementation</a>.');var i=document.getElementById("loading");i.innerHTML=e,i.style.zIndex=1}window.onerror=ei;var Pe,K;const ti=10,C=a.gl;var _e,Oe;U.initAttributes();function dt(){document.getElementById("warning").hidden=!(a.resolution.x*a.resolution.y>3e5&&a.water&&a.params.visualizations.areaConservationEnabled)}let Me=0;function ii(o){Me+=o,Me>=1&&(document.getElementById("fps").innerText=`${(1/o).toFixed(1)} FPS`,Me=0)}function me(){console.log("reset"),document.getElementById("resolution").innerText=`Resolution: ${a.resolution.x} x ${a.resolution.y}`,dt(),_e=new v.Vector(0,-a.params.simulation.poolSize.z/2+1),a.water.reset(a.resolution),K.flagCenter=_e,K.flagSize=Oe,K.reset();const o=a.params.simulation.poolSize.x/ti;let e=a.params.simulation.poolSize.x/2-o/2;for(let i of a.swimmers)i.body.center.x=e,i.startingPoint.x=e,e-=o}function ri(o){const e=parseFloat(o.target.value);isNaN(e)||(a.setRaceTime(e),a.swimmers.forEach(i=>i.setCurrentDataIndex()))}window.onload=function(){var o=window.devicePixelRatio||1,e=document.getElementById("help");function i(){var r=innerWidth,c=innerHeight;C.canvas.width=r*o,C.canvas.height=c*o,C.canvas.style.width=r+"px",C.canvas.style.height=c+"px",C.viewport(0,0,C.canvas.width,C.canvas.height),C.matrixMode(C.PROJECTION),C.loadIdentity(),C.perspective(a.params.fov,C.canvas.width/C.canvas.height,.01,100),C.matrixMode(C.MODELVIEW),a.resetDrawingTexture(),t()}document.body.appendChild(C.canvas),C.canvas.oncontextmenu=function(r){r.preventDefault()},C.clearColor(0,0,0,1),_e=new v.Vector(0,-a.params.simulation.poolSize.z/2+1),Oe=.7;const l=document.getElementById("time-slider");l&&l.addEventListener("input",ri);const d=document.getElementById("drop-zone");let m=0;document.addEventListener("dragenter",r=>{m++,d.style.display="flex"}),document.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="copy"}),document.addEventListener("dragleave",r=>{m--,m===0&&(d.style.display="none")}),Yt(C,me),a._reset=me,setTimeout(()=>{qt("event-editor")},50),K=new de(C,a.water,_e,Oe),Pe=new Ve({xneg:document.getElementById("xneg"),xpos:document.getElementById("xpos"),yneg:document.getElementById("ypos"),ypos:document.getElementById("ypos"),zneg:document.getElementById("zneg"),zpos:document.getElementById("zpos")},C);const p=new U(new v.Vector(0,0,0));if(a.swimmers.push(p),a.water=new ae(a.gl),!a.water.textureA.canDrawTo()||!a.water.textureB.canDrawTo())throw new Error("Rendering to floating-point textures is required but not supported");me();for(var A=0;A<20;A++)a.water.addDrop(Math.random()*2-1,Math.random()*2-1,.06,A&1?.01:-.01);document.getElementById("loading").innerHTML="",i();var R=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(r){setTimeout(r,0)},L=new Date().getTime();function T(){var r=new Date().getTime();a.paused||(s((r-L)/1e3),t()),L=r,R(T)}R(T),window.onresize=i;var x,P,k,w=-1,S=0,z=1,N=2;const V=3;var G,O;function B(r,c,h){if(G=r,O=c,!h||h.button===0){var u=new v.Raytracer,f=u.getRayForPixel(r*o,c*o),b=u.eye.add(f.multiply(-u.eye.y/f.y));for(let g of a.swimmers){var y=v.Raytracer.hitTestSphere(u.eye,f,g.body.center,g.body.radius);if(y){w=z,k=g,g.body.cinematic=!0,x=y.hit,P=u.getRayForPixel(C.canvas.width/2,C.canvas.height/2).negative();return}}Math.abs(b.x)<a.params.simulation.poolSize.x/2&&Math.abs(b.z)<a.params.simulation.poolSize.z/2&&(w=S,j(r,c))}else h.button===2?w=N:h.button===1&&(w=V)}function j(r,c,h){switch(w){case S:{var u=new v.Raytracer,f=u.getRayForPixel(r*o,c*o),b=u.eye.add(f.multiply(-u.eye.y/f.y));a.water.addDrop(b.x/a.params.simulation.poolSize.x*2,b.z/a.params.simulation.poolSize.z*2,.06,.03),a.paused&&(a.water.updateNormals(),K.updateCaustics(a.water));break}case z:{var u=new v.Raytracer,f=u.getRayForPixel(r*o,c*o),y=-P.dot(u.eye.subtract(x))/P.dot(f),g=u.eye.add(f.multiply(y));const F=k.body.center.add(g.subtract(x)),D=k.body.radius,X=Math.max(D-a.params.simulation.poolSize.x/2,Math.min(a.params.simulation.poolSize.x/2-D,F.x)),W=Math.max(D-a.params.simulation.poolSize.y,Math.min(10,F.y)),J=Math.max(D-a.params.simulation.poolSize.z/2,Math.min(a.params.simulation.poolSize.z/2-D,F.z));k.body.move(new v.Vector(X,W,J)),x=g,a.paused&&K.updateCaustics(a.water);break}case N:{if(h&&h.shiftKey){a.angleZ-=r-G,a.angleZ=Math.max(-89.999,Math.min(89.999,a.angleZ));break}a.angleY-=r-G,a.angleX-=c-O,a.angleX=Math.max(-89.999,Math.min(89.999,a.angleX));break}case V:{const E=.001*a.zoomDistance;a.translateX+=E*(r-G),a.translateY-=E*(c-O)}}G=r,O=c,a.paused&&t()}function ee(){w=-1,k&&(k.body.cinematic=!U.useGravity)}function I(r){return r===e||r.parentNode&&I(r.parentNode)}function H(r){return r&&(r.id==="event-editor"||r.parentNode&&H(r.parentNode))}function Y(r){a.zoomDistance*=1-r*2e-4,a.zoomDistance=Math.max(2,Math.min(1e3,a.zoomDistance)),a.paused&&t()}addEventListener("wheel",function(r){if(!H(r.target)){var c=r.deltaY;Y(-c)}}),document.onmousedown=function(r){C.canvas.focus(),I(r.target)||B(r.pageX,r.pageY,r)},document.onmousemove=function(r){j(r.pageX,r.pageY,r)},document.onmouseup=function(){ee()},document.ontouchstart=function(r){r.touches.length===1&&!I(r.target)&&(r.preventDefault(),B(r.touches[0].pageX,r.touches[0].pageY,!1))},document.ontouchmove=function(r){r.touches.length===1&&j(r.touches[0].pageX,r.touches[0].pageY)},document.ontouchend=function(r){r.touches.length==0&&ee()};function q(){a.paused?a.play():a.pause()}const _=async function(r){if(r.which==32)q();else if(r.which==71)a.useGravity(!U.useGravity);else if(r.which==76&&a.paused)t();else if(r.which==74)a.swimmers.forEach(c=>c.jump(2));else if(r.which==67)a.params.visualizations.areaConservationEnabled=!a.params.visualizations.areaConservationEnabled,dt(),console.log("Area conservation "+(a.params.visualizations.areaConservationEnabled?"enabled.":"disabled."));else if(r.which==80)a.water.showProjectionGrid=!a.water.showProjectionGrid,console.log("Projection grid "+(a.water.showProjectionGrid?"enabled.":"disabled."));else if(r.which==65)a.water.showAreaConservedGrid=!a.water.showAreaConservedGrid,console.log("Area conserved grid "+(a.water.showAreaConservedGrid?"enabled.":"disabled."));else if(r.which==83){if(U.swimming=!U.swimming,U.swimming)for(let c of a.swimmers)c.swim(!0);else stopRace();console.log("Swimming "+(U.swimming?"enabled.":"disabled."))}else r.which==86?a.params.video.show=!a.params.video.show:r.which==72?(document.getElementById("commands").hidden=!document.getElementById("commands").hidden,document.getElementById("h").hidden=!document.getElementById("h").hidden):r.which==68?a.playingDemo?a.stopDemo():await a.launchDemo():r.which==81?a.chronoPhotography():r.which==82?(a.setScene("100m freestyle").then(()=>a.startRace()),a._setPannelMinimized(!0)):r.which==75?a.recalibrate():r.which==40?(a.resolution.x>129&&(a.resolution.x=Math.round(a.resolution.x/2)),me(),console.log("decreasing x resolution")):r.which==38?(a.resolution.x<16384&&(a.resolution.x=Math.round(a.resolution.x*2)),me(),console.log("increasing x resolution")):r.which==37?(a.resolution.y>129&&(a.resolution.y=Math.round(a.resolution.y/2)),me(),console.log("decreasing y resolution")):r.which==39&&(a.resolution.y<16384&&(a.resolution.y=Math.round(a.resolution.y*2)),me(),console.log("increasing y resolution"))};C.canvas.addEventListener("keydown",_);function s(r){if(!(r>1)){if(w==z)for(let c of a.swimmers)c.body.velocity=new v.Vector(0,0,0);C.clearColor(0,0,0,1),C.bindFramebuffer(C.FRAMEBUFFER,null),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT);for(let c of a.swimmers)c.update(r);a.water.updateSpheres(r);for(let c=0;c<a.params.numSteps;c++)a.water.stepSimulation(r);K.updateCaustics(a.water),a.updateTime(r),a.updateParams(),l.value=a.getRaceTime(),ii(r),a.updateDemo(r),a.splashParticles.update(r)}}function n(){if(!U.raceHasStarted||!a.params.cornerView.show)return;a.cornerView=!0,C.loadIdentity(),C.translate(0,0,-35),C.rotate(90,1,0,0),C.rotate(-90,0,1,0),C.translate(0,.5,0);const r=C.canvas.height/3,c=16*r/9,h=0,u=C.canvas.height-r;C.viewport(h,u,c,r),K.renderWater(a.water,Pe,a.params.visualizations.shadow),K.renderSpheres(a.water),C.viewport(0,0,C.canvas.width,C.canvas.height),C.loadIdentity(),C.translate(a.translateX,a.translateY,-a.zoomDistance),C.rotate(-a.angleZ,0,0,1),C.rotate(-a.angleX,1,0,0),C.rotate(-a.angleY,0,1,0),C.translate(0,.5,0),a.cornerView=!1}function t(){v.keys.L&&(K.lightDir=v.Vector.fromAngles((90-a.angleY)*Math.PI/180,-a.angleX*Math.PI/180),a.paused&&K.updateCaustics(a.water)),a.isOneVisualizationEnabled()&&U.updateAttributesTexture(),a.water.addOrRemoveVisualizationWaves(!0),a.water.updateNormals(),C.clearColor(.1,.2,.5,1),C.bindFramebuffer(C.FRAMEBUFFER,a.drawingFrameBuffer),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT),C.loadIdentity(),C.translate(a.translateX,a.translateY,-a.zoomDistance),C.rotate(-a.angleZ,0,0,1),C.rotate(-a.angleX,1,0,0),C.rotate(-a.angleY,0,1,0),C.translate(0,.5,0),C.enable(C.DEPTH_TEST),C.disable(C.BLEND),C.viewport(0,0,C.canvas.width,C.canvas.height),K.sphereCenter=a.swimmers[0].body.center,K.sphereRadius=a.swimmers[0].body.radius,K.renderCube(a.water),K.renderWater(a.water,Pe,a.params.visualizations.shadow),a.params.swimmers.showSpheres&&K.renderSpheres(a.water),C.disable(C.DEPTH_TEST),(a.params.visualizations.showStreaks||a.params.simulation.splashes.enabled)&&a.splashParticles.draw(),a.renderVideo(),a.params.chronoPhotography.available&&Jt(),n(),a.water.addOrRemoveVisualizationWaves(!1)}};
//# sourceMappingURL=swimming-BDp1P_qG.js.map
