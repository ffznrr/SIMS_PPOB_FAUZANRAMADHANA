const InputFieldNumber = ({
  setData,
  placeholder,
  icon: Icon,
  inputValue,
  disabled = false,
}) => {
  const formatRupiah = (angka, prefix) => {
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? prefix + rupiah : "";
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^,\d]/g, "");
    const formattedValue = formatRupiah(rawValue, "Rp. ");
    setData(formattedValue);
  };

  return (
    <div className="relative mb-7">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icon className="text-gray-400" />
      </div>
      <input
        disabled={disabled}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputFieldNumber;
