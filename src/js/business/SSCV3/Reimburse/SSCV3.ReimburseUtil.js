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
