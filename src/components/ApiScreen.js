const baseUrl = 'https://intechsol.co/ntrospect/api/';

const LoginApi = async (payload) => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    //   console.log("response-----------",json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

const RegisterApi = async (payload,data) => {
  // console.log('data of register',payload);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    const json = await response.json();

    //   console.log("response-----------",json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

const EmailConfirmApi = async payload => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    //   console.log("response-----------",json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

const ConfrimCodeApi = async payload => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    //   console.log("response-----------",json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

const NewPasswordApi = async payload => {
  try {
    // console.log("payload",payload);
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    //   console.log("response-----------",json);
    return json;
  } catch (error) {
    console.error(error);
  }
};
const UpdateGenders = async (payload, data) => {

  // console.log('url', baseUrl);
  console.log("payload of edit profile",payload);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error(error);
  }
};

const UpdateHealth = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};


const ForgotPassword = async (payload, data) => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const UpdateProfile = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const ViewProfile = async (payload, data) => {
  // console.log('payload', payload);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const ArticleApi = async (payload,data) => {
  console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsApi = async (payload,data) => {
  console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const barcodeApi = async (payload, data) => {
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const LikeDislikeApi = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const WhishAPI = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const viewCommentAPI = async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const  View_WhishAPI= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const  Detail_API= async (payload,data) => {
  // console.log('data===========',payload)

  try {
    const request = baseUrl + `${payload.url}/${payload.id}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const commentAPI = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const  ArticleNewsAPIs= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const  BothArticlesList= async (payload,data) => {
  console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsArticle_viewCmnt_APIs = async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsArticle_Cmnt_APIs = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const  Category_APi= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const  Sub_Category_APi= async (payload,data) => {
  // console.log('data===========',payload)

  try {
    const request = baseUrl + `${payload.url}/${payload.id}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};


const AddArticlesAPI = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const  FilterAPI= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};


const  NewsArticle_Detail_APIs= async (payload,data) => {
  // console.log('data===========',payload)

  try {
    const request = baseUrl + `${payload.url}/${payload.id}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsArticle_LikeDis_APIs = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsArticle_AddFav_APIs = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const NewsArticle_cmntLiDis_APIs = async (payload, data) => {
  // console.log('data',data);
  // console.log('url', baseUrl);
  // console.log('formdata', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const  ProductlistAPIs= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const  SearchAPI= async (payload,data) => {
  // console.log('data',data)

  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body:data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};



export {
  RegisterApi,
  LoginApi,
  EmailConfirmApi,
  ConfrimCodeApi,
  NewPasswordApi,
  ForgotPassword,
  ViewProfile,
  UpdateGenders,
  UpdateHealth,
  UpdateProfile,
  ArticleApi,
  NewsApi,
  barcodeApi,
  LikeDislikeApi,
  commentAPI,
  WhishAPI,
  viewCommentAPI,
  View_WhishAPI,
  Detail_API,
  ArticleNewsAPIs,
  Sub_Category_APi,
  BothArticlesList,
  AddArticlesAPI,
  Category_APi,
  FilterAPI,
  NewsArticle_Detail_APIs,
  NewsArticle_LikeDis_APIs,
  NewsArticle_AddFav_APIs,
  NewsArticle_viewCmnt_APIs,
  NewsArticle_Cmnt_APIs,
  NewsArticle_cmntLiDis_APIs,
  ProductlistAPIs,
  SearchAPI

};

