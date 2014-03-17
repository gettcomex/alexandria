/*globals Ext, conf*/
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
			border	: false,
			height	: 37,
			items	: [{
				text	: 'Novo',
				action	: 'add',
				itemId	: 'btn_new',
				border	: true, 
				hidden	: !conf.user.is_employee
			},{
				text	: 'Editar',
				action	: 'edit',
				itemId	: 'btn_edit',
				disabled: true, 
				hidden	: !conf.user.is_employee
			},{
				text	: 'Excluir',
				action	: 'delete',
				itemId	: 'btn_delete',
				disabled: true, 
				hidden	: !conf.user.is_employee
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
			flex		: 1
		},{
			header		: 'Autor',
			dataIndex	: 'writer',
			hideable	: false,
			flex		: 1
		}];

		me.callParent(arguments);
		me.store.loadPage(1);
	}
});