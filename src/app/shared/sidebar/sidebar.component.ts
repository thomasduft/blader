import { Component } from '@angular/core';

@Component({
  selector: 'tw-sidebar',
  host: { 'class': 'sidebar' },
  template: `
   <div class="sidebar-header">
     <a routerLink="/home" i18n>Blader</a>
   </div>
   <div class="sidebar-content">
     <ul class="sidebar-nav">
       <li routerLinkActive="active"><a routerLink="/home">Home</a></li>
       <li routerLinkActive="active"><a routerLink="/list">List</a></li>
       <li routerLinkActive="active"><a routerLink="/detail">Detail</a></li>
       <li routerLinkActive="active"><a routerLink="/host">Host</a></li>
     </ul>
   </div>
   <div class="sidebar-footer">Sidebar Footer</div>`
})
export class SidebarComponent {
}
