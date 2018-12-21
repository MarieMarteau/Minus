"use strict";

// Variable globale (pour simplifier les arguments des différentes fonctions)
const sceneThreeJs = {
    sceneGraph: null,
    camera: null,
    renderer: null
};

const skeleton = {
    numberOfPoints: 0,
    points: [],
    ranges: []
}

function f(point) {
    let distance = 0;
    let S = 0;
    for(let i=0; i<skeleton.numberOfPoints; i=i+1) {
	distance = (point.x-skeleton.points[i].x)^2 + (point.y-skeleton.points[i].y)^2 + (point.z-skeleton.points[i].z)^2
	if(distance < skeleton.ranges[i]) {
	    S += 1 - distance/skeleton.ranges[i]; //placeholder
	}
    }
    return S;
}

main();

function main() {

    // Initialisation de la scène et des objets
    initEmptyScene();
    init3DObjects();

    getBody();

    // Lancement de la boucle d'initialisation
    animationLoop();
}

// Initialise les objets composant la scène 3D
function init3DObjects() {
    const boxGeometry = new THREE.BoxGeometry( 1,1,1 );
    const boxMaterial = new THREE.MeshLambertMaterial( {color:0xff0000} );
    const boxObject = new THREE.Mesh( boxGeometry,boxMaterial );
    boxObject.name = "box"; // Nom de l'objet
    sceneThreeJs.sceneGraph.add(boxObject);
}

// Fonction de gestion d'animation
function animationLoop() {

    // Fonction JavaScript de gestion d'animation
    //  La paramètre de requestAnimationFrame est la fonction à appeler régulièrement
    requestAnimationFrame( animate );
}

// La fonction d'animation en temps que telle
//  Fonction appelée depuis requestAnimationFrame, recoit en paramètre le temps écoule (en ms).
function animate(time) {

    //temps en seconde
    const t = time/1000;

    // Animation de l'objet ayant le nom "box"
    const box = sceneThreeJs.sceneGraph.getObjectByName("box");
    box.position.set(Math.sin(3*t), 0, 0);

    // Affichage de la scène
    render();

    // Relance la boucle d'animation
    animationLoop();
}

// Demande le rendu de la scène 3D
function render() {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}



// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene() {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(-5,5,5);
    sceneInit.insertLight(sceneThreeJs.sceneGraph);

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);
}
