/*globals Ext, setTimeout*/
Ext.define('Ext.ux.List',{
	singleton: true,

	openWin: function(alias, params, view) {
		if (Ext.getCmp(alias)) {
			Ext.getCmp(alias).destroy();
		}

		setTimeout(function(){
			var win = Ext.widget(alias, params);

			if (view) {
				//alterando todos as compos para readOnly e adicionando classe
				win.child('form').getForm().getFields().each(function(item) {
					item.setReadOnly(true);
					item.addCls('field_readonly');
				});
			}
		},300);
	},

	auxDelete: function(url, btn, msg, hash, route) {
		var me			= this,
			list		= btn.up('gridpanel'),
			loadMask	= list.getView().loadMask,
			selected	= list.getSelectionModel().getSelection(),
			len			= selected.length,
			ids			= [];

		msg	= (msg ? msg : (len === 1 ? 'Voc&ecirc; deseja realmente excluir o registro selecionado?' : 'Voc&ecirc; deseja realmente excluir os <b>'+len+'</b> registros selecionados?'));

		Ext.Msg.confirm('Aten&ccedil;&atilde;o', msg, function(opt) {
			if (opt === 'no') {
				return;
			}

			loadMask.show();
			
			Ext.each(selected, function(r) {
				ids.push(r.getId());
			});
			
			url	= (url + ids.join(','));

			Ext.Ajax.request({
				url		: url,
				method	: 'DELETE',
				success	: function(response) {
					me.loadList(list);

					Ext.ux.Toast.showSuccess(len === 1 ? 'Registro excluído com sucesso!' : 'Registros excluídos com sucesso!');
				},
				failure	: function(response) {
					var data	= Ext.decode(response.responseText).data;

					loadMask.hide();
					Ext.ux.Win.showMsg(data);
					me.loadList(list);

				}
			});
		});
	},

	loadList: function(list) {
		if (Ext.isString(list)) {
			Ext.each(Ext.ComponentQuery.query(list), function(list) {
				list.store.loadPage(list.store.currentPage);
				list.getSelectionModel().deselectAll();
			});
		} else {
			list.store.loadPage(list.store.currentPage);
			list.getSelectionModel().deselectAll();	
		}
	}
});