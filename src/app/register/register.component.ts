import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form1!:FormGroup;
  form2!:FormGroup;
 fb=inject(FormBuilder);
  http=inject(HttpClient);
  router=inject(Router);
  auth=inject(AngularFireAuth);
ngOnInit(): void {

  this.form1=this.fb.nonNullable.group({
    email:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required],
  });
  this.form2=this.fb.nonNullable.group({
    email:['',Validators.required],
    password:['',Validators.required],
  });
}

 
  onlogin(){
    const { email, password } = this.form2.value;
    this.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log('hello', response.user?.uid);
            let user = response.user?.uid;
            if (user) {
                localStorage.setItem('users', user);
                this.router.navigateByUrl('/userdetails');
            } else {
                // Handle the case where user is undefined
            }
        })
     .catch(()=>{
     })  ;
  }
}
