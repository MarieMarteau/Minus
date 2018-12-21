"use strict";

function getBody(sceneGraph,array) {
    //const baseShape = new THREE.SplineCurve([new THREE.Vector2(0,0),
//					   new THREE.Vector2(-1,1),
//					   new THREE.Vector2(0,2),
//					   new THREE.Vector2(-0.5,2.5),
//					   new THREE.Vector2(0,3)]);
    const baseShape = new THREE.Shape();
//    baseShape.lineTo(-1,1);
//    baseShape.lineTo(0,2);
//    baseShape.lineTo(2.5,2.5);
//    baseShape.lineTo(0,3);
    /*const array = [new THREE.Vector2(1.75,0.5),
		   new THREE.Vector2(0,0),
		   new THREE.Vector2(-1.75,0.5),
		   new THREE.Vector2(-2,1),
		   new THREE.Vector2(-.75,2),
		   new THREE.Vector2(0,2.5),
		   new THREE.Vector2(0.75,2)];*/
    baseShape.splineThru(array);
    //baseShape.lineTo(0,0);
    const circleCurve = new THREE.EllipseCurve(0,0,0.5,0.5);
    //const circlePath = new THREE.Path(circleCurve.getPoints(100));
    //const circlePath = new THREE.Path();
    //circlePath.absellipse(0,0,0.5,0.5,0,2*Math.PI,false,Math.PI/2);
    let bodyPointsBuffer1 = []
    let bodyPointsBuffer2 = []
    let bodyGeometry = new THREE.Geometry();
    const shapePoints = baseShape.getSpacedPoints(128);
//ATTENTION : il faudra s'assurer que shapePoints est trie par coord. "y" croissante pour ne pas planter les calculs d'enveloppe convexe (ici garanti par la definition de array)
    const maxI = 256
    const circleRadius = 1
    for(let j=0; j<shapePoints.length; j++) {
	if(shapePoints[j].x == 0) {
	    bodyPointsBuffer2.push(new THREE.Vector3(shapePoints[j].x, shapePoints[j].y, 0))
	}
	else {
	    for(let i=0; i<maxI; i++) {
		bodyPointsBuffer2.push(new THREE.Vector3(circleRadius*Math.cos(2*i*Math.PI/maxI)*shapePoints[j].x, shapePoints[j].y, circleRadius*Math.sin(2*i*Math.PI/maxI)*shapePoints[j].x));
	    }
	}
	if(bodyPointsBuffer1.length != 0) {
	    const partialGeom = new THREE.ConvexGeometry(bodyPointsBuffer1.concat(bodyPointsBuffer2));
	    bodyGeometry.merge(partialGeom);
	}
	bodyPointsBuffer1 = bodyPointsBuffer2.slice();
	bodyPointsBuffer2 = [];
    }
    //const bodyGeometry = new THREE.ConvexGeometry(bodyPoints);
    //const circlePath = new THREE.CatmullRomCurve3(points);
    //console.log(circlePath);
    //const bodyGeometry = new THREE.ExtrudeGeometry(baseShape, {extrudePath:circlePath, steps:10, bevelEnabled:false})//, {extrudePath: circleCurve});
    bodyGeometry.computeFaceNormals();
    bodyGeometry.computeFlatVertexNormals();
    bodyGeometry.computeMorphNormals();
    console.log(bodyGeometry);
    const bodyMesh = new THREE.Mesh(bodyGeometry, new THREE.MeshLambertMaterial({color:0x00ff00}));
    bodyMesh.name = "body";
    bodyMesh.castShadow = true;
    sceneGraph.add(bodyMesh);
};



