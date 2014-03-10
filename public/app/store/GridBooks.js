/*globals Ext, conf*/
Ext.define('AW.store.GridBooks', {
	extend		: 'Ext.data.Store',
	model 		: 'AW.model.Book', 
	remoteSort	: true, 
	pageSize	: 10, 
	sorters		: [{
		property	: 'id', 
		direction	: 'DESC'
	}], 
	proxy		: {
		type	: 'ajax', 
		url 	: '/books.json',
		reader	: {
			root			: 'data',
			totalProperty	: 'count'  
		}, 
		simpleSortMode: true, 
	}, 
	listeners	: {
		beforeload: function(store) { 
			if (store.sorters.items[0]) {
				store.proxy.extraParams.page	= store.currentPage;
				store.proxy.extraParams.start	= (store.currentPage > 0 ? ((store.currentPage-1)*3) : 0);
				store.proxy.extraParams.limit	= 3;
			}
		}
	} 
});