/*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Users', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'user.List',
		'user.Window'
	],
	stores	: [
		'GridUsers'
	],

//inits 
	init: function() {
		var me = this;

		me.control({
			'userlist': {
				selectionchange:me.onSelectionChange,
				itemdblclick: me.onDblClickList
			},
			'userlist button[action=add]':{
				click: me.onClickBtnNew
			},

			'userlist button[action=edit]':{
				click: me.onClickBtnEdit 
			},

			'userlist button[action=delete]': {
				click: me.onClickBtnDelete
			},

			'userwindow':{
				show: me.onShowWin
			},

			'userwindow button[action=close]':{
				click: me.onClickBtnClose
			},

			'userwindow button[action=save]':{
				click: me.onClickBtnSave
			}
		});

		me.callParent(arguments);
	}, 

//listeners list
	onSelectionChange: function(sm, selected) {
		var	list			= sm.view.ownerCt,
			len				= selected.length,
			btnEdit			= list.down('#btn_edit'),
			btnDelete		= list.down('#btn_delete');

		btnEdit.setDisabled(len !== 1);
		btnDelete.setDisabled(len === 0);
	}, 
	onDblClickList: function(view) {
		var me		= this,
			grid	= view.up('grid'),
			btnEdit	= grid.down('#btn_edit');
		
		if (!btnEdit.disabled) {
			me.onClickBtnEdit(btnEdit);
		}
	},
	onClickBtnNew: function() {
		Ext.widget('userwindow');
	},

	onClickBtnEdit: function(btn) {
		var params = {};
		
		params.recordID = btn.up('grid').getSelectionModel().getLastSelected().getId();

		var win = Ext.widget('userwindow', params);

	}, 

	onClickBtnClose: function(btn) {
		var win = btn.up('window');

		win.destroy();
	},

	onClickBtnSave: function(btn) {
		var me 			= this,
			wait		= Ext.Msg.wait('Salvando registro...'),
			win 		= btn.up('window'),
			recordID 	= win.recordID,
			form		= win.down('form'),
			values 		= win.down('form').getForm().getValues(); 

		if (!Ext.ux.Win.isValidWin(win)) {
			return;
		}
		setTimeout(function() { 
			Ext.Ajax.request({
				url		: '/users/' + (recordID ? recordID : ''),
				method	: recordID ? 'PUT' : 'POST',
				scope	: me,  
				params	: me.getParamsWin(values),
				callback: function(params, sucess, response) {
					var result	= response.responseText,
						status	= response.status,
						errors	= result;

					wait.hide();
					
					try {
						result = Ext.decode(result);
					} catch (e) {}

					win.values = values;
					win.list = 'userlist';

					Ext.ux.Win.callbackSave(win, status, result, errors);
				}
			});
		},300);
	},

	onClickBtnDelete: function(btn) {
		Ext.ux.List.auxDelete('users/', btn);
	},

	onShowWin: function(win) {
		if (win.recordID) {

			var t1 = win.down('#textfield_new_password'),
				t2 = win.down('#textfield_password_confirmation');

			t1.allowBlank = true;
			t2.allowBlank = true;

			win.child('form').getForm().load({
				url			: 'users/' + win.recordID,
				method		: 'GET',
				waitTitle	: 'Carregando registro...',
				waitMsg		: ' ',
				scope		: this,
				success		: function(form, action) {
					win.data = action.result;
				},
				failure	: function() {}
			});
		}
	},

//others methods
	getParamsWin: function(values) {
		var params	= {};
		
		params['user[name]']		= values.name;
		params['user[login]']		= values.login;
		params['user[email]']		= values.email;
		params['user[is_employee'] 	= false;

		if (values.new_password) { 
			params['user[password]']				= values.new_password; 
			params['user[password_confirmation]']	= values.password_confirmation;
		};
		
		params['user[is_employee]']	= values.is_employee;
		return params; 
	}
});
