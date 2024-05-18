import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";

import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, Select, TextField } from "@mui/material";

import { useOrderStore, useServeceStore } from "@store";
import { UpdateData } from "@orders";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface formData {
  amount: number | string;
  service_id: string;
  status: string;
}

// interface DataOrderEdit {
//   amount: number;
//   client_id: string;
//   created_at: string;
//   id: string;
//   index: number;
//   price: number;
//   service_id: string;
//   status?: string;
// }


// interface PropsDataOrderEdit {
//   propsData: DataOrderEdit;
// }

export default function Modal1({ propsData }: any) {
//   console.log(propsData);

  const { updateOrderData } = useOrderStore();
  const { getData, data } = useServeceStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    service_id: Yup.string().required("Service ID is required"),
    status: Yup.string().required("Phon number is required"),
  });

  const initialValues: formData = {
    amount: propsData.amount || "",
    service_id: propsData.service_id || "",
    status: propsData.status || "",
  };

  const handelSubmit = async (value: formData) => {
    // console.log(value);
    const valueUpdata: UpdateData = {
      ...value,
      client_id: propsData.client_id,
      id: propsData.id,
    };
    // console.log(valueUpdata);
    
   const status = await updateOrderData(valueUpdata);
    if (status === 200) {
      handleClose();
    } 
  };

  // function useEfficient stor services <------
  useEffect(() => {
    getData({ page: 1, limit: 100 });
  }, []);

  //=-=-=-=----=---=-----=---=-=-=-=-=-=--=-=---=-
  //----------------------------------------------------------------

  return (
    <div>
      <button onClick={handleOpen} className=" text-slate-500">
        <EditIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                Buyurtmani o'zgartirish
              </h1>

              <Field
                as={Select}
                label="Xizmat turi"
                name="service_id"
                className="w-full mb-3"
                helperText={
                  <ErrorMessage
                    name="service_id"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              >
                {data.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={Select}
                label="Xizmat xolati"
                name="status"
                className="w-full mb-3"
                helperText={
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              >
                {["in_process", "done", "taken"].map((el, i) => (
                  <MenuItem key={i} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={TextField}
                label="Miqdori"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="number"
                name="amount"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="amount"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />

              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                o'zgartirish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
