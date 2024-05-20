import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {useOrderStore} from "@store"

interface PropsId{
    orderId:string;
}
const options = [
  'in_process',
  'done',
  'taken',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({orderId}:PropsId) {

    const {updateOrderStatus} = useOrderStore()
//  console.log(orderId);
 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
     setAnchorEl(null);
  };

  const changeStatus = async(e:any) => {
    // const status =  e.target.firstChild.data;
    const data = {
        order_id: orderId,
        status: e.target.firstChild.data,
    }
    const status = await updateOrderStatus(data)
    if(status === 200){
        handleClose()
    }
  }


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={(e)=>changeStatus(e)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
