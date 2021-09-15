import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Building } from '../../data_model/building';
import { DirectoryService } from '../../services/directory.service';

interface Card {
  title: string;
  cols: number;
  rows: number;
  data: Building;
}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
})
export class DirectoryComponent implements OnInit {
  cards: Card[] = [];
  searchText: string = '';

  getDirectory(): void {
    this.directoryService.getBuildings().subscribe((buildings) => {
      this.cards = buildings.map((building) => {
        if (!building.Name) {
          building.Name = building.Address.split(',')[0];
        }
        return { title: building.Name, cols: 1, rows: 1, data: building };
      });
    });
  }

  onSearchChange(): void {}

  ngOnInit(): void {
    this.getDirectory();
  }

  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private directoryService: DirectoryService
  ) {}
}
