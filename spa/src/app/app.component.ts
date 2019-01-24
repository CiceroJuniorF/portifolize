import { Component } from '@angular/core';
import { ConsumerService } from './comum/consumer/consumer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title;
  constructor(private _service:ConsumerService){

  }
  ngOnInit(){
    this._service.execute('hello','init').subscribe( (response:any)=>{
      if(response != null){
        this.title= response.init;
      }        
    });
  }
  
}
