const { exit, rawListeners } = require("process");
const readline = require("readline");
const Salaire = require("./Salaire");
const Employee = require("./Employee");
const Personne = require("./Personne");

class Service {
    //notre line reader
    lineReader;
    annuler = false;
    salaries;
    salarieCourant = null;

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

    constructor() {
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
                            this.annuler = false;
                            console.log(this.menuPrincipal());
                            return;
                        },
                        reject => { throw (reject) }

                    ).catch(err => console.log(err));
                // calculer les salaires
                case '2':
                    this.annuler = false;

                    return;
                // lister les employée
                case '3':
                    this.salaries.forEach((a) => {
                        console.log(a.tostring());
                    })

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

    menuPrincipal() {
        return `
        _______________________________

        Menu Principal
        _______________________________
 
        1  - créer un nouvel Employee
        2  - calculer les salaire
        3  - liste des salariés

        99 - Quitter
 
        `;
    }
    menuNewEmployee() {
        return `
        Un nouvel employé va être ajouté à la liste des employé 
        l'opération peut être annulée en entrant $Exit
        Entrez son Nom  : `;
    }

    async createNewEmployee() {
        this.annuler = false;
        let complete = false;
        let newPersonne = Personne.Personne;

        // entréee du nom
        newPersonne.nom = await this.assignateValue(this.menuNewEmployee());
        if (this.annuler) { return; }
        // entrée du prénom
        newPersonne.prenom = await this.assignateValue(Service.NEW_EMPLOYEE_PRENOM_PROMPT);
        if (this.annuler) { return; }
        // entrée du genre
        newPersonne.sexe = await this.assignateValue(Service.NEW_EMPLOYEE_GENDER_PROMPT);
        if (this.annuler) { return; }
        let newEmployee = Employee.Employee;
        newEmployee.personne = newPersonne;

        // entrée des personnes à charge
        newEmployee.personnesACharge = await this.assignateValue(Service.NEW_EMPLOYEE_PERSONNE_A_CHARGE_PROMPT);
        if (this.annuler) { return; }
        else { complete = true; }
        if (complete && !this.annuler) {
            this.salarieCourant = newEmployee;
            this.Ajoutsuccess();
        }
        return;

    }

    async assignateValue(promp) {
        this.lineReader.setPrompt(promp);
        this.lineReader.prompt();
        return (new Promise((resolve, reject) => {
            this.lineReader.on('line', (saisie) => {
                switch (saisie) {
                    case '$Exit':
                        this.annuler = true;
                        return reject('la saisie est annulée');
                    default:

                        return resolve(saisie);

                }

            });
        })).then(
            (saisie) => {
                return saisie;
            },
            (reject) => {
                this.annuler = true

                throw (reject);
            }

        )
    }

    Ajoutsuccess() {
        this.salaries.add(this.salarieCourant);
        console.log(`Nouvel employée ${this.salarieCourant.personne.nom}, ${this.salarieCourant.personne.prenom} ajouté avec succés`);
    }

}
exports.Service = new Service();