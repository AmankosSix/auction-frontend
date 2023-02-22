import { Snackbar } from '@/store/common/types'

const defaultSnackbar: Snackbar = {
  status: false,
  text: '',
  timeout: 0,
  color: ''
}

export type State = {
  snackbar: Snackbar
}

export const state: State = {
  snackbar: defaultSnackbar
}
