import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@services/auth.service';
import { AvatarAndNameComponent } from '../avatar-and-name/avatar-and-name.component';

@Component({
  selector: 'app-header',
  imports: [AvatarAndNameComponent, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
}
