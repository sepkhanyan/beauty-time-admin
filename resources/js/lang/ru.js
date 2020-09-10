export default {
  route: {
    category: 'Категория',
    dashboard: 'Панель управления',
    introduction: 'Введение',
    salonDetails: 'Детали салона',
    usersAndRoles: 'Пользователи и роли',
    transactions: 'Транзакции',
    logs: 'Журнал',
    rating: 'Рейтинг',
    reviews: 'Отзывы',
    notifications: 'Уведомления',
    salonAdmins: 'Админы Салонов',
    appUsers: 'Пользователи приложения',
    toAppUsers: 'Пользователям приложения',
    rolePermissions: 'Роли и разрешения',
    companyTypes: 'Типы компаний',
    categoriesServices: 'Категории и услуги',
    salons: 'Салоны',
    salon: 'Салон',
    all: 'Все',
    active: 'Активные',
    inReview: 'В обзоре',
    disabled: 'Отключено',
    guide: 'Инструкция',
    permission: 'Права',
    pagePermission: 'Страница прав',
    rolePermission: 'Права ролей',
    directivePermission: 'Права для путей',
    icons: 'Иконки',
    components: 'Компоненты',
    componentIndex: 'Введение',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Загрузка аватара',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'Кнопка "Вверх"',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Графики',
    keyboardChart: 'Столбчатый график',
    lineChart: 'Линейный график',
    mixChart: 'Смешанный график',
    example: 'Пример',
    nested: 'Вложенные меню',
    menu1: 'Меню 1',
    'menu1-1': 'Меню 1-1',
    'menu1-2': 'Меню 1-2',
    'menu1-2-1': 'Меню 1-2-1',
    'menu1-2-2': 'Меню 1-2-2',
    'menu1-3': 'Меню 1-3',
    menu2: 'Меню 2',
    table: 'Таблица',
    dynamicTable: 'Динамическая',
    dragTable: 'С переносом строк',
    inlineEditTable: 'С редактированием',
    complexTable: 'Комплексная',
    treeTable: 'Древовидная',
    customTreeTable: 'Кастомное древо',
    tab: 'Вкладки',
    form: 'Форма',
    createArticle: 'Создать статью',
    editArticle: 'Изменить статью',
    articleList: 'Статьи',
    errorPages: 'Страницы ошибок',
    page401: '401',
    page404: '404',
    errorLog: 'Лог ошибок',
    excel: 'Excel',
    exportExcel: 'Экспорт в Excel',
    selectExcel: 'Экспорт выбранных строк',
    mergeHeader: 'Склееные заголовки',
    uploadExcel: 'Импорт Excel файла',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Экспорт в Zip',
    theme: 'Тема',
    clipboardDemo: 'Буфер обмена',
    i18n: 'I18n',
    externalLink: 'Внешняя ссылка',
    elementUi: 'Element UI',
    administrator: 'Администратор',
    users: 'Пользователи',
    userProfile: 'Профиль пользователя',
  },
  navbar: {
    logOut: 'Выход',
    dashboard: 'Панель управления',
    github: 'Github',
    theme: 'Тема',
    size: 'Размер интерфейса',
    profile: 'Профиль',
  },
  login: {
    title: 'Авторизация',
    logIn: 'Войти',
    username: 'Username',
    password: 'Пароль',
    any: 'любой',
    thirdparty: 'Или войдите с помощью',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
    email: 'Email',
  },
  documentation: {
    documentation: 'Документация',
    laravel: 'Laravel',
    github: 'Репозиторий Github',
  },
  permission: {
    addRole: 'Новая роль',
    editPermission: 'Редактировать право',
    roles: 'Ваши роли',
    switchRoles: 'Сменить роль',
    tips: 'В некоторых случаях не рекомендуется использовать v-role/v-permission, например в Tab компонентах или в el-table-column, и в других  элементах, у которых dom структура рендерится асинхронно. Вместо этого используйте v-if с checkRole и/или checkPermission.',
    delete: 'Удалить',
    confirm: 'Подтвердить',
    cancel: 'Отменить',
  },
  guide: {
    description: 'Инструкция полезна для тех, кто использует этот проект впервые. Вы можете кратко ознакомится с ним. Демо основано на',
    button: 'Показать инструкцию',
  },
  components: {
    documentation: 'Документация',
    tinymceTips: 'Rich text редактор является основной частью систем управления, но также у него имеется множество проблем. Выбирая rich text редактор, я испробовал разные. В основном все используют обычные rich text редакторы, но в итоге выбирают Tinymce. Смотрите документацию для подробных сравнений и ознакомления.',
    dropzoneTips: 'Поскольку у моего бизнеса есть нужды в особом функционале, и он должен загружать изображения в qiniu, вместо сторонних библиотек я инкапсулировал dropzone сам.  Это очень просто, вы можете увидеть подробный код в @/components/Dropzone.',
    stickyTips: 'Когда страница спускается до заданной позиции, элемент приклеивается к верху.',
    backToTopTips1: 'Когда страница спускается до заданной позиции, кнопка "подняться вверх" появляется в ннижнем правом углу.',
    backToTopTips2: 'Вы можете изменить стили кнопки, анимацию появления/исчезания, высоту на которой она появится/исчезнет. Если Вам нужно отобразить текст, вы можете использовать element-ui el-tooltip внешне, как в примере.',
    imageUploadTips: 'Ввиду того, что я использовал версию vue@1, и в данный момент она не совместима с mockjs, я модифицировал её сам. И если вы собираетесь её использовать, лучше использовать официальную версию.',
  },
  table: {
    typeMessage: 'Введите сообщение',
    companiesNumber: 'Количество компаний',
    servicesNumber: 'Количество услуг',
    salonName: 'Название салона',
    directorName: 'Имя директора',
    description: 'Описание',
    dynamicTips1: 'Фиксированная ширина столбцов, фиксированный порядок столбцов',
    dynamicTips2: 'Изменяемая ширина столбцов, сортировка порядка столбцов по клику',
    dragTips1: 'Изначальный порядок элементов',
    dragTips2: 'Порядок после перетаскивания элементов',
    name: 'Имя',
    title: 'Заголовок',
    services: 'Услуги',
    importance: 'Важность',
    type: 'Тип',
    remark: 'Примечание',
    search: 'Поиск',
    add: 'Добавить',
    export: 'Экспорт',
    reviewer: 'Проверяющий',
    id: 'ID',
    date: 'Дата',
    author: 'Автор',
    readings: 'Просмотрено',
    status: 'Статус',
    actions: 'Действия',
    archive: 'Архивировать',
    changeStatus: 'Изменить статус',
    notify: 'Уведомить',
    notifyTooltip: 'Уведомить владельца салона о необходимых изменениях',
    reInvite: 'Вновь пригласить',
    view: 'Посмотреть',
    edit: 'Изменить',
    disable: 'Отключить',
    activate: 'Активировать',
    publish: 'Опубликовать',
    draft: 'Черновик',
    delete: 'Удалить',
    cancel: 'Отменить',
    confirm: 'Подтвердить',
    keyword: 'Ключевое слово',
    role: 'Роль',
  },
  errorLog: {
    tips: 'Пожалуйста, нажмите на иконку "бага" в правом верхнем углу',
    description: 'Сейчас система управления это SPA (single page application). Это улучшает удобство интерфейса, но так же увеличивает вероятность появления ошибок, которые могут привести к тупиковой странице (т.е. придеться перезагрузить страницу). К счастью Vue предоставляет перехват исключений, где вы можете обработать ошибку или сообщить об исключении.',
    documentation: 'Введение в документацию',
  },
  excel: {
    export: 'Экспорт',
    selectedExport: 'Экспортировать выбранные строки',
    placeholder: 'Пожалуйста, введите название файла (по умолчанию excel-list)',
  },
  zip: {
    export: 'Экспорт',
    placeholder: 'Пожалуйста, введите название файла (по умолчанию file)',
  },
  pdf: {
    tips: 'Здесь мы используем window.print(), для реализации скачивания pdf файла.',
  },
  theme: {
    change: 'Изменить тему',
    documentation: 'Документация по темам',
    tips: 'Подсказка: Это отличается от смены темы на панели навигации, это два разных метода смены темы, с разными реализациями кода. Больше информации, в документации.',
  },
  tagsView: {
    refresh: 'Обновить',
    close: 'Закрыть',
    closeOthers: 'Закрыть остальные',
    closeAll: 'Закрыть все',
  },
  settings: {
    title: 'Настройка стилей страниц',
    theme: 'Цвет темы',
    tagsView: 'Отображать вкладки',
    fixedHeader: 'Зафиксировать панель навигации',
    sidebarLogo: 'Логотип на боковой панели',
  },
  user: {
    'role': 'Роль',
    'password': 'Пароль',
    'confirmPassword': 'Подтвердить пароль',
    'name': 'Имя',
    'email': 'Email',
    'phoneNumber': 'Номер телефона',
  },
  roles: {
    description: {
      admin: 'Super Administrator. Есть доступ и права для всех страниц',
      manager: 'Manager. Есть доступ и права к большинству страниц, кроме страницы прав.',
      editor: 'Editor. Имеет доступ к большинству страниц, все права для статей и связанных ресурсов.',
      user: 'Normal user. Есть доступ к некоторым страницам.',
      visitor: 'Visitor. Имеют доступ к статическим страницам, не должны иметь прав на запись.',
    },
  },
};
