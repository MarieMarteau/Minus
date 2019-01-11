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
			

        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
        drawingData.enableDrawing = true;
		
		if( pickingData.enableNag===true) {
		pickNag(x,y, scene, camera, raycaster, drawingData, pickingData,Minus);
		}
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
	  
	  if( pickingData.enableNag===true) {
		  moveSelectionNag(x,y, scene, camera, raycaster, drawingData, pickingData,Minus);
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
	onKeyDown : function(event, scene, camera, raycaster, screenSize, drawingData,Minus) {
		
		const keyCode = event.code;
		console.log("Touche ",keyCode," enfoncé");
	},
	
	onKeyUp : function(event, scene, camera, raycaster, screenSize, drawingData,Minus) {

		const keyCode = event.code;
		console.log("Touche ",keyCode," relaché");
		
		if (drawingData.DessinNageoiresEnabled){
			deplacerSphere(keyCode, scene);
		}
	},

  };
})();
