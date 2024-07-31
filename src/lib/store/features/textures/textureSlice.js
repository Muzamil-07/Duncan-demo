import { createAppSlice } from '../../createAppSlice'

const initialState = {
  patterns: [],
  coatings: []
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const textureSlice = createAppSlice({
  name: 'textures',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setPatterns: create.reducer((state, action) => {
      state.patterns = action.payload
    }),
    setCoatings: create.reducer((state, action) => {
      state.coatings = action.payload
    })
  }),

  selectors: {
    selectPatterns: textures => textures.patterns,
    selectCoatings: textures => textures.coatings
  }
})

// Action creators are generated for each case reducer function.
export const { setPatterns, setCoatings } = textureSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPatterns, selectCoatings } = textureSlice.selectors
