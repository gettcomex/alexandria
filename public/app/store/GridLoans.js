/*globals Ext, conf*/
Ext.define('AW.store.GridLoans', {
	extend		: 'Ext.data.Store',
	model 		: 'AW.model.Loan', 
	remoteSort	: true, 
	pageSize	: 10, 
	sorters		: [{
		property	: 'id', 
		direction	: 'DESC'
	}], 
	proxy		: {
		type	: 'ajax', 
		url 	: '/loans.json',
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
				store.proxy.extraParams.start	= (store.currentPage > 0 ? ((store.currentPage-1)*10) : 0);
				store.proxy.extraParams.limit	= 10;
			}
		}
	} 
});