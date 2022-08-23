const { exit, rawListeners } = require("process");
const readline = require("readline");
const Salaire = require("./Salaire");
const Employee = require("./Employee");
const Personne = require("./Personne");
const { resolve } = require("path");

class Service {
    //notre line reader
    lineReader;
    annuler = false;
    salaire = Salaire.Salaire;
    salarieCourant = Employee.Employee;

    static PROGRAM_TITLE = 'programme Salaire';
    static NEW_EMPLOYEE_PRENOM_PROMPT =
        `Entrez son prénom : `;
    static NEW_EMPLOYEE_GENDER_PROMPT =
        `genre  
        h pour homme 
        f pour femme 
        Entrez son genre : `;
    static NEW_EMPLOYEE_PERSONNE_A_CHARGE_PROMPT =
        `
    Entrez son nombre personne à charge 
        0 pour aucunes 
    Personnes à charges : `;
    static SAISIR_SALAIRE =
        `
    saisisseez le revenu brut du salarié : `;

    constructor() {
        this.salaire = Salaire.Salaire;
        this.salarieCourant = this.salaire.employe;
        this.salarieCourant.personne.nom = "Prouchet";
        this.salarieCourant.personne.prenom = "Vincent";
        this.salarieCourant.personne.sexe = "h";
        this.salarieCourant.personnesACharge = "0";
        this.salaire.revenu = "18000";
        this.salaries = new Set()


        this.lineReader = readline.createInterface(
            process.stdin,
            process.stdout
        )
        this.lineReader.setPrompt(Service.PROGRAM_TITLE);
    }


    // 
    async start() {
        this.lineReader.setPrompt(this.menuPrincipal());
        this.lineReader.prompt();

        this.lineReader.on('line', async (saisie) => {

            switch (saisie) {
                // créer un nouvel employee
                case '1':
                    await this.createNewEmployee().then(

                        resolve => {

                            console.log(this.menuPrincipal());
                            return;
                        },
                        reject => { throw (reject) }

                    ).catch(err => console.log(err));
                // calculer les salaires
                case '2':
                    this.salaire.calculSalaire();
                    console.log(this.salaire.tostring());
                    return;
                // lister les employée
                case '3':
                    console.log(this.salarieCourant.tostring());

                    return;
                case '4':
                    this.salarieCourant.toggleAllocation();
                    return;
                case '5':
                    this.salarieCourant.toggleBonus();
                    return;
                // fermeture du programme
                case '99':
                    this.lineReader.close;
                    exit(0);
                    return;
                // entrée non reconnue
                case '':
                    console.log(this.menuPrincipal());
                    return;
                default:

                    return;

            }

        });
    }
    /**
     * texte de menu principal
     * @returns chaine de caractére fomratée
     */
    menuPrincipal() {
        return `
        _______________________________

        Menu Principal
        _______________________________
 
        1  - créer un nouvel Employee
        2  - calculer le salaire
        3  - voir salarié courant
        4  - changer Allocation (toggle)
        5  - changer Bonus (toggle)        

        99 - Quitter
 
        `;
    }
    /**
     * texte de création de nouvel employée 
     * @returns une chaine de caractére formaté 
     */
    menuNewEmployee() {
        return `
        Un nouvel employé va être crée
        l'opération peut être annulée en entrant une saisie vide
        Entrez son Nom  : `;
    }

    saisirRevenu() {
        return

    }
    /**
     * créer un nouveau salarié
     * suis une procédure effectuant plusieurs demandes de saisies
     * à l'utilisateur
     * le nouveau salarie sera stocké dans le  salarieCourant de l'instance
     */
    async createNewEmployee() {
        this.annuler = false;
        let complete = false;
        let personnesACharge = 0;
        let revenu = 0;
        let newPersonne = Personne.Personne;

        // entréee du nom
        await this.assignateValue(this.menuNewEmployee()).then(
            (saisie) => { newPersonne.nom = saisie; }
        );
        // entrée du prénom
        await this.assignateValue(Service.NEW_EMPLOYEE_PRENOM_PROMPT).then(
            (saisie) => { newPersonne.prenom = saisie; }
        );
        // entrée du genre
        await this.assignateValue(Service.NEW_EMPLOYEE_GENDER_PROMPT).then(
            (saisie) => { newPersonne.sexe = saisie; }
        );
        // entrée des personnes à charge
        await this.assignateValue(Service.NEW_EMPLOYEE_PERSONNE_A_CHARGE_PROMPT).then(
            (saisie) => {
                personnesACharge = saisie;
                complete = true;
            }
        )
        await this.assignateValue(Service.SAISIR_SALAIRE).then(
            (saisie) => { revenu = saisie }
        ).catch(err => console.log(err));


        if (complete && !this.annuler) {

            this.salarieCourant.personne = newPersonne;
            this.salarieCourant.personnesACharge = personnesACharge;
            this.salaire.Employee = this.salarieCourant
            this.salaire.revenu = revenu;
            this.Ajoutsuccess();

        }
    }
    /**
     * fait une demande de saisie à l'utilisateur
     * 
     * @param {*} promp texte à afficher lors de la demande
     * @returns une prommesse
     */
    async assignateValue(promp) {
        this.lineReader.setPrompt(promp);
        this.lineReader.prompt();
        return (new Promise((resolve, reject) => {
            this.lineReader.on('line', (saisie) => {
                switch (saisie) {
                    case '$Exit':
                        this.annuler = true;
                        return reject('la saisie est annulée');
                    case '':
                        this.annuler = true;
                        return reject('la saisie est annulée');
                    default:
                        return resolve(saisie);
                }

            });
        }))
    }
    /**
     * Affiche un texte lors de la réussite de création d'un Salarié en tant que salarié courant
     */
    Ajoutsuccess() {
        this.salaries.add(this.salarieCourant);
        console.log(`Nouvel employée ${this.salarieCourant.personne.nom}, ${this.salarieCourant.personne.prenom} ajouté avec succés`);
    }

}



exports.Service = new Service();