Ext.define('AW.model.Book', {
	extend	: 'Ext.data.Model',
	fields	: [
		{name: 'id',		type: 'int'},
		{name: 'title',		type: 'string'},
		{name: 'writer',	type: 'string'},
		{name: 'copies',	type: 'int'}, 
		{name: 'pages', 	type: 'int'}, 
		{name: 'title_writer', type: 'string'},
		{name: 'book_type',	type: 'int'}
	]
});