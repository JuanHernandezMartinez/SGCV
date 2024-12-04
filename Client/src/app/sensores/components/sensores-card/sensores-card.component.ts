import { MatCardModule } from '@angular/material/card';
import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SensoresService } from '../../services/sensores.service';
import { Sensor } from '../../models/Sensor';


@Component({
  selector: 'app-sensores-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './sensores-card.component.html',
  styleUrl: './sensores-card.component.css',
})
export class SensoresCardComponent implements OnInit, OnDestroy {
  @Input() public data: any;
  @ViewChild('hiddenInput') hiddenInput: any;
  public selectedImage: string | null = null;
  private sensoresService = inject(SensoresService);
  public sensor: Sensor = new Sensor();

  ngOnInit(): void {
    if (this.data) {
      this.sensoresService
        .obtenerSensorPorBasicName(this.data.basicName)
        .subscribe((data) => {
          console.log(data);
          this.sensor = data.sensor;
        });
    }
  }

  triggerInput() {
    this.hiddenInput.nativeElement.click();
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
  ngOnDestroy(): void {}
}
