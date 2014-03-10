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
				click: me.onClickNewBook
			}

		});

		me.callParent(arguments);
	}, 

//listeners list
	onClickNewBook: function() {
		Ext.widget('bookwindow');
	}

});