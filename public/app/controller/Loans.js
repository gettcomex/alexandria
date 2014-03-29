 /*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Loans', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'loan.List',
		'loan.Window', 
		'report.Window'
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
			'loanlist button[action=report]' : {
				click: me.onClickBtnReport
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
		btnReturn.setDisabled(len !== 1);
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
	onClickBtnReport: function() {
		Ext.widget('reportwindow');
	},

	onClickBtnReturn: function(btn) {
		var me			= this,
			list		= btn.up('gridpanel'),
			recordID	= list.getSelectionModel().getLastSelected().getId();

		Ext.Ajax.request({
			url		: '/loans/' + recordID,
			method	: 'PUT',
			scope	: me,
			params	: {
				'loan[returned]' : true
			},
			callback: function(params, sucess, response) {
				var result	= response.responseText,
					status	= response.status,
					errors	= result;
				try {
					result = Ext.decode(result);
				} catch (e) {}
			}
		});
		me.loadList('loanlist');
	},
	onClickBtnDelete: function(btn) {
		Ext.ux.List.auxDelete('loans/', btn);
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

		if (!Ext.ux.Win.isValidWin(win)) {
			return;
		}

		Ext.Ajax.request({
			url		: '/loans/' + (recordID ? recordID : ''),
			method	: recordID ? 'PUT' : 'POST',
			scope	: me,  
			params	: me.getParamsWin(values),
			success	: function(params,response) {
				var result = response.responseText, 
					status = response.status, 
					errors = result;

				wait.hide();

				try {
					result = Ext.decode(result)
				}	catch (e) {}

				win.values	= values;
				win.list	= 'loanlist';

				Ext.ux.Win.callbackSave(win, status, result, errors);
			},
			failure : function(response, params) {
				wait.hide();
				
				var error = Ext.decode(response.responseText);

				if (typeof error.loan_error !== 'undefined') {
					msg = error.loan_error + '. <br><b>Deseja reservar o livro?</b>';
					
					Ext.Msg.confirm("Atenção", msg, function(opt) {
						if (opt === 'no') {
							return;
						}
						var wait= Ext.Msg.wait('Salvando registro...');
						Ext.Ajax.request({
							url		: '/queue_lists/',
							method	: 'POST',
							scope	: me,
							params	: {
								'queue_list[book_id]' : values.book_id,
								'queue_list[user_id]' : values.user_id
							},
							callback: function(params, sucess, response) {
								var result	= response.responseText,
									status	= response.status,
									errors	= result;

								try {
									result = Ext.decode(result);
								} catch (e) {}

							win.fireEvent('save', result, values)
							wait.hide()
							}
						})
					});
				}
				win.destroy();
			}
		});
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
	setDefaultDate: function(win) {
		var me		= this,
			dataIni	= win.down('#date_starts_at'),
			dataFim	= win.down('#date_end_at'),
			today	= new Date(),
			delivery = new Date(today.getTime() + 7*24*60*60*1000);

		dataIni.setValue(today);
		dataFim.setValue(me.calcDate(delivery));
	},
	calcDate: function(today) {
		return (today.getDay() === 6) ? new Date(today.setDate(today.getDate() + 2)) : (today.getDay() === 0) ? new Date(today.setDate(today.getDate() + 1)): today;
	} 
});