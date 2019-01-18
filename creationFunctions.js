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
	
	pickingData.enabledNag=false;
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