import axios from 'axios';

export function SendAddr(url, params) {

  axios
    .post(url, params, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response);
    })

    .catch(function (error) {
      console.log(error);
    });
}

export function ClearAddr(url) {
  axios
    .get('https://yogilocationalertapi.onrender.com/api/clear')
    .then(response => {
      const json = response.data;
      // console.log('json', json);
      // setData(json.data.movies);
    })
    .catch(error => {
      console.log(error);
    });
}

export async function FetchAddr(Markerposition, setMaker) {
  try {
    const response = await axios.get(
      'https://yogilocationalertapi.onrender.com/api/location',
    );

    setMaker([
      ...Markerposition,
      {
        coordinate: response.data[0],
        title: 'Yogesh',
        description: 'Its Yogesh Location ',
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
