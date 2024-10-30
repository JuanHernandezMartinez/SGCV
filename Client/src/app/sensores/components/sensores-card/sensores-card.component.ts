import { MatCardLgImage, MatCardModule } from '@angular/material/card';
import { Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SensoresSocketService } from '../../services/sensores-socket.service';

@Component({
  selector: 'app-sensores-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './sensores-card.component.html',
  styleUrl: './sensores-card.component.css'
})
export class SensoresCardComponent implements OnInit, OnDestroy {

  @Input() public sensor: any;
  @ViewChild('hiddenInput') hiddenInput: any;
  private sensoresSocket = inject(SensoresSocketService)
  public selectedImage: string | null = null;

  ngOnInit(): void {
    this.sensoresSocket.subscribeMonitoring((message: any) => {
      console.log(message)
    })
  }

  // Este método será llamado cuando el usuario haga clic en la imagen
  triggerInput() {
    this.hiddenInput.nativeElement.click();  // Simulamos un click en el input
  }

  public handleFileInput(event: any) {
    const files: FileList = event.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy(): void {
    this.sensoresSocket.disconnect()
  }
}