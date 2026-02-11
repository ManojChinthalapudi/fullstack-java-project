import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
export const api = axios.create({
    baseURL:"http://localhost:8000/api"
})
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
};
export const getAllAdminProperties = async () => {
  try {
    const response = await api.get("/residency/allAdminresd", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
};
export const getAllAcceptProperties = async () => {
  try {
    const response = await api.get("/residency/allAcceptresd", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
};
export const getAllRejectProperties = async () => {
  try {
    const response = await api.get("/residency/allRejectresd", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
};
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;

  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getAdminProperty = async (id) => {
  try {
    const response = await api.get(`/residency/adminResidency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getAcceptProperty = async (id) => {
  try {
    const response = await api.get(`/residency/acceptResidency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getRejectProperty = async (id) => {
  try {
    const response = await api.get(`/residency/rejectResidency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const createUser = async (email,token) => {
    try {
        await api.post(`/user/register`, { email }, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        
    } catch (error) {
        toast.error("something went wrong.Try again")
        throw error
    }
}
export const createResidency = async (data, token) => {
  console.log(data)
  try {
    const res = await api.post(
      `/residency/create`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
};
export const createAdminResidency = async (data, token) => {
  console.log(data)
  try {
    const res = await api.post(
      `/residency/adminCreate`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
};
export const createAcceptResidency = async (data, token) => {
  console.log(data)
  try {
    const res = await api.post(
      `/residency/acceptCreate`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
};
export const createRejectResidency = async (data, token) => {
  console.log(data)
  try {
    const res = await api.post(
      `/residency/rejectCreate`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if(!token) return 
  try{

    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      
    return res.data["favResidenciesID"]

  }catch(e)
  {
    toast.error("Something went wrong while fetching favs");
    throw e
  }
} 