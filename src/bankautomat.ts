import { Ausgabe } from "./ausgabe";
import { Vorrat } from "./vorrat";
import { Ausgabenachrichten } from "./ausgabenachrichten";

export class Bankautomat {
  constructor(private readonly vorrat: Vorrat) {}

  abheben(betrag: number): Ausgabe {
    const abgehobeneGeldscheine = new Map<number, number>();

    if (!Number.isInteger(betrag)) {
      return {
        geldscheine: abgehobeneGeldscheine,
        nachricht: Ausgabenachrichten.BetragKeineKommazahl,
      };
    }

    if (betrag % 5 !== 0) {
      return {
        geldscheine: abgehobeneGeldscheine,
        nachricht: Ausgabenachrichten.InvaliderBetrag,
      };
    }

    if (betrag <= 0) {
      return {
        geldscheine: abgehobeneGeldscheine,
        nachricht: Ausgabenachrichten.BetragMussGroesserNullSein,
      };
    }

    if (betrag > this.vorrat.gibSummeAllerGeldscheine()) {
      return {
        geldscheine: abgehobeneGeldscheine,
        nachricht: Ausgabenachrichten.BetragZuHoch,
      };
    }

    const geldscheinArten = this.vorrat.gibGeldscheinArtenSortiertAbsteigend();
    let abzuhebenerBetrag = betrag;
    for (const geldscheinArt of geldscheinArten) {
      const maximaleAnzahlZumAbheben = Math.floor(
        abzuhebenerBetrag / geldscheinArt
      );
      const anzahlImVorrat = this.vorrat.gibAnzahlFuerGeldschein(geldscheinArt);
      const anzahlZumAbheben = Math.min(
        anzahlImVorrat,
        maximaleAnzahlZumAbheben
      );

      if (anzahlZumAbheben === 0) continue;
      this.vorrat.rausholen(geldscheinArt, anzahlZumAbheben);
      abgehobeneGeldscheine.set(geldscheinArt, anzahlZumAbheben);

      const abgehobenerBetrag = geldscheinArt * anzahlZumAbheben;
      abzuhebenerBetrag -= abgehobenerBetrag;

      if (abzuhebenerBetrag === 0) break;
    }

    return {
      geldscheine: abgehobeneGeldscheine,
      nachricht: Ausgabenachrichten.Erfolg,
    };
  }
}
