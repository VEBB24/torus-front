import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventSourceService } from '../event-source.service';
import { BytePipe } from '../byte.pipe';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit, OnDestroy {
  listFiles = []
  checkedList = {}
  interval
  constructor(public auth: AuthService, public http: Http, public router: Router, public eventSource: EventSourceService) { }

  ngOnInit() {
    this.getListFiles()
    this.interval = setInterval(() => this.getListFiles(), 1000)
    this.eventSource.getEventSource()
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  deleteFile(name) {
    this.http.delete(`/api/hdfs/${this.auth.sessionId}/${name}`).subscribe(() => this.getListFiles())
  }

  renameFile(name) {
    let rename = prompt(`Rename file '${name}'`)
    this.http.put(`/api/hdfs/${this.auth.sessionId}`, { "previous": name, "next": rename }).subscribe(() => {
      this.checkedList[rename] = this.checkedList[name]
      delete this.checkedList[name]
      this.getListFiles()
    })
  }

  deepEqual(x, y) {
    let res = true
    if (x.length != y.length) return false
    for (let i in x) {
      res = res && (x[i].last_modified == y[i].last_modified && x[i].size == y[i].size && x[i].name == y[i].name)
    }
    return res
  }

  getListFiles() {
    this.http.get(`/api/hdfs/${this.auth.sessionId}`).map((x: Response) => x.json()).subscribe((x) => {
      x = x.sort((n1, n2) => {
        if (n1.last_modified > n2.last_modified) return 1;
        if (n1.last_modified < n2.last_modified) return -1;
        return 0;
      })
      if (this.listFiles.length == 0 || !this.deepEqual(x, this.listFiles)) {
        this.listFiles = x
        x.forEach(y => this.checkedList[y.name] = this.checkedList[y.name] || false)
      }
    })
  }

  noChecked() {
    let t = false
    for (let i in this.checkedList) {
      t = t || this.checkedList[i]
    }
    return !t
  }

  goConfig() {
    console.log(this.checkedList)
    this.router.navigate(["configuration"])
  }
}
