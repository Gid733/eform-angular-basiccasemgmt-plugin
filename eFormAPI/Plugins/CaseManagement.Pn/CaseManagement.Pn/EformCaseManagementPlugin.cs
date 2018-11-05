﻿using System.Collections.Generic;
using System.Reflection;
using CaseManagement.Pn.Abstractions;
using CaseManagement.Pn.Infrastructure.Data;
using CaseManagement.Pn.Infrastructure.Data.Factories;
using CaseManagement.Pn.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microting.eFormApi.BasePn;
using Microting.eFormApi.BasePn.Infrastructure.Models.Application;

namespace CaseManagement.Pn
{
    public class EformCaseManagementPlugin : IEformPlugin
    {
        public string GetName() => "Microting Case Management plugin";
        public string ConnectionStringName() => "EFormCaseManagementPnConnection";
        public string PluginPath() => PluginAssembly().Location;

        public Assembly PluginAssembly()
        {
            return typeof(EformCaseManagementPlugin).GetTypeInfo().Assembly;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ICaseManagementLocalizationService, CaseManagementLocalizationService>();
            services.AddScoped<ICalendarService, CalendarService>();
            services.AddScoped<ICalendarUsersService, CalendarUsersService>();
            services.AddScoped<ICaseManagementSettingsService, CaseManagementSettingsService>();
        }

        public void ConfigureDbContext(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CaseManagementPnDbContext>(o => o.UseSqlServer(connectionString,
                b => b.MigrationsAssembly(PluginAssembly().FullName)));

            var contextFactory = new CaseManagementPnDbContextFactory();
            var context = contextFactory.CreateDbContext(new[] {connectionString});
            context.Database.Migrate();
        }

        public void Configure(IApplicationBuilder appBuilder)
        {
        }

        public MenuModel HeaderMenu()
        {
            var result = new MenuModel();
            result.LeftMenu.Add(new MenuItemModel()
            {
                Name = "Case Management",
                E2EId = "case-management-pn",
                Link = "",
                MenuItems = new List<MenuItemModel>()
                {
                    new MenuItemModel()
                    {
                        Name = "Calendar",
                        E2EId = "case-management-pn-calendar",
                        Link = "/plugins/case-management-pn/calendar",
                        Position = 0,
                    },
                    new MenuItemModel()
                    {
                        Name = "Cases",
                        E2EId = "case-management-pn-cases",
                        Link = "/plugins/case-management-pn/cases",
                        Position = 1,
                    },
                    new MenuItemModel()
                    {
                        Name = "Settings",
                        E2EId = "case-management-pn-settings",
                        Link = "/plugins/case-management-pn/settings",
                        Position = 2,
                        Guards = new List<string>()
                        {
                            "admin"
                        }
                    },
                } 
            });
            return result;
        }

        public void SeedDatabase(string connectionString)
        {
        }
    }
}
