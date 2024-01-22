import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyOptions = useCurrencyInfo(from);

  const options = Object.keys(currencyOptions);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyOptions[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-[#23272A]"
        style={{
          backgroundColor: "#1d1d1d",
        }}
      >
        <div className="w-full text-[#23272A]">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-[#23272A]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1 text-[#23272A]">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setAmount(amount)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-[#7289DA] text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4 text-[#23272A]">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={from}
                  amountDisabled
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#7289DA] text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
