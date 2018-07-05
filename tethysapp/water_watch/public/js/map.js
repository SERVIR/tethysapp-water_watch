/*****************************************************************************
 * FILE:    JavaScript Enclosure Template
 * DATE:    D MMMMMMM YYYY
 * AUTHOR:
 * COPYRIGHT: (c) SERVIR 2018
 * LICENSE: BSD 2-Clause
 *****************************************************************************/

/*****************************************************************************
 *                      LIBRARY WRAPPER
 *****************************************************************************/

var LIBRARY_OBJECT = (function() {
    // Wrap the library in a package function
    "use strict"; // And enable strict mode for this library

    /************************************************************************
     *                      MODULE LEVEL / GLOBAL VARIABLES
     *************************************************************************/
    var base_map2,
        $chartModal,
        layers,
        map,
        ponds_mapid,
        ponds_token,
        select_feature_source,
        select_feature_layer,
        water_source,
        water_layer;
    /************************************************************************
     *                    PRIVATE FUNCTION DECLARATIONS
     *************************************************************************/
    var init_all,
        init_events,
        init_vars,
        init_map;

    /************************************************************************
     *                    PRIVATE FUNCTION IMPLEMENTATIONS
     *************************************************************************/
    init_vars = function(){
        var $layers_element = $('#layers');
        ponds_mapid = $layers_element.attr('data-ponds-mapid');
        ponds_token = $layers_element.attr('data-ponds-token');
        $chartModal = $("#chart-modal");
    };

    init_map = function(){
             var attribution = new ol.Attribution({
            html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/">ArcGIS</a>'
        });

        var base_map = new ol.layer.Tile({
            crossOrigin: 'anonymous',
            source: new ol.source.XYZ({
                attributions: [attribution],
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/' +
                'World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });

        base_map2 = new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: '5TC0yID7CYaqv3nVQLKe~xWVt4aXWMJq2Ed72cO4xsA~ApdeyQwHyH_btMjQS1NJ7OHKY8BK-W-EMQMrIavoQUMYXeZIQOUURnKGBOC7UCt4',
                imagerySet: 'AerialWithLabels' // Options 'Aerial', 'AerialWithLabels', 'Road'
            })
        });



        var west_africa = new ol.Feature(new ol.geom.Polygon([[[-2025275.5014440303,1364859.5770601076],[-1247452.3016140766,1364859.5770601076],[-1247452.3016140766,1898084.286377496],[-2025275.5014440303,1898084.286377496],[-2025275.5014440303,1364859.5770601076]]]));

        var boundary_layer = new ol.layer.Vector({
            title:'Boundary Layer',
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "red",
                    width: 1
                })
            })
        });
        boundary_layer.getSource().addFeatures([west_africa]);

        var ponds_layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://earthengine.googleapis.com/map/"+ponds_mapid+"/{z}/{x}/{y}?token="+ponds_token
            })
        });

        select_feature_source = new ol.source.Vector();
        select_feature_layer = new ol.layer.Vector({
            source: select_feature_source,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "black",
                    width: 8
                })
            })
        });

        water_source = new ol.source.XYZ();
        water_layer = new ol.layer.Tile({
            source: water_source
            // url:""
        });

        layers = [base_map,base_map2,ponds_layer,water_layer,boundary_layer,select_feature_layer];
        map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                center: ol.proj.fromLonLat([-14.45,14.4974]),
                zoom: 10
            })
        });

        map.getLayers().item(1).setVisible(false);
    };

    init_events = function() {

        map.on("moveend", function() {
            var zoom = map.getView().getZoom();
            var zoomInfo = '<p style="color:white;">Current Zoom level = ' + parseFloat(zoom,3)+'.</p>';
            document.getElementById('zoomlevel').innerHTML = zoomInfo;
            if (zoom > 14){
                base_map2.setVisible(true);
            }else{
                base_map2.setVisible(false);
            }

        });

        map.on("singleclick",function(evt) {

            var zoom = map.getView().getZoom();
            $chartModal.modal('show');
            if (zoom < 14) {

                $('.info').html('<b>The zoom level has to be 14 or greater. Please check and try again.</b>');
                $('#info').removeClass('hidden');
                return false;
            } else {
                $('.info').html('');
                $('#info').addClass('hidden');
            }

            var clickCoord = evt.coordinate;
            var proj_coords = ol.proj.transform(clickCoord, 'EPSG:3857', 'EPSG:4326');
            $("#current-lat").val(proj_coords[1]);
            $("#current-lon").val(proj_coords[0]);
            var $loading = $('#view-file-loading');
            var $loadingF = $('#f-view-file-loading');
            $loading.removeClass('hidden');
            $loadingF.removeClass('hidden');
            $("#plotter").addClass('hidden');
            $("#forecast-plotter").addClass('hidden');
            //$tsplotModal.modal('show');


        });




    };

    init_all = function(){
        init_vars();
        init_map();
        init_events();
    };

    /************************************************************************
     *                  INITIALIZATION / CONSTRUCTOR
     *************************************************************************/

    // Initialization: jQuery function that gets called when
    // the DOM tree finishes loading
    $(function() {
        init_all();
    });


}()); // End of package wrapper
// NOTE: that the call operator (open-closed parenthesis) is used to invoke the library wrapper
// function immediately after being parsed.