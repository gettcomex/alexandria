 /*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Books', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'book.List',
		'book.Window'
	],
	stores	: [
		'GridBooks', 
		'ComboBookTypes'
	],

//inits 
	init: function() {
		var me = this;

		me.control({
			'booklist': {
				selectionchange:me.onSelectionChange,
				itemdblclick: me.onDblClickList
			},
			'booklist button[action=add]':{
				click: me.onClickBtnNew
			},

			'booklist button[action=edit]':{
				click: me.onClickBtnEdit 
			},

			'booklist button[action=delete]': {
				click: me.onClickBtnDelete
			},

			'booklist button[action=loan]': {
				click: me.onClickBtnLoan
			},

			'bookwindow':{
				show: me.onShowWin
			},

			'bookwindow button[action=close]':{
				click: me.onClickBtnClose
			},

			'bookwindow button[action=save]':{
				click: me.onClickBtnSave
			}
		});

		me.callParent(arguments);
	}, 

//listeners list
	onSelectionChange: function(sm, selected) {
		var	list		= sm.view.ownerCt,
			len			= selected.length,
			btnEdit		= list.down('#btn_edit'),
			btnDelete	= list.down('#btn_delete'),
			btnLoan		= list.down('#btn_loan');

		btnEdit.setDisabled(len !== 1);
		btnDelete.setDisabled(len === 0);
		btnLoan.setDisabled(len !== 1);
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
		Ext.widget('bookwindow');
	},

	onClickBtnEdit: function(btn) {
		var params = {};
		
		params.recordID = btn.up('grid').getSelectionModel().getLastSelected().getId();
		// O parametro recordID permite ao metodo enxergar que é uma edição de registro.
		var win = Ext.widget('bookwindow', params);

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
			url		: '/books/' + (recordID ? recordID : ''),
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
				win.list = 'booklist';

				Ext.ux.Win.callbackSave(win, status, result, errors);
			}
		});
	},

	onClickBtnDelete: function(btn) {
		Ext.ux.List.auxDelete('books/', btn);
	},

	onClickBtnLoan: function(btn) {
		var me	= this,
			wait	= Ext.Msg.wait('Emprestando Livro...');

		Ext.Ajax.request({
			url		: '/loans/',
			method	: 'POST',
			scope	: me,
			params	: me.getParamsLoan(btn),
			callback: function(params, sucess, response) {
				var result	= response.responseText,
					status	= response.status,
					errors	= result;

				wait.hide();

				try {
					result	= Ext.decode(result);
				} catch (e) {}
			}
		});
		Ext.ux.List.loadList('loanlist');
	},

	onShowWin: function(win) {
		if (win.recordID) {

			win.child('form').getForm().load({
				url			: 'books/' + win.recordID,
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

		params['book[title]']		= values.title;
		params['book[writer]']		= values.writer;
		params['book[copies]']		= values.copies;
		params['book[pages]']		= values.pages;
		params['book[book_type]']	= values.book_type;

		return params; 
	},
	getParamsLoan: function(btn) {
		var params	= {};

		params['loan[user_id]']		= conf.user.id;
		params['loan[book_id]']		= btn.up('grid').getSelectionModel().getLastSelected().getId();

		return params;
	}
});