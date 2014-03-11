/*globals Ext, conf*/
Ext.Loader.setPath('Ext',	'extjs/src');
Ext.Loader.setPath('Ext.ux', 'app/ux');
Ext.Loader.setConfig({
	enabled			: true,
	disableCaching	: true
});

Ext.require([
	'Ext.data.JsonStore',
	'Ext.data.TreeStore',
	'Ext.form.Panel',
	'Ext.form.FieldSet',
	'Ext.form.field.File',
	'Ext.form.field.Display',
	'Ext.form.field.Number',
	'Ext.form.field.Picker',
	'Ext.form.field.Radio',
	'Ext.form.field.Hidden',
	'Ext.form.field.Time',
	'Ext.form.FieldContainer',
	'Ext.form.RadioGroup',
	'Ext.grid.Panel',
	'Ext.grid.column.CheckColumn',
	'Ext.grid.column.Date',
	'Ext.grid.plugin.RowEditing',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.feature.Grouping',
	'Ext.grid.feature.GroupingSummary',
	'Ext.grid.RowNumberer',
	'Ext.layout.container.Column',
	'Ext.layout.container.Table',
	'Ext.layout.container.Border',
	'Ext.tab.Panel',
	'Ext.toolbar.Paging',
	'Ext.tree.Panel',
	'Ext.selection.CheckboxModel', 
	'Ext.ux.form.Rails'
]);

Ext.application({
	name				: 'AW',
	autoCreateViewport	: true,
	paths				: {},
	requires			: [],
	controllers			: [
		'Books'
	]
});