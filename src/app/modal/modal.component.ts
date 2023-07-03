import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  showModal: boolean = false;
  columnsList: string[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getTableColumnsName().subscribe((data) => {
      this.columnsList = data;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
