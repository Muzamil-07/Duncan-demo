import { createAppSlice } from '../../createAppSlice'
const initialState = {
  style: 'none',
  material: 'none',
  print: 'none',
  printSurface: 'none',
  coating: 'none',
  finishing: {
    embossing: false,
    goldFoil: false,
    spotGloss: false,
    none: true
  },
  dimensions: {
    length: '',
    width: '',
    height: '',
    unit: 'mm'
  },
  quantity: '',
  state: 'close' // open | close
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const boxSlice = createAppSlice({
  name: 'box',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setBoxStyle: create.reducer((state, action) => {
      state.style = action.payload
    }),
    setBoxMaterial: create.reducer((state, action) => {
      state.material = action.payload
    }),
    setBoxPrint: create.reducer((state, action) => {
      state.print = action.payload
    }),
    setBoxPrintSurface: create.reducer((state, action) => {
      state.printSurface = action.payload
    }),
    setBoxCoating: create.reducer((state, action) => {
      state.coating = action.payload
    }),
    setBoxFinishing: create.reducer((state, action) => {
      state.finishing = action.payload
    }),
    setBoxDimensions: create.reducer((state, action) => {
      state.dimensions = action.payload
    }),
    setBoxQuantity: create.reducer((state, action) => {
      state.quantity = action.payload
    }),
    setBoxState: create.reducer((state, action) => {
      state.state = action.payload
    })
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectBoxStyle: box => box.style,
    selectBoxMaterial: box => box.material,
    selectBoxPrint: box => box.print,
    selectBoxPrintSurface: box => box.printSurface,
    selectBoxCoating: box => box.coating,
    selectBoxFinishing: box => box.finishing,
    selectBoxDimensions: box => box.dimensions,
    selectBoxQuantity: box => box.quantity,
    selectBoxState: box => box.state,
    selectBoxAttributes: box => box
  }
})

// Action creators are generated for each case reducer function.
export const {
  setBoxStyle,
  setBoxCoating,
  setBoxDimensions,
  setBoxFinishing,
  setBoxMaterial,
  setBoxPrint,
  setBoxPrintSurface,
  setBoxState,
  setBoxQuantity
} = boxSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectBoxAttributes,
  selectBoxCoating,
  selectBoxDimensions,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxStyle,
  selectBoxState,
  selectBoxQuantity
} = boxSlice.selectors
