import { AutenticacionService } from './../../servicios/autenticacion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @ViewChild('navbarHeader', { static: true }) navbarHeader;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public autenticacionService: AutenticacionService) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      // Agregams handler para ocultar la navbar al momento de cambiar la ruta
      // this.navbarHeader.nativeElement.classList.remove('show');
    });
  }

  ngOnInit() { }

  onLogout() {
    this.autenticacionService.logout();
  }

}
