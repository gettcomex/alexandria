/*globals Ext, t, conf*/
Ext.define('AW.view.book.List', {
	extend	: 'Ext.grid.Panel',
	alias	: 'widget.booklist',

//config
	store	: 'GridBooks',

//init
	initComponent: function() {
		var me = this, 
			sm = Ext.create('Ext.selection.CheckboxModel');

		me.dockedItems = [{
			xtype	: 'toolbar',
			dock	: 'top',
			height	: 37,
			border	: false,
			items	: [{
				text	: 'Novo',
				action	: 'add',
				itemId	: 'btn_new',
				border	: true
			},{
				text	: 'Editar',
				action	: 'edit',
				itemId	: 'btn_edit'
			},{
				text	: 'Excluir',
				action	: 'delete',
				itemId	: 'btn_delete'
			}]
		},{
			xtype	: 'toolbar',
			dock	: 'bottom',
			style	: 'z-index: 0;',
			items	: [{
				xtype		: 'pagingtoolbar',
				store		: me.store,
				cls			: 'paging_toolbar',
				displayMsg	: '{0} - {1} de {2} registro(s)',
				emptyMsg	: "",
				displayInfo	: true,
				border		: false
			}]
		}];

		me.selModel = sm; 

		me.columns = [{
			header		: 'Título',
			dataIndex	: 'title',
			hideable	: false,
			width		: 250
		},{
			header		: 'Autor',
			dataIndex	: 'writer',
			hideable	: false,
			width		: 160
		}];

		me.height = 550;

		me.callParent(arguments);
		me.store.loadPage(1);
	}
});