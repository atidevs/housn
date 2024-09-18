import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(
      (housingLocation) => {
        this.housingLocation = housingLocation;
        console.log(housingLocation);
      }
    );
  }

  ngAfterViewInit() {
    console.log("property housingLocation: " + this.housingLocation);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}
