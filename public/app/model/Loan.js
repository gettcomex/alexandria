/*globals Ext*/
Ext.define('AW.model.Loan', {
	extend	: 'Ext.data.Model',
	fields	: [
		{name: 'id',		type: 'int'},
		{name: 'book_id',	type: 'int'},
		{name: 'book_title', type: 'string'},
		{name: 'user_id',	type: 'int'},
		{name: 'user_name', type: 'string'},
		{name: 'returned',	type: 'boolean'},
		{name: 'starts_at',	type: 'date',	dateFormat: 'd-m-Y'},
		{name: 'end_at',	type: 'date',	dateFormat: 'd-m-Y'}
	]
});