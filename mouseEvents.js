"use strict";

const mouseEvents = (function() {

  return {

    onMouseDown: function(event, scene, camera, raycaster, screenSize, drawingData) {

      if( event.button == 0 ) { // activation si la click gauche est enfoncée
        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;
			

        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
		//utilsDrawing.createBody(raycaster, camera, x ,y, drawingData,scene, true);
        drawingData.enableDrawing = true;
      }

    },

    onMouseMove: function( event, scene, camera, raycaster, screenSize, drawingData){
      // Coordonnées de la position de la souris
      const xPixel = event.clientX;
      const yPixel = event.clientY;

      const x =  2*xPixel/screenSize.w-1;
      const y = -2*yPixel/screenSize.h+1;

      if (drawingData.enableDrawing == true){
        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
		//utilsDrawing.createBody(raycaster, camera, x ,y, drawingData,scene, true);
      }

    },

    onMouseUp: function(event, scene, camera, raycaster, screenSize, drawingData) {
		utilsDrawing.extrusionFinger(raycaster, camera, drawingData,scene, true);
		utilsDrawing.creationAile(raycaster, camera, drawingData,scene, true);
      drawingData.enableDrawing = false;

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

  };
})();
