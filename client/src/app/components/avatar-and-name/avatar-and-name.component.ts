import { Component, computed, input } from '@angular/core';

function getRandomHashForColor(input: string): number {
  let hash = 5381; // initial seed value
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) ^ input.charCodeAt(i);
  }
  return Math.abs(hash) % 7;
}

@Component({
  selector: 'app-avatar-and-name',
  imports: [],
  templateUrl: './avatar-and-name.component.html',
  styleUrl: './avatar-and-name.component.scss',
})
export class AvatarAndNameComponent {
  readonly imageData = input<string | null>(null);

  readonly name = input.required<string>();

  readonly initials = computed<string>(() => this.name().charAt(0).toUpperCase());
  readonly avatarColorClass = computed<string>(() => `avatar-color-${getRandomHashForColor(this.name())}` );
}
