export interface DataItem {
  [key: string]: string | number
  id: string
  name: string
  flight_number: number
  date_utc: string
  date_unix: number
}
