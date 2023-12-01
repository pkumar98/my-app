import { useState, useEffect } from 'react';
import { transformData, transformDetailData } from '../utils';

const useFetch = (data) => {
  const [detailData, setData] = useState([]);
  const init = async () => {
    let jsonData;
    if (data?.id) {
      // Patient Detail
      const response = await fetch(
        `https://hapi.fhir.org/baseR4/Patient/${data?.id}`
      );
      jsonData = await response.json();
      console.log('jsonData ', jsonData)
      const transformedData = transformDetailData(jsonData)
      setData(transformedData);
    } else {
      // Patient List
      const response = await fetch(
        'https://hapi.fhir.org/baseR4/Patient?_pretty=true'
      );
      jsonData = await response.json();

      const transformedData = transformData(jsonData?.entry);

      setData(transformedData);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return [detailData];
};

export default useFetch;
