Ext.define('AW.model.User', {
	extend	: 'Ext.data.Model', 
	fields	: [
		{name: 'id',					type: 'int'},
		{name: 'email',					type: 'string'}, 
		{name: 'password', 				type: 'string'}, 
		{name: 'password_confirmation',	type: 'string'},
		{name: 'is_employee',			type: 'boolean'},
		{name: 'login',					type: 'string'},
		{name: 'name', 					type: 'string'}
	]
});