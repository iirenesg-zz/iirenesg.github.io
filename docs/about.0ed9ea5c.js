const e=window.innerWidth>600?2*window.innerWidth/3:window.innerWidth,n=window.innerHeight-85;let i,o=[];window.preload=()=>{i=loadImage("portrait2.jpg")},window.setup=()=>{createCanvas(e,n),pixelDensity(1),loadPixels(),i.loadPixels(),i.resize(0,height),image(i,0,0),background(35),strokeWeight(2),stroke(255,60),noiseDetail(14,.5);for(let e=0;e<1e3;e++)o[e]=createVector(width/2+random(-450,400),height/2+random(-400,400)),o[e].zOffset=random(),o[e].isMoving=!0},window.draw=()=>{for(let e=0;e<o.length;e++){let n=o[e],t=.006*n.x,s=.006*n.y,r=0*frameCount+0*n.zOffset,d=n.x+map(noise(t,s,r),0,1,-5,5),a=n.y+map(noise(t,s,r+214),0,1,-5,5);const l=i.get(n.x,n.y);(random()>.999||0===l[3])&&(n.isMoving=!1),!n.isMoving||n.x>width||n.x<0||n.y<0||n.y>height?o.splice(e,1):(stroke(l[0]||0,l[1]||0,l[2]||0),line(n.x,n.y,d,a),n.x=d,n.y=a)}const e=t(width/2+random(-450,400),height/2+random(-400,400));o[o.length]=e,o.length>2e3&&o.splice(0,1)},window.mouseMoved=()=>{for(let e=0;e<2;e++){const e=t(mouseX,mouseY);o[o.length]=e}};const t=(e,n)=>{let i=random(TAU),o=3*randomGaussian();return{x:e+o*cos(i),y:n+o*sin(i),zOffset:random(),isMoving:!0}};
//# sourceMappingURL=about.0ed9ea5c.js.map
