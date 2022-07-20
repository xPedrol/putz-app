import {Component, OnInit} from '@angular/core';
import {IProjectBudgetItemDataByType} from '../../../../models/reports/project-budget-item.model';
import {ProjectReportService} from '../../../../services/reports/project-report.service';
import {ProjectGraphService} from '../../../../services/project-graph.service';
import {IProjectBudgetItemFreelancer} from '../../../../models/project-budget-item-freelancer.model';
import {
  IProjectBudgetItemFreelancerPercentage, IProjectBudgetItemFreelancerPercentageGroupDate,
  IProjectCostAndSaleGraph, IProjectDeadlineGraph
} from '../../../../models/project-budget-item-freelancer-percentage.model';
import {NbThemeService} from '@nebular/theme';
import {IApprovedProject} from '../../../../models/reports/project-deadline-detail.model';
import {IProjectDeadline} from "../../../../models/project-deadline.model";

@Component({
  selector: 'app-project-report-manager',
  templateUrl: './project-report-manager.component.html',
  styleUrls: ['./project-report-manager.component.scss'],
  providers: [
    NbThemeService
  ]
})
export class ProjectReportManagerComponent implements OnInit {
  params = {
    start: '2022-05-01',
    end: '2022-06-01'
  };
  approvedProjects: IApprovedProject[];
  projectBudgetItemFreelancers: IProjectBudgetItemFreelancer[];
  projectBudgetItemFreelancersQuarter: IProjectBudgetItemFreelancer[];
  projectBudgetItemFreelancerPercentages: IProjectBudgetItemFreelancerPercentage;
  projectBudgetItemFreelancerPercentagesQuarter: IProjectBudgetItemFreelancerPercentage;
  projectCostAndSaleGraph: IProjectCostAndSaleGraph[];
  projectBudgeItems: IProjectBudgetItemDataByType[] = [];
  projectDeadlines: IProjectDeadline[];
  projectBudgetItemPercentageFreelancerGroupDate: IProjectBudgetItemFreelancerPercentageGroupDate[];
  projectDeadLineGraph: IProjectDeadlineGraph[];

  constructor(
    private projectReportService: ProjectReportService,
    private projectGraphService: ProjectGraphService,
    private themeService: NbThemeService
  ) {
    // this.themeService.changeTheme('default');
  }

  ngOnInit(): void {
    // funcção para cards de projetos e seus orçamentos
    this.queryProjectBudgetItems(this.params);
    // função para GRÁFICO DE CUSTOS DE FREELANCERS
    this.queryProjectBudgetItemFreelancer(this.params);
    // função para GRÁFICO DE CUSTOS DE FREELANCERS POR TRIMESTRE
    this.queryProjectBudgetItemFreelancerQuarter(this.params);
    // função para GRÁFICO DE FREELANCER PERCENTAGE
    this.getProjectBudgetItemPercentageFreelancer(this.params);
    // função para GRÁFICO DE FREELANCER PERCENTAGE DO TRIMESTRE
    this.getProjectBudgetItemPercentageFreelancerQuarter(this.params);
    // função para gráfico de custo e gasto de projetos
    this.getProjectCostAndSaleGraph(this.params);
    // função para projetos aprovados
    this.queryApprovedProjects(this.params);
    // função para prazo de entregas
    this.getProjectDeadlines(this.params);
    // função para GÁFICO DE CUSTO DE FREELANCERS POR MES
    this.queryProjectBudgetItemPercentageFreelancerGroupDate(this.params);
    // função para GRÁFICO DE PRAZOS DE ENTREGAS DE PROJETOS
    this.getProjectDeadlineGraph(this.params);
  }

  queryProjectBudgetItems(req?: any): void {
    this.projectReportService.queryProjectBudgetItemData(req).pipe().subscribe(data => {
      data.forEach((dataItem) => {
        const existType = this.projectBudgeItems.some((item) => {
          return item.name === dataItem?.type;
        });
        if (existType) {
          const typeIndex = this.projectBudgeItems.findIndex((item) => {
            return item.name === dataItem?.type;
          });
          this.projectBudgeItems[typeIndex].projectBudgetItems.push(dataItem);
        } else {
          this.projectBudgeItems.push({
            name: dataItem?.type,
            projectBudgetItems: [dataItem]
          });
        }
      });
    });
  }

  queryProjectBudgetItemPercentageFreelancerGroupDate(req?: any): void {
    this.projectGraphService.getProjectBudgetItemPercentageFreelancerGroupDate(req).pipe().subscribe(data => {
      this.projectBudgetItemPercentageFreelancerGroupDate = data;
    });
  }

  getProjectDeadlineGraph(req?: any): void {
    this.projectGraphService.getProjectDeadlineGraph(req).pipe().subscribe(data => {
      this.projectDeadLineGraph = data;
    });
  }

  queryProjectBudgetItemFreelancer(req?: any): void {
    this.projectGraphService.getProjectBudgetItemFreelancer(req).pipe().subscribe(data => {
      this.projectBudgetItemFreelancers = data;
    });
  }

  queryProjectBudgetItemFreelancerQuarter(req?: any): void {
    this.projectGraphService.getProjectBudgetItemFreelancer(req).pipe().subscribe(data => {
      this.projectBudgetItemFreelancersQuarter = data;
    });
  }

  queryApprovedProjects(req?: any): void {
    this.projectReportService.queryApprovedProjects(req).pipe().subscribe(data => {
      this.approvedProjects = data;
    });
  }

  getProjectBudgetItemPercentageFreelancer(req?: any): void {
    this.projectGraphService.getProjectBudgetItemPercentageFreelancer(req).pipe().subscribe(data => {
      this.projectBudgetItemFreelancerPercentages = data;
    });
  }


  getProjectBudgetItemPercentageFreelancerQuarter(req?: any): void {
    this.projectGraphService.getProjectBudgetItemPercentageFreelancer(req).pipe().subscribe(data => {
      this.projectBudgetItemFreelancerPercentagesQuarter = data;
    });
  }

  getProjectCostAndSaleGraph(req?: any): void {
    this.projectGraphService.getProjectCostAndSaleGraph(req).pipe().subscribe(data => {
      this.projectCostAndSaleGraph = data;
    });
  }

  getProjectDeadlines(req?: any): void {
    this.projectReportService.queryProjectDeadlines(req).pipe().subscribe(data => {
      this.projectDeadlines = data;
    });
  }
}
