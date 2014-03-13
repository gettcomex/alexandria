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
			header		: 'Livro',
			dataIndex	: 'book_id',
			hideable	: false,
			width		: 160
		},{
			header		: 'Usuário',
			dataIndex	: 'user_id',
			hideable	: false,
			width		: 160
		},{
			header		: 'Período', 
			columns		: [{
				header		: 'De',
				dataIndex	: 'starts_at', 
				renderer	: Ext.util.Format.dateRenderer('d/m/Y'),
				hideable	: false, 
				width    	: 90
			},{
				header		: 'Até', 
				dataIndex 	: 'end_at',
				renderer	: Ext.util.Format.dateRenderer('d/m/Y'),
				hideable	: false, 
				width    	: 90
			}]
		},{
			xtype		: 'checkcolumn',
			header		: 'Devolvido',
			hideable	: false,
			width		: 160
		}];

		me.height = 550;

		me.callParent(arguments);
		me.store.loadPage(1);
	}
});