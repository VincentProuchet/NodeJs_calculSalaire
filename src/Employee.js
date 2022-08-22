const Personne = require("./Personne");
/**
 * Classe représentant un employé
 */
class Employee {
    personne;
    #bonus = false;
    #allocation = false;
    personnesACharge;
    constructor(personne, personnesACharge) {

        this.personne = personne;
        this.personnesACharge = personnesACharge;
    }
    /**
    * attribue des allocation au salairié
   */
    giveAllocation() { this.#allocation = true; }
    /**
     * attribue un bonus au salarié
     */
    giveBonus() { this.#bonus = true; }
    /**
     * retire les allocations au salairié
    */
    removeAllocation() { this.#allocation = false; }
    /**
     * retire le bonus au salarié
     */
    removeBonus() { this.#bonus = false; }
    /**
     * effectue toutes les retenues sur le salaire
     * 
     */


    get bonus() {
        return this.#bonus;
    }
    get allocation() {
        return this.#allocation;
    }

}
exports.Employee = new Employee();