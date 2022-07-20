import {ProjectRenderGroupNameRecordStatusEnum} from "../constants/project-render-group-name-record-status.constants";

export interface IProjectRenderGroupName {
  id: {
    nameGroup: string,
    renderId: number
  },
  recordStatus: ProjectRenderGroupNameRecordStatusEnum,
  render: {
    id: number,
    name: string,
    renderSlug: string,
    sambaPid: number,
    whatsappBot: string
  }

}
