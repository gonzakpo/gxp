/*
 * @author Gonzalo Alonso <gonkpo@gmail.com>
 */

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = CoordSearchForm
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: CoordSearchForm(config)
 *
 *    Plugin for adding a new group on layer tree.
 */
gxp.plugins.CoordSearchForm = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_addgroup */
    ptype: "ga_coordsearchform",
    /** private: property[iconCls] */
    iconCls: "ga-icon-coordsearchform",
    /** private: property[marketIconFile] */
//    marketIconFile: 'bluepin.png',
    /** private: property[imageLocation] */
//    imageLocation: '/vendor/gxp/src/theme/img/ga/',
    /** private: property[iconWidth] */
//    iconWidth: 32,
    /** private: property[iconHeight] */
//    iconHeight: 32,
    /**
     * api: method[addActions]
     */
    addOutput: function() {
        var map = this.target.mapPanel.map;
        CSForm = function(){
            var csformWindow, csformForm;
            return{
                init:function(){
                    Ext.QuickTips.init();
                    Ext.form.Field.prototype.msgTarget = 'side';

                    csformForm = new Ext.FormPanel({
                        baseCls: 'x-plain',
                        labelWidth: 80,
                        url: '',
                        defaultType: 'textfield',
                        title: '<b>Ingrese coordenadas:</b>',
                        bodyStyle: 'padding:10px 0 0 15px',
                        items: [{
                            fieldLabel: 'Longitud',
                            name: 'lon',
                            value: '-6751307.689708',
                            anchor: '90%',
                            allowBlank: false
                        },{
                            fieldLabel: 'Latitud',
                            name: 'lat',
                            value: '-2998298.253083',
                            anchor: '90%',
                            allowBlank: false,
                        }]
                    });

                    csformWindow = new Ext.Window({
                        title: 'Buscar',
                        width: 270,
                        height: 170,
                        x: 0,
                        y: 0,
                        layout: 'fit',
                        plain: true,
                        closeAction: 'hide',
                        bodyStyle: 'padding:5px;',
                        buttonAlign: 'center',
//                        style: "float:left;",
                        items: csformForm
                    });

                    csformWindow.addButton('Buscar', CSForm.submitForm, CSForm);

                    csformWindow.on('show', function(){
                        var f = csformForm.items.item(0);
                        f.focus.defer(100, f);
                    });

                    csformWindow.show();
                },
                submitForm: function(){
                    values = csformForm.form.getFieldValues();
                    lon = values['lon'];
                    lat = values['lat'];
                    if(lon.match(/^[+-]?\d+(\.\d+)?$/) && lat.match(/^[+-]?\d+(\.\d+)?$/)) {
                        // search marker layer by name
                        var markerLayer = map.getLayersByName("layer_markers");
                        // if marker layer found, remove existing markers (if enabled)
                        if (markerLayer[0]) {
//                            if (markerLayer[0].getVisibility()) {
//                                markerLayer[0].setVisibility(false);
//                            }
                            markerLayer[0].clearMarkers();
                            //map.removeLayer(markerLayer[0]);
                        }
                        var zoom = map.getZoom();
                        var position = new OpenLayers.LonLat(lon, lat);
                        map.setCenter(position, zoom);
                        // if marker layer not found, create
                        if (!markerLayer[0]) {
                            var markerLayers = new OpenLayers.Layer.Markers("layer_markers");
                            map.addLayer(markerLayers);
                            var markerLayer = map.getLayersByName("layer_markers");
                        }
                        // set (specific) marker in marker layer
//                        var size = new OpenLayers.Size(this.iconWidth, this.iconHeight);
//			var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
//                        var icon = new OpenLayers.Icon(this.imageLocation+this.iconUrl, size, offset);
//                        var marker = new OpenLayers.Marker(position, this.imageLocation+this.iconUrl);
                        var marker = new OpenLayers.Marker(position);
                        markerLayer[0].addMarker(marker);
                        markerLayer[0].setVisibility(true);
                    }
                }
            };
        }();

        var out = gxp.plugins.CoordSearchForm.superclass.addOutput.apply(this, [{
            iconCls: this.iconCls,
            disabled: false,
            handler: function() {
                CSForm.init();
            },
            scope: this
        }]);

        return out;
    }
        
});
Ext.preg(gxp.plugins.CoordSearchForm.prototype.ptype, gxp.plugins.CoordSearchForm);