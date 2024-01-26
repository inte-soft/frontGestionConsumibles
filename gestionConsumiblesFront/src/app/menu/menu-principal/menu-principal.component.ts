import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit{
  axiosService: AxiosService;

  constructor(private router: Router, axiosService: AxiosService) { 
    this.axiosService = axiosService;

  }

  ngOnInit(){
  }

  
}
