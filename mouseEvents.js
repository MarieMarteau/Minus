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
	  if (drawingData.Pieds){
		drawingData.enableDrawingFoot = true;
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
	  if (drawingData.enableDrawingFoot == true){
        utilsDrawing.find3DPointFoot(raycaster, camera, x ,y, drawingData,scene, true);
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
		else if(drawingData.Pieds){
			dessinPieds(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
		
		
      drawingData.enableDrawing = false;
	  drawingData.enableDrawingFoot = false;
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
	  
	  if (drawingData.drawing3DPointsFoot.length > 0){

        drawingData.selectedObjectFoot.updateMatrix();
        const matrice = drawingData.selectedObjectFoot.matrix;
        matrice.getInverse(matrice);
        drawingData.lineFoot.applyMatrix(matrice);

        scene.remove(drawingData.lineFoot);
        drawingData.selectedObjectFoot.add(drawingData.lineFoot);
        drawingData.drawing3DPointsFoot = [];
      }

    },
	
	// Fonction appelée lors de l'appuis sur une touche du clavier
	onKeyDown : function(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus) {
		
		
	},
	
	onKeyUp : function(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus,animation) {

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
			drawingData.Pieds=false;
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
			pattesNoires(scene);
			initFoot(scene);

		}
		
		if (keyCode=="KeyM" && (drawingData.Nageoires)){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			//drawingData.drawing3DPoints=null;
		}
		

		
		if (keyCode=="KeyD" && (drawingData.Nageoires)){
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
			drawingData.Pieds=false;
			initPattes(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus);
		}
		
		if (keyCode=="KeyY"){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=false;
			pickingData.enabledPattes=false;
			pickingData.enabledEye=true;
			pickingData.enabledChimney=false;
			drawingData.Pieds=false;
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
			drawingData.Pieds=false;
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
		
		if(drawingData.Pieds && keyCode=="Enter"){
			const pied = scene.getObjectByName("pied");
			const pied2 = scene.getObjectByName("pied2");
			pied.visible=false;
			pied2.visible=false;
			
		}
		
		if(keyCode=="KeyA"){
			animation.animate = !animation.animate;
		}
		
		const object = pickingData.selectedObject;
		resize(keyCode,object, scene);

	},

  };
})();
