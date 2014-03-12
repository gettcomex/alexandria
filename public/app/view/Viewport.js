Ext.define('AW.view.Viewport', {
	extend	: 'Ext.container.Viewport',
	layout	: 'anchor',
	items	: [{
		xtype	: 'tabpanel',
		items	: [{
			title	: 'Usuários',
			items	: [{
				xtype	: 'userlist'
			}]
		},{
			title	: 'Livros',
			items	: [{
				xtype	: 'booklist'
			}]
		},{
			title	: 'Empréstimos'
		}] 
	}]
});