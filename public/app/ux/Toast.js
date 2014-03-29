/*globals Ext*/
Ext.define('Ext.ux.Toast',{
	singleton: true,
	
	show: function(msg, type) {
		var toast, width;
		
		//create
		toast = Ext.getBody().createChild({
			cls	: 'ux-toast ux-toast-'+ type,
			html: '<b>'+msg+'</b>'
		});
		
		toast.setVisibilityMode(Ext.Element.OFFSETS);
		
		//bring to front.
		toast.setStyle('z-index','10000');

		//adjust width
		width = Ext.util.TextMetrics.measure(toast, msg).width;
		toast.setWidth(width + 70);
		
		//slide in
		toast.alignTo(Ext.getBody(),'t-t',[0,10]);
		toast.slideIn('t');
		
		//remove function
		toast.getOut = function() {
			if(toast.getOutFlag === true){
				return;
			}
			
			toast.ghost('t',{remove: true});
			toast.getOutFlag = true;
		};
		
		toast.on('click', toast.getOut, toast);
		Ext.Function.defer(toast.getOut, 4000, toast);
	},
	
	showSuccess: function(msg) {
		Ext.ux.Toast.show(msg,'success');
	},
	
	showError: function(msg) {
		Ext.ux.Toast.show(msg,'error');
	},
	
	showAlert: function(msg) {
		Ext.ux.Toast.show(msg,'alert');
	}
});