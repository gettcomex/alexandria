/*global Ext, conf*/
Ext.define('AW.store.ComboBookTypes', {
	extend		: 'Ext.data.Store', 
	model		: 'AW.model.DefaultModel', 
	loadOnce 	: true, 
	autoLoad	: true,
	proxy		: {
		type	: 'ajax', 
		url		: 'data/book_types.json', 
		reader	: {
			root: 'data' 
		} 
	}
});  