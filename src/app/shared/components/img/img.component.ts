import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
// implements OnChanges, OnInit, AfterViewInit, OnDestroy
export class ImgComponent {
  img = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    //console.log('Cambio imagen', this.img);
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/img/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    //antes de renderizar
    //console.log('constructor ', 'imgValue => ', this.img);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   //ACTUALIZA LOS INPUTS
  //   //console.log('ONCHANGE ', 'imgValue => ', this.img);
  //   //console.log('changes', changes);
  // }
  // ngOnInit(): void {
  //   //ANTES DE RENDERIZAR
  //   //FETCH APIS PROMESAS -SOLO UNA VEZ
  //   // this.counterFn=window.setInterval(()=>{
  //   //   this.counter += 1;
  //   //   console.log('Un segundo contador')
  //   // },1000)
  //   // console.log('NGONINIT ', 'imgValue => ', this.img);
  // }
  // ngAfterViewInit(): void {
  //   //DESPUES DE QUE TODO SE RENDERIZA
  //   //LOS HIJOS
  //   //console.log('NGAFTERVIEWINIT ');
  // }
  // ngOnDestroy() {
  //   //DELETE
  //   //console.log('ngOnDestroy ');
  //   // window.clearInterval(this.counterFn);
  // }

  imgError() {
    this.img = this.imageDefault;
  }
  imgLoaded() {
    //console.log('loaded');
    this.loaded.emit(this.img);
  }
}
