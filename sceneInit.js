"use strict";


const sceneInit = (function() {

return {

    // Création et ajout de lumière dans le graphe de scène
insertLight: function(sceneGraph,p) {
        const spotLight = new THREE.SpotLight(0xffffff,0.9);
        spotLight.position.copy(p);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        sceneGraph.add(spotLight);
        return spotLight;
    },

insertAmbientLight: function(sceneGraph) {
    const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
    ambient.name = "ambient";
    sceneGraph.add(ambient);
},

    // Création et ajout d'une caméra dans le graphe de scène
createCamera: function(x,y,z) {
        //const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.set(x,y,z);
        camera.lookAt(0,0,0);

        return camera;
    },

    // Initialisation du moteur de rendu
createRenderer : function(){
        const renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer: true} );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xffffff,1.0);
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.Type = THREE.PCFSoftShadowMap;

        return renderer;
    },


insertRenderInHtml : function(domElement) {
  const affichageElement = document.querySelector("#AffichageScene3D");
  affichageElement.appendChild(domElement);
},

};

})();
