/*global Ext, t, conf*/ 
Ext.define('AW.view.user.Window', {
	extend	: 'Ext.window.Window', 
	alias	: 'widget.userwindow',

//config
	id 			: 'userwindow',
	layout		: 'fit', 
	autoShow	: true, 
	border 		: true, 
	modal		: true, 
	heigth		: 340, 
	minHeigth	: 340,
	width		: 660,
	minWidth 	: 660,

//inits
	initComponent: function(){
		var me 		= this; 

		me.title 	= "Usuário";

		me.items	= [{
			xtype	: 'form', 
			layout	: 'anchor', 
			border	: false, 
			padding : 10,
			plugins	: {
				ptype : 'rails'
			},
			defaults: {
				labelWidth	: 150, 
				anchor		: '0' 
			}, 
			items	: [{
				xtype		: 'textfield',
				fieldLabel 	: 'Nome', 
				name		: 'name', 
				itemId		: 'textfield_name',
				allowBlank	: false, 
				maxLength	: 130
			},{
				xtype		: 'textfield',
				fieldLabel 	: 'Login', 
				name		: 'login', 
				itemId		: 'textfield_login',
				allowBlank	: false, 
				maxLength	: 80
			},{
				xtype 		: 'textfield', 
				fieldLabel 	: 'Email', 
				name		: 'email', 
				itemId		: 'textfield_email',  
				allowBlank	: false,
				regex		: /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4})$/,
				regexText	: 'Email invalido',
				maxLength	: 50
			},{
				xtype 		: 'textfield', 
				fieldLabel 	: 'Senha', 
				name		: 'password', 
				itemId		: 'textfield_new_password',
				inputType	: 'password',    
				allowBlank	: false,
				maxLength	: 20
			},{
				xtype 		: 'textfield', 
				fieldLabel 	: 'Confirmação de Senha', 
				name		: 'password_confirmation', 
				itemId		: 'textfield_password_confirmation', 
				inputType	: 'password', 
				allowBlank	: false,
				maxLength	: 20
			},{ 
				xtype		: 'checkbox', 
				fieldLabel	: 'Funcionário', 
				name		: 'is_employee', 
				itemId		: 'checkbox_is_employee',  
				value 		: false
			}]
		}];

		me.buttons = [{
			text	: 'Cancelar',
			action	: 'close'
		},{
			text	: 'Salvar',
			action	: 'save',
			itemId	: 'btn_save'
		}];

		me.callParent(arguments);
	}
});