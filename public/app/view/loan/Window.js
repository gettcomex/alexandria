/*global Ext, t, conf*/ 
Ext.define('AW.view.loan.Window', {
	extend	: 'Ext.window.Window', 
	alias	: 'widget.loanwindow',

//config
	id 			: 'loanwindow',
	layout		: 'fit', 
	autoShow	: true, 
	border 		: true, 
	modal		: true, 
	heigth		: 340, 
	minHeigth	: 340,
	width		: 660,
	minWidth 	: 660,

//inits
	initComponent: function(){
		var me 		= this; 

		me.title 	= "Empréstimo";

		me.items	= [{
			xtype	: 'form', 
			layout	: 'anchor', 
			border	: false, 
			padding : 10,
			plugins	: {
				ptype : 'rails'
			},
			defaults: {
				labelWidth	: 150, 
				anchor		: '0' 
			}, 
			items	: [{
				xtype		: 'combo',
				fieldLabel 	: 'Livro', 
				name		: 'book_id', 
				itemId		: 'combo_book_id',
				store		: 'Books', 
				valueField	: 'id',
				displayField: 'title_writer',  
				allowBlank	: false,
				editable	: false
			},{
				xtype		: 'combo',
				fieldLabel 	: 'Usuário', 
				name		: 'user_id', 
				itemId		: 'combo_user_id',
				store		: 'Users', 
				valueField	: 'id',
				displayField: 'name',  
				allowBlank	: false,
				editable	: false
			},{
				xtype 		: 'container',
				layout		: 'column',
				items 		: [{
					xtype		: 'label',
        			text		: 'Período',
        			margin		: '0 10 0 0',
        			columnWidth : 0.3
				},{
					xtype		: 'datefield', 
					format		: "d/m/Y",
					fieldLabel	: 'De', 
					name 		: 'starts_at',
					itemId		: 'date_starts_at',
					maxValue	: new Date(),
					allowBlank	: false,
					editable	: false,
					columnWidth	: 0.3
				},{
					xtype		: 'datefield', 
					format		: "d/m/Y",
					fieldLabel	: 'Até', 
					name 		: 'end_at',
					itemId		: 'date_end_at',
					maxValue	: new Date(),
					allowBlank	: false,
					editable	: false,
					columnWidth	: 0.3
				}]
			}]
		}];

		me.buttons = [{
			text	: 'Cancelar',
			action	: 'close'
		},{
			text	: 'Salvar',
			action	: 'save',
			itemId	: 'btn_save'
		}];

		me.callParent(arguments);

	}
});