Ext.define('AW.view.Viewport', {
	extend	: 'Ext.container.Viewport',
	layout	: 'border',
	items	: [{
		region	: 'north',
		html	: '<p class="x-panel-header" style="text-align: right"><b>Logado como ' + conf.user.email + '</b></p>',
		//autoHeight: true,
		border	: false,
		margins	: '0 5 0 0'
	},{
		xtype	: 'tabpanel',
		region	: 'center',
		tabBar	: {
			items	: [{
				xtype: 'tbfill'
			},{
				xtype	: 'button',
				text	: 'Logout',
				itemID	: 'btnLogout',
				action	: 'sign_out',
				margins	: '3 5 0 0'
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