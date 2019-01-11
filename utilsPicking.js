function moveSelectionNag(x,y, scene, camera, raycaster, drawingData, pickingData,Minus){
	if( pickingData.enableDragAndDropNag===true) {

// Projection inverse passant du point 2D sur l'écran à un point 3D
		const selectedPoint = new THREE.Vector3(x, y, 0 /*valeur de z après projection*/ );
		selectedPoint.unproject( camera );
		
		const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );
		
		const p = pickingData.selectionPositionNag;
        const n = new THREE.Vector3(0,0,1);
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        pickingData.selectedObjectNag.position.set(pI.x,pI.y,pI.z);
	}
}

function pickNag(x,y, scene, camera, raycaster, drawingData, pickingData,Minus){

	const intersects = raycaster.intersectObjects( pickingData.selectableObjectsNag );

	const nbrIntersection = intersects.length;
	if( nbrIntersection>0 ) {

		// Les intersections sont classés par distance le long du rayon. On ne considère que la première.
		const intersection = intersects[0];

		// Sauvegarde des données du picking
		pickingData.selectedObjectNag = intersection.object; // objet selectionné
		
		pickingData.selectionPositionNag = intersection.point.clone(); // coordonnées du point d'intersection 3D
		
		pickingData.enableDragAndDropNag = true;
		console.log(pickingData.selectedObjectNag);
		pickingData.selectedObjectNag.material.color.set(0xff0000);
		for (let k = 0; k < pickingData.selectableObjectsNag.length; k++){
			if (pickingData.selectableObjectsNag[k] != pickingData.selectedObjectNag){
				pickingData.selectableObjectsNag[k].material.color.set(0xeac713);
			}
		}
	}
}