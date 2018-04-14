import Vue from 'vue'
import bpmCAttachlist from './bpm_items/bpm_base/bpm_c_attachlist.vue'
import bpmCBlock from './bpm_items/bpm_base/bpm_c_block.vue'
import bpmCBlocktext from './bpm_items/bpm_base/bpm_c_blocktext.vue'
import bpmCBlocknumber from './bpm_items/bpm_base/bpm_c_blocknumber.vue'
import bpmCBlockdate from './bpm_items/bpm_base/bpm_c_blockdate.vue'
import bpmCBlockselect from './bpm_items/bpm_base/bpm_c_blockselect.vue'
import bpmCBlockadvance from './bpm_items/bpm_base/bpm_c_blockadvance.vue'
import bpmCBlockurl from './bpm_items/bpm_base/bpm_c_blockurl.vue'
import bpmCBlockButton from './bpm_items/bpm_base/bpm_c_blockbutton.vue'
import bpmCBlockError from './bpm_items/bpm_base/bpm_c_blockerror.vue'
import bpmCBlockRadio from './bpm_items/bpm_base/bpm_c_blockradio.vue'
import bpmCBlockTextarea from './bpm_items/bpm_base/bpm_c_blocktextarea.vue'
import bpmCDepartTree from './bpm_items/bpm_base/bpm_c_departtree.vue'
import bpmCDialog from './bpm_items/bpm_base/bpm_c_dialog.vue'
import bpmCGridHead from './bpm_items/bpm_base/bpm_c_gridhead.vue'
import bpmCGridBar from './bpm_items/bpm_base/bpm_c_gridbar.vue'
import bpmCGridMain from './bpm_items/bpm_base/bpm_c_gridmain.vue'
import bpmCGridPage from './bpm_items/bpm_base/bpm_c_gridpage.vue'
import bpmDGrid from './bpm_items/bpm_base/bpm_d_grid.vue'
import bpmCHistoryList from './bpm_items/bpm_base/bpm_c_historylist.vue'
import bpmCNavbar from './bpm_items/bpm_base/bpm_c_navbar.vue'
import bpmCNavTitle from './bpm_items/bpm_base/bpm_c_navtitle.vue'
import bpmCRejectDialog from './bpm_items/bpm_base/bpm_c_rejectdialog.vue'
import bpmCSubtitle from './bpm_items/bpm_base/bpm_c_subtitle.vue'
import bpmCTab from './bpm_items/bpm_base/bpm_c_tab.vue'
import bpmCTaskImage from './bpm_items/bpm_base/bpm_c_taskimage.vue'
import bpmCTopTitle from './bpm_items/bpm_base/bpm_c_toptitle.vue'
import bpmCTransDialog from './bpm_items/bpm_base/bpm_c_transferdialog.vue'

import bpmDAttachArea from '../views/ssc/reimburse/combine/bpm_d_attacharea.vue'
import bpmDAttachDialog from '../views/ssc/reimburse/combine/bpm_d_attachdialog.vue'
import bpmDBaseArea from '../views/ssc/reimburse/combine/bpm_d_basearea.vue'
import bpmDBusinessArea from '../views/ssc/reimburse/combine/bpm_d_businessarea.vue'
import bpmDCommonChoose from '../views/ssc/reimburse/combine/bpm_d_commonchoose.vue'
import bpmDfeerebursechoose from '../views/ssc/reimburse/combine/bpm_d_feerebursechoose.vue'
import bpmDHisheadArea from '../views/ssc/reimburse/combine/bpm_d_hisheadarea.vue'
import bpmDHislistArea from '../views/ssc/reimburse/combine/bpm_d_hislistarea.vue'
import bpmDImageArea from '../views/ssc/reimburse/combine/bpm_d_imagearea.vue'
import bpmDLinkArea from '../views/ssc/reimburse/combine/bpm_d_linkarea.vue'
import bpmDLoanArea from '../views/ssc/reimburse/combine/bpm_d_loanarea.vue'
import bpmDPaymentArea from '../views/ssc/reimburse/combine/bpm_d_paymentarea.vue'
import bpmDPaymentInput from '../views/ssc/reimburse/combine/bpm_d_paymentinput.vue'
import bpmDPersonChoose from '../views/ssc/reimburse/combine/bpm_d_personchoose.vue'
import bpmDSimpleChoose from '../views/ssc/reimburse/combine/bpm_d_simplechoose.vue'
import bpmDSplitArea from '../views/ssc/reimburse/combine/bpm_d_splitarea.vue'
import bpmDSubmitStepDialog from '../views/ssc/reimburse/combine/bpm_d_submitstepdialog.vue'
import bpmDTaskChoose from '../views/ssc/reimburse/combine/bpm_d_taskchoose.vue'
import bpmDTravelArea from '../views/ssc/reimburse/combine/bpm_d_travelarea.vue'
import bpmDPostArea from '../views/ssc/reimburse/combine/bpm_d_postarea.vue'
import bpmDSubmitTaskDialog from '../views/ssc/reimburse/combine/bpm_d_submittaskdialog.vue'

