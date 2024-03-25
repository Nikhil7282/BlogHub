import * as Yup from "yup";

export const signUpValidation = Yup.object({
  username: Yup.string().required("User Name Required"),
  email: Yup.string().email("Invalid Email Format").required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
});

export const loginValidation = Yup.object({
  username: Yup.string().required("User Name Required"),
  password: Yup.string().required("Password Required"),
});
