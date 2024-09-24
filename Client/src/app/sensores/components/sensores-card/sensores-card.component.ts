import { MatCardModule } from '@angular/material/card';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './sensores-card.component.html',
  styleUrl: './sensores-card.component.css'
})
export class SensoresCardComponent {
  @Input() public nombre: String = "juan";
  public selectedImage: string | null = null;

  public handleFileInput(event: any) {
    const files: FileList = event.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}