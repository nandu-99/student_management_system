import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export const login = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password, role });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role)
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {});
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error.response ? error.response.data : error.message);
      throw error;
    }
};
  
export const updateProfile = async (profileData) => {
  const transformedData = {
    enrollmentId : parseInt(profileData['Enrollment Id']), 
    email : profileData['Email'],
    year : profileData['Year'],
    contact : profileData['Contact'],
    parentName : profileData['Parent Name'],
    parentContact : profileData['Parent Contact'],
    school : profileData['School'],
    dob : profileData['DOB']
  }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.put(`${API_URL}/profile/update`, transformedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update profile:', error.response ? error.response.data : error.message);
      throw error;
    }
};

export const submitLeaveRequest = async (formData) => {
  const formatedData = {}
  formData.forEach((value, key) => {
    formatedData[key] = value;
  });
  console.log(formatedData)
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(`${API_URL}/leave-request`, formatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit leave request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRecentLeaveHistory = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/leave-requests/summary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent leave history:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getContests = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/contests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contests:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getLeavesByAdmin = async (req, res)=>{
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/admin/school-leaves`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contests:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const approveOrRejectLeave = async (leaveId, action) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/leave-request/approve-reject`, 
      { leaveId, action },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to approve or reject leave request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUpcomingEvents = async () =>{
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events', error.response ? error.response.data : error.message);
    throw error;
  }
}
