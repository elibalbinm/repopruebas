/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}

*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba';

  constructor( private task: TaskService ) {

  }

  ngOnInit(): void {
    console.log('llamada');
    this.task.miLlamada()
    .subscribe(res => {
      console.log('Llamada devuelve:')
      console.log(res);
    }, error => {
      console.log('Llamada error:')
      console.log(error);
    })
  }

}
