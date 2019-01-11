function dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus){
	const plane = scene.getObjectByName("plane");
	const sphere = scene.getObjectByName("sphere");
	const line = scene.getObjectByName("line");
	utilsDrawing.creationBody(raycaster, camera, drawingData,scene, true);
	Minus.corps = scene.getObjectByName("body");
	plane.visible = false;
	sphere.visible = true;
	line.visible=false;
	drawingData.DessinCorpsEnabled=false;
	//drawingData.DessinNageoiresEnabled=true;
	pickingData.enableNag=true;
	drawingData.drawing3DPoints=[];
}

function dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus){
	utilsDrawing.extrusionFinger(raycaster, camera, drawingData,scene, true);
	utilsDrawing.creationAile(raycaster, camera, drawingData,scene, true);
}

function deplacerSphere(keyCode, scene){
	const sphere = scene.getObjectByName("sphere");
	if (keyCode=="ArrowRight"){
		sphere.position.x+=10;
	}
	else if (keyCode=="ArrowLeft"){
		sphere.position.x+=-10;
	}
	else if (keyCode=="ArrowUp"){
		sphere.position.y+=10;
	}
	else if (keyCode=="ArrowDown"){
		sphere.position.y+=-+10;
	}
	else if (keyCode=="NumpadAdd"){
		const resize = 0.1;
		sphere.scale.x += resize;
		sphere.scale.y += resize;
		sphere.scale.z += resize;
	}
	else if (keyCode=="NumpadSubtract"){
		const resize = - 0.1;
		sphere.scale.x += resize;
		sphere.scale.y += resize;
		sphere.scale.z += resize;
	}
	
}