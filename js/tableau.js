var Form = document.querySelector("form");


////////// récuperer les données de des inputs de type text du formulaire
var Fruit1 = document.forms[0].elements[0];
var Fruit2 = document.forms[0].elements[1];
var Fruit3 = document.forms[0].elements[2];

///// RECUPEPERER LES DONNEES DU TYPE CHECKBOX (FRUIT CUIT OU NON)
var FruitCuit = document.querySelector("#cuire-fruit");
var oui = document.createElement('p');
oui.value = "oui";
var non = document.createElement('p');
non.value = "non";




////// ON RECUPERE LES CELLULES EXISTANTES DU TABLEAU 
var TbFruit1 = document.getElementById('tb-sav1');
var TbFruit2 = document.getElementById('tb-sav2');
var TbFruit3 = document.getElementById('tb-sav3');
var  Nb = document.getElementById('tb-nb-personne');
var  Cuire = document.getElementById('cuire');
var  Pate = document.getElementById('pate');

function Ajouter(){
    if(Fruit1.value == "" ){
        alert("Vous devez mettre au moins un fruit");}
    else{
        TbFruit1.textContent = Fruit1.value;
        TbFruit2.textContent = Fruit2.value;
        TbFruit3.textContent = Fruit3.value;



        //////// récuperer les données des inputs de type radio du formulaire (certaines donnée sont donc récupérées dans cette fonction)
        var nb_personne = document.querySelectorAll("input[name = 'nb-personne']");
        for(i=0; i < nb_personne.length; i++){
            if(nb_personne[i].checked === true){
                var res_nb_per = nb_personne[i].value;
            }
        }


        var choix_pate = document.querySelectorAll("input[name = 'choix-pate']");
        for(j=0 ; j < choix_pate.length; j++){
            if(choix_pate[j].checked === true){
                var res_choix_pate = choix_pate[j].value;
            }
        }


        Nb.textContent = res_nb_per;
        if(FruitCuit.checked === true){
            Cuire.textContent = "oui"
        }
        else if(FruitCuit.checked === false){
            Cuire.textContent = non.value;
        }
        Pate.textContent = res_choix_pate;

    }

}

Form.addEventListener("submit", Ajouter);



   