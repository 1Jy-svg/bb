import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { IUser } from '../core/models/common.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

interface Order {
  orderId: string;
  sender: {
      name: string;
      address: string;
      pincode: string;
      email: string;
      contact: string;
  };
  receiver: {
      name: string;
      address: string;
      pincode: string;
      email: string;
      contact: string;
  };
}
@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnDestroy{
  data: any;
  private subscription: Subscription;
dataService=inject(DataService);
  constructor() {
    this.subscription = this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  orders: Order[] = [
    { 
        orderId: '123456',
        sender: {
            name: 'John Doe',
            address: '123 Main St',
            pincode: '123456',
            email: 'john@example.com',
            contact: '123-456-7890'
        },
        receiver: {
            name: 'Jane Doe',
            address: '456 Oak St',
            pincode: '654321',
            email: 'jane@example.com',
            contact: '987-654-3210'
        }
    },
    { 
        orderId: '789012',
        sender: {
            name: 'Alice Smith',
            address: '789 Elm St',
            pincode: '456789',
            email: 'alice@example.com',
            contact: '456-789-1234'
        },
        receiver: {
            name: 'Bob Smith',
            address: '321 Maple St',
            pincode: '987654',
            email: 'bob@example.com',
            contact: '654-321-0987'
        }
    },
    // Add more orders as needed
];
}
  

