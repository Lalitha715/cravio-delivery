// src/api/hasura.js
import { gql } from "@apollo/client";
import client from "./apolloClient";

// Get orders assigned to a delivery boy
export const getAssignedOrders = async (deliveryBoyId) => {
  const QUERY = gql`
    query GetAssignedOrders($deliveryBoyId: uuid!) {
      orders(where: { delivery_boy_id: { _eq: $deliveryBoyId } }) {
        id
        order_number
        status
        user {
          name
          addresses(where: { is_default: { _eq: true } }) {
            address_line
            city
            state
            latitude
            longitude
          }
        }
        restaurant {
          name
          address
          latitude
          longitude
        }
      }
    }
  `;

  try {
    const response = await client.query({
      query: QUERY,
      variables: { deliveryBoyId },
      fetchPolicy: "no-cache",
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching assigned orders:", error);
    return [];
  }
};

// Get unassigned/pending orders
export const getUnassignedOrders = async () => {
  const QUERY = gql`
    query GetUnassignedOrders {
      orders(where: { delivery_boy_id: { _is_null: true }, status: { _eq: "preparing" } }) {
        id
        order_number
        status
        user {
          name
          addresses(where: { is_default: { _eq: true } }) {
            address_line
            city
            state
            latitude
            longitude
          }
        }
        order_items{
        dish{
        restaurant{
        id
        name
        address
        latitude
        longitude
        }}}
      }
    }
  `;

  try {
    const response = await client.query({
      query: QUERY,
      fetchPolicy: "no-cache",
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching unassigned orders:", error);
    return [];
  }
};

// Accept an order
export const acceptOrder = async (orderId, deliveryBoyId) => {
  const MUTATION = gql`
    mutation AcceptOrder($id: uuid!, $deliveryBoyId: uuid!) {
      update_orders_by_pk(
        pk_columns: { id: $id }
        _set: { delivery_boy_id: $deliveryBoyId, status: "assigned" }
      ) {
        id
        status
        delivery_boy_id
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: MUTATION,
      variables: { id: orderId, deliveryBoyId },
    });
    return response.data.update_orders_by_pk;
  } catch (error) {
    console.error("Error accepting order:", error);
    return null;
  }
};



// 4️⃣ Get delivery boy by phone (for login)
export const getDeliveryBoyByPhone = async (phone) => {
  const QUERY = gql`
    query GetDeliveryBoyByPhone($phone: String!) {
      delivery_boys(where: { phone: { _eq: $phone } }) {
        id
        name
        phone
      }
    }
  `;
  try {
    const response = await client.query({
      query: QUERY,
      variables: { phone },
      fetchPolicy: "no-cache",
    });
    return response.data.delivery_boys[0] || null;
  } catch (error) {
    console.error("Error fetching delivery boy:", error);
    return null;
  }
};
