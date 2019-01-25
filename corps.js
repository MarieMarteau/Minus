"use strict";


function getBody(sceneGraph, array) {
    const baseShape = new THREE.CatmullRomCurve3(array);
    const bodyGeometry = new THREE.Geometry();
    const shapePoints = baseShape.getSpacedPoints(128);
    const maxI = 256
    const circleRadius = 1
    const pointsNb = shapePoints.length
    let point;
    let ptsB = []
    const firstY = shapePoints[0].y
    const lastY = shapePoints[shapePoints.length-1].y
    const totalPoints = pointsNb*maxI;
    console.log(pointsNb*maxI);
    for(let i=0; i<maxI; i++) {
	ptsB = []
	for(let j=0; j<pointsNb; j++) {
            point = new THREE.Vector3(circleRadius*Math.cos(2*i*Math.PI/maxI)*shapePoints[j].x, shapePoints[j].y, circleRadius*Math.sin(2*i*Math.PI/maxI)*shapePoints[j].x);
            ptsB.push(point);
            bodyGeometry.vertices.push(point);
	}
	for(let j=0; j<pointsNb-1; j++) {
            bodyGeometry.faces.push(new THREE.Face3(i*pointsNb+j, ((i+1)*pointsNb+j)%totalPoints, i*pointsNb+j+1));
            bodyGeometry.faces.push(new THREE.Face3(i*pointsNb+j+1, ((i+1)*pointsNb+j)%totalPoints, ((i+1)*pointsNb+j+1)%totalPoints));
	}
	bodyGeometry.faces.push(new THREE.Face3(((i+1)*pointsNb)%totalPoints, i*pointsNb, totalPoints));
	bodyGeometry.faces.push(new THREE.Face3(i*pointsNb+pointsNb-1, ((i+1)*pointsNb+pointsNb-1)%totalPoints, totalPoints+1));
    }
    bodyGeometry.vertices.push(new THREE.Vector3(0, firstY, 0));
    bodyGeometry.vertices.push(new THREE.Vector3(0, lastY, 0));
    bodyGeometry.computeFaceNormals();
    bodyGeometry.computeFlatVertexNormals();
    bodyGeometry.computeMorphNormals();
    console.log(bodyGeometry);
    
    
    const bodyMesh = new THREE.Mesh(bodyGeometry, new THREE.MeshPhysicalMaterial({ color: 0xb21605, emissive : 0x000000,metalness:0.2}));
    bodyMesh.name = "body";
    bodyMesh.castShadow = true;
    sceneGraph.add(bodyMesh);

    const rayonBoule = 3;
    //position des pattes
    let radiiSum = 0;
    for(let j=0; j<pointsNb; j++) {
	radiiSum += Math.sqrt(Math.pow(shapePoints[j].x,2) + Math.pow(shapePoints[j].z,2))
    }
    const avgRadius = radiiSum / pointsNb;
    console.log(avgRadius);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    sphere.position.set(avgRadius*2/5, lastY, 0);
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    sphere2.position.set(-avgRadius*2/5, lastY, 0);
    sphere.name="patte1";
    //sphere.visible=false;
    sphere2.name="patte2";
    //sphere2.visible=false;
    bodyMesh.add(sphere);
    bodyMesh.add(sphere2);

    const Geometry1 = new THREE.CylinderGeometry(0.5,0.5, 15, 32 );
    const material1 = new THREE.MeshLambertMaterial({ color: 0x000000});
    const hautpatte = new THREE.Mesh(Geometry1,material1);
    hautpatte.name="hautpatte";
    hautpatte.receiveShadow = true;
    hautpatte.position.set(0, -7.5, 0);
    //hautpatte.visible=false;
    sphere.add(hautpatte);

    const genou = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    genou.name="genou";
    genou.receiveShadow = true;
    genou.position.set(0, -15, 0);
    //genou.visible=false;
    sphere.add(genou);
    //pickingDataPattes.selectableObjects.push(genou);

    const Geometry2 = new THREE.CylinderGeometry(0.5,0.5, 15, 32 );
    const material2 = new THREE.MeshLambertMaterial({ color: 0x000000});
    const baspatte = new THREE.Mesh(Geometry2,material2);
    baspatte.name="baspatte";
    baspatte.receiveShadow = true;
    //baspatte.visible=false;
    baspatte.position.set(0, -15, 0);
    genou.add(baspatte);
    
    const pied = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    pied.name="pied";
    //pied.visible=false;
    pied.receiveShadow = true;
    pied.position.set(0, -15, 0);
    genou.add(pied);
    //pickingDataPattes.selectableObjects.push(pied);

    const hautpatte2 = new THREE.Mesh(Geometry1,material1);
    hautpatte2.name="hautpatte2";
    hautpatte2.receiveShadow = true;
    hautpatte2.position.set(0, -7.5, 0);
    //hautpatte2.visible=false;
    sphere2.add(hautpatte2);

    const genou2 = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    genou2.name="genou2";
    genou2.receiveShadow = true;
    genou2.position.set(0, -15, 0);
    sphere2.add(genou2);
    //genou2.visible=false;
    //pickingDataPattes.selectableObjects.push(genou);

    const baspatte2 = new THREE.Mesh(Geometry2,material2);
    baspatte2.name="baspatte2";
    baspatte2.receiveShadow = true;
    baspatte2.position.set(0, -22.5, 0);
    //baspatte2.visible=false;
    genou2.add(baspatte2);
    
    const pied2 = new THREE.Mesh(new THREE.SphereGeometry(rayonBoule,32,32),new THREE.MeshLambertMaterial({ color: 0x000000}));
    pied2.name="pied2";
    pied2.receiveShadow = true;
    pied2.position.set(0, -15, 0);
    //pied2.visible=false;
    genou2.add(pied2);
    //pickingDataPattes.selectableObjects.push(pied);

    genou.add(patteBetween(pied.position,baspatte));
    sphere.add(patteBetween(genou.position,hautpatte));
    genou.remove(baspatte);
    baspatte.name = "";
    sphere.remove(hautpatte);
    hautpatte.name = ""
    genou2.add(patteBetween(pied2.position,baspatte2));
    sphere2.add(patteBetween(genou2.position,hautpatte2));
    genou2.remove(baspatte2);
    baspatte2.name = "";
    sphere2.remove(hautpatte2);
    hautpatte2.name = ""
};
