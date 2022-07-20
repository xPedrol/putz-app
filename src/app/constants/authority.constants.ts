export enum Authority {
  ADMIN = 'ROLE_ADMIN',
  CLIENT = 'ROLE_USER',
  MANAGER = 'ROLE_MANAGER',
  FREELANCER = 'ROLE_FREELANCER',
  AGENCY = 'ROLE_AGENCY',
  VENDOR = 'ROLE_VENDOR',
}

export const authorities = {
  ADMIN: Authority.ADMIN,
  CLIENT: Authority.CLIENT,
  FREELANCER: Authority.FREELANCER,
  AGENCY: Authority.AGENCY,
  VENDOR: Authority.VENDOR,
  MANAGER: Authority.MANAGER
};


export const personRoles: any[] = [
  {id: 'FREELANCER', title: 'Freelancer',},
  {id: 'AGENCY', title: 'Agência'},
  {id: 'MANAGER', title: 'Genrente'},
  {id: 'CLIENT', title: 'Cliente'},
  {id: 'VENDOR', title: 'Vendedor'},
  {id: 'ALL', title: 'Todos'}
];
export const allAuthorities: Authority[] = [
  Authority.ADMIN,
  Authority.CLIENT,
  Authority.FREELANCER,
  Authority.AGENCY,
  Authority.VENDOR,
  Authority.MANAGER
];
