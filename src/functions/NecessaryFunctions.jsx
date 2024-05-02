export function checkPhoneNumber(raqam) {
  const telefonRaqamiRegex = /^\+998\d{9}$/; // Raqam formatini aniqlash uchun regulyar ifoda

  if (telefonRaqamiRegex.test(raqam)) {
    return false;
  } else {
    return true;
  }
}

export function formatNumber(number) {
  const numString = number.toString();
  const formattedString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return formattedString;
}

// CLEAN DATA
export const cleanedData = datas => {
  return Object.entries(datas).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      const cleanedValue = value.trim().replace(/\s+/g, " ");
      acc[key] = cleanedValue;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const filterDataByShift = (data, shift) => {
  let filteredData = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let filteredResults = item.shifts.filter(
      result => result.shift == shift || shift == 0
    );
    if (filteredResults.length > 0) {
      filteredData.push({
        report_date: item.report_date,
        shifts: filteredResults
      });
    }
  }
  return filteredData;
};

export const sortMainWorkersByShift = workers => {
  var filteredWorkers = workers.filter(function(worker) {
    return worker.is_main_worker == true;
  });

  filteredWorkers.sort(function(a, b) {
    return a.shift - b.shift;
  });

  return filteredWorkers;
};

export const totalMoneyWithIndex = (datas, index) => {
  let total = 0;
  datas.map((data, i) => {
    if (i == index) {
      data.shifts.map(item => {
        total +=
          Number(item.not_transfer_income) +
          Number(item.transfer_income) +
          Number(item.not_transfer_discount_price) +
          Number(item.transfer_discount_price) +
          Number(item.debt_income);
      });
    }
  });
  return total;
};

export const totalMoneyWithOutIndex = datas => {
  let total = 0;
  datas.map(data => {
    data.shifts.map(item => {
      total +=
        Number(item.not_transfer_income) +
        Number(item.transfer_income) +
        Number(item.not_transfer_discount_price) +
        Number(item.transfer_discount_price) +
        Number(item.debt_income);
    });
  });
  return total;
};

export const totalReceiptPriceWithIndex = (datas, index) => {
  let total = 0;
  datas.map((data, i) => {
    if (i == index) {
      data.shifts.map(item => {
        total += Number(item.receipt_price);
      });
    }
  });
  return total;
};

export const totalReceiptPrice = datas => {
  let total = 0;
  datas.map(data => {
    data.shifts.map(item => {
      total += Number(item.receipt_price);
    });
  });
  return total;
};

export const totalWatntToByKey = (datas, key) => {
  let total = 0;
  datas.map(data => {
    data.shifts.map(item => {
      total += Number(item[key]);
    });
  });
  return total;
};

export function tekshirish3(data) {
  // So'zlarni ajratib olamiz
  var sozlar = data.split(" ");

  // Uchta harfli so'zlarni topish
  console.log(sozlar, "0");

  var uchtaHarfli = sozlar.filter(function(soz) {
    return soz.length >= 1;
  });
  console.log(uchtaHarfli, "1");

  // Uchta harfli so'zlar bo'lmasa, "false" qaytaradi
  if (
    uchtaHarfli.length === 0 ||
    uchtaHarfli.length < 3 ||
    uchtaHarfli.length > 4
  ) {
    return false;
  }

  // Har bir so'z uchun tekshirish
  for (var i = 0; i < uchtaHarfli.length; i++) {
    if (uchtaHarfli[i].length < 1) {
      return false;
    }
  }

  // Massivni tekshirish
  for (var j = 0; j < uchtaHarfli.length; j++) {
    if (!uchtaHarfli[j]) {
      return false;
    }
  }

  // Agar hech qaysi so'z uchun ham shart bajarilmasa, "true" qaytarish
  return true;
}

export const totalMoney = data => {
  let total = 0;
  data.map(item => {
    total += Number(item.price);
  });
  return total;
};

export const totalYear = data => {
  let newDatas = {};
  for (let i = 0; i < data.length; i++) {
    const month = data[i].month;
    if (newDatas[month]) {
      newDatas[month].price += data[i].price;
      newDatas[month].receipt_price += data[i].receipt_price;
      newDatas[month].second_name += Number(data[i].second_name);
    } else {
      newDatas[month] = {
        month,
        price: data[i].price,
        receipt_price: data[i].receipt_price,
        second_name: Number(data[i].second_name)
      };
    }
  }

  return Object.values(newDatas);
};

export const totalMoneyByKey = (data, key) => {
  let total = 0;
  data.map(item => {
    total += Number(item[key]);
  });
  return total;
};

export const totalYearToFirm = data => {
  let newDatas = {};
  for (let i = 0; i < data.length; i++) {
    const month = data[i].month;
    if (newDatas[month]) {
      newDatas[month].expense_price += data[i].expense_price;
      newDatas[month].income_price += data[i].income_price;
    } else {
      newDatas[month] = {
        month,
        expense_price: data[i].expense_price,
        income_price: data[i].income_price
      };
    }
  }

  return Object.values(newDatas);
};

export const totalMoneyByKeyMinus = (data, key1, key2) => {
  let total = 0;
  data.map(item => {
    total += Number(item[key1]) - Number(item[key2]);
  });
  return total;
};

export const totalYearToLeader = data => {
  let newDatas = {};
  for (let i = 0; i < data.length; i++) {
    const month = data[i].month;
    if (newDatas[month]) {
      newDatas[month].expense_price += data[i].expense_price;
      newDatas[month].income_price += data[i].income_price;
    } else {
      newDatas[month] = {
        month,
        expense_price: data[i].expense_price,
        income_price: data[i].income_price
      };
    }
  }

  return Object.values(newDatas);
};

export function formatDate(dateString) {
  // Gelen tarihi "yyyy-mm-dd" formatından "dd-mm-yyyy" formatına dönüştür
  var dateParts = dateString.split("-");
  var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  return formattedDate;
}