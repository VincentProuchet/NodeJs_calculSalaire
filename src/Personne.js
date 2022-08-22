class Personne {
    #nom = '';
    #prenom = '';
    #sexe = 'H';

    set nom(nom) {
        this.#nom = nom;
    }
    set prenom(prenom) {
        this.#prenom = prenom;
    }
    set sexe(sexe) {
        this.#sexe = sexe;
    }
    get nom() {
        return this.#nom;
    }

    get prenom() {
        return this.#prenom;
    }

    get sexe() {
        return this.#sexe;
    }

}
exports.Personne = new Personne();