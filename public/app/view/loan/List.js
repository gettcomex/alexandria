/*globals Ext, t, conf*/
Ext.define('AW.view.loan.List', {
	extend	: 'Ext.grid.Panel',
	alias	: 'widget.loanlist',

//config
	store	: 'GridLoans',

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
				itemId	: 'btn_edit',
				disabled: true
			},{
				text	: 'Excluir',
				action	: 'delete',
				itemId	: 'btn_delete',
				disabled: true
			},{
				text	: 'Devolver',
				action	: 'return_book',
				itemId	: 'btn_return',
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
			header		: 'Livro',
			dataIndex	: 'book_title',
			hideable	: false,
			flex		: 1
		},{
			header		: 'Usuário',
			dataIndex	: 'user_name',
			hideable	: false,
			flex		: 1
		},{
			header		: 'Período',
			columns		: [{
				xtype		: 'datecolumn',
				format		: 'd-m-Y',
				header		: 'De',
				dataIndex	: 'starts_at',
				hideable	: false,
				width    	: 90
			},{
				xtype		: 'datecolumn',
				format		: 'd-m-Y',
				header		: 'Até',
				dataIndex 	: 'end_at',
				hideable	: false,
				width    	: 90
			}]
		},{
			xtype		: 'checkcolumn',
			header		: 'Devolvido',
			dataIndex	: 'returned',
			disabled	: true,
			hideable	: false,
			width		: 120
		}];

		me.callParent(arguments);
		me.store.loadPage(1);
	}
});