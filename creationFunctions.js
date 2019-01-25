function dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus){
	const plane = scene.getObjectByName("plane");
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const Tool3 = scene.getObjectByName("Tool3");
	const line = scene.getObjectByName("line");
	utilsDrawing.creationBody(raycaster, camera, drawingData,scene, true);
	Minus.corps = scene.getObjectByName("body");
	plane.visible = false;
	Tool1.visible=true;
	Tool2.visible=true;
	Tool3.visible=true;
	line.visible=false;
	drawingData.DessinCorpsEnabled=false;

	drawingData.Nageoires=true;
	pickingData.enabledNag=true;
	drawingData.drawing3DPoints=[];
}

function dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFinger(raycaster, camera, drawingData,scene, true);
	utilsDrawing.creationAile(raycaster, camera, drawingData,scene, true);

}

function dessinPieds(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFoot(raycaster, camera, drawingData,scene, true);
}

function initPattes(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus){
	const patte1 = scene.getObjectByName("patte1");
	const patte2 = scene.getObjectByName("patte2");
	const hautpatte = scene.getObjectByName("hautpatte");
	const hautpatte2 = scene.getObjectByName("hautpatte2");
	const baspatte = scene.getObjectByName("baspatte");
	const baspatte2 = scene.getObjectByName("baspatte2");
	const genou = scene.getObjectByName("genou");
	const genou2 = scene.getObjectByName("genou2");
	const pied = scene.getObjectByName("pied");
	const pied2 = scene.getObjectByName("pied2");
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const Tool3 = scene.getObjectByName("Tool3");
	
	pickingData.selectableObjectsPattes.push(patte1);
	pickingData.selectableObjectsPattes.push(patte2);
	pickingData.selectableObjectsPattes.push(genou);
	pickingData.selectableObjectsPattes.push(genou2);
	pickingData.selectableObjectsPattes.push(pied);
	pickingData.selectableObjectsPattes.push(pied2);
	
	/*patte1.visible = true;
	patte2.visible = true;
	pied.visible = true;
	pied2.visible = true;
	baspatte.visible = true;
	baspatte2.visible = true;
	hautpatte.visible = true;
	hautpatte2.visible = true;
	genou.visible = true;
	genou2.visible = true;*/
	Tool1.visible=false;
	Tool2.visible=false;
	Tool3.visible=false;
	
	pickingData.enabledNag=false;
	pickingData.enabledEye=false;
	pickingData.enabledPattes=true;
	
}

function initDrawingTools(scene){
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const Tool3 = scene.getObjectByName("Tool3");
	
	Tool1.visible=true;
	Tool2.visible=true;
	Tool3.visible=true;
	
}

function initFoot(scene){
	const pied = scene.getObjectByName("pied");
	const pied2 = scene.getObjectByName("pied2");
	
	pied.visible=false;
	pied2.visible=false;
	
}

function initEye(scene,pickingData){
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const Tool3 = scene.getObjectByName("Tool3");
	const ToolEye = scene.getObjectByName("ToolEye");
	const ToolChimney = scene.getObjectByName("ToolChimney");
	
	Tool1.visible=false;
	Tool2.visible=false;
	Tool3.visible=false;
	ToolEye.visible=true;
	ToolChimney.visible=false;
	
	pickingData.enabledNag=false;
	pickingData.enabledEye=true;
	pickingData.enabledChimney=false;
	pickingData.enabledPattes=false;
	
}

function initChimney(scene,pickingData){
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const Tool3 = scene.getObjectByName("Tool3");
	const ToolEye = scene.getObjectByName("ToolEye");
	const ToolChimney = scene.getObjectByName("ToolChimney");
	
	Tool1.visible=false;
	Tool2.visible=false;
	Tool3.visible=false;
	ToolEye.visible=false;
	ToolChimney.visible=true;
	
	pickingData.enabledNag=false;
	pickingData.enabledEye=false;
	pickingData.enabledChimney=true;
	pickingData.enabledPattes=false;
	
}

function creationEye(scene,pickingData){
	const ToolEye = scene.getObjectByName("ToolEye");
	const body = scene.getObjectByName("body");

	const v = ToolEye.position;
	const r = 7*ToolEye.scale.x;
		
	const eye = new THREE.Mesh(new THREE.SphereGeometry(r,32,32),new THREE.MeshLambertMaterial({ color: 0xffffff}));
	eye.position.set(v.x,v.y,v.z);
	console.log(ToolEye);
	body.add(eye);
}

function creationChimney(scene,pickingData){
	const ToolChimney = scene.getObjectByName("ToolChimney");
	const body = scene.getObjectByName("body");

	const v = ToolChimney.position;
	const l = 10*ToolChimney.scale.y;
	const r = 3*ToolChimney.scale.y;
		
	const chimney = new THREE.Mesh(new THREE.CylinderGeometry(r,r,l,32),new THREE.MeshPhysicalMaterial({ color: 0xb21605, emissive : 0x000000,metalness:0.2}));
	chimney.position.set(v.x,v.y,v.z);
	body.add(chimney);
}