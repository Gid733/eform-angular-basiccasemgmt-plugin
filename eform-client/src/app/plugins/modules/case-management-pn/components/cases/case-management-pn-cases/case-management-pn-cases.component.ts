import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseListModel, CaseModel, CasesRequestModel} from 'src/app/common/models/cases';
import {TemplateDto} from 'src/app/common/models/dto';
import {CasesService} from 'src/app/common/services/cases';
import {EFormService} from 'src/app/common/services/eform';
import {CaseManagementPnSettingsModel} from '../../../models';
import {CaseManagementPnService} from '../../../services';

@Component({
  selector: 'app-case-management-pn-cases',
  templateUrl: './case-management-pn-cases.component.html',
  styleUrls: ['./case-management-pn-cases.component.scss']
})
export class CaseManagementPnCasesComponent implements OnInit {

  @ViewChild('modalRemoveCase') modalRemoveCase;
  currentTemplate: TemplateDto = new TemplateDto;
  casesRequestModel: CasesRequestModel = new CasesRequestModel();
  caseListModel: CaseListModel = new CaseListModel();
  settingsModel: CaseManagementPnSettingsModel = new CaseManagementPnSettingsModel();
  spinnerStatus = false;

  constructor(private activateRoute: ActivatedRoute,
              private casesService: CasesService,
              private caseManagementService: CaseManagementPnService,
              private eFormService: EFormService) {
  }

  ngOnInit() {
    this.spinnerStatus = true;
    this.caseManagementService.getSettings().subscribe((data) => {
      this.settingsModel = data.model;
      this.spinnerStatus = false;
      this.loadAllCases();
      this.loadTemplateData();
    });
  }

  onLabelInputChanged(label: string) {
    this.casesRequestModel.nameFilter = label;
    this.loadAllCases();
  }

  onDeleteClicked(caseModel: CaseModel) {
    this.modalRemoveCase.show(caseModel);
  }

  sortByColumn(columnName: string, sortedByDsc: boolean) {
    this.casesRequestModel.sort = columnName;
    this.casesRequestModel.isSortDsc = sortedByDsc;
    this.loadAllCases();
  }

  loadAllCases() {
    this.spinnerStatus = true;
    this.casesRequestModel.templateId = this.settingsModel.selectedTemplateId;
    this.casesService.getCases(this.casesRequestModel).subscribe(operation => {
      if (operation && operation.success) {
        this.caseListModel = operation.model;
      }
      this.spinnerStatus = false;
    });
  }

  loadTemplateData() {
    this.eFormService.getSingle(this.settingsModel.selectedTemplateId).subscribe(operation => {
      this.spinnerStatus = true;
      if (operation && operation.success) {
        this.currentTemplate = operation.model;
      }
      this.spinnerStatus = false;
    });
  }

  downloadPDF(caseId: number) {
    window.open('/api/template-files/download-case-pdf/' +
      this.currentTemplate.id + '?caseId=' + caseId, '_blank');
  }
}
