/*globals Ext, t, conf*/
Ext.define('AW.view.user.List', {
	extend	: 'Ext.grid.Panel',
	alias	: 'widget.userlist',

//config
	store	: 'GridUsers',

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
				border	: true,
				hidden	: !conf.user.is_employee
			},{
				text	: 'Editar',
				action	: 'edit',
				itemId	: 'btn_edit',
				disabled: true
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
			header		: 'Name',
			dataIndex	: 'name',
			hideable	: false,
			width		: 250
		},{
			xtype		: 'checkcolumn',
			header		: 'Funcionário',
			dataIndex	: 'is_employee',
			hideable	: false,
			width		: 160
		}];

		me.height = 550;

		me.callParent(arguments);
		me.store.loadPage(1);
	}
});