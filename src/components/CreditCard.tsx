import "react-credit-cards-2/dist/es/styles-compiled.css";
import { ChangeEventHandler, FC, FocusEventHandler, useRef, useState } from "react";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "../utils/card-utils";
import Cards, { Focused } from "react-credit-cards-2";
import { useKeyPress } from "../hooks/useKeyPress";

type CardState = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: undefined | Focused;
};

type CreditCardProps = {
  handleSubmit: (state: Omit<CardState, "focus">) => void;
};

const CreditCard: FC<CreditCardProps> = ({ handleSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<CardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
  });

  const handleInputChange: ChangeEventHandler = (ev) => {
    const target = ev.target as HTMLInputElement;
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState((val) => ({
      ...val,
      ...{ [target.name]: target.value },
    }));
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (evt) => {
    const target = evt.target as HTMLInputElement;
    const targetName = target.name as Focused;
    setState((prev) => ({ ...prev, focus: targetName }));
  };

  useKeyPress("H", () => {
    setState((prev) => ({
      ...prev,
      number: "2222 2222 2222 2222",
      name: "Kashan Saif",
      expiry: "1234",
      cvc: "12345",
    }));
  });

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { focus, ...rest } = state;
        handleSubmit(rest);
      }}
      ref={formRef}
      className="flex flex-col gap-4 items-center"
    >
      <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
      <div className="form-inputs w-full px-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            pattern="^(\d\s?){16}(?=\D*$)|(\d\s?){19}(?=\D*$)$"
            required
            className="input input-bordered w-full max-w-xs"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <small>Eg: XXXX XXXX XXXX XXXX(XXX)</small>
        </div>
        <div>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full max-w-xs"
            placeholder="Name"
            required
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            type="tel"
            name="expiry"
            className="input input-bordered w-full max-w-xs"
            placeholder="Valid Thru (MM/YY)"
            pattern="^(0[1-9]|1[0-2])\/\d{2}$"
            required
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            type="tel"
            name="cvc"
            className="input input-bordered w-full max-w-xs"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </div>
      <div className="form-actions w-44">
        <button type="submit" className="btn btn-primary btn-block">
          PAY
        </button>
      </div>{" "}
    </form>
  );
};

export default CreditCard;
