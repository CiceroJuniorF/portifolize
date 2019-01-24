import { Component } from '@angular/core';
import { ConsumerService } from './consumer.service';

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
    this._service.example().subscribe( (response:any)=>{
      if(response != null)
        this.title= response.init;
    });
  }
  
}
