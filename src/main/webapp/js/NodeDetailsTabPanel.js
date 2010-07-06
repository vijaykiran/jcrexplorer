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
 * NodeDetailsTabPanel.js : JcrExplorer
 *
 * @author    Vijay Kiran<mail@vijaykiran.com>
 *
 */


/*global Ext, JcrExplorer */
Ext.ns('JcrExplorer');

JcrExplorer.NodeDetailsTabPanel = Ext.extend(Ext.TabPanel, {
    initComponent:function() {
        Ext.apply(this, {
            activeTab: 0,
            height:750,
            minTabWidth: 150,
            tabWidth: 150,
            layoutOnTabChange: true,
            resizeTabs: true,
            enableTabScroll: true,
            containerScroll: true,
            items: [
                {
                    title: 'Search'
                }
            ]
        });
        JcrExplorer.NodeDetailsTabPanel.superclass.initComponent.apply(this, arguments);

        this.contextMenu = new Ext.menu.Menu({
            //            floating:true,
            items:[
                {
                    text: 'Close'
                },
                {
                    text: 'Close Others'
                },
                {
                    text: 'Close All'
                }
            ]
        });

        this.on('contextmenu', this.openContextMenu, this);

    } ,// eo function initComponent

    onRender:function() {
        JcrExplorer.NodeDetailsTabPanel.superclass.onRender.apply(this, arguments);
    },// eo function onRender

    openTabForNode:function(node) {

        var nodeTab = this.get(node.id);
        if (!nodeTab) {
            nodeTab = this.add({
                title: node.text,
                closable:true,
                id:node.id,
                xtype:'node_props_panel'
            });
        }
        this.setActiveTab(nodeTab);
    },

    openContextMenu:function(tp, tab, event) {
        alert(tab.getTitle());
        //        this.contextMenu.showAt(tab.header.getPosition());
    }

});

Ext.reg('node_details_tabpanel', JcrExplorer.NodeDetailsTabPanel);
