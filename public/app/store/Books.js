/*global Ext, conf*/
Ext.define('AW.store.Books', {
	extend		: 'Ext.data.Store', 
	model		: 'AW.model.Book', 
	remoteSort 	: true, 
	sorters 	: ['books.title'], 
	proxy		: {
		type	: 'ajax', 
		url		: '/books.json', 
		reader	: {
			root: 'data' 
		}, 
		simpleSortMode: true
	}
});  