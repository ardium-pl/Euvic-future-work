import { Component, inject } from '@angular/core';
import { ArdiumSpinnerModule } from '@ardium-ui/ui';
import { AuthService } from '@services/auth.service';
import { LoginMicrosoftComponent } from '../../components/login-microsoft/login-microsoft.component';

@Component({
  selector: 'app-login',
  imports: [LoginMicrosoftComponent, ArdiumSpinnerModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  readonly authService = inject(AuthService);
}
