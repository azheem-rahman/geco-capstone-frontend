import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateOrderForm = (props) => {
  const [newOrderInput, setNewOrderInput] = useState({});

  const handleCreateOrderChange = (event) => {
    switch (event.target.id) {
      case "partner-email":
        setNewOrderInput({
          ...newOrderInput,
          partnerEmail: event.target.value,
        });
        break;
      case "due-date":
        setNewOrderInput({
          ...newOrderInput,
          dueDate: event.target.value,
        });
        break;
      case "consignee-address":
        setNewOrderInput({
          ...newOrderInput,
          consigneeAddress: event.target.value,
        });
        break;
      case "consignee-city":
        setNewOrderInput({
          ...newOrderInput,
          consigneeCity: event.target.value,
        });
        break;
      case "consignee-country":
        setNewOrderInput({
          ...newOrderInput,
          consigneeCountry: event.target.value,
        });
        break;
      case "consignee-email":
        setNewOrderInput({
          ...newOrderInput,
          consigneeEmail: event.target.value,
        });
        break;
      case "consignee-name":
        setNewOrderInput({
          ...newOrderInput,
          consigneeName: event.target.value,
        });
        break;
      case "consignee-number":
        setNewOrderInput({
          ...newOrderInput,
          consigneeNumber: event.target.value,
        });
        break;
      case "consignee-postal":
        setNewOrderInput({
          ...newOrderInput,
          consigneePostal: event.target.value,
        });
        break;
      case "consignee-province":
        setNewOrderInput({
          ...newOrderInput,
          consigneeProvince: event.target.value,
        });
        break;
      case "consignee-state":
        setNewOrderInput({
          ...newOrderInput,
          consigneeState: event.target.value,
        });
        break;
      case "order-height":
        setNewOrderInput({
          ...newOrderInput,
          orderHeight: event.target.value,
        });
        break;
      case "order-length":
        setNewOrderInput({
          ...newOrderInput,
          orderLength: event.target.value,
        });
        break;
      case "order-weight":
        setNewOrderInput({
          ...newOrderInput,
          orderWeight: event.target.value,
        });
        break;
      case "order-width":
        setNewOrderInput({
          ...newOrderInput,
          orderWidth: event.target.value,
        });
        break;
      case "pickup-address":
        setNewOrderInput({
          ...newOrderInput,
          pickupAddress: event.target.value,
        });
        break;
      case "pickup-city":
        setNewOrderInput({
          ...newOrderInput,
          pickupCity: event.target.value,
        });
        break;
      case "pickup-contact-name":
        setNewOrderInput({
          ...newOrderInput,
          pickupContactName: event.target.value,
        });
        break;
      case "pickup-contact-number":
        setNewOrderInput({
          ...newOrderInput,
          pickupContactNumber: event.target.value,
        });
        break;
      case "pickup-country":
        setNewOrderInput({
          ...newOrderInput,
          pickupCountry: event.target.value,
        });
        break;
      case "pickup-postal":
        setNewOrderInput({
          ...newOrderInput,
          pickupPostal: event.target.value,
        });
        break;
      case "pickup-province":
        setNewOrderInput({
          ...newOrderInput,
          pickupProvince: event.target.value,
        });
        break;
      case "pickup-state":
        setNewOrderInput({
          ...newOrderInput,
          pickupState: event.target.value,
        });
        break;
    }
  };

  const createNewOrder = (event) => {
    event.preventDefault();
    props.handleSetNewOrder(newOrderInput);
  };

  return (
    <Form onSubmit={createNewOrder}>
      <h5>Partner Details</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="partner-email">
            <Form.Control
              type="text"
              placeholder="Partner Email *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>

      <h5>Due Date</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="due-date">
            <Form.Control type="date" onChange={handleCreateOrderChange} />
          </Form.Group>
        </div>
      </div>

      <h5>Consignee Details</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-address">
            <Form.Control
              type="text"
              placeholder="Consignee Address *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-city">
            <Form.Control
              type="text"
              placeholder="Consignee City *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-country">
            <Form.Control
              type="text"
              placeholder="Consignee Country *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-email">
            <Form.Control
              type="text"
              placeholder="Consignee Email *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-name">
            <Form.Control
              type="text"
              placeholder="Consignee Name *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-number">
            <Form.Control
              type="text"
              placeholder="Consignee Number (with country code) *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-postal">
            <Form.Control
              type="text"
              placeholder="Consignee Postal *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-province">
            <Form.Control
              type="text"
              placeholder="Consignee Province *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="consignee-state">
            <Form.Control
              type="text"
              placeholder="Consignee State *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>

      <h5>Order Details</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="order-height">
            <Form.Control
              type="text"
              placeholder="Order Height *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="order-length">
            <Form.Control
              type="text"
              placeholder="Order Length *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="order-weight">
            <Form.Control
              type="text"
              placeholder="Order Weight *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="order-width">
            <Form.Control
              type="text"
              placeholder="Order Width *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>

      <h5>Pickup Details</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-address">
            <Form.Control
              type="text"
              placeholder="Pickup Address *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-city">
            <Form.Control
              type="text"
              placeholder="Pickup City *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-contact-name">
            <Form.Control
              type="text"
              placeholder="Pickup Contact Name *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-contact-number">
            <Form.Control
              type="text"
              placeholder="Pickup Contact Number *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-country">
            <Form.Control
              type="text"
              placeholder="Pickup Country *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-postal">
            <Form.Control
              type="text"
              placeholder="Pickup Postal *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-province">
            <Form.Control
              type="text"
              placeholder="Pickup Province *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="pickup-state">
            <Form.Control
              type="text"
              placeholder="Pickup State *"
              onChange={handleCreateOrderChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-end">
          <Button style={{ backgroundColor: "#364f6b" }} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CreateOrderForm;
