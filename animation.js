function moveNag(Minus,t){
	for(let i=0;i<Minus.surfacesG.length;i++){
			const x = Minus.pointDepartG.x;
			const y = Minus.pointDepartG.y;
			const z = Minus.pointDepartG.z;
			Minus.surfacesG[i].position.x+=-x;
			Minus.surfacesG[i].position.y+=-y;
			Minus.surfacesG[i].position.z+=-z;
			Minus.surfacesG[i].rotation.y=0.5*Math.cos(t);
			Minus.surfacesG[i].position.x+=x;
			Minus.surfacesG[i].position.y+=y;
			Minus.surfacesG[i].position.z+=z;
			console.log(Minus.pointDepartG);
		}
		
		for(let i=0;i<Minus.doigtsG.length;i++){
			Minus.doigtsG[i].rotation.y=0.5*Math.cos(t);
		}
		
		for(let i=0;i<Minus.surfacesD.length;i++){
			Minus.surfacesD[i].rotation.y=-0.5*Math.cos(t);
		}
		
		for(let i=0;i<Minus.doigtsD.length;i++){
			Minus.doigtsD[i].rotation.y=-0.5*Math.cos(t);
		}
}