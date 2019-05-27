import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'https://localhost:5001/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}