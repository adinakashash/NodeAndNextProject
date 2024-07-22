import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserClass from '@/classes/user';
import { WorkerClass } from '@/classes/worker';

interface CurrentUserState {
  user: UserClass | WorkerClass | null;
  // error: string | null; 
}

const initialState: CurrentUserState = {
  user: null,
};

const fetchUserFromDatabase = async (googleId: string) => {
  const response = await axios.get(`http://localhost:3000/api/users/${googleId}`);
  return response.data;
};

const fetchWorkerFromDatabase = async (googleId: string) => {
  const response = await axios.get(`http://localhost:3000/api/workers/${googleId}`);
  return response.data;
};

export const fetchUser = createAsyncThunk<UserClass | WorkerClass | null>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userFromDb = await fetchUserFromDatabase(user.googleId);

        if (userFromDb.isWorker) {
          const workerFromDb = await fetchWorkerFromDatabase(user.user.googleId);
          return { ...userFromDb, ...workerFromDb }; 
        } else {
          return userFromDb;
        }
      } else {
        const response = await axios.get('http://localhost:3000/auth/google/callback', { withCredentials: true });
        Cookies.set('user', JSON.stringify(response.data), { secure: true });
        return response.data;
      }
    } catch (error:any) {
      return console.error(error.message);
    }
  }
);

const currentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserClass | WorkerClass | null>) => {
      state.user = action.payload;
      if (action.payload) {
        Cookies.set('user', JSON.stringify(action.payload), { secure: true });
      } else {
        Cookies.remove('user');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserClass | WorkerClass | null>) => {
        state.user = action.payload;
      })

  },
});

export const { setUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
