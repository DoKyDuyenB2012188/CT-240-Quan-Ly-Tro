import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListFilterCard from "../components/ListFilterCard";
import { INVOICE } from "../shared/filters";
import Confirmation from "../components/Confirmation";
import {
  cancelChangesInvoice,
  confirmChangesInvoice,
} from "../redux/slices/invoiceSlice";
import FormAddRoom from "./FormRoom.js/FormAddRoom";
import Notify from "./FormRoom.js/Notify";
import HeaderTableInvoice from "./HeaderTableInvoice";
import InvoiceObject from "./InvoiceObject";
import Monthpicker from "./Monthpicker";

const TableInvoice = () => {
  const invoices = useSelector((state) => state.invoices.data);
  const dispatch = useDispatch();
  const isChange = useSelector((state) => state.invoices.isChange);
  const [filterState, setFilterState] = useState("");
  const handleConfirmClick = () => {
    dispatch(confirmChangesInvoice());
  };
  const handleCancelClick = () => {
    dispatch(cancelChangesInvoice());
  };
  return (
    <div
      style={{
        padding: "15px 15px 15px 15px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        margin: "0 10px 10px 10px",
      }}
    >
      <div className="page-home">
        <div className="tab-content">
          <div
            className="tab-pane active"
            id="manage"
            role="tabpanel"
            aria-labelledby="manage-tab"
          >
            <div row="true">
              <div className="header-item">
                <h4 className="title-item">
                  Tất cả phiếu thu tiền nhà(hóa đơn)
                  <i className="des">
                    Bạn sẽ thấy các hóa đơn hàng tháng được lập hoặc tạo hóa đơn
                    hàng tháng nếu chưa được lập
                  </i>
                </h4>
                <div className="d-flex">
                  <div>
                    <Monthpicker />
                  </div>
                  <label class="input-group-text" for="month" style={{borderRadius:"0px 5px 5px 0px", borderLeft:"none"}}>
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
                      class="feather feather-calendar"
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
              </div>
              <ListFilterCard
                filters={INVOICE}
                filterState={filterState}
                setFilterState={setFilterState}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="" id="buttom-save-container"></div>
      <div
        id="table"
        className="celled tabulator"
        role="grid"
        tabulator-layout="fitColumns"
        style={{ minHeight: "200px" }}
      >
        <div className="tabulator-header" role="rowgroup">
          <div className="tabulator-header-contents" role="rowgroup">
            <div
              className="tabulator-headers"
              role="row"
              style={{ height: "59px" }}
            >
              <HeaderTableInvoice />
            </div>
            {isChange === true ? (
              <Confirmation
                handleCancelClick={handleCancelClick}
                handleConfirmClick={handleConfirmClick}
              />
            ) : (
              ""
            )}
            <div
              className="tabulator-frozen-rows-holder"
              style={{ minWidth: "0px" }}
            ></div>
          </div>
        </div>
        <div
          className="tabulator-tableholder"
          tabIndex="0"
          style={{
            minHeight: "200px",
            height: "calc(100% - 60px)",
            maxHeight: "calc(100% - 60px)",
          }}
        >
          <div
            className="tabulator-table"
            role="rowgroup"
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            {invoices.map((invoice) => {
              return (
                <InvoiceObject
                  key={invoice.id_invoice}
                  id={invoice.id}
                  status={invoice.status}
                  created_date={invoice.created_date}
                  id_invoice={invoice.id_invoice}
                  amount_room={invoice.amount_room}
                  electricity_bill={invoice.electricity_bill}
                  water_bill={invoice.water_bill}
                  service_bill={invoice.service_bill}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Notify />
    </div>
  );
};

export default TableInvoice;
