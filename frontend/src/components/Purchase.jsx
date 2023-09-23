import { useEffect, useState } from "react";
import {
  FloatingLabel,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm, useFieldArray, set } from "react-hook-form";

const backendBaseUrl = "https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1"

function Purchase() {
  const mockProducts = [
    { id: "1", name: "Product 1", price: 500 },
    { id: "2", name: "Product 2", price: 400 },
    { id: "3", name: "Product 3", price: 100 }
  ]
  const [responsibles, setResponsaibles] = useState([]);
  const [responsibleSelected, setResponsibleSelected] = useState(null);
  const [products, setProducts] = useState([])
  const [centers,setCenters] = useState([])
  const { control, resetField, register, setValue, getValues, handleSubmit } =
    useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const onSubmit = (data) => {
    delete data.product;
    console.log(data);
  };

  const onHandleChange = (e) => {
    const name = e.target.value;
    const responsible = responsibles.find((responsible) => responsible.responsible_name === name);
    setValue("responsible_id", responsible.responsible_id);
    fetch(`${backendBaseUrl}/responsibles/${responsible.responsible_id}`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      setResponsibleSelected(data)})

  };

  const onHandleChangeProduct = (index, e) => {
    const name = e.target.value;
    const product = products.find((product) => product.name === name);
    console.log(product)
    setValue(`products.${index}.price`, product.price);
  };

  useEffect(async () => {
    const resp = await (await fetch(`${backendBaseUrl}/responsibles`)).json()
    setResponsaibles(resp.responsibles)
  }, []);
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{ height: "100%" }}
    >
      <Card className="m-5" style={{ maxWidth: "600px" }}>
        <Card.Body className="px-5">
          <h2 className="text-uppercase text-center mb-5">
            Create a purchase order
          </h2>
          <h4 className="text text mb-5">Your information</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Select
                  className="mb-4"
                  {...register("name")}
                  onChange={onHandleChange}
                  defaultValue={"default"}
                >
                  <option value="default" disabled>Select a responsible</option>
                    {
                  responsibles.map((responsible) => (
                  <option key={responsible.responsible_id}>{responsible.responsible_name}</option>
                  ))
                } 
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="contact_info"
                label="Contact info"
                className="mb-3"
              >
               <Form.Control
                  className="mb-4"
                  value={''}
                  type="text"
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="email" label="Email" className="mb-3">
                <Form.Control
                  className="mb-4"
                  {...register("email")}
                  type="email"
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="address"
                label="Address"
                className="mb-3"
              >
                <Form.Control
                  className="mb-4"
                  {...register("address")}
                  type="text"
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="phone"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  className="mb-4"
                  {...register("phone_number")}
                  type="number"
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <h4 className="text text mb-5">Invoice Items</h4>
            {fields.length !== 0 && (
              <>
                <Row className="mb-3">
                  <Col className="font-weight-bold" lg={4}>
                    Product
                  </Col>
                  <Col className="font-weight-bold" lg={3}>
                    Quantity
                  </Col>
                  <Col className="font-weight-bold" lg={3}>
                    Unit Price
                  </Col>
                  <Col lg={1}></Col>
                </Row>
                {fields.map((field, index) => (
                  <Row className="mb-3" key={field.id}>
                    <Col lg={4}>
                      <Form.Group>
                        <FloatingLabel controlId="floatingInput" label="Product Name">
                          <Form.Select
                            className="mb-4"
                            {...register(`products.${index}.name`)}
                            onChange={e => onHandleChangeProduct(index, e)}
                            defaultValue={"default"}
                          >
                            <option value="default" disabled>Select a product</option>
                            {products.map((product) => (
                              <option key={product.id}>{product.name}</option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="quantity"
                          label="Qty"
                          htmlFor="product-quantity"
                          className="mb-3"
                        >
                          <Form.Control
                            placeholder="1"
                            {...register(`products.${index}.quantity`)}
                            type="number"
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group>
                        <FloatingLabel
                          controlId="product-value"
                          label="Price"
                          className="mb-3"
                        >
                          <Form.Control
                            placeholder="0"
                            {...register(`products.${index}.price`)}
                            type="number"
                            disabled
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col lg={1}>
                      <Button variant="danger" onClick={() => remove(index)}>
                        x
                      </Button>
                    </Col>
                  </Row>
                ))}
              </>
            )}
            <Button className="mb-4 w-100 gradient-custom-4" onClick={() => append({ name: "", quantity: 0, price: "" })}>Add Product</Button>
            <Button
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Purchase;