import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {
  level = 0;
  nextPage = MenuListPage;


  constructor() { }

  ngOnInit() {
  }

}
