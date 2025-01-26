import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

const TransactionHistory = () => {
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [data, setData] = useState([]);

  const getHistory = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const { data } = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );
      if (offset == 0) {
        setData(data.data.records);
      } else {
        setData((prev) => [...prev, ...data.data.records]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
    return format(parseISO(date), "MMMM dd, yyyy HH:mm:ss");
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleShowMore = () => {
    const off = offset + limit;
    setOffset(off);
  };

  useEffect(() => {
    getHistory();
  }, [offset]);

  console.log(data);
  return (
    <>
      <div className="w-full">
        <h1 className="font-bold text-2xl">Semua Transaksi</h1>
        <div className=" grid">
          {data &&
            data.map((value, i) => (
              <div
                key={i}
                className="w-full h-20 grid-cols-1 border rounded-md flex justify-between px-5 py-3 mb-5"
              >
                <div>
                  <h1
                    className={`text-3xl ${
                      value.transaction_type === "PAYMENT"
                        ? "text-red-500"
                        : "text-green-600"
                    } font-bold `}
                  >
                    {value.transaction_type === "PAYMENT" ? "-" : "+"}{" "}
                    {rupiah(value.total_amount)}
                  </h1>
                  <p>{formatDate(value.created_on)} WIB</p>
                </div>
                <div>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          <div className="flex justify-center">
            {data.length > 0 ? (
              <button
                className="font-bold text-red-500"
                onClick={handleShowMore}
              >
                Show More
              </button>
            ) : (
              <div>
                <h1 className="font-bold text-red-500 mt-10">
                  Anda Belum Pernah Melakukan Transaksi
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
