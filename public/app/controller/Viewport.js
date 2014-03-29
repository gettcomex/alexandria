/*globals Ext*/
Ext.define('AW.controller.Viewport', {
	extend	: 'Ext.app.Controller',
	views	: [],
	stores	: [],

//inits
	init: function() {
		var me	= this;
		me.control({
			'button[action=sign_out]': {
				click: me.onClickBtnLogout
			}
		});

		me.callParent(arguments);
	},

//listeners list
	onClickBtnLogout: function() {
		Ext.Ajax.request({
			url: '/signout',
			method: 'GET',
			callback: function() {
				window.location.reload();
			}
		});
	}
});