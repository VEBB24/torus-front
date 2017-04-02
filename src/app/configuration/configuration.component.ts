import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

export class Algos {
  constructor(
    public algo1: boolean = false,
    public algo2: boolean = false,
    public algo3: boolean = false,
    public algo4: boolean = false,
    public algo5: boolean = false,
    public algo6: boolean = false,
    public algo7: boolean = false,
    public algo8: boolean = false
  ) { }
}

declare let L: any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  algos = new Algos()
  map
  editableLayers = new L.FeatureGroup()
  constructor(public auth: AuthService) { }

  ngOnInit() {
    const ACCESS_TOKEN = 'pk.eyJ1Ijoic3VpY2lkZWJveSIsImEiOiJjajExOXN4bzYwMDNoMnlwZ3BqNXhqcDZ5In0.zpOkiYje8z-hO4WZoyqnZA';
    const MB_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + ACCESS_TOKEN;
    this.map = L.map('leaflet', { center: [43.30, -0.36666], zoom: 3 })
    L.tileLayer(MB_URL, {
      attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.satellite',
      accessToken: ACCESS_TOKEN
    }).addTo(this.map)
    this.map.addLayer(this.editableLayers);
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.editableLayers
      },
      draw: {
        polyline: false,
        marker: false,
        circle: false,
        polygon: false,
      }
    });
    this.map.addControl(drawControl);
    this.map.on('draw:created', (e) => {
      this.editableLayers.eachLayer((layer) => this.editableLayers.removeLayer(layer))
      this.editableLayers.addLayer(e.layer);
    });
  }

  getAlgo() {
    console.debug("ConfigurationComponent#getAlgo ok")
    console.log(this.algos)
    this.editableLayers.eachLayer((layer) => {
      let ne = layer._bounds._northEast
      let sw = layer._bounds._southWest
      console.log(ne, sw)
    })
    console.log(this.auth.username, this.auth.sessionId)
  }
}
