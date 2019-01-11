function moveSelection(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus){
	
	if( pickingData.enableDragAndDropNag===true ) {
		pickingData.selectableObjects = pickingData.selectableObjectsNag;
	}
	if( pickingData.enableDragAndDropPattes===true ) {
		pickingData.selectableObjects = pickingData.selectableObjectsPattes;
	}
	
	if( pickingData.enableDragAndDropNag===true || pickingData.enableDragAndDropPattes===true ) {

		
        pickingData.selectedObject.translateX( translation.x );
        pickingData.sel// Coordonnées de la position de la souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        // Projection inverse passant du point 2D sur l'écran à un point 3D
        const selectedPoint = new THREE.Vector3(x, y, 0.5 /*valeur de z après projection*/ );
        selectedPoint.unproject( camera );

        // Direction du rayon passant par le point selectionné
        const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );

        // Intersection entre le rayon 3D et le plan de la camera
        const p = pickingData.selectedPlane.p;
        const n = pickingData.selectedPlane.n;
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        // Translation à appliquer
        const translation = pI.clone().sub( p );

        // Translation de l'objet et de la représentation visuelleectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );
        pickingData.selectedPlane.p.add( translation );
    }


}

function pick(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus){
	
	if( pickingData.enabledNag===true ) {
		pickingData.selectableObjects = pickingData.selectableObjectsNag;
	}
	if( pickingData.enabledPattes===true ) {
		pickingData.selectableObjects = pickingData.selectableObjectsPattes;
	}
	
	if( pickingData.enabledNag===true || pickingData.enabledPattes===true ) {

        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        // Calcul d'un rayon passant par le point (x,y)
        //  c.a.d la direction formé par les points p de l'espace tels que leurs projections sur l'écran par la caméra courante soit (x,y).
        raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

        // Calcul des interections entre le rayon et les objets passés en paramètres
        const intersects = raycaster.intersectObjects(pickingData.selectableObjects );

        const nbrIntersection = intersects.length;
        if( nbrIntersection>0 ) {

            // Les intersections sont classés par distance le long du rayon. On ne considère que la première.
            const intersection = intersects[0];

            // Sauvegarde des données du picking
            pickingData.selectedObject = intersection.object; // objet selectionné
            pickingData.selectedPlane.p = intersection.point.clone(); // coordonnées du point d'intersection 3D
            pickingData.selectedPlane.n = camera.getWorldDirection().clone(); // normale du plan de la caméra

            // Affichage de la selection
			if( pickingData.enabledNag===true ) {
				pickingData.enableDragAndDropNag = true;
			}
			if( pickingData.enabledPattes===true ) {
				pickingData.enableDragAndDropPattes = true;
			}
        }
    }
}

function resize(keyCode,name, scene){
	const object = scene.getObjectByName(name);
	if (keyCode=="NumpadAdd"){
		const resize = 0.1;
		object.scale.x += resize;
		object.scale.y += resize;
		object.scale.z += resize;
	}
	else if (keyCode=="NumpadSubtract"){
		const resize = - 0.1;
		object.scale.x += resize;
		object.scale.y += resize;
		object.scale.z += resize;
	}
	
}