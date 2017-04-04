import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BytePipe } from '../byte.pipe';
@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit, OnDestroy {
  listFiles = []
  interval
  constructor(public auth: AuthService, public http: Http, public router: Router) { }
  ngOnInit() {
    this.getListFiles()
    this.interval = setInterval(() => this.getListFiles(), 1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  deleteFile(name) {
    this.http.delete(`/api/hdfs/${this.auth.sessionId}/${name}`).subscribe(() => this.getListFiles())
  }

  getListFiles() {
    this.http.get(`/api/hdfs/${this.auth.sessionId}`).map((x: Response) => x.json()).subscribe((x) => this.listFiles = x)
  }

  goConfig(name) {
    console.log(name)
    this.router.navigate(["configuration"])
  }
}
