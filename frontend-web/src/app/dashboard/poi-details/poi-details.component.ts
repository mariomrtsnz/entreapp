import { Component, OnInit } from '@angular/core';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent implements OnInit {

  private poi: OnePoiResponse;

  constructor(private poiService: PoiService, public router: Router) { }

  ngOnInit() {
    if (this.poiService.selectedPoi == null) {
      this.router.navigate(['home']);
    } else {
      this.poi = this.poiService.selectedPoi;
      console.log(this.poi);
      
    }
 }

}
