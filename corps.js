"use strict";

function getBody(sceneGraph,array) {
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
    const bodyMesh = new THREE.Mesh(bodyGeometry, new THREE.MeshLambertMaterial({color:0x00ff00}));
    bodyMesh.name = "body";
    bodyMesh.castShadow = true;
    sceneGraph.add(bodyMesh);

    //position des pattes
    let radiiSum = 0;
    for(let j=0; j<pointsNb; j++) {
	radiiSum += Math.sqrt(Math.pow(shapePoints[j].x,2) + Math.pow(shapePoints[j].z,2))
    }
    const avgRadius = radiiSum / pointsNb;
    console.log(avgRadius);
    const sphereGeom = primitive.Sphere(new THREE.Vector3(avgRadius*1/3, lastY, 0), 5); //position d'une patte
    const sphere = new THREE.Mesh(sphereGeom, new THREE.MeshLambertMaterial({color:0xff00000}));
    const sphereGeom2 = primitive.Sphere(new THREE.Vector3(-avgRadius*1/3, lastY, 0), 5); //position de la patte 2
    const sphere2 = new THREE.Mesh(sphereGeom2, new THREE.MeshLambertMaterial({color:0xff00000}));
    sceneGraph.add(sphere);
    sceneGraph.add(sphere2);
};

 



