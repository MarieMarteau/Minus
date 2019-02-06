var theta = 0;
var alpha = 0;
var lastTime = 0;
var L = 0;
var init = false;
var flx = true;
var ext = false;
var jmp = false;
var fly = false;
var fall = false;
var v = 0;
var wingAngle = 0;
var flyBeginTime = 0;
var i = 0;
var isUp = true;
const maxWingAngle = 0.5;
const omega = 3;
const maxPeriods = 3;
const minTimeDelta = 0.1;
const flexAngularSpeed = 0.05;
const extSpeed = 2;
const g = 0.1;

function moveNag(Minus,t){
    const alpha = maxWingAngle*Math.sin(omega*t)-wingAngle;
    wingAngle += alpha;
    for(let i=0;i<Minus.surfacesG.length;i++){
	Minus.surfacesG[i].rotateY(alpha);
    }
    
    for(let i=0;i<Minus.doigtsG.length;i++){
	Minus.doigtsG[i].rotateY(alpha);
    }
    
    for(let i=0;i<Minus.surfacesD.length;i++){
	Minus.surfacesD[i].rotateY(-alpha);
    }
    
    for(let i=0;i<Minus.doigtsD.length;i++){
	Minus.doigtsD[i].rotateY(-alpha);
    }
    return alpha;
}

function updateLegs(scene) {
    let baspatte = scene.getObjectByName("baspatte");
    let hautpatte = scene.getObjectByName("hautpatte");
    const genou = scene.getObjectByName("genou");
    const pied = scene.getObjectByName("pied");
    const patte1 = scene.getObjectByName("patte1");
    genou.add(patteBetween(pied.position,baspatte));
    patte1.add(patteBetween(genou.position,hautpatte));
    genou.remove(baspatte);
    baspatte.name = "";
    patte1.remove(hautpatte);
    hautpatte.name = ""

    const baspatte2 = scene.getObjectByName("baspatte2");
    const hautpatte2 = scene.getObjectByName("hautpatte2");
    const genou2 = scene.getObjectByName("genou2");
    const pied2 = scene.getObjectByName("pied2");
    const patte2 = scene.getObjectByName("patte2");
    genou2.add(patteBetween(pied2.position,baspatte2));
    patte2.add(patteBetween(genou2.position,hautpatte2));
    genou2.remove(baspatte2);
    baspatte2.name = "";
    patte2.remove(hautpatte2);
    hautpatte2.name = ""
}

function animInit(scene) {
    const genou = scene.getObjectByName("genou");
    const pied = scene.getObjectByName("pied");
    pied.position.set(-genou.position.x, genou.position.y, -genou.position.z);
    theta = Math.atan(genou.position.x/genou.position.z);
    if(genou.position.z == 0) {theta=0;}
    const genou2 = scene.getObjectByName("genou2");
    const pied2 = scene.getObjectByName("pied2");
    genou2.position.set(-genou.position.x, genou.position.y, genou.position.z);
    pied2.position.set(-genou2.position.x, genou2.position.y, -genou2.position.z);
    L = genou.position.length();
    init = true;
}

function flex(Minus,scene,t) {
    if(!init) {animInit(scene);}
    if(t-lastTime < minTimeDelta) {return;}
    const genou = scene.getObjectByName("genou");
    const pied = scene.getObjectByName("pied");
    const genou2 = scene.getObjectByName("genou2");
    const pied2 = scene.getObjectByName("pied2");
    const body = scene.getObjectByName("body");
    let x = body.position.y;
    if(flx) {
	alpha += flexAngularSpeed;
	x = 2*L*(Math.cos(alpha)-1);
	if(alpha > Math.PI/4) {
	    alpha = Math.PI/4;
	    flx = false;
	    ext = true;
	}
    }
    if(ext) {
	x += extSpeed; //vitesse de l'extension
	alpha = Math.acos(x/(2*L)+1);
	if(x > 0) {
	    alpha = 0;
	    ext = false;
	    jmp = true;
	    v = extSpeed;
	}
    }
    if(jmp) {
	v -= g; //acceleration de la pesanteur
	x += v;
	if(v < 0) {
	    v = 0;
	    jmp = false;
	    fly = true;
	    isUp = true;
	    flyBeginTime = t;
	    i = maxPeriods;
	}
    }
    if(fly) {
	v -= g - Math.max(0,-2.3*moveNag(Minus,t-flyBeginTime));
	x += v;
	if(!isUp && wingAngle > 0) {
	    i -= 1;
	    if(i==0) {
		wingAngle = 0;
		fly = false;
		fall = true;
	    }
	    isUp = true;
	}
	if(isUp && wingAngle < 0) {
	    isUp = false;
	}
    }
    if(fall) {
	v -= g;
	x += v;
	if(x < 0) {
	    x = 0;
	    fall = false;
	    flx = true;
	}
    }
    genou.position.set(-L*Math.sin(alpha)*Math.sin(theta),-L*Math.cos(alpha),L*Math.sin(alpha)*Math.cos(theta));
    pied.position.set(-genou.position.x, genou.position.y, -genou.position.z);
    genou2.position.set(-genou.position.x, genou.position.y, genou.position.z);
    pied2.position.set(-genou2.position.x, genou2.position.y, -genou2.position.z);
    body.position.set(0, x, 0);
    updateLegs(scene);    
    lastTime = t;
}
