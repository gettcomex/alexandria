/*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Books', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'book.List',
		'book.Window'
	],
	stores	: [
		'GridBooks'
	],

//inits 
	init: function() {
		var me = this;

		me.control({
			'booklist button[action=add]':{
				click: me.onClickButtonNew
			},

			'booklist button[action=edit]':{
				click: me.onClickButtonEdit 
			},

			'bookwindow':{
				show: me.onShowWin
			},

			'bookwindow button[action=close]':{
				click: me.onClickButtonClose
			},

			'bookwindow button[action=save]':{
				click: me.onClickButtonSave
			}
		});

		me.callParent(arguments);
	}, 

//listeners list
	onClickButtonNew: function() {
		Ext.widget('bookwindow');
	},

	onClickButtonEdit: function(btn) {
		var params = {};

		params.recordID = btn.up('grid').getSelectionModel().getLastSelected().getId()

		// FIXME
		var win = Ext.widget('bookwindow', params);

	}, 

	onClickButtonClose: function(btn) {
		var win = btn.up('window');

		win.destroy();
	},

	onClickButtonSave: function(btn) {
		var me 		= this,
			wait	= Ext.Msg.wait('Salvando registro...'),
			win 	= btn.up('window'),
			values 	= win.down('form').getForm().getValues();
		
		Ext.Ajax.request({
			url		: '/books/',
			method	: 'POST',
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
	},

	onShowWin: function(win) {
		if (win.recordID) {

			win.child('form').getForm().load({
				url			: 'books/' + win.recordID+'.json',
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

		params['book[title]']	= values.title;
		params['book[writer]']	= values.writer;
		params['book[copies]']	= values.copies;
		params['book[pages]']	= values.pages;

		return params; 
	}
});