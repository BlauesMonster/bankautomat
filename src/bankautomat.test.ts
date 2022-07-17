import { Bankautomat } from "./bankautomat";
import { Ausgabe } from "./ausgabe";
import { Ausgabenachrichten } from "./ausgabenachrichten";
import { Vorrat } from "./vorrat";

describe("bankautomat", () => {
  test("valider betrag abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(50, 3);
    vorrat.hinzufuegen(20, 3);
    vorrat.hinzufuegen(10, 3);
    vorrat.hinzufuegen(5, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 200;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>([
        [50, 3],
        [20, 2],
        [10, 1],
      ]),
      nachricht: Ausgabenachrichten.Erfolg,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });

  test("valider betrag abheben (nur mit kleinen scheinen)", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(10, 19);
    vorrat.hinzufuegen(5, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 200;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>([
        [10, 19],
        [5, 2],
      ]),
      nachricht: Ausgabenachrichten.Erfolg,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });

  test("zuviel abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(10, 19);
    vorrat.hinzufuegen(5, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 2000;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>(),
      nachricht: Ausgabenachrichten.BetragZuHoch,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });

  test("nicht mit scheinen darstellbarer betrag abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(10, 3);
    vorrat.hinzufuegen(5, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 12;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>(),
      nachricht: Ausgabenachrichten.InvaliderBetrag,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });
  test("nichts abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(50, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 0;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>(),
      nachricht: Ausgabenachrichten.BetragMussGroesserNullSein,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });
  test("negativer betrag abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(50, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = -50;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>(),
      nachricht: Ausgabenachrichten.BetragMussGroesserNullSein,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });
  test("kommazahl abheben", () => {
    const vorrat = new Vorrat();
    vorrat.hinzufuegen(50, 3);

    const bankautomat = new Bankautomat(vorrat);

    const betrag = 50.5;

    const erwartetesErgebnis: Ausgabe = {
      geldscheine: new Map<number, number>(),
      nachricht: Ausgabenachrichten.BetragKeineKommazahl,
    };

    const ergebnis: Ausgabe = bankautomat.abheben(betrag);

    expect(ergebnis).toEqual(erwartetesErgebnis);
  });
});
