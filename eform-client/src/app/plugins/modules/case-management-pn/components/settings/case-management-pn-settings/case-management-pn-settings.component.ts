import {ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, switchMap} from 'rxjs/operators';
import {TemplateListModel, TemplateRequestModel} from 'src/app/common/models/eforms';
import {EFormService} from 'src/app/common/services/eform';
import {CaseManagementPnSettingsModel} from '../../../models';
import {CaseManagementPnService} from '../../../services';

@Component({
  selector: 'app-case-management-pn-settings',
  templateUrl: './case-management-pn-settings.component.html',
  styleUrls: ['./case-management-pn-settings.component.scss']
})
export class CaseManagementPnSettingsComponent implements OnInit {
  spinnerStatus = false;
  typeahead = new EventEmitter<string>();
  settingsModel: CaseManagementPnSettingsModel = new CaseManagementPnSettingsModel();
  templateRequestModel: TemplateRequestModel = new TemplateRequestModel();
  templatesModel: TemplateListModel = new TemplateListModel();
  constructor(private activateRoute: ActivatedRoute,
              private eFormService: EFormService,
              private caseManagementService: CaseManagementPnService,
              private cd: ChangeDetectorRef) {
    this.typeahead
      .pipe(
        debounceTime(200),
        switchMap(term => {
          this.templateRequestModel.nameFilter = term;
          return this.eFormService.getAll(this.templateRequestModel);
        })
      )
      .subscribe(items => {
        this.templatesModel = items.model;
        this.cd.markForCheck();
      });
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.spinnerStatus = true;
    this.caseManagementService.getSettings().subscribe((data) => {
      if (data && data.success) {
        this.settingsModel = data.model;
      } this.spinnerStatus = false;
    });
  }

  updateSettings() {
    this.spinnerStatus = true;
    this.caseManagementService.updateSettings(this.settingsModel)
      .subscribe((data) => {
      if (data && data.success) {

      } this.spinnerStatus = false;
    });
  }

  onSelectedChanged(e: any) {
    this.settingsModel.selectedTemplateId = e.id;
  }
}