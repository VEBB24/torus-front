import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export class Algo {
  constructor(
    public name="",
    public params={}
  ) { }
}

declare let L: any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  algos: Array<Algo> = []
  map
  editableLayers = new L.FeatureGroup()
  test= true
  constructor(public auth: AuthService, public router: Router) { }

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

  getAlgos() {
    console.debug("ConfigurationComponent#getAlgo ok")
    console.log(this.algos)
    this.editableLayers.eachLayer((layer) => {
      let ne = layer._bounds._northEast
      let sw = layer._bounds._southWest
      console.log(ne, sw)
    })
    console.log(this.auth.sessionId)
    this.router.navigate(["progress"])
  }

  addAlgo(alg) {
    this.algos.push(new Algo(alg, this.getParams(alg)))
  }

  delAlgo(alg) {
    this.algos.splice(alg, 1)
  }

  getParams(alg) {
    switch(alg) {
      case 1: return [{"type":"checkbox", "label":"Supervised", "value":false}, {"type":"slider", "label":"Variant", "value":0}];
      case 2: return [];
      case 3: return [];
      case 4: return [];
      case 5: return [];
      case 6: return [];
      case 7: return [];
      case 8: return [];
      case 9: return [];
    }
  }
}
