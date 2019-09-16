/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { stringify } from "query-string";
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  GET_MANY,
  GET_MANY_REFERENCE
} from "react-admin";

/**
 * Maps react-admin queries to the default format of Django REST Framework
 */
const drfProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type React-admin request type, e.g. 'GET_LIST'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params Request parameters. Depends on the request type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHttp = (type, resource, params) => {
    let url = "";
    let options = {};
    console.log("convertDataRequestToHttp" + type);
    switch (type) {
      case CREATE:
        url = `${apiUrl}/${resource}/`;
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        break;
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter } = params;
        const query = {
          page,
          page_size: perPage,
          ordering: `${order === "ASC" ? "" : "-"}${field}`,
          ...filter
        };
        url = `${apiUrl}/${resource}/?${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter, target, id } = params;
        const query = {
          page,
          page_size: perPage,
          ordering: `${order === "ASC" ? "" : "-"}${field}`,
          ...filter,
          [target]: id
        };
        url = `${apiUrl}/${resource}/?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = "PUT";
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported Data Provider request type ${type}`);
    }

    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type React-admin request type, e.g. 'GET_LIST'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params Request parameters. Depends on the request type
   * @returns {Object} Data response
   */
  const convertHttpResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    console.log("convertHttpResponse " + type);
    switch (type) {
      case UPDATE:
      case GET_ONE:
        if ("key" in json) {
          json["id"] = json["key"];
        }
        return { data: json };
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        if ("count" in json) {
          return {
            data: json.results.map(record => ({
              id: record.key,
              ...record
            })),
            total: json.count
          };
          //   return { data: json.results, total: json.count };
        } else if (headers.has("content-range")) {
          return {
            data: json,
            total: parseInt(
              headers
                .get("content-range")
                .split("/")
                .pop(),
              10
            )
          };
        } else if ("detail" in json && json.detail === "Invalid page.") {
          return { data: [], total: 0 };
        } else {
          throw new Error(
            "The total number of results is unknown. The DRF data provider " +
              "expects responses for lists of resources to contain this " +
              "information to build the pagination. If you're not using the " +
              "default PageNumberPagination class, please include this " +
              'information using the Content-Range header OR a "count" key ' +
              "inside the response."
          );
        }
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      case DELETE:
        return { data: params.previousData };
      default:
        return { data: json };
    }
  };

  /**
   * @param {String} type React-admin request type, e.g. 'GET_LIST'
   * @param {string} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    /**
     * Split GET_MANY, UPDATE_MANY and DELETE_MANY requests into multiple promises,
     * since they're not supported by default.
     */
    console.log("httpClient " + type);

    switch (type) {
      case GET_MANY:
        return Promise.all(
          params.ids.map(id =>
            httpClient(`${apiUrl}/${resource}/${id}/`, {
              method: "GET"
            })
          )
        ).then(responses => ({
          data: responses.map(response => ({
            id: response.json.key,
            ...response.json
          }))
        }));
      case UPDATE_MANY:
        return Promise.all(
          params.ids.map(id =>
            httpClient(`${apiUrl}/${resource}/${id}`, {
              method: "PUT",
              body: JSON.stringify(params.data)
            })
          )
        ).then(responses => ({
          data: responses.map(response => response.json)
        }));
      case DELETE_MANY:
        return Promise.all(
          params.ids.map(id =>
            httpClient(`${apiUrl}/${resource}/${id}`, {
              method: "DELETE"
            })
          )
        ).then(responses => ({
          data: responses.map(response => response.json)
        }));
      default:
        break;
    }

    const { url, options } = convertDataRequestToHttp(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHttpResponse(response, type, resource, params)
    );
  };
};

export default drfProvider;
