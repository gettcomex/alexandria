/*globals Ext, t, setTimeout, conf*/
Ext.define('AW.controller.Books', {
	extend	: 'Ext.app.Controller',
	views	: [ 
		'book.List'
	],
	stores	: [
		'GridBooks'
	],

//inits 
	init: function() {
		var me = this;

		me.control({});

		me.callParent(arguments);
	}

});