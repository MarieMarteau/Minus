"use strict";

const mouseEvents = (function() {

  return {

    onMouseDown: function(event, scene, camera, raycaster, screenSize, drawingData, pickingDataPattes,Minus) {

      if( event.button == 0 ) { // activation si la click gauche est enfoncée
        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;
			

        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
        drawingData.enableDrawing = true;
		
		
		const intersects = raycaster.intersectObjects( pickingDataPattes.selectableObjects );

	const nbrIntersection = intersects.length;
	if( nbrIntersection>0 ) {

		// Les intersections sont classés par distance le long du rayon. On ne considère que la première.
		const intersection = intersects[0];

		// Sauvegarde des données du picking
		pickingDataPattes.selectedObject = intersection.object; // objet selectionné
		
		pickingDataPattes.selectionPosition = intersection.point.clone(); // coordonnées du point d'intersection 3D
		
		pickingDataPattes.enableDragAndDrop = true;
		console.log(pickingDataPattes.selectedObject);
		pickingDataPattes.selectedObject.material.color.set(0xff0000);
		for (let k = 0; k < pickingDataPattes.selectableObjects.length; k++){
			if (pickingDataPattes.selectableObjects[k] != pickingDataPattes.selectedObject){
				pickingDataPattes.selectableObjects[k].material.color.set(0xeac713);
			}
		}
	}
		
      }

    },

    onMouseMove: function( event, scene, camera, raycaster, screenSize, drawingData, pickingDataPattes,Minus){
      // Coordonnées de la position de la souris
      const xPixel = event.clientX;
      const yPixel = event.clientY;

      const x =  2*xPixel/screenSize.w-1;
      const y = -2*yPixel/screenSize.h+1;

      if (drawingData.enableDrawing == true){
        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, true);
      }
	  
	  
	  if( pickingDataPattes.enableDragAndDrop===true) {

		// Projection inverse passant du point 2D sur l'écran à un point 3D
		const selectedPoint = new THREE.Vector3(x, y, 0 /*valeur de z après projection*/ );
		selectedPoint.unproject( camera );
		
		const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );
		
		const p = pickingDataPattes.selectionPosition;
        const n = new THREE.Vector3(0,0,1);
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        pickingDataPattes.selectedObject.position.set(pI.x,pI.y,pI.z);
	  }
	  
	  const baspatte = scene.getObjectByName("baspatte");
	  const hautpatte = scene.getObjectByName("hautpatte");
	  const genou = scene.getObjectByName("genou");
	  const pied = scene.getObjectByName("pied");
	  patteBetween(genou.position,pied.position,baspatte);
	  patteBetween(new THREE.Vector3(15, 30, 0),genou.position,hautpatte);
	  
	  
    },

    onMouseUp: function(event, scene, camera, raycaster, screenSize, drawingData, pickingDataPattes,Minus) {
		
		if (drawingData.DessinCorpsEnabled){
			dessinCorps(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
		
		else if (drawingData.DessinNageoiresEnabled){
			dessinNageoires(event, scene, camera, raycaster, screenSize, drawingData,Minus)
		}
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
	  
	  pickingDataPattes.enableDragAndDrop = false;

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
