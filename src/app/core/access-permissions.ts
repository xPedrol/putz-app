export const accessPermissions = {
  guest: {
    view: ['auth-buttons', 'main-header']
  },
  client: {
    view: ['profile', 'dashboard', 'dashboard-project-status', 'render-csv-view', 'subheader', 'main-header', 'event', 'comment', 'project-step', 'conception-list', 'project-list'],
    edit: [],
    create: ['event'],
    approve: ['conception'],
    valuate: ['event']
  },
  agency: {
    parent: 'client',
    view: ['client', 'render-csv-view', 'last-projects-dates-bar-chart', 'project-contract'],
    edit: ['person'],
    valuate: ['event'],
  },
  freelancer: {
    view: ['opened-opportunity', 'last-projects-dates-bar-chart', 'profile', 'dashboard', 'project', 'project-list', 'subheader', 'main-header', 'portfolio-manager', 'my_portfolio', 'opportunity', 'project-item', 'attachment', 'event', 'comment'],
    edit: ['attachment', 'event', 'comment', 'portfolio-manager'],
    create: ['event'],
    answer: ['event'],
    approve: []
  },
  admin: {
    view: ['project-contract', 'dashboard-project-status', 'project-report-manager', 'last-projects-dates-bar-chart', 'profile', 'render-csv-view', 'tag-crud', 'product-crud', 'project-cases-crud', 'competence-crud', 'competence-guide-crud', 'project-basic', 'dashboard', 'conception-list', 'all_portfolio', 'sidebar', 'subheader', 'project', 'main-header', 'portfolio-manager', 'project-list', 'client', 'advanced-browser', 'render', 'bot', 'opportunity', 'event', 'comment', 'attachment', 'project-item-request', 'conception', 'project-item', 'project-step', 'advanced-conception', 'advanced-render-form-buttons'],
    edit: ['product', 'project-case','competence', 'tag', 'comment', 'event', 'attachment', 'project', 'project-item', 'portfolio-manager', 'access-permission', 'person', 'advanced-conception', 'advanced-project-item', 'event-visibility'],
    approve: ['briefing', 'conception', 'opportunity', 'project-item-request', 'project-step', 'portfolio-manager'],
    valuate: ['event'],
    answer: ['event'],
    create: ['event']
  },
  manager: {
    view: ['project-contract', 'dashboard-project-status', 'project-report-manager', 'last-projects-dates-bar-chart', 'profile', 'render-csv-view', 'project-basic', 'dashboard', 'conception-list', 'all_portfolio', 'sidebar', 'subheader', 'project', 'main-header', 'portfolio-manager', 'project-list', 'client', 'advanced-browser', 'render', 'bot', 'opportunity', 'event', 'comment', 'attachment', 'project-item-request', 'conception', 'project-item', 'project-step', 'advanced-conception', 'advanced-render-form-buttons'],
    edit: ['competence', 'comment', 'event', 'attachment', 'project', 'project-item', 'portfolio-manager', 'access-permission', 'person', 'advanced-conception', 'advanced-project-item', 'event-visibility'],
    approve: ['briefing', 'conception', 'advanced-conception', 'opportunity', 'advanced-project-item', 'project-item-request', 'project-step', 'portfolio-manager'],
    valuate: ['event'],
    answer: ['event'],
    create: ['event']
  },
  vendor: {
    view: ['client', 'project-contract', 'last-projects-dates-bar-chart', 'profile', 'project-basic', 'dashboard', 'project', 'project-step', 'project-list', 'subheader', 'main-header', 'project-item', 'attachment', 'event', 'comment', 'conception'],
    approve: ['briefing', 'conception', 'advanced-conception'],
    edit: ['project', 'project-item', 'project-step']
  }
};
// 'project-general-tab', 'project-schedule-tab', 'project-item-tab', 'project-item-request-tab', 'project-conception-tab','project-rendering-tab'
