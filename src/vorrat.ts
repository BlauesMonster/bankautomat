export class Vorrat {
  private readonly vorrat: Map<number, number> = new Map<number, number>();
  private readonly valideGeldscheine: number[] = [5, 10, 20, 50];
  constructor() {
    for (const geldschein of this.valideGeldscheine) {
      this.vorrat.set(geldschein, 0);
    }
    this.loggeVorrat();
  }

  hinzufuegen(geldschein: number, anzahl: number) {
    if (anzahl <= 0) throw new Error("Anzahl muss größer 0 sein");
    const vorherigerWert = this.gibAnzahlFuerGeldschein(geldschein);
    const neuerWert = vorherigerWert + anzahl;
    this.vorrat.set(geldschein, neuerWert);
    this.loggeVorrat();
  }

  rausholen(geldschein: number, anzahl: number) {
    if (anzahl <= 0) throw new Error("Anzahl muss größer 0 sein");
    const vorherigerWert = this.gibAnzahlFuerGeldschein(geldschein);
    if (vorherigerWert - anzahl < 0) {
      throw new Error("So viele Geldscheine gibt es nicht");
    }

    const neuerWert = vorherigerWert - anzahl;
    this.vorrat.set(geldschein, neuerWert);
    this.loggeVorrat();
  }

  gibAnzahlFuerGeldschein(geldschein: number) {
    if (!this.validiereGeldschein(geldschein))
      throw new Error("Invalider Geldschein");

    return this.vorrat.get(geldschein);
  }

  gibGeldscheinArtenSortiertAbsteigend() {
    return [...this.valideGeldscheine].sort((a, b) => b - a);
  }

  private validiereGeldschein(geldschein): boolean {
    return this.valideGeldscheine.includes(geldschein);
  }

  gibSummeAllerGeldscheine() {
    let summe = 0;
    for (const geldscheinArt of this.gibGeldscheinArtenSortiertAbsteigend()) {
      summe += geldscheinArt * this.vorrat.get(geldscheinArt);
    }
    return summe;
  }

  private loggeVorrat() {
    console.log("Vorrat: ");
    console.table(this.vorrat);
  }
}
