/*
 * @author Gonzalo Alonso <gonkpo@gmail.com>
 */

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = CoordPointForm
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: CoordPointForm(config)
 *
 *    Plugin for adding point by coord to layer.
 */
gxp.plugins.CoordPointForm = Ext.extend(gxp.plugins.Tool, {
    /** api: ptype = gxp_addgroup */
    ptype: "ga_coordpointform",
    /** private: property[iconCls] */
    iconCls: "ga-icon-coordpointform",
    
    /** api: config[pointInLayerText]
     *  ``String``
     *  Text for coord point in menu item (i18n).
     */
    pointInLayerText: "Dibujar punto según coordenadas",
    
    /** api: config[pointInLayerTooltip]
     *  ``String``
     *  Text for zoom in action tooltip (i18n).
     */
    pointInLayerTooltip: "Dibujar punto según coordenadas",

    /** api: config[layerDrawPoint]
     *  draw point.
     */

    /**
     * api: method[addActions]
     */
    addOutput: function() {
        var map = this.target.mapPanel.map;
        var layerDrawPoint = this.layerDrawPoint;
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
                        title: 'Dibujar punto según coordenadas',
                        width: 270,
                        height: 170,
                        x: 0,
                        y: 0,
                        layout: 'fit',
                        plain: true,
                        closeAction: 'hide',
                        bodyStyle: 'padding:5px;',
                        buttonAlign: 'center',
                        items: csformForm
                    });

                    csformWindow.addButton('Dibujar punto', CSForm.submitForm, CSForm);

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
                        // point marker layer by name
                        var point = new OpenLayers.Geometry.Point(lon, lat);
                        layerDrawPoint.drawFeature(point);
                        var zoom = map.getZoom();
                        var position = new OpenLayers.LonLat(lon, lat);
                        map.setCenter(position, zoom);
                    }
                }
            };
        }();

        var out = gxp.plugins.CoordPointForm.superclass.addOutput.apply(this, [{
            menuText: this.pointInLayerText,
            iconCls: this.iconCls,
            tooltip: this.pointInLayerTooltip,
            disabled: false,
            handler: function() {
                CSForm.init();
            },
            scope: this
        }]);

        return out;
    }
        
});
Ext.preg(gxp.plugins.CoordPointForm.prototype.ptype, gxp.plugins.CoordPointForm);