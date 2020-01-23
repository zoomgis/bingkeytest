import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import BingMaps from 'ol/source/BingMaps';

import 'ol/ol.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public map: Map;
  public bingMapKey: string = "";
  public resultCodeStatus: string = "...";
  public resultCodeText: Object = new Object();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.updateMap();
  }

  public updateMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new BingMaps({
            key: this.bingMapKey,
            imagerySet: 'Aerial'
          }),
          visible: true
        })
      ],
      view: new View({
        center: olProj.fromLonLat([-7.967367, 53.553648]),
        zoom: 3
      })
    });
  }

  public setBingMapKey(text: any) {
    this.bingMapKey = text;

    this.map.removeLayer(this.map.getLayers(0).getArray()[0]);
    this.map.addLayer(new TileLayer({
      source: new BingMaps({
        key: this.bingMapKey,
        imagerySet: 'Aerial'
      }),
      visible: true
    }));

    this.resultCodeStatus = "...";
    this.resultCodeText = new Object();
    this.appService.getDataBingTest(this.bingMapKey).subscribe(
      result => {
        this.resultCodeStatus = result.statusCode;
        this.resultCodeText = result;
      },
      error => {
        this.resultCodeStatus = error.status;
        this.resultCodeText = error;
      });
  }
}