import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('servicio listo');
  }
  
  // getNewReleases(){

  //   const headers = new  HttpHeaders({
  //     'Authorization': 'Bearer BQADGNd666Kd_4bOAKCTn9NCSyBRXAopyPDdetl5rbrv8Xcc3MZnIXL0o_3skVgRccMnKiU0rVibF3oRj28'
  //   });

  //   return this.http.get('https://api.spotify.com/v1/browse/new-releases',{ headers }); //.subscribe( data =>{
  //   //   console.log(data)
  //   // });
  // }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDUvGqm4t1pe0OXeyl4FtkqF2nk3P1An0dQYvOf9KrJ4WnqaPsNdlCutASHJrh8QE8X3y8b8ObBMywYnQU'
    });

    return this.http.get(url, { headers });

  }


  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( (data:any) => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( (data:any) => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( (data:any) => data['tracks']));

  }


}
