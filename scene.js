"use strict";

main();

function main(){

  const sceneThreeJs = {
    sceneGraph: null,
    camera: null,
    renderer: null,
    controls: null
  };

  // Données pour le dessin
  const drawingData = {
	  
	//Permet de définir le mode d'action
	DessinCorpsEnabled:true,
	DessinNageoiresEnabled:false,
	  
    drawingObjects: [],
    selectedObject: null,
    enableDrawing: false,
    drawing3DPoints:[],
    line: null,
	doigtsNageoires:[],
  };
  
  const pickingData = {
    enabledNag: false,
	enableDragAndDropNag : false,
	selectionPositionNag:null,
    selectableObjectsNag: [],    // Les objets selectionnables par picking
    selectedObjectNag: null,     // L'objet actuellement selectionné
	selectedPlaneNag: {p:null,n:null},
}
  
  
  const Minus = {
        corps:null,
		nageoires:[],
    };
  
  initEmptyScene(sceneThreeJs);
  init3DObjects(sceneThreeJs.camera,sceneThreeJs.sceneGraph, drawingData, pickingData);  

  const screenSize = {
    w:sceneThreeJs.renderer.domElement.clientWidth,
    h:sceneThreeJs.renderer.domElement.clientHeight
  };

  const raycaster = new THREE.Raycaster();

  ///////////// Mouse Events ////////////////////////////////////////////////////////////
  const wrapperMouseDown = function(event) { mouseEvents.onMouseDown(event,sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData,pickingData,Minus); };
  document.addEventListener( 'mousedown', wrapperMouseDown );
 
  const wrapperMouseMove = function(event) { mouseEvents.onMouseMove(event, sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData,pickingData,Minus) };
  document.addEventListener( 'mousemove', wrapperMouseMove );

  const wrapperMouseUp = function(event) { mouseEvents.onMouseUp(event,sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData,pickingData,Minus); };
  document.addEventListener( 'mouseup', wrapperMouseUp );
  
  const wrapperKeyUp = function(event) { mouseEvents.onKeyUp(event,sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData,pickingData,Minus); };
  document.addEventListener( 'keyup', wrapperKeyUp );
  
  const wrapperKeyDown = function(event) { mouseEvents.onKeyDown(event,sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData,pickingData,Minus); };
  document.addEventListener( 'keydown', wrapperKeyDown );

  

  animationLoop(sceneThreeJs);
}


function init3DObjects(camera,sceneGraph, drawingData, pickingData) {

  const planeGeometry = primitive.Quadrangle(new THREE.Vector3(-100,-50,0),new THREE.Vector3(-100,50,0),new THREE.Vector3(100,50,0),new THREE.Vector3(100,-50,0));
  const materialGround = new THREE.MeshLambertMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeGeometry,materialGround);
  plane.name="plane";
  plane.receiveShadow = true;
  drawingData.drawingObjects.push(plane);
  sceneGraph.add(plane);
  
  const lineGeometry = new THREE.Geometry();
  const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  lineGeometry.vertices.push(new THREE.Vector3( 0, 50, 0.01) );
  lineGeometry.vertices.push(new THREE.Vector3( 0, -50, 0.01) );
  const line = new THREE.Line( lineGeometry, materialLine );
  line.name="line";
  sceneGraph.add(line);

  
  //Outils pour placer les nageoires
  const ToolG1 = new THREE.SphereGeometry(10,32,32);
  const ToolM1 = new THREE.MeshLambertMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5});
  const Tool1 = new THREE.Mesh(ToolG1,ToolM1);
  Tool1.name="Tool1";
  Tool1.receiveShadow = true;
  drawingData.drawingObjects.push(Tool1);
  pickingData.selectableObjectsNag.push(Tool1);
  Tool1.visible = false;
  Tool1.position.set(-70,30,0);
  sceneGraph.add(Tool1);
  
  const ToolG2 = new THREE.SphereGeometry(20,32,32);
  const ToolM2 = new THREE.MeshLambertMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5});
  const Tool2 = new THREE.Mesh(ToolG2,ToolM2);
  Tool2.name="Tool2";
  Tool2.receiveShadow = true;
  drawingData.drawingObjects.push(Tool2);
  pickingData.selectableObjectsNag.push(Tool2);
  Tool2.visible = false;
  Tool2.position.set(-70,0,0);
  sceneGraph.add(Tool2);
  

}

function initEmptyScene(sceneThreeJs, affichageElement) {
  sceneThreeJs.sceneGraph = new THREE.Scene();
  //sceneThreeJs.sceneGraph.background = new THREE.Color( 0xF5F5DC );
  sceneThreeJs.sceneGraph.background = new THREE.Color(0xB0E0E6);

  sceneThreeJs.camera = sceneInit.createCamera(0.47,0.68,138)
  sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
  const spotLight1 = sceneInit.insertLight(sceneThreeJs.sceneGraph,sceneThreeJs.camera.position);
  spotLight1.name = "spotLight1";

  const spotLight2 = sceneInit.insertLight(sceneThreeJs.sceneGraph,new THREE.Vector3(3+sceneThreeJs.camera.position.x, 100+sceneThreeJs.camera.position.y, sceneThreeJs.camera.position.z));
  spotLight2.name = "spotLight2";

  sceneThreeJs.renderer = sceneInit.createRenderer();
  sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

  sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera,sceneThreeJs.renderer.domElement );
  sceneThreeJs.controls.addEventListener( 'change', function(event){light_update(sceneThreeJs.camera,spotLight1);},true);
  sceneThreeJs.controls.addEventListener( 'change', function(event){light_update2(sceneThreeJs.camera,spotLight2);},true);

  window.addEventListener('resize', function(event){onResize(sceneThreeJs);}, true);
}

function onResize(sceneThreeJs) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  sceneThreeJs.camera.aspect = width / height;
  sceneThreeJs.camera.updateProjectionMatrix();

  sceneThreeJs.renderer.setSize(width, height);
}

function render( sceneThreeJs ) {
  sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time) {

  const t = time/1000;//time in second
  render(sceneThreeJs);
}

// Fonction de gestion d'animation
function animationLoop(sceneThreeJs) {
  // Fonction JavaScript de demande d'image courante à afficher
  requestAnimationFrame(

    // La fonction (dite de callback) recoit en paramètre le temps courant
    function(timeStamp){
      animate(sceneThreeJs,timeStamp); // appel de notre fonction d'animation
      animationLoop(sceneThreeJs); // relance une nouvelle demande de mise à jour
    }

  );

}
