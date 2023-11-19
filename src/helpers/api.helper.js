const apiHelper = {
  response: (status, message, data) => {
    return {
      status: status,
      message: message,
      data: data,
    };
  },
  paginationResponse: (data, page, limit) => {
    if (limit == "all") {
      data.hasMorePages = false;
    } else {
      const totalPages = Math.ceil(data.count / limit);
      if (page + 1 < totalPages) {
        data.hasMorePages = true;
      } else {
        data.hasMorePages = false;
      }
    }
    return data;
  },
  //   sanitise: (data) => {
  //     if (data) {
  //       var replaced = JSON.stringify(data, (key, value) => {
  //         return value == null ? "" : value;
  //       });
  //       var parsed = JSON.parse(replaced);
  //       return parsed;
  //     } else {
  //       return null;
  //     }
  //   },
};

module.exports = apiHelper;
