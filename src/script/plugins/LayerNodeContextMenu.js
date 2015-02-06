/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * @edit Gonzalo Alonso <gonkpo@gmail.com>
 */
Ext.namespace("gxp.plugins");

/** api: (define)
 *  module = gxp.plugins
 *  class = LayerNodeContextMenu
 *  base_link = `Ext.menu.Menu <http://docs.sencha.com/extjs/3.4.0/#!/api/Ext.menu.Menu>`_
 */

/** api: example
 *  Sample code showing how to include a default LayerNodeContextMenu. Optionally pass your own menu items.
 *
 *  .. code-block:: javascript
 *
 *         .
 *         .
 *         {
 *          xtype: 'ga_layertreepanel',
 *          border: true,
 *                               .
 *                               .
 *                  FOR NOW: TODO: something smart with ExtJS plugins, for now pass only standard Menu Items.
 *                      contextMenu: [{xtype: 'ga_layernodemenuzoomextent'}, {xtype: 'ga_layernodemenustyle'}]);
 *               },
 *         {
 *                       // The MapPanel
 *                       xtype: 'ga_mappanel',
 *                       id: 'hr-map',
 *                       region: 'center',
 *                       .
 *                       .
 */


/** api: constructor
 *  .. class:: LayerNodeContextMenu(items)
 *
 *  A context menu for (usually right-click) LayerNodes in Layer trees.
 */
gxp.plugins.LayerNodeContextMenu = Ext.extend(Ext.menu.Menu, {
    listeners: {
        beforeshow: function (cm) {
            var node = cm.contextNode;
            cm.items.each(function(item) {
                item.setDisabled(!item.isApplicable(node));
            })
        },
        scope: this
    },

    initComponent: function () {
        /** Default menu items when no menu items passed in options. */
        this.initialConfig = this.items ? this.items : [
            {
                xtype: 'ga_layernodemenulayerinfo'
            },
            {
                xtype: 'ga_layernodemenuzoomextent'
            },
            {
                xtype: 'ga_layernodemenuopacityslider'
            },
            {
                xtype: 'ga_layernodemenustyle'
            }
        ];

        this.items = undefined;


        gxp.plugins.LayerNodeContextMenu.superclass.initComponent.call(this);
    }
});

/** api: xtype = ga_layernodecontextmenu */
Ext.reg('ga_layernodecontextmenu', gxp.plugins.LayerNodeContextMenu);
