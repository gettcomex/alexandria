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

				win.fireEvent('save', result, values);
				win.destroy();
			}
		});

		me.loadList('booklist');
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
				url		: '/books/' + ids.join(','),
				method	: 'DELETE',
				success	: function(response) {
					me.loadList('booklist');
				},
				failure	: function(response) {
					var data	= Ext.decode(response.responseText).data;
				}		
			})
		});
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
		me.loadList('loanlist');
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