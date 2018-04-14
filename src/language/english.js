'use strict'
let exp = {
  base: ' base',
  style: ' style',
  bind: ' bind',
  child: ' child',
  page: ' page',
  variable: ' variable',
  api: ' Api',
  name: ' name',
  remark: ' remark',
  paramIn: ' paramIn',
  paramOut: ' paramOut',
  search: ' search',
  ctrl: ' ctrl',
  label: ' label',
  value: ' value',
  valueDic: ' valueDic',
  valueType: ' valueType',
  showType: ' showType',
  func: ' func',
  save: ' save',
  code: ' code',
  none: ' none',
  solid: ' solid',
  dashed: ' dashed',
  dotted: ' dotted',
  double: ' double',
  groove: ' groove',
  ridge: ' ridge',
  inset: ' inset',
  outset: ' outset',
  click: ' click',
  change: ' change',
  blur: ' blur',
  pageGo: ' pageGo',
  request: ' request',
  alert: ' alert',
  confirm: ' confirm',
  push: ' push',
  replace: ' replace',
  close: ' close',
  home: ' home',
  layout: ' layout',
  left: ' left',
  center: ' center',
  right: ' right',
  between: ' between',
  top: ' top',
  bottom: ' bottom',
  flow: ' flow',
  vertical: ' vertical',
  width: ' width',
  height: ' height',
  inherit: ' inherit',
  full: ' full',
  half: ' half',
  o1i3: ' 1/3',
  o2i3: ' 2/3',
  o1i5: ' 1/5',
  o2i5: ' 2/5',
  o3i5: ' 3/5',
  o4i5: ' 4/5',
  small: ' small',
  large: ' large',
  normal: ' normal',
  one: ' 1',
  two: ' 2',
  three: ' 3',
  four: ' 4',
  set: ' set',
  exit: ' exit',
  develop: ' develop',
  platform: ' platform',
  data: ' data',
  manage: ' manage',
  senior: ' senior',
  row: ' row',
  event: ' event',
  border: ' border',
  shadow: ' shadow',
  view: ' view',
  header: ' header',
  tabbar: ' tabbar',
  list: ' list',
  button: ' button',
  form: ' form',
  field: ' field',
  plus: '+',
  radio: ' radio',
  'radio+': 'radio+',
  checkbox: ' checkbox',
  'checkbox+': 'checkbox+',
  input: ' input',
  switch: ' switch',
  'switch+': 'switch+',
  text: ' text',
  select: ' select',
  tipInput: ' tip input',
  color: ' color',
  size: ' size',
  background: ' background',
  current: ' current',
  music: ' music',
  welcome: ' welcome',
  to: ' to',
  my: ' my',
  stop: ' stop',
  adapter: ' adapter',
  create: ' create',
  edit: ' edit',
  del: ' del',
  copy: ' copy',
  draft: ' draft',
  publish: ' publish',
  app: ' App',
  upload: ' upload',
  picture: ' picture',
  login: ' login',
  register: ' register',
  account: ' account',
  password: ' password',
  remember: ' remember',
  first: ' first',
  last: ' last',
  week: ' week',
  free: ' free',
  cancel: ' cancel',
  ok: ' ok',
  title: ' title',
  keyword: ' keyword',
  discribe: ' discribe',
  distance: ' distance',
  inner: ' inner',
  position: ' position',
  opacity: ' opacity',
  padding: ' padding',
  radius: ' radius',
  axis: ' axis',
  x: ' X',
  y: 'Y',
  type: ' type',
  action: ' action',
  require: 'require',
  global: ' global',
  choose: ' choose',
  used: ' used',
  placeholder: ' placeholder',
  number: ' number',
  email: ' email',
  url: ' url',
  tel: ' tel',
  date: ' date',
  datetime: ' datetime',
  textarea: ' textarea',
  default: ' default',
  primary: ' primary',
  danger: ' danger',
  again: ' again',
  cannot: ' cannot',
  empty: ' empty',
  error: ' error',
  success: ' success',
  fail: ' fail',
  refresh: ' refresh',
  simulator: ' simulator',
  advice: ' advice',
  submit: ' submit',
  plan: ' plan',
  problem: ' problem',
  update: ' update',
  content: ' content',
  feedback: ' feedback',
  sourceCode: ' sourceCode',
  attr: ' attr',
  align: ' align',
  class: ' class',
  start: ' start',
  load: ' load',
  config: ' config',
  reuse: ' reuse',
  open: ' open',
  brush: ' brush',
  before: ' before',
  after: ' after',
  custom: ' custom',
  options: ' options',
  buttonReq: ' btnReq',
  buttonPage: ' btnPage',
  buttonFunc: ' btnFunc',
  buttonPhoto: ' btnPhoto',
  buttonUploadImage: ' btnUpImg',
  buttonUploadFile: ' btnUpFile',
  selectMulti: ' selMulti',
  selectMulti2: ' selMultiAdv',
  calender: ' calender',
  image: ' image',
  readonly: ' readonly',
  behavior: ' behavior',
  animation: ' animation',
  length: ' length',
  validation: ' validation',
  pre: ' pre',
  isMoney: ' isMoney',
  separator: ' separator',
  optionLabelKey: ' optionLabelKey',
  optionValueKey: ' optionValueKey',
  src: ' src',
  searchKey: ' searchKey',
  itemColor1Expression: ' itemColor1Expression',
  itemColor2Expression: ' itemColor2Expression',
  showBack: ' showBack',
  showMore: ' showMore',
  pageParam: ' pageParam',
  toPageId: ' toPageId',
  toPageParam: ' toPageParam',
  apiParam: ' apiParam',
  confirmMsg: ' confirmMsg',
  failMsg: ' failMsg',
  succFunc: ' succFunc',
  funcId: ' funcId',
  loadUrl: ' loadUrl',
  loadUrlParam: ' loadUrlParam',
  loadFailMsg: ' loadFailMsg',
  loadSuccFunc: ' loadSuccFunc',
  funcParams: ' funcParams',
  saber: ' saber',
  titleIcon: ' titleIcon',
  titleDic: ' titleDic',
  detail: ' detail',
  detailDic: ' detailDic',
  subtitle: ' subtitle',
  subtitleDic: ' subtitleDic',
  subdetail: ' subdetail',
  subdetailDic: ' subdetailDic',
  pageId: ' pageId',
  apiId: ' apiId',
  varId: ' varId',
  dicList: ' dicList',
  state: ' state',
  visibility: ' visibility',
  apiParamFunc: ' apiParamFunc',
  maxLength: ' maxLength',
  lock: ' lock',
  unlock: ' unlock',
  restore: ' restore',
  backups: ' backups',
  palaceFunc: 'palaceFunc',
  palacePage: 'palacePage',
  palaceApp: 'palaceApp',
  subtitles: ' titles',
  icon: ' icon',
  icons: ' icons',
  visibilitys: ' visibilitys',
  funcs: ' funcs',
  func1: 'func1',
  func2: 'func2',
  func3: 'func3',
  func4: 'func4',
  func5: 'func5',
  func6: 'func6',
  func7: 'func7',
  func8: 'func8',
  func9: 'func9',
  buttonGroup: ' btnGroup',
  confirmMsgs: ' confirmMsgs',
  failMsgs: ' failMsgs',
  plugin: ' plugin',
  schema: ' schema',
  orders: ' orders',
  nova_list: ' novaList',
  submitSuccFunc: ' submitSuccFunc',
  submitApiId: ' submitApiId',
  submitApiParam: ' submitApiParam',
  nova_form: ' novaForm',
  native: ' native',
  business: ' business',
  complex: ' complex',
  all: ' all',
  homePage: ' homePage',
  pageParams: ' pageParams',
  pageIds: ' pageIds',
  appIds: ' appIds'
}
export default exp