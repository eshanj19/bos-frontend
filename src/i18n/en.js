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

import englishMessages from "ra-language-english";

export default {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark"
    },
    dashboard: {
      welcome: {
        title: "Welcome to demo"
      }
    },
    menu: {
      sales: "Sales",
      catalog: "Catalog",
      customers: "Customers"
    }
  },
  resources: {
    athletes: {
      name: "Athlete |||| Athletes",
      fields: {}
    },
    categories: {
      name: "Category |||| Categories",
      fields: {
        products: "Products"
      }
    },
    reviews: {
      name: "Review |||| Reviews",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating"
      },
      action: {
        accept: "Accept",
        reject: "Reject"
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected"
      }
    },
    users: {
      name: "User |||| Users",
      detail: "User detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating"
      },
      action: {
        accept: "Accept",
        reject: "Reject"
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected"
      }
    },
    measurements: {
      name: " Measurement |||| Measurements",
      fields: {}
    },
    measurement_types: {
      name: " Measurement Type |||| Measurement Types",
      fields: {}
    },
    permission_groups: {
      name: " Permission Group |||| Permission Groups",
      fields: {}
    },
    ngos: {
      name: " Ngo |||| Ngos",
      fields: {}
    }
  }
};
