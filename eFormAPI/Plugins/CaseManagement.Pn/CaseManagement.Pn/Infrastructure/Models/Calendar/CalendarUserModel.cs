﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microting.eForm.Infrastructure.Constants;
using Microting.eFormBasicCaseManagementBase.Infrastructure.Data;
using Microting.eFormBasicCaseManagementBase.Infrastructure.Data.Entities;

namespace CaseManagement.Pn.Infrastructure.Models.Calendar
{
    public class CalendarUserModel : IModel
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int CreatedByUserId { get; set; }
        public int UpdatedByUserId { get; set; }
        public string WorkflowState { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SiteId { get; set; }
        public bool IsVisibleInCalendar { get; set; }
        public string NameInCalendar { get; set; }
        public string Color { get; set; }
        public int RelatedEntityId { get; set; }

        public async Task Create(eFormCaseManagementPnDbContext _dbContext)
        {
            CalendarUser calendarUser = new CalendarUser();
            calendarUser.Color = Color;
            calendarUser.IsVisibleInCalendar = IsVisibleInCalendar;
            calendarUser.NameInCalendar = NameInCalendar;
            calendarUser.SiteId = SiteId;
            calendarUser.RelatedEntityId = RelatedEntityId;
            calendarUser.Version = 1;
            calendarUser.CreatedAt = DateTime.Now;
            _dbContext.CalendarUsers.Add(calendarUser);
            await _dbContext.SaveChangesAsync();

            _dbContext.CalendarUserVersions.Add(MapVersions(_dbContext, calendarUser));
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(eFormCaseManagementPnDbContext _dbContext)
        {
            CalendarUser calendarUser = _dbContext.CalendarUsers.FirstOrDefault(x => x.Id == Id);

            if (calendarUser == null)
            {
                throw new NullReferenceException($"Could not find Calendar User with id {Id}");
            }

            calendarUser.Color = Color;
            calendarUser.IsVisibleInCalendar = IsVisibleInCalendar;
            calendarUser.NameInCalendar = NameInCalendar;
            calendarUser.SiteId = SiteId;
            calendarUser.WorkflowState = WorkflowState;
            
            if (_dbContext.ChangeTracker.HasChanges())
            {
                calendarUser.UpdatedByUserId = UpdatedByUserId;
                calendarUser.UpdatedAt = DateTime.Now;
                calendarUser.Version += 1;

                _dbContext.CalendarUserVersions.Add(MapVersions(_dbContext, calendarUser));
              await  _dbContext.SaveChangesAsync();
            }
        }

        public async Task Delete(eFormCaseManagementPnDbContext _dbContext)
        {
            CalendarUser calendarUser = _dbContext.CalendarUsers.FirstOrDefault(x => x.Id == Id);

            if (calendarUser == null)
            {
                throw new NullReferenceException($"Could not find Calendar User with id {Id}");
            }

            calendarUser.WorkflowState = Constants.WorkflowStates.Removed;

            if (_dbContext.ChangeTracker.HasChanges())
            {
                calendarUser.UpdatedAt = DateTime.Now;
                calendarUser.UpdatedByUserId = UpdatedByUserId;
                calendarUser.Version += 1;

                _dbContext.CalendarUserVersions.Add(MapVersions(_dbContext, calendarUser));
              await  _dbContext.SaveChangesAsync();
            }
        }

        public CalendarUserVersions MapVersions(eFormCaseManagementPnDbContext _dbContext, CalendarUser calendarUser)
        {
            CalendarUserVersions calendarUserVersions = new CalendarUserVersions();
            calendarUserVersions.Color = calendarUser.Color;
            calendarUserVersions.SiteId = calendarUser.SiteId;
            calendarUserVersions.FirstName = calendarUser.FirstName;
            calendarUserVersions.LastName = calendarUser.LastName;
            calendarUserVersions.NameInCalendar = calendarUser.NameInCalendar;
            calendarUserVersions.IsVisibleInCalendar = calendarUser.IsVisibleInCalendar;
            calendarUserVersions.RelatedEntityId = calendarUser.RelatedEntityId;
            calendarUserVersions.CreatedAt = calendarUser.CreatedAt;
            calendarUserVersions.Version = calendarUser.Version;
            calendarUserVersions.UpdatedAt = calendarUser.UpdatedAt;
            calendarUserVersions.WorkflowState = calendarUser.WorkflowState;
            calendarUserVersions.CreatedByUserId = calendarUser.CreatedByUserId;
            calendarUserVersions.UpdatedByUserId = calendarUser.UpdatedByUserId;

            calendarUserVersions.CalendarUserId = calendarUser.Id;
            
            return calendarUserVersions;
        }
    }
}