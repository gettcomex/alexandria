Ext.define('AW.model.Loan', {
	extend	: 'Ext.data.Model',
	fields	: [
		{name: 'id',		type: 'int'},
		{name: 'book_id',	type: 'int'},
		{name: 'book_title', type: 'string'},
		{name: 'user_id',	type: 'int'},
		{name: 'user_name', type: 'string'},
		{name: 'starts_at',	type: 'date'},
		{name: 'end_at',	type: 'date'}, 
	]
});