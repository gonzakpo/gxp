/*  NOTE (WW): append the GeoExt.tree.LayerNode.renderX() method:
 *  to prevent problems with the 'checkedGroup' flag for creating radiobuttons when
 *  using the 'hr_activelayerspanel' or 'hr_activethemespanel' panel - instead of a
 *  'baselayer radiobutton' a 'disabled baselayer checkbox' is shown
 *
 *  Version below taken from GeoExt GitHub on 01.nov.2012
 */
Ext.override(GeoExt.tree.LayerNode, {

    /** private: method[renderX]
     *  :param bulkRender: ``Boolean``
     */
    renderX: function (bulkRender) {
        var layer = this.layer instanceof OpenLayers.Layer && this.layer;
        if (!layer) {
            // guess the store if not provided
            if (!this.layerStore || this.layerStore == "auto") {
                this.layerStore = GeoExt.MapPanel.guess().layers;
            }
            // now we try to find the layer by its name in the layer store
            var i = this.layerStore.findBy(function (o) {
                return o.get("title") == this.layer;
            }, this);
            if (i != -1) {
                // if we found the layer, we can assign it and everything
                // will be fine
                layer = this.layerStore.getAt(i).getLayer();
            }
        }
        if (!this.rendered || !layer) {
            var ui = this.getUI();

            if (layer) {
                this.layer = layer;
                // no DD and radio buttons for base layers
                if (layer.isBaseLayer) {
                    this.draggable = false;
// --- WW ---
                    // Don't use 'checkedGroup' argument

                    // Ext.applyIf(this.attributes, {
                    // checkedGroup: "gx_baselayer"
                    // });

                    // Disabled baselayer checkbox
                    this.disabled = true;
// ----------
                }

                //base layers & alwaysInRange layers should never be auto-disabled
                this.autoDisable = !(this.autoDisable === false || this.layer.isBaseLayer || this.layer.alwaysInRange);

                if (!this.text) {
                    this.text = layer.name;
                }

                ui.show();
                this.addVisibilityEventHandlers();
            } else {
                ui.hide();
            }

            if (this.layerStore instanceof GeoExt.data.LayerStore) {
                this.addStoreEventHandlers(layer);
            }
        }
        GeoExt.tree.LayerNode.superclass.render.apply(this, arguments);
    }

});