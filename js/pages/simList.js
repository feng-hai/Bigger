$(document).ready(function() {

		//pageStart();
		
});

function pageStart()
{
	$("#panelTitle").text("SIM卡列表");
	$(window).resize(function () {
		console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
	console.log("加载sim卡");
	simDemo.createTable();
}

function AddObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "新增车辆数据");
}
function UpdateObject_tableserver() {
	eModal.iframe({
		url : "vehicle/update",
	}, "修改车辆数据");
}
function DeleteObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "删除车辆数据");
}
var simDemo = {
		createTable : function() {
			object = new dataModelObject({
				viewId : "A96A821DE531414A9254C9F498CC1256",
				tableId : "#tableserver"
			});
			dataModelObject.staticObject=object;
			if($(object.viewOptions.tableId).bootstrapTable())
				{
			      $(object.viewOptions.tableId).bootstrapTable("destroy");
				}
			object.setViewTable();
		},
		idFormatter:function (value, row, index) {
			return [
					'<a class="like" href="javascript:void(0)" title="Like">',
					'<i class="glyphicon glyphicon-heart"></i>'+value,
					'</a>'
					 ].join('');
		},
	    idEvents :{
				'click .like' : function(e, value, row, index) {
					eModal.iframe({
						url : "vehicle/track",
					}, "单车-轨迹");
				}
		}

	};	