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

  constructor(private userService: UsersService) {}

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
}
