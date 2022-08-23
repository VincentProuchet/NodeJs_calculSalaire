const Personne = require("./Personne");
/**
 * Classe représentant un employé
 */
class Employee {
    personne;
    salaire;
    #bonus = false;
    #allocation = false;
    #personnesACharge;
    constructor() {
        this.#personnesACharge = 0
        this.personne = Personne.Personne
    }
    /**
    * change l'attribution des allocation au salairié
    * toggle
   */
    toggleAllocation() { this.#allocation = !this.#allocation; }
    /**
     * change l'attribution d'un bonus au salarie
     * toggle
     */
    toggleBonus() { this.#bonus = !this.#bonus; }
    /**
     * retire les allocations au salairié
    */

    set personnesACharge(value) {
        value = parseInt(value);
        if (value > 0) {
            this.#personnesACharge = value;
        }
    }
    get personnesACharge() {
        return this.#personnesACharge
    }

    get bonus() {
        return this.#bonus;
    }
    get allocation() {
        return this.#allocation;
    }


    tostring() {
        return `
        ${this.personne.nom} ${this.personne.prenom}  genre: ${this.personne.sexe} 
        personneACharge ${this.personnesACharge}
        allocation      ${this.#allocation}
        bonus           ${this.#bonus} 
        `;
    }

}
exports.Employee = new Employee();