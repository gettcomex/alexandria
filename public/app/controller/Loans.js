 /*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Loans', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'loan.List',
		'loan.Window'
	],
	stores	: [
		'GridLoans', 
		'Books', 
		'Users'
	],

//inits 
	init: function() {
		var me = this;

		me.control({
			'loanlist': {
				selectionchange:me.onSelectionChange,
				itemdblclick: me.onDblClickList
			},
			'loanlist button[action=add]':{
				click: me.onClickBtnNew
			},

			'loanlist button[action=edit]':{
				click: me.onClickBtnEdit 
			},

			'loanlist button[action=delete]': {
				click: me.onClickBtnDelete
			},

			'loanlist button[action=return_book]' : {
				click: me.onClickBtnReturn
			},

			'loanwindow':{
				show: me.onShowWin
			},

			'loanwindow button[action=close]':{
				click: me.onClickBtnClose
			},

			'loanwindow button[action=save]':{
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
			btnDelete		= list.down('#btn_delete'),
			btnReturn		= list.down('#btn_return');

		btnEdit.setDisabled(len !== 1);
		btnDelete.setDisabled(len === 0);
		btnReturn.setDisabled(len === 0);
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
		Ext.widget('loanwindow');
	},

	onClickBtnEdit: function(btn) {
		var params = {};

		params.recordID = btn.up('grid').getSelectionModel().getLastSelected().getId();

		// O parametro recordId permite ao metodo enxergar que é uma edição de registro.
		var win = Ext.widget('loanwindow', params);

	},

	onClickBtnReturn: function(btn) {
		var me		= this,
			list		= btn.up('gridpanel'),
			selected	= list.getSelectionModel().getSelection(),
			len			= selected.length,
			ids 		= [];

		Ext.each(selected, function(r) {
			ids.push(r.getId());
		});

		Ext.Ajax.request({
			url		: '/loans/set_returned/' + ids.join(','),
			method	: 'PUT',
			scope	: me, 
			callback: function(params, sucess, response) {
				var result	= response.responseText,
					status	= response.status,
					errors	= result;
				try {
					result = Ext.decode(result);
				} catch (e) {}
			}
		});
	},

	onClickBtnDelete: function(btn) {
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
				url		: '/loans/' + ids.join(','),
				method	: 'DELETE',
				success	: function(response) {
					me.loadList('loanlist');
				},
				failure	: function(response) {
					var data	= Ext.decode(response.responseText).data;
				}		
			})
		});
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
			values 		= win.down('form').getForm().getValues();
		
		Ext.Ajax.request({
			url		: '/loans/' + (recordID ? recordID : ''),
			method	: recordID ? 'PUT' : 'POST',
			scope	: me,  
			params	: me.getParamsWin(values),
			callback: function(params, sucess, response) {
				var result	= response.responseText,
					status	= response.status,
					errors	= result;
				/*
				Iria processar o status e questionar se o usuário queria fazer uma reserva. 
				if (status === 422) { 
					wait.hide();
					//MENSAGEM DE ERRO COM CONFIRM. 

					wait  = Ext.Msg.wait('Salvando reserva...');

					Ext.ajax.request({
						url 	: '/queue_lists', 
						method  : 'POST', 
						scope	: me, 
						params	: params.params, 
						callback: function(params, sucess, response) {
							var result	= response.responseText,
								status	= response.status,
								errors	= result; 

							try {
								result = Ext.decode(result);
							} catch (e) {}

						win.fireEvent('save', result, values)
						win.destroy();
						}
					})
					return; 
				}

				*/ 
				wait.hide();

				try {
					result = Ext.decode(result);
				} catch (e) {}

				win.fireEvent('save', result, values);
				win.destroy();
			}
		});

		me.loadList('loanlist');
	},

	onShowWin: function(win) {
		if (win.recordID) {
			win.child('form').getForm().load({
				url			: 'loans/' + win.recordID,
				method		: 'GET',
				waitTitle	: 'Carregando registro...',
				waitMsg		: ' ',
				scope		: this,
				success		: function(form, action) {
					win.data = action.result;
				},
				failure	: function() {}
			});
		} else {
			this.setDefaultDate(win)
		}
	},

//others methods
	getParamsWin: function(values) {
		var params	= {};

		params['loan[book_id]']		= values.book_id;
		params['loan[user_id]']		= values.user_id;
		params['loan[starts_at]']	= values.starts_at;
		params['loan[end_at]']		= values.end_at;

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
	},
	setDefaultDate: function(win) {
		var me		= this,
			dataIni	= win.down('#date_starts_at'),
			dataFim	= win.down('#date_end_at'),
			today	= new Date(),
			delivery = new Date(today.getTime() + 7*24*60*60*1000);

		dataIni.setValue(me.calcDate(today));
		dataFim.setValue(me.calcDate(delivery));

	}, 
	calcDate: function(today) {
		return (today.getDay() === 6) ? new Date(today.setDate(today.getDate() + 2)) : (today.getDay() === 0) ? new Date(today.setDate(today.getDate() + 1)): today;
	} 
});