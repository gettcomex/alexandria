/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
/**
 * This is the base class for {@link Ext.tip.QuickTip} and {@link Ext.tip.ToolTip} that provides the basic layout and
 * positioning that all tip-based classes require. This class can be used directly for simple, statically-positioned
 * tips that are displayed programmatically, or it can be extended to provide custom tip implementations.
 * @xtype tip
 */
Ext.define('Ext.tip.Tip', {
    extend: 'Ext.panel.Panel',

    alternateClassName: 'Ext.Tip',

    /**
     * @cfg {Boolean} [closable=false]
     * True to render a close tool button into the tooltip header.
     */
    
    /**
     * @cfg {Number} [width='auto']
     * Width in pixels of the tip.  Width will be ignored if it
     * exceeds the bounds of {@link #minWidth} or {@link #maxWidth}.  The maximum
     * supported value is 500.
     */
    
    /**
     * @cfg {Number} minWidth
     * The minimum width of the tip in pixels.
     */
    minWidth : 100,
    /**
     * @cfg {Number} maxWidth
     * The maximum width of the tip in pixels.  The maximum supported value is 500.
     */
    maxWidth : 500,
    /**
     * @cfg {Boolean/String} shadow
     * `true` or "sides" for the default effect, "frame" for 4-way shadow, and "drop"
     * for bottom-right shadow.
     */
    shadow : "sides",

    /**
     * @cfg {String} defaultAlign
     * **Experimental**. The default {@link Ext.util.Positionable#alignTo} anchor position value
     * for this tip relative to its element of origin.
     */
    defaultAlign : "tl-bl?",
    /**
     * @cfg {Boolean} constrainPosition
     * If `true`, then the tooltip will be automatically constrained to stay within
     * the browser viewport.
     */
    constrainPosition : true,

    // private panel overrides
    autoRender: true,
    hidden: true,
    baseCls: Ext.baseCSSPrefix + 'tip',
    floating: {
        shadow: true,
        shim: true
    },
    focusOnToFront: false,

    /**
     * @cfg {String} closeAction
     * The action to take when the close header tool is clicked:
     *
     * - **{@link #method-destroy}** : {@link #method-remove remove} the window from the DOM and
     *   {@link Ext.Component#method-destroy destroy} it and all descendant Components. The
     *   window will **not** be available to be redisplayed via the {@link #method-show} method.
     *
     * - **{@link #method-hide}** : **Default.** {@link #method-hide} the window by setting visibility
     *   to hidden and applying negative offsets. The window will be available to be
     *   redisplayed via the {@link #method-show} method.
     *
     * **Note:** This behavior has changed! setting *does* affect the {@link #method-close} method
     * which will invoke the approriate closeAction.
     */
    closeAction: 'hide',

    ariaRole: 'tooltip',

    // Flag to Renderable to always look up the framing styles for this Component
    alwaysFramed: true,

    frameHeader: false,

    initComponent: function() {
        var me = this;

        me.floating = Ext.apply( {}, {
            shadow: me.shadow,
            constrain: me.constrainPosition
        }, me.self.prototype.floating);
        me.callParent(arguments);

        // Or in the deprecated config. Floating.doConstrain only constrains if the constrain property is truthy.
        me.constrain = me.constrain || me.constrainPosition;
    },

    /**
     * Shows this tip at the specified XY position.  Example usage:
     *
     *     // Show the tip at x:50 and y:100
     *     tip.showAt([50,100]);
     *
     * @param {Number[]} xy An array containing the x and y coordinates
     */
    showAt : function(xy){
        var me = this;
        this.callParent(arguments);
        // Show may have been vetoed.
        if (me.isVisible()) {
            me.setPagePosition(xy[0], xy[1]);
            if (me.constrainPosition || me.constrain) {
                me.doConstrain();
            }
            me.toFront(true);
        }
    },

    /**
     * **Experimental**. Shows this tip at a position relative to another element using
     * a standard {@link Ext.util.Positionable#alignTo} anchor position value.  Example usage:
     *
     *     // Show the tip at the default position ('tl-br?')
     *     tip.showBy('my-el');
     *
     *     // Show the tip's top-left corner anchored to the element's top-right corner
     *     tip.showBy('my-el', 'tl-tr');
     *
     * @param {String/HTMLElement/Ext.Element} el An HTMLElement, {@link Ext.Element} or string
     * id of the target element to align to.
     *
     * @param {String} [position] A valid {@link Ext.util.Positionable#alignTo} anchor position.
     * 
     * Defaults to 'tl-br?' or {@link #defaultAlign} if specified.
     */
    showBy : function(el, pos) {
        this.showAt(this.getAlignToXY(el, pos || this.defaultAlign));
    },

    /**
     * @private
     * Set Tip draggable using base Component's draggability.
     */
    initDraggable : function(){
        var me = this;
        me.draggable = {
            el: me.getDragEl(),
            delegate: me.header.el,
            constrain: me,
            constrainTo: me.el.dom.parentNode
        };
        // Important: Bypass Panel's initDraggable. Call direct to Component's implementation.
        Ext.Component.prototype.initDraggable.call(me);
    },

    // Tip does not ghost. Drag is "live"
    ghost: undefined,
    unghost: undefined
});
