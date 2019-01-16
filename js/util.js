if(!window.Util){
    window.Util = (function(){
            //扩展日期对象的格式化方法
            Date.prototype.format = function(format){
                 var o = {
                 "M+" : this.getMonth()+1, //month
                 "d+" : this.getDate(),    //day
                 "h+" : this.getHours(),   //hour
                 "m+" : this.getMinutes(), //minute
                 "s+" : this.getSeconds(), //second
                 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
                 "S" : this.getMilliseconds() //millisecond
                 }
                 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                 for(var k in o)if(new RegExp("("+ k +")").test(format))
                 format = format.replace(RegExp.$1,
                 RegExp.$1.length==1 ? o[k] :
                 ("00"+ o[k]).substr((""+ o[k]).length));
                 return format;
            }
            console.info('system: window.Util loaded successfully')
				
			var PRIORITY = {
				'1': 'layui-bg-red',
				'2': 'layui-bg-orange',
				'3': 'layui-bg-yellow',
				'4': 'layui-bg-blue',
				'5': 'layui-bg-gray'
			}
            return {
                PRIORITY: PRIORITY
            }
        })();
}else{
    console.error('window.Util alrealy existed!',"system")
}