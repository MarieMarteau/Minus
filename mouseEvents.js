"use strict";

const mouseEvents = (function() {

  return {

    onMouseDown: function(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus) {

      if( event.button == 0 ) { // activation si la click gauche est enfoncée
        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;
			
        if (drawingData.DessinNageoiresEnabled || drawingData.DessinCorpsEnabled){
		drawingData.enableDrawing = true;
	  }
	  
		pick(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus);
		
      }
	  
	  
    },

    onMouseMove: function( event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus){
      // Coordonnées de la position de la souris
      const xPixel = event.clientX;
      const yPixel = event.clientY;

      const x =  2*xPixel/screenSize.w-1;
      const y = -2*yPixel/screenSize.h+1;

      if (drawingData.enableDrawing == true){
        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
      }
	  

	  if( pickingData.enabledNag===true||pickingData.enabledPattes===true||pickingData.enabledEye===true||pickingData.enabledChimney===true) {
		  moveSelection(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus);

	  }

    },

    onMouseUp: function(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus) {
		
		if (drawingData.DessinCorpsEnabled){
			dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus)
		}
		

		else if (drawingData.DessinNageoiresEnabled && drawingData.Nageoires){
			dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
		else if(drawingData.DessinNageoiresEnabled && drawingData.Pieds){
			dessinPieds(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
		
		
      drawingData.enableDrawing = false;
	  pickingData.enableDragAndDropNag = false;
	  pickingData.enableDragAndDropPattes = false;
	   pickingData.enableDragAndDropEye = false;
	   pickingData.enableDragAndDropChimney = false;


      if (drawingData.drawing3DPoints.length > 0){

        drawingData.selectedObject.updateMatrix();
        const matrice = drawingData.selectedObject.matrix;
        matrice.getInverse(matrice);
        drawingData.line.applyMatrix(matrice);

        scene.remove(drawingData.line);
        drawingData.selectedObject.add(drawingData.line);
        drawingData.drawing3DPoints = [];
      }

    },
	
	// Fonction appelée lors de l'appuis sur une touche du clavier
	onKeyDown : function(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus) {
		
		
	},
	
	onKeyUp : function(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus) {

		const keyCode = event.code;
		console.log(keyCode);
				

		if (keyCode=="KeyN" ){
			const ToolEye = scene.getObjectByName("ToolEye");
			const ToolChimney = scene.getObjectByName("ToolChimney");
	
			ToolEye.visible=false;
			ToolChimney.visible=false;
			pickingData.enabledPattes=false;
			pickingData.enabledEye=false;
			pickingData.enabledChimney=false;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			drawingData.Nageoires=true;
			drawingData.Pieds=true;
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			initDrawingTools(scene);
			pattesNoires(scene);
		}
		
		if (keyCode=="KeyF" ){
			const ToolEye = scene.getObjectByName("ToolEye");
			const ToolChimney = scene.getObjectByName("ToolChimney");
	
			ToolEye.visible=false;
			ToolChimney.visible=false;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			pickingData.enabledPattes=false;
			pickingData.enabledEye=false;
			pickingData.enabledChimney=false;
			
			drawingData.Nageoires=false;
			drawingData.Pieds=true;
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			initDrawingTools(scene);
			initFoot(scene);
			pattesNoires(scene);
		}
		
		if (keyCode=="KeyM" && (drawingData.Nageoires ||drawingData.Pieds)){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			//drawingData.drawing3DPoints=null;
		}
		

		
		if (keyCode=="KeyD" && (drawingData.Nageoires ||drawingData.Pieds)){
			pickingData.enabledNag=false;
			drawingData.DessinNageoiresEnabled=true;
		}
		

		if (keyCode=="KeyP"){
			const ToolEye = scene.getObjectByName("ToolEye");
			const ToolChimney = scene.getObjectByName("ToolChimney");
	
			ToolEye.visible=false;
			ToolChimney.visible=false;
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			initPattes(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus);
		}
		
		if (keyCode=="KeyY"){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=false;
			pickingData.enabledPattes=false;
			pickingData.enabledEye=true;
			pickingData.enabledChimney=false;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			initEye(scene,pickingData);
			pattesNoires(scene)
		}
		
		if (keyCode=="KeyC"){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=false;
			pickingData.enabledPattes=false;
			pickingData.enabledEye=false;
			pickingData.enabledChimney=true;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			initChimney(scene,pickingData);
			pattesNoires(scene);
		}
		
		if(pickingData.enabledEye && keyCode=="Enter"){
			creationEye(scene,pickingData);
		}
		
		if(pickingData.enabledChimney && keyCode=="Enter"){
			creationChimney(scene,pickingData);
		}
		
		const object = pickingData.selectedObject;
		resize(keyCode,object, scene);

	},

  };
})();
