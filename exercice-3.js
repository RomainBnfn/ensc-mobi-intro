console.log("Exercice 3 - Bagarre asynchrone");

class Wizard {
    nom;
    vie;
    puissance;
    vitesse;
    onAttack;

    constructor(...[nom, vie, puissance, vitesse, onAttack]) {
        this.nom = nom;
        this.vie = vie;
        this.puissance = puissance;
        this.vitesse = vitesse;
        this.onAttack = onAttack;
    }

    describe() {
        return `${this.nom} : ${this.vie}`;
    }

    canAttack(wizard) {
        return this.vie > 0 && wizard.vie > 0;
    }

    attack(wizard) {
        if(this.canAttack(wizard)) {
            setTimeout(() => {
                if(this.canAttack(wizard)) {
                    this.onAttack?.(this, wizard);
                    wizard.takeDamage(this);
                }
            }, this.vitesse);
        }
    }

    takeDamage(attacker) {
        this.vie = Math.max(this.vie - attacker.puissance, 0);
        this.attack(attacker);
    }
}

const Mithrandir = new Wizard(
    "Mithrandir",
    90,
    8,
    10,
    (self) => {
        self.vie += 1;
    }
);
const Albus = new Wizard(
    "Albus",
    144,
    6,
    10,
    (self, attacker) => {
        attacker.vitesse += 10;
    }
);
const Yenna = new Wizard(
    "Yenna",
    70,
    4,
    30,
    (self)  => {
        self.puissance += 1
    }
);

// First attacks
setTimeout(() => {
    Mithrandir.attack(Albus);
    Albus.attack(Yenna);
    Yenna.attack(Mithrandir);
}, 15);

const LOG_TIME_STEP = 10;

// Logger
let runTime = 0;
let logInterval = setInterval(() => {
    console.log(`${Mithrandir.describe()} - ${Albus.describe()} - ${Yenna.describe()}`)
    runTime += LOG_TIME_STEP;
    if (runTime>=1000) {
        clearInterval(logInterval);
        console.log("The asynchronus figt is over.")
    }
}, LOG_TIME_STEP);