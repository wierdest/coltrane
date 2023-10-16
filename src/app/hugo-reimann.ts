// HugoReimann.ts

export class HugoReimann {
    static Major(note: string): string[] {
      const majorChords: Record<string, string[]> = {
        C: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        D: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        E: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
        F: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
        G: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        A: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        B: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
      };
  
      return majorChords[note] || [];
    }
  
    static Minor(note: string): string[] {
      const minorChords: Record<string, string[]> = {
        C: ["Cm", "Ddim", "E♭", "Fm", "Gm", "A♭", "B♭"],
        D: ["Dm", "Edim", "F", "Gm", "Am", "B♭", "C"],
        E: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        F: ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
        G: ["Gm", "Adim", "B♭", "Cm", "Dm", "E♭", "F"],
        A: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        B: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
      };
  
      return minorChords[note] || [];
    }
  }
  