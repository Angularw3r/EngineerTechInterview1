import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-sanctioned-entities',
  templateUrl: './sanctioned-entities.component.html'
})
export class SanctionedEntitiesComponent {
  public entities: SanctionedEntity[];
  private newEntity: SanctionedEntity = { id: null, name: null, domicile: null, accepted: null };
  private id: Guid;
  public isDuplicate: boolean = false;
  public newSanctionedEntityFrm: FormGroup;
  public currentStatusText: string = "Not Selected";
  public currentStatus: boolean = true;

  constructor(private entitiesService: SanctionedEntitiesService,
    private frm: FormBuilder) {
    entitiesService.getSanctionedEntities().subscribe(entities => {
      this.entities = entities;
    });
    this.newSanctionedEntityFrm = this.createNewSanctionedEntityFrm();;
  }

  createNewSanctionedEntityFrm(): FormGroup {
    return this.frm.group(
      {
        name: [null, Validators.compose([Validators.required])],
        domicile: [null, Validators.compose([Validators.required])],
        accepted: [null, Validators.compose([Validators.required])]
      }
    );
  }
  
  showStatus(value: any) {
    this.currentStatus = value.currentTarget.checked;
    this.currentStatusText = (value.currentTarget.checked) ? "Accepted" : "Rejected";
  }

  submit() {
    this.id = Guid.create();
    this.newEntity = this.newSanctionedEntityFrm.value;
    this.newEntity.id = this.id.toString(); // in real life, id will be generated at DB  when we POST  for new entries, for completeness, I am adding to the object model within the UI.
    if (this.entities.findIndex((item) => item.name.toLowerCase() === this.newEntity.name.toLowerCase() && item.domicile.toLowerCase() === this.newEntity.domicile.toLowerCase()) < 0) {
      this.entities.push(this.newSanctionedEntityFrm.value);
      this.isDuplicate = false;
    } else {
      this.isDuplicate = true;
    }
  }
}
