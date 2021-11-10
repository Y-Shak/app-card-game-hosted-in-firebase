import { Component,OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	
	// ce qui nous permet de simplifier le traitement est : 
	// les valeurs du tableau contiennent le nom de l'image affichée 
	// ce qui simplifie la comparaison si c'est la même carte ou pas 

// 	Les étapes :
// etape 1
//F  afficher les tuiles de 1 à 32 
// Etape 1 : Créer un tableau d'entier de 0 à 31
// etape 2
//  afficher les tuiles de 1 à 32 mélangées
// etape 3
//F  afficher 16 paires de tuiles(prises parmis les 42 tuiles)  mélangées
// etape 4
// effacer une tuile

// etape 5 
// effacer les 2 mêmes tuiles

// etape 6
// éviter le bug quand on clique 2 fois sur la meme tuile
// ------------

tab : number[] =[];
tabIndex : number[] = [];
countPlayingTime = 0;
isOver : boolean = false;
gameDurationInMinutes = 0.5;
timePassed ;

constructor(){
	setTimeout(
		() => {
		  this.isOver = true;
		  alert('le temps est écoulé ressayer !!!!');
		  window.location.reload();
		}, this.gameDurationInMinutes*60000
	  );

	interval(1000).subscribe( (resolve)=>
		// this.timePassed = new Date(2021,6,18,13,0,0,0).getTime()+ resolve
		this.timePassed = resolve
	);	
}
ngOnInit(){

	// let counter = interval(1000).subscribe((resolve)=>{
		
	// 	console.log(this.timePassed);
	// });

    // la methode ngOnInit est appeler au démarage de la page ...
	// un tableau d'indice pour faire une selection aleatoire 
	
	for(let i = 0 ; i < 42 ; i++ ){
		this.tabIndex.push(i);
	}
	this.tabIndex = this.melanger(this.tabIndex);
	//F je cherche les 16 cartes
	// modifier la boucle avec splice 
	for(let i = 0 ; i < 16 ; i++ ) {

		this.tab.push(this.tabIndex[i]);
	}
	// dupliquer le tableau pour avoir taille 38
	this.tab = this.tab.concat(this.tab);
	// etape 3
	//F  afficher 16 paires de tuiles(prises parmis les 42 tuiles)  mélangées
	this.tab = this.melanger(this.tab);
}
isClickedOnce = false ;
indexLastSelected;
elementLastSelected ;
onClickImage(indice : number){
	// console.log(this.tab);

	if(this.isClickedOnce === false){
		// je mémorise
		this.isClickedOnce = true ;
		this.elementLastSelected = this.tab[indice];
		this.indexLastSelected = indice;

		this.tab[indice] = -2;
	}else{
		// ici c'est le cas où j'ai déjà une carte selectionnée 
		if (indice === this.indexLastSelected ) {
			// ici je traite  le cas de selectionner la meme tuile
			// alors je reRemplis la case avec l'ancienne valeur 
			this.tab[this.indexLastSelected] = this.elementLastSelected;
		} else 
		if( this.tab[indice] ==  this.elementLastSelected){
			// je compare et je cache si c'est la même tuile 
			this.tab[indice] = -2;
			this.countPlayingTime ++ ;
			console.log(this.countPlayingTime);
		}else{
			this.tab[this.indexLastSelected] = this.elementLastSelected;
			
		}
		// vider les elements pour le prochain select 
		this.indexLastSelected = -1 ;
		this.elementLastSelected = -1;		
		this.isClickedOnce = false;
	}
	if(this.isOver){
		// alert('le temps est écoulé ressayer !!!!');
		// window.location.reload();
	}
	if(this.countPlayingTime == 16){
		alert('Bravo vous avez gagné, rejouer si vous trouvez du plaisir  !!!!');
		window.location.reload();
	}

	
}

convertTimeToDisplay(duration : number ){
	return this.toHHMMSS(duration);
}
// c'est code js 
toHHMMSS = (secs) => {
    let sec_num = parseInt(secs, 10)    
    let hours   = Math.floor(sec_num / 3600) % 24
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60    
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}


melanger(tab){
    let tab2 =[];
    let x =0;
    for(let i =0;i<tab.length;i++){        
        do{
            // je genere un nb alea de 0 à taille du tableau
            x =    Math.floor(Math.random() * tab.length);
        }while(tab2[x] != undefined);
        // tant que l'emplacement n'est pas vide
        tab2[x] = tab[i];
    }
    return tab2;
}
// let tab2 = this.melanger(tab1)


}
