import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';

@Component({
  selector: 'app-login-microsoft',
  imports: [],
  templateUrl: './login-microsoft.component.html',
  styleUrl: './login-microsoft.component.scss',
  host: {
    '[class.disabled]': 'disabled()',
  },
})
export class LoginMicrosoftComponent {
  readonly disabled = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });
}
