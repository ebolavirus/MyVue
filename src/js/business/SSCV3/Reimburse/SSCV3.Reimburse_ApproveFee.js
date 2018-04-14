var stdSubjectCode1="500307000101";
var stdSubjectCode2="500307000901";

function requriedVerify(){
  
  var deciObj = {};
  deciObj.totalsum  = 0;
  $CV("local.hsInput").options("decisionData",$.toJSON(deciObj));
  
  var hsInput = JSON.parse($CV("local.hsInput").val());
  var hsInputPara = JSON.parse(hsInput.para);
  var taskType = hsInputPara.taskType;//任务类型(0:申请,1:待办,2:加签,3:转办,4：任务池,5:流程管理替换处理人 )
  if (isMakeCert()=="0" && taskType != "2"){
    //if (isMakeCert()=="0") {
    dhtmlx.alert(coachViewUtil.getResource("alert.myzzbyxtj"));   //还没有制证,不允许提交
    return false;
  }
  return true;
}

var bpmCoreCallback = function(gv,datas){
  return datas;
}


var fnSetFlagCallback = function(height,extFlag) {
  //alert(extFlag);
  //$CV("CVDivContainer_reserve").context.element.style.height=height+"px";
  $CV("CVPageUlLi48").visibility(extFlag);
  
  var cvSubtitleDiv = $CV("reimDetails").context.element.querySelector(".cvSubtitle");
  var blockVisible = true;
  cvSubtitleDiv.onclick = function(){
    $CV("reimDetails").toggle();
    
    if(blockVisible){
      //$CV("CVPageUlLi48").visibility("E");
      //$CV("CVDivContainer_reserve").context.element.style.height=0+"px";
      blockVisible = false;
      if (extFlag=="E") {
        $CV("CVPageUlLi48").visibility("H");
      } else {
        $CV("CVPageUlLi48").visibility("H");
      }
    }else{
      blockVisible = true;
      if (extFlag=="E") {
        //$CV("CVDivContainer_reserve").context.element.style.height=390+"px";
        $CV("CVPageUlLi48").visibility("E");
      } else {
        //$CV("CVDivContainer_reserve").context.element.style.height=0+"px";
        $CV("CVPageUlLi48").visibility("H");
      }
    }
  }
  
}


//检查是否存在差旅费,在逻辑图中，如果有差旅费，则置上mid；
function ravelExists(){
  
  var mid   = $CV("local.mid").val();
  
  if (mid!=null && mid!="") {
    fnSetFlagCallback(390,'E');
  } else {
    fnSetFlagCallback(0,'H');
  }
}

var setInitTrans = function(businessObj){
  
  setInitProperty();
  var object = {};
  object.postInputParameter = JSON.stringify({name:"test"});
  return object;
}

//CVPageBusinessInfo1 调用
function loadDataCallback(){
  
  //ocr弹窗
  var hsInput = JSON.parse($CV("local.hsInput").val());
  var hsInputPara = JSON.parse(hsInput.para);
  var taskType = hsInputPara.taskType;//任务类型(0:申请,1:待办,2:加签,3:转办,4：任务池,5:流程管理替换处理人 )
  var ocrLink=$CV("local.whBtReimburse.processlinkocr").val();
  var processlinkopentext = $CV("local.whBtReimburse.processlinkopentext").val();
  
  var isReimScan = $CV("local.checkResult").val();
  
  if(isReimScan == "Y"&& ocrLink && processlinkopentext && taskType!="2" ){
    var ocrLinkArry=ocrLink.split(";");
    
    if(ocrLinkArry[0]){
      window.open(ocrLinkArry[0],"","height=650,width=1150,top=0,left=1450");
    }
  }
}

/**
 * 页面加载完成后一系列初始化动作；
 * @author gyren
 */
function setInitProperty(){
//	$CV("CVPageTable1")._dhxGrid.setColumnColor(",,,,,,,#8EC2F5,#8EC2F5,,,,,,,,");
  //调用接口重新获取员工欠款；
  resubmintLoadUnpaidSum();
  ravelExists();
  //加载完成后实施计算本次冲抵金额；
  calReChargeMoney();
  //设置超链接
  setTraProLink();
  setAbroadProLink();
  //设置影像链接部分,超链接部分是否隐藏显示
  setLinkHidden();
  //OCR链接，双屏显示
  loadDataCallback();
  //设置费用岗位信息可编辑属性
  setFeePostionEnabled();
}
/**
 * 页面加载完成后调用员工欠款接口168；
 * @author gyren；
 */
