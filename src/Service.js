const { exit, rawListeners } = require("process");
const readline = require("readline");
const Salaire = require("./Salaire");
const Employee = require("./Employee");
const Personne = require("./Personne");

class Service {
    //notre line reader
    lineReader;
    annuler = false;
    salarie = new Set();

    constructor() {
        this.lineReader = readline.createInterface(
            process.stdin,
            process.stdout
        )
        this.lineReader.setPrompt('programme Salaire');
    }


    // 
    async start() {
        this.lineReader.setPrompt(this.menuPrincipal());
        this.lineReader.prompt();

        this.lineReader.on('line', async (saisie) => {

            switch (saisie) {
                // créer un nouvel employee
                case '1':
                    await this.createNewEmployee();
                    this.annuler = false;
                    this.start();
                    return;
                // calculer les salaires
                case '2':
                    this.annuler = false;
                    this.start();
                    return;
                // fermeture du programme
                case '99':
                    this.lineReader.close;
                    exit(0);
                    return;
                // entrée non reconnue
                default:
                    return;

            }

        });
    }

    menuPrincipal() {
        return `Menu Principal
        1  - créer un nouvel Employee
        2  - calculer les salaire

        99 - Quitter
        `;
    }
    menuNewEmployee() {
        return `Un nouvel employé va être ajouté à la liste des employé 
        l'opération peut être annulée en entrant $Exit
         Entrez son Nom  :`;
    }

    async createNewEmployee() {
        this.annuler = false;
        let complete = false;
        let nom;
        let prenom;
        let sexe;
        let personnesACharge;

        // entréee du nom
        nom = await this.assignateValue(this.menuNewEmployee());
        if (this.annuler) { return; }
        // entrée du prénom
        prenom = await this.assignateValue(`Entrez son prénom : `);
        if (this.annuler) { return; }
        // entrée du genre
        sexe = await this.assignateValue(`Entrez son sexe 
            H pour homme 
            F pour femme 
            sexe : `
        );
        if (this.annuler) { return; }
        // entrée des personnes à charge
        personnesACharge = await this.assignateValue(`Entrez son nombre personne à charge 
            0 pour aucunes 
            Personnes à charges : `);
        if (this.annuler) { return; }
        else { complete = true; }
        if (complete) {
            const newPersonne = Personne.Personne;
            newPersonne.nom = nom;
            newPersonne.prenom = prenom;

            const newEmployee = Employee.Employee;

            this.salarie.add(newEmployee);
            console.log(`Nouvel employée ${newEmployee.personne.nom}, ${newEmployee.personne.prenom} ajouté avec succés`);

        }

    }

    async assignateValue(promp) {
        this.lineReader.setPrompt(promp);
        this.lineReader.prompt();
        await this.lineReader.on('line', (saisie) => {
            switch (saisie) {
                case '$Exit':
                    this.annuler = true;
                    return null;
                default:
                    return saisie;
            }

        });
    }

}
exports.Service = new Service();