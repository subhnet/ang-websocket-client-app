import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  name = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    localStorage.setItem('loggedUser', this.name);
    this.router.navigate(['/chat-page']);
  }

}
