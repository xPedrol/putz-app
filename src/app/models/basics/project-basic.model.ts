import {ProjectStatus} from '../enums/project-status.model';

export interface IProjectBasic {
  agencySlug?: string | null;
  approvedByClient?: boolean | null;
  approvedByPutz?: boolean | null;
  isApprovedByClient	:	boolean| null;
  isApprovedByPutz	:	boolean| null;
  cancelUserSlug?: string | null;
  name?: string | null;
  id?: number | null;
  isActive?: boolean | null;
  managerSlug?: string | null;
  projectStatus?: ProjectStatus | null;
  slug?: string | null;
  vendorSlug?: string | null;
  projectStatusRouteParam: string;
  isConception?: boolean;
  isProject?: boolean;
  isModel?: boolean;
  isPlanning?: boolean;
  isFinished?: boolean;

  getProjectStatusRouteParam(): string | null;

  get projectStatusAsString(): string;

  verifyIfModel(): boolean;

  verifyIfProject(): boolean;

  verifyIfConception(): boolean;

  verifyIfPlanning(): boolean;

}

export class ProjectBasic implements IProjectBasic {
  agencySlug: string | null;
  approvedByClient: boolean | null;
  approvedByPutz: boolean | null;
  isApprovedByClient	:	boolean| null;
  isApprovedByPutz	:	boolean| null;
  cancelUserSlug: string | null;
  id: number | null;
  isActive: boolean | null;
  managerSlug: string | null;
  name: string | null;
  projectStatus: ProjectStatus | null;
  slug: string | null;
  vendorSlug: string | null;
  projectStatusRouteParam: string;
  isConception: boolean;
  isProject: boolean;
  isModel: boolean;
  isPlanning: boolean;
  isFinished: boolean;

  constructor(projectBasic: any = {}) {
    this.agencySlug = projectBasic.agencySlug;
    this.approvedByClient = projectBasic.approvedByClient;
    this.approvedByPutz = projectBasic.approvedByPutz;
    this.cancelUserSlug = projectBasic.cancelUserSlug;
    this.id = projectBasic.id;
    this.isActive = projectBasic.isActive;
    this.managerSlug = projectBasic.managerSlug;
    this.name = projectBasic.name;
    this.projectStatus = projectBasic.projectStatus;
    this.projectStatusRouteParam = this.getProjectStatusRouteParam() ?? 'actives';
    this.slug = projectBasic.slug;
    this.vendorSlug = projectBasic.vendorSlug;
    this.isProject = this.verifyIfProject();
    this.isModel = this.verifyIfModel();
    this.isPlanning = this.verifyIfPlanning();
    this.isConception = this.verifyIfConception();
    this.isFinished = this.verifyFinishedStatus();
    this.isApprovedByClient = !!this.approvedByClient;
    this.isApprovedByPutz = !!this.approvedByPutz;
  }

  verifyIfConception(): boolean {
    return (this.projectStatus === ProjectStatus.CONCEPTION);
  }

  verifyIfProject(): boolean {
    return (this.projectStatus === ProjectStatus.EXECUTION || this.projectStatus === ProjectStatus.CLOSE);
  }

  verifyIfModel(): boolean {
    return this.projectStatus === ProjectStatus.MODEL;
  }

  verifyIfPlanning(): boolean {
    return this.projectStatus === ProjectStatus.BRIEFING;
  }

  verifyFinishedStatus(): boolean {
    return this.projectStatus === ProjectStatus.CLOSE;
  }

  get projectStatusAsString(): string {
    switch (this.projectStatus) {
      case ProjectStatus.MODEL:
        return 'Modelo';
      case ProjectStatus.CONCEPTION:
        return 'Orçamento';
      case ProjectStatus.BRIEFING:
        return 'Briefing';
      case ProjectStatus.CANCELED:
        return 'Cancelado';
      case ProjectStatus.EXECUTION:
        return 'Execução';
      default:
        return '';
    }
  }

  getProjectStatusRouteParam(): string | null {
    const activeStatus = [ProjectStatus.EXECUTION, ProjectStatus.CLOSE];
    const conceptionStatus = [ProjectStatus.BRIEFING, ProjectStatus.CONCEPTION];
    if (this.projectStatus) {
      if (activeStatus.includes(this.projectStatus)) {
        return 'actives';
      }
      if (conceptionStatus.includes(this.projectStatus)) {
        return 'conceptions';
      }
      return `${this.projectStatus?.toLowerCase()}s`;
    }
    return null;
  }

}
