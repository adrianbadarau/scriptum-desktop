import {Component} from '@angular/core';
import {IpcRenderer} from 'electron'

const Datastore = window.require('nedb')
  , db = new Datastore({filename: `${__dirname}/dist/scriptum.db`, autoload: true});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private ipc: IpcRenderer;

  constructor() {
    if (window.require) {
      this.ipc = window.require('electron').ipcRenderer
    } else {
      console.error("this app has to run inside an electron instance to work")
    }
  }

  title = 'scriptum-desktop';

  openModal() {
    console.log("ORKING")
    this.ipc.send("openModal")
  }

  insertRecords() {
    const tag = db.insert({"test": true}, (err, newDoc) => {
      console.log(err, newDoc)
    })

  }

  queryRecords() {
    const records = db.find({}, (err, docs) => {
      console.log(err, docs)
    })

  }
}
