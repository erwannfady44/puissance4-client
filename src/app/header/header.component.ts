import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
    if (!this.userService.user.token) {
      if (sessionStorage.getItem('user')) {
        this.userService.getSessionData()
      }
    }
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['login']);
  }
}
