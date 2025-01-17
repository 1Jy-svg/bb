import { Component, OnInit } from '@angular/core';
import { IUser } from '../core/models/common.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { TrackComponent } from '../track/track.component';
import { getAuth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{
  
 users: IUser[]=[];

 openModel(){
   const modelDiv=document.getElementById('myModal');
   if(modelDiv!=null){
    modelDiv.style.display='block';
   }
 }
 CloseModel(){
  const modelDiv=document.getElementById('myModal');
  if(modelDiv!=null){
   modelDiv.style.display='none';
  }
  this.router.navigate(['userdetails'])
}

userForm!: FormGroup;
constructor(private fb: FormBuilder,private userServices: UserService,private router: Router,private activatedRoute:ActivatedRoute,private dataService: DataService,private db:AngularFireDatabase){
  let uid=localStorage.getItem('users');
   
  this.userForm = this.fb.group({
    package_id:this.generateGUID(),
    order_id:this.generateorderID(),
    sender_name: new FormControl('',),
    sender_address: new FormControl('',),
    pincode_sender: new FormControl('',),
    sender_email: new FormControl('',),
    sender_contact: new FormControl('',),
    receiver_name: new FormControl('',),
    receiver_address: new FormControl('',),
    pincode_receiver: new FormControl('',),
    receiver_email: new FormControl('',),
    user_uid:uid,
    status:'created',
    trackdetails:{
      booked:true,
      Pickup:false,
      InTransit:false,
      Outfordelivery:false,
      Delivered:false
    },
  });
}

ngOnInit(): void {
  throw new Error('Method not implemented.');
 
}
onSubmit(){
  //if(this.userForm.valid){
    console.log(4)
      this.userServices.addDetail(this.userForm.value);
      
    
    //this.router.navigate(['/admin']);
 // }else{
    //console.log(2)
    //this.userForm.markAllAsTouched();
  //}
}
generateGUID():string {
  const timestamp = new Date().getTime();
  const randnum=Math.floor(Math.random()*10);
  return `PI${timestamp}${randnum}`;
}
generateorderID():string {
  const timestamp = new Date().getTime();
  const randnum=Math.floor(Math.random()*10);
  const dataToSend= `OI${timestamp}${randnum}`;
  this.dataService.setData(dataToSend);
  return dataToSend;
}
logout(){
  /*const auth=getAuth();
  signOut(auth).then(()=>{
    this.router.navigateByUrl('/home');
  }).catch((error)=>{
      console.log('Error occured');
  });*/
}

}