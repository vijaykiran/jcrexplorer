/*
 * Copyright 2010 Vijay Kiran<mail@vijaykiran.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * Application.js : JCRExplorer
 *
 * @class JcrExplorer.Application
 * @author    Vijay Kiran <mail@vijaykiran.com>
 *
 */

/*global Ext, JcrExplorer */

Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
Ext.ns('JcrExplorer');

JcrExplorer.Viewport = Ext.extend(Ext.Viewport, {
    //    renderTo: 'content',
    layout:'border',
    split: true,
    initComponent:function () {
        var config = {
            items:[
                {
                    xtype:'toolbar',
                    region:'north'

                },
                {
                    title: 'Nodes',
                    xtype: 'node_tree_panel',
                    region:'west',
                    split:true,
                    width: 280,
                    minSize: 175,
                    maxSize: 500,
                    collapsible: true,
                    enableDD: true,
                    containerScroll: true,
                    margins:'5 0 5 5',
                    cmargins:'0 0 0 0',
                    rootVisible: false,
                    lines: false,
                    useArrows: true,
                    autoScroll:true,
                    animCollapse:true,
                    animate: true,
                    collapseMode:'mini'
                },
                {
                    title:'Properties',
                    xtype:'node_details_tabpanel',
                    region:'center',
                    margins:'5 5 5 0',
                    cmargins:'0 0 0 0'
                },
                {
                    xtype:'statusbar',
                    region:'south',
                    height: 25,
                    defaultText: 'JCR Explorer 0.01'

                }
            ]
        };

        //Apply the config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        JcrExplorer.Viewport.superclass.initComponent.apply(this, arguments);

        this.toolBar = this.items.itemAt(0);
        this.nodeTreePanel = this.items.itemAt(1);
        this.propertiesPanel = this.items.itemAt(2);
        this.statusBar = this.items.itemAt(3);

        this.nodeTreePanel.on('click', this.onNodeClick, this);

    },//eo function initComponent

    onNodeClick:function(node, event) {
        this.propertiesPanel.openTabForNode(node);
    }


}); //eo extend Viewport

//register the view port xtype
Ext.reg('viewport', JcrExplorer.Viewport);

// application main entry point
Ext.onReady(function() {

    Ext.QuickTips.init();
    var viewport = new JcrExplorer.Viewport({
        renderTo:'content'
    });

}); // eo function onReady

// eof