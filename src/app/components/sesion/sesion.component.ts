import { Component, OnInit, TemplateRef } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DBConectionService } from 'src/app/services/dbconection.service';
import { ServiceModel } from 'src/app/models/serviceModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  bsModalRef: BsModalRef = new BsModalRef()
  datatable: any = []
//  datafalla: string = ""
  serviceModel: ServiceModel = new ServiceModel()
totalparo:number=0;

  constructor(_CargarScriptsService: CargarScriptsService, public route: ActivatedRoute, private router: Router, private dBConectionService: DBConectionService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.onDataTable();
    //this.serviceModel
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSM(id)
            .subscribe({
              next: response => {
                this.datatable = response;


              }
            });
        }
      }

    })



  }
  onSetData(select: any) {

    this.serviceModel.idSolicitud =select.idSolicitud
    this.serviceModel.nombreSolicitante =select.nombreSolicitante
    this.serviceModel.correo =select.correo
    this.serviceModel.fechaSolicitud=select.fechaSolicitud
    this.serviceModel.horaSolicitud =select.horaSolicitud
    this.serviceModel.area =select.area
    this.serviceModel.maquina =select.maquina
    this.serviceModel.dispositivo=select.dispositivo
    this.serviceModel.descripcionProblema =select.descripcionProblema
    this.serviceModel.nomina =select.nomina
    this.serviceModel.nombre =select.nombre
    this.serviceModel.fechaInicio=select.fechaInicio
    this.serviceModel.horaInicio =select.horaInicio
    this.serviceModel.diagnostico=select.diagnostico
    this.serviceModel.tipoFalla=select.tipoFalla
    this.serviceModel.emailSent =select.emailSent
    this.serviceModel.generoParo =select.generoParo
    this.serviceModel.paroCorrectivo=select.paroCorrectivo
    this.serviceModel.paroOperativo =select.paroOperativo
    this.serviceModel.paroRefaccion =select.paroRefaccion
    this.serviceModel.tiempoTotal =select.tiempoTotal
    this.serviceModel.grasaUtilizada=select.grasaUtilizada
    this.serviceModel.refaMateHerra =select.refaMateHerra
    this.serviceModel.fechaFinal =select.fechaFinal
    this.serviceModel.horaFinal =select.horaFinal
    this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
    this.serviceModel.estatusActividad =select.estatusActividad
    this.serviceModel.firmaSolicitante =select.firmaSolicitante
    this.serviceModel.emailSent2=select.emailSent2
    }
  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template)
  }
  openModal2(template2: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template2)
  }
  openModal3(template3: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template3)
  }
  saveSomeThing() {

    this.bsModalRef.hide()
  }

  onDataTable() {
    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;

    });
  }




onUpdateRevision(serviceModel: ServiceModel): void {

    serviceModel.emailSent2='true'

    if ((document.getElementById('flexRadioDefault2') as HTMLInputElement).checked === true) {
      serviceModel.trabajoSanitizado = 'Si' }
      else{
        if ((document.getElementById('flexRadioDefault1') as HTMLInputElement).checked === true) {
          serviceModel.trabajoSanitizado = 'No' }
      }
      serviceModel.estatusActividad = (document.getElementById('first-select') as HTMLInputElement).value
    this.dBConectionService.addRevision(serviceModel.idSolicitud, serviceModel)
  .subscribe((res) => {
    if (res) {
      alert('exito')
    } else {
      alert('Error! :(')
    }
  })



}




  onUpdateSalida(serviceModel: ServiceModel): void {
    let datafalla= "";

    if ((document.getElementById('FE') as HTMLInputElement).checked === true) {

      datafalla= datafalla+' Falla eléctrica -'
      //serviceModel.tipoFalla = 'Falla eléctrica'
    }

        if ((document.getElementById('FM') as HTMLInputElement).checked === true) {
          datafalla= datafalla+' Falla mecánica -'
          //serviceModel.tipoFalla = 'Falla mecánica'
         }

            if ((document.getElementById('FN') as HTMLInputElement).checked === true) {
              datafalla= datafalla+' Falla Neumática -'
             // serviceModel.tipoFalla = 'Falla Neumática'
             }

                if ((document.getElementById('FH') as HTMLInputElement).checked === true) {
                  datafalla= datafalla+' Falla Hidráulica -'
                  //serviceModel.tipoFalla = 'Falla de energía eléctrica CFE'
                }

                    if ((document.getElementById('CFE') as HTMLInputElement).checked === true) {
                      datafalla= datafalla+' Falla de energía eléctrica CFE -'
                      //serviceModel.tipoFalla = ' Falla de energía eléctrica CFE'
                    }

              serviceModel.tipoFalla=datafalla



  this.dBConectionService.addDiagnostico(serviceModel.idSolicitud, serviceModel)
    .subscribe((res) => {
      if (res) {
        alert('exito')
      } else {
        alert('Error! :(')
      }
    })

}




