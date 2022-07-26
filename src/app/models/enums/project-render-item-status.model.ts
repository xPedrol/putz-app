export enum IProjectRenderItemStatus {
  QUEUED =  "Na fila",
  CREATED =  "Criado",
  PICKED =  "Separado",
  STARTED =  "Iniciado",
  RENDER_SETUP =  "Em renderização",
  RENDER_PREDOWNLOAD =  "Em renderização",
  RENDER_DOWNLOAD =  "Em renderização",
  RENDER_POSTDOWNLOAD =  "Em renderização",
  RENDER_PRERENDER =  "Em renderização",
  RENDER_SCRIPT =  "Em renderização",
  RENDER_DORENDER =  "Em renderização",
  RENDER_POSTRENDER =  "Em renderização",
  RENDER_POSRENDER =  "Em renderização",
  PRECREATED =  "Aguardando confirmação",
  RENDER_CLEANUP =  "Finalizando",
  FINISHED =  "Finalizado",
  ERROR =  "Erro",
  SAMBA_PROCESSING =  "Em processo na SambaTech",
  SAMBA_HOST = 'Em processo na SambaTech',
  CANCELED =  "Cancelado"
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
