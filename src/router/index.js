import Vue from 'vue'
import Router from 'vue-router'
import HistoryScene from '@/views/history.vue'
import StoryScene from '@/views/story.vue'
import Home from '../views/Home'
import SscReimburseDraft from '../views/ssc/reimburse/ssc_reimburse_draft'
import SscReimburseApprove from '../views/ssc/reimburse/ssc_reimburse_approve'
import SscReimburseApproveFee from '../views/ssc/reimburse/ssc_reimburse_approve_fee'
import SscReimburseView from '../views/ssc/reimburse/ssc_reimburse_view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/history',
      name: 'HistoryScene',
      component: HistoryScene
    },
    {
      path: '/story',
      name: 'StoryScene',
      component: StoryScene
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/SscReimburseDraft',
      name: 'SscReimburseDraft',
      component: SscReimburseDraft
    },
    {
      path: '/SscReimburseApprove',
      name: 'SscReimburseApprove',
      component: SscReimburseApprove
    },
    {
      path: '/SscReimburseApproveFee',
      name: 'SscReimburseApproveFee',
      component: SscReimburseApproveFee
    },
    {
      path: '/SscReimburseView',
      name: 'SscReimburseView',
      component: SscReimburseView
    }
  ]
})
