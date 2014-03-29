/*global Ext, conf*/ 
Ext.define('AW.view.report.Window', {
	extend	: 'Ext.window.Window', 
	alias	: 'widget.reportwindow',

//config
	id 			: 'reportwindow',
	layout		: 'fit', 
	autoShow	: true, 
	border 		: true, 
	modal		: true, 
	heigth		: 340, 
	minHeigth	: 340,
	width		: 660,

//inits
	initComponent: function(){
		var me 		= this; 

		me.title 	= "Relatório";

		me.items	= [{
			xtype	: 'form', 
			layout	: 'anchor', 
			border	: false, 
			padding : 10,
			defaults: {
				labelWidth	: 80, 
				anchor		: '0' 
			}, 
			items	: [{
				xtype		: 'combo',
				fieldLabel 	: 'Usuário',
				name		: 'user_id',
				itemId		: 'combo_user_id',
				store		: 'Users',
				valueField	: 'id',
				displayField: 'name',
				editable	: false
			},{
				xtype		: 'combo',
				fieldLabel 	: 'Livro',
				name		: 'book_id',
				itemId		: 'combo_book_id',
				store		: 'Books',
				valueField	: 'id',
				displayField: 'title_writer',
				editable	: false
			},{
				xtype 		: 'fieldcontainer',
				fieldLabel	: 'Período',
				layout		: 'column',
				labelWidth	: 80,
				items 		: [{
					xtype		: 'datefield',
					format		: "d/m/Y",
					fieldLabel	: 'De',
					name 		: 'starts_at',
					itemId		: 'date_starts_at',
					minValue	: new Date('01/01/2000'),
					disabled 	: false,
					editable	: false,
					labelWidth	: 50,
					width		: 160,
				},{
					xtype		: 'datefield',
					format		: "d/m/Y",
					margin		: '0 0 0 10',
					fieldLabel	: 'Até',
					name 		: 'end_at',
					itemId		: 'date_end_at',
					minValue	: new Date('01/01/2000'),
					disabled 	: false,
					editable	: false,
					labelWidth	: 50,
					width		: 160
				}]
			},{
				xtype		: 'fieldcontainer',
				name		: 'radio_situacao',
				defaultType	: 'radiofield',
				fieldLabel	: 'Situação',
				defaults	: { width: 120 },
				layout		: 'hbox',
				items		: [{
					boxLabel	: "Não devolvido",
					name		: "situacao", 
					inputValue	: 1,
					id			: 'radio1'
				},{
					boxLabel	: "Devolvido",
					name		: "situacao", 
					inputValue	: 2,
					id			: 'radio2'
				},{
					boxLabel	: "Todos",
					name		: "situacao", 
					inputValue	: 3,
					id			: 'radio3'
				}]
			}]
		}];

		me.buttons = [{
			text	: 'Cancelar',
			action	: 'close'
		},{
			text	: 'Gerar Relatório',
			action	: 'submit',
			itemId	: 'btn_submit'
		}];

		me.callParent(arguments);

	}
});