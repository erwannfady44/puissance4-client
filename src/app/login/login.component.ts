import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private router: Router,
              private toastr: ToastrService,
              private auth: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pseudo: [null, Validators.required],
      mdp: [null, Validators.required],
    });
  }

  async onSubmit() {
    try {
      await this.auth.login(this.form.value.pseudo, this.form.value.mdp);
      this.toastr.success('Bienvenue ' + this.form.value.pseudo + ' !', 'Inscription réussie');
      this.router.navigate([''])
    } catch (e:any) {
      this.toastr.error(e.message, 'Erreur');
    }
  }
}
