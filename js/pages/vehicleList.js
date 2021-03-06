$(document).ready(function() {


});
function pageStart_One()
{
	$("#panelTitle").text("车辆列表");
	$(window).resize(function() {
		console.log("resize");
		$("#tableserver").bootstrapTable('resetView');
	});

	vehicleListDemo.createTable();
}

function AddObject_tableserver() {
	eModal.iframe({
		url : "main/vehicle/add.html",
	}, "新增车辆数据");
}
function UpdateObject_tableserver() {

	var rows=$('#tableserver').bootstrapTable('getSelections');
	if(rows.length>0)
		{
	    var vin=rows[0].vin;
		eModal.iframe({
			url : "main/vehicle/add.html?vin="+vin,
		}, "修改车辆数据");
		}else
		{
			new PNotify({
				title : "修改车辆数据",
				text : "请选择车辆数据",
				type : 'info'
			});
		}
}

function refresh()
{
	$('#tableserver').bootstrapTable('refresh');
}
function DeleteObject_tableserver() {
	var rows=$('#tableserver').bootstrapTable('getSelections');

	if(rows.length>0)
		{
		$.each(rows,function(i,field){
			var vin=field.vin;

			var temp =$.grep(field.snapshot.entry,function(field,i){
				return field.key=='device_unid';
			});
			if(temp.value)
				{
					new ajaxObject({
						Url:URLDICTIONARY.device_bind+'/unbind',
						dataType:'xml',
						type:'put',
						data:{
							vin:vin,
							unid:temp.value
						}
					});
				}
			new ajaxObject({
				Url:URLDICTIONARY.vehicleList+"/"+vin,
				dataType:'xml',
				type:'delete',
				vin:vin,
				fun:function()
				{
					var that=this;
					new PNotify({
						title : "删除车辆数据",
						text : "删除车辆数据"+that.options.vin+"成功",
						type : 'success'
					});
					$("#tableserver").bootstrapTable('refresh');
				}
			});


		});

		}else
			{
			new PNotify({
				title : "修改车辆数据",
				text : "请选择车辆数据",
				type : 'info'
			});

			}


}
var vehicleListDemo = {
		tempArray:[],
	createTable : function() {

		vehicleListDemo.tempArray=[];
		object = new dataModelObject({
			viewId : VIEWKEY.vehicleList,
			tableId : "#tableserver",
			onLoadBefore:function(data)
			{
				var that=this;
				console.log(that.options.fields);

			 var tempArray=	$.grep(that.options.fields,function (field,i){

				  return field.code&&field.code.length>0;
				})
				$.each(data,function(i,field){
					var tempStr=[];
					$.each(tempArray,function(i,f){

						 var objects=field[f.code].entry;
						 var value='';
						 $.each(objects,function(i,object){
							 if(object["key"]=="device_unid")
								 {
								    value=object.value
								 }
						 });

						 tempStr.push('\"'+ f.field+'\":\"'+value+'\"');

					})
					var newField=JSON.parse("{"+tempStr.join(',')+"}");
					$.extend(field,newField);
				});
				vehicleListDemo.tempArray=[];
				console.log(data);

				return data;
			}
		});
		dataModelObject.staticObject = object;
		if ($("#tableserver").bootstrapTable()) {
			$("#tableserver").bootstrapTable("destroy");
		}
		object.setViewTable();
	},
	idFormatter : function(value, row, index) {
		return [ '<a class="like" href="javascript:void(0)" title="Like">',
				value, '</a>' ].join('');
	},
	idEvents : {
		'click .like' : function(e, value, row, index) {
			eModal.iframe({
				url : "subMain/main.html?vin=" + value+"&nt="+new Date().getTime(),
			}, row.vin+"|"+row.licence+"|"+row.terminalId);
		}
	}

};
