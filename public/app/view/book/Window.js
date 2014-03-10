/*global Ext, t, conf*/ 
Ext.define('AW.view.book.Window', {
	extend	: 'Ext.window.Window', 
	alias	: 'widget.bookwindow',

//config
	id 			: 'bookwindow',
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

		me.title 	= "Livro";

		me.items	= [{
			xtype	: 'form', 
			layout	: 'anchor', 
			border	: false, 
			padding : 10, 
			defaults: {
				labelWidth	: 120, // AO ALTERAR O LABEL AQUI, ALTERAR TBM NA COLUNA
				anchor		: '0' 
			}, 
			items	: [{
				xtype		: 'textfield',
				fieldLabel 	: 'Título', 
				name		: 'name', 
				itemId		: 'textfield_name',
				allowBlank	: false, 
				maxLength	: 130
			},{
				xtype		: 'textfield',
				fieldLabel 	: 'Autor', 
				name		: 'writer', 
				itemId		: 'textfield_writer',
				allowBlank	: false, 
				maxLength	: 80
            },{
				xtype 		: 'container',
				layout		: 'column',
				defaults	: {
					labelWidth	: 120,
				},
				items 		: [{
					xtype 				: 'numberfield', 
					fieldLabel			: 'Qtde. de Páginas', 
					name 				: 'pages', 
					itemId				: 'numberfield_pages', 
					hideTrigger			: true,
					allowBlank 			: false,
        			keyNavEnabled		: false,
        			mouseWheelEnabled	: false,
        			columnWidht			: 0.5,  
					minValue			: 0,
					maxValue			: 50560
				},{
					xtype 				: 'numberfield', 
					fieldLabel			: 'Qtde. de Cópias', 
					name 				: 'copies', 
					itemId				: 'numberfield_copies',
					margin				: '0 0 5 10', //como ajustar colunas sem mudar margin? 
					hideTrigger			: true,
					allowBlank 			: false,
        			keyNavEnabled		: false,
        			mouseWheelEnabled	: false,
        			columnWidht			: 0.5,  
					minValue			: 0,
					maxValue			: 100
				}]
			},{
				xtype 		: 'combo', 
				fieldLabel 	: 'Tipo', 
				name		: 'type', 
				itemId		: 'combo_type_id',
				store		: '', 
				valueField	: 'id', 
				displayField: 'name',
				allowBlank	: false, 
				editable	: false
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