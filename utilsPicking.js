
function moveSelection(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus){
    

    
    if( pickingData.enableDragAndDropNag===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsDrawing;
	

	// Coordonnées de la position de la souris
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

        // Translation de l'objet et de la représentation visuelle

        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );
        pickingData.selectedPlane.p.add( translation );
	
    }
    if( pickingData.enableDragAndDropPattes===true ) {

	pickingData.selectableObjects = pickingData.selectableObjectsPattes;
	
	// Coordonnées de la position de la souris
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

        // Translation de l'objet et de la représentation visuelle
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );
        pickingData.selectedPlane.p.add( translation );
	
	
	let baspatte = scene.getObjectByName("baspatte");
	let hautpatte = scene.getObjectByName("hautpatte");
	const genou = scene.getObjectByName("genou");
	const pied = scene.getObjectByName("pied");
	const patte1 = scene.getObjectByName("patte1");
	genou.add(patteBetween(pied.position,baspatte));
	patte1.add(patteBetween(genou.position,hautpatte));
	genou.remove(baspatte);
	baspatte.name = "";
	patte1.remove(hautpatte);
	hautpatte.name = ""
	
	const baspatte2 = scene.getObjectByName("baspatte2");
	const hautpatte2 = scene.getObjectByName("hautpatte2");
	const genou2 = scene.getObjectByName("genou2");
	const pied2 = scene.getObjectByName("pied2");
	const patte2 = scene.getObjectByName("patte2");
	genou2.add(patteBetween(pied2.position,baspatte2));
	patte2.add(patteBetween(genou2.position,hautpatte2));
	genou2.remove(baspatte2);
	baspatte2.name = "";
	patte2.remove(hautpatte2);
	hautpatte2.name = ""
    }

    if( pickingData.enableDragAndDropEye===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsEye;
	
	// Coordonnées de la position de la souris
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

        // Translation de l'objet et de la représentation visuelle
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );
        pickingData.selectedPlane.p.add( translation );
	
    }

    
    if( pickingData.enableDragAndDropChimney===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsChimney;
	
	// Coordonnées de la position de la souris
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

        // Translation de l'objet et de la représentation visuelle
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );
        pickingData.selectedPlane.p.add( translation );
	
    }

}

function pick(event, scene, camera, raycaster, screenSize, drawingData, pickingData,Minus){
    

    if( pickingData.enabledNag===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsDrawing;
	
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
	    pickingData.enableDragAndDropNag = true;
	    
	    pickingData.selectedObject.material.color.set(0x00ffff);
	    for (let k = 0; k < pickingData.selectableObjects.length; k++){
		if (pickingData.selectableObjects[k] != pickingData.selectedObject){
		    pickingData.selectableObjects[k].material.color.set(0x0000ff);
		}
	    }
        }
	
    }
    
    
    if( pickingData.enabledPattes===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsPattes;
	

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

            
	    pickingData.enableDragAndDropPattes = true;
	    
	    pickingData.selectedObject.material.color.set(0x00ffff);
	    for (let k = 0; k < pickingData.selectableObjects.length; k++){
		if (pickingData.selectableObjects[k] != pickingData.selectedObject){
		    pickingData.selectableObjects[k].material.color.set(0xffffff);
		}
	    }


        }
	
    }

    if( pickingData.enabledEye===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsEye;
	

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

            
	    pickingData.enableDragAndDropEye = true;
	    
	    pickingData.selectedObject.material.color.set(0x00ffff);
	    for (let k = 0; k < pickingData.selectableObjects.length; k++){
		if (pickingData.selectableObjects[k] != pickingData.selectedObject){
		    pickingData.selectableObjects[k].material.color.set(0xffffff);
		}
	    }


        }
	
    }

    if( pickingData.enabledChimney===true ) {
	pickingData.selectableObjects = pickingData.selectableObjectsChimney;
	

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

            
	    pickingData.enableDragAndDropChimney = true;
	    
	    pickingData.selectedObject.material.color.set(0x00ffff);
	    for (let k = 0; k < pickingData.selectableObjects.length; k++){
		if (pickingData.selectableObjects[k] != pickingData.selectedObject){
		    pickingData.selectableObjects[k].material.color.set(0xffffff);
		}
	    }


        }
	
    }

}



function resize(keyCode,object, scene){
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

function patteBetween(p,patte){
    const rayonCylindre = 2;
    const nouvellePatte = new THREE.Mesh(primitive.Cylinder(new THREE.Vector3(0,0,0), p, rayonCylindre),new THREE.MeshPhysicalMaterial({color: 0x333333, emissive:0x000000, metalness:0.5}));
    nouvellePatte.name = patte.name;
    nouvellePatte.receiveShadow = true;
    return nouvellePatte;
}
