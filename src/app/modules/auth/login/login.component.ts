import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: any;

  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private msg: MessageGlobalService
  ) {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          this.authService.setCurrentUser(res.data);
          
        },
        error: (res) => {
          console.log(res);
          this.msg.error(res.error.msg);
          
        },
      });
    }
  }

  googleAuth() {}
}
