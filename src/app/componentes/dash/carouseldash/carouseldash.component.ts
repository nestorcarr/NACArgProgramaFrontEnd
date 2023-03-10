
import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner';
import { AuthService } from 'src/app/service/auth.service';
import { BannerService } from 'src/app/service/banner.service';
import { TokenService } from 'src/app/service/token.service';

//Importo el servicio
//import { InfoService } from '../../../service/info/info.service';

@Component({
  selector: 'app-carouseldash',
  templateUrl: './carouseldash.component.html',
  styleUrls: ['./carouseldash.component.css']
})
export class CarouseldashComponent implements OnInit {
//Inicializo y Creo la variable de instancia para almacenar los datos que trata el servicio
//carousel: any=[];
carousel: Banner[] = [];//any=[];

banner : Banner = {
  id: 0,
  carouselimag: "",
  carouselimage: "",
  carouselimagen: "",
  imageprincipal: ""
 };
 admin : boolean = false;

 constructor(
    //private infoService: InfoService
    private sBanner:BannerService,
    private tokenService: TokenService,
    private authService : AuthService
  ) { 
    this.authService.admin.subscribe(data =>{
      this.admin = data;
    })
  }

  IsLogged = false;

  ngOnInit() {
    //Esto es para almacenar en la variable de instancia los datos recuperados por el servicio?
    this.cargarBanner();
    if(this.tokenService.getToken()){
      this.IsLogged = true;
    }else{
      this.IsLogged = false;
    }
  }
  ngOnChanges() : void {
    this.cargarBanner();
  }
  cargarBanner():void {
    this.sBanner.lista().subscribe(bd => {
      this.carousel = bd
  });
  }
  actualizarComponente(event : Event){
    this.cargarBanner();
  }


  actualizarVariable(ban: Banner): void{
    this.banner =  ban;
  }

  delete(id: number){
    if(id != undefined){
      this.sBanner.delete(id).subscribe(
        bd => {
        //alerta que la Persona ha sido eliminada
        alert("Persona eliminada");
        this.cargarBanner();
    })
  }
  }

}
/*
, err =>{
      alert("No se pudo eliminar la persona");
    }
*/
