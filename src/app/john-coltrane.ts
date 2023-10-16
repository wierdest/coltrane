// JohnColtrane.ts

export module JohnColtrane {
    export function SubstituteChords(chords: string[]): string[] {
        const substitutions: string[] = [];
        for (const chord of chords) {
          substitutions.push(Substitute(chord));
        }
        return substitutions;
    }
    export function Substitute(chord: string): string {
      // Replace the flat symbol (♭) with 'b' and convert to lowercase
      chord = chord.replace('♭', 'b').toLowerCase();
  
      // Replace 'sharp' with '#' for consistency
      chord = chord.replace('sharp', '#');
  
      switch (chord) {
        // Major Chords
        case 'c':
          return 'Abmaj7';
        case 'c#':
        case 'db':
          return 'Amaj7';
        case 'd':
          return 'Bbmaj7';
        case 'd#':
        case 'eb':
          return 'C#maj7';
        case 'e':
          return 'Cmaj7';
        case 'f':
          return 'Dmaj7';
        case 'f#':
        case 'gb':
          return 'Emaj7';
        case 'g':
          return 'Emaj7';
        case 'g#':
        case 'ab':
          return 'Fmaj7';
        case 'a':
          return 'F#maj7';
        case 'a#':
        case 'bb':
          return 'Dmaj7';
        case 'b':
          return 'Gbmaj7';
  
        // Minor Chords
        case 'am':
          return 'F#maj7';
        case 'a#m':
        case 'bbm':
          return 'Dmaj7';
        case 'bm':
          return 'Gbmaj7';
        case 'cm':
          return 'Abmaj7';
        case 'c#m':
        case 'dbm':
          return 'A7';
        case 'dm':
          return 'Bbmaj7';
        case 'd#m':
        case 'ebm':
          return 'C7';
        case 'em':
          return 'C#maj7';
        case 'fm':
          return 'Dmaj7';
        case 'f#m':
        case 'gbm':
          return 'D7';
        case 'gm':
          return 'Emaj7';
        case 'g#m':
        case 'abm':
          return 'F7';
  
        // Diminished Chords
        case 'bdim':
          return 'Gbmaj7';
        case 'cdim':
          return 'Abmaj7';
        case 'ddim':
          return 'Bbmaj7';
        case 'edim':
          return 'C#maj7';
        case 'fdim':
          return 'Dmaj7';
        case 'gdim':
          return 'Emaj7';
        case 'adim':
          return 'F#maj7';
        case 'a#dim':
        case 'bbdim':
          return 'F#maj7';
        case 'b#dim':
        case 'cbdim':
          return 'Abmaj7';
        case 'c#dim':
        case 'dbdim':
          return 'Bbmaj7';
        case 'd#dim':
        case 'ebdim':
          return 'C#maj7';
        case 'f#dim':
        case 'gbdim':
          return 'Dmaj7';
        case 'g#dim':
        case 'abdim':
          return 'Emaj7';
  
        default:
          return 'Unknown chord';
      }
    }
  }
  