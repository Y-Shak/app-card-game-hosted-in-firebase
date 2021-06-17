import { Component,OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

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
startPlaying : any;
endPlaying : any;
durationInSecond : number ;
ngOnInit(){
	this.startPlaying = new Date();
	console.log('test ');
	console.log( 'start date= ' + this.startPlaying );
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
		// ici ajoputer le cas de selectionner la meme tuile
		if (indice === this.indexLastSelected ) {
			this.tab[this.indexLastSelected] = this.elementLastSelected;
		} else if( this.tab[indice] ==  this.elementLastSelected){
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

	if( this.countPlayingTime == 16 ){
		this.endPlaying = new Date();
		console.log( 'date fin == ' + this.endPlaying );
		this.durationInSecond = this.countDateDiff(this.startPlaying, this.endPlaying);
		alert(this.durationInSecond);
	}
}
countDateDiff(start, end){
	let duration = end-start;
	// TODO convertir en second
	duration = duration * 10;
	console.log(' duree = ' + duration);
	return duration ;
	
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
