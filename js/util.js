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
			function exportFile(name, data) {
		　　　　var urlObject = window.URL || window.webkitURL || window;
		　　　　var export_blob = new Blob([data],{type : 'application/octet-stream'});
		　　　　var save_link = document.createElement("a")
		　　　　save_link.href = urlObject.createObjectURL(export_blob);
		　　　　save_link.download = name;
		　　　　document.body.appendChild(save_link);
				save_link.click();
				document.body.removeChild(save_link);
		　　}
			function bytesToStr(byteNum){
				if(byteNum<1024*1024){ // <1M
					return (byteNum / 1024).toFixed(1) + 'KB';
				}else if(byteNum<1024*1024*1024){ // <1G
					return (byteNum / 1024 / 1024).toFixed(1) + 'MB';
				}else if(byteNum<1024*1024*1024*1024){ // >1G
					return (byteNum / 1024 / 1024 / 1024).toFixed(1) + 'GB';
				}
			}
            return {
                PRIORITY: PRIORITY,
				exportFile: exportFile,
				bytesToStr: bytesToStr
            }
        })();
}else{
    console.error('window.Util alrealy existed!',"system")
}