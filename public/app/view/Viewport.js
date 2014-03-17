Ext.define('AW.view.Viewport', {
	extend	: 'Ext.container.Viewport',
	layout	: 'anchor',
	items	: [{
		xtype	: 'tabpanel',
		region	: 'center',
		tabBar	: {
			items	: [{
				xtype: 'tbfill'
			},{
				xtype	: 'button',
				text	: 'Logout',
				itemID	: 'btnLogout',
				action	: 'sign_out'
			}]
		},
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
			title	: 'Empréstimos',
			items	: [{
				xtype	: 'loanlist'
			}]
		},{
			title	: 'Relatório'
		}]
	}]
});