Ext.define('AW.model.User', {
	extend	: 'Ext.date.Model', 
	fields	: [
		{name: 'email',					type: 'string'}, 
		{name: 'password', 				type: 'string'}, 
		{name: 'password_confirmation',	type: 'string'},
		{name: 'is_employee',			type: 'boolean'},
		{name: 'login',					type: 'string'},
		{name: 'name', 					type: 'string'}
	]
});