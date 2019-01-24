import { Injectable} from '@angular/core';

import { Observable, observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Param } from '../../../environments/configs.enum';



@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private services = environment.services;

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
          observable.error(error);
        }
      )

    })
    return observableResponse;        
  }

  /**
   * Irá realizar as chamadas no serviço.
   * @param servico Serviço a ser chamado
   * @param metodo Metodo do serviço chamado
   * @param params? Parametros a ser inviado
   */
  public execute(servico:string, metodo:string, params?:any): Observable<any>{
    
    let servicoInfo  = this.services[servico];
    let metodoInfo = servicoInfo.metodos[metodo];

    let url = environment.url + '/' +servico + '/' + metodoInfo.path;
    //Pega os parametros
    let httpParams = new HttpParams();
    
    if(params != null){
      Object.keys(params).forEach(element => {
        httpParams.append(element, params[element]);
      });
    }

    //Monta os parametros para o request
    let httpRequest:HttpRequest<any> = null;
    //Monta a chamada
    if(metodoInfo.params === Param.QUERYSTRING){
      httpRequest = new HttpRequest<any>(metodoInfo.action.valueOf(), url, {params:httpParams});
    }else{
      httpRequest = new HttpRequest<any>(metodoInfo.action.valueOf(), 
      url, 
      params);
    }


    //Realiza a chamada e monta o response 
   const observableResponse = Observable.create(observable=>{
      this._http.request(httpRequest).subscribe(
        (response:any) =>{
          observable.next(response.body);
        },
        (error:any)=>{
          console.error('Error in request-> '+ error);
          observable.error(error);
        }
      )

    })
    return observableResponse;     
  }

}
