if(!window.DB)
{
    window.DB = (function(){
        var db = null;
        function initDatabase(callback) {
                window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                if(!window.indexedDB){
                    alert("你的浏览器不支持IndexedDB");
                    return;
                }
                var request = window.indexedDB.open("workListDB", 1);
                request.onsuccess  = function(event){
                    console.log("成功打开DB");
                    db = event.target.result;
                    if(typeof callback == 'function') callback(db);
                }
                request.onupgradeneeded = function(e){
                    db = e.target.result;
                    if(!db.objectStoreNames.contains('items')){
                        db.createObjectStore('items', { keyPath:'id', autoIncrement: true });
                    }
                    if(!db.objectStoreNames.contains('tabs')){
                        var objectStore = db.createObjectStore('tabs', { keyPath:'id', autoIncrement: true });
                        objectStore.createIndex('name', 'name', {unique: true});
                    }
                }
            }
        function traverseItems(option){
            var transaction = db.transaction(["items"],"readwrite");
            var items = transaction.objectStore("items");
            var request = items.openCursor();
            request.onerror = function(e){
                alert('数据读取失败！');
            }
            request.onsuccess = function(e){
                var cursor = e.target.result;
                if(cursor){//必须要检查
                    var item = cursor.value;
                    if(option.handler) option.handler(items,item);
                    cursor.continue();//遍历了存储对象中的所有内容
                }else{
                    if(option.final) option.final();
                }
            };
        }
		function getAllTabs(option){
			var transaction = db.transaction(["tabs"],"readwrite");
			var tabs = transaction.objectStore("tabs");
			var request = tabs.getAll();
			request.onerror = function(e){
				alert('数据读取失败！');
			}
			request.onsuccess = function(e){
				if(option.final) option.final(e.target.result);
			};
		}
		function deleteTab(id){
			var transaction = db.transaction(["tabs"],"readwrite");
			var tabs = transaction.objectStore("tabs");
			tabs.delete(id);
		}
        function getDB(){
            return db;
        }
        return {
            init: initDatabase,
            getDB: getDB,
            traverseItems: traverseItems, //遍历清单
			getAllTabs: getAllTabs,
			deleteTab: deleteTab
        }

    })();
}
