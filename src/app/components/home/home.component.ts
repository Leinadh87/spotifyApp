import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean = false;
  mensajeError: string = '';

  constructor(private spoytiService :SpotifyService) { 
    this.loading = true;
    this.spoytiService.getNewReleases().subscribe( data =>{
      this.loading = false;
      this.nuevasCanciones = data;
    }, ( errorServicio ) => {

      this.loading = false;
      this.error = true;
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;

    });
  }

  ngOnInit(): void {
  }

}
