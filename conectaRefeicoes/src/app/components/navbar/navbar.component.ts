import { Component } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
