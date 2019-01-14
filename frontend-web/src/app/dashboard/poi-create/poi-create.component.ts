import { Component, OnInit } from '@angular/core';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.scss']
})
export class PoiCreateComponent implements OnInit {

  poi: OnePoiResponse;
  coverImage: string;

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
      console.log(p);
      this.coverImage = p.coverImage;
      console.log(this.coverImage);
      
    });
  }

}
