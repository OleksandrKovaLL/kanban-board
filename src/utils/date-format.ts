import { format } from 'date-fns'

export const formatDate = (timestamp: number) =>
  format(new Date(timestamp), 'dd.MM.yyyy')