import saberDialog from './bpm_items/saber_dialog'
import saberPopover from './bpm_items/saber_popover'

Vue.component('bpm-c-attachlist', bpmCAttachlist)
Vue.component('bpm-c-block', bpmCBlock)
Vue.component('bpm-c-blocktext', bpmCBlocktext)
Vue.component('bpm-c-blocknumber', bpmCBlocknumber)
Vue.component('bpm-c-blockdate', bpmCBlockdate)
Vue.component('bpm-c-blockselect', bpmCBlockselect)
Vue.component('bpm-c-blockadvance', bpmCBlockadvance)
Vue.component('bpm-c-blockurl', bpmCBlockurl)
Vue.component('bpm-c-blockbutton', bpmCBlockButton)
Vue.component('bpm-c-blockerror', bpmCBlockError)
Vue.component('bpm-c-blockradio', bpmCBlockRadio)
Vue.component('bpm-c-blocktextarea', bpmCBlockTextarea)
Vue.component('bpm-c-departtree', bpmCDepartTree)
Vue.component('bpm-c-dialog', bpmCDialog)
Vue.component('bpm-c-gridhead', bpmCGridHead)
Vue.component('bpm-c-gridbar', bpmCGridBar)
Vue.component('bpm-c-gridmain', bpmCGridMain)
Vue.component('bpm-c-gridpage', bpmCGridPage)
Vue.component('bpm-c-historylist', bpmCHistoryList)
Vue.component('bpm-c-navbar', bpmCNavbar)
Vue.component('bpm-c-navtitle', bpmCNavTitle)
Vue.component('bpm-c-rejectdialog', bpmCRejectDialog)
Vue.component('bpm-c-subtitle', bpmCSubtitle)
Vue.component('bpm-c-tab', bpmCTab)
Vue.component('bpm-c-taskimage', bpmCTaskImage)
Vue.component('bpm-c-toptitle', bpmCTopTitle)
Vue.component('bpm-c-transdialog', bpmCTransDialog)

Vue.component('bpm-d-attacharea', bpmDAttachArea)
Vue.component('bpm-d-attachdialog', bpmDAttachDialog)
Vue.component('bpm-d-basearea', bpmDBaseArea)
Vue.component('bpm-d-businessarea', bpmDBusinessArea)
Vue.component('bpm-d-commonchoose', bpmDCommonChoose)
Vue.component('bpm-d-feerebursechoose', bpmDfeerebursechoose)
Vue.component('bpm-d-grid', bpmDGrid)
Vue.component('bpm-d-hishead', bpmDHisheadArea)
Vue.component('bpm-d-hislist', bpmDHislistArea)
Vue.component('bpm-d-imagearea', bpmDImageArea)
Vue.component('bpm-d-linkarea', bpmDLinkArea)
Vue.component('bpm-d-loanarea', bpmDLoanArea)
Vue.component('bpm-d-paymentarea', bpmDPaymentArea)
Vue.component('bpm-d-paymentinput', bpmDPaymentInput)
Vue.component('bpm-d-personchoose', bpmDPersonChoose)
Vue.component('bpm-d-simplechoose', bpmDSimpleChoose)
Vue.component('bpm-d-splitarea', bpmDSplitArea)
Vue.component('bpm-d-submitstepdialog', bpmDSubmitStepDialog)
Vue.component('bpm-d-taskchoose', bpmDTaskChoose)
Vue.component('bpm-d-travelarea', bpmDTravelArea)
Vue.component('bpm-d-postarea', bpmDPostArea)
Vue.component('bpm-d-submittaskdialog', bpmDSubmitTaskDialog)

Vue.component('saber-dialog', saberDialog)
Vue.component('saber-pop', saberPopover)
