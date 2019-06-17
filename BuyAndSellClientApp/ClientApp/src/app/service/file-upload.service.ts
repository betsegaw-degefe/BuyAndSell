import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private actionUrl: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'upload/';
  }

  upload(file: any) {
    let input = new FormData();
    input.append("filesData", file);
    //console.log(input.getAll);
    return this.http.post(this.actionUrl, input)
      .pipe(map(res => console.log(res)));
  }
}
