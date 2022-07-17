import { Bankautomat } from "./bankautomat";
import { Vorrat } from "./vorrat";

const vorrat = new Vorrat();
vorrat.hinzufuegen(50, 3);
vorrat.hinzufuegen(20, 3);
vorrat.hinzufuegen(10, 3);
vorrat.hinzufuegen(5, 3);

const bankautomat = new Bankautomat(vorrat);

const betrag = 200;
const ausgabe = bankautomat.abheben(betrag);
console.log(ausgabe);
