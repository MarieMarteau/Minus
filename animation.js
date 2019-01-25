"use strict";

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

var theta = 0;
var alpha = 0;
var lastTime = 0;
var L = 0;
var init = false;
var flx = true;
var ext = false;
var jmp = false;
var v = 0;

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

function flex(scene,t) {
    if(!init) {animInit(scene);}
    if(t-lastTime < 0.1) {return;}
    const genou = scene.getObjectByName("genou");
    const pied = scene.getObjectByName("pied");
    const genou2 = scene.getObjectByName("genou2");
    const pied2 = scene.getObjectByName("pied2");
    const body = scene.getObjectByName("body");
    let x = body.position.y;
    if(flx) {
	alpha += 0.05; //vitesse angulaire de la flexion
	x = 2*L*(Math.cos(alpha)-1);
	if(alpha > Math.PI/4) {
	    alpha = Math.PI/4;
	    flx = false;
	    ext = true;
	}
    }
    if(ext) {
	x += 1; //vitesse de l'extension
	alpha = Math.acos(x/(2*L)+1);
	if(x > 0) {
	    alpha = 0;
	    ext = false;
	    jmp = true;
	    v = 1;
	}
    }
    if(jmp) {
	v -= 0.1; //acceleration de la pesanteur
	x += v;
	if(x < 0) {
	    jmp = false;
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
