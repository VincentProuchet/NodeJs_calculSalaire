const Employee = require("./Employee");
/**
 * classe pour le calcul des salaires
 */
class Salaire {
    /**employee */
    employe;
    /** salaire brut */
    #revenu = 0;
    /** salaire net */
    #salaire = 0;
    /** impots */
    #impots = -1;

    // les chiffres suivant sont des %
    /**Impot de base */
    static impotSurRevenu = 18; // %
    /** cotisations assurances */
    static assuranceEmploye = 7;// %
    /** cotisation retraite */
    static regimeDePension = 5;//  %

    /**remise pour les femme et assimilées */
    static remiseNonHomme = 2;
    /**remise personne à charge */
    static remise3PAC = 1;
    /**remise personne à charge */
    static remise4PAC = 2;
    /** montant d'allocation de base */
    static allocation = 150;
    /** montant de bonus */
    static bonus = 100;

    constructor(employee, revenu) {
        this.revenu = revenu;
        this.#salaire = -1;
        this.#impots = 0;

        this.employe = employee;

    }
    /**
     * getter revenu
     * permet de controler l'intégriter d'un revenu
     * aucun revenue ne peux être inférieur à la norme 
     * légale
     */
    set revenu(revenu) {
        // oui la norme est vraiment basse
        if (revenu > 0) {
            this.#revenu = revenu;
        }
    }
    /**
     * getter revenu
     */
    get revenu() { return this.#revenu; }

    calculSalaire() {
        if (this.#revenu > 0) {

            this.#salaire = this.#revenu;
            this.#impots = 0;
            this.ajouterImpots(Salaire.impotSurRevenu);
            this.ajouterImpots(Salaire.assuranceEmploye);
            this.ajouterImpots(Salaire.regimeDePension);

            // si la personne n'est pas un homme
            if (this.employe.personne.sexe != 'H') {
                this.remiseImpots(Salaire.remiseNonHomme);
            }
            // prise en compte des personnes à charge
            if (this.employe.personnesACharge == 3) {
                this.remiseImpots(Salaire.remise3PAC);
            }
            else if (this.employe.personnesACharge) {
                this.remiseImpots(Salaire.remise4PAC);
            }

            // attribution des bonus et allocations
            if (this.employe.allocation) { this.#salaire += Salaire.allocation }
            if (this.employe.bonus) { this.#salaire += Salaire.bonus }

            this.#salaire -= this.#impots;
        }
    }
    /**
 * calcule le montant d'une remise d'impot à partir de la valeur passé en paramétre
 *  et le retire à la proprièté impot de l'instance
 * @param {*} value une valeur d'imposition serat considéré comme un %
 */
    remiseImpots(value) {
        this.#impots = this.#impots - ((this.#revenu * value) / 100)
    }
    /**
        * calcule le montant de l'impot à partir de la valeur passé en paramétre
        *  et l'ajoute à la proprièté impots de l'instance
        * @param {*} value une valeur d'imposition serat considéré comme un %
        */
    ajouterImpots(value) {
        this.#impots = this.#impots + ((this.#revenu * value) / 100)
    }

    /**
     * retourne le salaire
     * l'idée ici est de fairte que le salaire ne puisse être modifié de l'extérieur
     */
    get salaire() {
        this.calculSalaire();
        return this.#salaire;
    }

    get impots() {
        if (this.#impots < 0) {
            this.calculSalaire();
        }
        return this.#salaire;
    }

}

exports.Salaire = new Salaire();