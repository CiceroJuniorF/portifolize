import { Injectable} from '@angular/core';

import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  /**
   * @param _http Injeção para consumir serviços.
   */
  constructor(private _http:HttpClient) { }

  //TODO: Criar método genérico para chamadas no serviço.
  public example(): Observable<any> {
    const observableResponse = Observable.create(observable=>{
      this._http.get('http://localhost:3000/api/hello').subscribe(
        (response:any) =>{
          observable.next(response);
        },
        (error:any)=>{
          observable.error(this.handleError(error));
        }
      )

    })
    return observableResponse;        
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json() || 'Server error');
  }
}
