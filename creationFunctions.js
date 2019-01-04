function dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	const plane = scene.getObjectByName("plane");
	const sphere = scene.getObjectByName("sphere");
	utilsDrawing.creationBody(raycaster, camera, drawingData,scene, true);
	Minus.corps = scene.getObjectByName("body");
	plane.visible = false;
	sphere.visible = true;
	drawingData.DessinCorpsEnabled=false;
	drawingData.DessinNageoiresEnabled=true;
	drawingData.drawing3DPoints=[];
}

function dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFinger(raycaster, camera, drawingData,scene, true);
	utilsDrawing.creationAile(raycaster, camera, drawingData,scene, true);
}