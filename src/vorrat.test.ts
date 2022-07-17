import { Vorrat } from "./vorrat";

describe("vorrat", () => {
  test("leerer vorrat", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();

    for (const geldscheinArt of geldscheinArten) {
      const anzahl = vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
      expect(anzahl).toEqual(0);
    }
  });

  test("geldschein typen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();

    const erwarteteGeldscheinArten = [5, 10, 20, 50];

    for (const geldscheinArt of geldscheinArten) {
      expect(erwarteteGeldscheinArten.includes(geldscheinArt)).toEqual(true);
    }
    expect(geldscheinArten.length).toEqual(erwarteteGeldscheinArten.length);
  });

  test("geldschein sortierung", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();

    for (let i = 0; i < geldscheinArten.length - 1; i++) {
      const geldscheinArt = geldscheinArten[i];
      expect(geldscheinArt).toBeGreaterThan(geldscheinArten[i + 1]);
    }
  });

  test("invalider geldschein", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const invaliderSchein = 30;

    expect(geldscheinArten.includes(invaliderSchein)).toBeFalsy();
    expect(() =>
      vorrat.gibAnzahlFuerGeldschein(invaliderSchein)
    ).toThrowError();
    expect(() => vorrat.hinzufuegen(invaliderSchein, 1)).toThrowError();
    expect(() => vorrat.rausholen(invaliderSchein, 1)).toThrowError();
  });

  test("geldschein hinzufügen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const geldscheinArt = geldscheinArten[0];
    const anzahlZumHinzufuegen = 3;
    const vorherigeAnzahlVomGeldschein =
      vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
    const erwarteteAnzahlNachHinzufuegen =
      vorherigeAnzahlVomGeldschein + anzahlZumHinzufuegen;

    vorrat.hinzufuegen(geldscheinArt, anzahlZumHinzufuegen);

    const neueAnzahlVomGeldschein =
      vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
    expect(neueAnzahlVomGeldschein).toEqual(erwarteteAnzahlNachHinzufuegen);
  });

  test("negative anzahl hinzufügen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const geldscheinArt = geldscheinArten[0];
    const anzahlZumHinzufuegen = -3;

    const aktion = () =>
      vorrat.hinzufuegen(geldscheinArt, anzahlZumHinzufuegen);

    expect(aktion).toThrowError();
  });

  test("geldschein rausholen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const geldscheinArt = geldscheinArten[0];
    const anzahlZumRausholen = 3;
    vorrat.hinzufuegen(geldscheinArt, 23);
    const vorherigeAnzahlVomGeldschein =
      vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
    const erwarteteAnzahlNachRausholen =
      vorherigeAnzahlVomGeldschein - anzahlZumRausholen;

    vorrat.rausholen(geldscheinArt, anzahlZumRausholen);

    const neueAnzahlVomGeldschein =
      vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
    expect(neueAnzahlVomGeldschein).toEqual(erwarteteAnzahlNachRausholen);
  });

  test("negative anzahl rausholen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const geldscheinArt = geldscheinArten[0];
    const anzahlZumRausholen = -3;
    vorrat.hinzufuegen(geldscheinArt, 23);

    const aktion = () => vorrat.rausholen(geldscheinArt, anzahlZumRausholen);

    expect(aktion).toThrowError();
  });

  test("zuviel geldscheine rausholen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const geldscheinArt = geldscheinArten[0];
    const anzahlZumRausholen = 3;
    vorrat.hinzufuegen(geldscheinArt, 1);

    const aktion = () => vorrat.rausholen(geldscheinArt, anzahlZumRausholen);

    expect(aktion).toThrowError();
  });

  test("summe pruefen", () => {
    const vorrat: Vorrat = new Vorrat();
    const geldscheinArten = vorrat.gibGeldscheinArtenSortiertAbsteigend();
    const anzahl = 2;
    let erwarteteSumme = 0;
    for (const geldscheinArt of geldscheinArten) {
      vorrat.hinzufuegen(geldscheinArt, anzahl);
      erwarteteSumme += geldscheinArt * anzahl;
    }

    const summeAllerGeldscheine = vorrat.gibSummeAllerGeldscheine();

    expect(summeAllerGeldscheine).toEqual(erwarteteSumme);
  });
});
