function embryonPatte(sceneGraph,pickingDataPattes){
	const SGeometry = new THREE.SphereGeometry(6,32,32);
	const Smaterial = new THREE.MeshLambertMaterial({ color: 0xffaa00});
	const genou = new THREE.Mesh(SGeometry,Smaterial);
	genou.name="genou";
	genou.receiveShadow = true;
	genou.position.set(15,0,0);
	pickingDataPattes.selectableObjects.push(genou);
	sceneGraph.add(genou);
	
	const SGeometry2 = new THREE.SphereGeometry(10,32,32);
	const Smaterial2 = new THREE.MeshLambertMaterial({ color: 0xffaa00});
	const pied = new THREE.Mesh(SGeometry2,Smaterial2);
	pied.name="pied";
	pied.receiveShadow = true;
	pied.position.set(15,-25,0);
	sceneGraph.add(pied);
	pickingDataPattes.selectableObjects.push(pied);
	
	const Geometry1 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
	const material1 = new THREE.MeshLambertMaterial({ color: 0xffaa00});
	const hautpatte = new THREE.Mesh(Geometry1,material1);
	hautpatte.name="hautpatte";
	hautpatte.receiveShadow = true;
	hautpatte.position.set(15,10,0);
	sceneGraph.add(hautpatte);
	
	const Geometry2 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
	const material2 = new THREE.MeshLambertMaterial({ color: 0xffaa00});
	const baspatte = new THREE.Mesh(Geometry2,material2);
	baspatte.name="baspatte";
	baspatte.receiveShadow = true;
	baspatte.position.set(15,-10,0);
	sceneGraph.add(baspatte);
}

function patteBetween(p1,p2,patte){
	patte.position.set((p1.x+p2.x)/2,(p1.y+p2.y)/2,(p1.z+p2.z)/2);
	const angle = Math.atan(-(p1.x-p2.x)/(p1.y-p2.y));
	patte.rotation.z = angle;
}