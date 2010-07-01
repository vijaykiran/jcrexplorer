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
 * NodeTreePanel.js : JcrExplorer
 *
 * @author    Vijay Kiran<mail@vijaykiran.com>
 *
 */

/** TODO ADD License **/


/*global Ext, JcrExplorer */
Ext.ns('JcrExplorer');

JcrExplorer.NodeTreePanel = Ext.extend(Ext.tree.TreePanel, {
    initComponent:function() {
        Ext.apply(this, {

            // auto create TreeLoader

            loader: new Ext.tree.TreeLoader({
                dataUrl:'/jcrexplorer/nodeService/',
                preloadChildren: false,
                requestMethod:'GET'
            }),

            root: {
                nodeType: 'async',
                text: 'JCR Root',
                draggable: false,
                id:'/'
            }
        }); // eo apply
        JcrExplorer.NodeTreePanel.superclass.initComponent.apply(this, arguments);
    }, // eo function initComponent

    onRender:function() {
        JcrExplorer.NodeTreePanel.superclass.onRender.apply(this, arguments);

    } // eo function onRender

});

Ext.reg('node_tree_panel', JcrExplorer.NodeTreePanel);
