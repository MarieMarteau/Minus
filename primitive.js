"use strict";

// Calcul et renvoie la rotation entre deux axes v1 et v2
//   En supposant v1 et v2 normalisés:
//    - Axe de rotation donné par: v1 x v2 / || v1 x v2 ||
//    - Angle de rotation donné par: acos( <v1,v2> )
//   Rem: Les vecteurs v1 et v2 sont normalisés dans la fonction
// v1: axe de départ [Vector3]
// v2: axe de départ [Vector3]
function RotationBetweenTwoAxes(v1,v2) {
    const v1n = v1.clone().normalize();
    const v2n = v2.clone().normalize();

    const axis = v1n.clone().cross(v2n).normalize();
    const angle = Math.acos( v1n.dot(v2n) );

    return new THREE.Matrix4().makeRotationAxis(axis,angle);
}

const primitive = (function() {

    return {

        // p: Centre du cube [Vector3]
        // L: Longueur d'un coté du cube
        Cube: function(p,L) {
            const geometry = new THREE.BoxGeometry( L,L,L );
            geometry.translate(p.x,p.y,p.z);
            return geometry;
        },

        // Cylindre de révolution
        // p0: Point de départ (sur l'axe du cylindre) [Vector3]
        // p1: Point d'arrivée (sur l'axe du cylindre) [Vector3]
        // r: Rayon autour de l'axe
        Cylinder: function(p0,p1,r) {
            const u = p1.clone().sub(p0); // axe du cylindre
            const L = u.length(); // longueur du cylindre
            const geometry = new THREE.CylinderGeometry(r,r,L,20);

            const u0 = new THREE.Vector3(0,1,0); // axe du cylindre par défaut de Three.js
            const R = RotationBetweenTwoAxes(u0,u); // matrice de rotation entre u0 et u

            geometry.translate(0,L/2,0); // translation du cylindre pour placer sa base à l'origine (le cylindre par défaut est centré)
            geometry.applyMatrix(R); // application de la rotation
            geometry.translate(p0.x,p0.y,p0.z); // translation sur le point de départ

            return geometry;
        },

        // Cone de base circulaire
        // p0: point de départ au centre de l'axe [Vector3]
        // p1: point d'arrivée (pointe du cone) [Vector3]
        // r: rayon à la base du cone
        Cone: function(p0,p1,r) {
            const u = p1.clone().sub(p0); // axe du cone
            const L = u.length(); // longueur du cylindre
            let geometry = new THREE.ConeGeometry(r,L,20);

            const u0 = new THREE.Vector3(0,1,0); // axe du cone par défaut de Three.js
            const R = RotationBetweenTwoAxes(u0,u); // matrice de rotation entre u0 et u

            geometry.translate(0,L/2,0); // translation du cone pour placer sa base à l'origine (le cylindre par défaut est centré)
            geometry.applyMatrix(R); // application de la rotation
            geometry.translate(p0.x,p0.y,p0.z) // translation sur le point de départ

            return geometry;
        },

        // Vecteur affichable (cylindre terminant par un cone)
        // p0: point de départ [Vector3]
        // p1: point d'arrivée [Vector3]
        // rCylinder: rayon du cylindre
        // rCone: rayon à la base du cone
        // alpha: longueur du cone relative à la taille du vecteur
        Arrow: function(p0,p1,rCylinder,rCone,alpha) {
            const p01 = p1.clone().sub(p0); // Vecteur p0 p1
            const L   = p01.length(); // Longueur total du vecteur

            // position de fin du cylindre:
            //   pi = p0 + (1-alpha) (p1-p0)
            const pi  = p0.clone().add(p01.clone().multiplyScalar(1-alpha) );

            const geometry = primitive.Cylinder(p0,pi,rCylinder);
            geometry.merge( primitive.Cone(pi,p1,rCone) );

            return geometry;
        },

        // Sphère définie par son centre et rayon
        // p: centre [Vector3]
        // r: rayon
        Sphere: function(p,r) {
            const geometry = new THREE.SphereGeometry(r,32,32);
            geometry.translate(p.x,p.y,p.z);

            return geometry;
        },

        Triangle: function(p0,p1,p2) {

            const n = new THREE.Triangle(p0,p1,p2).normal();
            const vertices = new Float32Array([
                p0.x,p0.y,p0.z,
                p1.x,p1.y,p1.z,
                p2.x,p2.y,p2.z
            ]);
            const normal = new Float32Array([
                n.x,n.y,n.z,
                n.x,n.y,n.z,
                n.x,n.y,n.z,
            ]);
            const uv = new Float32Array([
                0,0,
                1,0,
                1,1
            ]);
            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
            geometry.addAttribute('normal',new THREE.BufferAttribute(normal,3));
            return geometry;
        },


        Quadrangle: function(p0,p1,p2,p3) {
            const n1 = new THREE.Triangle(p0,p1,p2).normal();
            const n2 = new THREE.Triangle(p0,p2,p3).normal();
            const vertices = new Float32Array([
                p0.x,p0.y,p0.z,
                p1.x,p1.y,p1.z,
                p2.x,p2.y,p2.z,

                p0.x,p0.y,p0.z,
                p2.x,p2.y,p2.z,
                p3.x,p3.y,p3.z
            ]);
            const normal = new Float32Array([
                n1.x,n1.y,n1.z,
                n1.x,n1.y,n1.z,
                n1.x,n1.y,n1.z,

                n2.x,n2.y,n2.z,
                n2.x,n2.y,n2.z,
                n2.x,n2.y,n2.z
            ]);
            const uv = new Float32Array([
                0,0,
                1,0,
                1,1,

                0,0,
                1,1,
                0,1
            ]);

            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
            geometry.addAttribute('normal',new THREE.BufferAttribute(normal,3));
            geometry.addAttribute('uv',new THREE.BufferAttribute(uv,2));

            return geometry;
        }


    };

})();
