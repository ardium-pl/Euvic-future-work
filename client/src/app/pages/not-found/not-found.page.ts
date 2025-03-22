import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArdiumButtonModule } from '@ardium-ui/ui';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [ArdiumButtonModule],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
})
export class NotFoundPage {
  readonly authService = inject(AuthService);
  private readonly _router = inject(Router);

  onClick() {
    this._router.navigateByUrl('/admin/recruiter');
  }
}
