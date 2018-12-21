"use strict";

const utilsDrawing = (function() {

  return {

    /*find3DPoint: function(raycaster, camera, xPosition ,yPosition,drawingData, scene, down){
      raycaster.setFromCamera(new THREE.Vector2(xPosition,yPosition),camera);

      const intersects = raycaster.intersectObjects( drawingData.drawingObjects );
      const nbrIntersection = intersects.length;
      if( nbrIntersection>0 ) {

        let intersection = intersects[0];
        // Sauvegarde des données du drawing
        if (down){
          drawingData.selectedObject = intersection.object; // objet selectionné
        } else {
          if (intersection.object != drawingData.selectedObject){
            return;
          } else {
            let intersection = intersects[0];
          }
        }
        drawingData.drawing3DPoints.push(intersection.point.clone());

        if (down == false && drawingData.line.is_ob){
          scene.remove(drawingData.line);
        }

				
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = drawingData.drawing3DPoints;
        const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
        drawingData.line = new THREE.Line( lineGeometry, lineMaterial );
        drawingData.line.is_ob = true;
        scene.add(drawingData.line);		
		
		
    }

	
    },*/
	
	
	
	
	find3DPoint: function(raycaster, camera, xPosition ,yPosition,drawingData, scene, down){
      raycaster.setFromCamera(new THREE.Vector2(xPosition,yPosition),camera);

      const intersects = raycaster.intersectObjects( drawingData.drawingObjects );
      const nbrIntersection = intersects.length;
      if( nbrIntersection>0 ) {

        let intersection = intersects[0];
        // Sauvegarde des données du drawing
        if (down){
          drawingData.selectedObject = intersection.object; // objet selectionné
        } else {
          if (intersection.object != drawingData.selectedObject){
            return;
          } else {
            let intersection = intersects[0];
          }
        }
        drawingData.drawing3DPoints.push(intersection.point.clone());

        if (down == false && drawingData.line.is_ob){
          scene.remove(drawingData.line);
        }
				
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = drawingData.drawing3DPoints;
        const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
        drawingData.line = new THREE.Line( lineGeometry, lineMaterial );
        drawingData.line.is_ob = true;
        scene.add(drawingData.line);		
		
		
    }

	
    },
	
	
	createBody: function(raycaster, camera, xPosition ,yPosition,drawingData, scene, down){
      raycaster.setFromCamera(new THREE.Vector2(xPosition,yPosition),camera);

      const intersects = raycaster.intersectObjects( drawingData.drawingObjects );
      const nbrIntersection = intersects.length;
      if( nbrIntersection>0 ) {

        let intersection = intersects[0];
        // Sauvegarde des données du drawing
        if (down){
          drawingData.selectedObject = intersection.object; // objet selectionné
        } else {
          if (intersection.object != drawingData.selectedObject){
            return;
          } else {
            let intersection = intersects[0];
          }
        }
        drawingData.drawing3DPoints.push(intersection.point.clone());

        if (down == false && drawingData.line.is_ob){
          scene.remove(drawingData.line);
        }

				
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = drawingData.drawing3DPoints;
        const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
        drawingData.line = new THREE.Line( lineGeometry, lineMaterial );
        drawingData.line.is_ob = true;
        scene.add(drawingData.line);		
		
		
    }

	
    },
	
	
	/*extrusionFinger: function(raycaster, camera, drawingData, scene, down){
	
	// Définition d'un polygone 2D
    let pts=[];

    pts.push(new THREE.Vector2(2, -2));
    pts.push(new THREE.Vector2(-2, -2));
    pts.push(new THREE.Vector2(-2,0));
    pts.push(new THREE.Vector2(2, 0));
    const shape = new THREE.Shape( pts );

    // Définition du chemin à parcourir 
    const Spline =  new THREE.CatmullRomCurve3( drawingData.drawing3DPoints );
	
	drawingData.linesAiles.push(drawingData.drawing3DPoints);

    // Création de la forme extrudée 
    const extrudeSettings = {
	steps: 200,
	bevelEnabled: false,
	extrudePath: Spline
};

    const extrudeGeometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const extrudeObject = new THREE.Mesh( extrudeGeometry, new THREE.MeshLambertMaterial({ color: 0xff0000}) ) ;
    extrudeObject.material.side = THREE.DoubleSide; 
    scene.add( extrudeObject );
	
	drawingData.doigtsAiles.push(extrudeObject);
 
	},*/

	
	extrusionFinger: function(raycaster, camera, drawingData, scene, down){
	
	// Définition d'un polygone 2D
    let pts=[];

    pts.push(new THREE.Vector2(2, -2));
    pts.push(new THREE.Vector2(-2, -2));
    pts.push(new THREE.Vector2(-2,0));
    pts.push(new THREE.Vector2(2, 0));
    const shape = new THREE.Shape( pts );
	
	//Mise en forme courbe
	const PointsAiles = drawingData.drawing3DPoints;
	const Points2DAiles = [];
	const x = PointsAiles[0].x;
	const y = PointsAiles[0].y;
		for (let i = 0; i<PointsAiles.length;i++){
				Points2DAiles.push(new THREE.Vector2(PointsAiles[i].x-x,PointsAiles[i].y-y));
			}

    // Définition du chemin à parcourir 
    const Spline =  new THREE.CatmullRomCurve3( PointsAiles );
	drawingData.doigtsNageoires.push(Points2DAiles);
	console.log(drawingData.doigtsNageoires);
	
	// Création de la forme extrudée 
    const extrudeSettings = {
	steps: 200,
	bevelEnabled: false,
	extrudePath: Spline
};

    const extrudeGeometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const extrudeObject = new THREE.Mesh( extrudeGeometry, new THREE.MeshLambertMaterial({ color: 0xff0000}) ) ;
    extrudeObject.material.side = THREE.DoubleSide; 
    scene.add( extrudeObject );
 
	},
	
	
	
	
	
	
	
	creationAile: function(raycaster, camera, drawingData, scene, down){
		return drawingData.doigtsNageoires;
	},





  };
})();
