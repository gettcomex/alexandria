/*globals Ext, t, conf*/
Ext.define('AW.view.book.List', {
	extend	: 'Ext.grid.Panel',
	alias	: 'widget.booklist',

//config
	store	: 'GridBooks',

//init
	initComponent: function() {
		var me = this;

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
				itemId	: 'btn_edit',
				disabled: true
			},{
				text	: 'Excluir',
				action	: 'view',
				itemId	: 'btn_delete',
				disabled: true
			}]
		}];

		me.columns = [{
			header		: 'Título',
			dataIndex	: 'title',
			sortable	: false,
			hideable	: false,
		},{
			header		: 'Autor',
			dataIndex	: 'writer',
			sortable	: false,
			hideable	: false,
			width		: 50
		},{
			header		: 'Cópias',
			dataIndex	: 'copies',
			width		: 25
		},{
			header		: 'Páginas',
			dataIndex	: 'pages',
			width		: 25
		}];

		me.callParent(arguments);
		me.store.load();
	}
});