function resubmintLoadUnpaidSum()
{
  
  //已经制证；不再调用接口；gyren20151210
  if (isMakeCert()=="-1") {
    return true;
  }
  
  var empNum  =  $CV("local.whBtReimburse.employeeNumber").val();
  var comCode = $CV("local.whBtReimburse.reimbursecompanycode").val();
  var btNo    =  $CV("local.whBtReimburse.btNo").val();
  
  var temp2;
  
  var employeeLoanQuery = {};
  employeeLoanQuery.employeeNum = empNum;
  employeeLoanQuery.companyCode = comCode;
  employeeLoanQuery.btNo        = btNo;
  
  employeeLoanQuery.lang        = "";
  employeeLoanQuery.field1	    = "";
  employeeLoanQuery.field2      = "";
  employeeLoanQuery.field3      = "";
  
  
  var params2 = {};
  params2.DT_166_BPM_EmployeeLoanQuery = employeeLoanQuery;
  //parameters = $.toJSON(parameters);
  var success2 = function (data) {
    if (data.data.data.DT_166_BPM_EmployeeLoanQuery_Resp.excuteStatus == "S") {
      
      temp2 = data.data.data.DT_166_BPM_EmployeeLoanQuery_Resp.loan + "";
      $CV("local.whBtReimburseRcmSub.unpaidAggregateAmountFee").val(temp2);
    }else {
      dhtmlx.alert(coachViewUtil.getResource("alert.info.cxygjkjksb"));
    }
  }
  var fail2 = function (error) {};
  coachViewUtil.callAjaxByServiceName("EBSA@AJAX_166_EmployeeLoanQuery", params2, success2, fail2,true);
  return true;
}
//gridView：表格，datas：所有需要校验的数据
var calReChargeMoney = function () {
  //如果已经制证，则不再重新计算；
  if (isMakeCert()=="-1"){
    return true;
  }
  //计算前先获取一次总金额；然后再计算
  calTotalMoney();
  //实时加载本次冲抵金额
  var amountReimTotalSum = $CV("local.whBtReimburseRcmSub.totalSumFee").val();  //合计金额
  var unpaidaggregateamount = $CV("local.whBtReimburseRcmSub.unpaidAggregateAmountFee").val(); //借款未还总金额
  //如果报销币种与本位币相同，才允许冲抵，否则不进行冲抵；
  var standMoney       = $CV("local.whBtReimburse.standardmoney").val();
  var rbStandMoney     = $CV("local.whBtReimburse.reimbStandardMoney").val();
  
  if (standMoney!=null && standMoney!="" &&  rbStandMoney!=null &&  rbStandMoney!="" && standMoney==rbStandMoney) {
    if (unpaidaggregateamount == null||unpaidaggregateamount==0)
    {
      $CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val(0);             //本次冲抵金额
      $CV("local.whBtReimburseRcmSub.defraySum").val(amountReimTotalSum);
    }
    else if ((unpaidaggregateamount-0!=0)&&(amountReimTotalSum-0)>=(unpaidaggregateamount-0))
    {
      $CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val(unpaidaggregateamount);
      $CV("local.whBtReimburseRcmSub.defraySum").val((amountReimTotalSum-0)-(unpaidaggregateamount-0));
    }
    else if ((unpaidaggregateamount-0!=0)&&(amountReimTotalSum-0)<=(unpaidaggregateamount-0))
    {
      $CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val(amountReimTotalSum);
      $CV("local.whBtReimburseRcmSub.defraySum").val(0);
    }
  } else {
    $CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val(0);      //本次冲抵金额
    $CV("local.whBtReimburseRcmSub.defraySum").val(amountReimTotalSum);
  }
  return true;
}
/*
1.gridView : current grid view object
         2.stage :stage of editing (0-before start[can be canceled if returns false],1- the editor is opened,2- the editor is closed)
         3.rId : id of the row
         4.cInd : index of the cell
         5.nValue :new value (only for the stage 2)
         6.oValue :old value (only for the stage 2)
*/
/**差旅费明细行编辑功能校验**/
function onSubEditCell(gv,stage,rId,cInd,nValue,oValue){
  
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  
  if (isMakeCert()=="-1"){
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");    //已经制证不允许修改
    return obj;
  }
  
  if (stage!=2) {
    obj.resultFlag = true;
    obj.resultMes ="";
    return obj;
  }
  
  var regExpObject = new RegExp("^[1-9][0-9]*\\.[0-9]{1,2}$|^0\\.[0-9]{1,2}$|^[1-9][0-9]*$|^0$");
  if (!regExpObject.test(nValue)) {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.srzqsjbxje");   //输入正确的实际报销金额
    return obj;
  }
  
  var data        = gv.retrieveDataByIdFromGrid(rId,true,true);
  var billssum    = data.billssum;//申请报销金额
  var actReimbSum = data.actualremibursesum;//实际报销金额
  var noTaxAmount = data.notaxamount;//不含税金额
  var tax			= data.tax;//税额
  
  if(cInd == 8) {//修改不含税金额
    if(nValue*1 + tax*1 > billssum *1) {
      obj.resultFlag = false;
      obj.resultMes = coachViewUtil.getResource("alert.information.sjjebndypmje");//实际报销金额不能大于票面金额
    }
    if(nValue*0.175 < tax*1) {
      obj.resultFlag = false;
      obj.resultMes = coachViewUtil.getResource("alert.information.secghsje");//"税额不大于17%";
    }
  }
  if(cInd == 9) {//修改税额
    if(nValue*1 + noTaxAmount*1 > billssum *1) {
      obj.resultFlag = false;
      obj.resultMes = coachViewUtil.getResource("alert.information.sjjebndypmje");//实际报销金额不能大于票面金额
    }
    if(noTaxAmount*0.175 < nValue*1) {
      obj.resultFlag = false;
      obj.resultMes = coachViewUtil.getResource("alert.information.secghsje");//"税额不大于17%";
    }
    
  }
  if(cInd == 6) {//修改出租费的实际报销金额
    if(nValue*1 > billssum *1) {
      obj.resultFlag = false;
      obj.resultMes = coachViewUtil.getResource("alert.information.sjjebndypmje");//实际报销金额不能大于票面金额
    }
  }
  /*
    if ( billssum * 1 < actReimbSum *1 ) {
        obj.resultFlag = false;
        obj.resultMes = coachViewUtil.getResource("alert.information.sjjebndypmje");  //实际报销金额不能大于票面金额
        return obj;
    }
    */
  return obj;
}
//修改报销明细，触发事件；
function onEditCell(gv,stage,rId,cInd,nValue,oValue){
  
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  
  if (isMakeCert()=="-1"){
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");    //已经制证不允许修改
    return obj;
  }
  if (stage!=2) {
    obj.resultFlag = true;
    obj.resultMes ="";
    return obj;
  }
  
  var data       = gv.retrieveDataByIdFromGrid(rId,true,true);
  var mid        = data.mid;
  var noTaxMoney = data.notincludetaxessum;
  var taxMoney   = data.taxrate;
  var reimbMoney = data.reimbursesum;
  var rate       = data.rate;

//    var mid             =$CV("local.mid").val();
//    var noTaxMoney      =$CV("CVPageTable1")._dhxGrid.cells(rId,6).getValue(); //获取不含税金额
//    var taxMoney        =$CV("CVPageTable1")._dhxGrid.cells(rId,7).getValue(); //获取税额
//    var reimbMoney      =$CV("CVPageTable1")._dhxGrid.cells(rId,8).getValue(); //申请报销金额
//    var rate            =$CV("CVPageTable1")._dhxGrid.cells(rId,15).getValue(); //汇率
  //var realReimbMoney  =$CV("CVPageTable1")._dhxGrid.cells(rId,10).getValue;//实际报销金额
  if (mid==null || mid=="") {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.chooseDetails");    //请选择一条报销明细
    return obj;
  }
  
  if (noTaxMoney==null || noTaxMoney=="") {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.information.bhsjebnwkbnwl");    //不含税金额不能为空
    return obj;
  }
  if (taxMoney==null || taxMoney=="") {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.information.sebnwkbnwl");     //税额不能为空
    return obj;
  }
  if(noTaxMoney.length >10){
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.information.bhsjedcdbncgs");   //"不含税金额长度不能超过10位!"
    return obj;
  }
  var regExpObject = new RegExp("^[1-9][0-9]*\\.[0-9]{1,2}$|^0\\.[0-9]{1,2}$|^[1-9][0-9]*$|^0$");
  if (!regExpObject.test(noTaxMoney)) {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.srzqbhsje");   //请输入正确的不含税金额
    return obj;
  }
  if (!regExpObject.test(taxMoney)) {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.srzqse");     //请输入正确的税额
    return obj;
  }
  if (taxMoney*1 > noTaxMoney*1*0.175) {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.information.secghsje");  //税额不能超过不含税金额的17%,请修改
    return obj;
  }
  if (((noTaxMoney*100 + taxMoney*100)/100).toFixed(2)*1 > reimbMoney*1){
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.information.sjbxjebndybxje");   //实际报销金额不能大于申请报销金额
    return obj;
  }
  
  //更新制证明细
  updateCardMakingSumByMid(mid,noTaxMoney,taxMoney);
  
  var count=$CV("local.count").val();
  
  if (count=="0") {
    obj.resultFlag = false;
    obj.resultMes = coachViewUtil.getResource("alert.gxzzmxbsb");   //更新制证明细表失败
    return obj;
  }
  
  
  var realReimbMoney = (noTaxMoney*1) + (taxMoney*1);
  var chgActReimbMoney = (realReimbMoney * rate ).toFixed(2);
  $CV("CVPageTable1")._dhxGrid.cells(rId,9).setValue(realReimbMoney);
  $CV("CVPageTable1")._dhxGrid.cells(rId,14).setValue(chgActReimbMoney);
  //刷新制证grid数据；
  //$CV("CVPageTable1").refreshCurData();
  
  //重新计算页面可冲抵、应支付金额等;
  calReChargeMoney();
  
  obj.resultFlag = true;
  obj.resultMes = "";
  return obj;
}
//更新制证明细函数
function updateCardMakingSumByMid(mid,noTaxMoney,taxMoney){
  var params="{'mid':'"+mid+"','notCesse':'"+noTaxMoney+"','cesse':'"+taxMoney+"'}";
  var success = function(result){
    var count=result.data.data.status +"";
    $CV("local.count").val(count);   //记录该临时变量，在调用函数中校验，如果count=0,则更新异常；
  };
  var fail = function(error){
    
    $CV("local.count").val("0");
    dhtmlx.alert(coachViewUtil.getResource("alert.ydjkmyc"));   //检查已登记科目信息时出现异常
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_UpdateCardMakingByMid",params,success,fail,true);
}
//是否已经制证，在多个事件中调用
function isMakeCert(){
  var certificateNo=$CV("local.whBtReimburseRcmSub.certificateNo").val();
  if (certificateNo!=null && certificateNo!="") {
    return "-1";
  }
  return "0";
}
//费用岗增加行项目
function insertNewRecord(gv,data){
  
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.yzzbyxtj"));   //已经制证,不允许添加
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.yzzbyxtj");  //已经制证,不允许添加
    return obj;
  }
  
  var mid   =$CV("local.mid").val();
  if (mid==null || mid=="" ) {
    dhtmlx.alert(coachViewUtil.getResource("alert.chooseDetails"));   //请选择一条报销明细
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.chooseDetails");  //请选择一条报销明细
    return obj;
  }
  var params="{'mid':'"+mid+"'}";
  var success = function(result){
    //dhtmlx.alert("success");
  };
  var fail = function(error){
    
    dhtmlx.alert(coachViewUtil.getResource("alert.tjhjlyc"));    //添加行记录时出现异常
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.tjhjlyc");            //添加失败
    return obj;
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_InsertCardMakingByMid",params,success,fail,true);

//刷新制证grid数据；
  $CV("CVPageTable2").refreshCurData();
  
  obj.resultFlag=true;
  obj.resultMes =coachViewUtil.getResource("alert.tjsb");    //添加失败
  return obj;
  
}

function setSubjectCode(obj){
  $CV("local.whVbtReimburseRcmDetails.subjectcode").val(obj.budgetSubjectCode);
  $CV("local.whVbtReimburseRcmDetails.accountingsubject").val(obj.budgetSubjectName);
  return obj;
}
//设置科目选择参数
function setInputSubject(){
  
  var companycode       =$CV("local.whBtReimburseRcmSub.companycode").val();
  var costingCenterCode = $CV("local.whVbtReimburseRcmDetails.costcentercode").val();
  var inwardOrderCode   = $CV("local.whVbtReimburseRcmDetails.ordercode").val();
  
  if (costingCenterCode == null || costingCenterCode==""
    || inwardOrderCode==null || inwardOrderCode==""){
    dhtmlx.alert(coachViewUtil.getResource("alert.sjxzxgjl"));           //请先双击选择要修改的记录
    return false;
  }
  
  var obj={};
  obj.companyCode       = companycode;
  obj.costingCenterCode = costingCenterCode;
  obj.inwardOrderCode   = inwardOrderCode;
  
  var inputParameter = JSON.stringify(obj);
  
  $CV("local.subject").options("inputObject",inputParameter);
  return true;
}

function checkBeforeDelete(){
  var obj={};
  obj.resultFlag=true;
  obj.resultMes ="";
  if (isMakeCert()=="-1"){
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzwfsc");    //已经制证,不允许删除
    return obj;
  }
  return obj;
}
//点击保存按钮前校验
function checkBeforeSave(gv,data){
  
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.information.yjzzbyxxg"));    //已经制证,不允许修改
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.yzzbyxtj");   //已经制证,不允许添加
    return obj;
  }
  
  var noTaxMoney=$CV("local.whVbtReimburseRcmDetails.notincludetaxessum").val();
  var taxMoney=$CV("local.whVbtReimburseRcmDetails.taxrate").val();
  var obj={};
  if (noTaxMoney==null){
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.information.bhsjebnwkbnwl");         //不含税金额不能为空
    return obj;
  }
  if (taxMoney==null){
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.information.sebnwkbnwl");          //税额不能为空
    return obj;
  }
  
  if (taxMoney*1>noTaxMoney*0.175) {
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.information.secghsje");  //税额不能大于不含税金额的17%
    return obj;
  }
  obj.resultFlag=true;
  obj.resultMes ="";
  return obj;
}

