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

	  const FinNag = scene.getObjectByName("FinNag");
	  
      const intersects = raycaster.intersectObjects( drawingData.drawingObjects );
      const nbrIntersection = intersects.length;
      if( nbrIntersection>0 ) {

        let intersection = intersects[0];
		if (intersection.object == FinNag){
			console.log("Coucou");
		}
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
	
	
	
	
	creationBody: function(raycaster, camera, drawingData, scene, down){
	
    // Définition du chemin à parcourir 
    const array =  drawingData.drawing3DPoints;
	getBody(scene,array);
	 
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
				Points2DAiles.push(new THREE.Vector3(PointsAiles[i].x-x,PointsAiles[i].y-y,0));
			}

    // Définition du chemin à parcourir 
    const Spline =  new THREE.CatmullRomCurve3( drawingData.drawing3DPoints );
	drawingData.doigtsNageoires.push(drawingData.drawing3DPoints);
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
	const obj2 = extrudeObject.clone();
	const mat = (new THREE.Matrix4()).identity();
	mat.elements[0] = -1;
	obj2.applyMatrix(mat);
	scene.add( extrudeObject );
	scene.add(obj2);
 
	},
	
	
	
	
	
	
	
	creationAile: function(raycaster, camera, drawingData, scene, down){
		const mesh = creationSurfaces(drawingData.doigtsNageoires,new THREE.MeshLambertMaterial({ color: 0xffff00}));
	    const mesh2 = mesh.clone();
	    const mat = (new THREE.Matrix4()).identity();
	    mat.elements[0] = -1;
	    mesh2.applyMatrix(mat);
	    scene.add(mesh);
	    scene.add(mesh2);
	},





  };
})();
