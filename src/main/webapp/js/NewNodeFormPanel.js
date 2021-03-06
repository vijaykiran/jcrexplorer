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
 * NewNodeFormPanel.js : JcrExplorer
 *
 * @author    Vijay Kiran<mail@vijaykiran.com>
 *
 */


/*global Ext, JcrExplorer */
Ext.ns('JcrExplorer');


JcrExplorer.NewNodeFormPanel = Ext.extend(Ext.FormPanel, {

    initComponent:function() {
        Ext.apply(this, {
            autoHeight: true,
            border:false,
            autoWidth: true,
            padding: 10,
            autoScroll:true,
            labelWidth: 120,
            defaults:{
                width: 250
                //                labelStyle: 'font-weight:bold;'
            },
            labelSeparator: ' ',
            labelAlign:'right',
            items:[
                {
                    fieldLabel: 'Node Name:',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: 'Primary Node Type:',
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'code',
                    store: new Ext.data.JsonStore({
                        url: '/jcrexplorer/nodeService/nodetypes',
                        root: 'nodetypes',
                        fields:['name']
                    }),
                    typeAhead: false,
                    hideTrigger: true,
                    loadingText: 'Loading ...',
                    minChars: 2
                }
            ]
        });

        JcrExplorer.NewNodeFormPanel.superclass.initComponent.apply(this, arguments);
    },


    onRender:function() {
        JcrExplorer.NewNodeFormPanel.superclass.onRender.apply(this, arguments);
    }

});

Ext.reg('new_node_form_panel', JcrExplorer.NewNodeFormPanel);
