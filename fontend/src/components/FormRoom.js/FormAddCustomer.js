import React, { useState } from "react";
import "../../css/FormAddRoom.css";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { successfully, unsuccessful } from "../../redux/slices/notifySlice";
import { addCustomer } from "../../redux/slices/customerSlice";
import { updateAttrRoomById } from "../../redux/slices/roomSlice";
const schema = yup.object().shape({
  name: yup.string().required("Tên khách hàng trống"),
  phone: yup.string().required("Số điện thoại trống"),
  identity_number: yup.string().required("CMND/CCCD trống"),
  birthday: yup.string().required("Ngày sinh trống"),
  sex: yup.string(),
  address_detail: yup.string(),
  job: yup.string(),
});
const FormAddCustomer = ({ room_id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.data);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const index = customers.findIndex((obj) => obj.room === room_id);
  const resetForm = () => {
    reset({
      name: "",
      phone: "",
      identity_number: "",
      birthday: "",
      sex: "1",
      address_detail: "",
      job: "",
    });
  };
  return (
    <>
      <div className="" variant="primary" onClick={handleShow}>
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title=""
          data-bs-original-title="Thêm phòng"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          &nbsp;Thêm khách thuê
        </span>
      </div>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus"
            style={{ marginRight: "15px" }}
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          <Modal.Title style={{ fontSize: "1.25rem" }}>
            {"Thêm thông tin khách thuê - phòng " + room_id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              const newCustomer = {
                id: (Math.floor(Math.random() * 100) + 10).toString(),
                name: data.name,
                room: room_id,
                phone: data.phone,
                birthday: data.birthday,
                gender: data.sex,
                address: data.address_detail,
                job: data.job,
                identity_number: data.identity_number,
                is_admin: "true",
                is_verify: "false",
                is_registry: "false",
              };
              console.log(newCustomer);
              dispatch(addCustomer({ customer: newCustomer }));
              dispatch(
                updateAttrRoomById({ id: room_id, attr: "customers", value: 1 })
              );
              setShow(false);
              resetForm();
              dispatch(successfully({ message: "Thêm phòng thành công!" }));
            })}
            id="addcustomer-form"
          >
            <div className="row g-2">
              <div className="col-12">
                <div className="title-item-small">
                  <b>Thông tin các nhân của khách thuê:</b>
                  <i className="des">Các thông tin về khách thuê và tiền cọc</i>
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="customer_name"
                    oninput="this.value = __format.capitalizeFirstStr(this.value)"
                    placeholder="Nhập tên khách thuê"
                    required=""
                    {...register("name")}
                  />
                  <label htmlFor="customer_name">Tên khách thuê</label>
                  <div className="invalid-feedback">
                    Vui lòng nhập tên khách thuê
                  </div>
                </div>
                {errors.name && (
                  <small className="text-danger m-1 p-0">
                    {errors.name.message}
                  </small>
                )}
              </div>
              <div className="col-6 mt-2">
                <div className="form-floating">
                  <input
                    data-format="stringNumber"
                    type="text"
                    className="form-control"
                    name="phone"
                    id="customer_phone"
                    placeholder="Nhập sdt khách thuê"
                    {...register("phone")}
                  />
                  <input
                    data-format="stringNumber"
                    type="hidden"
                    className="form-control"
                    name="old_phone"
                    placeholder="Nhập sdt người ở"
                  />
                  <label htmlFor="customer_phone">
                    Số điện thoại khách thuê
                  </label>
                  <div className="invalid-feedback">
                    Vui lòng nhập sdt khách thuê
                  </div>
                </div>
                {errors.phone && (
                  <small className="text-danger m-1 p-0">
                    {errors.phone.message}
                  </small>
                )}
              </div>
              <div className="col-12 mt-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="identity_number"
                    id="identity_number"
                    placeholder="Nhập số CMND/CCCD"
                    {...register("identity_number")}
                  />
                  <label htmlFor="identity_number">CMND/CCCD</label>
                  <div className="invalid-feedback">
                    Vui nhập số CMND/CCCD của khách thuê
                  </div>
                </div>
                {errors.identity_number && (
                  <small className="text-danger m-1 p-0">
                    {errors.identity_number.message}
                  </small>
                )}
              </div>
              <div className="col-6">
                <div className="input-group">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control date-flat-picker flatpickr-input"
                      name="birthday"
                      id="birthday"
                      data-format="date"
                      placeholder="Ngày vào ở"
                      pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                      {...register("birthday")}
                    />
                    <label htmlFor="birthday">Ngày sinh</label>
                  </div>
                  <label className="input-group-text" htmlFor="birthday">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-calendar"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </label>
                </div>
                {errors.birthday && (
                  <small className="text-danger m-1 p-0">
                    {errors.birthday.message}
                  </small>
                )}
                <div className="invalid-feedback">
                  Vui lòng nhập ngày sinh và phải đúng định dạng
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating">
                  <select
                    id="customer_sex"
                    name="sex"
                    className="form-select form-control"
                    required=""
                    {...register("sex")}
                  >
                    <option value="1" selected="">
                      Nam
                    </option>
                    <option value="0">Nữ</option>
                    <option value="-1">Chưa xác định</option>
                  </select>
                  <label htmlFor="customer_sex">Giới tính</label>
                </div>
                {errors.sex && (
                  <small className="text-danger m-1 p-0">
                    {errors.sex.message}
                  </small>
                )}
              </div>
              <div className="col-12 mt-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control address_detail"
                    name="address_detail"
                    placeholder="ví dụ: 122 - Đường Nguyễn Duy Trinh"
                    required=""
                    {...register("address_detail")}
                  />
                  <label htmlFor="address_detail">
                    Địa chỉ chi tiết. Ví dụ: 122 - Đường Nguyễn Duy Trinh
                  </label>
                  <div className="invalid-feedback">
                    Vui lòng nhập địa chỉ chi tiết
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="job"
                    id="customer_job"
                    placeholder="Nhập công việc khách thuê"
                    {...register("job")}
                  />
                  <label htmlFor="customer_job">Nhập công việc</label>
                  <div className="invalid-feedback">
                    Vui lòng nhập công việc của khách thuê
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Đóng
          </button>
          <button
            type="submit"
            form="addcustomer-form"
            id="submit"
            className="btn btn-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Thêm mới
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormAddCustomer;
