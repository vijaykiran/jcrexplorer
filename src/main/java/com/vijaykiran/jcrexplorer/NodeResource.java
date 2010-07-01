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

package com.vijaykiran.jcrexplorer;

import javax.jcr.Credentials;
import javax.jcr.Item;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.PropertyType;
import javax.jcr.Repository;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.SimpleCredentials;
import javax.jcr.Value;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.jackrabbit.rmi.repository.RMIRemoteRepository;
import org.json.JSONException;
import org.json.JSONStringer;
import org.json.JSONWriter;
import org.slf4j.LoggerFactory;

/**
 * @author vijaykiran
 */
@Path("/nodeService")
public class NodeResource {

    private Session session;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(NodeResource.class);

    public NodeResource() {

        try {
            Repository repository = new RMIRemoteRepository("//localhost:1099/hipporepository");
            Credentials credentials = new SimpleCredentials("admin", "admin".toCharArray());
            session = repository.login(credentials);
        } catch (RepositoryException ex) {
            logger.error(ex.getMessage(), ex);
        }

    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNode(@QueryParam("node") final String path) {

        logger.info("returing json for " + path);
        Response r = null;
        try {


            Item item = session.getItem(path);

            JSONWriter jsonArray = new JSONStringer().array();

            NodeIterator nodeIterator = ((Node) item).getNodes();
            while (nodeIterator.hasNext()) {
                Node childNode = nodeIterator.nextNode();
                long childNodeSize = childNode.getNodes().getSize();

                if (childNodeSize != 0) {
                    jsonArray.object().key("text").value(childNode.getName() + "(" + childNodeSize + ")").key("id").value(childNode.getPath()).key("iconCls").value("group-node").endObject();
                } else {
                    jsonArray.object().key("text").value(childNode.getName()).key("leaf").value(true).key("id").value(childNode.getPath()).key("iconCls").value("simple-node").endObject();
                }

            }

            r = Response.ok(jsonArray.endArray().toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception ex) {
            ex.printStackTrace();
            //FIXME update with correct status codes for different exceptions
            r = Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return r;

    }

    @GET
    @Path("/props")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProperties(@QueryParam("node") final String path) {
        Response r = null;

        try {
            JSONWriter jsonArray = new JSONStringer().object().key("props").array();

            Node node = (Node) session.getItem(path);
            PropertyIterator props = node.getProperties();
            while (props.hasNext()) {

                Property prop = props.nextProperty();
                JSONWriter jsonProp = jsonArray.object();

                jsonProp.key("name").value(prop.getName());
                jsonProp.key("type").value(getPropTypeString(prop.getType()));


                if (prop.getDefinition().isMultiple()) {
                    //Property is multivalued
                    Value[] values = prop.getValues();
                    StringBuilder valueString = new StringBuilder();
                    for (Value v : values) {
                        valueString.append("," + v.getString());
                    }

                    jsonProp.key("value").value(valueString.toString().replaceFirst(",", ""));
                    jsonProp.key("valueType").value("MULTI");
                } else {

                    Value value = prop.getValue();
                    jsonProp.key("value").value(value.getString());
                    jsonProp.key("valueType").value("SINGLE");

                }
                jsonProp.endObject();
            }


            r = Response.ok(jsonArray.endArray().endObject().toString(), MediaType.APPLICATION_JSON).build();
        } catch (JSONException ex) {
            ex.printStackTrace();
        } catch (PathNotFoundException ex) {
            ex.printStackTrace();
        } catch (RepositoryException ex) {
            ex.printStackTrace();
        }

        return r;

    }

    private String getPropTypeString(int propType) {
        switch (propType) {
            case PropertyType.BINARY:
                return "BINARY";
            case PropertyType.BOOLEAN:
                return "BOOLEAN";
            case PropertyType.DATE:
                return "DATE";
            case PropertyType.DOUBLE:
                return "DOUBLE";
            case PropertyType.LONG:
                return "LONG";
            case PropertyType.NAME:
                return "NAME";
            case PropertyType.PATH:
                return "PATH";
            case PropertyType.REFERENCE:
                return "REFERENCE";
            case PropertyType.STRING:
                return "STRING";
            case PropertyType.UNDEFINED:
            default:
                return "UNDEFINED";
        }
    }
}
