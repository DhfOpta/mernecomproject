import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

//   <li><NavLink className='navLnk' to={'/home/'}>Home{admin}</NavLink></li>
//   <li><NavLink className='navLnk' to={'/home/products'}>Product</NavLink></li>
//   <li><NavLink className='navLnk' to={'/home/Cart'}>Cart<span style={{ backgroundColor: 'skyblue', padding: '.5rem .8rem', width: '50%', borderRadius: '50%', fontFamily: 'sans-serif', fontWeight: '500' }}>{length}</span></NavLink></li>
//   <li><NavLink className='navLnk' to={'/home/logout'}>Logout</NavLink></li></>
// : <>
// <li><NavLink className='navLnk' to={'/Signup'}>Signup</NavLink></li>
// <li><NavLink className='navLnk' to={'/'}>Log In</NavLink></li>

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'left' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        {[<NavLink className='navLnk' to={'/home/'}>Home</NavLink>, <NavLink className='navLnk' to={'/home/products'}>Product</NavLink>,<NavLink className='navLnk' to={'/home/Cart'}>Cart<span style={{ backgroundColor: 'skyblue', padding: '.5rem .8rem', width: '50%', borderRadius: '50%', fontFamily: 'sans-serif', fontWeight: '500' }}>{length}</span></NavLink>, <NavLink className='navLnk' to={'/home/logout'}>Logout</NavLink>].map((text, index) => (
          <ListItem key={text} >
            <ListItemButton>
              <ListItemIcon>
              
                {text[0]  ? <InboxIcon /> : text[1] ? <LogoutIcon />: text[2]? 'cart': text[3]? <LogoutIcon />:'' }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      
    </Box>
  );
//   const 

  return (<>
     {/* <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div> */}
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color:'black'}}/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div></>
  );
}
