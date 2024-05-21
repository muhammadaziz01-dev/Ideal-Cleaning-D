
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LicenseInfo } from '@mui/x-data-grid-pro';
LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

import moment from 'moment'
interface Prop {
    changeParams: (start:string,end:string)=> void
}
export default function CommonlyUsedComponents({changeParams}: Prop) {
    const handleChange =(event:any)=>{
        
        const start =  moment(event[0]?.$d).format("YYYY-MM-DD")
        const end =  moment(event[1]?.$d).format("YYYY-MM-DD")
        if(start && end){
            changeParams(start,end)
        }
    }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
        <DemoItem
          component="DateRangePicker"
        >
          <DateRangePicker
          onChange={handleChange}
          format='YYYY-MM-DD'
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
