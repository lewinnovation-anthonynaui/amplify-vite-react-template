import { configureStore, createSlice } from '@reduxjs/toolkit';

import { Assets, ServiceHistory } from '../App';

const initalState: {
  selectedAssetId?: string | null;
  assets: Array<Assets>;
  serviceHistories: Array<ServiceHistory>;
} = {
  selectedAssetId: undefined,
  assets: [],
  serviceHistories: [],
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState: initalState,
  reducers: {
    handleAssetsStart(state, action) {
      state.assets = action.payload;
      return state;
    },
    handleServiceHistoryStart(state, action) {
      state.serviceHistories = action.payload;
      return state;
    },
    handleStartAddAsset(state) {
      state.selectedAssetId = null;
      return state;
    },
    handleCancelAddAsset(state) {
      state.selectedAssetId = undefined;
      return state;
    },
    handleAddAsset(state, action) {
      state.selectedAssetId = action.payload.id;
      state.assets.push(action.payload);
      return state;
    },
    handleSelectAsset(state, action) {
      state.selectedAssetId = action.payload;
      return;
    },
    handleDeleteAsset(state, action) {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
      state.selectedAssetId = undefined;
      return state;
    },
    handleAddServiceHistory(state, action) {
      state.serviceHistories.push(action.payload);
      return state;
    },
    handleDeleteServiceHistory(state, action) {
      state.serviceHistories = state.serviceHistories.filter(
        (serviceHistory) => serviceHistory.id !== action.payload
      );
      return state;
    },
  },
});

const store = configureStore({
  reducer: {
    assets: assetsSlice.reducer,
  },
});

export const assetsActions = assetsSlice.actions;
export default store;
