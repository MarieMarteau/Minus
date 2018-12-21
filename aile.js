"use strict";

function creationSurfaces(verticesArray, material) {
    const l = verticesArray.length;
    if(l<2) return;
    const vertices = verticesArray.flatten();
    const geometry;
    geometry.vertices = vertices;
    triangles = THREE.ShapeUtils.triangulateShape(vertices, holes);
    for(let i=0; i<triangles.length; i++) {
	geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));
    }
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
