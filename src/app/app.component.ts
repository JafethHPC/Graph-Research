import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkDiagramComponent } from './network-diagram/network-diagram.component';
import { NetworkDiagram2Component } from './network-diagram2/network-diagram2.component';
import { WorldMapComponent } from './world-map/world-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NetworkDiagramComponent,
    NetworkDiagram2Component,
    WorldMapComponent,
  ],
  template: `
    <div class="container">
      <h1>Network Diagrams</h1>
      <div class="tabs">
        <button
          [class.active]="activeTab === 'diagram1'"
          (click)="setActiveTab('diagram1')"
        >
          Diagram 1
        </button>
        <button
          [class.active]="activeTab === 'diagram2'"
          (click)="setActiveTab('diagram2')"
        >
          Diagram 2
        </button>
        <button
          [class.active]="activeTab === 'worldMap'"
          (click)="setActiveTab('worldMap')"
        >
          World Map
        </button>
      </div>
      <div class="tab-content">
        <app-network-diagram
          *ngIf="activeTab === 'diagram1'"
        ></app-network-diagram>
        <app-network-diagram2
          *ngIf="activeTab === 'diagram2'"
        ></app-network-diagram2>
        <app-world-map *ngIf="activeTab === 'worldMap'"></app-world-map>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        text-align: center;
      }
      .tabs {
        margin-bottom: 20px;
      }
      .tabs button {
        padding: 10px 20px;
        margin: 0 5px;
        border: none;
        background-color: #f0f0f0;
        cursor: pointer;
        font-size: 16px;
      }
      .tabs button.active {
        background-color: #1976d2;
        color: white;
      }
      .tab-content {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  activeTab: string = 'diagram1';

  setActiveTab(tab: string) {
    console.log('Switching to tab:', tab);
    this.activeTab = tab;
  }
}
