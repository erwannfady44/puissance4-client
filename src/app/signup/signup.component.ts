import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../services/user.service';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router,
              private toastr: ToastrService,
              public auth: UserService,
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
      await this.auth.signUp(this.form.value.pseudo, this.form.value.mdp);
      this.toastr.success('Bienvenue ' + this.form.value.pseudo + ' !', 'Inscription réussie');
      this.router.navigate([''])
    } catch (error:any) {
      this.toastr.error(error, 'Erreur');
    }
  }
}
