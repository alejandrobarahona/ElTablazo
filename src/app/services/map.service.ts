import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  profile = 'mapbox/walking';

  wayPoints: Array<any> = [];

  markerInit: any = null;
  markerEnd: any = null;

  constructor(private httpClient: HttpClient) { 
    this.mapbox.accessToken = environment.mapPk;
  }

  buildMap(): Promise<any>{
    /**
     * Aqui construimos el mapa
     */
    return new Promise( (resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container : 'map',
          style : this.style,
          zoom : environment.zoom,
          center : [environment.lng, environment.lat]
        });

        // Añadir controles de navegacion del mapa
        // this.map.addControl(new mapboxgl.NavigationControl());

        resolve({
          map: this.map
        });

      } catch (err) {
        reject(err)
      }
    });
  }


  loadCoords(coords): void{
    try {
      const url=[
        `https://api.mapbox.com/directions/v5/`,
        `${this.profile}/`,
        `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
        `?steps=true&geometries=geojson&access_token=${environment.mapPk}`
      ].join('');
  
      this.httpClient.get(url).subscribe((res: any) => {
        const data = res.routes[0];
        const route = data.geometry.coordinates;
        
        if(this.map.getLayer('route'))
        {
          this.map.removeLayer('route');
          this.map.removeSource('route');
        }
        this.map.addSource('route', {
          type:'geojson',
          data : {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        });
  
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'red',
            'line-width': 5
          }
        });
  
        this.wayPoints = route;
  
        this.map.fitBounds([route[0], route[route.length - 1]], {
          padding: 100
        });
      });
    } catch (err) {
      console.error('Error consultando la ruta', err);
    }
  }


  addMarkerInitPoint(coords): void{
    const el = document.createElement('div');
    el.className = 'markerPoint';
    if(!this.markerInit){
      this.markerInit = new mapboxgl.Marker(el);
      this.markerInit.setLngLat(coords).addTo(this.map);
    }
    else{
      this.markerInit.setLngLat(coords).addTo(this.map);
    }
    this.map.setCenter(coords);
  }

  addMarkerEndPoint(coords): void{
    const el = document.createElement('div');
    el.className = 'markerPoint';
    if(!this.markerEnd){
      this.markerEnd = new mapboxgl.Marker(el);
      this.markerEnd.setLngLat(coords).addTo(this.map);
    }
    else{
      this.markerEnd.setLngLat(coords).addTo(this.map);
    }
    this.map.setCenter(coords);
  }
}
