"use strict";

function creationSurfaces(verticesArray, material) {
    const width = 1;
    const nbSamples = 100;
    const l = verticesArray.length;
    if(l<2) return new THREE.Mesh();
    const geometry = new THREE.Geometry();
    for(let i=0; i<l-1; i++) {
	    const firstShape = new THREE.CatmullRomCurve3(verticesArray[i]);
	    const secondShape = new THREE.CatmullRomCurve3(verticesArray[i+1]);
	    const firstLine = firstShape.getSpacedPoints(nbSamples);
	    const secondLine = secondShape.getSpacedPoints(nbSamples);
	    for(let j=0; j<firstLine.length-1 && j<secondLine.length-1; j++) {
		const array = [new THREE.Vector3(firstLine[j].x, firstLine[j].y, firstLine[j].z),
			       new THREE.Vector3(firstLine[j+1].x, firstLine[j+1].y, firstLine[j+1].z),
			       new THREE.Vector3(secondLine[j].x, secondLine[j].y, secondLine[j].z),
			       new THREE.Vector3(secondLine[j+1].x, secondLine[j+1].y, secondLine[j+1].z),
			       new THREE.Vector3(firstLine[j].x, firstLine[j].y, firstLine[j].z+width),
			       new THREE.Vector3(firstLine[j+1].x, firstLine[j+1].y, firstLine[j+1].z + width),
			       new THREE.Vector3(secondLine[j].x, secondLine[j].y, secondLine[j].z+ width),
			       new THREE.Vector3(secondLine[j+1].x, secondLine[j+1].y, secondLine[j+1].z + width)];
		const partialGeom = new THREE.ConvexGeometry(array);
		geometry.merge(partialGeom);
	    }
    }
    geometry.computeFaceNormals();
    geometry.computeFlatVertexNormals();
    geometry.computeMorphNormals();
    console.log(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}


// Remarque : toujours dessiner les différents doigts en tournant dans le même sens
