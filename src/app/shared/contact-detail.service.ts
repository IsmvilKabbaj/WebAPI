import { Injectable } from '@angular/core';
import { ContactDetail } from './contact-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactDetailService {

  formData : ContactDetail;
  readonly rootURL = 'http://localhost:53022/api'; //URL de l'API qui gère la base de donnée
  readonly apiGouvURL = 'https://geo.api.gouv.fr/communes?codePostal='; //URL de l'API Gouv
  list : ContactDetail[];

  constructor(private http:HttpClient) { }

  // FONCTION POST 
  postContactDetail(){
    return this.http.post(this.rootURL+'/ContactDetails', this.formData)
  }

  // FONCTION PUT
  putContactDetail(){
    return this.http.put(this.rootURL+'/ContactDetails/'+this.formData.id, this.formData)
  }

  // FONCTION DELETE
  deleteContactDetail(id){
    return this.http.delete(this.rootURL+'/ContactDetails/'+id)
  }

  // FONCTION GET permettant de mettre à jour un contact existant 
  refreshList(){
    this.http.get(this.rootURL+'/ContactDetails')
    .toPromise()
    .then(res => this.list = res as ContactDetail[])
  }

  // FONCTION GET POSTAL CODE 
  // Appel de l'API GOUV permettant de récupérer la ville à travers un code postal
  getCityByPostalCode(code){
     return this.http.get(this.apiGouvURL+code) 
  }


}
 