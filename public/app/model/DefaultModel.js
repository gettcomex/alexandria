/*globals Ext*/
Ext.define('AW.model.DefaultModel', {
	extend	: 'Ext.data.Model',
	fields	: [
		{name: 'id',		type: 'int'},
		{name: 'name',		type: 'string'}
	]
});