"use strict";

function creationSurfaces(verticesArray, material) {
    const width = 0.1;
    const l = verticesArray.length;
    if(l<2) return new THREE.Mesh();
    const geometry = new THREE.Geometry();
    for(let i=0; i<l-1; i++) {
	const firstLine = verticesArray[i];
	const secondLine = verticesArray[i+1];
	for(let j=0; j<firstLine.length-1; j++) {
	    const array = [firstLine[j],
			   firstLine[j+1],
			   secondLine[j],
			   secondLine[j+1],
			   new THREE.Vector3(firstLine[j].x, firstLine[j].y, firstLine[j].z+width),
			   new THREE.Vector3(firstLine[j+1].x, firstLine[j+1].y, firstLine[j+1].z+width),
			   new THREE.Vector3(secondLine[j].x, secondLine[j].y, secondLine[j].z+width),
			   new THREE.Vector3(secondLine[j+1].x, secondLine[j+1].y, secondLine[j+1].z+width)];
	    const partialGeom = new THREE.ConvexGeometry(array);
	    geometry.merge(partialGeom);
	}
    }
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
