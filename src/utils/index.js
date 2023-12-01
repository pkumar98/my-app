const getAge = (dateString) => {
    if (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age || 0;
    } else {
      return 'N/A';
    }
  };
  
  const getName = (data) => {
    return data ? data[0]?.given[0] : 'N/A';
  };

  const getPhone = (data) => {
    return data?.telecom[0]?.value || 0
  }

  const formatAddress = (address) => {
    return address ? address[0].text : 'N/A';
  };
  
  const transformData = (rowData) => {
    return rowData.map((item) => {
      return {
        id: item.resource.id,
        name: getName(item.resource?.name),
        gender: item.resource?.gender || 'N/A',
        age: getAge(item.resource?.birthDate),
      };
    });
  };

  const transformDetailData = (data) => {
    console.log('transformDetailData ', data)
    return {
        id: data.id,
        name: getName(data.name),
        gender: data.gender || 'N/A',
        birthDate: data.birthDate || 'N/A',
        address: formatAddress(data?.address),
        // phone: getPhone(data)
    }
  }

  const debounce = (fn) => {
    let timer;
    return function (...args) {
        const context = this;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(context, args);

        }, 1000)
    }
  }
  
  export { getName, getAge,getPhone,  transformData, transformDetailData,  debounce };
  