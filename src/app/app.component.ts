import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  imgParent = '';
  token = '';
  img = '';

  constructor(
    private userService: UsersService, // private filesServer: FilesService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('Padre log', img);
  }
  showImg = true;
  toggleImg() {
    this.showImg = !this.showImg;
  }
  createUser() {
    this.userService
      .create({
        name: 'Sebas',
        email: 'Sebas@mail.com',
        password: '1212',
        role: 'customer',
      })
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
