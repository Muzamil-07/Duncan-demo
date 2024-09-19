import { createAppSlice } from '../../createAppSlice'
const initialState = {
  sceneHeight: '73vh',
  menueCollapsed: false,
  zoom: 0,
  mode: 'black',
  isDefaultMode: true
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const generalSlice = createAppSlice({
  name: 'general',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setSceneHeight: create.reducer((state, action) => {
      state.sceneHeight = action.payload
    }),
    toggleMenuCollapse: create.reducer((state, action) => {
      state.menueCollapsed = !state.menueCollapsed
    }),
    setZoom: create.reducer((state, action) => {
      state.zoom = action.payload
    }),
    setMode: create.reducer((state, action) => {
      state.mode = action.payload
    }),
    setIsDefaultMode: create.reducer((state, action) => {
      state.isDefaultMode = action.payload
    })
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectSceneHeight: state => state.sceneHeight,
    selectMenueCollapsedState: state => state.menueCollapsed,
    selectZoom: state => state.zoom,
    selectMode: state => state.mode,
    selectIsDefaultMode: state => state.isDefaultMode
  }
})

// Action creators are generated for each case reducer function.
export const {
  setSceneHeight,
  toggleMenuCollapse,
  setZoom,
  setMode,
  setIsDefaultMode
} = generalSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectSceneHeight,
  selectMenueCollapsedState,
  selectZoom,
  selectMode,
  selectIsDefaultMode
} = generalSlice.selectors
