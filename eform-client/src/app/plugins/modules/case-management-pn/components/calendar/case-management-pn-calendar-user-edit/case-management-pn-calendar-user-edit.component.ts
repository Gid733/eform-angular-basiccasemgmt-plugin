import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CalendarUserModel} from 'src/app/plugins/modules/case-management-pn/models/calendar/users';
import {CaseManagementPnCalendarService} from 'src/app/plugins/modules/case-management-pn/services';

@Component({
  selector: 'app-case-management-pn-calendar-user-edit',
  templateUrl: './case-management-pn-calendar-user-edit.component.html',
  styleUrls: ['./case-management-pn-calendar-user-edit.component.scss']
})
export class CaseManagementPnCalendarUserEditComponent implements OnInit {
  selectedCalendarUser: CalendarUserModel = new CalendarUserModel();
  @Output() onUserEdited: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('frame') frame;

  constructor(private calendarService: CaseManagementPnCalendarService) { }

  ngOnInit() {
  }

  show(model: CalendarUserModel) {
    this.selectedCalendarUser = Object.assign({}, model);
    this.frame.show();
  }

  updateSingle() {
    this.calendarService.updateCalendarUser(this.selectedCalendarUser).subscribe(operation => {
      if (operation && operation.success) {
        this.onUserEdited.emit();
        this.selectedCalendarUser = new CalendarUserModel();
        this.frame.hide();
      }

    });
  }
}
