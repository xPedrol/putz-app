import {ProjectStatus} from '../models/enums/project-status.model';

export const ProjectStatusClientArray = [
  ProjectStatus.CONCEPTION,
  ProjectStatus.BRIEFING,
  ProjectStatus.EXECUTION,
];

export const ProjectStatusArray = [
    ...ProjectStatusClientArray,
  ProjectStatus.MODEL,
  ProjectStatus.CANCELED,
  ProjectStatus.CLOSE
];

