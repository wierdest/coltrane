import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { HugoReimann } from '../hugo-reimann';
import { JohnColtrane } from '../john-coltrane';


interface SelectData {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subs',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Radio Buttons to select the harmonic field
  notes: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  selectedNote: string = this.notes[2];
  modes: SelectData[] = [
    {value: 'mode-0', viewValue: 'Major'},
    {value: 'mode-1', viewValue: 'minor'},
  ]
  selectedMode = this.modes[0].value;
  getReimann() : string[] {
    if(this.selectedMode === 'mode-0') {
      return HugoReimann.Major(this.selectedNote);
    } else {
      return HugoReimann.Minor(this.selectedNote);
    }
  }
  reimann = this.getReimann();

  radioAndSelectUpdate() : void {
    this.reimann = this.getReimann();
    this.selectedFunction = this.reimann[0];
    this.coltrane = this.getColtrane();
  }

  selectedFunction = this.reimann[0];

  coltrane = this.getColtrane();

  fabUpdate(index : number) {
    this.selectedFunction = this.reimann[index];
    
  }

  getColtrane() : string[] {
    return JohnColtrane.SubstituteChords(this.reimann);
  }

  // Inject BreakpointObserver to make the UI adaptive
  destroyed = new Subject<void>();
  // store the currentScreensize
  currentScreenSize: string = "";
   // Create a map to store breakpoint names for logging purposes. The displayName is the currentScreenSize
   displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            if(this.currentScreenSize === 'XSmall') {
              this.outerCards = this.OUTER_TOO_NARROW;
              this.innerCards = this.INNER_TOO_NARROW;
            } else if (this.currentScreenSize === 'Small') {
              this.outerCards = this.OUTER_NARROW;
              this.innerCards = this.INNER_NARROW;
            } else {
              this.outerCards = this.OUTER_WIDE;
              this.innerCards = this.INNER_WIDE;
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  // Outer Card List
  outerCards: any[] = [];
  outerCardsTitleList = ['Harmonic Functions', 'I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'];

  private outerGridConfig = {
    wideHeader: { cols: 7, rows: 2 },
    wide: { cols: 1, rows: 1 },
    narrowHeader: { cols: 5, rows: 4},
    narrow: { cols: 2 , rows: 1 },
    tooNarrowHeader: { cols: 3, rows: 2 },
    tooNarrow: { cols: 2, rows: 1 }
  }
  private buildOuterGridList(config: any, titleList: string[], type: string): any[] {
    return titleList.map(title => {
      if (title === 'Harmonic Functions') {
        return { title, ...this.getOuterGridTileHeaderType(type)} ;
      } else {
        return { title, ...this.getOuterGridConfigType(type) };
      }
    });
  }
  private getOuterGridTileHeaderType(type: string) : any {
    if(type === 'wide') {
      return this.outerGridConfig.wideHeader;
    } else if (type === 'narrow') {
      return this.outerGridConfig.narrowHeader;
    } else {
      return this.outerGridConfig.tooNarrowHeader;
    }
  }
  private getOuterGridConfigType(type: string) : any {
    if(type === 'wide') {
      return this.outerGridConfig.wide;
    } else if (type === 'narrow') {
      return this.outerGridConfig.narrow;
    } else {
      return this.outerGridConfig.tooNarrow;
    }
  }

  private OUTER_WIDE = this.buildOuterGridList(this.outerGridConfig, this.outerCardsTitleList, 'wide');

  private OUTER_NARROW = this.buildOuterGridList(this.outerGridConfig, this.outerCardsTitleList, 'narrow');

  private OUTER_TOO_NARROW = this.buildOuterGridList(this.outerGridConfig, this.outerCardsTitleList, 'tooNarrow');

  // Inner Card List inside first Outer Card 
  innerCards: any[] = [];
  private innerCardsTitleList = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading'];
  private innerGridConfig = {
    wide: { cols: 1, rows: 2 },
    narrow: { cols: 2 , rows: 1 },
    tooNarrow: { cols: 7, rows: 1 }
  }
  private buildInnerGridList(config: any, titleList: string[]) : any[] {
    return titleList.map(title => ({ title, ...config, }));
  }
  private INNER_WIDE = this.buildInnerGridList(this.innerGridConfig.wide, this.innerCardsTitleList);

  private INNER_NARROW = this.buildInnerGridList(this.innerGridConfig.narrow, this.innerCardsTitleList);

  private INNER_TOO_NARROW = this.buildInnerGridList(this.innerGridConfig.tooNarrow, [this.innerCardsTitleList[0]]);
  

  drop(event: CdkDragDrop<any[]>): void {
    // Handle the drop event with the array of cards
    // You can access the dropped cards using cardsArray
    const draggedData = event.item.data;
    // Identify the element using the data
    if (draggedData === this.outerCardsTitleList[0]) {
      // Handle the special case when dragging the first card
      if(event.previousIndex === 0) {
        moveItemInArray(this.outerCards, event.previousIndex, this.outerCards.length - 1)
      } else {
        moveItemInArray(this.outerCards, event.previousIndex, 0);
      }
    }
  }
  
}
