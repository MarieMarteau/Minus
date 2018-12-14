"use strict";

function getBody() {
    //const baseShape = new THREE.SplineCurve([new THREE.Vector2(0,0),
//					   new THREE.Vector2(-1,1),
//					   new THREE.Vector2(0,2),
//					   new THREE.Vector2(-0.5,2.5),
//					   new THREE.Vector2(0,3)]);
    const baseShape = new THREE.Shape();
    baseShape.lineTo(-1,1);
    baseShape.lineTo(0,3);
    //baseShape.lineTo(0,0);
    const circleCurve = new THREE.EllipseCurve(0,0,0.5,0.5);
    //const circlePath = new THREE.Path(circleCurve.getPoints(100));
    //const circlePath = new THREE.Path();
    //circlePath.absellipse(0,0,0.5,0.5,0,2*Math.PI,false,Math.PI/2);
    let bodyPoints = []
    const shapePoints = baseShape.getPoints();
    const maxI = 100
    const circleRadius = 0.5
    for(let j=0; j<shapePoints.length; j++) {
	if(shapePoints[j].x == 0) {
	    bodyPoints.push(new THREE.Vector3(shapePoints[j].x, shapePoints[j].y, 0))
	}
    }
    for(let i=0; i<maxI; i++) {
	for(let j=0; j<shapePoints.length; j++) {
	    if(shapePoints[j].x != 0) {
		bodyPoints.push(new THREE.Vector3(circleRadius*Math.cos(2*i*Math.PI/maxI)*shapePoints[j].x, shapePoints[j].y, circleRadius*Math.sin(2*i*Math.PI/maxI)*shapePoints[j].x));
	    }
	}
    }
    console.log(bodyPoints);
    const bodyGeometry = new THREE.ConvexGeometry(bodyPoints);
    bodyGeometry.vertices = bodyPoints;
    const hull = new THREE.QuickHull();
    hull.setFromPoints(bodyPoints);
    const faces = hull.faces();
    console.log(faces);
    //const circlePath = new THREE.CatmullRomCurve3(points);
    //console.log(circlePath);
    //const bodyGeometry = new THREE.ExtrudeGeometry(baseShape, {extrudePath:circlePath, steps:10, bevelEnabled:false})//, {extrudePath: circleCurve});
    console.log(bodyGeometry);
    const bodyMesh = new THREE.Mesh(bodyGeometry, new THREE.MeshBasicMaterial({color:0x00ff00}));
    sceneThreeJs.sceneGraph.add(bodyMesh);
}
