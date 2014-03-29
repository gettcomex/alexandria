/*globals Ext, setTimeout*/
Ext.define('Ext.ux.Win',{
	singleton: true,

	getParamsFilterWin: function(win) {
		var filters	= {};

		Ext.iterate(win.child('form').getForm().getValues(), function(k, v) {
			if (Ext.isEmpty(v)) {
				return;
			}

			//adiciona campos no filtro
			filters[k] = v;
		});

		return filters;
	},

	isValidWin: function(win) {
		var form	= win.child('form').getForm(),
			items	= form.getFields().items,
			msg		= '';

		if (!form.isValid()) {
			Ext.each(items, function(item) {
				Ext.each(item.getErrors(), function(error) {
					msg	+= '<span style="font-weight:bold;">' + item.fieldLabel + '</span> ' + error.toLowerCase() + '<br>';
				});
			});

			this.showMsg(msg, false, 'Verifique o(s) seguinte(s) campo(s)');

			return false;
		}

		return true;
	},

	callbackSave: function(win, status, result, errors) {
		if (status === 201 || status === 200) {
			win.fireEvent('save', result, win.values);
			win.destroy();

			if (win.list) {
				Ext.ux.List.loadList(win.list);
			}

			Ext.ux.Toast.showSuccess(
				win.recordID ? 'Registro alterado com sucesso!' : (win.isCopy ? 'Registro duplicado com sucesso!' : 'Registro inserido com sucesso!')
			);
		} else {
			this.showMsg(errors, true);
		}
	},

	showMsg: function(msg, isError, title) {
		Ext.Msg.show({
			title	: isError ? (title ? title : 'Encontramos erro(s) ao salvar') : (title ? title : 'Aten&ccedil;&atilde;o'),
			msg		: msg,
			buttons	: Ext.Msg.OK,
			icon	: (isError ? Ext.Msg.ERROR : Ext.Msg.WARNING),
			minWidth: 300
		});

		setTimeout(function(){
			Ext.MessageBox.getEl().setStyle('z-index', Ext.MessageBox.getEl().zindex + 15);
		},100);
	}
});