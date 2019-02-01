function dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus){
	const plane = scene.getObjectByName("plane");
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	const line = scene.getObjectByName("line");
	utilsDrawing.creationBody(raycaster, camera, drawingData,scene, true);
	Minus.corps = scene.getObjectByName("body");
	plane.visible = false;
	Tool1.visible=true;
	Tool2.visible=true;
	line.visible=false;
	drawingData.DessinCorpsEnabled=false;

	drawingData.Nageoires=true;
	pickingData.enabledNag=true;
	drawingData.drawing3DPoints=[];
}

function dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFinger(raycaster, camera, drawingData,scene, true,Minus);
	utilsDrawing.creationAile(raycaster, camera, drawingData,scene, true,Minus);

}

function dessinPieds(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFoot(raycaster, camera, drawingData,scene, true);
	utilsDrawing.creationPalme(raycaster, camera, drawingData,scene, true,Minus);
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
	
	pickingData.selectableObjectsPattes.push(patte1);
	pickingData.selectableObjectsPattes.push(patte2);
	pickingData.selectableObjectsPattes.push(genou);
	pickingData.selectableObjectsPattes.push(genou2);
	pickingData.selectableObjectsPattes.push(pied);
	pickingData.selectableObjectsPattes.push(pied2);
	
	patte1.material.color.set(0xffffff);
	patte2.material.color.set(0xffffff);
	genou.material.color.set(0xffffff);
	genou2.material.color.set(0xffffff);
	pied.material.color.set(0xffffff);
	pied2.material.color.set(0xffffff);
	
	Tool1.visible=false;
	Tool2.visible=false;
	
	pickingData.enabledNag=false;
	pickingData.enabledEye=false;
	pickingData.enabledPattes=true;
	
}

function initDrawingTools(scene){
	const Tool1 = scene.getObjectByName("Tool1");
	const Tool2 = scene.getObjectByName("Tool2");
	
	Tool1.visible=true;
	Tool2.visible=true;
	
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
	const ToolEye = scene.getObjectByName("ToolEye");
	const ToolChimney = scene.getObjectByName("ToolChimney");
	
	Tool1.visible=false;
	Tool2.visible=false;
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
	const ToolEye = scene.getObjectByName("ToolEye");
	const ToolChimney = scene.getObjectByName("ToolChimney");
	
	Tool1.visible=false;
	Tool2.visible=false;
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
	
	const textureLoader = new THREE.TextureLoader();
	const texture= textureLoader.load( 'eye.png' );
    const material = new THREE.MeshLambertMaterial({ map: texture });
	
		
	const eye = new THREE.Mesh(new THREE.SphereGeometry(r,32,32),material);
	eye.position.set(v.x,v.y,v.z);
	eye.rotateOnWorldAxis(new THREE.Vector3(0,1,0),-Math.PI/2);
	eye.rotateOnWorldAxis(new THREE.Vector3(0,0,1),-Math.PI/2);
	
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

function pattesNoires(scene){
	const patte1 = scene.getObjectByName("patte1");
	const patte2 = scene.getObjectByName("patte2");
	const genou = scene.getObjectByName("genou");
	const genou2 = scene.getObjectByName("genou2");
	const pied = scene.getObjectByName("pied");
	const pied2 = scene.getObjectByName("pied2");
	
	const hautpatte = scene.getObjectByName("hautpatte");
	const hautpatte2 = scene.getObjectByName("hautpatte2");
	const baspatte = scene.getObjectByName("baspatte");
	const baspatte2 = scene.getObjectByName("baspatte2");
	
	patte1.material.color.set(0x000000);
	patte2.material.color.set(0x000000);
	genou.material.color.set(0x000000);
	genou2.material.color.set(0x000000);
	pied.material.color.set(0x000000);
	pied2.material.color.set(0x000000);
	hautpatte.material.color.set(0x000000);
	hautpatte2.material.color.set(0x000000);
	baspatte.material.color.set(0x000000);
	baspatte2.material.color.set(0x000000);
	
}