import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useMask } from "@react-input/mask";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, Select, TextField } from "@mui/material";

import { useOrderStore, useServeceStore } from "@store";
import { postData } from "@orders";

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

export default function Modal1() {
  const { postOrderData } = useOrderStore();
  const { getData, data } = useServeceStore();
  const inputRef = useMask({mask: "+998 (__) ___-__-__",replacement: { _: /\d/ },});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  const validationSchema = Yup.object().shape({
    amount: Yup.number().min(1, "less than one").max(100, "more than a hundred").required("Amount is required"),
    client_phone_number: Yup.string().min(19, "Phone invalit ").required("Phon number is required"),
    client_full_name: Yup.string().required("Name is required"),
    service_id: Yup.string().required("Service ID is required"),
  });

  const initialValues: postData = {
    amount: "",
    client_phone_number: "",
    client_full_name: "",
    service_id: "",
  };

  const handelSubmit = async (value: postData) => {
    // console.log(value);
    const phone = value.client_phone_number.replace(/\D/g, "");
    const newFormData = { ...value, client_phone_number: `+${phone}` };

    const status = await postOrderData(newFormData);

    if (status === 201) {
      toast.success("Success fully");
      handleClose();
    } else {
      toast.error("Error: " + status?.message);
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
      <button
        onClick={handleOpen}
        className="py-2 px-6 text-white font-semibold bg-[#2389DA] hover:bg-blue-800 active:bg-[#2389DA] duration-200 rounded-lg"
      >
        Qo'shish
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
                Buyurtma qo'shish
              </h1>
              <Field
                as={TextField}
                label="Mijoz ismi"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="client_full_name"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="client_full_name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />
              <Field
                as={TextField}
                label="Mijoz telafon ragami"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="tel"
                inputRef={inputRef}
                name="client_phone_number"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="client_phone_number"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />
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
                qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
