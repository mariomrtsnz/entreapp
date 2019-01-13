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

  poi: OnePoiResponse;
  coverImage: string;
  images = ['https://bit.ly/2AHGQIw', 'https://bit.ly/2QCBEuO', 'https://on.natgeo.com/2TOioMO'];


  constructor(private poiService: PoiService, public router: Router) { }

  ngOnInit() {
    if (this.poiService.selectedPoi == null) {
      this.router.navigate(['home']);
    } else {
      this.getData();
    }
  }

  getData() {
    this.poiService.getOne(this.poiService.selectedPoi.id).toPromise()
    .then(p => {
      this.poi = p;
      this.coverImage = p.coverImage;
    }).then(()=>console.log(this.poi));
  }


}
