/*globals Ext*/
Ext.define('Ext.ux.form.Rails', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.rails',
	
	/**
	 * @cfg {String} model
	 * The model name, so fields mapping could work as rails expects, like company[trade_name], company[legal_name].
	 */
	model: '',
	
	init: function() {
		var me = this,
			formPanel = me.getCmp(),
			basicForm = formPanel.getForm();
		
		//apply plugin to basicForm
		//basicForm.model					= me.model;
		basicForm.setRailsValues		= me.setRailsValues;
		basicForm.loadRecord			= me.loadRecord;
		basicForm.beforeAction			= me.beforeAction;
		basicForm.onActionLoadSuccess	= me.onActionLoadSuccess;
		basicForm.findField				= me.findField;
	},
	
	findField: function(id) {
		var idRails = id ;
		return this.getFields().findBy(function(f) {
			return f.id === id || f.id === idRails || f.getName() === id || f.getName() === idRails;
		});
	},
	
	setRailsValues: function(values, namePattern) {
		var field, id, value, i,
			me = this;
			
		if(!namePattern) {
			namePattern = '{0}'; //Ext.form.FormPanel override
			
			if(!me.events.beforesetvalues) {
				me.addEvents('beforesetvalues');
			}
			
			if (me.fireEvent('beforesetvalues',me, values) === false) {
				return;
			}
		}
		
		for (id in values) {
			//ignore functions
			if (!Ext.isFunction(values[id])) {
				//get value
				value = values[id];
				//is array
				if (Ext.isArray(value)) {
					//iterate over
					for (i = 0; i < value.length; i++) {
						me.setRailsValues(value[i], '[' + id + '_attributes][' + i + '][{0}]');
					}
					continue;
				}

				//get field
				field = me.findField(Ext.String.format(namePattern, id));
		
				//set value
				if (field) { 
					field.setValue(value);
					if (me.trackResetOnLoad) {
						field.originalValue = field.getValue();
					}
				}
			}
		}
	},

	/**
	 * Copy of Ext.form.Basic#loadRecord
	 */	
	loadRecord: function(record) {
		this._record = record;
		return this.setRailsValues(record.data);
	},

	/**
	 * Copy of Ext.form.Basic#beforeAction
	 */
	beforeAction: function(action) {
		var waitMsg = action.waitMsg,
			maskCls = Ext.baseCSSPrefix + 'mask-loading',
			waitMsgTarget;
			
		if(action.type === 'load') {//<-- added this if
			action.onSuccess = this.onActionLoadSuccess;
		} //eo override
	
		// Call HtmlEditor's syncValue before actions
		this.getFields().each(function(f) {
			if (f.isFormField && f.syncValue) {
				f.syncValue();
			}
		});

		if (waitMsg) {
			waitMsgTarget = this.waitMsgTarget;
			if (waitMsgTarget === true) {
				this.owner.el.mask(waitMsg, maskCls);
			} else if (waitMsgTarget) {
				waitMsgTarget = this.waitMsgTarget = Ext.get(waitMsgTarget);
				waitMsgTarget.mask(waitMsg, maskCls);
			} else {
				Ext.MessageBox.wait(waitMsg, action.waitTitle || this.waitTitle);
			}
		}
	},
		
	/**
	 * Copy of Ext.form.action.Load#onSuccess
	 */
	onActionLoadSuccess: function(response){
		var result = this.processResponse(response),
			form = this.form;
		if(!result || result.success === false) { //<-- changed
			this.failureType = Ext.form.action.Action.LOAD_FAILURE;
			form.afterAction(this, false);
			return;
		}
		form.clearInvalid();
		form.setRailsValues(result); //<-- changed
		form.afterAction(this, true);
	}
});