import form from "../../styles/Form.module.css";
import button from "../../styles/Button.module.css";
import { doc, Timestamp } from "firebase/firestore";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { IPurchaseDetail, IPurchase } from "../../interfaces/utilsRobert";
import Modal from "../../components/modal";

const initialPurchase: IPurchase = {
  purchaseDate: Timestamp.fromDate(new Date(Date.now())),
  paymentMethod: "Tarjeta",
  store: "Las Quintanas",
  supplier: "No Identificado",
  purchaseDetail: [],
};

const initialPurchaseDetail: IPurchaseDetail = {
  price: 0,
  quantity: 0,
  description: "",
  supplyId: 0,
  purchaseDetailId: 0,
};
function formatDate(date: string) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function PurchaseForm() {
  const [purchase, SetPurchase] = useState<IPurchase>(initialPurchase);
  const [purchaseDetail, SetPurchaseDetail] = useState<IPurchaseDetail>(
    initialPurchaseDetail
  );
  const [initializeModal, setInitializeModal] = useState<boolean>(false);
  const handleClickNewDetailPurchase = () => {
    // SetPurchaseDetail(initialPurchaseDetail);
    // purchase.purchaseDetail.push(initialPurchaseDetail);
    // SetPurchase({ ...purchase });
    setInitializeModal(!initializeModal);
  };

  const handleCLickClose = (index: number) => {
    const purchaseDetail = purchase.purchaseDetail.filter(
      (value) => value.supplyId !== index
    );
    SetPurchase({ ...purchase, purchaseDetail });
    console.log(purchase);
  };
  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    SetPurchase({
      ...purchase,
      [evt.target.name]:
        evt.target.valueAsDate === undefined
          ? evt.target.value
          : Timestamp.fromDate(evt.target.valueAsDate),
    });
  };

  return (
    <div className={form.container}>
      <form>
        <div className={form.grid_container}>
          <input
            type="date"
            placeholder="Fecha de Compra"
            name="purchaseDate"
            className={form.inputData}
            defaultValue={formatDate(
              purchase.purchaseDate.toDate().toDateString()
            )}
            onChange={handleChange}
          />
          <select
            name="store"
            title="store"
            className={form.inputData}
            defaultValue={purchase.store}
            onChange={handleChange}
          >
            <option value="Las Quintanas">Las Quintanas</option>
            <option value="La Esperanza">La Esperanza</option>
          </select>
          <select
            name="supplier"
            title="supplier"
            className={form.inputData}
            defaultValue={purchase.supplier}
            onChange={handleChange}
          >
            <option value="No Identificado">No Identificado</option>
            <option value="Hermelinda">Hermelinda</option>
          </select>
          <select
            name="paymentMethod"
            title="paymentMethod"
            className={form.inputData}
            defaultValue={purchase.paymentMethod}
            onChange={handleChange}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>
        <div className={form.grid_detail}>
          <label>Detalle de Compra</label>
          <button
            type="button"
            className={button.Button}
            onClick={handleClickNewDetailPurchase}
          >
            Nuevo
          </button>
        </div>
        <div id="detailPurchase" className={form.flex_container}>
          {purchase.purchaseDetail[0] !== undefined &&
            purchase.purchaseDetail.map((value, index) => {
              return (
                <div className={form.card} key={index}>
                  <input placeholder="Insumo" defaultValue={value.supplyId} />
                  <input placeholder="Cantidad" defaultValue={value.quantity} />
                  <input placeholder="Precio" defaultValue={value.price} />
                  <textarea
                    placeholder="Descripcion de Compra"
                    name=""
                    id=""
                    defaultValue={value.description}
                  ></textarea>
                  <button
                    type="button"
                    className={form.btnClose}
                    onClick={() => handleCLickClose(value.supplyId)}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
      </form>
      <Modal
        title={"Formulario"}
        initialize={initializeModal}
        setInitialize={setInitializeModal}
        description={"Detalle de la Compra"}
      >
        <div className="details_container">
          <form className="form_details" action="">
            <select title="supply" className={form.inputData} name="supplyId">
              <option hidden selected>
                Selecciona Insumo
              </option>
              <option value={1}>Especias</option>
              <option value={2}>Cocina</option>
            </select>
            <input
              name="quantity"
              type="number"
              className={form.inputData}
              placeholder="Cantidad"
              defaultValue={""}
            />
            <input
              name="price"
              type="number"
              className={form.inputData}
              placeholder="Precio"
              defaultValue={""}
            />
            <textarea
              name="description"
              className={form.inputData}
              placeholder="Descripci??n"
              defaultValue={purchaseDetail.description}
            />
            <button className={button.Button}>Guardar</button>
          </form>
        </div>
      </Modal>

      <style jsx>
        {`
          .details_container {
            padding: 1rem;
          }
          .form_details {
            margin: 0px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .form_details input {
            display: block;
            padding: 0.5rem;
            width: 100%;
            box-sizing: border-box;
          }
          .form_details textarea {
            padding: 0.5rem;
            overflow: auto;
            resize: none;
            
        `}
      </style>
    </div>
  );
}