//制证前数据校验
function checkBeforeCmaking(){
  //检查是否已经制证：
  var tsId     =$CV("local.ts_id").val();
  //var rowCount =$CV("local.certGrid")._dhxGrid.getRowsNum();
  var rowCount = $CV("CVPageTable2").callAjaxRetrieveAllData($CV("CVPageTable2").options("searchClause")).length;
  var postDate =$CV("local.whBtReimburseRcmSub.postingdate").val();
  //先给检查结果置为通过pass
  $CV("local.checkResult").val("pass");
  
  if (rowCount==null || rowCount=="" || rowCount==0) {
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.noMakingCardDetails"));   //没有制证明细,请检查
    return;
  }
  if (postDate==null || postDate=="") {
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.information.gzrqbnwk"));    //过账日期不能为空
    return;
  }
  callAjaxCheckMoney(tsId);
  return;
}
//显示错误信息
function alertInfo(){
  var info=$CV("local.checkResult").val();
  if (info!="pass"){
    var mLan=coachViewUtil.getResource("alert.information."+info);
    if (mLan!=null && mLan!="" && mLan!=undefined) {
      dhtmlx.alert(mLan);
    }else {
      dhtmlx.alert(info);
    }
    return "-1";
  }
  return "0";
}
//制证主函数
function cMakingMain(){
  
  var rate = $CV("local.whBtReimburse.rate").val();
  //获取报销明细税额总和
  var reimburseDetails = [];
  var taxSum = 0;
  var noTaxSum = 0;
  var subActSum = 0;
  reimburseDetails = $CV("CVPageTable1").callAjaxRetrieveAllData($CV("CVPageTable1").options("searchClause"));
  for(var i=0; i<reimburseDetails.length; i++) {
    taxSum += reimburseDetails[i].taxrate * 100;
    noTaxSum += reimburseDetails[i].notincludetaxessum * 100;
    subActSum += reimburseDetails[i].actualreimbursesum * 100;
  }
  
  //获取转出税额总和
  var reimburseCertDetails = [];
  var transferTaxSum = 0;
  var certActSum = 0;
  var certTaxSum = 0;
  var certNoTaxSum = 0;
  reimburseCertDetails = $CV("CVPageTable2").callAjaxRetrieveAllData($CV("CVPageTable2").options("searchClause"));
  for(var i=0; i<reimburseCertDetails.length; i++) {
    transferTaxSum += reimburseCertDetails[i].transferTaxBx * 100;
    certTaxSum += reimburseCertDetails[i].taxrateBx * 100;
    certActSum += reimburseCertDetails[i].notincludetaxessumBx * 100 + reimburseCertDetails[i].taxrateBx * 100;
    certNoTaxSum += reimburseCertDetails[i].notincludetaxessumBx * 100;
  }
  
  //获取费用分摊表
  
  var costShareData = [];
  var costNoTaxSum = 0;
  var costTaxSum = 0;
  /*
    costShareData = $CV("CostShareTable").callAjaxRetrieveAllData($CV("CostShareTable").options("searchClause"));
    for(var i=0; i<costShareData.length; i++) {
        costNoTaxSum += costShareData[i].notaxamountCurrency * 100;
        costTaxSum += costShareData[i].taxCurrency * 100;
    }
    */
  var tsId = $CV("local.hsInput").options("bpmCoreData").ts_piid;
  var para = {};
  para.tsId = tsId;
  var success = function(result) {
    
    for(var i=0; i<result.data.data.costShareDatas.items.length; i++) {
      costNoTaxSum += result.data.data.costShareDatas.items[i].notaxamount * 100;
      costTaxSum += result.data.data.costShareDatas.items[i].tax * 100;
    }
  }
  var fail = function(error) {};
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_GetCostShareData", para, success, fail, true);
  
  //费用分摊表、明细表、制证表三个表的实际报销金额一致
  var costShareActSum = $CV("local.whBtReimburse.costshareActtotalsum").val() * 100;
  /*if((subActSum.toFixed(2)*1 != certActSum.toFixed(2)*1) || (subActSum.toFixed(2)*1 != costShareActSum.toFixed(2)*1)) {
    dhtmlx.alert(coachViewUtil.getResource("alert.actSumNotSame"));//"费用分摊表、制证信息表、报销明细表三个表的实际报销金额不一致，请检查！")
    return false;
  }*/
  
  //费用分摊表、明细表的税额之和、不含税金额之和一致
  /*if((taxSum.toFixed(2)*1 != costTaxSum.toFixed(2)*1) || (noTaxSum.toFixed(2)*1 != costNoTaxSum.toFixed(2)*1)) {
    dhtmlx.alert(coachViewUtil.getResource("alert.costShareVerifyDetailsFail"));
    return false;
  }*/
  
  //转出税额总和<=税额总和
  if(transferTaxSum.toFixed(2)*1 > taxSum.toFixed(2)*1) {
    dhtmlx.alert(coachViewUtil.getResource("alert.transferTaxNotRight"));//转出税额总和不能大于税额总和
    return false;
  }
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.bncfzz"));    //已经制证,不允许再次制证
    return obj;
  }
  //1、检查
  $CV("CVPageLoading1").visibility("E");
  checkBeforeCmaking();
  //检查失败，则不再执行；
  if (alertInfo()=="-1")
  {
    $CV("CVPageLoading1").visibility("H");
    return;
  }
  //保存冲减信息；
  saveDataBeforeMakeCert();
  //保存失败，不再执行
  if (alertInfo()=="-1")
  {
    $CV("CVPageLoading1").visibility("H");
    return;
  }
  //调用接口制证
  makeCert();
  if (alertInfo()=="-1")
  {
    $CV("CVPageLoading1").visibility("H");
    return;
  }
  $CV("CVPageLoading1").visibility("H");
  dhtmlx.alert(coachViewUtil.getResource("alert.information.zzcg"));   //"制证成功"
  //return;
}
//通过AJAX调用检查单据金额数据是否正确;
function callAjaxCheckMoney(tsId){
//	var params="{'tsId':'"+tsId+"'}";
  var params = {"tsId" : tsId , "userId" : "proc"};
  var success = function(result){
    var ret=result.data.data.ret;
    var retMsg=result.data.data.retMsg;
    /*if (ret!="pass") {
      $CV("local.checkResult").val(retMsg);
    }*/
  };
  var fail = function(error){
    
    dhtmlx.alert(coachViewUtil.getResource("alert.pzjeyc"));   //调用服务检查凭证金额时出现异常
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.pzjeyc"));  //调用服务检查凭证金额时出现异常
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_CheckReimburseByTsId",params,success,fail,true);
}
//通过AJAX调用接口进行制证操作;
function makeCert(){
  
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.bncfzz"));   //已经制证,不允许重复制证
    return;
  }
  
  var tsId = $CV("local.ts_id").val();
  var againstsum = $CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val();
  
  if (againstsum==null || againstsum=="") {
    againstsum="0";
  }
  
  var params = {"tsId" : tsId , "againstsum" : againstsum };
  
  var success = function(result){
    var ret=result.data.data.ret;
    var msg=result.data.data.msg;
    var certNo = result.data.data.certNo;
    
    if (ret=="S") {
      $CV("local.whBtReimburseRcmSub.certificateNo").val(certNo);
      $CV("local.checkResult").val("pass");
    }else{
      $CV("local.checkResult").val(msg);
    }
    //transfer tax by yangyangd 20160922[S]
    $CV("CVPageTable2")._dhxGrid.setColumnExcellType("13","ro");
    //transfer tax by yangyangd 20160922[E]
  };
  var fail = function(error){
    
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.zzyc"));   //制证时出现异常
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_MakeCertByTsId",params,success,fail,true);
  
}
//驳回影像链接
function rejectPicLink(){
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.yzzbyxbhyx"));   //已经制证,不允许驳回影像
    return false;
  }
  var tsId    = $CV("local.ts_id").val();
  var picLink = $CV("local.whBtReimburse.processlinkopentext").val();
  
  if (picLink==null || picLink==""){
    dhtmlx.alert(coachViewUtil.getResource("alert.noPicture"));    //无影像可驳回
    return false;
  }
  var params="{'tsId':'"+tsId+"'}";
  var success = function (data) {
    if (data && data.data && data.data.data) {
      var ret = data.data.data.ret;
      var msg = data.data.data.msg;
      if (ret == 'S') {
        $CV("local.whBtReimburse.processlinkopentext").val("");
        $(".CVPageATag.CoachView.CoachView_show").children()[1].innerHTML = "";//驳回影像清空
        dhtmlx.alert(coachViewUtil.getResource("alert.rejectPictureY"));   //驳回影像成功
      }else {
        dhtmlx.alert(msg);
      }
    }
  };
  var fail = function (data) {
    console.error("AJAX_rejectPictureLink", data);
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_rejectReimPicLink", params, success, fail, true);
}
//修改grid中的cell或者修改孙子表后，重新计算合计报销金额,重新计算页面上的应支付金额等
function calTotalMoney(){
  var tsId = $CV("local.ts_id").val();
  var params="{'tsId':'"+tsId+"'}";
  var success = function(result){
    var amountSum=result.data.data.amountSum;
    $CV("local.whBtReimburseRcmSub.totalSumFee").val(amountSum);
    $CV("local.checkResult").val("pass");
  };
  var fail = function(error){
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.jssjbxjesb"));   //计算实际报销金额时失败
    
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_ReimburseTotalSum",params,success,fail,true);
}
//设置选中的报销明细对应的mid值；保存时使用；
function setMidValue(gv,rId,cId){
  
  var data       = gv.retrieveDataByIdFromGrid(rId,true,true);
  
  var travelarea = data.travelarea;
  travelarea=chgTravelArea(travelarea);
  
  $CV("local.travelarea").val(travelarea);
  
}

function setCertMid(gv,rId,cId) {
  var data       = gv.retrieveDataByIdFromGrid(rId,true,true);
  var mid        = data.mid;
  $CV("local.mid").val(mid);
}

//对于获取的出差地区，进行转换；
function chgTravelArea(area){
  var retArea=area;
  if (area=="FN" || area=="Other(s)" ){
    retArea="FN";
  } else {
    retArea="IN";
  }
  return retArea;
}
//从报销明细---孙子表中设置选中对应的mid值；保存时使用；
function setChildMidValue(gv,rId,cId){
  
  var data = gv.retrieveDataByIdFromGrid(rId,true,true);
  var mid  = data.mid
  $CV("local.mid").val(mid);
  $CV("local.selectSubject").val("");
  //根据孙子表mid，查找父亲对应的出差地区；
  var idStr = $CV("CVPageTable1")._dhxGrid.getAllRowIds();
  if(idStr == null || idStr == ""){
    return ;
  }
  var ids = idStr.split(",");
  for(var i=0; ids&& i<ids.length;i++){
    
    var tmpMid =$CV("CVPageTable1")._dhxGrid.cells(ids[i],0).getValue();
    if (mid==tmpMid ) {
      var travelArea= $CV("CVPageTable1")._dhxGrid.cells(ids[i],12).getValue(); //出差地区列
      var selectSubject =  $CV("CVPageTable1")._dhxGrid.cells(ids[i],4).getValue(); //科目代码列
      travelArea=chgTravelArea(travelArea);
      $CV("local.travelarea").val(travelArea);
      $CV("local.selectSubject").val(selectSubject);
    }
  }
  
}
//保存时重新获取差旅费对应的mid；
function getMidValue(){
  var subjectCode="";
  var travelArea="";
  var mid="";
  var idStr = $CV("CVPageTable1")._dhxGrid.getAllRowIds();
  if(idStr == null || idStr == ""){
    return ;
  }
  var ids = idStr.split(",");
  for(var i=0; ids&& i<ids.length;i++){
    
    mid        =$CV("CVPageTable1")._dhxGrid.cells(ids[i],0).getValue();
    subjectCode=$CV("CVPageTable1")._dhxGrid.cells(ids[i],4).getValue();
    travelArea = $CV("CVPageTable1")._dhxGrid.cells(ids[i],12).getValue();
    if (subjectCode==stdSubjectCode1 || subjectCode== stdSubjectCode2) {
      travelArea=chgTravelArea(travelArea);
      $CV("local.travelarea").val(travelArea);
      $CV("local.mid").val(mid);
    }
  }
  
}
//保存前检查数据
function checkedBeforeSave(gridView,datas,flag){
  //保存前重新获取mid；
  getMidValue();
  
  var mid = $CV("local.mid").val();
  var tsId=$CV("local.ts_id").val();
  var obj={};
  
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.information.yjzzbyxxg"));     //已经制证,不允许修改
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");    //已经制证,不允许修改
    return;
  }
  
  if (mid==null || mid=="") {
    obj.resultFlag=false;
    obj.resultMes =coachViewUtil.getResource("alert.chooseDetails");     //请选择一条报销明细
    return obj;
  }
  for(var i = 0 ;  i < datas.length ; i ++) {
    datas[i].tsId = tsId;
    datas[i].mid  = mid;
  }
  obj.resultFlag=true;
  obj.resultMes ="";
  return obj;
}
//保存、删除后重新计算；
//step1:重新计算孙子表合计
//step2:更新孙子表合计到父亲表上
//step3：更新制证表上对应的不含税金额
//step4:重新获取总的报销金额；给页面上报销金额
//step5:重新计算借款冲抵金额，应支付金额；
//step5：刷新两个table:
function reCalMain(gridView,datas){
  updateReimburseSumByMid();
  //检查失败，则不再执行；
  if (alertInfo()=="-1")  {
    return datas;
  }
  calReChargeMoney();
  if (alertInfo()=="-1")  {
    return datas;
  }
  //刷新报销明细；
  $CV("CVPageTable1").refreshCurData();
  //刷新费用岗明细；
  $CV("CVPageTable2").refreshCurData();
  gridView.refreshCurData();
  return datas;
}
//完成step1、step2、step3；
function updateReimburseSumByMid(){
  var mid = $CV("local.mid").val();
  var params = {"mid" : mid};
  var success = function(result){
    
    $CV("local.checkResult").val("pass");
  };
  var fail = function(error){
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.jssjbxjeFail"));   //更新报销明细及制证信息时失败
    
  };                                         //AJAX_UpdateReimburseDetailsSumByMid 修改为AJAX_UpdateReimDetailsSumByMidFee
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_UpdateReimDetailsSumByMidFee",params,success,fail,true); //2016-04-25修改，费用岗不修改申请报销金额；
  return true;
}
//***设置补贴标准实际报销金额，在票面金额的onblur事件中触发,费用岗调用；
function feeCalStdActulaReim(){
  var value=$CV("local.whBtTravelsubsidydetails.subsidycriteria").val();
  var area =  $CV("local.travelarea").val();
  calTravlActualReimbursesum("subsidycriteria",value,area);
}
//***根据补贴天数设置实际报销金额，在报销天数的onblur事件中触发,费用岗调用；
function feeCalDaysActulaReim(){
  var value=$CV("local.whBtTravelsubsidydetails.subsidydays").val();
  var area =$CV("local.travelarea").val();
  calTravlActualReimbursesum("subsidydays",value,area);
}
//***费用岗修改权限
function onFeeEditCell(gv,stage,rId,cInd,nValue,oValue){
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  
  if (isMakeCert()=="-1"){
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");   //已经制证不允许修改
    return obj;
  }
  
  if (stage!=2) {
    obj.resultFlag = true;
    obj.resultMes ="";
    return obj;
  }
  var data             = gv.retrieveDataByIdFromGrid(rId,true,true);
  var accoutingsubject = data.accoutingsubject;
  var subjectcode       = data.subjectcode;
  
  if(cInd == 13) {
    var params 		   = {};
    params.transferTax = data.transferTaxBx;
    params.rate		   = $CV("local.whBtReimburse.rate").val();
    params.mmid		   = data.mmid;
    var success = function(result){};
    var fail = function(error){};
    coachViewUtil.callAjaxByServiceName("PREXPR@Ajax_UpdateCertTransfer",params,success,fail,true);
    $CV("CVPageTable2").refreshCurData();
  }
  
  if (accoutingsubject!=null && accoutingsubject!=""){
    if (accoutingsubject.length>20) {
      obj.resultFlag = false;
      obj.resultMes =coachViewUtil.getResource("alert.hskmLength");   //核算科目不能超过20位长度
      return obj;
    }
  }else {
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.kmdmbuwk");    //核算科目不能为空
    return obj;
  }
  if (subjectcode!=null && subjectcode!=""){
    if (subjectcode.length>12) {
      obj.resultFlag = false;
      obj.resultMes =coachViewUtil.getResource("alert.information.kmdmbxssew");   //核算科目代码不能超过12位长度
      return obj;
    }
  }else{
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.kmdmbuwk");  //核算科目代码不能为空
    return obj;
  }
  return obj;
}
//***费用岗修改差率补贴前检查
function checkCLBTBeforeDo(){
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  
  if (isMakeCert()=="-1"){
    obj.resultFlag = false;
    obj.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");   //已经制证不允许修改
    return obj;
  }
  //删除前重新获取mid；
  getMidValue();
  
  return obj;
}
//驳回校验
window.rejectCheck = function(){
  if (isMakeCert()=="-1"){
    dhtmlx.alert(coachViewUtil.getResource("alert.info.carddebt.no.reject"));     //已经制证,不允许驳回
    return false;
  }else{
    return true;
  }
}
//制证前保存已计算冲减数据等；
function saveDataBeforeMakeCert(){
  var tsId=$CV("local.ts_id").val();
  var date=$CV("local.whBtReimburseRcmSub.postingdate").val();
  var defraySum                =$CV("local.whBtReimburseRcmSub.defraySum").val();  //应支付金额
  var totalSumFee              =$CV("local.whBtReimburseRcmSub.totalSumFee").val();   //实际报销金额
  var chargeAgainstSumFee      =$CV("local.whBtReimburseRcmSub.chargeAgainstSumFee").val();  //本次冲减金额
  var unpaidAggregateAmountFee =$CV("local.whBtReimburseRcmSub.unpaidAggregateAmountFee").val(); //借款未还金额
  
  var postingDate=caclDay(date);
  var params="{'tsId':'"+tsId+"','postingDate':'"+postingDate+"','defraySum':'"+defraySum+"','totalSumFee':'"+totalSumFee+"','chargeAgainstSumFee':'"+chargeAgainstSumFee+"','unpaidAggregateAmountFee':'"+unpaidAggregateAmountFee+"'}";
  var success = function(result){
    var count=result.data.data.count;
    /*if ( count==null || count=="" || count=="0" ) {
      $CV("local.checkResult").val(coachViewUtil.getResource("alert.gxzzsjyc"));  //更新制证数据时异常 //如果count=0,则更新异常；
    }else{*/
      $CV("local.checkResult").val("pass");
    /*}*/
  };
  var fail = function(error){
    
    $CV("local.checkResult").val(coachViewUtil.getResource("alert.szbxkbjsxyc"));   //更新制证数据时异常
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_UpdateBeforeMakeCert",params,success,fail,true);
}
//设置费用岗显示隐藏属性;
function setFeePostionEnabled(){
  //transfer tax by yangyangd 2016-9-22 [S]
  if (isMakeCert()=="-1"){
    $CV("CVPageTable2")._dhxGrid.setColumnExcellType("13","ro");
  }
  //transfer tax by yangyangd 2016-9-22 [E]
  var hsInput = JSON.parse($CV("local.hsInput").val());
  var hsInputPara = JSON.parse(hsInput.para);
  var taskType = hsInputPara.taskType;//任务类型(0:申请,1:待办,2:加签,3:转办,4：任务池,5:流程管理替换处理人 )
  //控制费用岗按钮显示隐藏；
  if (taskType=="2") {
    //费用岗grid隐藏增删改；
    $CV("CVPageTable2").context.element.querySelector("[title='makeCert']").style.display='none';
    $CV("CVPageTable2").context.element.querySelector("[title='addNewRecord']").style.display='none';
    $CV("CVPageTable2").context.element.querySelector("[title='update']").style.display='none';
    $CV("CVPageTable2").context.element.querySelector("[title='del']").style.display='none';
    //报销明细grid隐藏增删改；
    $CV("CVPageTable6").context.element.querySelector("[title='add']").style.display='none';
    $CV("CVPageTable6").context.element.querySelector("[title='update']").style.display='none';
    $CV("CVPageTable6").context.element.querySelector("[title='del']").style.display='none';
    //预算分摊grid隐藏增删改；
    $CV("CostShareTable").context.element.querySelector("[title='add']").style.display='none';
    $CV("CostShareTable").context.element.querySelector("[title='update']").style.display='none';
    $CV("CostShareTable").context.element.querySelector("[title='del']").style.display='none';
  }else {
    /*
      $CV("CVPageTable2").context.element.querySelector("[title='makeCert']").style.display='';
      $CV("CVPageTable2").context.element.querySelector("[title='addNewRecord']").style.display='';
      $CV("CVPageTable2").context.element.querySelector("[title='update']").style.display='';
      $CV("CVPageTable2").context.element.querySelector("[title='del']").style.display='';
      */
  }
  //设置grid列不可编辑;
  if (taskType=="2"){
    //报销明细表
    var cols = [6,7];
    var gv=$CV("CVPageTable1");
    setGridDisabled(gv,cols);
    //设置制证表可编辑字段颜色
    var cols = [9,12];
    var gv=$CV("CVPageTable2");
    setGridDisabled(gv,cols);
    //设置报销明细_车船费字段颜色
    var cols=[8, 9];
    var gv=$CV("TravelTable");
    setGridDisabled(gv,cols);
    //设置报销明细_住宿费实际报销金额颜色
    var cols=[8,9];
    var gv=$CV("StayTable");
    setGridDisabled(gv,cols);
    //设置报销明细_出租费实际报销金额颜色
    var cols=[6];
    var gv=$CV("CVPageTable5");
    setGridDisabled(gv,cols);
    //设置预算分摊字段颜色
    var cols=[9, 10];
    var gv=$CV("CostShareTable");
    setGridDisabled(gv,cols);
  }
  //设置驳回影像按钮,以及grid上明细信息部分不可编辑
  if (taskType=="2"){
    $CV("CVPageConfirmButton1").visibility("R");
    
    $CV("CVPageUlLi19").visibility("R");
    $CV("CVPageUlLi20").visibility("R");
    
    $CV("CVPageUlLi32").visibility("R");
    $CV("CVPageUlLi35").visibility("R");
    $CV("CVPageUlLi36").visibility("R");
  }else {
    $CV("CVPageConfirmButton1").visibility("E");
    $CV("CVPageUlLi19").visibility("E");
    $CV("CVPageUlLi20").visibility("E");
    
    $CV("CVPageUlLi32").visibility("E");
    $CV("CVPageUlLi35").visibility("E");
    $CV("CVPageUlLi36").visibility("E");
  }
}
//设置grid不可编辑；
function setGridDisabled(gridView,cols){
  var idStr = gridView._dhxGrid.getAllRowIds();
  if(idStr == null || idStr == ""){
    return ;
  }
  var ids = idStr.split(",");
  for(var i=0; ids&& i<ids.length;i++){
    for(var j = 0; j< cols.length; j++){
      gridView._dhxGrid.setCellExcellType(ids[i],cols[j],"ron");
      gridView._dhxGrid.setCellTextStyle(ids[i],cols[j],"color:black");
    }
  }
}

/**
 * 费用分摊表格编辑表格内容的操作
 *@author yangyangd
 * 2016-01-04
 
 *方法描述
 *@param gridView:grid
 */
function costShareOnEditCurWriteOffBackFun(gridView, stage, rid, cInd, nValue, oValue) {
  var result = {
    resultFlag : true,
    resultMes : ""
  };
  if (isMakeCert()=="-1") {
    result.resultFlag = false;
    result.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");    //已经制证不允许修改
    return result;
  }
  if (stage == 2) {
    var reg = new RegExp("^[1-9][0-9]*\\.[0-9]{1,2}$|^0\\.[0-9]{1,2}$|^[1-9][0-9]*$|^0$");
    if(!reg.test(nValue)) {
      result.resultFlag = false;
      //result.resultMes = "必须输入正浮点数";
      result.resultMes = coachViewUtil.getResource("alert.posFloat");
    }
    if(result.resultFlag == true) {
      var rowData = [];
      rowData[0] = $CV("CostShareTable").retrieveDataByIdFromGrid(rid, true, true);
      if(cInd == 9) {//修改不含税金额
        if(nValue*0.175 < rowData[0].tax*1) {
          result.resultFlag = false;
          result.resultMes = coachViewUtil.getResource("alert.information.secghsje");//"税额不大于17%";
        }
      }
      if(cInd == 10) {//修改税额
        if(rowData[0].notaxamount*0.175 < nValue*1) {
          result.resultFlag = false;
          result.resultMes = coachViewUtil.getResource("alert.information.secghsje");//"税额不大于17%";
        }
      }
      /*
            if(rowData[0].notaxamountCurrency*1+rowData[0].taxCurrency*1 > rowData[0].reimbursesumCurrency) {//实际报销金额不能大于申请金额
                result.resultFlag = false;
                result.resultMes = coachViewUtil.getResource("alert.information.sjbxjebndybxje");//"实际报销金额不能大于申请金额";
            }
            */
      if(result.resultFlag == true) {
        var params = {};
        params.mid = rowData[0].mid;
        params.notaxamount = (cInd == 9 ? nValue : rowData[0].notaxamount*1);
        params.tax = (cInd == 10 ? nValue : rowData[0].tax*1);
        params.type = "FEE";
        params.rate = $CV("local.whBtReimburse.rate").val()*1;
        var success = function (data) {};
        var fail = function (error) {};
        coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_CalReimburseSum", params, success, fail, true);
        //修改费用分摊表一起修改相应的制证表 yangyangd 2017-3-13【S】
        //updateCardMakingSumByMid(rowData[0].mid, rowData[0].notaxamountCurrency, rowData[0].taxCurrency);
        //修改费用分摊表一起修改相应的制证表 yangyangd 2017-3-13【E】
      }
    }
  }
  return result;
}

//计算预算分摊实际报销金额总和
function calCostShareActSum(gridView, datas) {
  var tsId = $CV("local.ts_id").val();
  var params = {};
  params.tsId = tsId;
  var success = function(data) {
    var actSum = data.data.data.actSum;
    $CV("local.whBtReimburse.costshareActtotalsum").val(actSum*1);
    //$CV("CVPageTable2").refreshCurData();
  };
  var fail = function(error) {};
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_CalCostShareActSum", params, success, fail, true);
  var param = {};
  param.tsId = $CV("local.hsInput").options("bpmCoreData").ts_piid;
  var success1 = function (data) {
    $CV("CVPageTable2").refreshCurData();
  };
  var fail1 = function (error) {};
  if (isMakeCert()!="-1") {
    coachViewUtil.callAjaxByServiceName("PREXPR@Ajax_AddCarkMaking", param, success1, fail1, true);
  }
  return datas;
}

/**
 * 费用分摊表格中可编辑格变蓝色
 *@author yangyangd
 * 2015-11-05
 
 *方法描述
 *@param gridView:grid
 *@return datas：当前页的数据
 */
/*
function costShareRowColorChange(gridView) {
	var idStr = gridView._dhxGrid.getAllRowIds();
	if(idStr == null || idStr == ""){
		return ;
	}
	var ids = idStr.split(",");
	for(var i=0; ids&& i<ids.length;i++){
		gridView._dhxGrid.setCellTextStyle(ids[i], 9, "color:blue");
		gridView._dhxGrid.setCellTextStyle(ids[i], 10, "color:blue");
	}
}
*/
//预算分摊表新增修改校验
function costShareValFun(gridView, data) {
  var result = {resultFlag: true, resultMes:''};
  if (isMakeCert()=="-1") {
    result.resultFlag = false;
    result.resultMes =coachViewUtil.getResource("alert.information.yjzzbyxxg");    //已经制证不允许修改
    return result;
  }
  if(data.notaxamountCurrency*1 <= 0) {
    result = {resultFlag : false, resultMes : coachViewUtil.getResource("alert.information.bhsjebnwkbnwl")};
  }
  if(data.notaxamountCurrency*0.175 < data.taxCurrency*1) {
    result = {resultFlag : false, resultMes : coachViewUtil.getResource("alert.information.secghsje")};
  }
  if(data.notaxamountCurrency*1+data.taxCurrency*1 > data.reimbursesumCurrency) {
    result = {resultFlag : false, resultMes : coachViewUtil.getResource("alert.notEalTaxPlusAmount")};//"税额和不含税之和不能大于申请报销金额"
  }
  return result;
}

//预算分摊表删除校验
function costShareDelVal() {
  var result = {resultFlag: true, resultMes:''};
  if (isMakeCert()=="-1") {
    result.resultFlag = false;
    result.resultMes =coachViewUtil.getResource("alert.information.yjzzwfsc");    //已经制证不允许修改
    return result;
  }
  return result;
}

/**
 * 配置在费用分摊---成本中心advanceSelect的validateFun下面，点击时组装选成本中心自定制UI的输入参数
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function getCostShareCostCenterInput() {
  if ($CV("local.companyName").val().value == "" || $CV("local.companyName").val().value == undefined) {
    //dhtmlx.alert("请先选择提报公司！");
    dhtmlx.alert(coachViewUtil.getResource("alert.information.qxxzgs"));
    return false;
  } else {
    var obj = {};
    obj.companyCode = $CV("local.companyName").val().value;
    obj.userId = $CV("local.hsInput").options("bpmCoreData").creator.userId;
    var param = JSON.stringify(obj);
    $CV("local.costShareCostCenter").options("inputObject", param);
    return true;
  }
}

/**
 * 配置在费用分摊---内部订单advanceSelect的validateFun下面，点击时组装选成本中心自定制UI的输入参数
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function getInternalOrderInput() {
  if($CV("local.costShareCostCenter").val() == undefined || $CV("local.costShareCostCenter").val() == null || $CV("local.costShareCostCenter").val().value == "" || $CV("local.costShareCostCenter").val().value == undefined) {
    //dhtmlx.alert("请先选择成本中心！");
    dhtmlx.alert(coachViewUtil.getResource("alert.information.qxzcbzx"));
    return false;
  } else {
    var obj = {};
    obj.companyCode = $CV("local.companyName").val().value;
    obj.costcenterCode = $CV("local.costShareCostCenter").val().value;
    var param = JSON.stringify(obj);
    $CV("local.internalOrder").options("inputObject", param);
    return true;
  }
}

/**
 * 配置在费用分摊---科目advanceSelect的validateFun下面，点击时组装选成本中心自定制UI的输入参数
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function getSubjectInput() {
  if($CV("local.internalOrder").val() == null || $CV("local.internalOrder").val() == undefined || $CV("local.internalOrder").val().value == "" || $CV("local.internalOrder").val().value == undefined) {
    //dhtmlx.alert("请先选择内部订单！");
    dhtmlx.alert(coachViewUtil.getResource("alert.information.qxznbdd"));
    return false;
  } else {
    var obj = {};
    obj.companyCode = $CV("local.companyName").val().value;
    obj.costingCenterCode = $CV("local.costShareCostCenter").val().value;
    obj.inwardOrderCode = $CV("local.internalOrder").val().value;
    var param = JSON.stringify(obj);
    $CV("local.costShareSubject").options("inputObject", param);
    return true;
  }
}

/**
 * 配置在费用分摊---成本中心的callback下面
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function costShareCostCenterCallback() {
  $CV("local.internalOrder").val({name:"",value:""});
  $CV("local.costShareSubject").val({name:"",value:""});
  $CV("local.whBtReimburseCostshare.notaxamountCurrency").val(0);
  $CV("local.whBtReimburseCostshare.taxCurrency").val(0);
  noTaxAmountOnblur();
}

/**
 * 配置在费用分摊---内部订单的callback下面
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function internalOrderCallback() {
  $CV("local.costShareSubject").val({name:"",value:""});
  $CV("local.whBtReimburseCostshare.notaxamountCurrency").val(0);
  $CV("local.whBtReimburseCostshare.taxCurrency").val(0);
  noTaxAmountOnblur();
}

/**
 * 配置在费用分摊---科目的callback下面
 *@author yangyangd
 * 2017-02-15
 
 *方法描述
 *@param
 *@return
 */
function subjectCallback() {
  $CV("local.whBtReimburseCostshare.notaxamountCurrency").val(0);
  $CV("local.whBtReimburseCostshare.taxCurrency").val(0);
  noTaxAmountOnblur();
}

/**
 * 费用分摊保存数据格式化的方法
 *@author yangyangd
 * 2015-11-23
 
 *方法描述
 *@param gridView grid表格, datas表格中的数据
 *@return datas 格式化以后的数据
 */
function costShareFormatSaveData(gridView, datas) {
  var piId = $CV("local.hsInput").options("bpmCoreData").ts_piid;
  
  for (var i = 0; i < datas.length; i++) {
    if(!datas[i].mid){
      datas[i].mid = "";
    }
    datas[i].mid = datas[i].mid.trim();
    datas[i].tsId = piId;
    if(!datas[i].costcenterbudget) {
      datas[i].costcenterbudget = 0;
    }
  }
  return datas;
}
/**
 * 费用分摊表加载数据的方法
 *@author yangyangd
 * 2015-11-23
 
 *方法描述
 *@param
 *@return
 */
function costSharePostBpmCoreLoad() {
  
  var piId = $CV("local.hsInput").options("bpmCoreData").ts_piid;
  $CV("CostShareTable").options("searchClause", '{"sql" : "TS_ID = ?" , "parameters" : ["' + piId + '"]}');
  
  $CV("CostShareTable").refreshCurData();
}

/*
*差旅费明细表
*/
function travelFormatSaveData(gridView, datas) {
  for (var i = 0; i < datas.length; i++) {
    var reimDetailsData = gridView.retrieveDataByIdFromGrid(datas[i].mmid,true,true);
    datas[i].actualremibursesum = reimDetailsData.notaxamount*1 + reimDetailsData.tax*1;
  }
  return datas;
}

/*
*住宿费明细表
*/
function stayFormatSaveData(gridView, datas) {
  for (var i = 0; i < datas.length; i++) {
    var reimDetailsData = gridView.retrieveDataByIdFromGrid(datas[i].mmid,true,true);
    datas[i].actualremibursesum = reimDetailsData.notaxamount*1 + reimDetailsData.tax*1;
  }
  return datas;
}

function noTaxAmountOnblur() {
  var noTax = $CV("local.whBtReimburseCostshare.notaxamount").val() != null ? $CV("local.whBtReimburseCostshare.notaxamount").val() : 0;
  var tax   = $CV("local.whBtReimburseCostshare.tax").val() != null ? $CV("local.whBtReimburseCostshare.tax").val() : 0;
  var rate  = $CV("local.whBtReimburse.rate").val();
  if(noTax*0.175 < tax) {
    $CV("local.whBtReimburseCostshare.notaxamount").val(0);
    $CV("local.whBtReimburseCostshare.tax").val(0);
    noTax = 0;
    tax = 0;
    //dhtmlx.alert("税额不大于17%！");
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
  }
  $CV("local.whBtReimburseCostshare.reimbursesum").val(noTax*1+tax*1);
  $CV("local.whBtReimburseCostshare.actualreimbursesum").val(noTax*1+tax*1);
  $CV("local.whBtReimburseCostshare.notaxamountCurrency").val((noTax*1)*(rate*1));
  $CV("local.whBtReimburseCostshare.actualreimbursesumCurrency").val((noTax*1+tax*1)*(rate*1));
}
function taxOnblur() {
  var noTax = $CV("local.whBtReimburseCostshare.notaxamount").val();
  var tax = $CV("local.whBtReimburseCostshare.tax").val();
  var rate  = $CV("local.whBtReimburse.rate").val();
  if(noTax*0.175 < tax) {
    $CV("local.whBtReimburseCostshare.tax").val(0);
    $CV("local.whBtReimburseCostshare.taxCurrency").val(0);
    tax = 0;
    //dhtmlx.alert("税额不大于17%！");
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
  }
  $CV("local.whBtReimburseCostshare.actualreimbursesum").val(noTax*1+tax*1);
  $CV("local.whBtReimburseCostshare.taxCurrency").val((tax*1)*(rate*1));
  $CV("local.whBtReimburseCostshare.actualreimbursesumCurrency").val((noTax*1+tax*1)*(rate*1));
}
function transferTaxCertOnBlur() {
  var rate  = $CV("local.whBtReimburse.rate").val();
  var transferTaxBX = $CV("local.whVbtReimburseRcmDetails.transferTaxBx").val();
  $CV("local.whVbtReimburseRcmDetails.transferTax").val((transferTaxBX*1)*(rate*1));
}
function noTaxAmountCertOnBlur() {
  var rate  = $CV("local.whBtReimburse.rate").val();
  var noTaxBX = $CV("local.whVbtReimburseRcmDetails.notincludetaxessumBx").val();
  $CV("local.whVbtReimburseRcmDetails.notincludetaxessum").val((noTaxBX*1)*(rate*1));
}
function taxCertOnBlur() {
  var rate  = $CV("local.whBtReimburse.rate").val();
  var taxBX = $CV("local.whVbtReimburseRcmDetails.taxrateBx").val();
  $CV("local.whVbtReimburseRcmDetails.taxrate").val((taxBX*1)*(rate*1));
}



//--------------------------------------SSCV3.ReimburseUtil.js----------
var readOnlySubjectCode1="500307000101";
var readOnlySubjectCode2="500307000901";
//页面展开时，第一次统计孙子表合计；以后不再执行，主要是不再汇总总报销费用；
//在页面设置临时变量，在住宿费grid加载完数据后调用；
function countStayAfterRetrieve(gridView,datas) {
  var activityFlag=$CV("local.activityFlag").val();
  var selectSubject  =$CV("local.selectSubject").val();
  if (selectSubject==readOnlySubjectCode1 || selectSubject==readOnlySubjectCode2) {
    statZSF(gridView,datas);//第一次统计后置标志；后续统计时不再统计父表；
  }
  if (activityFlag=="Draft") {
    //计算总报销金额
//		statAllDetail(gridView,datas);
  }
  $CV("local.stayFirstFlag").val("nonFirst");
  return datas;
}
//在页面设置临时变量，在出租费grid加载完数据后调用；
function countTransAfterRetrieve(gridView,datas) {
  $CV("local.transFirstFlag").val("first");
  var activityFlag=$CV("local.activityFlag").val();
  var selectSubject  =$CV("local.selectSubject").val();
  if (selectSubject==readOnlySubjectCode1 || selectSubject==readOnlySubjectCode2) {
    statCZF(gridView,datas); //第一次统计后置标志；后续统计时不再统计父表；
  }
  if (activityFlag=="Draft") {
    //计算总报销金额
//		statAllDetail(gridView,datas);
  }
  $CV("local.transFirstFlag").val("nonFirst");
  return datas;
}
//在页面设置临时变量，在车船费grid加载完数据后调用；
function countFareAfterRetrieve(gridView,datas){
  $CV("local.fareFirstFlag").val("first");
  var activityFlag=$CV("local.activityFlag").val();
  var selectSubject  =$CV("local.selectSubject").val();
  if (selectSubject==readOnlySubjectCode1 || selectSubject==readOnlySubjectCode2) {
    statCCF(gridView,datas);//第一次统计后置标志；后续统计时不再统计父表；
  }
  if (activityFlag=="Draft") {
    //计算总报销金额
//		statAllDetail(gridView,datas);
  }
  $CV("local.fareFirstFlag").val("nonFirst");
  return datas;
}
//在页面设置临时变量，在报销补贴grid加载完数据后调用；
function countTravlAfterRetrieve(gridView,datas){
  $CV("local.travlFirstFlag").val("first");
  var activityFlag=$CV("local.activityFlag").val();
  var selectSubject  =$CV("local.selectSubject").val();
  if (selectSubject==readOnlySubjectCode1 || selectSubject==readOnlySubjectCode2) {
    statCCBT(gridView,datas);//第一次统计后置标志；后续统计时不再统计父表；
  }
  if (activityFlag=="Draft") {
    //计算总报销金额
//		statAllDetail(gridView,datas);
  }
  
  $CV("local.travlFirstFlag").val("nonFirst");
  return datas;
}

/****统计住宿费****/
function statZSF(gridView,datas){
  var mid = $CV("local.mid").val();
  var params = {"mid" : mid , "tableName" : "WH_BT_STAYDETAILS"};
  
  var success = function(result){
    
    var zsfTotalMoney=result.data.data.outSum;
    $CV("local.zsfTotalMoney").val(zsfTotalMoney);
  };
  var fail = function(error){
    
    $CV("local.zsfTotalMoney").val(0.00);
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_RetrieveRemburseDetailsSum",params,success,fail,true);
  return datas;
}

/****统计车船费****/
function statCCF(gridView,datas){
  var mid = $CV("local.mid").val();
  var params = {"mid" : mid , "tableName" : "WH_BT_FAREDETAILS"};
  
  var success = function(result){
    var ccfTotalMoney=result.data.data.outSum;
    $CV("local.ccfTotalMoney").val(ccfTotalMoney);
  };
  var fail = function(error){
    
    $CV("local.ccfTotalMoney").val(0.00);
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_RetrieveRemburseDetailsSum",params,success,fail,true);
  return datas;
}

/****统计出租车费****/
function statCZF(gridView,datas){
  var mid = $CV("local.mid").val();
  var params = {"mid" : mid , "tableName" : "WH_BT_TRANSPORTATIONDETAILS"};
  
  var success = function(result){
    
    var czfTotalMoney=result.data.data.outSum;
    $CV("local.czfTotalMoney").val(czfTotalMoney);
  };
  var fail = function(error){
    
    $CV("local.czfTotalMoney").val(0.00);
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_RetrieveRemburseDetailsSum",params,success,fail,true);
  return datas;
}


/****统计出差补贴****/
function statCCBT(gridView,datas){
  var mid = $CV("local.mid").val();
  var params = {"mid" : mid , "tableName" : "WH_BT_TRAVELSUBSIDYDETAILS"};
  
  var success = function(result){
    
    var ccbtTotalMoney=result.data.data.outSum;
    $CV("local.ccbtTotalMoney").val(ccbtTotalMoney);
  };
  var fail = function(error){
    
    $CV("local.ccbtTotalMoney").val(0.00);
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_RetrieveRemburseDetailsSum",params,success,fail,true);
  return datas;
}
//设置默认的实际报销金额
function setActualReimbursesum(position,value){
  
  if(isNaN(value)){
    dhtmlx.alert(coachViewUtil.getResource("alert.information.srjebxszlx")); //"输入金额必须是数字类型！"
    $CV("local."+position+".billssum").val(0);
    $CV("local."+position+".actualremibursesum").val(0);
    return false;
  }else{
    $CV("local."+position+".actualremibursesum").val(value);
  }
  return true;
}

//***设置住宿费实际报销金额，在票面金额的onblur事件中触发；
function setStayActulaReim(){
  var value=$CV("local.whBtStaydetails.billssum").val();
  setActualReimbursesum("whBtStaydetails",value);
}
//***设置出租票费实际报销金额，在票面金额的onblur事件中触发；
function setTransActulaReim(){
  var value=$CV("local.whBtTransportationdetails.billssum").val();
  setActualReimbursesum("whBtTransportationdetails",value);
}
//***设置车船费实际报销金额，在票面金额的onblur事件中触发；
function setFareActulaReim(){
  var value=$CV("local.whBtFaredetails.billssum").val();
  setActualReimbursesum("whBtFaredetails",value);
}
//***检查住宿费实际金额是否大于票面金额
function checkStay(){
  checkActualReimbursesum("whBtStaydetails");
}
//***检查出租费实际金额是否大于票面金额
function checkTrans(){
  checkActualReimbursesum("whBtTransportationdetails");
}
//***检查车船费实际金额是否大于票面金额
function checkFare(){
  checkActualReimbursesum("whBtFaredetails");
}
/**
 *错误金额的异常信息字符串；
 *@ author  gyren added20160517
 */
function checkTravelInfo() {
  var interNoTax    =  $CV("local.interNoTax").val();
  var interHasTax   =  $CV("local.interHasTax").val();
  var foreignNoTax  =  $CV("local.foreignNoTax").val();
  var foreignHasTax =  $CV("local.foreignHasTax").val();
  var days   =$CV("local.whBtTravelsubsidydetails.subsidydays").val();
  var actStd =$CV("local.whBtTravelsubsidydetails.subsidycriteria").val();
  var taxCount = $CV("local.taxGrid")._dhxGrid.getRowsNum();
  var area          =  $CV("local.whBtReimburseDdSub.travelarea").val();
  
  var ret="";
  if (area==null || area=="") {
    ret=coachViewUtil.getResource("alert.chooseArea");//请选择出差地区
    return ret;
  }
  if (area=="IN") {   //出差地区为国内；
    if (actStd *1 > interNoTax * 1){
      ret=coachViewUtil.getResource("alert.gnbtbdy140")+interNoTax;
      $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(interNoTax);
      calTravelAct();
      return ret;
    }
  } else {
    if (taxCount * 1 == 0 && actStd *1 > foreignNoTax * 1){
      ret=coachViewUtil.getResource("alert.gwbtwczcbdy800")+foreignNoTax;
      $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(foreignNoTax);
      calTravelAct();
      return ret;
    }
    if (taxCount * 1 > 0 && actStd *1 > foreignHasTax * 1){
      ret=coachViewUtil.getResource("alert.gwbtyczcbdy600")+foreignHasTax;
      $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(foreignHasTax);
      calTravelAct();
      return ret;
    }
  }
  calTravelAct();
  return ret;
}
//计算出差补贴；
function calTravlActualReimbursesum(position,value,area) {
  var interNoTax    =  $CV("local.interNoTax").val();
  var interHasTax   =  $CV("local.interHasTax").val();
  var foreignNoTax  =  $CV("local.foreignNoTax").val();
  var foreignHasTax =  $CV("local.foreignHasTax").val();
  var days   =$CV("local.whBtTravelsubsidydetails.subsidydays").val();
  var actStd =$CV("local.whBtTravelsubsidydetails.subsidycriteria").val();
  var taxCount = $CV("local.taxGrid")._dhxGrid.getRowsNum();
  
  if (area==null || area=="") {
    dhtmlx.alert(coachViewUtil.getResource("alert.chooseArea"));//请选择出差地区
    return false;
  }
  if (position=="subsidycriteria") {
    if (area=="IN") {   //出差地区为国内；
      if (value *1 > interNoTax * 1){
        dhtmlx.alert(coachViewUtil.getResource("alert.gnbtbdy140")+interNoTax);
        $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(interNoTax);
        calTravelAct();
        return false;
      }
    } else {
      if (taxCount * 1 == 0 && value *1 > foreignNoTax * 1){
        dhtmlx.alert(coachViewUtil.getResource("alert.gwbtwczcbdy800")+foreignNoTax);
        $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(foreignNoTax);
        calTravelAct();
        return false;
      }
      if (taxCount * 1 > 0 && value *1 > foreignHasTax * 1){
        dhtmlx.alert(coachViewUtil.getResource("alert.gwbtyczcbdy600")+foreignHasTax);
        $CV("local.whBtTravelsubsidydetails.subsidycriteria").val(foreignHasTax);
        calTravelAct();
        return false;
      }
    }
  }
  calTravelAct();
  return true;
}
//重新计算出差补贴总合计;
function calTravelAct(){
  var days   =$CV("local.whBtTravelsubsidydetails.subsidydays").val();
  var actStd =$CV("local.whBtTravelsubsidydetails.subsidycriteria").val();
  if(isNaN(actStd)) {actStd=0};
  if(isNaN(days)) {days=0};
  var tavlActualReimbursesum = (days * actStd).toFixed(2);
  $CV("local.whBtTravelsubsidydetails.actualremibursesum").val(tavlActualReimbursesum);
}

//检查金额是否大于票面金额
function checkActualReimbursesum(position){
  
  var billssum=$CV("local."+position+".billssum").val();
  var actReimbSum=$CV("local."+position+".actualremibursesum").val();
  if ( billssum * 1 < actReimbSum *1 ) {
    dhtmlx.alert(coachViewUtil.getResource("alert.information.sjjebndypmje"));
    $CV("local."+position+".actualremibursesum").val(billssum);
    return false;
  }
  return true;
}

/**
 @author yangyangd 2017-02-13
 1.检查车船费税额是否大于不含税金额的17.5%，超过则提示不能超过不含税金额的17%
 2.修改税额以后重新计算票面金额和实际报销金额两个字段
 */
function checkFareTax() {
  var tax = $CV("local.whBtFaredetails.tax").val() != null ? $CV("local.whBtFaredetails.tax").val() : 0;
  var noTaxAmount = $CV("local.whBtFaredetails.notaxamount").val() != null ? $CV("local.whBtFaredetails.notaxamount").val() : 0;
  if (tax*1 > noTaxAmount*0.175) {
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
    $CV("local.whBtFaredetails.tax").val(0);
    return false;
  }
  var sum = parseFloat(noTaxAmount)+parseFloat(tax);
  $CV("local.whBtFaredetails.billssum").val(sum);
  $CV("local.whBtFaredetails.actualremibursesum").val(sum);
  return true;
}
/**
 @author yangyangd 2017-02-13
 1.检查住宿费税额是否大于不含税金额的17.5%，超过则提示不能超过不含税金额的17%
 2.修改税额以后重新计算票面金额和实际报销金额两个字段
 */
function checkStayTax() {
  var tax = $CV("local.whBtStaydetails.tax").val() != null ? $CV("local.whBtStaydetails.tax").val() : 0;
  var noTaxAmount = $CV("local.whBtStaydetails.notaxamount").val() != null ? $CV("local.whBtStaydetails.notaxamount").val() : 0;
  if (tax*1 > noTaxAmount*0.175) {
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
    $CV("local.whBtStaydetails.tax").val(0);
    return false;
  }
  var sum = parseFloat(noTaxAmount)+parseFloat(tax);
  $CV("local.whBtStaydetails.billssum").val(sum);
  $CV("local.whBtStaydetails.actualremibursesum").val(sum);
  return true;
}
/**
 @author yangyangd 2017-02-13
 1.修改车船费不含税金额的时候，检查车船费税额是否大于不含税金额的17.5%，超过则提示不能超过不含税金额的17%，并重置为带出值
 2.修改不含税金额以后重新计算票面金额和实际报销金额两个字段
 */
function checkFareNoTaxAmount() {
  var tax = $CV("local.whBtFaredetails.tax").val() != null ? $CV("local.whBtFaredetails.tax").val() : 0;
  var noTaxAmount = $CV("local.whBtFaredetails.notaxamount").val() != null ? $CV("local.whBtFaredetails.notaxamount").val() : 0;
  if (tax*1 > noTaxAmount*0.175) {
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
    $CV("local.whBtFaredetails.notaxamount").val(0);
    $CV("local.whBtFaredetails.tax").val(0);
    $CV("local.whBtFaredetails.billssum").val(0);
    $CV("local.whBtFaredetails.actualremibursesum").val(0);
    return false;
  }
  var sum = parseFloat(noTaxAmount)+parseFloat(tax);
  $CV("local.whBtFaredetails.billssum").val(sum);
  $CV("local.whBtFaredetails.actualremibursesum").val(sum);
  return true;
}
/**
 @author yangyangd 2017-02-13
 1.检查住宿费税额是否大于不含税金额的17.5%，超过则提示不能超过不含税金额的17%
 2.修改税额以后重新计算票面金额和实际报销金额两个字段
 */
function checkStayNoTaxAmount() {
  var tax = $CV("local.whBtStaydetails.tax").val() != null ? $CV("local.whBtStaydetails.tax").val() : 0;
  var noTaxAmount = $CV("local.whBtStaydetails.notaxamount").val() != null ? $CV("local.whBtStaydetails.notaxamount").val() : 0;
  if (tax*1 > noTaxAmount*0.175) {
    dhtmlx.alert(coachViewUtil.getResource("alert.information.secghsje"));
    $CV("local.whBtStaydetails.notaxamount").val(0);
    $CV("local.whBtStaydetails.tax").val(0);
    $CV("local.whBtStaydetails.billssum").val(0);
    $CV("local.whBtStaydetails.actualremibursesum").val(0);
    return false;
  }
  var sum = parseFloat(noTaxAmount)+parseFloat(tax);
  $CV("local.whBtStaydetails.billssum").val(sum);
  $CV("local.whBtStaydetails.actualremibursesum").val(sum);
  return true;
}
//设置培训申请流程的超链接形式
function setTraProLink(){
  var trainBtNo  = $CV("local.whBtReimburse.trainBtNo").val();
  var trainLink  = $CV("local.whBtReimburse.trainapplicationlink").val();
  var trainStr  = "<a href='" + trainLink + "' target='_Blank'><font color='#0000ff'>"+trainBtNo+"</font></a>";
  $CV("local.trainBtNo").val(trainStr);
}

//设置出国申请流程的超链接形式
function setAbroadProLink(){
  var abroadBtNo = $CV("local.whBtReimburse.abroadBtNo").val();
  var abroadLink = $CV("local.whBtReimburse.abroadapplicationlink").val();
  
  var abroadStr = "<a href='" + abroadLink + "' target='_Blank'><font color='#0000ff'>"+abroadBtNo+"</font></a>";
  $CV("local.abroadBtNo").val(abroadStr);
}
//设置影像链接部分,超链接部分是否隐藏显示
function setLinkHidden(){
  queryIsScan();
  var isScan=$CV("local.checkResult").val();
  var trainBtNo =$CV("local.whBtReimburse.trainBtNo").val();
  var abroadBtNo=$CV("local.whBtReimburse.abroadBtNo").val();
  
  if (isScan!=null && isScan!="" && isScan=="Y"){
    $CV("ArealinkOpenText").visibility("D");
  }else{
    $CV("ArealinkOpenText").visibility("H");
  }
  if (trainBtNo!=null && trainBtNo!=""){
    $CV("AreaTrainBtNo").visibility("R");
  }else{
    $CV("AreaTrainBtNo").visibility("H");
  }
  if (abroadBtNo!=null && abroadBtNo!=""){
    $CV("AreaAbroadBtNo").visibility("R");
  }else{
    $CV("AreaAbroadBtNo").visibility("H");
  }
  if ((trainBtNo==null || trainBtNo=="") && (abroadBtNo==null || abroadBtNo=="")) {
    $CV("AreaBtNoFieldLink").visibility("H");
  }else{
    $CV("AreaBtNoFieldLink").visibility("R");
  }
}
//查询是否扫描公司，查询ISSCAN字段；
function queryIsScan(){
  var companyCode=$CV("local.whBtReimburse.reimbursecompanycode").val();
  var params="{'companyCode':'"+companyCode+"'}";
  var success = function(result){
    var ret=result.data.data.isScan;
    $CV("local.checkResult").val(ret);
  };
  var fail = function(error){
    
    dhtmlx.alert(coachViewUtil.getResource("alert.checkIsScanError"));
    $CV("local.checkResult").val("Y");
  };
  coachViewUtil.callAjaxByServiceName("PREXPR@AJAX_SelectCompanyByCode",params,success,fail,true);
}
//表标准日期转换为字符串
function caclDay(date){
  var dayStr;
  if (date){
    dayStr = date.getFullYear()*10000 + (date.getMonth()+1)*100 + date.getDate();
  }
  return dayStr;
}
/**
 * 比较日期大小；
 * @author gyren
 */
function compareDate(sDate,eDate){
  var startDay=caclDay(sDate);
  var endDay=caclDay(eDate);
  if (startDay>endDay) {
    return "-1";
  }
  return "0";
}
//设置报销明细_车船费实际报销金额颜色
function setTravelTableColor(gv){
  var cols=[8, 9];
  setColumnColor(gv,cols,"Travel");
}
//设置报销明细_住宿费实际报销金额颜色
function setStayTableColor(gv){
  var cols=[8, 9];
  setColumnColor(gv,cols,"Stay");
}
//设置报销明细_出租费实际报销金额颜色
function setTaxTableColor(gv){
  var cols=[6];
  setColumnColor(gv,cols,"Tax");
}
//设置报销明细字段颜色
function setDdSubTableColor(gv){
  var cols = [6,7];  //7:不含税金额；8：税额；
  setColumnColor(gv,cols,"ddSub");
}
//设置费用岗可编辑字段颜色
function setRcmSubTableColor(gv){
  var cols = [9,13];//transfer tax by yangyangd 20160922
  setColumnColor(gv,cols,"rcmSub");
}

//设置预算分摊表字段颜色
function setCostShareTableColor(gv){
  var cols = [9,10];//transfer tax by yangyangd 20160922
  setColumnColor(gv,cols,"cost");
}
/**对grid中 某几列修改颜色
 *@gridView: gridView
 *@cols: 某列 list
 */
var setColumnColor = function(gridView,cols,flag){
  var idStr = gridView._dhxGrid.getAllRowIds();
  if(idStr == null || idStr == ""){
    return ;
  }
  
  var hsInput = JSON.parse($CV("local.hsInput").val());
  var hsInputPara = JSON.parse(hsInput.para);
  var taskType = hsInputPara.taskType;//任务类型(0:申请,1:待办,2:加签,3:转办,4：任务池,5:流程管理替换处理人 )
  if(taskType != "2") {
    var ids = idStr.split(",");
    for(var i=0; ids&& i<ids.length;i++){
      var data       = gridView.retrieveDataByIdFromGrid(ids[i],true,true);
      var subjectCode= data.subjectcode;
      
      if (flag=="rcmSub") {subjectCode="";} //如果是费用岗table，不设置只读；
      //针对差旅费设置不可编辑字段
      if (flag=="ddSub" && (subjectCode !=null && subjectCode !="" && (subjectCode == readOnlySubjectCode1 || subjectCode==readOnlySubjectCode2))) {
        for(var j = 0; j< cols.length; j++){
          if (cols[j]==6 || cols[j]==7) {
            gridView._dhxGrid.setCellExcellType(ids[i],cols[j],"ron");
          } else {
            gridView._dhxGrid.setCellTextStyle(ids[i],cols[j],"color:blue");
          }
        }
      } else {
        for(var j = 0; j< cols.length; j++){
          gridView._dhxGrid.setCellTextStyle(ids[i],cols[j],"color:blue");
        }
      }
    }
  } else {
    var ids = idStr.split(",");
    for(var i=0; ids&& i<ids.length;i++){
      for(var j = 0; j< cols.length; j++){
        gridView._dhxGrid.setCellExcellType(ids[i],cols[j],"ron");
      }
    }
  }
}

//驳回，确定时调用
window.reject4SP = function(){
  $CV("local.applyDate").val(resourceUtil.inst.createTime.toDate("yyyy-MM-dd HH:mm:ss").toLocaleDate().format("yyyy-MM-dd HH:mm:ss"));
  
  //驳回服务调用
  var returnValue = false;
  var serviceName = "PREXPR@AJAX_approveReject";
  var paramsJson = {};
  paramsJson.tsId = $CV("local.hsInput").options("bpmCoreData").ts_piid;
  paramsJson.proposerId = $CV("local.hsInput").options("bpmCoreData").creator.userId;
  paramsJson.applyDate  = $CV("local.applyDate").val();
  
  var successFunction = function (data) {
    if (data && data.data && data.data.data) {
      
      var returnObj = data.data.data;
      if (returnObj.returnCode == '000000') { //returnCode is success
        returnValue = true;
      } else if (returnObj.returnCode == '30000211') {//174接口调用失败
        dhtmlx.alert(returnObj.returnMsg);
      } else if (returnObj.returnCode == '30000212'){//168接口调用失败
        dhtmlx.alert(returnObj.returnMsg);
      } else if (returnObj.returnCode == '30000213') { //203图片删除失败
        dhtmlx.alert(returnObj.returnMsg);
      }
    }
    
  }
  var failFunction = function (data) {
    console.error("AJAX_approveReject", data);
  }
  coachViewUtil.callAjaxByServiceName(serviceName, paramsJson, successFunction, failFunction, true);
  if(returnValue){
    return true;
  }else{
    return false;
  }
}
/**保存前给grid置上tsId,mid
 * @author gyren
 */
function formatSaveData(gridView,datas){
  var tsId = $CV("local.tsId").val();
  var mid  = $CV("local.mid").val();
  
  for(var i = 0 ;  i < datas.length ; i ++) {
    datas[i].tsId = tsId;
    datas[i].mid  = mid;
  }
  return datas;
}
function isZero(value){
  var ret=0;
  if (value==null || value=="" || value==undefined ) {
    ret=0;
    return ret;
  }
  if (value*1==0){
    ret=0;
    return ret;
  }
  return value;
}
/**
 * 添加记录时，校验差旅费各明细数据是否合法;
 * @author gyren;
 */
function checkBeforeAddRecord(position){
  var obj={};
  obj.resultFlag  = true;
  obj.resultMes  ="";
  /*住宿费*/
  if (position=="Stay"){
    var billSum=$CV("local.whBtStaydetails.billssum").val();
    var actSum=$CV("local.whBtStaydetails.actualremibursesum").val();
    var noTaxAmount=$CV("local.whBtStaydetails.notaxamount").val();
    var tax=$CV("local.whBtStaydetails.tax").val();
    billSum=isZero(billSum);
    actSum =isZero(actSum);
    if (billSum*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="票面金额必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.pmjedy0");
      return obj;
    }
    if (actSum*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="实际报销金额必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.sjbxjebxy0");
      return obj;
    }
    var calSum = Number((noTaxAmount*1 + tax*1).toFixed(2)) ;
    
    if ( calSum != billSum*1  || calSum != actSum*1 ) {
      obj.resultFlag = false;
      //obj.resultMes ="实际报销金额和票面金额必须等于税额和不含税金额之和";
      obj.resultMes =coachViewUtil.getResource("alert.actSumNotEqlTaxPlusAmount");//"实际报销金额和票面金额必须等于税额和不含税金额之和"
      return obj;
    }
  }
  /*出租票*/
  if (position=="Trans"){
    var billSum=$CV("local.whBtTransportationdetails.billssum").val();
    var actSum =$CV("local.whBtTransportationdetails.actualremibursesum").val();
    billSum=isZero(billSum);
    actSum =isZero(actSum);
    if (billSum*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="票面金额必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.pmjedy0");
      return obj;
    }
    if (actSum*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="实际报销金额必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.sjbxjebxy0");
      return obj;
    }
  }
  /*出差补贴Travel*/
  if (position=="Travel"){
    var feeStd =$CV("local.whBtTravelsubsidydetails.subsidycriteria").val();
    var days   =$CV("local.whBtTravelsubsidydetails.subsidydays").val();
    feeStd=isZero(feeStd);
    days  =isZero(days);
    if (feeStd*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="补贴标准必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.btbzbnxy0");
      return obj;
    }
    if (days*1<=0){
      obj.resultFlag = false;
      //obj.resultMes ="补贴天数必须大于0";
      obj.resultMes =coachViewUtil.getResource("alert.bttsbnxy0");
      return obj;
    }
  }
  /*车船费*/
  if (position=="Fared"){
    var billSum=$CV("local.whBtFaredetails.billssum").val();
    var actSum =$CV("local.whBtFaredetails.actualremibursesum").val();
    var noTaxAmount=$CV("local.whBtFaredetails.notaxamount").val();
    var tax=$CV("local.whBtFaredetails.tax").val();
    billSum=isZero(billSum);
    actSum  =isZero(actSum);
    if (billSum*1<0){
      obj.resultFlag = false;
      //obj.resultMes ="票面金额必须大于等于0";
      obj.resultMes =coachViewUtil.getResource("alert.pmjedy0");
      return obj;
    }
    if (actSum*1<0){
      obj.resultFlag = false;
      //obj.resultMes ="实际报销金额必须大于等于0";
      obj.resultMes =coachViewUtil.getResource("alert.sjbxjebxy0");
      return obj;
    }
    var calSum = Number((noTaxAmount*1 + tax*1).toFixed(2)) ;
    if ( calSum  != billSum*1  || calSum  != actSum*1 ) {
      obj.resultFlag = false;
      //obj.resultMes ="实际报销金额和票面金额必须等于税额和不含税金额之和";
      obj.resultMes =coachViewUtil.getResource("alert.actSumNotEqlTaxPlusAmount");//"实际报销金额和票面金额必须等于税额和不含税金额之和"
      return obj;
    }
  }
  return obj;
}
/**
 *approve页面隐藏差率明细控制逻辑；
 *@author ccxua
 */
var fnAjaxCommon = function(obj){
  
  var successFunction = function (data) {
    
    try {
      if (data && data.data && data.data.data) {
        var returnObj = data.data.data;
        (typeof obj.success == "function") && obj.success(returnObj,obj.result);
      }
    } catch (e) {
      console.error("--------fnAjaxCommon "+obj.url+" successFunction exception",e);
    }
  }
  
  var failFunction = function (data) {
    (typeof obj.fail == "function") && obj.fail(data,obj.result);
  }
  coachViewUtil.callAjaxByServiceName(obj.url, obj.params, successFunction, failFunction, obj.async);
}
export default {
  cMakingMain
}
