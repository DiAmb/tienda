import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  imgParent = '';
  token = '';
  img = '';

  constructor(
    private userService: UsersService
  ) // private filesServer: FilesService
  {}

  onLoaded(img: string) {
    console.log('Padre log', img);
  }
  showImg = true;
  toggleImg() {
    this.showImg = !this.showImg;
  }
  createUser() {
    this.userService
      .create({ name: 'DiegoR', email: 'Diego@gmail.com', password: '666' })
      .subscribe((rta) => {
        console.log(rta);
      });
  }
  // downloadPdf() {
  //   this.filesServer
  //     .getFile(
  //       'DiegoPDF.pdf',
  //       'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
  //       'application/pdf'
  //     )
  //     .subscribe();
  // }
  // onUpload(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0);
  //   if (file) {
  //     this.filesServer.uploadFile(file).subscribe((rta) => {
  //       this.img = rta.location;
  //     });
  //   }
  // }
}
