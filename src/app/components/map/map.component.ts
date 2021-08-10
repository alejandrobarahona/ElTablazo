import { Component, OnInit } from '@angular/core';
import { WayPoint } from 'src/app/classes/wayPoint';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: []
})
export class MapComponent implements OnInit {

  modeInput = '';
  showError = false;
  messageError = '';
  wayPoints: WayPoint = { start:null, end: null };

  constructor(private mapService :MapService) {}

  ngOnInit(): void {
    try {
      this.mapService.buildMap()
      .then(({map}) => {
        console.log('*** TODO BIEN ***', map);
      })
      .catch( (err) => {
        console.error('****** ERROR ******', err);
      });
    } catch (err) {
      
    }
  }

  drawRoute(): void{
    if(this.wayPoints.start != null && this.wayPoints.end != null)
    {
      const coords = [
        this.wayPoints.start.center,
        this.wayPoints.end.center
      ];
      this.mapService.loadCoords(coords);
    }
    else{
      this.showError = true;
      this.messageError = 'Necesitamos ambas direcciones';
    }
  }

  selectRouteInit($event){
    this.wayPoints.start = {};
    if($event != '-1')
    {
      let center = [];
      center = JSON.parse($event);
      this.wayPoints.start.center = [];
      this.wayPoints.start.center = center;
      this.mapService.addMarkerInitPoint(center);
    }
  }

  selectRouteEnd($event){
    this.wayPoints.end = {};    
    if($event != '-1')
    {
      let center = {};
      center = JSON.parse($event);
      this.wayPoints.end.center = [];
      this.wayPoints.end.center = center;
      this.mapService.addMarkerEndPoint(center);
    }
  }

}
