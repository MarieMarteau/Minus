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
	  
		pickNag(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus);
		
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
	  
	  if( pickingData.enabledNag===true) {
		  moveSelectionNag(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus);
	  }

    },

    onMouseUp: function(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus) {
		
		if (drawingData.DessinCorpsEnabled){
			dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus)
		}
		
		else if (drawingData.DessinNageoiresEnabled){
			dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
      drawingData.enableDrawing = false;
	  pickingData.enableDragAndDropNag = false;

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
		
		const keyCode = event.code;
		console.log("Touche ",keyCode," enfoncé");
	},
	
	onKeyUp : function(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus) {

		const keyCode = event.code;
		console.log("Touche ",keyCode," relaché");
		
		if (keyCode=="KeyM" ){
			drawingData.DessinNageoiresEnabled=false;
			pickingData.enabledNag=true;
			drawingData.drawing3DPoints=[];
			drawingData.doigtsNageoires=[];
			//Minus.nageoires.push();
			//drawingData.drawing3DPoints=null;
		}
		
		
		if (keyCode=="KeyD" ){
			pickingData.enabledNag=false;
			drawingData.DessinNageoiresEnabled=true;
		}
		
		if (keyCode=="KeyP"){
			initPattes(event, scene, camera, raycaster, screenSize, drawingData,pickingData,Minus);
		}
		
		if (pickingData.enabledNag){
			const name = pickingData.selectedObjectNag.name;
			resize(keyCode,name, scene)
		}
	},

  };
})();
