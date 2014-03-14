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
			'userlist button[action=add]':{
				click: me.onClickButtonNew
			},

			'userlist button[action=edit]':{
				click: me.onClickButtonEdit 
			},

			'userlist button[action=delete]': {
				click: me.onClickButtonDelete
			},

			'userwindow':{
				show: me.onShowWin
			},

			'userwindow button[action=close]':{
				click: me.onClickButtonClose
			},

			'userwindow button[action=save]':{
				click: me.onClickButtonSave
			}
		});

		me.callParent(arguments);
	}, 

//listeners list
	onClickButtonNew: function() {
		Ext.widget('userwindow');
	},

	onClickButtonEdit: function(btn) {
		var params = {};

		params.recordID = btn.up('grid').getSelectionModel().getLastSelected().getId();

		var win = Ext.widget('userwindow', params);

	}, 

	onClickButtonClose: function(btn) {
		var win = btn.up('window');

		win.destroy();
	},

	onClickButtonSave: function(btn) {
		var me 			= this,
			wait		= Ext.Msg.wait('Salvando registro...'),
			win 		= btn.up('window'),
			recordID 	= win.recordID,
			form		= win.down('form'),
			values 		= win.down('form').getForm().getValues(); 

		if (!recordID && !form.isValid()) {
			wait.hide();
			return;
		}
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

				win.fireEvent('save', result, values);
				win.destroy();
				me.loadList('userlist');
			}
		});

	},

	onClickButtonDelete: function(btn) {
		var me			= this,
			list		= btn.up('gridpanel'),
			selected	= list.getSelectionModel().getSelection(),
			len 		= selected.length,
			ids			= [];
		var msg = (msg ? msg : (len === 1 ? 'Deseja realmente excluir o registro selecionado?' : 'Deseja realmente excluir os <b>'+len+'</b> registros selecionados?'));

		Ext.Msg.confirm('Atenção', msg, function(opt) {
			if (opt === 'no') {
				return;
			}

			Ext.each(selected, function(r) {
				ids.push(r.getId());
			});

			Ext.Ajax.request({
				url		: '/users/' + ids.join(','),
				method	: 'DELETE',
				success	: function(response) {
					me.loadList('userlist');
				},
				failure	: function(response) {
					var data	= Ext.decode(response.responseText).data;
				}		
			})
		});
	},

	onShowWin: function(win) {
		if (win.recordID) {

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
	},
	loadList: function(name) {
		var list = name;
		if (Ext.isString(list)) {
			Ext.each(Ext.ComponentQuery.query(list), function(list) {
				list.store.loadPage(list.store.currentPage);
				list.getSelectionModel().deselectAll();
			});
		} else {
			list.store.loadPage(list.store.currentPage);
			list.getSelectionModel().deselectAll();	
		}
	}
});