 /*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Reports', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'report.Window'
	],
	stores	: [
		'Books', 
		'Users'
	],

//inits 
	init: function() {
		var me = this;

		me.control({
			'reportwindow button[action=close]':{
				click: me.onClickBtnClose
			},
			'reportwindow button[action=submit]':{
				click: me.onClickBtnSubmit
			}
		});

		me.callParent(arguments);
	}, 

//listeners list
	onClickBtnClose: function(btn) {
		var win = btn.up('window');

		win.destroy();
	},
	onClickBtnSubmit: function(btn) {
		var me 			= this,
			wait		= Ext.Msg.wait('Salvando registro...'),
			win 		= btn.up('window'),
			recordID 	= win.recordID,
			values 		= win.down('form').getForm().getValues();

		if (!Ext.ux.Win.isValidWin(win)) {
			return;
		}

		Ext.Ajax.request({
			url		: 'reports/',
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

			}
		});
	},
//others methods
	getParamsWin: function(values) {
		var params	= {};

		params['loan[book_id]']		= values.book_id;
		params['loan[user_id]']		= values.user_id;
		params['loan[starts_at]']	= values.starts_at;
		params['loan[end_at]']		= values.end_at;

		if (values.situacao !== 3) {
			params['loan[returned]']= (values.situacao === 2);
		}

		return params; 
	}
});