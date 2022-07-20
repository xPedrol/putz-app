export enum IProjectRenderItemStatus {
  QUEUED = 'queued',
  CREATED = 'created',
  PICKED = 'picked',
  STARTED = 'started',
  RENDER_SETUP = 'render:setup',
  RENDER_PREDOWNLOAD = 'render:predownload',
  RENDER_DOWNLOAD = 'render:download',
  RENDER_POSTDOWNLOAD = 'render:postdownload',
  RENDER_PRERENDER = 'render:prerender',
  RENDER_SCRIPT = 'render:script',
  RENDER_DORENDER = 'render:dorender',
  RENDER_POSTRENDER = 'render:postrender',
  RENDER_CLEANUP = 'render:cleanup',
  FINISHED = 'FINISHED',
  ERROR = 'error',
  PRECREATED = 'PRECREATED',
  SAMBA_HOST = 'SAMBA_HOST',
  SAMBA_PROCESSING = 'SAMBA_PROCESSING'
}

export const projectRenderItemStatus: { id: string, name: string }[] = [
  {id: IProjectRenderItemStatus.CREATED, name: 'Criado'},
  {id: IProjectRenderItemStatus.PICKED, name: 'Picked'},
  {id: IProjectRenderItemStatus.FINISHED, name: 'Finalizado'},
  {id: IProjectRenderItemStatus.RENDER_CLEANUP, name: 'Limpeza'},
  {id: IProjectRenderItemStatus.RENDER_DORENDER, name: 'Renderizando'},
  {id: IProjectRenderItemStatus.RENDER_DOWNLOAD, name: 'Donwload'},
  {id: IProjectRenderItemStatus.RENDER_POSTDOWNLOAD, name: 'Post download'},
  {id: IProjectRenderItemStatus.RENDER_POSTRENDER, name: 'Post render'},
  {id: IProjectRenderItemStatus.RENDER_PREDOWNLOAD, name: 'Pre download'},
  {id: IProjectRenderItemStatus.RENDER_PRERENDER, name: 'Pre render'},
  {id: IProjectRenderItemStatus.RENDER_SCRIPT, name: 'Script'},
  {id: IProjectRenderItemStatus.RENDER_SETUP, name: 'Setup'},
  {id: IProjectRenderItemStatus.QUEUED, name: 'Na fila'},
  {id: IProjectRenderItemStatus.STARTED, name: 'Iniciado'},
  {id: IProjectRenderItemStatus.SAMBA_HOST, name: 'Hospedado em Samba Vídeos'},
  {id: IProjectRenderItemStatus.SAMBA_PROCESSING, name: 'Processado em Samba Vídeos'},
];

export const projectRenderItemStatusForClient: { id: string, name: string }[] = [
  {id: IProjectRenderItemStatus.CREATED, name: 'Criado'},
  {id: IProjectRenderItemStatus.FINISHED, name: 'Finalizado'},
  // {id: IProjectRenderItemStatus.QUEUED, name: 'Na fila'},
];
export const projectRenderItemStatusNotInProgress: IProjectRenderItemStatus[] = [
  IProjectRenderItemStatus.CREATED,
  IProjectRenderItemStatus.FINISHED
];
