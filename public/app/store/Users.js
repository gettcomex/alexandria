/*global Ext, conf*/
Ext.define('AW.store.Users', {
	extend		: 'Ext.data.Store', 
	model		: 'AW.model.User', 
	remoteSort 	: true, 
	sorters 	: ['users.name'], 
	proxy		: {
		type	: 'ajax', 
		url		: '/users.json', 
		reader	: {
			root: 'data' 
		}, 
		simpleSortMode: true
	}
});  