onUpdateSalida3(serviceModel: ServiceModel): void {
  if ((document.getElementById('flexRadioDefault1') as HTMLInputElement).checked === true) {
    serviceModel.generoParo = 'Si' }
    else{
      if ((document.getElementById('flexRadioDefault2') as HTMLInputElement).checked === true) {
        serviceModel.generoParo = 'No' }
    }


//
let datagrasa= "";

    if ((document.getElementById('FE') as HTMLInputElement).checked === true) {

      datagrasa= datagrasa+' GRASA EP2 -'
      //serviceModel.tipoFalla = 'Falla eléctrica'
    }

        if ((document.getElementById('FM') as HTMLInputElement).checked === true) {
          datagrasa= datagrasa+' GRASA XHP 222 -'
          //serviceModel.tipoFalla = 'Falla mecánica'
         }

            if ((document.getElementById('FN') as HTMLInputElement).checked === true) {
              datagrasa= datagrasa+' GRASA  SHC 220 -'
             // serviceModel.tipoFalla = 'Falla Neumática'
             }

                if ((document.getElementById('FH') as HTMLInputElement).checked === true) {
                  datagrasa= datagrasa+' GRASA LIQUIDA WURTH HHS 2000 -'
                  //serviceModel.tipoFalla = 'Falla de energía eléctrica CFE'
                }

                    if ((document.getElementById('CFE') as HTMLInputElement).checked === true) {
                      datagrasa= datagrasa+' GRASA MOLYKOTE SEPARATOR SPRAY OIL -'
                      //serviceModel.tipoFalla = ' Falla de energía eléctrica CFE'
                    }
                    if ((document.getElementById('462') as HTMLInputElement).checked === true) {
                      datagrasa= datagrasa+' GRASA MOBIL SHC POLYREX 462 -'
                      //serviceModel.tipoFalla = ' Falla de energía eléctrica CFE'
                    }
                    if ((document.getElementById('68') as HTMLInputElement).checked === true) {
                      datagrasa= datagrasa+' ACEITE MOBIL SHC CIBUS 68 -'
                      //serviceModel.tipoFalla = ' Falla de energía eléctrica CFE'
                    }

              serviceModel.grasaUtilizada=datagrasa



//






  let total:Number=serviceModel.paroCorrectivo+serviceModel.paroOperativo+serviceModel.paroRefaccion
  this.serviceModel.tiempoTotal=total.toString()
  //this.serviceModel.emailSent='true'
  console.log(this.serviceModel.tiempoTotal,'tota',total)
  this.serviceModel.refaMateHerra=(document.getElementById('exampleFormControlTextarea1') as HTMLInputElement).value
  console.log(this.serviceModel.refaMateHerra,'refa')
  this.dBConectionService.addTareas(serviceModel.idSolicitud, serviceModel)
    .subscribe((res) => {
      if (res) {
        alert('exito')
      } else {
        alert('Error! :(')
      }
    })



}


}
